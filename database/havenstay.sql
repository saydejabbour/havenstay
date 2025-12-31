-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Dec 31, 2025 at 01:27 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `havenstay`
--
CREATE DATABASE IF NOT EXISTS `havenstay` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `havenstay`;

-- --------------------------------------------------------

--
-- Table structure for table `amenities`
--

DROP TABLE IF EXISTS `amenities`;
CREATE TABLE IF NOT EXISTS `amenities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `amenities`
--

INSERT INTO `amenities` (`id`, `name`) VALUES
(2, 'Air Conditioning'),
(7, 'Balcony'),
(8, 'Beach Access'),
(5, 'Kitchen'),
(4, 'Parking'),
(6, 'Pet Friendly'),
(3, 'Pool'),
(1, 'WiFi');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) NOT NULL,
  `guest_user_id` int(11) DEFAULT NULL,
  `guest_name` varchar(120) NOT NULL,
  `guest_email` varchar(190) NOT NULL,
  `guest_phone` varchar(30) NOT NULL,
  `check_in` date NOT NULL,
  `check_out` date NOT NULL,
  `guests_count` int(11) NOT NULL,
  `preferred_contact_method` varchar(30) NOT NULL,
  `preferred_payment_method` varchar(30) NOT NULL,
  `special_requests` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  KEY `guest_user_id` (`guest_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `property_id`, `guest_user_id`, `guest_name`, `guest_email`, `guest_phone`, `check_in`, `check_out`, `guests_count`, `preferred_contact_method`, `preferred_payment_method`, `special_requests`, `status`, `created_at`) VALUES
(1, 3, NULL, 'sayde jabbour', 'sayde.jabbour04@hotmail.com', '81336237', '2026-10-01', '2026-10-02', 3, 'email', 'cash', 'aaa', 'pending', '2025-12-28 18:29:21');

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `full_name` varchar(120) NOT NULL,
  `email` varchar(190) NOT NULL,
  `message` text NOT NULL,
  `status` varchar(20) DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `user_id`, `full_name`, `email`, `message`, `status`, `created_at`) VALUES
(1, 2, 'Sayde\'s Team', '52331215@students.liu.edu.lb', 'hello!', 'new', '2025-12-29 13:06:32'),
(2, 2, 'sayde jabbour', '52331215@students.liu.edu.lb', 'done', 'new', '2025-12-29 13:10:51'),
(3, 2, 'sayde jabbour', 'sayde.jabbour04@hotmail.com', 'aaaaaaa', 'new', '2025-12-30 12:45:45');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token_hash` varchar(255) NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`id`, `user_id`, `token_hash`, `expires_at`, `used_at`, `created_at`) VALUES
(1, 2, '2cf143e0803aebb903bd92cfb7793834cde1322b90c63b5d5541d79584f85c2d', '2025-12-29 09:18:27', '2025-12-29 09:18:27', '2025-12-29 09:17:41');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
CREATE TABLE IF NOT EXISTS `properties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `host_id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `country` varchar(80) NOT NULL,
  `city` varchar(80) NOT NULL,
  `property_type` varchar(50) NOT NULL,
  `price_per_night` decimal(10,2) NOT NULL,
  `bedrooms` int(11) NOT NULL,
  `bathrooms` int(11) NOT NULL,
  `description` text NOT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `host_id` (`host_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `host_id`, `title`, `country`, `city`, `property_type`, `price_per_night`, `bedrooms`, `bathrooms`, `description`, `status`, `created_at`, `updated_at`) VALUES
