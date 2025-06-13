-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: rm-wz9knw0ns4e8q8584do.mysql.rds.aliyuncs.com    Database: test1
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `activity_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `target_audience` varchar(50) DEFAULT NULL,
  `organizer` varchar(100) DEFAULT NULL,
  `description` text,
  `activity_type` varchar(50) DEFAULT NULL,
  `credit_type` varchar(50) DEFAULT NULL,
  `participation_channel` varchar(50) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `max_participants` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `new_id` int DEFAULT NULL,
  PRIMARY KEY (`activity_id`),
  KEY `idx_activity_type` (`activity_type`),
  KEY `idx_status` (`status`),
  KEY `idx_start_time` (`start_time`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,'閲戣瀺绉戞妧鍒涙柊璁插骇','2024-03-28 14:00:00','2024-03-28 16:00:00','鍥句功棣嗘姤鍛婂巺','鍏ㄦ牎','閲戣瀺鍗氱墿棣嗗闄?,'鎺㈣閲戣瀺绉戞妧鍙戝睍瓒嬪娍锛岄個璇蜂笟鍐呬笓瀹跺垎浜墠娌挎妧鏈簲鐢?,'浜岃','鍒涙柊鍒涗笟','绾夸笅','https://example.com/images/fintech.jpg','https://meeting.example.com/fintech','杩涜涓?,200,'2025-03-26 07:50:44','2025-04-16 05:40:41',1),(2,'蹇楁効鑰呮湇鍔℃椿鍔細鍏崇埍鑰佸勾浜?,'2024-03-30 09:00:00','2024-03-30 17:00:00','甯傚吇鑰侀櫌','鍏ㄦ牎','鏍″洟濮?,'缁勭粐蹇楁効鑰呭墠寰€鍏昏€侀櫌锛屼负鑰佸勾浜烘彁渚涘叧鐖辨湇鍔?,'缁兼祴','蹇楁効鏈嶅姟','绾夸笅','https://example.com/images/volunteer.jpg',NULL,'杩涜涓?,50,'2025-03-26 07:50:44','2025-04-16 05:40:41',2),(3,'鏁板瓧缁忔祹璁哄潧','2024-04-01 19:00:00','2024-04-01 21:00:00','绾夸笂鐩存挱','鍏ㄦ牎','缁忔祹瀛﹂櫌','鎺㈣鏁板瓧缁忔祹鍙戝睍瓒嬪娍锛屽垎鏋愭柊鍟嗕笟妯″紡','浜岃缁兼祴','瀛︽湳浜ゆ祦','绾夸笂','https://example.com/images/digital-economy.jpg','https://live.example.com/forum','鏈紑濮?,NULL,'2025-03-26 07:50:44','2025-04-16 05:40:41',3),(4,'鐚棰勫憡锝滅儹琛€闈掓槬锛屼负鐖辩画鑸?,'2025-03-18 16:21:33','2025-03-18 18:21:33','骞垮窞/鏈儴鏍″尯','涓嶉檺','骞块噾鏍″洟濮?,'鍏朵粬','浜岃缁兼祴','蹇楁効鍏泭','绾夸笅',NULL,'https://mp.weixin.qq.com/s/sY8eGcx4bqI9_Emjmpfx3A','宸茬粨鏉?,NULL,'2025-04-16 05:30:19','2025-04-16 05:53:23',4),(5,'鎬ユ晳璇佸煿璁?| 涓虹敓鍛界画鑸紝缁欑敓娲绘坊瀹?,'2025-03-11 15:32:59','2025-03-11 17:32:59','骞垮窞/鏈儴鏍″尯','涓嶉檺',NULL,'鍏朵粬','浜岃缁兼祴','鎶€鑳界壒闀?,'绾夸笅',NULL,'https://mp.weixin.qq.com/s/bt6Nfx4HxCaEwDOrjaCkUg','宸茬粨鏉?,NULL,'2025-04-16 05:30:19','2025-04-16 05:53:26',5),(6,'鏃跺厜鎱㈤€掞綔鍥炲繂涔嬬害锛屽睍鏈涗箣绋?,'2025-03-16 13:16:35','2025-03-16 15:16:35','骞垮窞/鏈儴鏍″尯','涓嶉檺',NULL,'鍏朵粬','浜岃缁兼祴','鏂囦綋娲诲姩','绾夸笅',NULL,'https://mp.weixin.qq.com/s/87O4HZJPEG5s_f-bV5tyTw','宸茬粨鏉?,NULL,'2025-04-16 05:30:19','2025-04-16 05:53:29',6),(7,'鐖卞績n甯畁娲诲姩 | 璁╃埍鐢熸牴锛岃姊﹀彂鑺?,'2025-03-04 15:00:42','2025-03-04 17:00:42','骞垮窞/鏈儴鏍″尯','涓嶉檺','骞夸笢閲戣瀺瀛﹂櫌淇＄敤绠＄悊瀛﹂櫌','鍏朵粬','浜岃','蹇楁効鍏泭','绾夸笅',NULL,'https://mp.weixin.qq.com/s/phexFi1sijY0PBIydrMQUg','宸茬粨鏉?,NULL,'2025-04-16 05:30:19','2025-04-16 05:53:32',7),(8,'蹇冨崗 | 缃戠粶浣跨敤瀵逛簬蹇冪悊鍋ュ悍鐨勫奖鍝?,'2025-03-19 12:21:22','2025-03-19 14:21:22','涓嶉檺','涓嶉檺','骞块噾璐㈡柊瀛﹂櫌','鍏朵粬','浜岃','鎬濇兂鎴愰暱','绾夸笅',NULL,'https://mp.weixin.qq.com/s/4n4FUE0flVq0mzTYqwIW6w','宸茬粨鏉?,NULL,'2025-04-16 05:30:19','2025-04-16 05:53:34',8),(9,'瀹℃牳璇勪及锝滄湰绉戞暀鑲叉暀瀛︾壒鑹叉潗鏂欙細鎵撻€犫€滅孩鑹?閲戣壊+鐗硅壊鈥濇€濇斂鑲蹭汉鏂版ā寮忥紝钀藉疄绔嬪痉鏍戜汉鏍规湰浠诲姟','2025-03-14 14:37:04','2025-03-14 16:37:04','涓嶉檺','涓嶉檺','骞块噾鍥藉閲戣瀺瀛﹀闄?,'鍏朵粬','缁兼祴','鏈?,'绾夸笅',NULL,'https://mp.weixin.qq.com/s/BFOsF6lEAXOarilC_aXoSw','宸茬粨鏉?,NULL,'2025-04-16 05:30:19','2025-04-16 05:53:36',9),(10,'绗洓鍗佷節灞婁細璁″ぇ璁插爞 | AI瀹¤鐨勬椂浠ｅ凡缁忓埌鏉ワ紒','2025-03-16 20:12:30','2025-03-16 22:12:30','涓嶉檺','涓嶉檺',NULL,'鍏朵粬','浜岃','鍒涙柊鍒涗笟','绾夸笅',NULL,'https://mp.weixin.qq.com/s/ewIx3vNaxyu3-O1Owg7aeQ','宸茬粨鏉?,NULL,'2025-04-16 05:30:19','2025-04-16 05:53:38',10),(11,'閲戣瀺涓庢姇璧勫闄㈠厷濮斻€佸浗淇¤瘉鍒稿箍宸炲垎鍏徃鍏氬 寮€灞曗€滀紶鎵垮箔鍗楁枃鑴夛紝鍏辨鍏氬憳鏂扮豢鈥濅富棰樺厷鏃ュ叡寤烘椿鍔?,'2025-03-17 10:00:00','2025-03-17 12:00:00','涓嶉檺','閲戣瀺涓庢姇璧勫闄?,NULL,'鍏朵粬','浜岃','蹇楁効鍏泭','绾夸笅',NULL,'https://mp.weixin.qq.com/s/kIrbko32gQt4iKDf7MtBhA','宸茬粨鏉?,NULL,'2025-04-16 05:30:19','2025-04-16 05:53:41',11),(12,'鏁扮粺瀛﹂櫌濂栧嫟鍔╄捶涓績鎷涙柊鍟︼紒','2025-03-18 15:47:01','2025-03-18 17:47:01','涓嶉檺','閲戣瀺鏁板涓庣粺璁″闄?,'骞块噾鏁扮粺瀛﹂櫌','鍏朵粬','浜岃缁兼祴','鑿佽嫳鎴愰暱','绾夸笅',NULL,'https://mp.weixin.qq.com/s/0jJQZ-dzNXELI1RuBEoVZw','宸茬粨鏉?,NULL,'2025-04-16 05:30:19','2025-04-16 05:53:45',12),(13,'骞块噾鈥滄牎鍥仴搴疯窇鈥濆贰鏌ラ€氱煡锛?,'2025-03-14 12:22:32','2025-03-14 14:22:32','涓嶉檺','涓嶉檺','閲戦櫌鏄ョ','鍏朵粬','浜岃','鏂囦綋娲诲姩','绾夸笅',NULL,'https://mp.weixin.qq.com/s/1pbkl0nClJ5v2SdTma38nA','宸茬粨鏉?,NULL,'2025-04-16 05:30:19','2025-04-16 05:53:47',13),(14,'骞块噾缁兼祴娲诲姩133 | 闈㈠悜閲戞姇闄㈠鐢燂紝鏈夋晥鍙備笌娲诲姩鍗冲彲寰楁€濇兂鎴愰暱瀛﹀垎锛?,'2025-03-16 20:31:19','2025-03-16 22:31:19','涓嶉檺','閲戣瀺涓庢姇璧勫闄?,'iknow鍘傚叏','鍏朵粬','浜岃缁兼祴','鎬濇兂鎴愰暱','绾夸笅',NULL,'https://mp.weixin.qq.com/s/Fc6unsw2-LoNrru-MoCSvg','宸茬粨鏉?,NULL,'2025-04-16 05:30:19','2025-04-16 05:53:49',14),(15,'娉ㄦ剰锛佷綋鑲茶ˉ娴嬫湰鍛ㄤ簲寮€濮?,'2024-11-11 17:47:04','2024-11-11 19:47:04','骞垮窞/鏈儴鏍″尯,娓呰繙鏍″尯','涓嶉檺','鏈嶅姟灏忔潙搴?,'浣撴祴','浜岃缁兼祴','鏂囦綋娲诲姩','绾夸笅',NULL,'https://mp.weixin.qq.com/s/aywO4ImAZYQ2Ru4uHksLXg','宸茬粨鏉?,NULL,'2025-04-16 05:30:19','2025-04-16 05:53:52',15),(16,'骞块噾鍚屽娉ㄦ剰浜嗭紒瑕佸贰鏌モ€滄牎鍥仴搴疯窇鈥濓紒','2025-03-14 11:53:53','2025-03-14 13:53:53','涓嶉檺','涓嶉檺','濂戒汉甯堝厔','鍏朵粬','浜岃','鏂囦綋娲诲姩','绾夸笅',NULL,'https://mp.weixin.qq.com/s/hTMOzqSgFGpN-xx_NxXNuQ','宸茬粨鏉?,NULL,'2025-04-16 05:30:19','2025-04-16 05:53:57',16);
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activityparticipants`
--

DROP TABLE IF EXISTS `activityparticipants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activityparticipants` (
  `participation_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `activity_id` int DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `registered_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`participation_id`),
  KEY `activity_id` (`activity_id`),
  KEY `activityparticipants_ibfk_1` (`user_id`),
  CONSTRAINT `activityparticipants_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `activityparticipants_ibfk_2` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activityparticipants`
--

