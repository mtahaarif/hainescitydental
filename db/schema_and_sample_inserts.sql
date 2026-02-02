-- Schema for local import (staff + news)
-- FOLLOW THE HOSTGATOR SCHEMA EXACTLY (no extra columns).

CREATE TABLE IF NOT EXISTS `staff` (
  `id` varchar(50) NOT NULL,
  `NAME` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `news` (
  `id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `DATE` date DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `images` json DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Sample inserts (minimal, match exact column names)
INSERT INTO `staff` (id, `NAME`, role, bio, department, image)
VALUES ('00000000-0000-0000-0000-000000000001', 'Dr. Sohail Khan', 'Dentist', 'Bio for Dr. Khan', 'Doctors', '/team-2024/dr-sohail-khan.jpg');

INSERT INTO `news` (id, title, `DATE`, image, images, description)
VALUES ('00000000-0000-0000-0000-000000000101', 'Clinic Reopening', '2024-01-15', '/images/clinic-reopening.jpg', JSON_ARRAY(), 'We are reopening the clinic.');