(3, 1, 'Cozy Apartment in Paris', 'France', 'Paris', 'Apartment', 120.00, 2, 1, 'A cozy apartment in the heart of Paris.', 'active', '2025-12-28 17:27:22', '2025-12-28 17:27:22'),
(4, 2, 'Beautiful beachfront villa', 'USA', 'New York', 'Villa', 250.00, 3, 2, 'Beautiful beach view, perfect for summer and family trip', 'active', '2025-12-29 09:39:28', '2025-12-29 09:39:28'),
(5, 2, 'Luxury Beachfront Villa', 'Greece', 'Santorini', 'Villa', 450.00, 4, 3, 'Experience the ultimate Greek island getaway in this stunning beachfront villa with breathtaking views of the Aegean Sea. Features include a private infinity pool, outdoor dining area, and direct beach access.', 'active', '2025-12-29 12:27:54', '2025-12-29 12:27:54'),
(6, 1, 'Mountain Chalet Retreat', 'Switzerland', 'Zermatt', 'Chalet', 380.00, 3, 2, 'Cozy alpine chalet nestled in the Swiss Alps with stunning mountain views. Perfect for ski enthusiasts with direct access to nearby slopes.', 'active', '2025-12-29 12:57:15', '2025-12-29 12:57:15'),
(7, 1, 'Modern City Apartment', 'France', 'Paris', 'Apartment', 220.00, 2, 1, 'Stylish apartment in the heart of Paris, walking distance to major attractions. Featuring contemporary design, full amenities, and a cozy living area.', 'active', '2025-12-29 12:57:15', '2025-12-29 12:57:15'),
(8, 1, 'Cozy Studio Downtown', 'USA', 'New York', 'Studio', 180.00, 1, 1, 'Compact and efficient studio in Manhattan\'s bustling downtown area. Ideal for solo travelers or couples looking to explore the city.', 'active', '2025-12-29 12:57:15', '2025-12-29 12:57:15'),
(9, 1, 'Secluded Forest Hut', 'Norway', 'Bergen', 'Hut', 150.00, 2, 1, 'Escape to nature in this charming wooden hut surrounded by pristine Norwegian forests. Experience tranquility with modern comforts.', 'active', '2025-12-29 12:57:15', '2025-12-29 12:57:15'),
(10, 1, 'Tropical Island Villa', 'Thailand', 'Phuket', 'Villa', 320.00, 3, 2, 'Luxurious villa surrounded by tropical gardens with a private pool. Enjoy the perfect blend of indoor-outdoor living with modern amenities.', 'active', '2025-12-29 12:57:15', '2025-12-29 12:57:15'),
(11, 1, 'Historic Apartment in Rome', 'Italy', 'Rome', 'Apartment', 250.00, 2, 1, 'Charming apartment in a historic Roman building, featuring high ceilings, original details, and easy access to major attractions.', 'active', '2025-12-29 12:57:15', '2025-12-29 12:57:15'),
(12, 1, 'Countryside Villa', 'Spain', 'Mallorca', 'Villa', 280.00, 3, 2, 'Relax in this spacious countryside villa with beautiful garden views. Perfect for family getaways and quiet weekends away from the city.', 'active', '2025-12-29 12:57:15', '2025-12-29 12:57:15');

-- --------------------------------------------------------

--
-- Table structure for table `property_amenities`
--

