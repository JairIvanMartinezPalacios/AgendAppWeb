-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 31-08-2025 a las 00:09:56
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agenda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agenda`
--

DROP TABLE IF EXISTS `agenda`;
CREATE TABLE IF NOT EXISTS `agenda` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `agenda`
--

INSERT INTO `agenda` (`id`, `name`, `email`, `phone`, `address`, `created_at`, `updated_at`) VALUES
(1, 'Juan Pérez', 'juan.perez@email.com', '+1 (555) 123-4567', 'Calle Principal 123, Ciudad', '2025-08-30 23:09:56', '2025-08-30 23:09:56'),
(2, 'María García', 'maria.garcia@email.com', '+1 (555) 987-6543', 'Avenida Central 456, Pueblo', '2025-08-30 23:09:56', '2025-08-30 23:09:56'),
(3, 'Carlos López', 'carlos.lopez@email.com', '+1 (555) 456-7890', 'Plaza Mayor 789, Villa', '2025-08-30 23:09:56', '2025-08-30 23:09:56'),
(4, 'Ana Martínez', 'ana.martinez@email.com', '+1 (555) 321-0987', 'Calle Secundaria 321, Barrio', '2025-08-30 23:09:56', '2025-08-30 23:09:56'),
(5, 'Luis Rodríguez', 'luis.rodriguez@email.com', '+1 (555) 654-3210', 'Boulevard Norte 654, Distrito', '2025-08-30 23:09:56', '2025-08-30 23:09:56'),
(7, 'Jair Ivan Martínez Palacios', 'contacto.jairivan@gmail.com', '+5 (227) 161-9023', 'Priv Independencia 49, La Piragua 68310, San Juan Bautista Tuxtepec, Oaxaca', '2025-08-30 23:52:23', '2025-08-30 23:52:23'),
(8, 'Ivan Martínez Lopez', 'ejemplo@gmail.com', '(123) 456-7890', 'Ciudad de México', '2025-08-30 23:56:33', '2025-08-30 23:56:33');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
