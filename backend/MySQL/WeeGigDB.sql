	-- MySQL Script generated by MySQL Workbench
	-- Wed Aug  9 12:23:28 2023
	-- Model: New Model    Version: 1.0
	-- MySQL Workbench Forward Engineering

	SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
	SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
	SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

	-- -----------------------------------------------------
	-- Schema WeeGigDB
	-- -----------------------------------------------------

	-- -----------------------------------------------------
	-- Schema WeeGigDB
	-- -----------------------------------------------------
	CREATE SCHEMA IF NOT EXISTS `WeeGigDB` DEFAULT CHARACTER SET utf8 ;
	USE `WeeGigDB` ;

	-- -----------------------------------------------------
	-- Table `WeeGigDB`.`LOGIN`
	-- -----------------------------------------------------
	DROP TABLE IF EXISTS `WeeGigDB`.`LOGIN` ;

	CREATE TABLE IF NOT EXISTS `WeeGigDB`.`LOGIN` (
	  `email` VARCHAR(45) NOT NULL,
	  `password` VARCHAR(32) NOT NULL,
	  PRIMARY KEY (`email`))
	ENGINE = InnoDB;


	-- -----------------------------------------------------
	-- Table `WeeGigDB`.`USERS`
	-- -----------------------------------------------------
	DROP TABLE IF EXISTS `WeeGigDB`.`USERS` ;

	CREATE TABLE IF NOT EXISTS `WeeGigDB`.`USERS` (
	  `id_USER` INT NOT NULL AUTO_INCREMENT,
	  `username` VARCHAR(16) NOT NULL,
	  `email` VARCHAR(45) NOT NULL,
	  `name` VARCHAR(45) NOT NULL,
	  `surname` VARCHAR(45) NOT NULL,
	  `doc_type` INT NOT NULL,
	  `document` VARCHAR(9) NOT NULL,
	  `phoneNumber` VARCHAR(12) NOT NULL,
	  `birthdate` DATE NOT NULL,
	  `user_type` ENUM('Employee', 'Employer') NOT NULL,
	  `company_name` VARCHAR(45) NULL,
	  `company_NIF` VARCHAR(9) NULL,
	  `address` VARCHAR(45) NULL,
	  `company_phone_number` VARCHAR(12) NULL,
	  `website` VARCHAR(45) NULL,
	  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
	  PRIMARY KEY (`id_USER`),
	  UNIQUE INDEX `id_USER_UNIQUE` (`id_USER` ASC) VISIBLE,
	  INDEX `email_login` (`email` ASC) VISIBLE,
	  CONSTRAINT `email_login`
		FOREIGN KEY (`email`)
		REFERENCES `WeeGigDB`.`LOGIN` (`email`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION)
	ENGINE = InnoDB;


	-- -----------------------------------------------------
	-- Table `WeeGigDB`.`JOB_OFFERS`
	-- -----------------------------------------------------
	DROP TABLE IF EXISTS `WeeGigDB`.`JOB_OFFERS` ;

	CREATE TABLE IF NOT EXISTS `WeeGigDB`.`JOB_OFFERS` (
	  `id_JOB_OFFERS` INT NOT NULL AUTO_INCREMENT,
	  `title` VARCHAR(45) NULL,
	  `description` VARCHAR(45) NULL,
	  `payment_type` VARCHAR(45) NULL,
	  `payment` VARCHAR(45) NULL,
	  `location` VARCHAR(45) NULL,
	  `schedule` DATETIME NULL,
	  `category` VARCHAR(45) NULL,
	  `id_Employer` INT NULL,
	  `id_Employees` INT NULL,
	  PRIMARY KEY (`id_JOB_OFFERS`),
	  INDEX `id_Employees` (`id_Employees` ASC) VISIBLE,
	  INDEX `id_Employer` (`id_Employer` ASC) VISIBLE,
	  CONSTRAINT `offer_creator`
		FOREIGN KEY (`id_employer`)
		REFERENCES `WeeGigDB`.`USERS` (`idUSER`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION)
	ENGINE = InnoDB;


	-- -----------------------------------------------------
	-- Table `WeeGigDB`.`JOB_APPLICATION`
	-- -----------------------------------------------------
	DROP TABLE IF EXISTS `WeeGigDB`.`JOB_APPLICATION` ;

	CREATE TABLE IF NOT EXISTS `WeeGigDB`.`JOB_APPLICATION` (
	  `id_USER` INT NOT NULL,
	  `id_JOB_OFFERS` INT NOT NULL,
	  `application_date` VARCHAR(45) NULL,
	  `application_status` VARCHAR(45) NULL,
	  PRIMARY KEY (`id_USER`, `id_JOB_OFFERS`),
	  INDEX `employer_idx` (`id_JOB_OFFERS` ASC) VISIBLE,
	  CONSTRAINT `employer`
		FOREIGN KEY (`id_JOB_OFFERS`)
		REFERENCES `WeeGigDB`.`JOB_OFFERS` (`id_JOB_OFFERS`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	  CONSTRAINT `username`
		FOREIGN KEY (`id_USER`)
		REFERENCES `WeeGigDB`.`USERS` (`id_USER`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION)
	ENGINE = InnoDB;


	-- -----------------------------------------------------
	-- Table `WeeGigDB`.`REVIEWS`
	-- -----------------------------------------------------
	DROP TABLE IF EXISTS `WeeGigDB`.`REVIEWS` ;

	CREATE TABLE IF NOT EXISTS `WeeGigDB`.`REVIEWS` (
	  `id_REVIEWS` INT NOT NULL AUTO_INCREMENT,
	  `review_title` VARCHAR(45) NULL,
	  `review_content` VARCHAR(256) NULL,
	  `rating` INT NULL,
	  `id_Reviewer` INT NOT NULL,
	  `id_Reviewed` INT NOT NULL,
	  PRIMARY KEY (`id_REVIEWS`),
	  INDEX `id_Reviewer_idx` (`id_Reviewer` ASC) VISIBLE,
	  INDEX `id_Reviewed_idx` (`id_Reviewed` ASC) VISIBLE,
	  CONSTRAINT `id_Reviewer_1`
		FOREIGN KEY (`id_Reviewer`)
		REFERENCES `WeeGigDB`.`USERS` (`id_USER`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	  CONSTRAINT `id_Reviewed`
		FOREIGN KEY (`idReviewed`)
		REFERENCES `WeeGigDB`.`USERS` (`id_USER`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION)
	ENGINE = InnoDB;


	-- -----------------------------------------------------
	-- Table `WeeGigDB`.`REVIEW_DATE`
	-- -----------------------------------------------------
	DROP TABLE IF EXISTS `WeeGigDB`.`REVIEW_DATE` ;

	CREATE TABLE IF NOT EXISTS `WeeGigDB`.`REVIEW_DATE` (
	  `id_Review` INT NOT NULL,
	  `id_Reviewer` INT NOT NULL,
	  `id_Job` INT NOT NULL,
	  `review_date` DATE NULL,
	  `id_Reviewed` INT NOT NULL,
	  PRIMARY KEY (`id_Review`, `id_Reviewer`, `id_Job`),
	  INDEX `id_Reviewer_idx` (`id_Reviewer` ASC) VISIBLE,
	  INDEX `id_Job_idx` (`id_Job` ASC) VISIBLE,
	  CONSTRAINT `id_Review`
		FOREIGN KEY (`id_Review`)
		REFERENCES `WeeGigDB`.`REVIEWS` (`id_REVIEWS`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	  CONSTRAINT `id_Reviewer`
		FOREIGN KEY (`id_Reviewer`)
		REFERENCES `WeeGigDB`.`USERS` (`id_USER`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	  CONSTRAINT `id_Job`
		FOREIGN KEY (`id_Job`)
		REFERENCES `WeeGigDB`.`JOB_OFFERS` (`id_JOB_OFFERS`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION)
	ENGINE = InnoDB;


	SET SQL_MODE=@OLD_SQL_MODE;
	SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
	SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

	-- Creación de usuarios y empleador
	INSERT INTO LOGIN (email, password) VALUES
	  ('employee1@example.com', 'employee1password'),
	  ('employee2@example.com', 'employee2password'),
	  ('employer1@example.com', 'employer1password');

	INSERT INTO USERS (username, email, name, surname, doc_type, document, phone_number, birthdate, user_type, company_name, company_NIF, address, company_phone_number, website)
	VALUES
	  ('employee1', 'employee1@example.com', 'Employee One', 'Last Name', 1, '12345678A', '1234567890', '1990-01-01', 'Employee', NULL, NULL, NULL, NULL, NULL),
	  ('employee2', 'employee2@example.com', 'Employee Two', 'Last Name', 1, '23456789B', '9876543210', '1995-05-15', 'Employee', NULL, NULL, NULL, NULL, NULL),
	  ('employer1', 'employer1@example.com', 'Employer One', 'Company', 2, '34567890C', '5555555555', '1985-08-20', 'Employer', 'My Company', '123456789', '123 Street', '555-555-5555', 'www.mycompany.com');

	-- Obtén el ID del employer1
	SELECT id_USER INTO @employerID FROM USERS WHERE username = 'employer1';

	-- Creación de ofertas de trabajo por employer1
	INSERT INTO JOB_OFFERS (title, description, payment_type, payment, location, schedule, category, id_employer)
	VALUES
	  ('Oferta 1', 'Descripción de la oferta 1', 'Tipo de pago 1', 'Pago 1', 'Ubicación 1', NOW(), 'Categoría 1', @employerID),
	  ('Oferta 2', 'Descripción de la oferta 2', 'Tipo de pago 2', 'Pago 2', 'Ubicación 2', NOW(), 'Categoría 2', @employerID),
	  ('Oferta 3', 'Descripción de la oferta 3', 'Tipo de pago 3', 'Pago 3', 'Ubicación 3', NOW(), 'Categoría 3', @employerID);


	-- Aplicación a ofertas de trabajo
	-- Obtén el ID de los empleados
	SELECT id_USER INTO @employeeID1 FROM USERS WHERE username = 'employee1';
	SELECT id_USER INTO @employeeID2 FROM USERS WHERE username = 'employee2';

	-- Insertar aplicaciones a ofertas
	INSERT INTO JOB_APPLICATION (id_USER, id_JOB_OFFERS, application_date, application_status)
	VALUES
	  (@employeeID1, 1, NOW(), 'Applied'),
	  (@employeeID2, 1, NOW(), 'Applied');

	-- Creación de revisiones
	-- Insertar revisiones
	INSERT INTO REVIEWS (review_title, review_content, rating, id_reviewer, id_reviewed)
	VALUES
	  ('Buena Experiencia', 'Trabajé en una oferta con este empleador y fue una experiencia positiva.', 4, @employeeID1, @employerID),
	  ('Satisfactorio', 'Colaboré con este empleado en un proyecto y cumplió con las expectativas.', 5, @employerID, @employeeID1);