DROP TABLE IF EXISTS `property_amenities`;
CREATE TABLE IF NOT EXISTS `property_amenities` (
  `property_id` int(11) NOT NULL,
  `amenity_id` int(11) NOT NULL,
  PRIMARY KEY (`property_id`,`amenity_id`),
  KEY `amenity_id` (`amenity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_amenities`
--

INSERT INTO `property_amenities` (`property_id`, `amenity_id`) VALUES
(3, 1),
(3, 2),
(3, 5),
(3, 7),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 5),
(4, 7),
(5, 1),
(5, 2),
(5, 3),
(5, 4),
(5, 5),
(5, 6),
(5, 7),
(6, 1),
(6, 4),
(6, 5),
(6, 7),
(7, 1),
(7, 2),
(7, 4),
(7, 5),
(8, 1),
(8, 2),
(8, 5),
(9, 1),
(9, 4),
(9, 5),
(10, 1),
(10, 2),
(10, 3),
(10, 4),
(10, 5),
(11, 1),
(11, 5),
(11, 7),
(12, 1),
(12, 3),
(12, 4),
(12, 5);

-- --------------------------------------------------------

--
-- Table structure for table `property_images`
--

DROP TABLE IF EXISTS `property_images`;
CREATE TABLE IF NOT EXISTS `property_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) NOT NULL,
  `image_path` varchar(500) NOT NULL,
  `is_cover` tinyint(1) DEFAULT 0,
  `sort_order` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_images`
--

INSERT INTO `property_images` (`id`, `property_id`, `image_path`, `is_cover`, `sort_order`) VALUES
(3, 3, 'uploads/properties/paris.jpg', 1, 1),
(4, 4, 'uploads/properties/4_1767001168729_195c59b2ca71.jpeg', 1, 1),
(5, 4, 'uploads/properties/4_1767001168736_83272ef47a35.jpg', 0, 1),
(6, 5, 'uploads/properties/5_1767011274414_0c08fa3a6a84.jpg', 1, 1),
(7, 5, 'uploads/properties/5_1767011274417_df0e7dc4aa87.jpg', 0, 1),
(8, 6, 'uploads/properties/pexels-photo-11.jpg', 1, 1),
(9, 6, 'uploads/properties/pexels-photo-12.jpg', 0, 2),
(10, 6, 'uploads/properties/pexels-photo-13.jpg', 0, 3),
(11, 7, 'uploads/properties/pexels-photo-21.jpg', 1, 1),
(12, 7, 'uploads/properties/pexels-photo-22.jpg', 0, 2),
(13, 7, 'uploads/properties/pexels-photo-23.jpg', 0, 3),
(14, 8, 'uploads/properties/pexels-photo-31.jpg', 1, 1),
(15, 8, 'uploads/properties/pexels-photo-32.jpg', 0, 2),
(16, 8, 'uploads/properties/pexels-photo-33.jpg', 0, 3),
(17, 9, 'uploads/properties/pexels-photo-41.jpg', 1, 1),
(18, 9, 'uploads/properties/pexels-photo-42.jpg', 0, 2),
(19, 9, 'uploads/properties/pexels-photo-43.jpg', 0, 3),
(20, 10, 'uploads/properties/pexels-photo-51.jpg', 1, 1),
(21, 10, 'uploads/properties/pexels-photo-52.jpg', 0, 2),
(22, 10, 'uploads/properties/pexels-photo-53.jpg', 0, 3),
(23, 11, 'uploads/properties/pexels-photo-61.jpg', 1, 1),
(24, 11, 'uploads/properties/pexels-photo-62.jpg', 0, 2),
(25, 11, 'uploads/properties/pexels-photo-63.jpg', 0, 3),
(26, 12, 'uploads/properties/pexels-photo-71.jpg', 1, 1),
(27, 12, 'uploads/properties/pexels-photo-72.jpg', 0, 2),
(28, 12, 'uploads/properties/pexels-photo-73.jpg', 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(120) NOT NULL,
  `email` varchar(190) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password_hash`, `phone`, `created_at`, `updated_at`) VALUES
(1, 'Test Host', 'host1@demo.com', '$2a$10$wHf4Yx1R4b3E3cQWwX3v8e6V0oQF8xQf5w0rQYcXfN6o2hJ5mDg7C', '70000000', '2025-12-28 17:26:05', '2025-12-28 17:26:05'),
(2, 'Sayde Jabbour', '52331215@students.liu.edu.lb', '$2b$10$bXH5MYOZWCqd6hPBjOXyPOU76nxAryuVymUYK9ODAO2iknF7X/J0S', '81336237', '2025-12-29 09:09:49', '2025-12-29 09:51:28');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`guest_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD CONSTRAINT `contact_messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD CONSTRAINT `password_resets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`host_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_amenities`
--
ALTER TABLE `property_amenities`
  ADD CONSTRAINT `property_amenities_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `property_amenities_ibfk_2` FOREIGN KEY (`amenity_id`) REFERENCES `amenities` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_images`
--
ALTER TABLE `property_images`
  ADD CONSTRAINT `property_images_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
