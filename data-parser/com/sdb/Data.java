package com.sdb;

/**
 * Data.java
 * Brooke Lampe
 */

import java.util.ArrayList;

public class Data {
	
	private static ArrayList<Sale> salesList = new ArrayList<Sale>();
	
	public static ArrayList<Sale> getSalesList() {
		return salesList;
	}
}
