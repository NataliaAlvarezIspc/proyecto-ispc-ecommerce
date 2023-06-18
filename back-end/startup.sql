-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: enbalde
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.22.10.2

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
-- Table structure for table `Articulo`
--

DROP TABLE IF EXISTS `Articulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Articulo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `costo` decimal(10,2) NOT NULL,
  `cantidad` int NOT NULL,
  `tipo_id` int NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Articulo_tipo_id_cea8c2e0_fk_TipoArticulo_id` (`tipo_id`),
  CONSTRAINT `Articulo_tipo_id_cea8c2e0_fk_TipoArticulo_id` FOREIGN KEY (`tipo_id`) REFERENCES `TipoArticulo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Articulo`
--

LOCK TABLES `Articulo` WRITE;
/*!40000 ALTER TABLE `Articulo` DISABLE KEYS */;
INSERT INTO `Articulo` VALUES (1,'Helado de Chocolate','Helado con chispas de chocolate',2300.00,1400.00,98,1,'images/helado-de-chocolate.jpg'),(2,'Helado de Frutilla','Helado de frutilla natural',1500.00,800.00,49,3,'images/helado-de-frutilla.jpg'),(3,'Palito de Vainilla','Palito de vainilla de crema',550.00,200.00,48,2,'images/palito-de-vainilla.jpg'),(4,'Helado de Fernet','Clásico helado de Fernet',1600.00,1000.00,99,1,'images/Fernet.jpg');
/*!40000 ALTER TABLE `Articulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Carrito`
--

DROP TABLE IF EXISTS `Carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Carrito` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime(6) NOT NULL,
  `cliente_id` bigint NOT NULL,
  `comprado` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Carrito_cliente_id_c3da1e20_fk_auth_user_id` (`cliente_id`),
  CONSTRAINT `Carrito_cliente_id_c3da1e20_fk_auth_user_id` FOREIGN KEY (`cliente_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Carrito`
--

LOCK TABLES `Carrito` WRITE;
/*!40000 ALTER TABLE `Carrito` DISABLE KEYS */;
INSERT INTO `Carrito` VALUES (1,'2023-06-18 03:24:51.989458',2,1),(2,'2023-06-18 03:25:23.450146',2,1),(3,'2023-06-18 03:25:43.408479',2,1),(4,'2023-06-18 03:26:01.502718',2,0);
/*!40000 ALTER TABLE `Carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Envio`
--

DROP TABLE IF EXISTS `Envio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Envio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Envio`
--

LOCK TABLES `Envio` WRITE;
/*!40000 ALTER TABLE `Envio` DISABLE KEYS */;
INSERT INTO `Envio` VALUES (1,'Retiro en tienda',0.00),(2,'Envío inmediato',550.00);
/*!40000 ALTER TABLE `Envio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Oferta`
--

DROP TABLE IF EXISTS `Oferta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Oferta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `descuento` decimal(4,2) NOT NULL,
  `fecha_vencimiento` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Oferta`
--

LOCK TABLES `Oferta` WRITE;
/*!40000 ALTER TABLE `Oferta` DISABLE KEYS */;
INSERT INTO `Oferta` VALUES (1,'Semana del chocolate',5.00,'2023-06-23 03:00:00.000000');
/*!40000 ALTER TABLE `Oferta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Oferta_articulos`
--

DROP TABLE IF EXISTS `Oferta_articulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Oferta_articulos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `oferta_id` int NOT NULL,
  `articulo_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Oferta_articulos_oferta_id_articulo_id_5f57ca13_uniq` (`oferta_id`,`articulo_id`),
  KEY `Oferta_articulos_articulo_id_a2f7ba6f_fk_Articulo_id` (`articulo_id`),
  CONSTRAINT `Oferta_articulos_articulo_id_a2f7ba6f_fk_Articulo_id` FOREIGN KEY (`articulo_id`) REFERENCES `Articulo` (`id`),
  CONSTRAINT `Oferta_articulos_oferta_id_85632fb0_fk_Oferta_id` FOREIGN KEY (`oferta_id`) REFERENCES `Oferta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Oferta_articulos`
--

LOCK TABLES `Oferta_articulos` WRITE;
/*!40000 ALTER TABLE `Oferta_articulos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Oferta_articulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Seleccion`
--

DROP TABLE IF EXISTS `Seleccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Seleccion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cantidad` int unsigned NOT NULL,
  `articulo_id` int NOT NULL,
  `carrito_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Seleccion_articulo_id_94f82958_fk_Articulo_id` (`articulo_id`),
  KEY `Seleccion_carrito_id_219f6ab2_fk_Carrito_id` (`carrito_id`),
  CONSTRAINT `Seleccion_articulo_id_94f82958_fk_Articulo_id` FOREIGN KEY (`articulo_id`) REFERENCES `Articulo` (`id`),
  CONSTRAINT `Seleccion_carrito_id_219f6ab2_fk_Carrito_id` FOREIGN KEY (`carrito_id`) REFERENCES `Carrito` (`id`),
  CONSTRAINT `Seleccion_chk_1` CHECK ((`cantidad` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Seleccion`
--

LOCK TABLES `Seleccion` WRITE;
/*!40000 ALTER TABLE `Seleccion` DISABLE KEYS */;
INSERT INTO `Seleccion` VALUES (1,1,4,1),(2,2,1,2),(3,1,2,3),(4,2,3,3);
/*!40000 ALTER TABLE `Seleccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TipoArticulo`
--

DROP TABLE IF EXISTS `TipoArticulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TipoArticulo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TipoArticulo`
--

LOCK TABLES `TipoArticulo` WRITE;
/*!40000 ALTER TABLE `TipoArticulo` DISABLE KEYS */;
INSERT INTO `TipoArticulo` VALUES (1,'Balde'),(2,'Palito'),(3,'Bombón');
/*!40000 ALTER TABLE `TipoArticulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Venta`
--

DROP TABLE IF EXISTS `Venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Venta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` int unsigned NOT NULL,
  `comprobante` int unsigned NOT NULL,
  `fecha` datetime(6) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `carrito_id` int NOT NULL,
  `envio_id` int NOT NULL,
  `pago` int NOT NULL,
  `transaccion` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Venta_carrito_id_ebd854a6_fk_Carrito_id` (`carrito_id`),
  KEY `Venta_envio_id_49428d76_fk_Envio_id` (`envio_id`),
  CONSTRAINT `Venta_carrito_id_ebd854a6_fk_Carrito_id` FOREIGN KEY (`carrito_id`) REFERENCES `Carrito` (`id`),
  CONSTRAINT `Venta_envio_id_49428d76_fk_Envio_id` FOREIGN KEY (`envio_id`) REFERENCES `Envio` (`id`),
  CONSTRAINT `Venta_comprobante_bdb7c2f5_check` CHECK ((`comprobante` >= 0)),
  CONSTRAINT `Venta_numero_82d69e98_check` CHECK ((`numero` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Venta`
--

LOCK TABLES `Venta` WRITE;
/*!40000 ALTER TABLE `Venta` DISABLE KEYS */;
INSERT INTO `Venta` VALUES (1,1,1,'2023-06-18 03:25:22.268575',1600.00,1,1,1,''),(2,1,2,'2023-06-18 03:25:42.324647',5150.00,2,2,2,''),(3,1,3,'2023-06-18 03:26:01.395680',2600.00,3,1,3,'117661555');
/*!40000 ALTER TABLE `Venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add blacklisted token',6,'add_blacklistedtoken'),(22,'Can change blacklisted token',6,'change_blacklistedtoken'),(23,'Can delete blacklisted token',6,'delete_blacklistedtoken'),(24,'Can view blacklisted token',6,'view_blacklistedtoken'),(25,'Can add outstanding token',7,'add_outstandingtoken'),(26,'Can change outstanding token',7,'change_outstandingtoken'),(27,'Can delete outstanding token',7,'delete_outstandingtoken'),(28,'Can view outstanding token',7,'view_outstandingtoken'),(29,'Can add Password Reset Token',8,'add_resetpasswordtoken'),(30,'Can change Password Reset Token',8,'change_resetpasswordtoken'),(31,'Can delete Password Reset Token',8,'delete_resetpasswordtoken'),(32,'Can view Password Reset Token',8,'view_resetpasswordtoken'),(33,'Can add Listado de usuarios',9,'add_usuario'),(34,'Can change Listado de usuarios',9,'change_usuario'),(35,'Can delete Listado de usuarios',9,'delete_usuario'),(36,'Can view Listado de usuarios',9,'view_usuario'),(37,'Can add Articulos del negocio',10,'add_articulo'),(38,'Can change Articulos del negocio',10,'change_articulo'),(39,'Can delete Articulos del negocio',10,'delete_articulo'),(40,'Can view Articulos del negocio',10,'view_articulo'),(41,'Can add Carrito de compra',11,'add_carrito'),(42,'Can change Carrito de compra',11,'change_carrito'),(43,'Can delete Carrito de compra',11,'delete_carrito'),(44,'Can view Carrito de compra',11,'view_carrito'),(45,'Can add Tipos de envios disponibles',12,'add_envio'),(46,'Can change Tipos de envios disponibles',12,'change_envio'),(47,'Can delete Tipos de envios disponibles',12,'delete_envio'),(48,'Can view Tipos de envios disponibles',12,'view_envio'),(49,'Can add Ofertas de articulos',13,'add_oferta'),(50,'Can change Ofertas de articulos',13,'change_oferta'),(51,'Can delete Ofertas de articulos',13,'delete_oferta'),(52,'Can view Ofertas de articulos',13,'view_oferta'),(53,'Can add Tipos de articulos disponibles',14,'add_tipoarticulo'),(54,'Can change Tipos de articulos disponibles',14,'change_tipoarticulo'),(55,'Can delete Tipos de articulos disponibles',14,'delete_tipoarticulo'),(56,'Can view Tipos de articulos disponibles',14,'view_tipoarticulo'),(57,'Can add Listado de Ventas',15,'add_venta'),(58,'Can change Listado de Ventas',15,'change_venta'),(59,'Can delete Listado de Ventas',15,'delete_venta'),(60,'Can view Listado de Ventas',15,'view_venta'),(61,'Can add Seleccion de articulos',16,'add_seleccion'),(62,'Can change Seleccion de articulos',16,'change_seleccion'),(63,'Can delete Seleccion de articulos',16,'delete_seleccion'),(64,'Can view Seleccion de articulos',16,'view_seleccion');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `tipo` int NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `observaciones` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$600000$ct7afqIqzAVTjViKM2wiT5$C3TSA85R5nPANFT+Ddj87hESY2HvjqWyzOltKt8Rugo=','2023-06-18 03:26:14.647533',1,'admin','Ricardo','Darín','admin@enbalde.local',1,1,'2023-06-18 03:10:45.995645',1,'Av. Rivadavia 123','44431256',''),(2,'pbkdf2_sha256$600000$GR2JwE15P9VpzNfmXiw2pz$DwiENJc9LIsxDi/zMLT13lzjmnP724UVhUPawXQs5eE=','2023-06-18 03:24:51.983637',0,'roberto','Roberto','Alfonso','roberto.carlos.alfonso@gmail.com',0,1,'2023-06-18 03:24:22.559503',2,'Av. Siempre Viva 2233','62038888','');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `usuario_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_usuario_id_group_id_2d4e26e8_uniq` (`usuario_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_usuario_id_1458dadc_fk_auth_user_id` FOREIGN KEY (`usuario_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `usuario_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissio_usuario_id_permission_id_a72d8789_uniq` (`usuario_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_usuario_id_453820ab_fk_auth_user_id` FOREIGN KEY (`usuario_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(8,'django_rest_passwordreset','resetpasswordtoken'),(10,'enbalde','articulo'),(11,'enbalde','carrito'),(12,'enbalde','envio'),(13,'enbalde','oferta'),(16,'enbalde','seleccion'),(14,'enbalde','tipoarticulo'),(9,'enbalde','usuario'),(15,'enbalde','venta'),(5,'sessions','session'),(6,'token_blacklist','blacklistedtoken'),(7,'token_blacklist','outstandingtoken');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2023-06-18 03:09:38.348236'),(2,'contenttypes','0002_remove_content_type_name','2023-06-18 03:09:38.435919'),(3,'auth','0001_initial','2023-06-18 03:09:38.732232'),(4,'auth','0002_alter_permission_name_max_length','2023-06-18 03:09:38.834177'),(5,'auth','0003_alter_user_email_max_length','2023-06-18 03:09:38.851943'),(6,'auth','0004_alter_user_username_opts','2023-06-18 03:09:38.870838'),(7,'auth','0005_alter_user_last_login_null','2023-06-18 03:09:38.891335'),(8,'auth','0006_require_contenttypes_0002','2023-06-18 03:09:38.895823'),(9,'auth','0007_alter_validators_add_error_messages','2023-06-18 03:09:38.904628'),(10,'auth','0008_alter_user_username_max_length','2023-06-18 03:09:38.911719'),(11,'auth','0009_alter_user_last_name_max_length','2023-06-18 03:09:38.918556'),(12,'auth','0010_alter_group_name_max_length','2023-06-18 03:09:38.934515'),(13,'auth','0011_update_proxy_permissions','2023-06-18 03:09:38.941390'),(14,'auth','0012_alter_user_first_name_max_length','2023-06-18 03:09:38.947983'),(15,'enbalde','0001_initial','2023-06-18 03:09:39.930132'),(16,'admin','0001_initial','2023-06-18 03:09:40.059721'),(17,'admin','0002_logentry_remove_auto_add','2023-06-18 03:09:40.067092'),(18,'admin','0003_logentry_add_action_flag_choices','2023-06-18 03:09:40.074735'),(19,'django_rest_passwordreset','0001_initial','2023-06-18 03:09:40.124758'),(20,'django_rest_passwordreset','0002_pk_migration','2023-06-18 03:09:40.226024'),(21,'django_rest_passwordreset','0003_allow_blank_and_null_fields','2023-06-18 03:09:40.299417'),(22,'enbalde','0002_alter_articulo_cantidad_alter_articulo_costo_and_more','2023-06-18 03:09:40.587848'),(23,'enbalde','0003_remove_articulo_imagen','2023-06-18 03:09:40.618208'),(24,'enbalde','0004_articulo_imagen','2023-06-18 03:09:40.647838'),(25,'enbalde','0005_alter_usuario_email_alter_usuario_first_name_and_more','2023-06-18 03:09:40.684948'),(26,'enbalde','0006_alter_venta_fecha','2023-06-18 03:09:40.728772'),(27,'enbalde','0007_carrito_comprado','2023-06-18 03:09:40.761775'),(28,'enbalde','0008_alter_carrito_fecha','2023-06-18 03:09:40.812605'),(29,'enbalde','0009_alter_oferta_fecha_vencimiento','2023-06-18 03:09:40.845225'),(30,'enbalde','0010_oferta_articulos','2023-06-18 03:09:40.978070'),(31,'enbalde','0011_rename_articulos_oferta_articulo','2023-06-18 03:09:41.025376'),(32,'enbalde','0012_rename_articulo_oferta_articulos','2023-06-18 03:09:41.074664'),(33,'enbalde','0013_delete_articulosenoferta','2023-06-18 03:09:41.109066'),(34,'enbalde','0014_venta_pago_venta_transaccion','2023-06-18 03:09:41.185612'),(35,'sessions','0001_initial','2023-06-18 03:09:41.217688'),(36,'token_blacklist','0001_initial','2023-06-18 03:09:41.359030'),(37,'token_blacklist','0002_outstandingtoken_jti_hex','2023-06-18 03:09:41.377187'),(38,'token_blacklist','0003_auto_20171017_2007','2023-06-18 03:09:41.420347'),(39,'token_blacklist','0004_auto_20171017_2013','2023-06-18 03:09:41.471815'),(40,'token_blacklist','0005_remove_outstandingtoken_jti','2023-06-18 03:09:41.504261'),(41,'token_blacklist','0006_auto_20171017_2113','2023-06-18 03:09:41.522476'),(42,'token_blacklist','0007_auto_20171017_2214','2023-06-18 03:09:41.641646'),(43,'token_blacklist','0008_migrate_to_bigautofield','2023-06-18 03:09:41.898124'),(44,'token_blacklist','0010_fix_migrate_to_bigautofield','2023-06-18 03:09:41.942704'),(45,'token_blacklist','0011_linearizes_history','2023-06-18 03:09:41.946939'),(46,'token_blacklist','0012_alter_outstandingtoken_user','2023-06-18 03:09:41.961853');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_rest_passwordreset_resetpasswordtoken`
--

DROP TABLE IF EXISTS `django_rest_passwordreset_resetpasswordtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_rest_passwordreset_resetpasswordtoken` (
  `created_at` datetime(6) NOT NULL,
  `key` varchar(64) NOT NULL,
  `ip_address` char(39) DEFAULT NULL,
  `user_agent` varchar(256) NOT NULL,
  `user_id` bigint NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_rest_passwordreset_resetpasswordtoken_key_f1b65873_uniq` (`key`),
  KEY `django_rest_password_user_id_e8015b11_fk_auth_user` (`user_id`),
  CONSTRAINT `django_rest_password_user_id_e8015b11_fk_auth_user` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_rest_passwordreset_resetpasswordtoken`
--

LOCK TABLES `django_rest_passwordreset_resetpasswordtoken` WRITE;
/*!40000 ALTER TABLE `django_rest_passwordreset_resetpasswordtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_rest_passwordreset_resetpasswordtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('04nct60xukvymmachkpxyndmh5lzikoz','.eJxVjDsOgzAQBe_iOrJYL_6QMj1nQGvvEpNERsJQRbl7QKJI2jcz760G2tY8bFWWYWJ1VaAuv1uk9JRyAH5Quc86zWVdpqgPRZ-06n5med1O9-8gU8173SRnTZAQrANrKDJ0bKhDwHFHMGJqAEnQM0sbuTEYLAm00YPz6I36fAHLTDcs:1qAj3O:NtdKGWdXcyblrzh5_dEV187PcFi_ExjopqWsgIhKg7E','2023-07-02 03:26:14.651017'),('18ayaqz1rlzlttww8hk75sbh81j7i4gf','.eJxVjDsOgzAQBe_iOrJYL_6QMj1nQGvvEpNERsJQRbl7QKJI2jcz760G2tY8bFWWYWJ1VaAuv1uk9JRyAH5Quc86zWVdpqgPRZ-06n5med1O9-8gU8173SRnTZAQrANrKDJ0bKhDwHFHMGJqAEnQM0sbuTEYLAm00YPz6I36fAHLTDcs:1qAiqG:OO7Ki-3QIPqJ4ZKqwgoeyyCn6cGlFI4HcnpPAzAJmp8','2023-07-02 03:12:40.796742'),('sq56varqsmwfhmu8n491pnfqkrb1qg1l','.eJxVjMsOwiAQRf-FtSFAebp07zeQYWCkaiAp7cr479qkC93ec859sQjbWuM2yhLnzM5MsdPvlgAfpe0g36HdOsfe1mVOfFf4QQe_9lyel8P9O6gw6rc22RNMlJ01wgYtAZMqQkphpqBABcqyUCLUQNKBRVLa-uTShBi8McDeH-7GOF8:1qAj23:uT7e3x1igCvS3FtmNkZJGHdcXv9DBBOjt2H2zMBnbqA','2023-07-02 03:24:51.994233');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_blacklist_blacklistedtoken`
--

DROP TABLE IF EXISTS `token_blacklist_blacklistedtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_blacklist_blacklistedtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `blacklisted_at` datetime(6) NOT NULL,
  `token_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_id` (`token_id`),
  CONSTRAINT `token_blacklist_blacklistedtoken_token_id_3cc7fe56_fk` FOREIGN KEY (`token_id`) REFERENCES `token_blacklist_outstandingtoken` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_blacklist_blacklistedtoken`
--

LOCK TABLES `token_blacklist_blacklistedtoken` WRITE;
/*!40000 ALTER TABLE `token_blacklist_blacklistedtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `token_blacklist_blacklistedtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_blacklist_outstandingtoken`
--

DROP TABLE IF EXISTS `token_blacklist_outstandingtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_blacklist_outstandingtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `jti` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq` (`jti`),
  KEY `token_blacklist_outs_user_id_83bc629a_fk_auth_user` (`user_id`),
  CONSTRAINT `token_blacklist_outs_user_id_83bc629a_fk_auth_user` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_blacklist_outstandingtoken`
--

LOCK TABLES `token_blacklist_outstandingtoken` WRITE;
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` DISABLE KEYS */;
INSERT INTO `token_blacklist_outstandingtoken` VALUES (1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4NzE0NDM2MCwiaWF0IjoxNjg3MDU3OTYwLCJqdGkiOiIwN2Y4OGQ2ZjU5ZWU0NTkyOTJlNzc2YTMxYmVhOWI4ZSIsInVzZXJfaWQiOjF9.0Zw3R5GW8b7RRYb59pU9ZhcAVq5K-Ef_JCYoYayBNYM','2023-06-18 03:12:40.778863','2023-06-19 03:12:40.000000',1,'07f88d6f59ee459292e776a31bea9b8e'),(2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4NzE0NTA5MSwiaWF0IjoxNjg3MDU4NjkxLCJqdGkiOiJkNTgzYjFmNDVkMzI0YzYwYmU2ZjJhYzcyNDU1MDE3OCIsInVzZXJfaWQiOjJ9.Xq4zMjTC-Qq9ZX2qcilGLcZLycDl6HBK1YB-lw9W00s','2023-06-18 03:24:51.973548','2023-06-19 03:24:51.000000',2,'d583b1f45d324c60be6f2ac724550178'),(3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4NzE0NTE3NCwiaWF0IjoxNjg3MDU4Nzc0LCJqdGkiOiI1ZjUxOTg2YjE0MmE0ZDJjYWY3MWEwOTFjYzA1MDcyZCIsInVzZXJfaWQiOjF9.rdFMcLdlat2ucrm32XhEoHX82o6jA9KGsiwvSERkhcE','2023-06-18 03:26:14.641239','2023-06-19 03:26:14.000000',1,'5f51986b142a4d2caf71a091cc05072d');
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-18  0:27:06
