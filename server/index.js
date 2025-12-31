// index.js
import cors from "cors";
import mysql from "mysql2";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* ----------------------------------------------------
   Middlewares
---------------------------------------------------- */

// ✅ CORS (important so frontend can call backend)
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173", // Vite default
  "http://localhost:3000", // CRA just in case
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / server-to-server (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* ----------------------------------------------------
   Basic Routes
---------------------------------------------------- */
app.get("/", (req, res) => {
  res.status(200).send("HavenStay API is running ");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/* ----------------------------------------------------
   Database connection
---------------------------------------------------- */
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "havenstay",
  port: Number(process.env.DB_PORT || 3307),
});

/* ----------------------------------------------------
   Test DB connection
---------------------------------------------------- */
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
    connection.release();
  }
});

/* ----------------------------------------------------
   Helpers / Config
---------------------------------------------------- */
const JWT_SECRET = process.env.JWT_SECRET || "havenstay_secret_key_change_me";

/* ----------------------------------------------------
   Create uploads folder if it doesn't exist
---------------------------------------------------- */
const UPLOAD_DIR = path.join(process.cwd(), "uploads", "properties");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

/* ----------------------------------------------------
   Images serving
---------------------------------------------------- */
// Frontend can load: http://localhost:5000/uploads/properties/<file>
app.use("/uploads", express.static("uploads"));

/* ----------------------------------------------------
   Auth Middlewares
---------------------------------------------------- */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, email, full_name }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: token invalid" });
  }
}

function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    req.user = null;
    return next();
  }
}

/* ====================================================
   Profile APIs (Update logged-in user)
==================================================== */

// ✅ Update my profile (full_name + phone)
// PUT /users/me
app.put("/users/me", requireAuth, (req, res) => {
  const { full_name, phone } = req.body;

  // messages from backend (toast-ready)
  const sendError = (status, message) => {
    return res.status(status).json({ toastType: "error", message });
  };

  const sendSuccess = (status, message, extra = {}) => {
    return res.status(status).json({ toastType: "success", message, ...extra });
  };

  if (!full_name || !String(full_name).trim()) {
    return sendError(400, "Full name is required.");
  }

  const cleanedName = String(full_name).trim();
  const cleanedPhone = phone ? String(phone).trim() : null;

  const q =
    "UPDATE users SET full_name = ?, phone = ?, updated_at = NOW() WHERE id = ?";

  db.query(q, [cleanedName, cleanedPhone, req.user.id], (err) => {
    if (err) return sendError(500, "Database error while updating profile.");

    // get updated user
    const getQ = "SELECT id, full_name, email, phone FROM users WHERE id = ?";
    db.query(getQ, [req.user.id], (err2, rows) => {
      if (err2) return sendError(500, "Database error while fetching profile.");
      if (!rows.length) return sendError(404, "User not found.");

      const updatedUser = rows[0];

      // ✅ issue a new token so JWT full_name stays updated too
      const token = jwt.sign(
        { id: updatedUser.id, email: updatedUser.email, full_name: updatedUser.full_name },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return sendSuccess(200, "Profile updated successfully !", {
        user: updatedUser,
        token,
      });
    });
  });
});

// ✅ Get logged-in host's properties
app.get("/properties/my", requireAuth, (req, res) => {
  const q = `
    SELECT 
      p.*,
      pi.image_path AS coverImage
    FROM properties p
    LEFT JOIN property_images pi 
      ON p.id = pi.property_id AND pi.is_cover = 1
    WHERE p.host_id = ?
    ORDER BY p.created_at DESC
  `;

  db.query(q, [req.user.id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err.message });
    }
    return res.status(200).json(data);
  });
});


/* ----------------------------------------------------
   Multer setup (PNG + JPG upload)
---------------------------------------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const random = crypto.randomBytes(6).toString("hex");

    // ✅ Works for /properties/:id/images because :id exists there
    const propId = req.params.id || "property";
    cb(null, `${propId}_${Date.now()}_${random}${ext}`);
  },
});

function imageFileFilter(req, file, cb) {
  const allowed = ["image/png", "image/jpeg", "image/jpg"];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Only PNG and JPG images are allowed"), false);
  }
  cb(null, true);
}

const upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

/* ====================================================
   Auth APIs
==================================================== */

