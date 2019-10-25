package com.sdb;

import java.sql.SQLException;

/**
 * Driver.java
 * Brooke Lampe
 */

public class Driver {

	public static void main(String[] args) throws SQLException {
		
		Flat.loadFlatFiles();
		Store.storeSalesData();
	}
}