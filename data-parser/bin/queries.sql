USE csce413;
SHOW TABLES;

DROP TABLE sales;

CREATE TABLE IF NOT EXISTS sales(
	saleId INT AUTO_INCREMENT PRIMARY KEY,
    parcelId VARCHAR(50) NOT NULL,
    city VARCHAR(20),
    price DOUBLE,
    sale_date DATE,
    dateYear INT,
    dateMonth INT,
    dateDay INT,
    dayOfWeek VARCHAR(20)
);

-- I believe there's a setting somewhere telling MySQL to return only the first 1000 matching rows
SELECT * FROM sales;

SELECT * FROM sales WHERE dateYear = 2013;
SELECT * FROM sales WHERE dateYear = 2018;

SELECT * FROM sales WHERE dateMonth = 1;
SELECT * FROM sales WHERE dateMonth = 12;

SELECT * FROM sales WHERE dateDay = 1;
SELECT * FROM sales WHERE dateDay = 31;

SELECT * FROM sales WHERE dayOfWeek = 'Sunday';
SELECT * FROM sales WHERE dayOfWeek = 'Friday';

SELECT * FROM sales WHERE city <> 'LINCOLN';

SELECT * FROM sales WHERE price > 100000;