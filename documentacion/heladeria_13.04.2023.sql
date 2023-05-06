-- MySQL Script generated by MySQL Workbench
-- Thu Apr 13 15:59:31 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema enbalde
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema enbalde
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `enbalde` DEFAULT CHARACTER SET utf8 ;
USE `enbalde` ;

-- -----------------------------------------------------
-- Table `enbalde`.`TipoComprobantes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enbalde`.`TipoComprobantes` (
  `id_tipo_comprobantes` INT NOT NULL,
  `nombre` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id_tipo_comprobantes`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `enbalde`.`Comprobantes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enbalde`.`Comprobantes` (
  `id_comprobantes` CHAR(3) NOT NULL,
  `descripcion` VARCHAR(60) NOT NULL,
  `tipo` INT NOT NULL,
  `signo` CHAR(1) NOT NULL,
  PRIMARY KEY (`id_comprobantes`),
  INDEX `fk_tipo_compro_idx` (`tipo` ASC) VISIBLE,
  CONSTRAINT `fk_tipo_comprobante`
    FOREIGN KEY (`tipo`)
    REFERENCES `enbalde`.`TipoComprobantes` (`id_tipo_comprobantes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `enbalde`.`RegimenIvas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enbalde`.`RegimenIvas` (
  `id_regimen_iva` INT NOT NULL,
  `nombre` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id_regimen_iva`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `enbalde`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enbalde`.`Usuarios` (
  `id_usuarios` INT NOT NULL,
  `tipo_usuario` INT NOT NULL,
  `nombre` VARCHAR(40) NOT NULL,
  `apellido` VARCHAR(40) NOT NULL,
  `direccion` VARCHAR(40) NULL,
  `regIva` INT NOT NULL,
  `observacion` VARCHAR(200) NULL,
  `usuario` VARCHAR(40) NOT NULL,
  `pasword` VARCHAR(40) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuarios`),
  INDEX `fk_regiva_idx` (`regIva` ASC) VISIBLE,
  CONSTRAINT `fk_regiva`
    FOREIGN KEY (`regIva`)
    REFERENCES `enbalde`.`RegimenIvas` (`id_regimen_iva`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `enbalde`.`Envios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enbalde`.`Envios` (
  `id_envios` INT NOT NULL,
  `nombre` VARCHAR(40) NOT NULL,
  `monto` FLOAT NULL,
  PRIMARY KEY (`id_envios`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `enbalde`.`MovComprobantes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enbalde`.`MovComprobantes` (
  `id_mov_coprob` INT NOT NULL,
  `nrocomprobante` CHAR(14) NOT NULL,
  `comprobante` CHAR(3) NOT NULL,
  `fecha` DATE NOT NULL,
  `usuario` INT NOT NULL,
  `neto` DOUBLE NULL,
  `monto_iva` DOUBLE NULL,
  `alicuota` FLOAT NULL,
  `nogravado` DOUBLE NULL,
  `total` DOUBLE NULL,
  `envio` INT NOT NULL,
  PRIMARY KEY (`id_mov_coprob`),
  INDEX `fk_compro_idx` (`comprobante` ASC) VISIBLE,
  INDEX `fk_entidad_idx` (`usuario` ASC) VISIBLE,
  INDEX `fk_envio_idx` (`envio` ASC) VISIBLE,
  CONSTRAINT `fk_comprobante`
    FOREIGN KEY (`comprobante`)
    REFERENCES `enbalde`.`Comprobantes` (`id_comprobantes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_entidad`
    FOREIGN KEY (`usuario`)
    REFERENCES `enbalde`.`Usuarios` (`id_usuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_envio`
    FOREIGN KEY (`envio`)
    REFERENCES `enbalde`.`Envios` (`id_envios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `enbalde`.`TipoArticulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enbalde`.`TipoArticulos` (
  `id_articulos` INT NOT NULL,
  `nombre` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id_articulos`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `enbalde`.`Presentaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enbalde`.`Presentaciones` (
  `id_presentaciones` INT NOT NULL,
  `nombre` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id_presentaciones`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `enbalde`.`Articulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enbalde`.`Articulos` (
  `id_articulo` INT NOT NULL,
  `nombre` VARCHAR(200) NOT NULL,
  `descripcion` VARCHAR(200) NOT NULL,
  `tipo` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `precio` DOUBLE NOT NULL,
  `costo` DOUBLE NOT NULL,
  `uni_medida` INT NOT NULL,
  `presentacion` INT NOT NULL,
  `alicuota` FLOAT NULL,
  PRIMARY KEY (`id_articulos`),
  INDEX `fk_tipo_art_idx` (`tipo` ASC) VISIBLE,
  INDEX `fk_presen_idx` (`presentacion` ASC) VISIBLE,
  CONSTRAINT `fk_tipo_articulo`
    FOREIGN KEY (`tipo`)
    REFERENCES `enbalde`.`TipoArticulos` (`id_articulos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_presentacion`
    FOREIGN KEY (`presentacion`)
    REFERENCES `enbalde`.`Presentaciones` (`id_presentaciones`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `enbalde`.`DetMovComprobantes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enbalde`.`DetMovComprobantes` (
  `id_det_mov_comrpro` INT NOT NULL,
  `id_mov` INT NOT NULL,
  `articulo` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `pre_unitario` DOUBLE NULL,
  `alicuo` FLOAT NULL,
  PRIMARY KEY (`id_det_mov_comrpro`),
  INDEX `fk_articulo_idx` (`articulo` ASC) VISIBLE,
  INDEX `fk_movCompro_idx` (`id_mov` ASC) VISIBLE,
  CONSTRAINT `fk_articulo`
    FOREIGN KEY (`articulo`)
    REFERENCES `enbalde`.`Articulos` (`id_articulos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_movComprobante`
    FOREIGN KEY (`id_mov`)
    REFERENCES `enbalde`.`MovComprobantes` (`id_mov_coprob`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `enbalde`.`ofertas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enbalde`.`ofertas` (
  `id_ofertas` VARCHAR(20) NOT NULL,
  `precio` FLOAT NOT NULL,
  `fecha_vencimiento` DATE NOT NULL,
  PRIMARY KEY (`id_ofertas`),
  CONSTRAINT `fk_ofertas_codigo`
    FOREIGN KEY (`id_ofertas`)
    REFERENCES `enbalde`.`Articulos` (`id_articulos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
