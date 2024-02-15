-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: donation
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `donation_no` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(10) DEFAULT NULL,
  `donation_name` varchar(50) DEFAULT NULL,
  `donation_image` varchar(100) DEFAULT NULL,
  `donation_content` varchar(255) DEFAULT NULL,
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation`
--

LOCK TABLES `donation` WRITE;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fav`
--

DROP TABLE IF EXISTS `fav`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fav`
--

LOCK TABLES `fav` WRITE;
/*!40000 ALTER TABLE `fav` DISABLE KEYS */;
/*!40000 ALTER TABLE `fav` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_no` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(10) DEFAULT NULL,
  `user_avatar` varchar(100) DEFAULT NULL,
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'donation'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-15 15:35:30
