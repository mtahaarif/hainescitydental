-- HostGator MySQL schema for news and staff tables
-- Run this in your HostGator database (phpMyAdmin or MySQL client)

CREATE TABLE IF NOT EXISTS `news` (
  `id` VARCHAR(64) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `images` JSON DEFAULT (JSON_ARRAY()),
  `date` DATETIME NOT NULL,
  `slug` VARCHAR(255) UNIQUE,
  `published` TINYINT(1) DEFAULT 0,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL
);

CREATE INDEX IF NOT EXISTS `idx_news_published` ON `news` (`published`);
CREATE INDEX IF NOT EXISTS `idx_news_date` ON `news` (`date`);

CREATE TABLE IF NOT EXISTS `staff` (
  `id` VARCHAR(64) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NOT NULL,
  `bio` LONGTEXT NOT NULL,
  `image` VARCHAR(512),
  `department` VARCHAR(255),
  `experience` INT DEFAULT 0,
  `order` INT DEFAULT 0,
  `active` TINYINT(1) DEFAULT 1,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL
);

CREATE INDEX IF NOT EXISTS `idx_staff_active` ON `staff` (`active`);
CREATE INDEX IF NOT EXISTS `idx_staff_order` ON `staff` (`order`);
