## **HavenStay – Accommodation Finder Web Application**

HavenStay is a modern ReactJS-based web application designed to help users browse, explore, and book accommodations around the world. The platform focuses on clean UI/UX, responsive design, and a smooth user experience. Users can view property listings, check details, filter by country/type, book stays, and manage their profile. Logged-in users can also list new properties on the platform.

### **🚀 Live Demo**

🔗 https://havenstay-tawny.vercel.app/

### **📌 Features**

Fully responsive UI built with ReactJS + Tailwind CSS

Clean navigation using React Router DOM

Dynamic property details using URL parameters

Booking page with form handling

Login / Signup / Logout using localStorage session

Profile page with editable user information

List Property page (protected route)

Global property state with React Context API

Reusable components (Navbar, Footer, PropertyCard, Toast)

Fully deployed on Vercel

### **🔑 Key Code (Summaries)**

Layout Component

Wraps the entire application with a Navbar, Footer, and an <Outlet /> for page rendering.

MyPropertiesContext

Stores all default properties + new properties added by users. Accessible across all pages.

App Routing

Defines all routes, protected routes (Profile + List Property), and wraps everything with Layout and Providers.

Authentication

User data is stored in localStorage so the session persists across refresh.

### **🛠️ Technologies Used**

ReactJS

React Router DOM

Tailwind CSS

Lucide Icons

Vercel Deployment

Git & GitHub Version Control

### **📥 Installation & Setup**

# Clone repository

git clone https://github.com/saydejabbour/havenstay

# Navigate to project

cd havenstay

# Install dependencies

npm install

# Run development server

npm run dev

### **📌 Future Improvements**

Real backend for authentication(next part)

Database for properties(next part)

### **👥 Team Members**

Sayde Jabbour – 52331215

Fatat Mustapha – 52210298

Instructor: Dr. Ahmad Trad
Semester: Fall 2025–2026