LOCK TABLES `activityparticipants` WRITE;
/*!40000 ALTER TABLE `activityparticipants` DISABLE KEYS */;
/*!40000 ALTER TABLE `activityparticipants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_tokens`
--

DROP TABLE IF EXISTS `admin_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL,
  `token` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_agent` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '鐢ㄦ埛浠ｇ悊淇℃伅',
  `ip_address` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'IP鍦板潃',
  `expires_at` datetime NOT NULL,
  `last_used_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `token` (`token`),
  UNIQUE KEY `admin_tokens_token` (`token`),
  UNIQUE KEY `admin_tokens_token_idx` (`token`),
  KEY `admin_id` (`admin_id`),
  KEY `expires_at` (`expires_at`),
  KEY `admin_tokens_admin_id` (`admin_id`),
  KEY `admin_tokens_expires_at` (`expires_at`),
  KEY `admin_tokens_admin_id_idx` (`admin_id`),
  CONSTRAINT `admin_tokens_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_tokens`
--

LOCK TABLES `admin_tokens` WRITE;
/*!40000 ALTER TABLE `admin_tokens` DISABLE KEYS */;
INSERT INTO `admin_tokens` VALUES (3,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTIxNzA2NCwiZXhwIjoxNzQ1MjI0MjY0fQ.uQLWZ8_0p3vwR3GjEG0GxnHcpfHtHJrN6e8PqH9a-dA',NULL,NULL,'2025-04-21 16:31:04','2025-04-21 14:31:04','2025-04-21 14:31:04','2025-04-21 14:35:30','2025-04-21 14:35:30'),(4,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTIxNzMzMCwiZXhwIjoxNzQ1MjI0NTMwfQ.pgBkF4tVOurPF-pfYUj4KHOUfTydfmEAf6jccbkSSr4',NULL,NULL,'2025-04-21 16:35:30','2025-04-21 14:35:30','2025-04-21 14:35:30','2025-04-21 14:37:10','2025-04-21 14:37:09'),(5,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTIxNzQyOSwiZXhwIjoxNzQ1MjI0NjI5fQ.N6A8_ox1Hnuy2o3kKAkgBE1mkybIo-Qel7UxjSt3rkg',NULL,NULL,'2025-04-21 16:37:09','2025-04-21 14:37:09','2025-04-21 14:37:09','2025-04-21 14:40:38','2025-04-21 14:40:38'),(6,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTIxNzYzOCwiZXhwIjoxNzQ1MjI0ODM4fQ.4Xf5kx2AFEGudlC7Hy7lQOC2cS_ax5kygGgZdxf4rP8',NULL,NULL,'2025-04-21 16:40:38','2025-04-21 14:40:38','2025-04-21 14:40:38','2025-04-21 14:41:28','2025-04-21 14:41:28'),(7,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTIxNzY4OCwiZXhwIjoxNzQ1MjI0ODg4fQ.Z181k6040yAnLNLsFPZyy3YP6b-QNPHzEJVfgeW-bF4',NULL,NULL,'2025-04-21 16:41:28','2025-04-21 14:41:28','2025-04-21 14:41:28','2025-04-21 14:41:54','2025-04-21 14:41:54'),(8,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTIxNzcxNCwiZXhwIjoxNzQ1MjI0OTE0fQ.fKXtrwOQO3Fc-8aJvMTEw0Ykx_VljzuAQwXsZYc0Lag',NULL,NULL,'2025-04-21 16:41:54','2025-04-21 14:41:54','2025-04-21 14:41:54','2025-04-21 14:43:25','2025-04-21 14:43:25'),(9,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTIxNzgwNSwiZXhwIjoxNzQ1MjI1MDA1fQ.Qk535gHp5lyrOQQ1dLxIYyIu0Odb3SMuvnHZD6JUzpY',NULL,NULL,'2025-04-21 16:43:25','2025-04-21 14:43:25','2025-04-21 14:43:25','2025-04-21 14:44:15','2025-04-21 14:44:15'),(10,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTIxNzg1NSwiZXhwIjoxNzQ1MjI1MDU1fQ.kPBwLKjEGTKuH-qE2RGS5U8cOn50LvxoWWXKsSHLQSU',NULL,NULL,'2025-04-21 16:44:15','2025-04-21 14:44:15','2025-04-21 14:44:15','2025-04-21 14:45:57','2025-04-21 14:45:57'),(11,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTIxNzk1NywiZXhwIjoxNzQ1MjI1MTU3fQ.M4Ar3Anh748UR9CA-ohlFl__xYOHhK7KdRvHYLNdob8',NULL,NULL,'2025-04-21 16:45:57','2025-04-21 14:45:57','2025-04-21 14:45:57','2025-04-21 14:48:11','2025-04-21 14:48:11'),(12,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTIxODA5MSwiZXhwIjoxNzQ1MjI1MjkxfQ.40eycfPTXW5ZGXsHanmtrfd40UzYvlaHsDoX44GDgaw',NULL,NULL,'2025-04-21 16:48:11','2025-04-21 14:48:11','2025-04-21 14:48:11','2025-04-21 14:49:37','2025-04-21 14:49:37'),(13,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTIxODE3NywiZXhwIjoxNzQ1MjI1Mzc3fQ.53gWM6zaaaXEdbR2n-w13Em7vw_684MRHVcHjZ6pOPE',NULL,NULL,'2025-04-21 16:49:37','2025-04-21 14:49:37','2025-04-21 14:49:37','2025-04-21 14:50:59','2025-04-21 14:50:59'),(14,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTIxODI1OSwiZXhwIjoxNzQ1MjI1NDU5fQ.uzSgNWvJT8YYnz3zEOHy36EBSyJ3qDiuw2vvaHffOZE',NULL,NULL,'2025-04-21 16:50:59','2025-04-21 14:50:59','2025-04-21 14:50:59','2025-04-21 14:52:03','2025-04-21 14:52:03'),(15,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTIxODMyMywiZXhwIjoxNzQ1MjI1NTIzfQ.1ATMHSwnF3TcKq9w-vW6XVX4oIMppnweovOQP8opsB0',NULL,NULL,'2025-04-21 16:52:03','2025-04-21 14:52:03','2025-04-21 14:52:03','2025-04-21 14:52:22','2025-04-21 14:52:22'),(16,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTIxODM0MiwiZXhwIjoxNzQ1MjI1NTQyfQ.qT1kWdUCEsinshsDdWBFPvj_T-WUM-TkG8fFG4qqOSA',NULL,NULL,'2025-04-21 16:52:22','2025-04-21 14:52:22','2025-04-21 14:52:22','2025-04-21 14:56:29','2025-04-21 14:56:29'),(17,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTIxODU4OSwiZXhwIjoxNzQ1MjI1Nzg5fQ.mlRpqMsoZmc5FPBEoGt0yeb_mgRV68yS-40tBDMllMY','Mozilla/5.0 (Windows NT 10.0; Win64; x64)','127.0.0.1','2025-04-21 16:56:29','2025-04-21 14:56:29','2025-04-21 14:56:29','2025-04-21 20:20:16','2025-04-21 20:20:16'),(18,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTIzODAxNiwiZXhwIjoxNzQ1MjQ1MjE2fQ.aN25ibi45arzYW9dw4Naznhzg-E5tyqPs-x4Tlpj_yA','bruno-runtime/.0.1','127.0.0.1','2025-04-21 22:20:16','2025-04-21 20:54:28','2025-04-21 20:20:16','2025-04-21 21:04:18','2025-04-21 21:04:18'),(19,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbmFkbWluQGdkdWYuY29tIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzQ1MjQwMjMzLCJleHAiOjE3NDUyNDc0MzN9.oNDcitw1wIq526Q3xO5JoUiI0xs2fjV2u1GUuJKMUrU','bruno-runtime/.0.1','127.0.0.1','2025-04-21 22:57:13','2025-04-21 21:03:22','2025-04-21 20:57:13','2025-04-21 21:06:26','2025-04-21 21:06:26'),(20,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTI0MDY1OCwiZXhwIjoxNzQ1MjQ3ODU4fQ.6muKVtDxu_QWQ3KX0IJ0TKiEaDnopJ_OMpjDcUe9Gb4','bruno-runtime/.0.1','127.0.0.1','2025-04-21 23:04:18','2025-04-21 21:04:22','2025-04-21 21:04:18','2025-04-21 21:30:55','2025-04-21 21:30:55'),(21,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbmFkbWluQGdkdWYuY29tIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzQ1MjQwNzg2LCJleHAiOjE3NDUyNDc5ODZ9.VLFjbZsuCjHE65N6-7yQz5oo3FoGRjeGUs5tlTOqya4','bruno-runtime/.0.1','127.0.0.1','2025-04-21 23:06:26','2025-04-21 21:24:03','2025-04-21 21:06:26','2025-04-21 21:24:03','2025-04-21 21:24:03'),(22,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTI0MjI1NSwiZXhwIjoxNzQ1MjQ5NDU1fQ.yRJfIZtOPq93PLwNULjipmQfcylYGENHRkqx6WzZjPg','bruno-runtime/.0.1','127.0.0.1','2025-04-21 23:30:55','2025-04-21 21:31:12','2025-04-21 21:30:55','2025-04-21 21:31:12','2025-04-21 21:31:12'),(23,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTI0MjY2NywiZXhwIjoxNzQ1MjQ5ODY3fQ.nxb8EOvKGTIdMSAsoqk-5tOH8HGQzlQN-or15evHSIQ','bruno-runtime/.0.1','127.0.0.1','2025-04-21 23:37:47','2025-04-21 21:44:02','2025-04-21 21:37:47','2025-04-21 21:44:06','2025-04-21 21:44:06'),(24,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTI0MzA0NiwiZXhwIjoxNzQ1MjUwMjQ2fQ.oZPCXR3IZi4py97GIJbwH1c45i5hONPdncYY6LbNUBU','bruno-runtime/.0.1','127.0.0.1','2025-04-21 23:44:06','2025-04-21 21:44:11','2025-04-21 21:44:06','2025-04-21 21:44:11','2025-04-21 21:44:11'),(25,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTI0MzA5NiwiZXhwIjoxNzQ1MjUwMjk2fQ.YEfJw6ZhRXh9NE_LTOoh_0Dutx8Q1ZT6Cchjtgw3tQg','bruno-runtime/.0.1','127.0.0.1','2025-04-21 23:44:56','2025-04-21 21:44:59','2025-04-21 21:44:56','2025-04-21 21:44:59','2025-04-21 21:44:59'),(26,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTI0MzE2NCwiZXhwIjoxNzQ1MjUwMzY0fQ.mJQ1YEOAgbEPkuegvKOVsNvGUxk_XHvh8C2rWOgPgns','bruno-runtime/.0.1','127.0.0.1','2025-04-21 23:46:04','2025-04-21 21:46:11','2025-04-21 21:46:04','2025-04-21 21:46:11','2025-04-21 21:46:11'),(27,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTI0MzIxNywiZXhwIjoxNzQ1MjUwNDE3fQ.aaNGYCtYcmto9jN_uZWzQs3B0h6TpHAsUecT-IjOOvw','bruno-runtime/.0.1','127.0.0.1','2025-04-21 23:46:57','2025-04-21 21:46:59','2025-04-21 21:46:57','2025-04-21 21:46:59','2025-04-21 21:46:59'),(28,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTI0MzMxMCwiZXhwIjoxNzQ1MjUwNTEwfQ.VptU9kfWz1UaNFb1Nc8huzYx8Cf7W8KBZnZK3HZUB-w','bruno-runtime/.0.1','127.0.0.1','2025-04-21 23:48:30','2025-04-21 21:48:32','2025-04-21 21:48:30','2025-04-21 21:48:32','2025-04-21 21:48:32'),(29,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTI0MzMyMywiZXhwIjoxNzQ1MjUwNTIzfQ.bpQm0kAzgmCq5C_0C8Wrp9LyVT8M4EGJrVWe5SmoEuk','bruno-runtime/.0.1','127.0.0.1','2025-04-21 23:48:43','2025-04-21 22:00:16','2025-04-21 21:48:43','2025-04-21 22:01:09','2025-04-21 22:01:09'),(30,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTI0NDA2OSwiZXhwIjoxNzQ1MjUxMjY5fQ.9S8JphVahl1WvADpHqaftAqHrADtUDDa5rNqq3cNJwM','bruno-runtime/.0.1','127.0.0.1','2025-04-22 00:01:09','2025-04-21 23:09:41','2025-04-21 22:01:09','2025-04-21 23:11:15','2025-04-21 23:11:15'),(31,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6ImVkaXRvciIsImVtYWlsIjoiZWRpdG9yMkB0ZXN0LmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTI0ODI1MCwiZXhwIjoxNzQ1MjU1NDUwfQ.Rpy5LyjuqZMXLgVD5Eg4LMQCzDblmrKsjPp9RUda63E','bruno-runtime/.0.1','127.0.0.1','2025-04-22 01:10:50','2025-04-21 23:11:07','2025-04-21 23:10:50','2025-04-21 23:11:07',NULL),(32,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTI0ODI3NSwiZXhwIjoxNzQ1MjU1NDc1fQ.MOPNrVC61HRqwKkWppvfm67jIIRu_A0hCx259EIh_7c','bruno-runtime/.0.1','127.0.0.1','2025-04-22 01:11:15','2025-04-21 23:17:54','2025-04-21 23:11:15','2025-04-21 23:20:08','2025-04-21 23:20:08'),(33,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZSI6ImVkaXRvciIsImVtYWlsIjoiZWRpdG9yM0B0ZXN0LmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTI0ODcwMCwiZXhwIjoxNzQ1MjU1OTAwfQ.BAzNIYdDCYCnpynRns8aeD4-G8iKYdZV8e2Nsw4BfWw','Mozilla/5.0 (Windows NT 10.0; Win64; x64)','127.0.0.1','2025-04-22 01:18:20','2025-04-21 23:18:20','2025-04-21 23:18:20','2025-04-21 23:18:20',NULL),(34,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTI0ODgwOCwiZXhwIjoxNzQ1MjU2MDA4fQ.5CRPES6lLeY52l2IOL218QXTZbj5vLKeefvGMlRFNt0','bruno-runtime/.0.1','127.0.0.1','2025-04-22 01:20:08','2025-04-21 23:20:32','2025-04-21 23:20:08','2025-04-21 23:23:25','2025-04-21 23:23:25'),(35,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTI0OTAwNSwiZXhwIjoxNzQ1MjU2MjA1fQ.L_5fVdZZqfZaVybz6euTMfJDNZzeONQ08V3H6Byiiw4','bruno-runtime/.0.1','127.0.0.1','2025-04-22 01:23:25','2025-04-21 23:39:30','2025-04-21 23:23:25','2025-04-22 11:24:38','2025-04-22 11:24:39'),(36,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTI5MjI3OSwiZXhwIjoxNzQ1Mjk5NDc5fQ.ZhzjznlkcZoF-Je_GO93AjAJVH7EopTSaPoygcQQ-Yk','bruno-runtime/.0.1','127.0.0.1','2025-04-22 13:24:39','2025-04-22 11:34:15','2025-04-22 11:24:39','2025-04-24 09:35:26','2025-04-24 09:35:26'),(37,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTQ1ODUyNiwiZXhwIjoxNzQ1NDY1NzI2fQ.L1bZEQ7K3UE5wrczuR5wa18a0fwa5sX-G5uLawSk4AU','bruno-runtime/.0.1','127.0.0.1','2025-04-24 11:35:26','2025-04-24 09:35:51','2025-04-24 09:35:26','2025-04-25 15:00:25','2025-04-25 15:00:25'),(38,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTU2NDU5MCwiZXhwIjoxNzQ1NTcxNzkwfQ.JqKChAFP8NlObWwBcFOgXZrERToTcY12zFLWr3MwNms','Mozilla/5.0 (Windows NT 10.0; Win64; x64)','127.0.0.1','2025-04-25 17:03:10','2025-04-25 15:03:10','2025-04-25 15:03:10','2025-04-25 15:12:12','2025-04-25 15:12:12'),(39,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTU2NTEzMiwiZXhwIjoxNzQ1NTcyMzMyfQ.M5_sx7owPYegrBH10LAAXSG7Ng7gMrMfn9_K5rfWRio','bruno-runtime/2.2.0','127.0.0.1','2025-04-25 17:12:12','2025-04-25 15:54:37','2025-04-25 15:12:12','2025-04-27 23:10:55','2025-04-27 23:10:55'),(40,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NTc2NjY1NSwiZXhwIjoxNzQ1NzczODU1fQ.mZIuQSf4RBBxkvoe-sTOcHWwKyu9RUuFZbzZuAuzxX0','bruno-runtime/2.2.0','127.0.0.1','2025-04-28 01:10:55','2025-04-27 23:10:59','2025-04-27 23:10:55','2025-05-23 23:13:45','2025-05-23 23:13:45'),(41,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0ODAxMzIyNSwiZXhwIjoxNzQ4MDIwNDI1fQ.67ZlxY7kiiVBExkPUjPU8txW35DpV7zVoMXQFUwSedE','bruno-runtime/2.2.0','127.0.0.1','2025-05-24 01:13:45','2025-05-23 23:13:54','2025-05-23 23:13:45','2025-05-25 14:23:11','2025-05-25 14:23:11'),(42,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0ODE1NDE5MSwiZXhwIjoxNzQ4MTYxMzkxfQ.lUkflTg1aCLmJ3Am4ydbUp1L3BPsoVCOqQzZm1X8X98','Mozilla/5.0 (Windows NT 10.0; Win64; x64)','172.19.0.1','2025-05-25 16:23:11','2025-05-25 14:23:11','2025-05-25 14:23:11','2025-05-25 14:52:21','2025-05-25 14:52:21'),(43,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0ODE1NTk0MSwiZXhwIjoxNzQ4MTYzMTQxfQ.tdVwobPm2_uoP3tqJdYvc0YIzgmOr0HQ7UysM0NyeOo','Mozilla/5.0 (Windows NT 10.0; Win64; x64)','172.17.0.1','2025-05-25 16:52:21','2025-05-25 14:52:21','2025-05-25 14:52:21','2025-05-25 15:22:39','2025-05-25 15:22:39'),(44,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InN1cGVyX2FkbWluIiwiZW1haWwiOiJzdXBlci1hZG1pbkBnZHVmLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc0ODE1Nzc1OSwiZXhwIjoxNzQ4MTY0OTU5fQ.2xLUVeOLhx-vn4rOmVdbdwluuSiqyz_WHUWjknFfGnY','Mozilla/5.0 (Windows NT 10.0; Win64; x64)','127.0.0.1','2025-05-25 17:22:39','2025-05-25 15:22:39','2025-05-25 15:22:39','2025-05-25 15:22:39',NULL);
/*!40000 ALTER TABLE `admin_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('super_admin','admin','editor') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `last_Login_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (2,'super-admin@gduf.com','$2b$10$pAJHXiuQB6J/wAhbemoaXe4pibh3iykxub44B4nyuqdCyR6juwc2.','瓒呯骇绠＄悊鍛?,'super_admin','active','2025-05-25 15:22:39','2025-04-15 16:56:33','2025-05-25 15:22:39',NULL),(3,'admin_new@example.com','$2b$10$zOGlz3h4qfH.5Ba8WG7Hg.hzIS.rovBkfHGv3GyjbJPMZH054JjDO','绠＄悊鍛樻柊鏄电О','admin','active','2025-04-21 21:06:26','2025-04-21 20:28:11','2025-04-21 23:09:41',NULL),(4,'updated_editor@example.com','$2b$10$Wqs7WHL12JI/SZ99Tz6UxO9n5Uk6rkiWEFIxVBNGkDSIBgb60qr06','瓒呯骇绠＄悊鍛樻洿鏂皀ame','editor','active',NULL,'2025-04-21 20:32:47','2025-04-21 23:37:22',NULL),(5,'editor2@test.com','$2b$10$ZIfT3oSRlThu4IogowOieetHIdjX4rGTMefbxPC7Ad63V6Fe7TDbC','editor2','editor','active','2025-04-21 23:10:50','2025-04-21 20:36:12','2025-04-21 23:10:50',NULL),(6,'editor3@test.com','$2b$10$OUdLNcsv8aBFrgdH3BzwAOmA/d67mXk.pyzuqGpYpJEdrV4eAqbEi','editor3','editor','active','2025-04-21 23:18:20','2025-04-21 23:11:23','2025-04-22 11:34:16',NULL),(7,'editor4@test.com','$2b$10$ZnUvsag1waMjanbGhNIVfeWowpTOh8rhm0mBMpfhttMEZPbgIsd4O','editor4','editor','active',NULL,'2025-04-24 09:35:51','2025-04-24 09:35:51',NULL);
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `advertisements`
--

DROP TABLE IF EXISTS `advertisements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `advertisements` (
  `ad_id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ad_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advertisements`
--

LOCK TABLES `advertisements` WRITE;
/*!40000 ALTER TABLE `advertisements` DISABLE KEYS */;
/*!40000 ALTER TABLE `advertisements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aiintroductions`
--

DROP TABLE IF EXISTS `aiintroductions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aiintroductions` (
  `intro_id` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`intro_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aiintroductions`
--

LOCK TABLES `aiintroductions` WRITE;
/*!40000 ALTER TABLE `aiintroductions` DISABLE KEYS */;
/*!40000 ALTER TABLE `aiintroductions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `browsinghistory`
--

DROP TABLE IF EXISTS `browsinghistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `browsinghistory` (
  `history_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `content_type` varchar(20) DEFAULT NULL,
  `content_id` int DEFAULT NULL,
  `viewed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image_url` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `activity_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`history_id`),
  KEY `browsinghistory_ibfk_1` (`user_id`),
  CONSTRAINT `browsinghistory_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `browsinghistory`
--

LOCK TABLES `browsinghistory` WRITE;
/*!40000 ALTER TABLE `browsinghistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `browsinghistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `level` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `favorite_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `content_id` int DEFAULT NULL,
  `content_type` varchar(20) DEFAULT NULL,
  `favorited_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image_url` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `activity_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`favorite_id`),
  KEY `favorites_ibfk_1` (`user_id`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fin4_data`
--

DROP TABLE IF EXISTS `fin4_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fin4_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `鍏紬鍙峰悕瀛梎 varchar(255) DEFAULT NULL,
  `鏍囬` varchar(255) DEFAULT NULL,
  `鏃堕棿` datetime DEFAULT NULL,
  `閾炬帴` varchar(255) DEFAULT NULL,
  `浜岃` varchar(50) DEFAULT NULL,
  `缁兼祴` varchar(50) DEFAULT NULL,
  `鏍″尯` varchar(50) DEFAULT NULL,
  `骞寸骇` varchar(50) DEFAULT NULL,
  `瀛﹂櫌` varchar(50) DEFAULT NULL,
  `閫氱煡` varchar(50) DEFAULT NULL,
  `鎬荤粨` text,
  `绫诲瀷` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fin4_data`
--

LOCK TABLES `fin4_data` WRITE;
/*!40000 ALTER TABLE `fin4_data` DISABLE KEYS */;
INSERT INTO `fin4_data` VALUES (33,'骞夸笢閲戣瀺瀛﹂櫌鑲囧簡鏍″尯','璁插骇棰勫憡 | 鎴戜滑娲绘臣鐨勭敓鍛?涓婚璁插骇','2025-03-19 08:08:00','https://mp.weixin.qq.com/s/Fnm0rwccEg6zbv1vH-8TMA','鏃?,'鏃?,'鑲囧簡鏍″尯','涓嶉檺','涓嶉檺','鍏朵粬','鏈璁插骇棰勫憡鐨勪富棰樹负鈥滄垜浠椿娉肩殑鐢熷懡鈥濓紝鐢卞箍涓滈噾铻嶅闄㈣倗搴嗘牎鍖轰富鍔烇紝鍏蜂綋骞寸骇銆佸闄㈡湭鎻愬強锛屽洜姝ら潰鍚戝璞′笉闄愩€傛枃绔犳湭鎻愬強浜岃瀛﹀垎鍜岀患娴嬪垎锛屾晠鍧囨棤銆傛牴鎹枃绔犲唴瀹癸紝璇ヤ俊鎭簲褰掔被涓哄叾浠栫被鍨嬨€?,3),(34,NULL,'搴旂煡搴斾細 | 骞夸笢閲戣瀺瀛﹂櫌鏈鏁欒偛鏁欏瀹℃牳璇勪及宸ヤ綔瀹ｄ紶鎵嬪唽(浜?','2025-03-18 13:56:22','https://mp.weixin.qq.com/s/gIaCerCBC3tjHeQ_9tX0tg','鏃?,'鏃?,'涓嶉檺','鏃?,'涓嶉檺','鍏朵粬','鏈枃鏄箍涓滈噾铻嶅闄㈠叧浜庢湰绉戞暀鑲叉暀瀛﹀鏍歌瘎浼板伐浣滅殑瀹ｄ紶鎵嬪唽(浜?銆傛枃绔犳寚鍑猴紝瀛︽牎灏嗕簬2025骞?鏈?4鏃モ€?鏈?5鏃ユ帴鍙楀箍涓滅渷鏁欒偛鍘呯粍缁囩殑鏂颁竴杞湰绉戞暀鑲叉暀瀛﹀鏍歌瘎浼般€傝繖娆¤瘎浼版槸瀵瑰鏍″姙瀛︽柟鍚戜笌鏈鍦颁綅銆佸煿鍏昏繃绋嬨€佹暀瀛﹁祫婧愪笌鍒╃敤銆佹暀甯堥槦浼嶃€佸鐢熷彂灞曘€佽川閲忎繚闅滃強鏁欏鎴愭晥绛夋柟闈㈢殑缁煎悎妫€楠屻€傚鏍″笇鏈涢€氳繃杩欐璇勪及锛屾€荤粨鍔炲缁忛獙锛屽紑鍒涘彂灞曟柊灞€闈€傚悓鏃讹紝瀛︽牎涔熷笇鏈涘叏鏍″笀鐢熷憳宸ヨ兘澶熸洿濂藉湴浜嗚В瀹℃牳璇勪及鐩稿叧鐭ヨ瘑鍙婂鏍歌瘎浼板瀛︽牎甯堢敓鐨勯噸澶ф剰涔夛紝鍦ㄥ叏鏍′笂涓嬪舰鎴愨€滀汉浜哄叧蹇冭瘎浼般€佷汉浜轰簡瑙ｈ瘎浼般€佷汉浜哄弬涓庤瘎浼般€佷汉浜烘敮鎸佽瘎浼扳€濈殑娴撳帤姘涘洿銆傝繖浠藉浼犳墜鍐岀敱鏍″鐢熻瀺濯掍綋涓績鍒朵綔锛岀粡杩囦簡鍒濆銆佸瀹″拰缁堝銆?,3),(35,NULL,'搴旂煡搴斾細 | 骞夸笢閲戣瀺瀛﹂櫌鏈鏁欒偛鏁欏瀹℃牳璇勪及宸ヤ綔瀹ｄ紶鎵嬪唽(浜?','2025-03-18 13:38:29','https://mp.weixin.qq.com/s/YeND3maU3CFSgQGcyJTx8Q','鏃?,'鏃?,'涓嶉檺','鏃?,'涓嶉檺','鍏朵粬','璇ユ枃绔犳潵鑷井淇″叕浼楀钩鍙拌繍钀ヤ腑蹇冿紝鍐呭闈炲父绠€鐣ワ紝浠呭寘鍚竴涓寚鍚戝井淇″叕浼楀钩鍙拌鍒欎腑蹇冪殑閾炬帴锛屾病鏈夋彁渚涗换浣曞叧浜庢椿鍔ㄣ€侀€氱煡鎴栧叾浠栧叿浣撲俊鎭€傚洜姝わ紝鏃犳硶鍒ゆ柇璇ユ椿鍔ㄦ槸鍚︽彁渚涗簩璇惧鍒嗘垨缁兼祴鍒嗭紝涔熸棤娉曠‘瀹氬弬涓庢牎鍖恒€佸勾绾ф垨瀛﹂櫌锛屼互鍙婃椿鍔ㄧ被鍨嬨€傛枃绔犵殑涓婚鏄硾鎸囩殑寰俊鍏紬骞冲彴杩愯惀鐩稿叧鍐呭銆?,3),(36,NULL,'鈥滄湪妫夎姳鏆栤€? 鈥斺€斿箍涓滅渷2025灞婇珮鏍℃瘯涓氱敓澶у瀷缃戠粶鍏泭鎷涜仒娲诲姩','2025-03-17 17:41:44','https://mp.weixin.qq.com/s/Xa7kJ9esLpxJ5Leydlmqlw','鏃?,'鏃?,'涓嶉檺','澶у洓','涓嶉檺','鍏朵粬','鏈娲诲姩鏄敱骞夸笢鐪佹暀鑲插巺绛夐儴闂ㄨ仈鍚堜妇鍔炵殑鈥滄湪妫夎姳鏆栤€濆箍涓滅渷2025灞婇珮鏍℃瘯涓氱敓澶у瀷鍏泭缃戠粶鎷涜仒娲诲姩锛屾棬鍦ㄤ績杩涙垜鐪?025灞婃櫘閫氶珮鏍℃瘯涓氱敓瀹炵幇楂樿川閲忓厖鍒嗗氨涓氥€傛椿鍔ㄦ椂闂翠负2025骞?鏈?鏃ヨ嚦6鏈?0鏃ワ紝渚濇墭骞夸笢瀛︾敓灏变笟鍒涗笟鏅烘収鏈嶅姟骞冲彴閲囧彇绾夸笂妯″紡寮€灞曪紝闈㈠悜鍏ㄧ渷楂樻牎姣曚笟鐢熷拰鐢ㄤ汉鍗曚綅銆傚钩鍙版彁渚涘矖浣嶄俊鎭櫤鑳界簿鍑嗗尮閰嶆帹閫併€佸湪绾垮氨涓氬崗璁璁㈢瓑涓€绔欏紡灏变笟鎷涜仒鏈嶅姟銆傛瘯涓氱敓鍙互閫氳繃鎵撳紑骞夸笢澶у鐢熷氨涓氬垱涓氬皬绋嬪簭锛岃繘鍏ユ瘯涓氱敓姹傝亴鏉垮潡骞跺畬鎴愭巿鏉冨弬涓庢椿鍔ㄣ€傛湰娆℃椿鍔ㄧ殑渚涚鏂逛负鑲囧簡鏍″尯灏变笟鏈嶅姟涓績銆?,3),(37,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(38,'骞块噾鏍″洟濮?,'鐚棰勫憡锝滅儹琛€闈掓槬锛屼负鐖辩画鑸?,'2025-03-18 16:21:33','https://mp.weixin.qq.com/s/sY8eGcx4bqI9_Emjmpfx3A','蹇楁効鍏泭','鏈?,'骞垮窞/鏈儴鏍″尯','涓嶉檺','涓嶉檺','鍏朵粬','\n鏂囩珷涓昏浠嬬粛浜嗗箍涓滈噾铻嶅闄㈢孩鍗佸瓧浼?骞垮窞鏍″尯)灏嗕簬2025骞?鏈?0鏃ュ湪骞垮窞鏈儴鍖楄嫅楗爞绌哄湴鎽婁綅涓惧姙鏃犲伩鐚娲诲姩銆傛椿鍔ㄦ椂闂翠负9:00-17:00銆傜尞琛€娴佺▼鍖呮嫭鍜ㄨ濉〃銆侀噰鏍枫€佹娊琛€鍜岄鍙栫尞琛€璇佸強绾康鍝併€傛枃绔犺缁嗚鏄庝簡鐚鐨勬潯浠讹紝鍖呮嫭骞撮緞锛?8-55鍛ㄥ瞾锛夈€佷綋閲嶏紙鐢锋€р墺50kg锛屽コ鎬р墺45kg锛夈€佽鍘嬨€佽剦鎼忋€佷綋娓╃瓑锛屼互鍙婁竴浜涗笉瀹滅尞琛€鐨勬儏鍐点€傚悓鏃讹紝鏂囩珷涔熺粰鍑轰簡鐚鍓嶃€佺尞琛€鏃跺拰鐚鍚庣殑娉ㄦ剰浜嬮」锛屾彁閱掔尞琛€鑰呮敞鎰忛ギ椋熴€佷紤鎭拰浼ゅ彛鎶ょ悊銆傜尞琛€鑰呮湁鏈轰細鑾峰緱18宀佺尞琛€绾康绔犳垨鎯呬荆绾康绔狅紝浣嗙邯蹇电珷鍜岀邯蹇靛搧浜岄€変竴銆傜尞琛€鐨勫ソ澶勫寘鎷績杩涜娑叉柊闄堜唬璋€侀檷浣庡績鑴戣绠＄柧鐥呴闄╁拰澧炲己鍏嶇柅鍔涖€傜尞琛€娲诲姩鍙幏寰楀勾搴︾患娴嬪姞鍒嗐€?,1),(39,NULL,'鎬ユ晳璇佸煿璁?| 涓虹敓鍛界画鑸紝缁欑敓娲绘坊瀹?,'2025-03-11 15:32:59','https://mp.weixin.qq.com/s/bt6Nfx4HxCaEwDOrjaCkUg','鎶€鑳界壒闀?,'鏈?,'骞垮窞/鏈儴鏍″尯','澶т竴銆佸ぇ浜屻€佸ぇ涓夈€佸ぇ鍥涖€佷笓鍗囨湰','涓嶉檺','鍏朵粬','\n杩欑瘒鏂囩珷鏄叧浜庡箍宸為噾铻嶅闄㈡牎绾細缁勭粐鐨勬€ユ晳璇佸煿璁椿鍔ㄩ€氱煡銆傝娲诲姩鏃ㄥ湪鎻愬崌鍚屽浠殑鎬ユ晳鑳藉姏锛岄€氳繃绯荤粺瀛︿範鎬ユ晳鐭ヨ瘑鍜岀嚎涓嬪疄璺靛煿璁紝浣垮悓瀛︿滑鎺屾彙蹇冭偤澶嶈嫃鏈拰鐢靛瓙闄らⅳ浠殑浣跨敤鏂规硶锛屾垚闀夸负鎹嶅崼瀹夊叏鐨勫媷澹€俓n\n娲诲姩鏃堕棿瀹夋帓锛歕n-杩涚兢浜嗚В闃舵锛?025骞?鏈?1鏃?3鏈?3鏃n-鎶ュ悕鏃堕棿锛?025骞?鏈?3鏃ワ紙缇ゅ唴濉啓闂嵎鏄熸姤鍚嶏級\n-绾夸笅鍩硅鏃堕棿锛?025骞?鏈?3鏃ワ紙鍛ㄦ棩锛?4:00-18:00\n\n鎶ュ悕椤荤煡锛歕n-绾夸笂瀛︿範骞冲彴闇€缂寸撼8鍏冩湇鍔¤垂銆俓n-鏈娲诲姩鍏辨湁65涓悕棰濓紝鎸夌収鎶ュ悕椤哄簭浼樺厛褰曞彇锛堜紭鍏堝綍鍙?021绾ф姤鍚嶇殑鍚屽锛屽墿浣欏悕棰濇寜鎶ュ悕椤哄簭浼樺厛褰曞彇锛夈€俓n-纭繚鍩硅褰撳ぉ鍏ㄧ▼鍙備笌銆俓n-鏈€缁堟姤鍚嶄互闂嵎鏄熷～鍐欓『搴忎负涓汇€俓n\n娉ㄦ剰浜嬮」锛歕n-鍙備笌鍩硅鐨勪汉鍛橀』婊?8鍛ㄥ瞾銆俓n-瀛﹀憳搴旂┛鐫€浼戦棽鏈嶏紝濂冲＋涓嶅疁绌跨煭瑁欍€佷綆棰嗚。鏈嶃€侀珮璺熼瀷銆俓n-鍙備笌鍩硅鑰呭簲鑷閬靛畧鑰冨嫟鍙婄邯寰嬶紝涓嶇己鍕ゃ€佷笉杩熷埌銆佷笉鏃╅€€銆俓n-鏈夊績鑴忕梾銆侀珮琛€鍘嬨€佽叞閮ㄦ垨鑶濋儴涓嶅疁娲诲姩鑰呰鍕垮弬鍔犮€俓n-鍚嶉瀹濊吹锛岃鍕挎棤鏁呯己甯€俓n\n璇ユ椿鍔ㄩ潰鍚戝叏鏍″鐢燂紝鎴愬姛閫氳繃鑰冩牳鐨勫悓瀛﹀彲浠ヨ幏寰楁€ユ晳璇侊紝骞朵笖鍙互鑾峰緱浜岃瀛﹀垎涓庣患娴嬪垎銆傛湰娆℃椿鍔ㄤ粎闄愭湰閮ㄧ殑鍚屽鎶ュ悕銆傛牎绾㈠崄瀛椾細涔熷皢瀹氭湡涓捐鎬ユ晳鍩硅銆?,1),(40,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(41,'骞块噾瀛︾敓浼?,'绗笁鍗佷竷鏈熼噾鏇﹁鍧涒€斾富璁蹭汉寰侀泦','2025-03-18 20:07:06','https://mp.weixin.qq.com/s/OEMn1lLUN5S_LXk29xh03w','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','\n绗笁鍗佷竷鏈熼噾鏇﹁鍧涙鍦ㄥ緛闆嗕富璁蹭汉锛岀礌鏉愭潵婧愪簬鏍″鐢熶細瀛︿範閮ㄣ€傛枃绔犵殑缂栬緫鍜屽鏍镐汉鍛樺寘鎷睜婕惣銆侀儜娣冲┓銆侀粠鏅撹帀銆佸攼娉芥壃銆佷綍鏂囬紟鍜屾姹熴€傝鑰呭彲浠ラ€氳繃鎵弿寰俊浜岀淮鐮佸叧娉ㄥ叕浼楀彿銆傜敱浜庢枃绔犲唴瀹逛富瑕佸叧浜庤鍧涗富璁蹭汉鐨勬嫑鍕熶俊鎭紝鍙互褰掔被涓哄叾浠栫被鍨嬮€氱煡銆傛澶栵紝鏂囩珷娌℃湁鎻愬強浜岃瀛﹀垎銆佺患娴嬪垎銆佸弬涓庢牎鍖哄拰骞寸骇銆佸弬涓庡闄㈢瓑淇℃伅锛屽洜姝よ繖浜涗换鍔＄殑绛旀鍧囦负鈥滄棤鈥濇垨鈥滀笉闄愨€濄€?,3),(42,NULL,'鏃跺厜鎱㈤€掞綔鍥炲繂涔嬬害锛屽睍鏈涗箣绋?,'2025-03-16 13:16:35','https://mp.weixin.qq.com/s/87O4HZJPEG5s_f-bV5tyTw','鏂囦綋娲诲姩','鏈?,'骞垮窞/鏈儴鏍″尯','涓嶉檺','涓嶉檺','鍏朵粬','\n鏂囩珷浠嬬粛浜嗗箍涓滈噾铻嶅闄㈠鐢熶細鏂囪壓浣撹偛閮ㄤ妇鍔炵殑鈥滄椂鍏夋參閫掆€濇椿鍔紝杩欐槸涓€鍦哄洖蹇嗕笌灞曟湜鐨勬氮婕箣绾︺€傛椿鍔ㄦ椂闂翠负2025骞?鏈?8鏃ヨ嚦19鏃ワ紝姣忓ぉ8:00-18:00锛屽湴鐐瑰湪骞夸笢閲戣瀺瀛﹂櫌鍖楄嫅楗爞涓€妤煎箍鍦恒€傛椿鍔ㄥ唴瀹规槸鍐欎竴灏佷俊缁欒嚜宸憋紝鐣欎笅瀵硅繃鍘荤殑鍥炲繂鍜屽鏈潵鐨勫睍鏈涳紝灞炰簬鏂囦綋娲诲姩锛屽鐢熷弬涓庡悗鍙互鑾峰緱鐩稿簲浜岃瀛﹀垎銆傛椿鍔ㄩ潰鍚戝箍涓滈噾铻嶅闄㈠叏浣撳鐢燂紝涓嶉檺瀛﹂櫌鍜屽勾绾с€傝繖鏄竴娆′笌鏈潵鑷繁鐩搁亣鐨勬満浼氾紝鏈熷緟澶у鐨勫弬涓庛€傝娲诲姩灞炰簬鍏朵粬绫诲瀷鐨勯€氱煡锛屽苟闈炴斁鍋囥€佸仠姘村仠鐢点€佸浘涔﹂鍏抽棴绛夊父瑙佺被鍨嬨€傝娲诲姩鏈夌患娴嬪垎鍙互鑾峰緱銆?,1),(43,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(44,'骞夸笢閲戣瀺瀛﹂櫌鍒涙柊鍒涗笟涓績','鏍″厷濮斿壇涔﹁鍒樻槬闃宠荡铻嶅垱绌洪棿璋冪爺鎸囧','2025-03-13 17:59:47','https://mp.weixin.qq.com/s/Wxm9EYq-nuj7qCzFSitdSw','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','鏂囩珷涓昏璁茶堪浜嗗箍涓滈噾铻嶅闄㈡牎鍏氬鍓功璁板垬鏄ラ槼浜?鏈?0鏃ヤ笂鍗堣荡铻嶅垱绌洪棿璋冪爺鎸囧宸ヤ綔銆傚垬鏄ラ槼鍓功璁颁竴琛岃瀵熶簡鍙屽垱绾㈣壊灞曞巺锛屽苟瀵瑰睍鍘呯殑绾㈣壊鏂囧寲寤鸿缁欎簣浜嗛珮搴﹁瘎浠凤紝鍚屾椂灏卞浣曚紭鍖栧睍鍘呰鏂藉拰灞曠ず鍐呭鎻愬嚭浜嗗缓璁紝寮鸿皟瑕佸厖鍒嗗彂鎸ョ孩鑹插睍鍘呯殑鏁欒偛鍜屾縺鍔变綔鐢ㄣ€傞殢鍚庯紝鍒樻槬闃冲壇涔﹁涓€琛岃缁嗕簡瑙ｄ簡铻嶅垱绌洪棿鐨勮繍琛屼笌绠＄悊妯″紡锛屽苟鎸囧嚭铻嶅垱绌洪棿浣滀负澶у鐢熷垱鏂板垱涓氬鍖栧疄璺电殑閲嶈骞冲彴锛岃杩涗竴姝ヤ紭鍖栬繍琛屾満鍒讹紝鎻愬崌鏈嶅姟璐ㄩ噺鍜屾晥鐜囥€傚湪鍥㈤槦鍏ラ┗鍖哄煙锛屽垬鏄ラ槼鍓功璁颁笌鍒涗笟鍥㈤槦杩涜浜嗕翰鍒囦氦娴侊紝浜嗚В骞块噾璐㈢◣鐨勪笟鍔″紑灞曟儏鍐碉紝骞堕紦鍔变粬浠繚鎸佸垱鏂扮儹鎯咃紝瑕佹眰铻嶅垱绌洪棿缁欎簣浼樼澶у鐢熷垱涓氳€呮洿澶ф敮鎸併€傚垬鏄ラ槼鍓功璁拌繕瀵硅瀺鍒涚┖闂村悇涓姛鑳藉尯杩涜浜嗗叏闈㈠贰鏌ワ紝鎸囧嚭浜嗚涓嶆柇瀹屽杽鍔熻兘鍒嗗尯锛屾彁鍗囨暣浣撴湇鍔℃按骞筹紝鎵撻€犳洿鍔犲畬鍠勭殑鍒涙柊鍒涗笟鐢熸€佺郴缁熴€傛娆¤瀵熶负鍒涙柊鍒涗笟涓績鐨勫彂灞曟寚鏄庝簡鏂瑰悜锛屼篃榧撹垶浜嗚瀺鍒涚┖闂村叏浣撳伐浣滀汉鍛樺拰澶у鐢熷垱涓氳€呯殑澹皵銆傝瀺鍒涚┖闂村皢璁ょ湡钀藉疄鏍￠瀵肩殑鎸囩ず绮剧锛岃繘涓€姝ヤ紭鍖栧悇椤瑰伐浣滐紝鎵撻€犲鏍″垱鏂板垱涓氬疄璺靛搧鐗屻€?,3),(45,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(46,'骞夸笢閲戣瀺瀛﹂櫌鍥句功棣?,'绗竷灞娾€滄悳鐭ユ澂鈥濆叏鍥借储缁忛珮鏍′俊鎭礌鍏诲ぇ璧涘箍涓滈噾铻嶅闄㈣禌鍖哄垵璧涜幏濂栧悕鍗?,'2025-03-14 10:27:08','https://mp.weixin.qq.com/s/9L8EedX4VF1zPJtNTjaHxg','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','鏈娲诲姩鏄涓冨眾鈥滄悳鐭ユ澂鈥濆叏鍥借储缁忛珮鏍′俊鎭礌鍏诲ぇ璧涘箍涓滈噾铻嶅闄㈣禌鍖虹殑鍒濊禌鑾峰鍚嶅崟鍏ず銆傛瘮璧涗簬2025骞?鏈?3鏃ョ粨鏉燂紝鍏竷浜嗕細璁″闄€佸叕鍏辩鐞嗗闄€佽储缁忎笌鏂板獟浣撳闄€侀噾铻嶄笌鎶曡祫瀛﹂櫌銆佸浗瀹堕噾铻嶅瀛﹂櫌銆侀噾铻嶆暟瀛︿笌缁熻瀛﹂櫌銆佷繚闄╁闄€佺粡娴庤锤鏄撳闄€佹硶瀛﹂櫌銆佷簰鑱旂綉閲戣瀺涓庝俊鎭伐绋嬪闄€佸鍥借瑷€涓庢枃鍖栧闄€佸浗闄呮暀鑲插闄㈢瓑瀛﹂櫌鍏?1鍚嶈幏濂栧鐢熷悕鍗曞強濂栭」锛堜竴绛夊銆佷簩绛夊銆佷笁绛夊锛夈€傚悓鏃讹紝杩?1浣嶅悓瀛︿篃鎴愬姛鍏ュ洿澶嶈禌銆傞€氱煡瑕佹眰鑾峰瀛︾敓鍦?025骞?鏈?0鏃ュ墠鎵爜杩涘叆鈥滃璧涘挩璇㈢兢鈥濓紝澶嶈禌鍙傝禌瑕佹眰鍜屽垵璧涜幏濂栬瘉涔﹂鍙栨椂闂村皢鍦ㄧ兢鍐呭彂甯冦€?,3),(47,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(48,'蹇冭暣骞块噾','鎯婅洶锝滄槬闆烽福濮嬶紝涓囩墿鐢熼暱','2025-03-05 10:03:11','https://mp.weixin.qq.com/s/quWuruzc4G38qq8vA5HqjA','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','杩欑瘒鏂囩珷鏄叧浜庘€滄儕铔扳€濊妭姘旂殑锛屾爣棰樹负銆婃儕铔帮綔鏄ラ浄楦ｅ锛屼竾鐗╃敓闀裤€嬶紝浠嬬粛浜嗘儕铔扮殑鍚箟锛屽彲鑳藉寘鍚浉鍏崇殑涔犱織鎴栨枃鍖栦俊鎭€傛枃绔犳病鏈夋彁渚涙椿鍔ㄥ弬涓庣殑鍏蜂綋淇℃伅锛屽洜姝ゆ棤娉曠‘瀹氭槸鍚︽湁浜岃瀛﹀垎鎴栫患娴嬪垎锛屼篃鏃犳硶纭畾鍙備笌鐨勬牎鍖恒€佸勾绾с€佸闄€傚彧鑳藉垽鏂负鍏朵粬绫诲瀷閫氱煡銆傛枃绔犺繕鍒楀嚭浜嗗垵瀹°€佸瀹″拰缁堝浜哄憳鍚嶅崟锛屽苟鎻愪緵浜嗗井淇″叕浼楀彿鐨勪簩缁寸爜銆?,3),(49,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(50,'骞夸笢閲戣瀺瀛﹂櫌鏍＄ぞ鑱?,'妞嶆爲鑺倈妞嶆鏄ョ豢锛屼负鏄ュぉ涓婅壊','2025-03-12 11:30:13','https://mp.weixin.qq.com/s/MduL_0JI4L4-y67uPQ7pBA','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','\n鏂囩珷涓昏浠嬬粛浜嗘鏍戣妭鐨勬剰涔夊拰閲嶈鎬э紝寮鸿皟浜嗘鏍戦€犳灄瀵逛簬璋冭妭姘斿€欍€佸噣鍖栫┖姘斿拰缁存姢鐢熺墿澶氭牱鎬х殑绉瀬浣滅敤銆傛枃绔犳寚鍑猴紝鏍戞湪鍙互鍚告敹浜屾哀鍖栫⒊銆侀噴鏀炬哀姘旓紝鏈夊姪浜庢敼鍠勭┖姘旇川閲忋€傚悓鏃讹紝妫灄鏄澶氶噹鐢熷姩鐗╃殑鏍栨伅鍦帮紝瀵逛簬缁存姢鐢熸€佸钩琛¤嚦鍏抽噸瑕併€傛枃绔犲彿鍙ぇ瀹剁Н鏋佸弬涓庢鏍戞椿鍔紝鏃犺鏄湪鍏洯銆佹牎鍥繕鏄埂鏉戯紝鐢氳嚦鍦ㄨ嚜瀹堕槼鍙帮紝閮藉彲浠ラ€氳繃绉嶆鏍戞湪鎴栫豢妞嶆潵涓虹幆淇濅簨涓氬仛鍑鸿础鐚€傛枃绔犲己璋冿紝姣忎竴妫电涓嬬殑鏍戦兘鏄鍦扮悆鐨勬壙璇猴紝闇€瑕佺敤蹇冨懙鎶ゃ€傛渶鍚庯紝鏂囩珷榧撳姳澶у鎼烘墜琛屽姩锛屽叡鍚屼负鍒涢€犳洿缇庡ソ鐨勭豢鑹蹭笘鐣岃€屽姫鍔涳紝璁╂爲鑻楄寔澹垚闀匡紝涓哄湴鐞冩拺璧蜂竴鐗囨洿鍔犳箾钃濈殑澶╃┖銆傛湰娆℃椿鍔ㄤ笉闄愬埗鍙備笌鐨勬牎鍖恒€佸勾绾у拰瀛﹂櫌銆?,3),(51,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(52,'骞夸笢閲戣瀺瀛﹂櫌鍥介檯鏁欒偛瀛﹂櫌','杩庢帴鏂颁竴杞湰绉戞暀鑲叉暀瀛﹀鏍歌瘎浼?| 瀛︾敓搴旂煡搴斾細锛氬悕璇嶈В閲?,'2025-03-18 12:00:00','https://mp.weixin.qq.com/s/sQ1wQ_KgLUPrcVo9y7hEoA','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','鏈枃鏄箍涓滈噾铻嶅闄㈠浗闄呮暀鑲插闄㈠鐢熷獟浣撲腑蹇冨彂甯冪殑涓€绡囧叧浜庤繋鎺ユ柊涓€杞湰绉戞暀鑲叉暀瀛﹀鏍歌瘎浼扮殑閫氱煡銆傛枃绔犳寚鍑猴紝鏍规嵁骞夸笢鐪佹暀鑲插巺鐨勫畨鎺掞紝瀛︽牎灏嗕簬2025骞?鏈?4鏃ュ紑灞曚负鏈?鍛ㄧ殑绾夸笂璇勪及锛屽苟鍦?鏈堜笅鏃繘琛屼负鏈?澶╃殑涓撳鍏ユ牎鑰冨療銆備负浜嗚鍏ㄦ牎甯堢敓浜嗚В瀹℃牳璇勪及鐨勫熀鏈煡璇嗗拰鏍℃儏鏍″彶锛屾湰绉戞暀鑲叉暀瀛﹁瘎寤哄伐浣滃姙鍏缂栧啓浜嗐€婃柊涓€杞湰绉戞暀鑲叉暀瀛﹀鏍歌瘎浼板簲鐭ュ簲浼氥€?瀛︾敓鐗?锛屽笇鏈涘叏浣撳鐢熻鐪熷涔狅紝绉瀬鍙備笌瀛︽牎鐨勮繋璇勪績寤哄伐浣溿€傛枃绔犱富瑕佸唴瀹规槸鈥滃悕璇嶈В閲娾€濓紝鍖呮嫭鈥滀簲鑲插苟涓锯€濄€佲€滃叚鍗撹秺涓€鎷斿皷鈥濄€佲€滀簲涓害鈥濄€佲€滃洓涓洖褰掆€濄€佲€滀笁涓笉鍚堟牸鈥濄€佲€滃叓涓鍏堚€濄€佲€滃崄澶р€濊偛浜轰綋绯汇€佸绉戔€滃洓鏂扳€濆缓璁俱€佲€滀笁鍏ㄨ偛浜衡€濄€佲€滃洓鏈夆€濆ソ鑰佸笀銆佸洓涓€滃紩璺汉鈥濄€佲€滃洓鍙测€濄€佲€滀笁杩涒€濆钩鍙般€佲€滀袱鎬т竴搴︹€濄€丱BE鐞嗗康绛夋蹇电殑瑙ｉ噴銆傞€氳繃瀛︿範杩欎簺鍚嶈瘝锛屽鐢熷彲浠ユ洿濂藉湴鐞嗚В璇勪及宸ヤ綔鐨勮姹傦紝骞朵负瀛︽牎鐨勮瘎浼板伐浣滆础鐚姏閲忋€傝鏂囩珷闈㈠悜鍏ㄦ牎甯堢敓锛屾棬鍦ㄦ彁楂樺ぇ瀹跺鏈鏁欒偛鏁欏瀹℃牳璇勪及鐨勮璇嗗拰閲嶈绋嬪害銆?,3),(53,NULL,'鍠滄姤锛氭垜闄㈠笀鐢熷湪绗?6灞婂叏鍥藉ぇ瀛︾敓骞垮憡鑹烘湳澶ц禌涓啀鍒涗匠缁?,'2025-03-14 20:00:00','https://mp.weixin.qq.com/s/G0unGl60NMXoVdJG673Hlw','鏃?,'鏃?,'涓嶉檺','涓嶉檺','鍥介檯鏁欒偛瀛﹂櫌','鍏朵粬','鏈枃鎶ラ亾浜嗗箍涓滈噾铻嶅闄㈠浗闄呮暀鑲插闄㈠笀鐢熷湪绗?6灞婂叏鍥藉ぇ瀛︾敓骞垮憡鑹烘湳澶ц禌涓彇寰楃殑浼樺紓鎴愮哗銆傝闄腑澶栬仈鍚堝煿鍏诲弻瀛︿綅椤圭洰鏁板瓧濯掍綋鑹烘湳涓撲笟鐨勫鐢熷湪闄堢▼鏄捐€佸笀鐨勫甫棰嗕笅锛岃崳鑾峰叏鍥芥€昏瘎瀹★紙鍥借禌锛変竴绛夊1椤癸紝骞夸笢璧涘尯锛堢渷璧涳級浜岀瓑濂?椤癸紝鐪佽禌涓夌瓑濂?椤广€傝幏濂栦綔鍝佸寘鎷棰戠被寰數褰卞箍鍛娿€婄敤涓€涓ゅ垎鐨勭敎锛屽幓骞冲拰鍏節鍒嗙殑閰搞€嬪拰骞斥警骞垮憡銆婁腑鑽懓瀹濓紝鑷劧鐤楁剤銆嬪拰銆婁竴鐡惰冻鐭ｏ紝涓嶄簩涔嬮€夈€嬨€傚浗闄呮暀鑲插闄㈣嚧鍔涗簬鍩瑰吇瀛︾敓鐨勫垱鏂版剰璇嗗拰瀹炶返鎶€鑳斤紝榧撳姳瀛︾敓鍙傚姞涓撲笟绔炶禌锛屾彁鍗囨暀瀛﹁川閲忓拰搴旂敤鑳藉姏锛屽苟灏嗘寔缁帹杩涙暀鑲叉暀瀛︽敼闈╋紝鍩硅偛鏇村鏉板嚭浜烘墠銆?,3),(54,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(55,'骞夸笢閲戣瀺瀛﹂櫌淇＄敤绠＄悊瀛﹂櫌','鐖卞績n甯畁娲诲姩 | 璁╃埍鐢熸牴锛岃姊﹀彂鑺?,'2025-03-04 15:00:42','https://mp.weixin.qq.com/s/phexFi1sijY0PBIydrMQUg','蹇楁効鍏泭','鏃?,'骞垮窞/鏈儴鏍″尯','涓嶉檺','涓嶉檺','鍏朵粬','\n鏈娲诲姩鏄敱淇＄闈掑崗涓惧姙鐨勭埍蹇冧箟鍗栨椿鍔紝鏃ㄥ湪涓哄搴洶闅剧殑瀛╁瓙鍙戞斁鍔╁閲戝拰璐拱瀛︿範鐢ㄥ搧锛屽府鍔╀粬浠韩鏈夋洿濂界殑瀛︿範鏉′欢銆傛椿鍔ㄥ皢浜?025骞?鏈?鏃ワ紙鍛ㄤ笁锛?4:30-18:00鍦ㄥ箍涓滈噾铻嶅闄㈠箍宸炴牎鍖哄寳鏁欍€佸璐ら榿杩炴帴绌哄湴涓捐锛岄潰鍚戝叏浣撴暀鑱屽伐鍜屽鐢熴€傛椿鍔ㄥ唴瀹瑰寘鎷叮鍛虫父鎴忓拰绮剧編绀煎搧锛屼緥濡傗€滀箤榫熷瀵圭鈥濆拰鈥滃垢杩愬皬鍗＄墖鈥濈瓑锛屽弬涓庤€呮湁鏈轰細鑾峰緱鎯婂枩鎶樻墸銆傚線鏈熸椿鍔ㄤ腑锛屼俊鐢ㄧ鐞嗗闄㈤潚鍗忓凡灏嗗杽娆剧敤浜庡府鍔╂湁闇€瑕佺殑瀛╁瓙銆傛湰娆℃椿鍔ㄥ睘浜庡織鎰垮叕鐩婄被鍨嬶紝鏃ㄥ湪浼犻€掔埍涓庢俯鏆栵紝甯屾湜瀛╁瓙浠鏇村鐨勪功锛岃蛋鏇磋繙鐨勮矾锛屽績瀛樺笇鍐€锛岀洰鏈夌箒鏄燂紝寰ⅵ鑰岃銆傛椿鍔ㄧ敱淇＄闄㈤潚鍗忓浼犻儴璐熻矗鏂囨鍜屾帓鐗堬紝濮滃銆侀挓閿嬭€佸笀鍜岃儭灏忔尝涔﹁鍒嗗埆璐熻矗鍒濆銆佸瀹″拰缁堝銆?,1),(56,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(57,'骞块噾淇濋櫓瀛﹂櫌','妞嶆爲鑺?| 鏄ョ敓涓囩墿锛岀涓嬪笇鏈?,'2025-03-12 12:06:27','https://mp.weixin.qq.com/s/BHqhwiSumO2L2NPKDlZKFg','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','杩欑瘒鏂囩珷鏄叧浜庢鏍戣妭鐨勫浼狅紝涓婚涓衡€滄槬鐢熶竾鐗╋紝绉嶄笅甯屾湜鈥濄€傛枃绔犱腑鎻愬埌鈥滃瓱鏄ヤ箣鏈堬紝鐩涘痉鍦ㄦ湪锛屼簣涓栫晫涓€鏍戦潚缈狅紝钀屽姩鏄ョ殑鏃跺厜锛岀唤鏀剧豢鐨勫厜鑺掞紝鑽夋湪钄撳彂鏄ュ北鍙湜锛岀瓑鏂扮豢锛岄暱鎴愰ケ婊′汉闂粹€濄€傛枃绔犵敱淇濋櫓瀛﹂櫌鏂板獟浣撲腑蹇冧緵绋匡紝钂插鏉礋璐ｆ捣鎶ュ拰渚涚锛岄粍娌涢摠璐熻矗鎺掔増锛岄珮闆呭拰榛勭嚂瀹囧垎鍒礋璐ｅ瀹″拰缁堝銆備粠鎻愪緵鐨勬枃鏈唴瀹规潵鐪嬶紝鏂囩珷娌℃湁鎻愬強浠讳綍鍏充簬浜岃瀛﹀垎銆佺患娴嬪垎銆佹牎鍖恒€佸勾绾с€佸闄㈢殑闄愬埗锛屽洜姝ら兘杈撳嚭鈥滄棤鈥濇垨鈥滀笉闄愨€濄€傛枃绔犱富棰樻槸妞嶆爲鑺傦紝鍙互褰掔被涓衡€滃叾浠栤€濈被鍨嬨€?,3),(58,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(59,'骞块噾璐㈡柊瀛﹂櫌','蹇冨崗 | 缃戠粶浣跨敤瀵逛簬蹇冪悊鍋ュ悍鐨勫奖鍝?,'2025-03-19 12:21:22','https://mp.weixin.qq.com/s/4n4FUE0flVq0mzTYqwIW6w','鎬濇兂鎴愰暱','鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','杩欑瘒鏂囩珷鎺㈣浜嗙綉缁滀娇鐢ㄥ澶у鐢熷績鐞嗗仴搴风殑褰卞搷锛屾寚鍑虹綉缁滄棦鏈夌Н鏋佸奖鍝嶄篃鏈夋秷鏋佸奖鍝嶃€傜Н鏋佹柟闈紝缃戠粶鏈夊姪浜庣嫭绔嬫剰璇嗙殑鍙戝睍锛屽苟鎻愪緵蹇冪悊鏀寔锛屽閫氳繃鍏磋叮灏忕粍鍜屽湪绾跨ぞ鍖轰笌浠栦汉鍒嗕韩缁忛獙鍜屾劅鍙椼€傛秷鏋佹柟闈紝杩囧害鍏虫敞璐熼潰淇℃伅銆佹攢姣斻€佺綉缁滄毚鍔涚瓑鍙兘寮曞彂鐒﹁檻鍜屾姂閮佹儏缁紝褰㈡垚蹇冪悊渚濊禆锛岄檷浣庤嚜鎴戣鍚屾劅锛屼娇澶у鐢熷湪澶嶆潅浠峰€艰涓骇鐢熷洶鎯戙€傛枃绔犳彁鍑轰簡搴斿鏂规硶锛屽寘鎷暟瀛楁帓姣掞紝鍚堢悊瑙勫垝涓婄綉鏃堕棿锛屼笓娉ㄧ幇瀹炵敓娲伙紝澧炲姞闈㈠闈氦娴侊紝寤虹珛娣卞眰娆′汉闄呭叧绯伙紝浠ュ強鍏虫敞浼樿川鑷獟浣撳拰瀛︿範缃戠粶瀹夊叏鐭ヨ瘑銆傛枃绔犲己璋冿紝閫氳繃鏄庢櫤鎺柦鍜岀Н鏋佸紩瀵硷紝澶у鐢熷彲浠ュ湪浜彈绉戞妧渚垮埄鐨勫悓鏃朵繚鎸佸績鐞嗗仴搴枫€傝鏂囩珷閫傚悎鎵€鏈夊鐢熼槄璇伙紝甯姪浠栦滑鏇村ソ鍦拌璇嗗拰绠＄悊缃戠粶浣跨敤锛岀淮鎶ゅ績鐞嗗仴搴枫€?,1),(60,NULL,'蹇冨崗 | 缃戠粶浣跨敤瀵逛簬蹇冪悊鍋ュ悍鐨勫奖鍝?,'2025-03-18 13:18:58','https://mp.weixin.qq.com/s/DERBaUW50nniaWuOSW4PHg','鏃?,'鏃?,'骞垮窞/鏈儴鏍″尯','澶т竴銆佸ぇ浜屻€佸ぇ涓夈€佸ぇ鍥?,'閲戣瀺涓庢姇璧勫闄?,'鍏朵粬','杩欑瘒鏂囩珷鏄叧浜庣綉缁滀娇鐢ㄥ蹇冪悊鍋ュ悍褰卞搷鐨勮皟鏌ユ姤鍛娿€傝皟鏌ュ璞′负璐㈡柊闄㈠洓涓勾绾х殑瀛︾敓锛岄€氳繃闂嵎鍒嗘瀽浜嗗鐢熶笂缃戦鐜囥€佺洰鐨勪互鍙婄綉缁滀娇鐢ㄥ鐫＄湢銆佸帇鍔涖€佺綉缁滄毚鍔涚瓑鏂归潰鐨勫奖鍝嶃€傝皟鏌ユ樉绀猴紝澶ч儴鍒嗗鐢熸瘡澶╀笂缃戞椂闂村湪2鑷?灏忔椂锛屼富瑕佺敤浜庡ū涔愩€佸涔犲拰绀句氦銆傝櫧鐒剁綉缁滃湪鏀炬澗娑堥仯鏂归潰鏈夊己澶у惛寮曞姏锛屼絾涔熷彲鑳藉鑷磋繃搴︽矇杩峰拰娼滃湪鐨勫績鐞嗗仴搴烽棶棰橈紝濡傜潯鐪犻棶棰樺拰鍥犱笉鑹俊鎭骇鐢熺殑鍘嬪姏銆傝緝楂樻瘮渚嬬殑浜虹粡鍘嗚繃缃戠粶鏆村姏锛屽苟璁や负鍏朵細瀵艰嚧鐒﹁檻銆佹姂閮佸拰鑷皧蹇冧笅闄嶃€傝皟鏌ヨ繕鎺㈣浜咥I蹇冪悊鍋ュ悍宸ュ叿鐨勪娇鐢ㄦ儏鍐碉紝浠ュ強瀛︾敓瀵瑰鏍℃彁渚涚浉鍏冲績鐞嗗仴搴锋寚瀵肩殑闇€姹傘€傛渶鍚庯紝蹇冨崗鍛煎悂澶у鍚堢悊鎶婃帶涓婄綉鏃堕棿锛屽寮哄績鐞嗚皟閫傝兘鍔涳紝骞舵彁渚涘績鐞嗗挩璇㈡湇鍔★紝鍖呮嫭蹇冪悊閭鍜屽挩璇㈢數璇濈瓑銆?,3),(61,NULL,'鍒掗噸鐐癸紒瀹℃牳璇勪及蹇冧腑璁帮紝搴旂煡搴斾細璇锋敹钘忊啋','2025-03-13 23:51:30','https://mp.weixin.qq.com/s/ESkMl1clggmgBfeUVTG9Zw','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','杩欑瘒鏂囩珷鏄叧浜庢柊涓€杞湰绉戞暀鑲叉暀瀛﹀鏍歌瘎浼扮殑搴旂煡搴斾細鍐呭锛屾棬鍦ㄥ府鍔╁鐢熶簡瑙ｈ瘎浼扮殑鐩殑銆佹剰涔変互鍙婁笌鑷韩鐨勫瘑鍒囧叧绯汇€傝瘎浼板己璋冪珛寰锋爲浜猴紝绐佸嚭鈥滀互鏈负鏈€濆拰鈥滃洓涓洖褰掆€濓紝浠ュ鐢熷彂灞曚负鏈綅锛屽己鍖栧鐢熶腑蹇冦€佷骇鍑哄鍚戙€佹寔缁敼杩涖€傛枃绔犺缁嗕粙缁嶄簡瀹℃牳璇勪及鐨勮儗鏅€佹寚瀵兼€濇兂銆佸伐浣滅洰鏍囧拰16瀛楁柟閽堛€傚悓鏃讹紝鏂囩珷涔熻鏄庝簡瀛︾敓鍦ㄨ瘎浼板伐浣滀腑鐨勮鑹插拰璐ｄ换锛屽寘鎷簡瑙ｈ瘎浼板唴瀹广€佺Н鏋佸弬涓庤瘎寤烘椿鍔ㄣ€侀伒瀹堟牎瑙勬牎绾€佺啛鎮変笓涓氫汉鎵嶅煿鍏绘柟妗堢瓑銆傛澶栵紝鏂囩珷杩樺垪涓句簡瀛︾敓涓庤瘎浼颁笓瀹跺彲鑳芥帴瑙︾殑鍦哄悎锛屽苟鎻愬嚭浜嗗鐢熷湪璇勪及杩囩▼涓簲閬靛畧鐨勭ぜ浠鑼冿紝濡傝涓烘枃鏄庛€佷弗鏍奸伒瀹堣鍫傜邯寰嬨€佷繚闅滆壇濂界殑鑷範鎯呭喌绛夈€傛€荤殑鏉ヨ锛岃繖绡囨枃绔犳棬鍦ㄨ瀛︾敓鍏呭垎浜嗚В瀹℃牳璇勪及锛岀Н鏋佸弬涓庡叾涓紝浠庤€屼娇瀛︽牎鑳藉閫氳繃璇勪及鎻愬崌浜烘墠鍩瑰吇璐ㄩ噺銆?,3),(62,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(63,'骞块噾鍒涗笟鏁欒偛瀛﹂櫌','鍒涗笟鏁欒偛瀛﹂櫌閭€璇峰崲涓栦富鏁欐巿浣滃浗瀹惰棰樼敵鎶ヤ笓棰樻寚瀵?,'2025-03-07 10:34:16','https://mp.weixin.qq.com/s/mJtyh7jIPtAfcTB2TDK78Q','鏃?,'鏃?,'涓嶉檺','涓嶉檺','鍒涗笟鏁欒偛瀛﹂櫌','鍏朵粬','鏈娲诲姩鏄垱涓氭暀鑲插闄㈤個璇峰箍涓滃伐涓氬ぇ瀛﹁壓鏈笌璁捐瀛﹂櫌鐨勫崲涓栦富鏁欐巿锛屼负瀛﹂櫌鏁欏笀灏卞浗瀹惰棰樼敵鎶ヨ繘琛屼笓棰樻寚瀵肩殑瀹¤浼氥€傚崲鏁欐巿浠庡浗瀹惰棰樼敵鎶ョ殑浠峰€煎叆鎵嬶紝涓庝細浜哄憳杩涜浜嗘繁鍏ヤ氦娴侊紝闃愯堪浜嗗浗瀹惰棰樼敵鎶ョ殑閲嶈鎬э紝骞跺叏闈㈣В鏋愪簡鐢虫姤娴佺▼锛岀偣鏄庝簡鍏抽敭缁嗚妭鍜屾湁鏁堟柟娉曪紝閽堝閫夐鏂瑰悜銆佺爺绌舵鏋跺強鏂规硶璁虹瓑鏍稿績鍐呭锛岀粰鍑轰簡缁嗚嚧涓斿垏瀹炲彲琛岀殑寤鸿銆傛娆″璇讳細鏃ㄥ湪涓哄闄㈡暀甯堟彁渚涘疂璐电殑鐢虫姤绛栫暐锛岃繘涓€姝ヤ紭鍖栫敵鎶ユ€濊矾锛屽姞寮鸿棰樼爺绌讹紝鎺ㄥ姩瀛﹂櫌鍚勯」浜嬩笟鍙戝睍銆傚崲涓栦富鏁欐巿鏄師骞夸笢宸ヤ笟澶у鑹烘湳涓庤璁″闄㈤櫌闀匡紝闀挎湡浠庝簨璁捐婧愭祦涓庢垬鐣ャ€佹枃鍖栭仐浜ф暟瀛楀寲淇濇姢鐨勬暀瀛︿笌鐮旂┒宸ヤ綔锛屽湪鐩稿叧棰嗗煙鏈変赴瀵岀殑瀛︽湳绉疮鍜屽疄璺电粡楠屻€?,3),(64,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(65,'骞块噾娉曞','鈥滃ぇ鎴愭澂鈥濋€夋嫈浜戠寮€鍚紝鍔╁姏瀛﹀瓙绔為€愨€滄硶搴€濇ⅵ鎯?,'2025-03-17 12:51:35','https://mp.weixin.qq.com/s/AQPWFGROpZbn2ApVkvnK-w','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','鈥滃ぇ鎴愭澂鈥濋€夋嫈娲诲姩閫氳繃绾夸笂浼氳鐨勫舰寮忓紑灞曪紝鏃ㄥ湪閫夋嫈鍙傝禌闃熷憳锛屽姪鍔涘瀛愬弬涓庢ā鎷熸硶搴珵璧涖€傛硶瀛﹂櫌闄㈤暱寮犻泤钀嶃€佸壇闄㈤暱鏈辩帥銆佹硶瀛︾郴绯讳富浠绘秱缂︾鸡銆佸壇涓讳换榛勮壓鍗夈€侀櫌闀垮姪鐞嗛檲琛嶆ˉ绛夐瀵艰€佸笀鎷呬换璇勫銆備紬澶氬妯℃嫙娉曞涵绔炶禌鍏呮弧鐑儏銆佷笓涓氱礌鍏绘墡瀹炵殑瀛︾敓绉瀬鍙備笌銆傛椿鍔ㄩ潰鍚戝箍涓滈噾铻嶅闄㈡硶瀛﹂櫌鐨勫鐢燂紝浣嗕粠鏂囩珷鍐呭鏉ョ湅锛屽苟鏈檺鍒跺叾浠栧闄㈠拰鏍″尯鐨勫鐢熷弬涓庯紝鍥犳鍙互璁や负闈㈠悜鍏ㄦ牎瀛︾敓銆傛枃绔犳湭鎻愬強浜岃瀛﹀垎鍜岀患娴嬪垎锛屽洜姝ゆ棤娉曞垽鏂槸鍚﹀彲浠ヨ幏寰椼€傛枃绔犲睘浜庡叾浠栫被鍨嬬殑閫氱煡銆?,3),(66,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(67,'骞块噾鍏叡绠＄悊瀛﹂櫌','浣犵殑澶ц剳锛屾瘮浣犳兂璞′腑鏇存搮闀縗"閫嗚\"','2025-03-17 20:04:40','https://mp.weixin.qq.com/s/ggsKea_wXQvonRNwMKqzWA','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','鏂囩珷涓昏浠嬬粛浜嗗ぇ鑴戠殑鍙鎬т互鍙婂浣曢€氳繃鎴愰暱鍨嬫€濈淮鏉ユ彁鍗囧涔犺兘鍔涖€傛枃绔犳寚鍑猴紝澶ц剳骞堕潪鍥哄畾涓嶅彉锛岃€屾槸鍍忓彲濉戝舰鐨勯粡鍦燂紝鍙互閫氳繃璁粌涓嶆柇濉戦€犳柊鐨勫彲鑳姐€傞€氳繃璁板綍姣忓ぉ鐨勫井灏忚繘姝ワ紝灏嗏€滄垜鍋氫笉鍒扳€濇敼涓衡€滄垜鏆傛椂杩樻病鎺屾彙鈥濓紝浠ュ強鐢ㄢ€滄殏鏃舵€р€濇浛浠ｂ€滄案涔呮€р€濊〃杩扮瓑绛栫暐锛屽彲浠ュ缓绔嬬缁忓鍔辨満鍒讹紝鎻愬崌鍓嶉鍙剁毊灞傜殑娲昏穬搴︼紝浠庤€屼績杩涘ぇ鑴戠缁忚繛鎺ョ殑寮哄寲鍜岃鐭ヨ兘鍔涚殑鎻愬崌銆傛枃绔犺繕鎻愬埌浜嗕鸡鏁﹀嚭绉熻溅鍙告満娴烽┈浣撲綋绉闀跨殑渚嬪瓙锛屼互鍙婅€佸勾浜烘潅鎶€璁粌鍚庤繍鍔ㄧ毊灞傜伆璐ㄥ瘑搴﹀鍔犵殑鐮旂┒锛岃瘉鏄庝簡澶ц剳鍦ㄤ笉鍚屽勾榫勯樁娈甸兘鍏峰寮哄ぇ鐨勯€傚簲鑳藉姏銆傛渶鍚庯紝鏂囩珷榧撳姳璇昏€呭湪瀛︿範鍜屾垚闀夸腑閬囧埌鍥伴毦鏃讹紝瑕佺浉淇″ぇ鑴戠殑娼滃姏锛屽潥鎸佸姫鍔涳紝涓嶆柇鎼缓鏂扮殑绁炵粡閫氳矾锛屽疄鐜拌嚜鎴戠獊鐮淬€傚彟澶栵紝鏂囩珷鏈熬杩樹粙缁嶄簡蹇冪悊鍜ㄨ涓績棰勭害鏂瑰紡銆?,3),(68,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(69,'骞块噾宸ョ','宸ュ晢绠＄悊瀛﹂櫌缁勭粐寮€灞曘€婃梾娓告姇铻嶈祫绠＄悊銆嬭绋嬪疄璺垫暀瀛︽椿鍔?,'2025-03-18 21:59:47','https://mp.weixin.qq.com/s/LU_V3T6a1-MUlfE74ArDcg','鏃?,'鏃?,'骞垮窞/鏈儴鏍″尯','涓嶉檺','宸ュ晢绠＄悊瀛﹂櫌','鍏朵粬','\n鏂囩珷涓昏璁茶堪浜嗗伐鍟嗙鐞嗗闄簬2025骞?鏈?鏃ヨ嚦7鏃ョ粍缁囧笀鐢熷墠寰€骞垮窞璐у竵閲戣瀺鍗氱墿棣嗗紑灞曘€婃梾娓告姇铻嶈祫绠＄悊銆嬭绋嬪疄璺垫暀瀛︽椿鍔ㄣ€傛椿鍔ㄦ棬鍦ㄩ€氳繃鐞嗚鏁欏涓庡疄鐗╁疄璺电浉缁撳悎锛屽姞娣卞鐢熷璐у竵閲戣瀺鏂囧寲鐭ヨ瘑涓庢姇璧勭鐞嗙悊璁虹殑璁ょ煡銆俓n\n鍦ㄥ崥鐗╅鍐咃紝瀛︾敓浠€氳繃鍙傝銆佽瑙ｃ€佷簰鍔ㄧ瓑鏂瑰紡锛屼簡瑙ｄ簡璐у竵鍙戝睍鍙诧紝浣撻獙浜嗚揣甯佹嫇鍗版妧鑹猴紝骞跺弬涓庝簡3D鎵撳嵃涓庝簰鍔ㄥ紡浣撻獙銆傚垬鍗氭暀鎺堢粨鍚堝崥鐗╅灞曢檲锛屾繁鍏ユ祬鍑哄湴璁茶В浜嗘梾娓告姇铻嶈祫鐨勫晢涓氭ā寮忋€佸競鍦虹棝鐐广€佽惀閿€绛栫暐銆侀闄╁簲瀵逛互鍙婅储鍔¤瀺璧勭瓑鍏抽敭鐭ヨ瘑锛屽紩瀵煎鐢熷叧娉ㄤ笌鏃呮父鎶曡瀺璧勭浉鍏崇殑鍐呭锛屼綋浼氶噾铻嶅鏃呮父涓氬彂灞曠殑閲嶈鏀拺浣滅敤锛屾€濊€冩枃鏃呴」鐩姇璧勪腑鏂囧寲閬椾骇鐨勪环鍊艰浆鍖栬矾寰勩€俓n\n鏈瀹炶返鏁欏娲诲姩鍙楀埌鍚屽浠殑濂借瘎锛屼粬浠〃绀洪€氳繃瀹炲湴鍙傝鍜屾暀甯堣瑙ｏ紝涓嶄粎鍔犳繁浜嗗璇剧▼鍐呭鐨勭悊瑙ｏ紝杩樻彁楂樹簡瀹炶返鑳藉姏鍜岀患鍚堢礌璐ㄣ€傛澶栵紝鏂囩珷杩樻彁鍙婁簡杞浇鑷€滃箍宸炶揣甯侀噾铻嶅崥鐗╅鈥濆叕浼楀彿锛屼互鍙婂叾浠栫浉鍏抽摼鎺ワ紝濡傚伐鍟嗙鐞嗗闄㈢粍缁囧彫寮€鏂板鏈熸暀宸ュぇ浼氥€佷复鏃跺洶闅捐ˉ鍔╃敵璇风瓑銆?,3),(70,NULL,'@骞块噾瀛﹀瓙锛屼复鏃跺洶闅捐ˉ鍔╂€庝箞鐢宠锛熺湅杩欓噷锛?,'2025-03-17 21:59:00','https://mp.weixin.qq.com/s/MBQCYM195xlaXVQdBzMyHg','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','\n璇ラ€氱煡鏄叧浜庡箍涓滈噾铻嶅闄㈠湪鏍″鐢熺敵璇蜂复鏃跺洶闅捐ˉ鍔╃殑璇存槑銆傝ˉ鍔╁璞′负鍏ㄦ棩鍒跺湪璇绘湰绉戝鐢燂紙涓嶅惈澶栧浗鐣欏鐢燂級銆傝ˉ鍔╅€傜敤浜庡鐢熸湰浜哄湪鏍℃湡闂寸焦鎮ｉ噸澶х柧鐥呫€侀伃鍙椾弗閲嶆剰澶栦激瀹炽€佸鐢熷搴伃閬囦弗閲嶈嚜鐒剁伨瀹崇瓑绐佸彂浜嬩欢閫犳垚鐨勭粡娴庡洶闅俱€傜敵璇锋潯浠跺寘鎷洜浣忛櫌娌荤枟銆佸搴粡娴庡洶闅鹃亣鍒扮獊鍙戜簨浠躲€佸洜鐥呮垨鎰忓閫犳垚姝讳骸銆佸綋骞磋繘鏍℃柊鐢熺己灏戝尽瀵掕繃鍐敤鍝佹垨鍏朵粬涓存椂缁忔祹鍥伴毦鎯呭喌銆傜敵璇锋祦绋嬪寘鎷笅杞界敵璇疯〃銆佸～鍐欑敵璇疯〃骞舵彁浜よ嚦瀛﹂櫌锛堟牎鍖猴級杈呭鍛樺銆佸闄紙鏍″尯锛夋牳瀹炴儏鍐靛苟濉啓瀹℃牳鎰忚銆佸闄紙鏍″尯锛夊皢鐢宠琛ㄧ瓑鏉愭枡绛惧瓧鐩栫珷鍚庝氦鑷冲鐢熷伐浣滃杩涜瀹℃壒銆佸鐢熷伐浣滃瀹℃壒鍚庢彁浜よ储鍔″鎶ヨ处鍙戞斁琛ュ姪銆傞渶瑕佹彁浜ょ殑鏉愭枡鍖呮嫭鐢宠琛ㄣ€佷复鏃跺洶闅捐瘉鏄庢潗鏂欍€佺棰嗗崟鍜岀數瀛愮増鏉愭枡銆傚鐢熷伐浣滃鑱旂郴浜轰负鍛ㄤ簹杈夛紝鑱旂郴鐢佃瘽涓?20-87053925銆?,3),(71,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(72,'骞块噾鍥藉閲戣瀺瀛﹀闄?,'瀹℃牳璇勪及锝滄湰绉戞暀鑲叉暀瀛︾壒鑹叉潗鏂欙細鎵撻€犫€滅孩鑹?閲戣壊+鐗硅壊鈥濇€濇斂鑲蹭汉鏂版ā寮忥紝钀藉疄绔嬪痉鏍戜汉鏍规湰浠诲姟','2025-03-14 14:37:04','https://mp.weixin.qq.com/s/BFOsF6lEAXOarilC_aXoSw','鏃?,'鏈?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','\n杩欑瘒鏂囩珷浠嬬粛浜嗗箍涓滈噾铻嶅闄㈠浗瀹堕噾铻嶅瀛﹂櫌鎵撻€犫€滅孩鑹?閲戣壊+鐗硅壊鈥濇€濇斂鑲蹭汉鏂版ā寮忥紝钀藉疄绔嬪痉鏍戜汉鏍规湰浠诲姟鐨勫叿浣撲妇鎺拰鎴愭晥銆傚闄緷鎵樺鏍＄殑绾㈣壊閲戣瀺鏂囧寲璧勬簮锛屽皢绾㈣壊閲戣瀺鏂囧寲铻嶅叆鎬濇兂鏀挎不鏁欒偛锛屽苟澧炶繘鎬濇兂鏀挎不鏁欒偛涓庝笓涓氭暀鑲茬殑铻嶅悎锛屾墦閫犫€滅孩鑹?閲戣壊+鐗硅壊鈥濇€濇斂鑲蹭汉鏂版ā寮忋€俓n\n鍏蜂綋涓炬帾鍖呮嫭锛歕n1.鍧氭寔绾㈣壊寮曢锛屽皢绾㈣壊閲戣瀺鏂囧寲璧勬簮铻嶅叆鎬濇兂鏀挎不鏁欒偛锛岄€氳繃鈥滈噾铻嶆枃鍖栤€濅笓棰樿銆佷笓涓氬璁鸿绛夊舰寮忥紝璁叉巿绾㈣壊閲戣瀺鍙诧紝缁勭粐鍙傝鈥滈噸璧扮孩鑹查噾铻嶈矾鈥濆浘鐗囧睍鍙婂箍宸炶揣甯侀噾铻嶅崥鐗╅锛屽煿鑲插鐢熼噾铻嶆姤鍥戒箣蹇椼€俓n2.鍧氭寔閲戣壊鏍囧噯锛岄€氳繃璇剧▼鎬濇斂寤鸿鎵撻€犻噾甯堥噾璇鹃噾涓撲笟锛屽彂鎸ュ闄㈠厷鎬绘敮鍓功璁板紶鏍嬭搐鍓暀鎺堝洟闃熺殑绀鸿寖寮曢浣滅敤锛屽皢鍏氱殑鍒涙柊鐞嗚銆佷腑鍗庝紭绉€浼犵粺鏂囧寲绛夋€濇斂鍏冪礌铻嶅叆涓撲笟鏁欒偛鏁欏涓€俓n3.鍧氭寔鐗硅壊鍙戝睍锛屽紑灞曞瘜鏈夊绉戜笓涓氱壒鑹茬殑鎬濇兂鏀挎不鏁欒偛锛屾牴鎹储鏀垮銆侀噾铻嶇鎶€绛変笓涓氱殑瀛︾鐗圭偣銆佷笓涓氱壒鐐广€佽绋嬬壒鐐广€佹暀鏉愮壒鐐癸紝娣卞叆鎸栨帢骞惰嚜鐒惰瀺鍏ヨ暣鍚叾涓殑鎬濇兂鏀挎不鏁欒偛鍏冪礌銆俓n\n鍙栧緱鐨勬垚鏁堝寘鎷細\n1.浼犳壙绾㈣壊閲戣瀺鍩哄洜锛屽帤妞嶉噾铻嶆姤鍥芥儏鎬€锛屽己鍖栧鐢熲€滈噾铻嶆姤鍥解€濅娇鍛芥劅銆俓n2.璇剧▼鎬濇斂閾搁瓊鑲蹭汉锛屽崗鍚岃偛浜鸿惤鍦扮敓鏍癸紝鍩瑰吇瀛︾敓褰㈡垚姝ｇ‘鐨勪环鍊艰蹇典笌绀句細璐ｄ换鎰熴€俓n3.璇惧唴澶栨牎鍐呭鑱斿姩锛屽搧鐗屾椿鍔ㄦ繁鍏ヤ汉蹇冿紝鍒涘缓浜嗏€滃浗瀹堕噾铻嶅澶ц鍧涒€濆拰鈥滃紭姣呪€濊鍫傦紝寮€鎷撲簡甯堢敓瑙嗛噹锛屾彁鍗囦簡瀛︾敓缁煎悎绱犲吇銆俓n4.浜烘墠鍩瑰吇鍠滅粨纭曟灉锛屽笀鐢熻幏濂栨嵎鎶ラ浼狅紝姣曚笟鐢熷氨涓氱巼楂橈紝瀛︾敓缁煎悎绱犺川楂橈紝瀛﹂櫌鎬濇斂绉戠爺寮恒€俓n\n鎬昏€岃█涔嬶紝鍥藉閲戣瀺瀛﹀闄㈤€氳繃涓€绯诲垪涓炬帾锛屽皢鎬濇斂鏁欒偛涓庝笓涓氭暀鑲叉繁搴﹁瀺鍚堬紝鎻愬崌鑲蹭汉鎴愭晥锛屽煿鑲叉椂浠ｆ柊浜恒€傝娲诲姩闈㈠悜鍏ㄦ牎瀛︾敓锛屾殏鏈彁鍙婁簩璇惧鍒嗗拰缁兼祴鐩稿叧鍐呭銆?,1),(73,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(74,'骞块噾浼氳瀛﹂櫌','搴旂煡搴斾細 | 骞夸笢閲戣瀺瀛﹂櫌鏈鏁欒偛鏁欏瀹℃牳璇勪及宸ヤ綔瀹ｄ紶鎵嬪唽(涓€)','2025-03-18 22:03:54','https://mp.weixin.qq.com/s/pM-p5fDR4kThDvz5rB5lIg','鏃?,'鏃?,'涓嶉檺','涓嶉檺','浼氳瀛﹂櫌','鍏朵粬','璇ユ枃绔犳槸骞夸笢閲戣瀺瀛﹂櫌浼氳瀛﹂櫌瀹樻柟鍏紬鍙疯浆杞界殑鍏充簬鏈鏁欒偛鏁欏瀹℃牳璇勪及宸ヤ綔瀹ｄ紶鎵嬪唽鐨勯€氱煡銆?021骞存暀鑲查儴鍚姩鏂颁竴杞鏍歌瘎浼帮紝鏃ㄥ湪缁煎悎妫€楠屽鏍″姙瀛︽柟鍚戙€佸煿鍏昏繃绋嬨€佹暀瀛﹁祫婧愩€佹暀甯堥槦浼嶃€佸鐢熷彂灞曘€佽川閲忎繚闅滃強鏁欏鎴愭晥锛屼篃涓哄鏍℃彁渚涙€荤粨缁忛獙銆佸紑鍒涘彂灞曟柊灞€闈㈢殑鏈轰細銆傚箍涓滈噾铻嶅闄㈠皢浜?025骞?鏈?4鏃ヨ嚦4鏈?5鏃ユ帴鍙楀箍涓滅渷鏁欒偛鍘呯粍缁囩殑鏂颁竴杞湰绉戞暀鑲叉暀瀛﹀鏍歌瘎浼般€傚鏍″笇鏈涢€氳繃瀹ｄ紶鎵嬪唽锛岃鍏ㄦ牎甯堢敓鍛樺伐浜嗚В瀹℃牳璇勪及鐩稿叧鐭ヨ瘑鍙婇噸澶ф剰涔夛紝钀ラ€犫€滀汉浜哄叧蹇冭瘎浼般€佷汉浜轰簡瑙ｈ瘎浼般€佷汉浜哄弬涓庤瘎浼般€佷汉浜烘敮鎸佽瘎浼扳€濈殑姘涘洿锛屼互璇勪績寤恒€佷互璇勪績鏀癸紝瀵瑰緟璇勪及锛屽弬涓庤瘎浼般€?,3),(75,NULL,'绗洓鍗佷節灞婁細璁″ぇ璁插爞 | AI瀹¤鐨勬椂浠ｅ凡缁忓埌鏉ワ紒','2025-03-16 20:12:30','https://mp.weixin.qq.com/s/ewIx3vNaxyu3-O1Owg7aeQ','鍒涙柊鍒涗笟','鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','鏈浼氳瀛﹂櫌涓惧姙浜嗙鍥涘崄涔濆眾浼氳澶ц鍫傦紝涓婚涓衡€淎I瀹¤鐨勬椂浠ｅ凡缁忓埌鏉ワ紒鈥濄€傜綏鍏靛捀姘搁亾浼氳甯堜簨鍔℃墍鍚堜紮浜哄畞闈栫敺濂冲＋鍒嗕韩浜咥I濡備綍鏀瑰彉瀹¤锛屽寘鎷骇涓氬彉闈┿€佸湪瀹¤涓殑瀹為檯搴旂敤浠ュ強AI鏃朵唬瀹¤甯堢殑瑙掕壊銆侫I閫氳繃瀹炴椂鍒嗘瀽甯傚満渚涢渶鍙樺寲鍜屽鍦烘櫙妯℃嫙娴嬭瘯锛屽姪鍔涗紒涓氱ǔ鍋ヨ繍钀ワ紝鍦ㄥ揩閫熷鐞嗘暟鎹拰瀹炴椂鏁版嵁鍒嗘瀽鏂归潰鎻愬崌瀹¤鏁堢巼鍜屽噯纭€с€傛湭鏉ョ殑瀹¤甯堥渶瑕佹帉鎻℃暟鎹垎鏋愩€丄I宸ュ叿搴旂敤绛夋柊鎶€鑳斤紝鎴愪负鏅鸿兘鍖栧璁＄殑寮曢鑰呫€傛椿鍔ㄥ弽鍝嶇Н鏋侊紝瀛︾敓韪婅穬鎻愰棶锛屾湁鏁堜績杩涗簡瀛︾敓瀵瑰璁I鎶€鏈殑浜嗚В锛屽苟瀵逛汉宸ユ櫤鑳芥椂浠ｇ殑鑱屼笟瑙勫垝璧峰埌鎸囧鎬т綔鐢ㄣ€傝娲诲姩鐢卞垱鏂板垱涓氭寚瀵间腑蹇冧緵绋裤€?,1),(76,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(77,'骞块噾閲戞姇闄?,'鍏氫腑澶喅瀹氾紝鍦ㄥ叏鍏氬紑灞曟繁鍏ヨ疮褰讳腑澶叓椤硅瀹氱簿绁炲涔犳暀鑲?,'2025-03-19 10:00:00','https://mp.weixin.qq.com/s/vDkWOLgGyT584QCXiYRN6g','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','璇ユ枃绔犱富瑕佸唴瀹逛负锛氫腑澶厷鐨勫缓璁惧伐浣滈瀵煎皬缁勫彫寮€浼氳锛屽涔犺疮褰讳範杩戝钩鎬讳功璁板叧浜庢繁鍏ヨ疮褰讳腑澶叓椤硅瀹氱簿绁炲涔犳暀鑲茬殑閲嶈璁茶瘽鍜岄噸瑕佹寚绀虹簿绁烇紝鐮旂┒閮ㄧ讲瀛︿範鏁欒偛宸ヤ綔銆傚厷涓ぎ鍐冲畾锛岃嚜2025骞村叏鍥戒袱浼氬悗鑷?鏈堝湪鍏ㄥ厷寮€灞曟繁鍏ヨ疮褰讳腑澶叓椤硅瀹氱簿绁炲涔犳暀鑲层€傛枃绔犳潵婧愭柊鍗庣ぞ锛岀紪杈戜负鍒樼惇锛屽垵瀹′负杞︽槑鐝嶏紝澶嶅涓洪粍闀滅锛岀粓瀹′负棰滀僵浠€傝鏂囩珷涓昏璁茶堪鐨勬槸鍏氬唴鏀挎不瀛︿範鍜岀簿绁炶疮褰荤殑鐩稿叧鍐冲畾鍜岄儴缃层€?,3),(78,NULL,'閫愭ⅵ鏄ュぉ閲?鍚屽績鍚戞湭鏉モ€斺€斿崄鍥涘眾鍏ㄥ浗浜哄ぇ涓夋浼氳闂箷渚ц','2025-03-18 10:00:00','https://mp.weixin.qq.com/s/Vhr9J_b5n10s1yBga4JeTA','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','杩欑瘒鏂囩珷鏄鍗佸洓灞婂叏鍥戒汉澶т笁娆′細璁棴骞曠殑渚ц銆備細璁湪鍖椾含鍙紑锛岃繎3000鍚嶅叏鍥戒汉澶т唬琛ㄥ嚭甯€備唬琛ㄤ滑璁ょ湡瀹¤鏀垮簻宸ヤ綔鎶ュ憡锛岀Н鏋佺尞绛栵紝鎻愬嚭浜嗚妗堝拰寤鸿锛屽唴瀹规兜鐩栫鎶€鍒涙柊銆佷骇涓氬彂灞曘€佹皯鐢熼棶棰樸€佽惀鍟嗙幆澧冦€佹暀鑲茶祫婧愩€佹枃鏃呭彂灞曠瓑澶氫釜鏂归潰銆備細璁湡闂磋繕涓捐浜嗏€滀唬琛ㄩ€氶亾鈥濋泦浣撻噰璁挎椿鍔紝澶氫綅浠ｈ〃鍒嗕韩浜嗕粬浠殑杩芥ⅵ鏁呬簨鍜屽饱鑱屽績寰椼€傞棴骞曚細涓婏紝浠ｈ〃浠〃鍐冲悇椤瑰喅璁拰鍐冲畾鑽夋锛岃〃绀鸿鐗㈢墷鎶婃彙鍥藉鍙戝睍鏈洪亣锛屽湪鍚勮嚜棰嗗煙绮剧泭姹傜簿锛岃В鍐虫妧鏈毦棰橈紝涓哄浗瀹跺彂灞曡础鐚姏閲忋€備細璁己璋冧簡鍏氱殑棰嗗鐨勯噸瑕佹€э紝鍧氭寔浠ヤ汉姘戜负涓績鐨勫彂灞曟€濇兂锛屽苟榧撳姳澶у鐮ョ牶濂嬭繘銆佽繋闅捐€屼笂銆傛渶鍚庯紝鏂囩珷琛ㄨ揪浜嗗涓浗鏈潵鍙戝睍鐨勪俊蹇冨拰鏈熺浖銆?,3),(79,NULL,'閲戣瀺涓庢姇璧勫闄㈠厷濮斻€佸浗淇¤瘉鍒稿箍宸炲垎鍏徃鍏氬 寮€灞曗€滀紶鎵垮箔鍗楁枃鑴夛紝鍏辨鍏氬憳鏂扮豢鈥濅富棰樺厷鏃ュ叡寤烘椿鍔?,'2025-03-17 10:00:00','https://mp.weixin.qq.com/s/kIrbko32gQt4iKDf7MtBhA','蹇楁効鍏泭','鏃?,'涓嶉檺','涓嶉檺','閲戣瀺涓庢姇璧勫闄?,'鍏朵粬','鏈娲诲姩鏄噾铻嶄笌鎶曡祫瀛﹂櫌鍏氬涓庡浗淇¤瘉鍒稿箍宸炲垎鍏徃鍏氬鑱斿悎涓惧姙鐨勨€滀紶鎵垮箔鍗楁枃鑴夛紝鍏辨鍏氬憳鏂扮豢鈥濅富棰樺厷鏃ユ椿鍔ㄣ€傛椿鍔ㄤ簬3鏈?鏃ヤ妇琛岋紝鍦扮偣鍦ㄥ箍宸炲競浠庡寲鍖恒€傛椿鍔ㄥ唴瀹瑰寘鎷弬瑙傚浗瀹剁増鏈骞垮窞鍒嗛鍜屾槬瀛ｆ鏍戙€傚湪鍥藉鐗堟湰棣嗭紝鍏氬憳浠弬瑙備簡澶氫釜灞曡锛屼簡瑙ｄ腑鍗庣増鏈殑鍘嗗彶婕斿彉锛屾劅鍙椾腑鍗庢枃鍖栫殑婧愯繙娴侀暱銆傞殢鍚庯紝鍏氬憳浠弬涓庝簡妞嶆爲娲诲姩锛岀編鍖栦埂鏉戠幆澧冿紝澧炲己鐢熸€佺幆淇濇剰璇嗐€傞噾铻嶄笌鎶曡祫瀛﹂櫌璁″垝浠ユ娆℃椿鍔ㄤ负璧风偣锛屽姞澶х敓鎬佺幆淇濆浼犲姏搴︼紝鍔ㄥ憳甯堢敓鍏氬憳绉瀬鍙備笌鍒版鏍戦€犳灄鍜岀幆澧冧繚鎶や腑鏉ワ紝涓虹豢缇庡箍涓滅敓鎬佸缓璁捐础鐚姏閲忋€傛湰娆℃椿鍔ㄩ潰鍚戦噾铻嶄笌鎶曡祫瀛﹂櫌鍏ㄤ綋甯堢敓銆?,1),(80,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(81,'骞块噾浜掕仈缃戝闄?,'搴旂煡搴斾細 | 骞夸笢閲戣瀺瀛﹂櫌鏈鏁欒偛鏁欏瀹℃牳璇勪及宸ヤ綔瀹ｄ紶鎵嬪唽(涓€)','2025-03-18 09:49:14','https://mp.weixin.qq.com/s/x0Aj3gBU3CQmxPaw7lfz0A','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','鏈枃鏄箍涓滈噾铻嶅闄㈠叧浜庢湰绉戞暀鑲叉暀瀛﹀鏍歌瘎浼板伐浣滅殑瀹ｄ紶鎵嬪唽(涓€)銆傛暀鑲查儴浜?021骞?鏈?1鏃ュ惎鍔ㄤ簡鏂颁竴杞鏍歌瘎浼帮紝璇ヨ瘎浼版槸瀵瑰鏍″姙瀛︽柟鍚戙€佸煿鍏昏繃绋嬨€佹暀瀛﹁祫婧愩€佹暀甯堥槦浼嶃€佸鐢熷彂灞曘€佽川閲忎繚闅滃強鏁欏鎴愭晥鐨勭患鍚堟楠屻€傚鏍″皢浜?025骞?鏈?4鏃モ€?鏈?5鏃ユ帴鍙楀箍涓滅渷鏁欒偛鍘呯粍缁囩殑鏂颁竴杞湰绉戞暀鑲叉暀瀛﹀鏍歌瘎浼般€備负浜嗚鍏ㄦ牎甯堢敓鏇村ソ鍦颁簡瑙ｅ鏍歌瘎浼帮紝瀛︽牎缂栧埗浜嗗浼犳墜鍐岋紝鏃ㄥ湪褰㈡垚鈥滀汉浜哄叧蹇冭瘎浼般€佷汉浜轰簡瑙ｈ瘎浼般€佷汉浜哄弬涓庤瘎浼般€佷汉浜烘敮鎸佽瘎浼扳€濈殑姘涘洿锛屽笇鏈涘ぇ瀹朵互鈥滃钩甯稿績銆佹甯告€佲€濓紝鈥滃涔犲績銆佸紑鏀炬€佲€濓紝鈥滆嚜淇″績銆佽繘鍙栨€佲€濆寰呭拰鍙備笌璇勪及锛屼互璇勪績寤恒€佷互璇勪績鏀癸紝鎺ㄨ繘瀛︽牎鍐呮兜寮忛珮璐ㄩ噺鍙戝睍銆?,3),(82,NULL,'甯堣€呭尃蹇? |  鍛ㄧ憺绾細浠ヤ弗璋ㄤ箣蹇冿紝鑲插垱鏂颁箣鑻?,'2025-03-15 22:00:00','https://mp.weixin.qq.com/s/L7fBFuudBqioz531ZoYCxw','鏃?,'鏃?,'涓嶉檺','涓嶉檺','浜掕仈缃戦噾铻嶄笌淇℃伅宸ョ▼瀛﹂櫌','鍏朵粬','鏂囩珷浠嬬粛浜嗗箍涓滈噾铻嶅闄簰鑱旂綉閲戣瀺涓庝俊鎭伐绋嬪闄㈠壇鏁欐巿銆佽蒋浠跺伐绋嬩笓涓氱郴涓讳换鍛ㄧ憺绾㈣€佸笀鐨勬暀鑲茬悊蹇靛拰瀵笰I鏃朵唬鏁欒偛鐨勬€濊€冦€傚懆鑰佸笀璁や负锛屽崥澹樁娈甸渶瑕佺嫭绔嬫€濊€冨拰瑙ｅ喅闂鐨勮兘鍔涳紝鏄汉鐢熺殑淇鍜屾礂绀笺€傚ス寮鸿皟楂樼瓑鏁欒偛搴斾粠鈥滄暀鐭ヨ瘑鈥濆悜鈥滆偛鑳藉姏鈥濊浆鍙橈紝鏁欏笀搴斿叿澶囪绋嬭璁″笀銆佸涔犱績杩涜€呫€佽兘鍔涜瘎浼板笀鐨勪笁閲嶈鑹诧紝骞舵彁鍑虹簿閫氱紪绋嬮渶瑕佸鍐欎唬鐮併€佺Н鏋佸弬涓庣珵璧涖€傞拡瀵笰I鎶€鏈鏁欒偛鐨勫奖鍝嶏紝鍛ㄨ€佸笀璁や负搴斾互寮€鏀惧績鎬佹嫢鎶卞彉闈╋紝鍒╃敤AI浼樺寲鏁欏锛屽悓鏃跺潥瀹堟暀鑲叉湰璐紝婵€鍙戝鐢熷垱閫犲姏锛屽煿鍏诲仴鍏ㄤ汉鏍笺€傚ス璁や负AI鏃朵唬搴斿煿鍏诲鐢熷師鍒涙€ф€濊€冦€佷环鍊煎垽鏂拰鎰忎箟鍒涢€犺兘鍔涳紝灏嗘妧鏈浆鍖栦负鍟嗕笟鎴栫ぞ浼氫环鍊硷紝鍏峰缁堣韩瀛︿範鑳藉姏锛屾垚涓轰环鍊肩殑鍒涢€犺€呫€傛枃绔犺繕鍖呭惈浜嗗懆鑰佸笀瀵瑰鐢熺殑瀵勮锛岄紦鍔卞鐢熶笉鏂彁鍗囪嚜鎴戯紝瀹炵幇浜虹敓浠峰€笺€傛渶鍚庢敞鏄庝簡鏂囩珷鐨勪緵绋裤€佹帓鐗堛€佸皝闈㈣璁°€佹寚瀵笺€佸垵瀹°€佸瀹″拰缁堝浜哄憳浠ュ強鍑哄搧鏂逛负浜掕仈缃戦噾铻嶄笌淇℃伅宸ョ▼瀛﹂櫌銆?,3),(83,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(84,'骞块噾鏁扮粺瀛﹂櫌','鏁扮粺瀛﹂櫌濂栧嫟鍔╄捶涓績鎷涙柊鍟︼紒','2025-03-18 15:47:01','https://mp.weixin.qq.com/s/0jJQZ-dzNXELI1RuBEoVZw','鑿佽嫳鎴愰暱','鏈?,'涓嶉檺','澶т簩銆佸ぇ涓?,'閲戣瀺鏁板涓庣粺璁″闄?,'鍏朵粬','\n鏈枃鏄箍閲戞暟缁熷闄㈠鍕ゅ姪璐蜂腑蹇冩嫑鏂板叕鍛婏紝闈㈠悜23绾с€?4绾э紙澶т簩銆佸ぇ涓夛級瀛︾敓銆傝涓績鏄噾铻嶆暟瀛︿笌缁熻瀛﹂櫌鍏ぇ瀛︾敓缁勭粐涔嬩竴锛屼互鈥滃姪瀛﹁偛浜衡€濅负瀹楁棬锛屼笅璁惧鍕ら儴銆佸姪璐烽儴銆佸浼犻儴涓変釜閮ㄩ棬锛屽垎宸ユ槑纭紝鍗忎綔楂樻晥銆俓n濂栧嫟閮ㄨ礋璐ｅ瀛﹂噾璇勪紭鍜岃祫鏂欐眹鎬讳笂鎶ワ紱鍔╄捶閮ㄨ礋璐ｅ搴粡娴庡洶闅惧鐢熻瀹氥€佸姪瀛﹁捶娆炬斂绛栧浼犮€佸姪瀛﹂噾璇勫畾绛夊伐浣滐紱瀹ｄ紶閮ㄨ礋璐ｆ帹鏂囥€佹捣鎶ュ埗浣溿€佷細璁褰曞拰璺ㄩ儴闂ㄥ浼犳柟妗堛€俓n鍔犲叆璇ヤ腑蹇冨彲浠ョН绱粍缁囩鐞嗙粡楠岋紝鎷撳睍浜洪檯缃戠粶锛屼簡瑙ｅ鍔╁閲戞斂绛栵紝閿荤偧瀹為檯闂瑙ｅ喅涓庡喅绛栬兘鍔涖€傜鍒╁寘鎷患娴嬪姞鍒嗐€佽崳瑾夎瘉涔︺€佹妧鑳藉煿璁€佸疄璺垫満浼氥€佹斂绛栫孩鍒┿€佷汉鑴夋嫇灞曘€佸洟闃熺鍒╃瓑銆傚湪璇勪紭璇勫厛銆佸疄涔犳帹鑽愪腑浜湁缁勭粐鍐呮帹璧勬牸銆傝涓績闇€瑕佺儹蹇冩湇鍔″悓瀛︺€佽矗浠绘劅寮恒€佹复鏈涘涔犳柊鎶€鑳姐€佽鐪熺粏鑷淬€佹湁鍥㈤槦鍗忎綔绮剧鐨勫鐢熴€傜鍚堟潯浠剁殑瀛︾敓鍙互閫氳繃鎵弿浜岀淮鐮佹姤鍚嶃€傚姞鍏ュ悗鍙互鑾峰緱浜岃瀛﹀垎鍔犲垎娲诲姩鏈轰細銆?,1),(85,NULL,'骞夸笢閲戣瀺瀛﹂櫌2024-2025瀛﹀勾绗簩瀛︽湡绗洓鍛ㄦ牎鍥嫑鑱樺畨鎺掕〃','2025-03-17 20:57:53','https://mp.weixin.qq.com/s/0FAFNMgEvEz6Iicuv6eq5g','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','鏈娲诲姩涓哄箍涓滈噾铻嶅闄?024-2025瀛﹀勾绗簩瀛︽湡绗洓鍛ㄧ殑鏍″洯鎷涜仒瀹夋帓琛紝鎷涜仒淇℃伅鏉ユ簮浜庡箍閲戝氨涓氬叕浼楀彿銆傚弬涓庡璞′笉闄愬勾绾с€佸闄㈠拰鏍″尯锛屾墍鏈夊鐢熷潎鍙弬鍔犮€傛嫑鑱樹細鏃堕棿浠?鏈?9鏃ュ埌3鏈?1鏃ワ紝鏈夊瀹跺叕鍙稿弬涓庯紝鍖呮嫭鍖椾含浜哄淇濋櫓鑲′唤鏈夐檺鍏徃骞夸笢鍒嗗叕鍙搞€佸箍宸炲競鍗撹秺閲岀▼鏁欒偛绉戞妧鏈夐檺鍏徃銆佸崕鍒涜瘉鍒告湁闄愯矗浠诲叕鍙稿箍涓滃垎鍏徃銆佽吹宸炲浗鍙伴厭涓氶攢鍞湁闄愬叕鍙搞€佷腑鍥藉伐鍟嗛摱琛岃偂浠芥湁闄愬叕鍙搞€佹繁鍦冲競澶╁仴鍩庡競鏈嶅姟鏈夐檺鍏徃銆佸箍宸炶姳闃崇鎶€鏈夐檺鍏徃銆傝缁嗕俊鎭彲鍏虫敞灏变笟淇℃伅缃戞垨鏍″唴灏变笟鍏憡鏍忋€傝嫢鏃犳硶杩涜鍚庡彴鎶ュ悕锛屽璁蹭細褰撳ぉ鍙繘琛岀幇鍦烘姤鍚嶃€?,3),(86,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(87,'骞块噾澶栨枃','澶栨枃瀛﹂櫌杩庢帴鏂颁竴杞湰绉戞暀鑲叉暀瀛﹀鏍歌瘎浼板簲鐭ュ簲浼氱煡璇嗛棶绛旂浜岃疆娲诲姩閫氱煡','2025-03-16 22:10:21','https://mp.weixin.qq.com/s/p8Asvo0HNE1Sota1qFVIXA','鏃?,'鏃?,'涓嶉檺','涓嶉檺','澶栧浗璇█涓庢枃鍖栧闄?,'鍏朵粬','璇ラ€氱煡鏄叧浜庡鏂囧闄负浜嗚繋鎺ユ柊涓€杞湰绉戞暀鑲叉暀瀛﹀鏍歌瘎浼拌€屽紑灞曠殑搴旂煡搴斾細鐭ヨ瘑闂瓟绗簩杞椿鍔ㄣ€傞€氱煡鍙戝竷鍦ㄥ井淇″叕浼楀彿涓婏紝榧撳姳澶у鍏虫敞鍏紬鍙蜂互鑾峰彇鏇村淇℃伅銆傜敱浜庢枃绔犲唴瀹归潪甯告湁闄愶紝鏃犳硶纭畾璇ユ椿鍔ㄦ槸鍚︽彁渚涗簩璇惧鍒嗘垨缁兼祴鍒嗭紝浠ュ強闈㈠悜鐨勫叿浣撳勾绾у拰鏍″尯銆備絾鏄彲浠ョ‘瀹氱殑鏄紝杩欎釜娲诲姩鍙拡瀵逛簬澶栧浗璇█涓庢枃鍖栧闄€傝閫氱煡鐨勭被鍨嬪綊涓哄叾浠栥€?,3),(88,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(89,'GDUF缁忔祹璐告槗瀛﹂櫌 ','绛戠墷鍋ュ悍闃茬嚎锛屽叡闃叉牎鍥紶鏌撶梾|棰勯槻浼犳煋鐥呰鍔ㄨ鍒?,'2025-03-16 20:00:00','https://mp.weixin.qq.com/s/q_1-6Aa7RwWYM-5q9pKGLg','鏃?,'鏃?,'娓呰繙鏍″尯','涓嶉檺','缁忔祹璐告槗瀛﹂櫌','鍏朵粬','\n鏈娲诲姩鏄粡娴庤锤鏄撳闄㈢孩鍗佸瓧鍒嗕細缁勭粐鐨勨€滅瓚鐗㈠仴搴烽槻绾匡紝鍏遍槻鏍″洯浼犳煋鐥?,3),(90,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(91,'閲戦櫌鏄ョ','骞块噾鈥滄牎鍥仴搴疯窇鈥濆贰鏌ラ€氱煡锛?,'2025-03-14 12:22:32','https://mp.weixin.qq.com/s/1pbkl0nClJ5v2SdTma38nA','鏂囦綋娲诲姩','鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','\n鏈枃鏄竴鍒欏叧浜庡箍涓滈噾铻嶅闄紙骞块噾锛夆€滄牎鍥仴搴疯窇鈥濆贰鏌ョ殑閫氱煡銆傞€氱煡鏈彁鍙婁簩璇惧鍒嗗拰缁兼祴鍒嗐€傞潰鍚戝叏浣撳箍閲戝鐢燂紝涓嶉檺鍒舵牎鍖恒€佸勾绾у拰瀛﹂櫌銆備粠鍐呭鏉ョ湅锛屾閫氱煡灞炰簬鈥滃叾浠栤€濈被鍨嬶紝鎻愮ず璇昏€呭叧娉ㄢ€滈噾闄㈡槬绉嬧€濆井淇″叕浼楀彿鑾峰彇鏇村骞块噾璧勮銆?,1),(92,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(93,'iknow鍘傚叏','骞块噾缁兼祴娲诲姩133 | 闈㈠悜閲戞姇闄㈠鐢燂紝鏈夋晥鍙備笌娲诲姩鍗冲彲寰楁€濇兂鎴愰暱瀛﹀垎锛?,'2025-03-16 20:31:19','https://mp.weixin.qq.com/s/Fc6unsw2-LoNrru-MoCSvg','鎬濇兂鎴愰暱','鏈?,'涓嶉檺','涓嶉檺','閲戣瀺涓庢姇璧勫闄?,'鍏朵粬','\n璇ユ椿鍔ㄦ槸骞块噾閽堝閲戣瀺涓庢姇璧勫闄㈠鐢熶妇鍔炵殑鈥滀袱浼氱煡璇嗙煡澶氬皯鈥濈煡璇嗙珵璧涙椿鍔ㄣ€傚弬涓庤€呭彲浠ラ€氳繃瀛︿範閫氬湪绾跨瓟棰橈紝鏍规嵁鍒嗘暟鑾峰緱鐩稿簲鐨勬€濇兂鎴愰暱瀛﹀垎锛?5鍒嗕互涓?.1鍒嗭紝85鍒嗕互涓?.2鍒嗭紝95鍒嗕互涓?.3鍒嗭級銆傛椿鍔ㄦ棬鍦ㄤ績浣垮ぇ瀛︾敓娣卞叆棰嗕細2025骞粹€滃叏鍥戒袱浼氣€濈殑鏍稿績绮剧锛屾帉鎻＄浉鍏崇煡璇嗙偣锛屽己鍖栧綋浠ｉ潚骞寸殑璐ｄ换鎷呭綋涓庝娇鍛芥剰璇嗭紝鎻愬崌鏀挎不绱犺川銆傛椿鍔ㄧ敱閲戣瀺涓庢姇璧勫闄㈠鐢熷厷寤哄姙鍏绀句細瀹炶返閮ㄤ笌淇℃伅瀹ｄ紶閮ㄤ富鍔烇紝鎶ュ悕鍜岃€冭瘯鏃堕棿鍧囦负2025骞?鏈?8鏃ヨ嚦20鏃ワ紝绛惧埌鏃堕棿涓?025骞?鏈?1鏃ヨ嚦23鏃ャ€傚鐢熷彲浠ラ€氳繃鎻愪緵鐨勯摼鎺ユ煡鐪嬪涔犺祫鏂欙紝鏈€缁堣В閲婃潈褰掗噾铻嶄笌鎶曡祫瀛﹂櫌瀛︾敓鍏氬缓涓績鎵€鏈夈€俓n',1),(94,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(95,'鏈嶅姟灏忔潙搴?,'娉ㄦ剰锛佷綋鑲茶ˉ娴嬫湰鍛ㄤ簲寮€濮?,'2024-11-11 17:47:04','https://mp.weixin.qq.com/s/aywO4ImAZYQ2Ru4uHksLXg','鏂囦綋娲诲姩','鏈?,'骞垮窞/鏈儴鏍″尯,娓呰繙鏍″尯','涓嶉檺','涓嶉檺','浣撴祴','\n璇ラ€氱煡鏄叧浜?024骞村鐢熶綋璐ㄥ仴搴锋祴璇曡ˉ娴嬪畨鎺掑強鎴愮哗鏌ヨ銆佸厤娴嬪悕鍗曠殑閫氱煡銆傚叏鏍″鐢熷彲浠ュ湪鈥滀綋閫傝兘鈥濆叕浼楀彿鏌ヨ鎴愮哗鍙婂厤娴嬬姸鎬併€傞€氳繃鍏嶆祴鐢宠鐨勫鐢熸垚缁╃姸鎬佷細鏄剧ず涓衡€滃厤娴嬧€濄€傛€诲垎涓嶅強鏍煎強缂洪」椤光浆鐨勫悓瀛﹂渶瑕佸弬鍔犺ˉ娴嬨€傝ˉ娴嬫椂闂村畾浜?1鏈?5鏃ワ紙鏈懆浜旓級鏃?:30鈥?1:30锛屼笅鍗?4:30鈥?6锛?0锛屽箍宸?鏈儴鏍″尯鍜屾竻杩滄牎鍖虹粺涓€瀹夋帓銆傚箍宸?鏈儴鏍″尯璺戞椤光浆鏀瑰湪鍖椻渐寰勫満锛屽叾浠栭」饨湴鐐逛笉鍙樸€傝娲诲姩闈㈠悜鍏ㄤ綋瀛︾敓锛屾槸灞炰簬鏂囦綋娲诲姩绫诲瀷鐨勪簩璇惧鍒嗘椿鍔紝骞朵笖鍙互鑾峰緱缁兼祴鍒嗐€?,1),(96,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(97,'濂戒汉甯堝厔','骞块噾鍚屽娉ㄦ剰浜嗭紒瑕佸贰鏌モ€滄牎鍥仴搴疯窇鈥濓紒','2025-03-14 11:53:53','https://mp.weixin.qq.com/s/hTMOzqSgFGpN-xx_NxXNuQ','鏂囦綋娲诲姩','鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','\n鏈枃鏄竴绡囧叧浜庡箍涓滈噾铻嶅闄紙骞块噾锛夆€滄牎鍥仴搴疯窇鈥濇椿鍔ㄥ贰鏌ョ殑閫氱煡銆備富瑕佸唴瀹规槸閫氳繃寰俊鍏紬鍙峰彂甯冿紝鎻愰啋骞块噾瀛︾敓娉ㄦ剰鏍″洯鍋ュ悍璺戞椿鍔ㄧ殑鐩稿叧浜嬪疁銆傛病鏈夋槑纭彁鍙婁簩璇惧鍒嗘垨缁兼祴鍒嗐€傛椿鍔ㄩ潰鍚戝叏浣撳箍閲戝鐢燂紝鍥犳鏍″尯鍜屽闄笉闄愩€傚勾绾ф柟闈㈡病鏈夋槑纭檺鍒讹紝鍙互鐞嗚В涓烘墍鏈夊勾绾у鐢熷潎鍙弬涓庛€傛€讳綋鏉ヨ锛岃繖鏄竴鍒欐牎鍥椿鍔ㄧ浉鍏崇殑閫氱煡锛屾彁閱掑鐢熷叧娉ㄥ苟鍙備笌銆傝繖鏄竴鏉″叾浠栫被鍨嬬殑閫氱煡銆?,1),(98,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(99,'閲戦櫌涓囦簨閫?,'骞块噾姣曚笟鐢熷垎浜玽ol.28锛氭瘯涓氬悗涓嶄細澶碂绯曚篃涓嶄細澶『鍒╋紝瀹冩槸闅忕潃鎴戜滑骞撮緞澧為暱浼氱粡鍘嗙殑涓€涓樁娈?,'2025-03-17 13:19:51','https://mp.weixin.qq.com/s/ilPs3f6dJ_JCGK5I1egHPg','鏃?,'鏃?,'涓嶉檺','鏃?,'涓嶉檺','鍏朵粬','杩欑瘒鏂囩珷鏄箍閲戞瘯涓氱敓鍒嗕韩绯诲垪锛岀洰鍓嶆槸绗簩鍗佸叓鏈熴€傚唴瀹逛富瑕佹槸涓€浜涙瘯涓氱敓鐨勭粡楠屽垎浜紝鍖呮嫭鍦ㄥ浼併€佸浗浼併€佸埜鍟嗐€佹斂搴滈儴闂ㄧ瓑涓嶅悓琛屼笟鐨勫伐浣滀綋楠屽拰鎰熸偀銆傚垎浜€呮湁21灞娿€?2灞娿€?3灞娿€?4灞婄殑姣曚笟鐢燂紝浠栦滑鐨勫缓璁槸锛氳秮骞磋交澶氬皾璇曪紝鏃╁仛瑙勫垝锛屽瀛橀挶锛岄挶鏄簳姘斻€傞紦鍔卞湪鏍＄敓绉瀬鎺㈢储鑱屼笟鏂瑰悜锛屼负鏈潵鐨勮亴涓氬彂灞曟墦涓嬪熀纭€銆傛枃绔犳渶鍚庨紦鍔辫鑰呭湪璇勮鍖哄垎浜嚜宸辩殑鎯虫硶锛屽苟琛ㄧず濡傛灉璇昏€呭枩娆㈣繖涓爮鐩紝浼氭寔缁洿鏂般€備粠鏁翠綋鏉ョ湅锛岃繖鏄竴绡囧叧浜庤亴涓氳鍒掑拰灏变笟鎸囧鐨勬枃绔犮€?,3),(100,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(101,'灏忛噾鐞冪煡閬?,'骞块噾鈥滄渶绱汉鈥濅笓涓氭帓琛屾绔熸槸鈥︹€?,'2025-03-19 16:09:47','https://mp.weixin.qq.com/s/POG3KAIiE869ZQ7scryXFw','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','\n鏂囩珷涓昏鍐呭鏄箍涓滈噾铻嶅闄㈠彂璧风殑鈥滃箍閲戝勾搴︾垎鑲濅笓涓氭帓琛屾鈥濋棶鍗疯皟鏌ワ紝閭€璇峰鐢熷弬涓庢姇绁紝閫氳繃闂嵎鏀堕泦鍚勪笓涓氱殑瀛︿範寮哄害鎯呭喌锛屽苟璁″垝鍦ㄥ悗缁帹閫佷腑鍙戝竷鏁寸悊缁撴灉銆傛澶栵紝鏂囩珷杩樻帹閫佷簡鍏朵粬涓庡鐢熷涔犵敓娲荤浉鍏崇殑淇℃伅锛屽寘鎷櫤鎱ц瀹ゅ缓璁俱€丳PT妯℃澘銆佸巻骞存湡鏈湡棰樸€佺畝鍘嗘ā鏉裤€佸浗瀹跺瀛﹂噾鎻愰珮銆佹柊澧炵澹偣绛夈€傛€讳綋鏉ヨ锛屾枃绔犲洿缁曞箍涓滈噾铻嶅闄㈠鐢熺殑瀛︿範鍜岀敓娲诲睍寮€锛屾棬鍦ㄤ簡瑙ｅ鐢熷鍚勪笓涓氬涔犲己搴︾殑璇勪环锛屽苟鎻愪緵鐩稿叧璧勬簮鍜屾湇鍔°€傞棶鍗疯皟鏌ラ€氳繃鎵弿浜岀淮鐮佸弬涓庯紝榧撳姳瀛︾敓绉瀬鍙嶉鐪熷疄鐨勫涔犳儏鍐点€傛枃绔犺繕鍖呭惈澶氫釜閾炬帴锛屽垎鍒寚鍚戜笌骞夸笢閲戣瀺瀛﹂櫌鐩稿叧鐨勫悇绫昏祫璁€?,3),(102,NULL,'鏈€鏂版斁鍋囬€氱煡锛?澶╋紝涓嶈皟浼戯紒','2025-03-18 18:03:52','https://mp.weixin.qq.com/s/To0FWqjKENq2oxDt_YcflQ','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鏀惧亣','\n鏂囩珷涓昏鍙戝竷浜嗗箍涓滈噾铻嶅闄㈠叧浜?025骞存竻鏄庤妭銆佸姵鍔ㄨ妭銆佺鍗堣妭銆佸浗搴嗚妭鍜屼腑绉嬭妭鐨勬斁鍋囧畨鎺掋€傛竻鏄庤妭鏀惧亣3澶╀笉璋冧紤锛屽姵鍔ㄨ妭鏀惧亣5澶╋紝绔崍鑺傛斁鍋?澶╋紝鍥藉簡鑺傘€佷腑绉嬭妭鏀惧亣8澶┿€傛枃绔犺繕鎻愬埌浜嗘敹璐瑰叕璺湪娓呮槑鑺傘€佸姵鍔ㄨ妭銆佸浗搴嗚妭绛夊洓涓浗瀹舵硶瀹氳妭鍋囨棩鍏嶈垂閫氳銆傛澶栵紝鏂囩珷杩樺彂甯冧簡鍏充簬鏅烘収璇惧寤鸿銆丳PT妯℃澘銆佸巻骞存湡鏈湡棰樸€佺畝鍘嗘ā鏉裤€佸浗瀹跺瀛﹂噾鍚嶉缈诲€嶄互鍙婃柊澧炵澹偣绛夌浉鍏充俊鎭紝浣嗚繖浜涗俊鎭笌鏀惧亣閫氱煡鍏宠仈涓嶅ぇ锛屽彲浠ョ湅浣滄槸鍏紬鍙风殑鍏朵粬鎺ㄩ€佸唴瀹广€傛€讳綋鑰岃█锛岃繖鏄竴绡囧叧浜庡箍涓滈噾铻嶅闄㈡斁鍋囧畨鎺掔殑閫氱煡锛屽悓鏃朵篃鍖呭惈浜嗗鏍″叾浠栨柟闈㈢殑鍔ㄦ€佷俊鎭€?,2),(103,NULL,'鎻愬墠鎵逛辅2025鍚嶆牎鐮斿鐢宠閫氶亾姝ｅ紡寮€鍚紒鍙敵璇峰瀛﹂噾锛?,'2025-03-17 11:32:31','https://mp.weixin.qq.com/s/vEQj75ek9sETTPcAar2rxQ','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','鏂囩珷涓昏浠嬬粛浜?025骞村悕鏍＄爺瀛︾敵璇烽€氶亾寮€鍚殑淇℃伅锛屽苟寮鸿皟鍙互鐢宠濂栧閲戙€傝椤圭洰闈㈠悜鍦ㄦ牎澶у鐢燂紝骞寸骇涓庝笓涓氫笉闄愩€傞€傚悎鏈夌暀瀛︽剰鍚戙€佹复鏈涘悕鏍¤儗鏅€佸笇鏈涙彁鍗囧鏈拰鑻辫鑳藉姏銆佹嫇灞曞浗闄呰閲庝互鍙婁赴瀵岃嚜韬粡鍘嗙殑瀛︾敓銆傛姤鍚嶇敵璇峰墠10鍚嶄笖楂樿€冭嫳璇揪鍒?20鍒嗕互涓婄殑瀛︾敓锛屽彲浠ョ敵璇?00鍏冪爺瀛﹀瀛﹂噾銆傞」鐩€夋嫈浼樼澶у鐢燂紝闇€杩涜绾夸笂闈㈣瘯銆傛枃绔犺繕浠嬬粛浜嗗搱浣涘ぇ瀛﹀拰鏂板姞鍧″浗绔嬪ぇ瀛︾殑鐮斿椤圭洰锛屽寘鎷搱浣涘ぇ瀛︹€滀汉宸ユ櫤鑳戒笌鍟嗕笟閲戣瀺鈥濅富棰樼爺瀛︼紝浠ュ強鏂板浗澶х爺瀛﹂」鐩粨鏉熷悗瀛﹀憳鍙幏寰楄瘉涔﹀拰鎺ㄨ崘淇＄殑鎯呭喌銆傛澶栵紝鏂囩珷杩樻彁鍙婁簡骞夸笢閲戣瀺瀛﹂櫌鏅烘収璇惧寤鸿銆丳PT妯℃澘銆佸巻骞存湡鏈湡棰樸€佺畝鍘嗘ā鏉裤€佸浗瀹跺瀛﹂噾鍚嶉缈诲€嶄互鍙婃柊澧炵澹偣绛変俊鎭€傛枃绔犳湯灏鹃檮鏈夌浉鍏抽摼鎺ュ拰鍏紬鍙蜂簩缁寸爜銆?,3),(104,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(105,'浠婃棩閲戦櫌','銆愬箍閲戜笓灞濸PT銆戯細濂界湅鐨凱PT鍙互璁ヽrush澶氱湅鎴戜袱鐪煎悧锛?,'2025-03-19 15:46:00','https://mp.weixin.qq.com/s/4EpUcMSIF-AFwnNC_cWx2A','鏃?,'鏃?,'涓嶉檺','澶т竴銆佸ぇ浜屻€佸ぇ涓夈€佸ぇ鍥涖€佷笓鍗囨湰','涓嶉檺','鍏朵粬','鏂囩珷涓昏浠嬬粛浜嗕负骞夸笢閲戣瀺瀛﹂櫌瀛︾敓鍑嗗鐨勪笓灞濸PT妯℃澘锛屾棬鍦ㄥ府鍔╁鐢熷揩閫熷埗浣滅編瑙傚疄鐢ㄧ殑PPT銆傛ā鏉垮寘鍚箍閲戜笓灞濸PT鈮?0濂楋紝閫氱敤PPT鈮?00濂楋紝椋庢牸浠ョ瓟杈╁拰鏋佺畝椋庢牸涓轰富锛屽悓鏃跺唴缃厤鎶爈ogo锛屾柟渚垮鐢熻嚜琛岀粍鍚堝埗浣溿€傛枃绔犺繕浠&A鐨勫舰寮忚В绛斾簡PPT妯℃澘鐨勬暟閲忋€侀鏍间互鍙婃槸鍚﹂渶瑕佽嚜琛岃皟鏁寸瓑闂锛屽己璋冭繖浜涙ā鏉夸富瑕侀潰鍚戜綆骞寸骇鍜孭PT鍒朵綔缁忛獙杈冨皯鐨勫悓瀛︼紝瀹炵敤鎬у己銆傛€昏€岃█涔嬶紝璇ユ枃绔犳槸涓哄箍閲戝鐢熸彁渚涘厤璐筆PT妯℃澘璧勬簮锛屽苟瑙ｇ瓟鐩稿叧鐤戦棶鐨勯€氱煡銆?,3),(106,NULL,'骞块噾澶у鐢熺殑鈥滄疆浜衡€濆繀淇锛?,'2025-03-18 14:30:00','https://mp.weixin.qq.com/s/Ss-FoendxH0H9TAG0cvxUw','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','鏂囩珷涓昏浠嬬粛浜嗗箍閲戝ぇ瀛︾敓鍦ㄥ箍宸炩€滃啺鐏袱閲嶅ぉ鈥濆拰鍥炲崡澶╁ぉ姘斾笅鐨勭敓娲诲洶鎵帮紝鐗瑰埆鏄櫨鏅掕。鏈嶇殑闂銆備负姝わ紝娲诲姩鎻愪緵灏忕背瀹胯垗鐑樺共鏈轰綔涓虹鍒╋紝鎶ュ悕鍗冲彲鑾峰緱锛屽悓鏃惰繕鏈夊ぉ鍫備紴浣滀负閫夋嫨銆傛澶栵紝閽堝椹剧収锛屾椿鍔ㄨ繕鎻愪緵浜嗗懆骞村簡瀛﹁溅闅愯棌绂忓埄锛岃韩浠借瘉灏惧彿涓?鐨勫悓瀛﹀彲鑾峰緱杩ゥ鍙ｇ孩涓€鏀€傚浜庡凡缁忔嬁鍒伴┚鐓х殑鍚屽锛屽彲浠ュ弬鍔犻┚鏍″吋鑱岋紝姣忓崟楂樿揪288鍏冿紝宸叉湁鍚屽閫氳繃鍏艰亴鑾峰緱1152鍏冦€傚吋鑱屾椿鍔ㄥ皢浜?鏈?0鏃ョ粨鏉燂紝鎰熷叴瓒ｇ殑鍚屽鍙互鑱旂郴甯堝鎶ュ悕銆傛€荤殑鏉ヨ锛岃繖鏄竴椤归拡瀵瑰箍閲戝ぇ瀛︾敓鐨勭鍒╂椿鍔紝鏃ㄥ湪瑙ｅ喅鐢熸椿涓殑瀹為檯闂锛屽苟鎻愪緵鍏艰亴鏈轰細銆?,3),(107,NULL,'鍦ㄥ箍閲戝綋淇濆畨鐨勪竴澶╂槸鎬庝箞鏍风殑浣撻獙锛?,'2025-03-17 15:31:00','https://mp.weixin.qq.com/s/KFZ-ojnWAmazREKylPePBA','鏃?,'鏃?,'涓嶉檺','涓嶉檺','涓嶉檺','鍏朵粬','\n杩欑瘒鏂囩珷浠嬬粛浜嗗湪骞夸笢閲戣瀺瀛﹂櫌褰撲繚瀹夌殑浣撻獙锛屾兜鐩栦簡鏍￠棬宀椼€佹暀瀛︽ゼ銆佸鑸嶆ゼ銆佸浘涔﹂鍜屽贰閫荤瓑涓嶅悓宀椾綅鐨勫伐浣滃唴瀹广€傛牎闂ㄥ矖闇€瑕佹煡楠岃溅杈嗐€佹牳瀵硅韩浠姐€佸鐞嗗鍗栵紱鏁欏妤间繚瀹夐渶瑕佷繚闅滄暀瀛︾幆澧冨畨鍏ㄣ€佸贰閫绘鏌ワ紱瀹胯垗妤间繚瀹夐渶瑕佸叧娉ㄥ鐢熷畨鍏ㄣ€佸鐞嗙悙浜嬶紱鍥句功棣嗕繚瀹夊垯渚ч噸浜庡畨鍏ㄦ鏌ュ拰绉╁簭缁存姢锛屼互鍙婇棴棣嗗伐浣滐紱宸￠€讳繚瀹夐渶瑕佸湪鏍″洯鍐呭贰鏌ワ紝鍙婃椂澶勭悊绐佸彂鎯呭喌銆傛枃绔犳暣浣撴弿杩颁簡淇濆畨宸ヤ綔鐨勬棩甯稿拰鑱岃矗锛屾棬鍦ㄨ璇昏€呬簡瑙ｄ繚瀹夊伐浣滅殑鏂规柟闈㈤潰銆傝繖鏄竴绡囦粙缁嶆€х殑鏂囩珷锛屾病鏈夋彁渚涗簩璇惧鍒嗘垨缁兼祴鍒嗙殑淇℃伅锛岄€傚悎鎵€鏈夋牎鍖哄拰骞寸骇鐨勫鐢熼槄璇伙紝鍐呭涓庢斁鍋囥€佸仠姘村仠鐢点€佹暀瀛︽ゼ灏侀棴銆佷綋娴嬨€佹湡鏈€冭瘯鍧囨棤鍏筹紝褰掔被涓哄叾浠栫被鍨嬨€傛枃绔犳渶鍚庤繕鎻愬埌浜嗗鏋滄湀钖?000鐨勫亣璁撅紝鏆楃ず浜嗕繚瀹夊伐浣滅殑钖祫姘村钩銆?,3),(108,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(109,'骞块噾瀛﹀伐','鎶ュ悕锝淍骞块噾瀛﹀瓙锛屽師浼︽暒閲戣瀺鍩庡競闀胯繄鍏嬪皵路姊呭唴閲屾暀鎺堟潵骞垮窞鏍″尯寮€璁插骇鍟︼紒','2025-03-18 22:31:34','https://mp.weixin.qq.com/s/cGFoetMU5IrLgskE5HDb3Q','鏃?,'鏃?,'骞垮窞/鏈儴鏍″尯','涓嶉檺','涓嶉檺','鍏朵粬','鏈娲诲姩鏄箍涓滈噾铻嶅闄㈤個璇峰師浼︽暒閲戣瀺鍩庡競闀胯繄鍏嬪皵路姊呭唴閲屾暀鎺堝湪骞垮窞鏍″尯涓惧姙鐨勫叧浜庘€滆繛鎺ュ姏涓庡煄甯傗€斺€旀瀯寤哄崜瓒婄鎶€閲戣瀺涓績鐨勬柟鐣モ€濈殑涓撻瀛︽湳鎶ュ憡浼氥€傛椿鍔ㄦ椂闂存槸3鏈?8鏃ワ紙鍛ㄤ簲锛変笅鍗?:30鍒?:30锛屽湴鐐瑰湪骞垮窞鏍″尯鍥句功棣嗘嫈钀冨巺銆傛姤鍚嶆椂闂存槸3鏈?9鏃ヤ笂鍗?鐐瑰埌鏅氫笂11:59銆傚弬鍔犳湰娆℃椿鍔ㄥ彲浠ワ細瀵硅瘽鍏ㄧ悆閲戣瀺娌荤悊璧勬繁瀹炶返鑰咃紝鎺屾彙鍥介檯鏉冨▉璇勪及鏂规硶璁猴紱閫忚鏀跨瓥鍒跺畾鑰呰瑙掍笅鐨勫煄甯傚彂灞曟垬鐣ワ紝鎷撳瀛︽湳鐮旂┒缁村害锛涗笌鏍＄骇棰嗗銆佸绫嶅鑰呭叡鑱氶珮绔鏈钩鍙帮紝绉疮浼樿川瀛︽湳璧勬簮銆?,3),(110,NULL,'25鏆戞湡 | 鑻卞浗鍓戞ˉ澶у缁忔祹瀛﹁瀛﹂」鐩?,'2025-03-17 21:29:33','https://mp.weixin.qq.com/s/nD0uvtH80Qvi8ct-e8_xRw','鏃?,'鏃?,'涓嶉檺','澶т竴','涓嶉檺','鍏朵粬','璇ユ枃绔犱粙缁嶄簡2025骞存殤鏈熻嫳鍥藉墤妗ュぇ瀛︾粡娴庡璁垮椤圭洰銆傞」鐩椂闂翠负2025骞?鏈?鏃ヨ嚦8鏈?5鏃ワ紝涓烘湡涓ゅ懆锛屾€昏垂鐢ㄧ害浜烘皯甯?.38涓囧厓銆傞」鐩唴瀹瑰寘鎷井瑙傜粡娴庡鍜屽畯瑙傜粡娴庡涓や釜妯″潡锛岀敱鍓戞ˉ澶у鏍奸】瀛﹂櫌杩涜瀛︽湳绠＄悊涓庤€冩牳锛屽畬鎴愬涔犲悗鍙幏寰楁垚缁╁崟鍜岄」鐩瘉涔︺€傜敵璇疯姹傚寘鎷紭绉€鐨勮嫳璇熀纭€锛屽鎵樼79鎴栭泤鎬?.0绛夛紝澶т竴瀛︾敓鍙帴鍙楅珮鑰?28浠ヤ笂銆傛姤鍚嶆埅姝㈡棩鏈熶负2025骞?鏈?鏃ャ€傝椤圭洰鏃ㄥ湪涓哄鐢熸彁渚涘湪鍓戞ˉ澶у瀛︿範缁忔祹瀛︾殑鏈轰細锛屽姞娣卞缁忔祹瀛︾悊璁哄拰瀹炶返鐨勭悊瑙ｃ€傝仈绯讳汉鍖鸿€佸笀锛岀數璇?3711554644銆?,3);
/*!40000 ALTER TABLE `fin4_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notices`
--

DROP TABLE IF EXISTS `notices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notices` (
  `notice_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `publish_time` datetime DEFAULT NULL,
  `content` text,
  `publisher` varchar(100) DEFAULT NULL,
  `campus` varchar(50) DEFAULT NULL,
  `grade_level` varchar(50) DEFAULT NULL,
  `college` varchar(100) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `notice_type` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`notice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notices`
--

LOCK TABLES `notices` WRITE;
/*!40000 ALTER TABLE `notices` DISABLE KEYS */;
INSERT INTO `notices` VALUES (1,'璁插骇棰勫憡 | 鎴戜滑娲绘臣鐨勭敓鍛?涓婚璁插骇','2025-03-19 08:08:00','鍏朵粬','骞夸笢閲戣瀺瀛﹂櫌鑲囧簡鏍″尯','鑲囧簡鏍″尯','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/Fnm0rwccEg6zbv1vH-8TMA','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(2,'搴旂煡搴斾細 | 骞夸笢閲戣瀺瀛﹂櫌鏈鏁欒偛鏁欏瀹℃牳璇勪及宸ヤ綔瀹ｄ紶鎵嬪唽(浜?','2025-03-18 13:56:22','鍏朵粬',NULL,'涓嶉檺','鏃?,'涓嶉檺','https://mp.weixin.qq.com/s/gIaCerCBC3tjHeQ_9tX0tg','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(3,'搴旂煡搴斾細 | 骞夸笢閲戣瀺瀛﹂櫌鏈鏁欒偛鏁欏瀹℃牳璇勪及宸ヤ綔瀹ｄ紶鎵嬪唽(浜?','2025-03-18 13:38:29','鍏朵粬',NULL,'涓嶉檺','鏃?,'涓嶉檺','https://mp.weixin.qq.com/s/YeND3maU3CFSgQGcyJTx8Q','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(4,'鈥滄湪妫夎姳鏆栤€? 鈥斺€斿箍涓滅渷2025灞婇珮鏍℃瘯涓氱敓澶у瀷缃戠粶鍏泭鎷涜仒娲诲姩','2025-03-17 17:41:44','鍏朵粬',NULL,'涓嶉檺','澶у洓','涓嶉檺','https://mp.weixin.qq.com/s/Xa7kJ9esLpxJ5Leydlmqlw','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(5,'绗笁鍗佷竷鏈熼噾鏇﹁鍧涒€斾富璁蹭汉寰侀泦','2025-03-18 20:07:06','鍏朵粬','骞块噾瀛︾敓浼?,'涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/OEMn1lLUN5S_LXk29xh03w','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(6,'鏍″厷濮斿壇涔﹁鍒樻槬闃宠荡铻嶅垱绌洪棿璋冪爺鎸囧','2025-03-13 17:59:47','鍏朵粬','骞夸笢閲戣瀺瀛﹂櫌鍒涙柊鍒涗笟涓績','涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/Wxm9EYq-nuj7qCzFSitdSw','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(7,'绗竷灞娾€滄悳鐭ユ澂鈥濆叏鍥借储缁忛珮鏍′俊鎭礌鍏诲ぇ璧涘箍涓滈噾铻嶅闄㈣禌鍖哄垵璧涜幏濂栧悕鍗?,'2025-03-14 10:27:08','鍏朵粬','骞夸笢閲戣瀺瀛﹂櫌鍥句功棣?,'涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/9L8EedX4VF1zPJtNTjaHxg','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(8,'鎯婅洶锝滄槬闆烽福濮嬶紝涓囩墿鐢熼暱','2025-03-05 10:03:11','鍏朵粬','蹇冭暣骞块噾','涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/quWuruzc4G38qq8vA5HqjA','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(9,'妞嶆爲鑺倈妞嶆鏄ョ豢锛屼负鏄ュぉ涓婅壊','2025-03-12 11:30:13','鍏朵粬','骞夸笢閲戣瀺瀛﹂櫌鏍＄ぞ鑱?,'涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/MduL_0JI4L4-y67uPQ7pBA','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(10,'杩庢帴鏂颁竴杞湰绉戞暀鑲叉暀瀛﹀鏍歌瘎浼?| 瀛︾敓搴旂煡搴斾細锛氬悕璇嶈В閲?,'2025-03-18 12:00:00','鍏朵粬','骞夸笢閲戣瀺瀛﹂櫌鍥介檯鏁欒偛瀛﹂櫌','涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/sQ1wQ_KgLUPrcVo9y7hEoA','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(11,'鍠滄姤锛氭垜闄㈠笀鐢熷湪绗?6灞婂叏鍥藉ぇ瀛︾敓骞垮憡鑹烘湳澶ц禌涓啀鍒涗匠缁?,'2025-03-14 20:00:00','鍏朵粬',NULL,'涓嶉檺','涓嶉檺','鍥介檯鏁欒偛瀛﹂櫌','https://mp.weixin.qq.com/s/G0unGl60NMXoVdJG673Hlw','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(12,'妞嶆爲鑺?| 鏄ョ敓涓囩墿锛岀涓嬪笇鏈?,'2025-03-12 12:06:27','鍏朵粬','骞块噾淇濋櫓瀛﹂櫌','涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/BHqhwiSumO2L2NPKDlZKFg','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(13,'蹇冨崗 | 缃戠粶浣跨敤瀵逛簬蹇冪悊鍋ュ悍鐨勫奖鍝?,'2025-03-18 13:18:58','鍏朵粬',NULL,'骞垮窞/鏈儴鏍″尯','澶т竴銆佸ぇ浜屻€佸ぇ涓夈€佸ぇ鍥?,'閲戣瀺涓庢姇璧勫闄?,'https://mp.weixin.qq.com/s/DERBaUW50nniaWuOSW4PHg','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(14,'鍒掗噸鐐癸紒瀹℃牳璇勪及蹇冧腑璁帮紝搴旂煡搴斾細璇锋敹钘忊啋','2025-03-13 23:51:30','鍏朵粬',NULL,'涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/ESkMl1clggmgBfeUVTG9Zw','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(15,'鍒涗笟鏁欒偛瀛﹂櫌閭€璇峰崲涓栦富鏁欐巿浣滃浗瀹惰棰樼敵鎶ヤ笓棰樻寚瀵?,'2025-03-07 10:34:16','鍏朵粬','骞块噾鍒涗笟鏁欒偛瀛﹂櫌','涓嶉檺','涓嶉檺','鍒涗笟鏁欒偛瀛﹂櫌','https://mp.weixin.qq.com/s/mJtyh7jIPtAfcTB2TDK78Q','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(16,'鈥滃ぇ鎴愭澂鈥濋€夋嫈浜戠寮€鍚紝鍔╁姏瀛﹀瓙绔為€愨€滄硶搴€濇ⅵ鎯?,'2025-03-17 12:51:35','鍏朵粬','骞块噾娉曞','涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/AQPWFGROpZbn2ApVkvnK-w','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(17,'浣犵殑澶ц剳锛屾瘮浣犳兂璞′腑鏇存搮闀縗"閫嗚\"','2025-03-17 20:04:40','鍏朵粬','骞块噾鍏叡绠＄悊瀛﹂櫌','涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/ggsKea_wXQvonRNwMKqzWA','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(18,'宸ュ晢绠＄悊瀛﹂櫌缁勭粐寮€灞曘€婃梾娓告姇铻嶈祫绠＄悊銆嬭绋嬪疄璺垫暀瀛︽椿鍔?,'2025-03-18 21:59:47','鍏朵粬','骞块噾宸ョ','骞垮窞/鏈儴鏍″尯','涓嶉檺','宸ュ晢绠＄悊瀛﹂櫌','https://mp.weixin.qq.com/s/LU_V3T6a1-MUlfE74ArDcg','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(19,'@骞块噾瀛﹀瓙锛屼复鏃跺洶闅捐ˉ鍔╂€庝箞鐢宠锛熺湅杩欓噷锛?,'2025-03-17 21:59:00','鍏朵粬',NULL,'涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/MBQCYM195xlaXVQdBzMyHg','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(20,'搴旂煡搴斾細 | 骞夸笢閲戣瀺瀛﹂櫌鏈鏁欒偛鏁欏瀹℃牳璇勪及宸ヤ綔瀹ｄ紶鎵嬪唽(涓€)','2025-03-18 22:03:54','鍏朵粬','骞块噾浼氳瀛﹂櫌','涓嶉檺','涓嶉檺','浼氳瀛﹂櫌','https://mp.weixin.qq.com/s/pM-p5fDR4kThDvz5rB5lIg','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(21,'鍏氫腑澶喅瀹氾紝鍦ㄥ叏鍏氬紑灞曟繁鍏ヨ疮褰讳腑澶叓椤硅瀹氱簿绁炲涔犳暀鑲?,'2025-03-19 10:00:00','鍏朵粬','骞块噾閲戞姇闄?,'涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/vDkWOLgGyT584QCXiYRN6g','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(22,'閫愭ⅵ鏄ュぉ閲?鍚屽績鍚戞湭鏉モ€斺€斿崄鍥涘眾鍏ㄥ浗浜哄ぇ涓夋浼氳闂箷渚ц','2025-03-18 10:00:00','鍏朵粬',NULL,'涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/Vhr9J_b5n10s1yBga4JeTA','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(23,'搴旂煡搴斾細 | 骞夸笢閲戣瀺瀛﹂櫌鏈鏁欒偛鏁欏瀹℃牳璇勪及宸ヤ綔瀹ｄ紶鎵嬪唽(涓€)','2025-03-18 09:49:14','鍏朵粬','骞块噾浜掕仈缃戝闄?,'涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/x0Aj3gBU3CQmxPaw7lfz0A','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(24,'甯堣€呭尃蹇? |  鍛ㄧ憺绾細浠ヤ弗璋ㄤ箣蹇冿紝鑲插垱鏂颁箣鑻?,'2025-03-15 22:00:00','鍏朵粬',NULL,'涓嶉檺','涓嶉檺','浜掕仈缃戦噾铻嶄笌淇℃伅宸ョ▼瀛﹂櫌','https://mp.weixin.qq.com/s/L7fBFuudBqioz531ZoYCxw','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(25,'骞夸笢閲戣瀺瀛﹂櫌2024-2025瀛﹀勾绗簩瀛︽湡绗洓鍛ㄦ牎鍥嫑鑱樺畨鎺掕〃','2025-03-17 20:57:53','鍏朵粬',NULL,'涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/0FAFNMgEvEz6Iicuv6eq5g','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(26,'澶栨枃瀛﹂櫌杩庢帴鏂颁竴杞湰绉戞暀鑲叉暀瀛﹀鏍歌瘎浼板簲鐭ュ簲浼氱煡璇嗛棶绛旂浜岃疆娲诲姩閫氱煡','2025-03-16 22:10:21','鍏朵粬','骞块噾澶栨枃','涓嶉檺','涓嶉檺','澶栧浗璇█涓庢枃鍖栧闄?,'https://mp.weixin.qq.com/s/p8Asvo0HNE1Sota1qFVIXA','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(27,'绛戠墷鍋ュ悍闃茬嚎锛屽叡闃叉牎鍥紶鏌撶梾|棰勯槻浼犳煋鐥呰鍔ㄨ鍒?,'2025-03-16 20:00:00','鍏朵粬','GDUF缁忔祹璐告槗瀛﹂櫌 ','娓呰繙鏍″尯','涓嶉檺','缁忔祹璐告槗瀛﹂櫌','https://mp.weixin.qq.com/s/q_1-6Aa7RwWYM-5q9pKGLg','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(28,'骞块噾姣曚笟鐢熷垎浜玽ol.28锛氭瘯涓氬悗涓嶄細澶碂绯曚篃涓嶄細澶『鍒╋紝瀹冩槸闅忕潃鎴戜滑骞撮緞澧為暱浼氱粡鍘嗙殑涓€涓樁娈?,'2025-03-17 13:19:51','鍏朵粬','閲戦櫌涓囦簨閫?,'涓嶉檺','鏃?,'涓嶉檺','https://mp.weixin.qq.com/s/ilPs3f6dJ_JCGK5I1egHPg','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(29,'骞块噾鈥滄渶绱汉鈥濅笓涓氭帓琛屾绔熸槸鈥︹€?,'2025-03-19 16:09:47','鍏朵粬','灏忛噾鐞冪煡閬?,'涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/POG3KAIiE869ZQ7scryXFw','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(30,'鏈€鏂版斁鍋囬€氱煡锛?澶╋紝涓嶈皟浼戯紒','2025-03-18 18:03:52','鏀惧亣',NULL,'涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/To0FWqjKENq2oxDt_YcflQ','閫氱煡','2025-04-16 05:30:49','2025-04-16 05:30:49'),(31,'鎻愬墠鎵逛辅2025鍚嶆牎鐮斿鐢宠閫氶亾姝ｅ紡寮€鍚紒鍙敵璇峰瀛﹂噾锛?,'2025-03-17 11:32:31','鍏朵粬',NULL,'涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/vEQj75ek9sETTPcAar2rxQ','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(32,'銆愬箍閲戜笓灞濸PT銆戯細濂界湅鐨凱PT鍙互璁ヽrush澶氱湅鎴戜袱鐪煎悧锛?,'2025-03-19 15:46:00','鍏朵粬','浠婃棩閲戦櫌','涓嶉檺','澶т竴銆佸ぇ浜屻€佸ぇ涓夈€佸ぇ鍥涖€佷笓鍗囨湰','涓嶉檺','https://mp.weixin.qq.com/s/4EpUcMSIF-AFwnNC_cWx2A','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(33,'骞块噾澶у鐢熺殑鈥滄疆浜衡€濆繀淇锛?,'2025-03-18 14:30:00','鍏朵粬',NULL,'涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/Ss-FoendxH0H9TAG0cvxUw','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(34,'鍦ㄥ箍閲戝綋淇濆畨鐨勪竴澶╂槸鎬庝箞鏍风殑浣撻獙锛?,'2025-03-17 15:31:00','鍏朵粬',NULL,'涓嶉檺','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/KFZ-ojnWAmazREKylPePBA','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(35,'鎶ュ悕锝淍骞块噾瀛﹀瓙锛屽師浼︽暒閲戣瀺鍩庡競闀胯繄鍏嬪皵路姊呭唴閲屾暀鎺堟潵骞垮窞鏍″尯寮€璁插骇鍟︼紒','2025-03-18 22:31:34','鍏朵粬','骞块噾瀛﹀伐','骞垮窞/鏈儴鏍″尯','涓嶉檺','涓嶉檺','https://mp.weixin.qq.com/s/cGFoetMU5IrLgskE5HDb3Q','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49'),(36,'25鏆戞湡 | 鑻卞浗鍓戞ˉ澶у缁忔祹瀛﹁瀛﹂」鐩?,'2025-03-17 21:29:33','鍏朵粬',NULL,'涓嶉檺','澶т竴','涓嶉檺','https://mp.weixin.qq.com/s/nD0uvtH80Qvi8ct-e8_xRw','鍏朵粬','2025-04-16 05:30:49','2025-04-16 05:30:49');
/*!40000 ALTER TABLE `notices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notification_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reminders`
--

DROP TABLE IF EXISTS `reminders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reminders` (
  `reminder_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `activity_id` int DEFAULT NULL,
  `remind_time` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image_url` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`reminder_id`),
  KEY `activity_id` (`activity_id`),
  KEY `reminders_ibfk_1` (`user_id`),
  CONSTRAINT `reminders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reminders_ibfk_2` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reminders`
--

LOCK TABLES `reminders` WRITE;
/*!40000 ALTER TABLE `reminders` DISABLE KEYS */;
/*!40000 ALTER TABLE `reminders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `searchhistory`
--

DROP TABLE IF EXISTS `searchhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `searchhistory` (
  `search_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `keyword` varchar(100) NOT NULL,
  `searched_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`search_id`),
  KEY `searchhistory_ibfk_1` (`user_id`),
  CONSTRAINT `searchhistory_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `searchhistory`
--

LOCK TABLES `searchhistory` WRITE;
/*!40000 ALTER TABLE `searchhistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `searchhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `secondclasssynthesispage`
--

DROP TABLE IF EXISTS `secondclasssynthesispage`;
/*!50001 DROP VIEW IF EXISTS `secondclasssynthesispage`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `secondclasssynthesispage` AS SELECT 
 1 AS `activity_id`,
 1 AS `image_url`,
 1 AS `title`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `token_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`token_id`),
  UNIQUE KEY `token` (`token`),
  UNIQUE KEY `tokens_token` (`token`),
  KEY `user_id` (`user_id`),
  KEY `expires_at` (`expires_at`),
  KEY `tokens_user_id` (`user_id`),
  KEY `tokens_expires_at` (`expires_at`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '鐢ㄦ埛鍞竴鏍囪瘑',
  `open_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '寰俊openId',
  `union_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '寰俊unionid',
  `nickname` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '鐢ㄦ埛鏄电О',
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '鐢ㄦ埛澶村儚URL',
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '鐢ㄦ埛閭',
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '鐢ㄦ埛鎵嬫満鍙?,
  `campus` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '鎵€鍦ㄦ牎鍖?,
  `grade` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '骞寸骇',
  `major` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '涓撲笟',
  `role` enum('user','student','teacher','moderator','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user' COMMENT '鐢ㄦ埛瑙掕壊',
  `status` enum('active','inactive','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending' COMMENT '鐢ㄦ埛鐘舵€?,
  `last_login_at` datetime DEFAULT NULL COMMENT '鏈€鍚庣櫥褰曟椂闂?,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '鍒涘缓鏃堕棿',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '鏇存柊鏃堕棿',
  PRIMARY KEY (`id`),
  UNIQUE KEY `openId` (`open_id`),
  UNIQUE KEY `users_open_id` (`open_id`),
  UNIQUE KEY `unionId` (`union_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `users_email` (`email`),
  UNIQUE KEY `users_phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='鐢ㄦ埛淇℃伅琛?;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (9,'oAEZr7QKFC_EJihWvIG6ov1vHXVM',NULL,'馃ザ馃ザ','http://tmp/fBn8W71t9I1z6b2d132b66bf4953b2ef1117e9c4580d.jpeg','user@example.com','13800138000','骞块噾','2022','璁＄畻鏈虹瀛︿笌鎶€鏈?,'user','active','2025-05-25 15:22:15','2025-04-23 13:26:55','2025-05-25 07:22:15'),(10,'oAEZr7Q4DHxsRw2JUSuLUlrnn7Q8',NULL,'娴嬭瘯鍙佛煇?,'http://tmp/c7RUqvXZLlmT4ea8bac7f4a303e44c9ef443395ae80b.jpeg',NULL,NULL,NULL,NULL,NULL,'user','active','2025-04-25 15:44:17','2025-04-25 07:44:17','2025-04-25 07:44:17'),(11,'oAEZr7W1FZRoxH8OyFZ7xhTLn2K4',NULL,'娴嬭瘯鍙佛煇?,'http://tmp/Inju7k9m2bJodeea49d2c6dcfb576007871ad7e4755a.jpeg',NULL,NULL,NULL,NULL,NULL,'user','active','2025-04-25 15:45:26','2025-04-25 07:45:26','2025-04-25 07:45:26');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'test1'
--

--
-- Dumping routines for database 'test1'
--

--
-- Final view structure for view `secondclasssynthesispage`
--

/*!50001 DROP VIEW IF EXISTS `secondclasssynthesispage`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = gbk */;
/*!50001 SET character_set_results     = gbk */;
/*!50001 SET collation_connection      = gbk_chinese_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`test_01`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `secondclasssynthesispage` AS select `activities`.`activity_id` AS `activity_id`,`activities`.`image_url` AS `image_url`,`activities`.`title` AS `title` from `activities` where (`activities`.`activity_type` = '二课综测') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-25 16:31:47
