--mariadb

CREATE DATABASE `VentaBoletos` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

CREATE TABLE `Boletos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) DEFAULT NULL,
  `precio` decimal(10,0) DEFAULT NULL,
  `timestamps` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Ventas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idBoleto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `timestamps` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_Ventas_idBoleto` (`idBoleto`),
  CONSTRAINT `FK_Ventas_idBoleto` FOREIGN KEY (`idBoleto`) REFERENCES `Boletos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

DELIMITER //

CREATE PROCEDURE sp_historialVentas ()
 BEGIN
	select MAX(Boletos.descripcion) AS descripcion, MAX(Boletos.precio) AS precioUnitario, SUM(Ventas.cantidad) AS cantidad,
    SUM(Ventas.total) AS total
    from Ventas
    join Boletos ON Ventas.idBoleto = Boletos.id
    group by Boletos.id;
 END;
//

DELIMITER ;