app.post("/auth/signup", (req, res) => {
  const { full_name, email, password, phone } = req.body;

  if (!full_name || !email || !password) {
    return res
      .status(400)
      .json({ message: "full_name, email, password are required" });
  }

  const checkQ = "SELECT id FROM users WHERE email = ?";
  db.query(checkQ, [email], async (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });

    if (data.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const insertQ =
      "INSERT INTO users (full_name, email, password_hash, phone, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())";

    db.query(
      insertQ,
      [full_name, email, password_hash, phone || null],
      (err2, result) => {
        if (err2)
          return res
            .status(500)
            .json({ message: "Database error", error: err2.message });

        const token = jwt.sign(
          { id: result.insertId, email: email, full_name: full_name },
          JWT_SECRET,
          { expiresIn: "7d" }
        );

        return res.status(201).json({
          message: "Signup successful",
          token: token,
          user: { id: result.insertId, full_name, email, phone: phone || null },
        });
      }
    );
  });
});

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [email], async (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });

    if (data.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = data[0];
    const ok = await bcrypt.compare(password, user.password_hash);

    if (!ok) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, full_name: user.full_name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
      },
    });
  });
});

app.get("/auth/me", requireAuth, (req, res) => {
  const q =
    "SELECT id, full_name, email, phone, created_at, updated_at FROM users WHERE id = ?";

  db.query(q, [req.user.id], (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    if (data.length === 0)
      return res.status(404).json({ message: "User not found" });

    return res.status(200).json(data[0]);
  });
});

app.post("/auth/logout", (req, res) => {
  return res
    .status(200)
    .json({ message: "Logout successful (delete token on frontend)" });
});

/* ====================================================
   Password Reset APIs (no email yet - token returned in response)
==================================================== */

// helper: hash token before storing
function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

// POST /auth/forgot-password
app.post("/auth/forgot-password", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const qUser = "SELECT id FROM users WHERE email = ?";
  db.query(qUser, [email.trim()], (err, users) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (users.length === 0) {
      return res.status(404).json({ message: "No account found with this email" });
    }

    const userId = users[0].id;

    const resetToken = crypto.randomBytes(24).toString("hex");
    const tokenHash = sha256(resetToken);

    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    const insertQ = `
      INSERT INTO password_resets (user_id, token_hash, expires_at, used_at, created_at)
      VALUES (?, ?, ?, NULL, NOW())
    `;

    db.query(insertQ, [userId, tokenHash, expiresAt], (err2) => {
      if (err2) {
        return res.status(500).json({ message: "Database error", error: err2.message });
      }

      return res.status(200).json({
        message: "Reset code generated. Copy it and paste it to reset your password.",
        reset_token: resetToken,
        expires_in_minutes: 30,
      });
    });
  });
});

