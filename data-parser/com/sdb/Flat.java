package com.sdb;

/**
 * Flat.java
 * Brooke Lampe
 */

import java.util.ArrayList;

public class Flat {
	
	public static void loadFlatFiles() {
		
		System.out.println("Preparing to load data files...");
		
		ArrayList<String> sales2013 = new ArrayList<String>();
		sales2013 = GetFileLines.getFileLines("data/sales2013.csv");
		
		ArrayList<String> sales2014 = new ArrayList<String>();
		sales2014 = GetFileLines.getFileLines("data/sales2014.csv");
		
		ArrayList<String> sales2015 = new ArrayList<String>();
		sales2015 = GetFileLines.getFileLines("data/sales2015.csv");
		
		ArrayList<String> sales2016 = new ArrayList<String>();
		sales2016 = GetFileLines.getFileLines("data/sales2016.csv");
		
		ArrayList<String> sales2017 = new ArrayList<String>();
		sales2017 = GetFileLines.getFileLines("data/sales2017.csv");
		
		ArrayList<String> sales2018 = new ArrayList<String>();
		sales2018 = GetFileLines.getFileLines("data/sales2018.csv");
		
		System.out.println("Loading data files...");
		
		int s3 = Integer.parseInt(sales2013.get(0));
		int s4 = Integer.parseInt(sales2014.get(0));
		int s5 = Integer.parseInt(sales2015.get(0));
		int s6 = Integer.parseInt(sales2016.get(0));
		int s7 = Integer.parseInt(sales2017.get(0));
		int s8 = Integer.parseInt(sales2018.get(0));
		
		for(int i = 1; i <= s3; i++) {
			Data.getSalesList().add(Parse.parseSale(sales2013.get(i)));
		}
		
		for(int i = 1; i <= s4; i++) {
			Data.getSalesList().add(Parse.parseSale(sales2014.get(i)));
		}
		
		for(int i = 1; i <= s5; i++) {
			Data.getSalesList().add(Parse.parseSale(sales2015.get(i)));
		}
		
		for(int i = 1; i <= s6; i++) {
			Data.getSalesList().add(Parse.parseSale(sales2016.get(i)));
		}
		
		for(int i = 1; i <= s7; i++) {
			Data.getSalesList().add(Parse.parseSale(sales2017.get(i)));
		}
		
		for(int i = 1; i <= s8; i++) {
			Data.getSalesList().add(Parse.parseSale(sales2018.get(i)));
		}
		
		System.out.println("Data files loaded!");
	}
}
