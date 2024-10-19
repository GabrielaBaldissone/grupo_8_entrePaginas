-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 19-10-2024 a las 21:39:07
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bookit`
--
CREATE DATABASE IF NOT EXISTS `bookit` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `bookit`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `books`
--

DROP TABLE IF EXISTS `books`;
CREATE TABLE IF NOT EXISTS `books` (
  `id_book` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `id_category` int DEFAULT NULL,
  PRIMARY KEY (`id_book`),
  KEY `id_category` (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `books`
--

INSERT INTO `books` (`id_book`, `NAME`, `author`, `description`, `image`, `price`, `stock`, `id_category`) VALUES
(1, 'El poder del ahora', 'Eckhart Tolle', 'Una guía para la iluminación espiritual y vivir en el presente.', 'image1.jpg', '15.99', 50, 1),
(2, 'Cocina fácil', 'María Luisa Arias', 'Recetas rápidas y sencillas para el día a día.', 'image2.jpg', '12.50', 30, 2),
(3, 'Clean Code', 'Robert C. Martin', 'Una guía para escribir código limpio y eficiente.', 'image3.jpg', '35.00', 20, 3),
(4, 'Cien años de soledad', 'Gabriel García Márquez', 'Una de las novelas más importantes de la literatura latinoamericana.', 'image4.jpg', '20.00', 40, 4),
(5, 'Dune', 'Frank Herbert', 'Una épica de ciencia ficción en el planeta desértico de Arrakis.', 'image5.jpg', '22.50', 35, 5),
(6, 'El principito', 'Antoine de Saint-Exupéry', 'Un clásico cuento infantil lleno de simbolismo.', 'image6.jpg', '10.00', 60, 6),
(7, 'El código Da Vinci', 'Dan Brown', 'Una novela de misterio sobre conspiraciones religiosas.', 'image7.jpg', '18.50', 25, 7),
(8, 'IT (Eso)', 'Stephen King', 'Una historia de terror sobre un payaso demoníaco.', 'image8.jpg', '19.99', 15, 8),
(9, 'Inteligencia emocional', 'Daniel Goleman', 'Una obra que redefine la inteligencia y su impacto en el éxito.', 'image9.jpg', '16.99', 30, 1),
(10, 'Repostería creativa', 'Anna Olson', 'Deliciosas recetas para repostería de nivel profesional.', 'image10.jpg', '14.00', 25, 2),
(11, 'JavaScript: The Good Parts', 'Douglas Crockford', 'Los aspectos fundamentales y mejores prácticas de JavaScript.', 'image11.jpg', '30.00', 20, 3),
(12, 'Don Quijote de la Mancha', 'Miguel de Cervantes', 'La obra maestra de la literatura española.', 'image12.jpg', '25.00', 50, 4),
(13, 'Neuromante', 'William Gibson', 'Una novela que sentó las bases del cyberpunk.', 'image13.jpg', '21.50', 22, 5),
(14, 'Matilda', 'Roald Dahl', 'La historia de una niña con habilidades extraordinarias.', 'image14.jpg', '11.50', 40, 6),
(15, 'Sherlock Holmes: Estudio en escarlata', 'Arthur Conan Doyle', 'La primera novela del legendario detective.', 'image15.jpg', '17.50', 30, 7),
(16, 'El resplandor', 'Stephen King', 'La historia de una familia en un hotel embrujado.', 'image16.jpg', '19.99', 18, 8),
(17, 'Los 7 hábitos de la gente altamente efectiva', 'Stephen R. Covey', 'Un clásico de desarrollo personal.', 'image17.jpg', '17.00', 30, 1),
(18, 'Cocina para principiantes', 'Carlos Arguiñano', 'Recetas fáciles y deliciosas para todos los gustos.', 'image18.jpg', '13.00', 28, 2),
(19, 'Eloquent JavaScript', 'Marijn Haverbeke', 'Una introducción completa al lenguaje JavaScript.', 'image19.jpg', '32.00', 20, 3),
(20, 'La sombra del viento', 'Carlos Ruiz Zafón', 'Una novela de misterio en la Barcelona de posguerra.', 'image20.jpg', '21.00', 25, 4),
(21, 'Fundación', 'Isaac Asimov', 'Una serie de ciencia ficción que describe el futuro de la humanidad.', 'image21.jpg', '23.00', 22, 5),
(22, 'Cuentos de buenas noches para niñas rebeldes', 'Elena Favilli y Francesca Cavallo', 'Historias inspiradoras para niñas.', 'image22.jpg', '14.50', 35, 6),
(23, 'El misterio de la casa Aranda', 'Jerónimo Tristante', 'Una novela de misterio ambientada en Madrid.', 'image23.jpg', '16.50', 18, 7),
(24, 'Drácula', 'Bram Stoker', 'El clásico relato de terror sobre el conde Drácula.', 'image24.jpg', '17.99', 25, 8),
(25, 'Fluir (Flow)', 'Mihaly Csikszentmihalyi', 'Un estudio sobre la experiencia de la felicidad y la productividad.', 'image25.jpg', '18.00', 30, 1),
(26, 'MasterChef: Recetas para todos', 'Eva Arguiñano', 'Recetas de la famosa serie de cocina.', 'image26.jpg', '15.00', 25, 2),
(27, 'Aprendiendo Python', 'Mark Lutz', 'Una completa guía para aprender Python.', 'image27.jpg', '38.00', 15, 3),
(28, 'Crónica de una muerte anunciada', 'Gabriel García Márquez', 'Una breve novela sobre un asesinato anunciado.', 'image28.jpg', '20.00', 30, 4),
(29, 'El juego de Ender', 'Orson Scott Card', 'Una historia de ciencia ficción sobre un niño genio militar.', 'image29.jpg', '24.00', 20, 5),
(30, 'Las aventuras de Tom Sawyer', 'Mark Twain', 'Una clásica historia infantil llena de aventuras.', 'image30.jpg', '12.99', 40, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id_category` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id_category`, `category`) VALUES
(1, 'Psicología'),
(2, 'Cocina'),
(3, 'Programación'),
(4, 'Novela'),
(5, 'Ciencia ficción'),
(6, 'Infantil'),
(7, 'Misterio'),
(8, 'Terror');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id_order` int NOT NULL AUTO_INCREMENT,
  `id_user` int DEFAULT NULL,
  `available` tinyint DEFAULT NULL,
  PRIMARY KEY (`id_order`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id_order`, `id_user`, `available`) VALUES
(101, 1, 1),
(102, 2, 1),
(103, 3, 0),
(104, 4, 1),
(105, 1, 0),
(106, 5, 1),
(107, 3, 1),
(108, 6, 0),
(109, 2, 1),
(110, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_book`
--

DROP TABLE IF EXISTS `order_book`;
CREATE TABLE IF NOT EXISTS `order_book` (
  `id_order_book` int NOT NULL AUTO_INCREMENT,
  `id_order` int DEFAULT NULL,
  `id_book` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id_order_book`),
  KEY `id_order` (`id_order`),
  KEY `id_book` (`id_book`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `order_book`
--

INSERT INTO `order_book` (`id_order_book`, `id_order`, `id_book`, `quantity`, `price`, `date`) VALUES
(1, 101, 1, 2, '31.98', '2024-10-01 00:00:00'),
(2, 102, 3, 1, '35.00', '2024-10-02 00:00:00'),
(3, 103, 5, 3, '67.50', '2024-10-03 00:00:00'),
(4, 101, 7, 1, '18.50', '2024-10-01 00:00:00'),
(5, 104, 2, 4, '50.00', '2024-10-04 00:00:00'),
(6, 105, 6, 2, '20.00', '2024-10-05 00:00:00'),
(7, 106, 9, 1, '16.99', '2024-10-06 00:00:00'),
(8, 107, 4, 2, '40.00', '2024-10-07 00:00:00'),
(9, 108, 8, 3, '59.97', '2024-10-08 00:00:00'),
(10, 109, 10, 1, '14.00', '2024-10-09 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('admin','cliente') DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `first_name`, `last_name`, `email`, `phone`, `password`, `rol`) VALUES
(1, 'Juan', 'Pérez', 'juan.perez@example.com', '555-1234', 'hashed_password1', 'cliente'),
(2, 'Ana', 'García', 'ana.garcia@example.com', '555-5678', 'hashed_password2', 'cliente'),
(3, 'Pedro', 'Martínez', 'pedro.martinez@example.com', '555-9876', 'hashed_password3', 'cliente'),
(4, 'Laura', 'Fernández', 'laura.fernandez@example.com', '555-4321', 'hashed_password4', 'cliente'),
(5, 'Carlos', 'López', 'carlos.lopez@example.com', '555-8765', 'hashed_password5', 'cliente'),
(6, 'Marta', 'Gómez', 'marta.gomez@example.com', '555-3456', 'hashed_password6', 'cliente'),
(7, 'Sofía', 'Rodríguez', 'sofia.rodriguez@example.com', '555-6543', 'hashed_password7', 'cliente'),
(8, 'Luis', 'Ramírez', 'luis.ramirez@example.com', '555-7890', 'hashed_password8', 'cliente'),
(9, 'Jorge', 'Morales', 'jorge.morales@example.com', '555-1234', 'hashed_password10', 'cliente'),
(10, 'Gabriela', 'Sánchez', 'gabriela.sanchez@example.com', '555-4321', 'hashed_password9', 'cliente'),
(11, 'admin', 'admin', 'admin@example.com', '46527821', 'admin2024', 'admin');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`);

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Filtros para la tabla `order_book`
--
ALTER TABLE `order_book`
  ADD CONSTRAINT `order_book_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`),
  ADD CONSTRAINT `order_book_ibfk_2` FOREIGN KEY (`id_book`) REFERENCES `books` (`id_book`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