// POST /auth/reset-password
app.post("/auth/reset-password", async (req, res) => {
  const { reset_token, new_password } = req.body;

  if (!reset_token || !new_password) {
    return res.status(400).json({ message: "reset_token and new_password are required" });
  }

  if (String(new_password).length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  const tokenHash = sha256(String(reset_token).trim());

  const q = `
    SELECT id, user_id, expires_at, used_at
    FROM password_resets
    WHERE token_hash = ?
    ORDER BY id DESC
    LIMIT 1
  `;

  db.query(q, [tokenHash], async (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid reset code" });
    }

    const resetRow = rows[0];

    if (resetRow.used_at) {
      return res.status(400).json({ message: "This reset code was already used" });
    }

    const exp = new Date(resetRow.expires_at);
    if (isNaN(exp.getTime()) || exp < new Date()) {
      return res.status(400).json({ message: "Reset code expired. Please request a new one." });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(new_password, salt);

    const updateUserQ = "UPDATE users SET password_hash = ?, updated_at = NOW() WHERE id = ?";
    db.query(updateUserQ, [password_hash, resetRow.user_id], (err2) => {
      if (err2) {
        return res.status(500).json({ message: "Database error", error: err2.message });
      }

      const markUsedQ = "UPDATE password_resets SET used_at = NOW() WHERE id = ?";
      db.query(markUsedQ, [resetRow.id], (err3) => {
        if (err3) {
          return res.status(500).json({ message: "Database error", error: err3.message });
        }

        return res.status(200).json({ message: "Password updated successfully !" });
      });
    });
  });
});

/* ====================================================
   Properties APIs
==================================================== */

app.get("/properties", (req, res) => {
  const { country, type, minPrice, maxPrice, bedrooms } = req.query;

  let q = `
    SELECT 
      p.*,
      pi.image_path AS coverImage
    FROM properties p
    LEFT JOIN property_images pi 
      ON p.id = pi.property_id AND pi.is_cover = 1
    WHERE p.status = 'active'
  `;
  const params = [];

  if (country && country !== "All Countries") {
    q += " AND p.country = ?";
    params.push(country);
  }

  if (type && type !== "All Types") {
    q += " AND p.property_type = ?";
    params.push(type);
  }

  if (minPrice && !isNaN(Number(minPrice))) {
    q += " AND p.price_per_night >= ?";
    params.push(Number(minPrice));
  }

  if (maxPrice && !isNaN(Number(maxPrice))) {
    q += " AND p.price_per_night <= ?";
    params.push(Number(maxPrice));
  }

  if (bedrooms && bedrooms !== "All" && !isNaN(Number(bedrooms))) {
    q += " AND p.bedrooms = ?";
    params.push(Number(bedrooms));
  }

  q += " ORDER BY p.created_at DESC";

  db.query(q, params, (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    return res.status(200).json(data);
  });
});

app.get("/properties/:id", (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: "Valid property id is required" });
  }

  const propertyQ = "SELECT * FROM properties WHERE id = ?";
  db.query(propertyQ, [id], (err, propData) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    if (propData.length === 0)
      return res.status(404).json({ message: "Property not found" });

    const property = propData[0];

    const imagesQ =
      "SELECT id, image_path, is_cover, sort_order FROM property_images WHERE property_id = ? ORDER BY is_cover DESC, sort_order ASC, id ASC";

    db.query(imagesQ, [id], (err2, imagesData) => {
      if (err2)
        return res
          .status(500)
          .json({ message: "Database error", error: err2.message });

      const amenitiesQ =
        "SELECT a.id, a.name FROM amenities a INNER JOIN property_amenities pa ON pa.amenity_id = a.id WHERE pa.property_id = ? ORDER BY a.name ASC";

      db.query(amenitiesQ, [id], (err3, amenitiesData) => {
        if (err3)
          return res
            .status(500)
            .json({ message: "Database error", error: err3.message });

        return res.status(200).json({
          property: property,
          images: imagesData,
          amenities: amenitiesData,
        });
      });
    });
  });
});

/* ====================================================
   ✅ List Your Place APIs
   - Create property in DB
   - Upload 1 cover + multiple images
==================================================== */

