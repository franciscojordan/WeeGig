	USE `WeeGigDB` ;

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
	INSERT INTO JOB_OFFERS (title, status, description, payment_type, payment, location, schedule, category, id_employer)
	VALUES
	  ('Oferta 1', 'close', 'Descripción de la oferta 1', 'Tipo de pago 1', 'Pago 1', 'Ubicación 1', NOW(), 'Categoría 1', @employerID),
	  ('Oferta 2', 'close', 'Descripción de la oferta 2', 'Tipo de pago 2', 'Pago 2', 'Ubicación 2', NOW(), 'Categoría 2', @employerID),
	  ('Oferta 3', 'close', 'Descripción de la oferta 3', 'Tipo de pago 3', 'Pago 3', 'Ubicación 3', NOW(), 'Categoría 3', @employerID),
      ('Oferta 4', 'close', 'Descripción de la oferta 4', 'Tipo de pago 4', 'Pago 4', 'Ubicación 4', NOW(), 'Categoría 4', @employerID),
      ('Oferta 5', 'open', 'Descripción de la oferta 5', 'Tipo de pago 5', 'Pago 5', 'Ubicación 5', NOW(), 'Categoría 5', @employerID),
      ('Oferta 6', 'open', 'Descripción de la oferta 6', 'Tipo de pago 6', 'Pago 6', 'Ubicación 6', NOW(), 'Categoría 6', @employerID),
      ('Oferta 7', 'open', 'Descripción de la oferta 7', 'Tipo de pago 7', 'Pago 7', 'Ubicación 7', NOW(), 'Categoría 7', @employerID),
      ('Oferta 8', 'open', 'Descripción de la oferta 8', 'Tipo de pago 8', 'Pago 8', 'Ubicación 8', NOW(), 'Categoría 8', @employerID),
      ('Oferta 9', 'open', 'Descripción de la oferta 9', 'Tipo de pago 9', 'Pago 9', 'Ubicación 9', NOW(), 'Categoría 9', @employerID),
      ('Oferta 10', 'open', 'Descripción de la oferta 10', 'Tipo de pago 10', 'Pago 10', 'Ubicación 10', NOW(), 'Categoría 10', @employerID),
      ('Oferta 11', 'open', 'Descripción de la oferta 11', 'Tipo de pago 11', 'Pago 11', 'Ubicación 11', NOW(), 'Categoría 11', @employerID),
      ('Oferta 12', 'open', 'Descripción de la oferta 12', 'Tipo de pago 12', 'Pago 12', 'Ubicación 12', NOW(), 'Categoría 12', @employerID);


	-- Aplicación a ofertas de trabajo
	-- Obtén el ID de los empleados
	SELECT id_USER INTO @employeeID1 FROM USERS WHERE username = 'employee1';
	SELECT id_USER INTO @employeeID2 FROM USERS WHERE username = 'employee2';

	-- Insertar aplicaciones a ofertas
	INSERT INTO JOB_APPLICATION (id_USER, id_JOB_OFFERS, application_date, application_status)
	VALUES
	  (@employeeID1, 1, NOW(), 'applied'),
      (@employeeID1, 2, NOW(), 'applied'),
      (@employeeID1, 3, NOW(), 'applied'),
      (@employeeID1, 4, NOW(), 'applied'),
	  (@employeeID2, 1, NOW(), 'applied'),
      (@employeeID2, 2, NOW(), 'applied'),
      (@employeeID2, 3, NOW(), 'applied'),
      (@employeeID2, 4, NOW(), 'applied');

	-- Creación de revisiones
	-- Insertar revisiones
	INSERT INTO REVIEWS (review_content, rating, id_reviewer, id_reviewed, id_job, review_date)
	VALUES
	  ('Trabajé en una oferta con este empleador y fue una experiencia positiva.', 4, 3, 1, 1, '2023-08-02'),
      ('Todo bien, me gusto', 4, 3, 1, 1, '2023-08-02'),
      ('Excelente trabajador, 10/10', 4, 3, 1, 1, '2023-08-02'),
      ('Realmente me sorprendio, fue mejor de lo que pense', 4, 3, 1, 1, '2023-08-02'),
	  ('Colaboré con este empleado en un proyecto y cumplió con las expectativas.', 5, 3, 2, 1, '2023-02-01'),
      ('No me gusto mucho', 1, 3, 2, 1, '2023-08-02'),
      ('NO RECOMENDADO, muy inpuntual', 2, 3, 2, 1, '2023-08-02'),
      ('Nada humilde, -10', 1, 3, 2, 1, '2023-08-02'),
      ('Un poco raro, pero trabajo bien', 4, 3, 2, 1, '2023-08-02');

