package com.sdb;

/**
 * Sale.java
 * Brooke Lampe
 */

public class Sale {

	private Integer saleId;
	private String parcelId;
	private String city;
	private Double price;
	private Integer year;
	private Integer month;
	private Integer day;
	private String dayOfWeek;
	private String date_string;
	private String type;
	
	public Sale(String parcelId, String city, Double price, Integer year, Integer month, Integer day, String dayOfWeek, String date_string, String type) {
		this.parcelId = parcelId;
		this.city = city;
		this.price = price;
		this.year = year;
		this.month = month;
		this.day = day;
		this.dayOfWeek = dayOfWeek;
		this.date_string = date_string;
		this.type = type;
	}
	
	public String getType() {
		return type;
	}
	
	public String getDateStrig() {
		return date_string;
	}

	public Integer getSaleId() {
		return saleId;
	}

	public String getParcelId() {
		return parcelId;
	}

	public String getCity() {
		return city;
	}

	public Double getPrice() {
		return price;
	}

	public Integer getYear() {
		return year;
	}

	public Integer getMonth() {
		return month;
	}

	public Integer getDay() {
		return day;
	}

	public String getDayOfWeek() {
		return dayOfWeek;
	}
}
