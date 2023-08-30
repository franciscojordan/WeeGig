	USE `WeeGigDB` ;

	-- Creación de usuarios y empleador
	INSERT INTO LOGIN (email, password) VALUES
	  ('juan@gmail.com', '1234'),
      ('beatriz@gmail.com', '1234'),
      ('lourdes@gmail.com', '1234'),
	  ('victor@gmail.com', '1234'),
	  ('alejandro@gmail.com', '1234');

	INSERT INTO USERS (username, email, name, surname, doc_type, document, phone_number, birthdate, user_type, company_name, company_NIF, address, company_phone_number, website)
	VALUES
	  ('employee1', 'juan@gmail.com', 'Juan', 'Miguel', 1, '12345678A', '58345890', '2000-11-10', 'Employee', NULL, NULL, NULL, NULL, NULL),
      ('employee2', 'beatriz@gmail.com', 'Beatriz', 'Ruiz', 1, '12345678A', '67895750', '1998-02-02', 'Employee', NULL, NULL, NULL, NULL, NULL),
      ('employee3', 'lourdes@gmail.com', 'Lourdes', 'de la Fuente', 1, '12345678A', '1234567890', '1990-01-01', 'Employee', NULL, NULL, NULL, NULL, NULL),
	  ('employee4', 'victor@gmail.com', 'Victor', 'Aguilar', 1, '23456789B', '9876543210', '1995-05-15', 'Employee', NULL, NULL, NULL, NULL, NULL),
	  ('employer1', 'alejandro@gmail.com', 'Alejandro', 'Tomé', 2, '34567890C', '5555555555', '1985-08-20', 'Employer', 'My Company', '123456789', '123 Street', '555-555-5555', 'www.mycompany.com');

	-- Obtén el ID del employer1
	SELECT id_USER INTO @employerID FROM USERS WHERE username = 'employer1';

-- Creación de ofertas de trabajo por employer1
INSERT INTO JOB_OFFERS (title, status, description, payment_type, payment, location, schedule, id_employer)
VALUES
  ('Jardinería Residencial', 'close', 'Se busca jardinero para mantenimiento general de jardín en residencia particular.', 'Hora', 'Pago 1', 'Ubicación 1', NOW(), @employerID),
  ('Mudanza Pequeña', 'close', 'Necesitamos dos personas para ayudar con una mudanza. Pocos muebles, principalmente cajas.', 'Proyecto', 'Pago 2', 'Ubicación 2', NOW(), @employerID),
  ('Limpieza Post-construcción', 'close', 'Buscamos equipo para limpieza post-construcción de apartamento.', 'Hora', 'Pago 3', 'Ubicación 3', NOW(), @employerID),
  ('Pintura de Interiores', 'close', 'Necesitamos pintor con experiencia para pintar sala y comedor.', 'Hora', 'Pago 4', 'Ubicación 4', NOW(), @employerID),
  ('Reparación de PC', 'open', 'Buscando técnico para solucionar problemas de software en PC de escritorio.', 'Proyecto', 'Pago 5', 'Ubicación 5', NOW(), @employerID),
  ('Montaje de Muebles', 'open', 'Se busca persona para montar un conjunto de muebles de sala.', 'Proyecto', 'Pago 6', 'Ubicación 6', NOW(), @employerID),
  ('Clases de Yoga', 'open', 'Buscamos instructor(a) de yoga para clases particulares en domicilio.', 'Hora', 'Pago 7', 'Ubicación 7', NOW(), @employerID),
  ('Instalación de Estanterías', 'open', 'Se necesita carpintero o habilidoso para instalar estanterías en local comercial.', 'Proyecto', 'Pago 8', 'Ubicación 8', NOW(), @employerID),
  ('Lavado y Detallado de Auto', 'open', 'Buscamos profesional en detallado de autos. Se requiere lavado interno y externo.', 'Hora', 'Pago 9', 'Ubicación 9', NOW(), @employerID),
  ('Clases de Cocina', 'open', 'Se busca chef o cocinero(a) para impartir clases de cocina básica.', 'Hora', 'Pago 10', 'Ubicación 10', NOW(), @employerID),
  ('Instalación de Software', 'open', 'Técnico en informática requerido para instalación de suite de programas en oficina.', 'Proyecto', 'Pago 11', 'Ubicación 11', NOW(), @employerID),
  ('Mantenimiento de Piscina', 'open', 'Se busca profesional para limpieza y mantenimiento regular de piscina residencial.', 'Hora', 'Pago 12', 'Ubicación 12', NOW(), @employerID);


	-- Aplicación a ofertas de trabajo
	-- Obtén el ID de los empleados
	SELECT id_USER INTO @employeeID1 FROM USERS WHERE username = 'employee1';
	SELECT id_USER INTO @employeeID2 FROM USERS WHERE username = 'employee2';

	-- Insertar aplicaciones a ofertas
	INSERT INTO JOB_APPLICATION (id_USER, id_JOB_OFFERS, application_date, application_status)
	VALUES
	  (@employeeID1, 1, NOW(), 'accepted'),
      (@employeeID1, 2, NOW(), 'accepted'),
      (@employeeID1, 3, NOW(), 'accepted'),
      (@employeeID1, 4, NOW(), 'accepted'),
	  (@employeeID2, 1, NOW(), 'accepted'),
      (@employeeID2, 2, NOW(), 'accepted'),
      (@employeeID2, 3, NOW(), 'accepted'),
      (@employeeID2, 4, NOW(), 'accepted');


	
	-- Creación de revisiones
	-- Insertar revisiones
	INSERT INTO REVIEWS (review_content, rating, id_reviewer, id_reviewed, id_job, review_date)
	VALUES
	  ('Trabajé en una oferta con este empleador y fue una experiencia positiva.', 4, 3, 1, 1, '2023-08-02'),
      ('Todo bien, me gusto', 4, 3, 1, 2, '2023-08-02'),
      ('Excelente trabajador, 10/10', 4, 3, 1, 3, '2023-08-02'),
      ('Realmente me sorprendio, fue mejor de lo que pense', 4, 3, 1, 4, '2023-08-02'),
	  ('Colaboré con este empleado en un proyecto y cumplió con las expectativas.', 5, 3, 2, 1, '2023-02-01'),
      ('No me gusto mucho', 1, 3, 2, 2, '2023-08-02'),
      ('NO RECOMENDADO, muy inpuntual', 2, 3, 2, 3, '2023-08-02'),
      ('Nada humilde, -10', 1, 3, 2, 1, '2023-08-02'),
      ('Un poco raro, pero trabajo bien', 4, 3, 2, 1, '2023-08-02');
      
	-- Insertar revisiones a employer
	INSERT INTO REVIEWS (review_content, rating, id_reviewer, id_reviewed, id_job, review_date)
	VALUES
	  ('Buen empleador', 4, 1, 3, 1, '2023-08-02'),
      ('Excelente, pero hubo mala comunicacion en un inicio', 4, 1, 3, 2, '2023-08-02'),
      ('Normal', 2, 1, 3, 3, '2023-08-02'),
      ('Buen trato, buena paga', 5, 1, 3, 4, '2023-08-02');

