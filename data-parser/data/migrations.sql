USE csce413;
DROP TABLE IF EXISTS sale;
DROP TABLE IF EXISTS median_sale;
DROP TABLE IF EXISTS city;
DROP TABLE IF EXISTS property_type;


CREATE TABLE `property_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE `sale` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `city_id` INT NOT NULL,
  `property_type_id` INT NOT NULL,
  `price` DOUBLE NOT NULL,
  `date` DATE NOT NULL,
  `month` INT NOT NULL,
  `day` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `sale_price_index` (`price` ASC),
  INDEX `sale_city_id_idx` (`city_id` ASC),
  INDEX `sale_property_type_id_idx` (`property_type_id` ASC),
  CONSTRAINT `sale_city_id`
    FOREIGN KEY (`city_id`)
    REFERENCES `city` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `sale_property_type_id`
    FOREIGN KEY (`property_type_id`)
    REFERENCES `property_type` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
	
	
CREATE TABLE `median_sale` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `city_id` INT NOT NULL,
  `property_type_id` INT NOT NULL,
  `price` DOUBLE NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `median_date_index` (`date` ASC),
  INDEX `median_sale_city_id_idx` (`city_id` ASC),
  INDEX `median_sale_property_id_idx` (`property_type_id` ASC),
  CONSTRAINT `median_sale_city_id`
    FOREIGN KEY (`city_id`)
    REFERENCES `city` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `median_sale_property_id`
    FOREIGN KEY (`property_type_id`)
    REFERENCES `property_type` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
