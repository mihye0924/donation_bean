-- 기부
CREATE TABLE `donation` (
  `donation_no` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(10) DEFAULT NULL,
  `donation_name` varchar(50) DEFAULT NULL,
  `donation_company` varchar(20) DEFAULT NULL,
  `donation_goal` bigint DEFAULT NULL,
  `donation_current` bigint DEFAULT NULL,
  `donation_period` date DEFAULT NULL,
  `donation_category` varchar(10) DEFAULT NULL,
  `donation_createAt` date DEFAULT NULL,
  `donation_status` int DEFAULT NULL,
  PRIMARY KEY (`donation_no`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `donation_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 좋아요
CREATE TABLE `fav` (
  `fav_no` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(10) DEFAULT NULL,
  `donation_no` int DEFAULT NULL,
  PRIMARY KEY (`fav_no`),
  KEY `user_id` (`user_id`),
  KEY `donation_no` (`donation_no`),
  CONSTRAINT `fav_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `fav_ibfk_2` FOREIGN KEY (`donation_no`) REFERENCES `donation` (`donation_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--  유저
 CREATE TABLE `user` (
  `user_no` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(10) DEFAULT NULL,
  `user_id` varchar(10) DEFAULT NULL,
  `user_pw` varchar(100) DEFAULT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `user_nick` varchar(10) DEFAULT NULL,
  `user_phone` varchar(20) DEFAULT NULL,
  `user_enum` int DEFAULT NULL,
  `user_createAt` date DEFAULT NULL,
  PRIMARY KEY (`user_no`),
  KEY `index_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;