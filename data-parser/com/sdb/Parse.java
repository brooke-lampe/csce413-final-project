package com.sdb;

/**
 * Parse.java
 * Brooke Lampe
 */

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class Parse {
	
	public static Sale parseSale(String line) {
		String lineArray[] = line.split("\"");
		String parcelArray[] = lineArray[0].split(",");
		String parcelId = parcelArray[0];
		
		//Obtain city from address
		String addressArray[] = lineArray[1].split(",");
		String city = "UNKNOWN";
		int cityIndex = -1;
		for (String c : addressArray) {
			if (c.contains(" NE")) {
				break;
			}
			cityIndex++;
		}
		if (cityIndex >= 0) {
			if (addressArray[cityIndex].length() > 1) {
				city = addressArray[cityIndex].trim();
			} 
		}
		
		
		String remainingArray[] = lineArray[2].split(",");
		
		//Obtain price
		Double price = Double.parseDouble(remainingArray[2]);
		
		//Obtain year, month, day from datetime 
		String datetime[] = remainingArray[3].split("T");
		String date[] = datetime[0].split("-");
		Integer year = Integer.parseInt(date[0]);
		Integer month = Integer.parseInt(date[1]);
		Integer day = Integer.parseInt(date[2]);
		
		LocalDate localDate = LocalDate.of(year, month, day);
		DayOfWeek dayOfWeekObject = localDate.getDayOfWeek();
		String date_string = DateTimeFormatter.ofPattern("yyy-MM-dd", Locale.ENGLISH).format(localDate);
		
		String dayOfWeek = "";
		
		switch (dayOfWeekObject) {
			case MONDAY:
				dayOfWeek = "Monday";
				break;
			case TUESDAY:
				dayOfWeek = "Tuesday";
				break;
			case WEDNESDAY:
				dayOfWeek = "Wednesday";
				break;
			case THURSDAY:
				dayOfWeek = "Thursday";
				break;
			case FRIDAY:
				dayOfWeek = "Friday";
				break;
			case SATURDAY:
				dayOfWeek = "Saturday";
				break;
			case SUNDAY:
				dayOfWeek = "Sunday";
		}
		
		// obtain property type
		String type = remainingArray[4];
		
		Sale sale = new Sale(parcelId, city, price, year, month, day, dayOfWeek, date_string, type);
		
		return sale;
	}
}