// ✅ Create property + save amenities (by name)
app.post("/properties", requireAuth, (req, res) => {
  const {
    title,
    country,
    city,
    property_type,
    price_per_night,
    bedrooms,
    bathrooms,
    description,
    amenities, // array of strings like ["WiFi","Kitchen"]
  } = req.body;

  if (!title || !country || !city || !property_type || !description) {
    return res.status(400).json({
      message:
        "Missing required fields: title, country, city, property_type, description.",
    });
  }

  if (price_per_night === undefined || price_per_night === null || isNaN(Number(price_per_night))) {
    return res.status(400).json({ message: "price_per_night must be a valid number." });
  }

  if (bedrooms === undefined || bedrooms === null || isNaN(Number(bedrooms))) {
    return res.status(400).json({ message: "bedrooms must be a valid number." });
  }

  if (bathrooms !== undefined && bathrooms !== null && bathrooms !== "" && isNaN(Number(bathrooms))) {
    return res.status(400).json({ message: "bathrooms must be a valid number." });
  }

  const insertPropertyQ = `
    INSERT INTO properties
      (host_id, title, country, city, property_type, price_per_night, bedrooms, bathrooms, description, status, created_at, updated_at)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', NOW(), NOW())
  `;

  db.query(
    insertPropertyQ,
    [
      req.user.id,
      title.trim(),
      country.trim(),
      city.trim(),
      property_type.trim(),
      Number(price_per_night),
      Number(bedrooms),
      bathrooms === "" || bathrooms === undefined || bathrooms === null ? 0 : Number(bathrooms),
      description.trim(),
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err.message });
      }

      const propertyId = result.insertId;

      // no amenities
      if (!Array.isArray(amenities) || amenities.length === 0) {
        return res.status(201).json({
          message: "Property created ! Now upload images.",
          property_id: propertyId,
        });
      }

      const names = amenities.map((a) => String(a).trim()).filter(Boolean);

      const amenityQ = `SELECT id, name FROM amenities WHERE name IN (?)`;
      db.query(amenityQ, [names], (err2, rows) => {
        if (err2) {
          return res.status(500).json({ message: "Database error", error: err2.message });
        }

        if (rows.length === 0) {
          return res.status(201).json({
            message: "Property created ! (No matching amenities found). Now upload images.",
            property_id: propertyId,
          });
        }

        const values = rows.map((r) => [propertyId, r.id]);

        const insertPAQ = `
          INSERT IGNORE INTO property_amenities (property_id, amenity_id)
          VALUES ?
        `;

        db.query(insertPAQ, [values], (err3) => {
          if (err3) {
            return res.status(500).json({ message: "Database error", error: err3.message });
          }

          return res.status(201).json({
            message: "Property created! Amenities saved! Now upload images.",
            property_id: propertyId,
          });
        });
      });
    }
  );
});

