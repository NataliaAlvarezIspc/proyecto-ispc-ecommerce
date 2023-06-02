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

CREATE DATABASE `enbalde`;
USE `enbalde`;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Articulo`
--

LOCK TABLES `Articulo` WRITE;
/*!40000 ALTER TABLE `Articulo` DISABLE KEYS */;
INSERT INTO `Articulo` VALUES (1,'Helado de Chocolate','Helado de Chocolate con chispas de Chocolate',1100.00,700.00,33,1,'images/helado-de-chocolate.jpg'),(2,'Palito de Vainilla','Palito de vainilla con frutilla',400.00,100.00,100,3,'images/palito-de-vainilla.jpg'),(3,'Helado de frutilla','Un rico helado de frutilla',590.00,190.00,11,1,'images/helado-de-frutilla.jpg');
/*!40000 ALTER TABLE `Articulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ArticulosEnOferta`
--

DROP TABLE IF EXISTS `ArticulosEnOferta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ArticulosEnOferta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `articulo_id` int NOT NULL,
  `oferta_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ArticulosEnOferta_articulo_id_f20417d5_fk_Articulo_id` (`articulo_id`),
  KEY `ArticulosEnOferta_oferta_id_051c9dc0_fk_Oferta_id` (`oferta_id`),
  CONSTRAINT `ArticulosEnOferta_articulo_id_f20417d5_fk_Articulo_id` FOREIGN KEY (`articulo_id`) REFERENCES `Articulo` (`id`),
  CONSTRAINT `ArticulosEnOferta_oferta_id_051c9dc0_fk_Oferta_id` FOREIGN KEY (`oferta_id`) REFERENCES `Oferta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ArticulosEnOferta`
--

LOCK TABLES `ArticulosEnOferta` WRITE;
/*!40000 ALTER TABLE `ArticulosEnOferta` DISABLE KEYS */;
/*!40000 ALTER TABLE `ArticulosEnOferta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Carrito`
--

DROP TABLE IF EXISTS `Carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Carrito` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `cliente_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Carrito_cliente_id_c3da1e20_fk_auth_user_id` (`cliente_id`),
  CONSTRAINT `Carrito_cliente_id_c3da1e20_fk_auth_user_id` FOREIGN KEY (`cliente_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Carrito`
--

LOCK TABLES `Carrito` WRITE;
/*!40000 ALTER TABLE `Carrito` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Envio`
--

LOCK TABLES `Envio` WRITE;
/*!40000 ALTER TABLE `Envio` DISABLE KEYS */;
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
  `fecha_vencimiento` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Oferta`
--

LOCK TABLES `Oferta` WRITE;
/*!40000 ALTER TABLE `Oferta` DISABLE KEYS */;
/*!40000 ALTER TABLE `Oferta` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Seleccion`
--

