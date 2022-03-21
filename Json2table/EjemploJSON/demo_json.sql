-- phpMyAdmin SQL Dump
-- version 3.5.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 26-09-2014 a las 16:49:52
-- Versión del servidor: 5.5.25a
-- Versión de PHP: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `demo_json`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE IF NOT EXISTS `clientes` (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `edad` int(20) NOT NULL,
  `genero` text NOT NULL,
  `email` text NOT NULL,
  `localidad` text NOT NULL,
  `telefono` int(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `edad`, `genero`, `email`, `localidad`, `telefono`) VALUES
(1, 'Jose', 25, 'masculino', 'josegonzales9871@gmail.com', 'Madrid', 912546524),
(2, 'Juan', 31, 'masculino', 'juanrodriguez65465@gmail.com', 'Barcelona', 934654654),
(3, 'Antonio', 43, 'masculino', 'antoni654654@gmail.com', 'Valencia', 214748366),
(4, 'Angelina', 35, 'femenino', 'angelina654456@gmail.com', 'New York', 247483647);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