// ✅ Upload cover + gallery images
const uploadPropertyImages = upload.fields([
  { name: "cover", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

app.post("/properties/:id/images", requireAuth, (req, res) => {
  const propertyId = Number(req.params.id);

  if (!propertyId || isNaN(propertyId)) {
    return res.status(400).json({ message: "Valid property id is required." });
  }

  // Only owner can upload
  const checkQ = `SELECT id FROM properties WHERE id = ? AND host_id = ?`;
  db.query(checkQ, [propertyId, req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error", error: err.message });
    if (rows.length === 0) {
      return res.status(403).json({ message: "Not allowed. You can only edit your own property." });
    }

    uploadPropertyImages(req, res, (uploadErr) => {
      if (uploadErr) {
        return res.status(400).json({ message: uploadErr.message });
      }

      const coverFile = req.files?.cover?.[0] || null;
      const imageFiles = req.files?.images || [];

      if (!coverFile && imageFiles.length === 0) {
        return res.status(400).json({ message: "Please upload at least 1 image (cover or gallery)." });
      }

      const rowsToInsert = [];
      let sort = 1;

      if (coverFile) {
        rowsToInsert.push([propertyId, `uploads/properties/${coverFile.filename}`, 1, 1]);
      }

      imageFiles.forEach((f) => {
        rowsToInsert.push([propertyId, `uploads/properties/${f.filename}`, 0, sort]);
        sort += 1;
      });

      const unsetCoverQ = `UPDATE property_images SET is_cover = 0 WHERE property_id = ?`;

      db.query(unsetCoverQ, [propertyId], (err2) => {
        if (err2) return res.status(500).json({ message: "Database error", error: err2.message });

        const insertQ = `
          INSERT INTO property_images (property_id, image_path, is_cover, sort_order)
          VALUES ?
        `;

        db.query(insertQ, [rowsToInsert], (err3) => {
          if (err3) return res.status(500).json({ message: "Database error", error: err3.message });

          return res.status(201).json({
            message: "Images uploaded! Property is now live!",
          });
        });
      });
    });
  });
});

/* ====================================================
   Booking APIs (MATCHING YOUR EXISTING TABLE)
==================================================== */

app.post("/bookings", optionalAuth, (req, res) => {
  const {
    property_id,
    guest_name,
    guest_email,
    guest_phone,
    check_in,
    check_out,
    guests_count,
    preferred_contact_method,
    preferred_payment_method,
    special_requests,
  } = req.body;

  const sendError = (status, message) => {
    return res.status(status).json({
      toastType: "error",
      message: message,
    });
  };

  const sendSuccess = (status, message, extra = {}) => {
    return res.status(status).json({
      toastType: "success",
      message: message,
      ...extra,
    });
  };

  if (!property_id) return sendError(400, "Please select a property.");
  if (!guest_name) return sendError(400, "Please enter your full name.");
  if (!guest_email) return sendError(400, "Please enter your email address.");
  if (!guest_phone) return sendError(400, "Please enter your phone number.");
  if (!check_in) return sendError(400, "Please select a check-in date.");
  if (!check_out) return sendError(400, "Please select a check-out date.");
  if (!guests_count) return sendError(400, "Please select number of guests.");

  if (isNaN(Number(property_id))) return sendError(400, "Invalid property ID.");
  if (isNaN(Number(guests_count)) || Number(guests_count) < 1) {
    return sendError(400, "Guests must be at least 1.");
  }

  const checkInDate = new Date(check_in);
  const checkOutDate = new Date(check_out);

  if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
    return sendError(400, "Invalid check-in or check-out date.");
  }

  if (checkOutDate <= checkInDate) {
    return sendError(400, "Check-out must be after check-in.");
  }

  const guestUserId = req.user ? req.user.id : null;

  const propQ = "SELECT id FROM properties WHERE id = ? AND status = 'active'";
  db.query(propQ, [Number(property_id)], (err, propData) => {
    if (err) return sendError(500, "Database error while checking property.");

    if (propData.length === 0) {
      return sendError(404, "This property was not found (or is not active).");
    }

    const insertQ = `
      INSERT INTO bookings
        (property_id, guest_user_id, guest_name, guest_email, guest_phone,
         check_in, check_out, guests_count,
         preferred_contact_method, preferred_payment_method, special_requests,
         status, created_at)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
    `;

    db.query(
      insertQ,
      [
        Number(property_id),
        guestUserId,
        guest_name,
        guest_email,
        guest_phone,
        check_in,
        check_out,
        Number(guests_count),
        preferred_contact_method || null,
        preferred_payment_method || null,
        special_requests || null,
      ],
      (err2, result) => {
        if (err2) return sendError(500, "Database error while creating booking.");

        return sendSuccess(201, "Booking request submitted! We will contact you soon.", {
          booking_id: result.insertId,
        });
      }
    );
  });
});

app.get("/bookings/my", requireAuth, (req, res) => {
  const q = `
    SELECT 
      b.*,
      p.title,
      p.city,
      p.country,
      pi.image_path AS coverImage
    FROM bookings b
    INNER JOIN properties p ON p.id = b.property_id
    LEFT JOIN property_images pi ON pi.property_id = p.id AND pi.is_cover = 1
    WHERE b.guest_user_id = ?
    ORDER BY b.created_at DESC
  `;

  db.query(q, [req.user.id], (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    return res.status(200).json(data);
  });
});

/* ====================================================
   Contact APIs
==================================================== */
app.post("/contact", optionalAuth, (req, res) => {
  const { full_name, email, message } = req.body;

  // Toast helpers (same pattern as bookings)
  const sendError = (status, msg) =>
    res.status(status).json({ toastType: "error", message: msg });

  const sendSuccess = (status, msg, extra = {}) =>
    res.status(status).json({ toastType: "success", message: msg, ...extra });

  if (!full_name || !email || !message) {
    return sendError(400, "Please fill in all fields.");
  }

  const userId = req.user ? req.user.id : null;

  const insertQ = `
    INSERT INTO contact_messages
      (user_id, full_name, email, message, status, created_at)
    VALUES
      (?, ?, ?, ?, 'new', NOW())
  `;

  db.query(
    insertQ,
    [userId, full_name.trim(), email.trim(), message.trim()],
    (err, result) => {
      if (err) {
        console.error(err);
        return sendError(500, "Database error while sending message.");
      }

      return sendSuccess(201, "Message sent! We will reply soon.", {
        contact_id: result.insertId,
      });
    }
  );
});


/* ----------------------------------------------------
   404 handler (keep near end)
---------------------------------------------------- */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ----------------------------------------------------
   Global Error Handler (MUST be last)
---------------------------------------------------- */
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof Error) {
    return res.status(400).json({ message: err.message });
  }

  next();
});

/* ----------------------------------------------------
   Server (keep at bottom)
---------------------------------------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