LOCK TABLES `Seleccion` WRITE;
/*!40000 ALTER TABLE `Seleccion` DISABLE KEYS */;
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
INSERT INTO `TipoArticulo` VALUES (1,'Balde'),(3,'Palito');
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
  `fecha` date NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `carrito_id` int NOT NULL,
  `envio_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Venta_carrito_id_ebd854a6_fk_Carrito_id` (`carrito_id`),
  KEY `Venta_envio_id_49428d76_fk_Envio_id` (`envio_id`),
  CONSTRAINT `Venta_carrito_id_ebd854a6_fk_Carrito_id` FOREIGN KEY (`carrito_id`) REFERENCES `Carrito` (`id`),
  CONSTRAINT `Venta_envio_id_49428d76_fk_Envio_id` FOREIGN KEY (`envio_id`) REFERENCES `Envio` (`id`),
  CONSTRAINT `Venta_comprobante_bdb7c2f5_check` CHECK ((`comprobante` >= 0)),
  CONSTRAINT `Venta_numero_82d69e98_check` CHECK ((`numero` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Venta`
--

LOCK TABLES `Venta` WRITE;
/*!40000 ALTER TABLE `Venta` DISABLE KEYS */;
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
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add blacklisted token',6,'add_blacklistedtoken'),(22,'Can change blacklisted token',6,'change_blacklistedtoken'),(23,'Can delete blacklisted token',6,'delete_blacklistedtoken'),(24,'Can view blacklisted token',6,'view_blacklistedtoken'),(25,'Can add outstanding token',7,'add_outstandingtoken'),(26,'Can change outstanding token',7,'change_outstandingtoken'),(27,'Can delete outstanding token',7,'delete_outstandingtoken'),(28,'Can view outstanding token',7,'view_outstandingtoken'),(29,'Can add Listado de usuarios',8,'add_usuario'),(30,'Can change Listado de usuarios',8,'change_usuario'),(31,'Can delete Listado de usuarios',8,'delete_usuario'),(32,'Can view Listado de usuarios',8,'view_usuario'),(33,'Can add Articulos del negocio',9,'add_articulo'),(34,'Can change Articulos del negocio',9,'change_articulo'),(35,'Can delete Articulos del negocio',9,'delete_articulo'),(36,'Can view Articulos del negocio',9,'view_articulo'),(37,'Can add Carrito de compra',10,'add_carrito'),(38,'Can change Carrito de compra',10,'change_carrito'),(39,'Can delete Carrito de compra',10,'delete_carrito'),(40,'Can view Carrito de compra',10,'view_carrito'),(41,'Can add Tipos de envios disponibles',11,'add_envio'),(42,'Can change Tipos de envios disponibles',11,'change_envio'),(43,'Can delete Tipos de envios disponibles',11,'delete_envio'),(44,'Can view Tipos de envios disponibles',11,'view_envio'),(45,'Can add Ofertas de articulos',12,'add_oferta'),(46,'Can change Ofertas de articulos',12,'change_oferta'),(47,'Can delete Ofertas de articulos',12,'delete_oferta'),(48,'Can view Ofertas de articulos',12,'view_oferta'),(49,'Can add Tipos de articulos disponibles',13,'add_tipoarticulo'),(50,'Can change Tipos de articulos disponibles',13,'change_tipoarticulo'),(51,'Can delete Tipos de articulos disponibles',13,'delete_tipoarticulo'),(52,'Can view Tipos de articulos disponibles',13,'view_tipoarticulo'),(53,'Can add Listado de Ventas',14,'add_venta'),(54,'Can change Listado de Ventas',14,'change_venta'),(55,'Can delete Listado de Ventas',14,'delete_venta'),(56,'Can view Listado de Ventas',14,'view_venta'),(57,'Can add Seleccion de articulos',15,'add_seleccion'),(58,'Can change Seleccion de articulos',15,'change_seleccion'),(59,'Can delete Seleccion de articulos',15,'delete_seleccion'),(60,'Can view Seleccion de articulos',15,'view_seleccion'),(61,'Can add Articulos en Oferta',16,'add_articulosenoferta'),(62,'Can change Articulos en Oferta',16,'change_articulosenoferta'),(63,'Can delete Articulos en Oferta',16,'delete_articulosenoferta'),(64,'Can view Articulos en Oferta',16,'view_articulosenoferta');
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
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$600000$vrC8dDO5bSbwqd88fERJVG$Q7AfFtOIBb9NbLJ3eteh3W14zQxReXAaknWCb878ogQ=','2023-06-02 00:37:13.000000',1,'admin','Administrator','Administrator','admin@gmail.com',1,1,'2023-06-01 23:21:10.000000',1,'Av. Rivadavia 1','11113333',''),(2,'pbkdf2_sha256$600000$P4mUz6ewFfxipgVH10pVlP$+dtR9W7O3gA5B18l/Mi7N+/rzLuoZ/vxKrHnZ3qhazU=','2023-06-01 23:45:16.136720',0,'juanpe','Juan','Perez','juanperez@gmail.com',0,1,'2023-06-01 23:43:38.764841',2,'Av. Siempre Viva 2233','11112222','');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2023-06-02 00:52:04.135082','1','Helado de Chocolate',2,'[{\"changed\": {\"fields\": [\"Nombre\", \"Imagen\"]}}]',9,1),(2,'2023-06-02 00:52:14.674105','2','Palito de Vainilla',2,'[{\"changed\": {\"fields\": [\"Imagen\"]}}]',9,1),(3,'2023-06-02 00:53:30.587298','3','Helado de frutilla',1,'[{\"added\": {}}]',9,1),(4,'2023-06-02 00:54:32.051262','1','Administrator',2,'[{\"changed\": {\"fields\": [\"Nombre\", \"Apellido\", \"Direccion\", \"Telefono\"]}}]',8,1);
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
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(9,'enbalde','articulo'),(16,'enbalde','articulosenoferta'),(10,'enbalde','carrito'),(11,'enbalde','envio'),(12,'enbalde','oferta'),(15,'enbalde','seleccion'),(13,'enbalde','tipoarticulo'),(8,'enbalde','usuario'),(14,'enbalde','venta'),(5,'sessions','session'),(6,'token_blacklist','blacklistedtoken'),(7,'token_blacklist','outstandingtoken');
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2023-06-01 23:19:21.512248'),(2,'contenttypes','0002_remove_content_type_name','2023-06-01 23:19:21.542414'),(3,'auth','0001_initial','2023-06-01 23:19:21.694999'),(4,'auth','0002_alter_permission_name_max_length','2023-06-01 23:19:21.735543'),(5,'auth','0003_alter_user_email_max_length','2023-06-01 23:19:21.744493'),(6,'auth','0004_alter_user_username_opts','2023-06-01 23:19:21.752323'),(7,'auth','0005_alter_user_last_login_null','2023-06-01 23:19:21.759803'),(8,'auth','0006_require_contenttypes_0002','2023-06-01 23:19:21.763368'),(9,'auth','0007_alter_validators_add_error_messages','2023-06-01 23:19:21.771152'),(10,'auth','0008_alter_user_username_max_length','2023-06-01 23:19:21.779032'),(11,'auth','0009_alter_user_last_name_max_length','2023-06-01 23:19:21.789268'),(12,'auth','0010_alter_group_name_max_length','2023-06-01 23:19:21.805990'),(13,'auth','0011_update_proxy_permissions','2023-06-01 23:19:21.814060'),(14,'auth','0012_alter_user_first_name_max_length','2023-06-01 23:19:21.822055'),(15,'enbalde','0001_initial','2023-06-01 23:19:22.519958'),(16,'admin','0001_initial','2023-06-01 23:19:22.628385'),(17,'admin','0002_logentry_remove_auto_add','2023-06-01 23:19:22.640097'),(18,'admin','0003_logentry_add_action_flag_choices','2023-06-01 23:19:22.651723'),(19,'enbalde','0002_alter_articulo_cantidad_alter_articulo_costo_and_more','2023-06-01 23:19:22.807735'),(20,'enbalde','0003_remove_articulo_imagen','2023-06-01 23:19:22.830637'),(21,'enbalde','0004_articulo_imagen','2023-06-01 23:19:22.850522'),(22,'enbalde','0005_alter_usuario_email_alter_usuario_first_name_and_more','2023-06-01 23:19:22.874085'),(23,'sessions','0001_initial','2023-06-01 23:19:22.898503'),(24,'token_blacklist','0001_initial','2023-06-01 23:19:23.011808'),(25,'token_blacklist','0002_outstandingtoken_jti_hex','2023-06-01 23:19:23.042980'),(26,'token_blacklist','0003_auto_20171017_2007','2023-06-01 23:19:23.068476'),(27,'token_blacklist','0004_auto_20171017_2013','2023-06-01 23:19:23.113749'),(28,'token_blacklist','0005_remove_outstandingtoken_jti','2023-06-01 23:19:23.145958'),(29,'token_blacklist','0006_auto_20171017_2113','2023-06-01 23:19:23.164475'),(30,'token_blacklist','0007_auto_20171017_2214','2023-06-01 23:19:23.270802'),(31,'token_blacklist','0008_migrate_to_bigautofield','2023-06-01 23:19:23.403541'),(32,'token_blacklist','0010_fix_migrate_to_bigautofield','2023-06-01 23:19:23.428347'),(33,'token_blacklist','0011_linearizes_history','2023-06-01 23:19:23.432767'),(34,'token_blacklist','0012_alter_outstandingtoken_user','2023-06-01 23:19:23.453664');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
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
INSERT INTO `django_session` VALUES ('2dd7b0fa04zdmure0fs8gt6tror6uwn4','.eJxVjMsOwiAQRf-FtSF0gKm4dN9vIDMM2KqBpI-V8d-1SRe6veec-1KRtnWM25LnOIm6qE6dfjem9Mh1B3Knems6tbrOE-td0Qdd9NAkP6-H-3cw0jJ-a2Nstp3rgXIQZCYfvGdEMCxQAkhPDgHtmQRLD865BNZ6LIzUFePV-wPMPjc1:1q4sn3:KjsCFf9Z1nUn7XBC85ednKnv0ZMOacSmL-qVV7k8Ue8','2023-06-16 00:37:13.346845'),('d418vl8t48pvtrdmiyax0eymg27bqa68','.eJxVjEEOwiAQAP_C2RC6tCx49N43kIWlUjWQlPZk_Lsh6UGvM5N5C0_Hnv3R0uZXFlcB4vLLAsVnKl3wg8q9yljLvq1B9kSetsm5cnrdzvZvkKnlvmVr0KAb3IRgdHCKggaAEWlBS4uj5EaVTGSbAkbWQ0Q7MVpQJgIH8fkCwZM3iw:1q4rym:wtBSE7eHhMi03IIteGO8kSl-pitzSdokdkvw4IInCtc','2023-06-15 23:45:16.139583'),('dlavco2hhkrnc7ldasm09699klhwrcmk','.eJxVjMsOwiAQRf-FtSF0gKm4dN9vIDMM2KqBpI-V8d-1SRe6veec-1KRtnWM25LnOIm6qE6dfjem9Mh1B3Knems6tbrOE-td0Qdd9NAkP6-H-3cw0jJ-a2Nstp3rgXIQZCYfvGdEMCxQAkhPDgHtmQRLD865BNZ6LIzUFePV-wPMPjc1:1q4ru8:-aJLa8NDOudGOWC8dlGpxIleFen42X8xeFXQYlDIotU','2023-06-15 23:40:28.967889'),('kmn7qu5ojsif0opv30cvsobwfie06kz6','.eJxVjMsOwiAQRf-FtSF0gKm4dN9vIDMM2KqBpI-V8d-1SRe6veec-1KRtnWM25LnOIm6qE6dfjem9Mh1B3Knems6tbrOE-td0Qdd9NAkP6-H-3cw0jJ-a2Nstp3rgXIQZCYfvGdEMCxQAkhPDgHtmQRLD865BNZ6LIzUFePV-wPMPjc1:1q4ryK:4zL1VXMbRMp0Gl4u6IrLK3cCCBrMgbmAFYWIW1IA9JA','2023-06-15 23:44:48.642579'),('lmzb6drac007rbtqi78adnez2l8x5crq','.eJxVjEEOwiAQAP_C2RC6tCx49N43kIWlUjWQlPZk_Lsh6UGvM5N5C0_Hnv3R0uZXFlcB4vLLAsVnKl3wg8q9yljLvq1B9kSetsm5cnrdzvZvkKnlvmVr0KAb3IRgdHCKggaAEWlBS4uj5EaVTGSbAkbWQ0Q7MVpQJgIH8fkCwZM3iw:1q4rxy:nv1jPHUhRmy6iPqSCOrACiTmI45m90HwAyUH7CUxKh8','2023-06-15 23:44:26.875374'),('pacvz15e2bm0vmprhqgfupyaoaove5du','.eJxVjMsOwiAQRf-FtSF0gKm4dN9vIDMM2KqBpI-V8d-1SRe6veec-1KRtnWM25LnOIm6qE6dfjem9Mh1B3Knems6tbrOE-td0Qdd9NAkP6-H-3cw0jJ-a2Nstp3rgXIQZCYfvGdEMCxQAkhPDgHtmQRLD865BNZ6LIzUFePV-wPMPjc1:1q4rvL:VT0Z-_YsS7EntCyW8CL-TOTu1e_NnR9_vQR_Sx10WJI','2023-06-15 23:41:43.847054'),('tbpcytebupv1r097fjh8h5gbwww83gtp','.eJxVjMsOwiAQRf-FtSF0gKm4dN9vIDMM2KqBpI-V8d-1SRe6veec-1KRtnWM25LnOIm6qE6dfjem9Mh1B3Knems6tbrOE-td0Qdd9NAkP6-H-3cw0jJ-a2Nstp3rgXIQZCYfvGdEMCxQAkhPDgHtmQRLD865BNZ6LIzUFePV-wPMPjc1:1q4rdt:yLpPh0_cBaoo6lHBXPAIeK_7CgQg5TQV9kj74_RZfFA','2023-06-15 23:23:41.622546'),('u7t60mu2ojwxw2bch6ps2mvjcpnfrxym','.eJxVjMsOwiAQRf-FtSF0gKm4dN9vIDMM2KqBpI-V8d-1SRe6veec-1KRtnWM25LnOIm6qE6dfjem9Mh1B3Knems6tbrOE-td0Qdd9NAkP6-H-3cw0jJ-a2Nstp3rgXIQZCYfvGdEMCxQAkhPDgHtmQRLD865BNZ6LIzUFePV-wPMPjc1:1q4rw7:GDomFhs_JO8rT7OyagN3KB-ZWhIWn_xjFYXzXRHOlEQ','2023-06-15 23:42:31.610411');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_blacklist_outstandingtoken`
--

LOCK TABLES `token_blacklist_outstandingtoken` WRITE;
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` DISABLE KEYS */;
INSERT INTO `token_blacklist_outstandingtoken` VALUES (1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4NTc0ODIyMSwiaWF0IjoxNjg1NjYxODIxLCJqdGkiOiJmOWRmMzNmMDBiNWI0NWM3YjFhYWUxMjU4NGMxOTQ2OSIsInVzZXJfaWQiOjF9.LHUT7LnftNEirbR3cnAY9Eso6zG59-QgHApvkX-yXKc','2023-06-01 23:23:41.609530','2023-06-02 23:23:41.000000',1,'f9df33f00b5b45c7b1aae12584c19469'),(2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4NTY2Mjg0MywiaWF0IjoxNjg1NjYyODI4LCJqdGkiOiI0NzRkZDI4Y2U5YWU0NTY1ODA5NzU3YWU3MGM5ZDc5ZiIsInVzZXJfaWQiOjF9.BZ1W9LwOiDfzttvoHn55TaiWjsUkgpvovtQVPfDu0hk','2023-06-01 23:40:28.954593','2023-06-01 23:40:43.000000',1,'474dd28ce9ae4565809757ae70c9d79f'),(3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4NTc0OTMwMywiaWF0IjoxNjg1NjYyOTAzLCJqdGkiOiI5ODU0Y2E3MGFiOTk0ZDljODM0MTA1MjFjZjU4MDlhNiIsInVzZXJfaWQiOjF9.48CsHowu1dsvlgvqi3ZwFpLzv5IaPK1CZXWn_heiYUs','2023-06-01 23:41:43.833194','2023-06-02 23:41:43.000000',1,'9854ca70ab994d9c83410521cf5809a6'),(4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4NTc0OTM1MSwiaWF0IjoxNjg1NjYyOTUxLCJqdGkiOiI3N2I5NGM0ZmEzOWU0OGU3YjI0YjU2Y2U4Y2QxNjZhZiIsInVzZXJfaWQiOjF9.aQE4KqmmGK0cO9dq-Kc5vSKGY2m8fYgs2CE_CKIVWx0','2023-06-01 23:42:31.601097','2023-06-02 23:42:31.000000',1,'77b94c4fa39e48e7b24b56ce8cd166af'),(5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4NTc0OTQ2NiwiaWF0IjoxNjg1NjYzMDY2LCJqdGkiOiJlM2RjYzM1MGYwNmU0NmI4OTM2OWE1YWQyZTA5MzBiYiIsInVzZXJfaWQiOjJ9.B3Fc_ovpJTeJE5dxJbKicG6ow6PPBNUorbsIQ5I42zE','2023-06-01 23:44:26.863562','2023-06-02 23:44:26.000000',2,'e3dcc350f06e46b89369a5ad2e0930bb'),(6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4NTc0OTQ4OCwiaWF0IjoxNjg1NjYzMDg4LCJqdGkiOiIxYWYzZmQ4NWFiNGI0MDgxOTEwYjkwZTJmYjZhMzNkOSIsInVzZXJfaWQiOjF9.S-dmC37pRqxtSZLcSqq_l2Xom5m23zpZxCHOWKqljvA','2023-06-01 23:44:48.632571','2023-06-02 23:44:48.000000',1,'1af3fd85ab4b4081910b90e2fb6a33d9'),(7,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4NTc0OTUxNiwiaWF0IjoxNjg1NjYzMTE2LCJqdGkiOiJlZDg5ZjhmYTE5NDI0NDI4YTJjOGZjNjBjYjFmMDM1OSIsInVzZXJfaWQiOjJ9.VTvuy61VjaRHgaBoDSc3nkdoojsvDzcUo9vi4MHq-6g','2023-06-01 23:45:16.130947','2023-06-02 23:45:16.000000',2,'ed89f8fa19424428a2c8fc60cb1f0359');
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

-- Dump completed on 2023-06-01 21:54:47
