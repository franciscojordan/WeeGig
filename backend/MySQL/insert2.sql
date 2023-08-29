-- Eliminar datos anteriores
-- DELETE FROM `WeeGigDB`.`JOB_APPLICATION`;
-- DELETE FROM `WeeGigDB`.`JOB_OFFERS`;
-- DELETE FROM `WeeGigDB`.`USERS`;
-- DELETE FROM `WeeGigDB`.`LOGIN`;


USE `WeeGigDB` ;
-- Creación de usuarios y empleadores
INSERT INTO `WeeGigDB`.`LOGIN` (email, password) VALUES
('isabel.garcia@example.com', 'isabelPass2023'),
('javier.hernandez@example.com', 'javierHPass2023'),
('tecnologias_ABC@example.com', 'abcCompanyPass2023');

INSERT INTO `WeeGigDB`.`USERS` (username, email, name, surname, doc_type, document, phone_number, birthdate, user_type)
VALUES
('IsabelG', 'isabel.garcia@example.com', 'Isabel', 'Garcia', 1, 'X1234567W', '+34 612345678', '1992-02-15', 'Employee'),
('JavierH', 'javier.hernandez@example.com', 'Javier', 'Hernandez', 1, 'Y2345678Z', '+34 698765432', '1988-11-05', 'Employee'),
('TechABC', 'tecnologias_ABC@example.com', 'Tecnologías', 'ABC S.L.', 2, 'A87654321', '+34 912345678', '2005-05-20', 'Employer', 'Tecnologías ABC', 'A87654321', 'Calle Industria 10, Madrid', '+34 912345678', 'www.tecnologiasabc.es');

-- Creación de ofertas de trabajo por Tecnologías ABC
SET @employerID = (SELECT id_USER FROM `WeeGigDB`.`USERS` WHERE email = 'tecnologias_ABC@example.com');

INSERT INTO `WeeGigDB`.`JOB_OFFERS` (title, status, description, payment_type, payment, location, schedule, category, id_employer)
VALUES
('Desarrollador Frontend', 'open', 'Buscamos un desarrollador con experiencia en React.', 'Salario', '30000€/anuales', 'Madrid', '2023-09-10 09:00:00', 'Tecnología', @employerID),
('Diseñador Gráfico', 'close', 'Necesitamos un diseñador gráfico con habilidades en Adobe Suite.', 'Por proyecto', '1500€', 'Remoto', '2023-08-05 10:00:00', 'Diseño', @employerID),
('Analista de Datos', 'open', 'Se busca analista para procesar grandes conjuntos de datos.', 'Salario', '32000€/anuales', 'Barcelona', '2023-09-12 09:30:00', 'Tecnología', @employerID),
('Marketing Digital', 'open', 'Especialista en campañas de marketing online.', 'Por proyecto', '2000€', 'Valencia', '2023-09-15 09:00:00', 'Marketing', @employerID);

-- Aplicaciones a ofertas de trabajo
SET @employeeID1 = (SELECT id_USER FROM `WeeGigDB`.`USERS` WHERE email = 'isabel.garcia@example.com');
SET @employeeID2 = (SELECT id_USER FROM `WeeGigDB`.`USERS` WHERE email = 'javier.hernandez@example.com');

INSERT INTO `WeeGigDB`.`JOB_APPLICATION` (id_USER, id_JOB_OFFERS, application_date, application_status)
VALUES
(@employeeID1, 1, '2023-08-15', 'Applied'),
(@employeeID2, 3, '2023-08-16', 'Applied');

-- Creación de revisiones
INSERT INTO `WeeGigDB`.`REVIEWS` (review_content, rating, id_Reviewer, id_Reviewed, id_Job, review_date)
VALUES
('Isabel hizo un trabajo excepcional en el desarrollo del proyecto.', 5, @employerID, @employeeID1, 1, '2023-08-22'),
('Javier demostró ser un analista muy competente, siempre atento a los detalles.', 4, @employerID, @employeeID2, 3, '2023-08-23');
