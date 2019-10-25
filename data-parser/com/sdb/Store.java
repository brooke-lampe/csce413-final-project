package com.sdb;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

/**
 * Store.java
 * Brooke Lampe
 */

public class Store {
	
	private static int insert(Connection conn, String table, String value) throws SQLException {
		PreparedStatement stmt = conn.prepareStatement("INSERT INTO " + table + " (name) VALUES (?)", Statement.RETURN_GENERATED_KEYS);
		stmt.setString(1, value);
		stmt.executeUpdate();
		ResultSet rs = stmt.getGeneratedKeys();
		if (rs.next()){
			return rs.getInt(1);
        }
		stmt.close();
        rs.close();
		return 0;
	}
	public static void storeSalesData() throws SQLException {
		
		System.out.println("Preparing to store data...");
		Connection conn = Connect.Connect();
		PreparedStatement stmt = null;
		ArrayList<Sale> mySalesList = Data.getSalesList();
		System.out.println("Storing data...");
		
		
		HashMap<String, Integer> cities = new HashMap<String, Integer>();
		HashMap<String, Integer> types = new HashMap<String, Integer>();
		HashMap<String, HashMap<Integer, HashMap<Integer, List<Double>>>> aggregates = new HashMap<String, HashMap<Integer, HashMap<Integer, List<Double>>>>();
		for (Sale mySale : mySalesList) {
			String city = mySale.getCity();
			String type = mySale.getType();
			
			if (!cities.containsKey(city)) {
				int city_id = Store.insert(conn, "city", city);
				if (city_id > 0) {
					cities.put(city, city_id);
				} else {
					System.err.println("ERROR: City could not be iserted");
				}
			}
			
			if (!types.containsKey(type)) {
				int type_id = Store.insert(conn, "property_type", type);
				if (type_id > 0) {
					types.put(type, type_id);
				} else {
					System.err.println("ERROR: Type could not be iserted");
				}
			}
			
			String insertSaleSql = "INSERT INTO sale (city_id, property_type_id, price, `date`, `month`, `day`) VALUES (?, ?, ?, ?, ?, ?);";
			stmt = conn.prepareStatement(insertSaleSql);
			stmt.setInt(1, cities.get(city));
			stmt.setInt(2, types.get(type));
			stmt.setFloat(3, mySale.getPrice().floatValue());
			stmt.setString(4, mySale.getDateStrig());
			stmt.setInt(5, mySale.getMonth());
			stmt.setString(6, mySale.getDayOfWeek());
			stmt.execute();
			
			if (!aggregates.containsKey(mySale.getDateStrig())) {
				aggregates.put(mySale.getDateStrig(), new HashMap<Integer, HashMap<Integer, List<Double>>>());
			}
			if (!aggregates.get(mySale.getDateStrig()).containsKey(cities.get(mySale.getCity()))) {
				aggregates.get(mySale.getDateStrig()).put(cities.get(mySale.getCity()), new HashMap<Integer, List<Double>>());
			}
			if (!aggregates.get(mySale.getDateStrig()).get(cities.get(mySale.getCity())).containsKey(types.get(mySale.getType()))) {
				aggregates.get(mySale.getDateStrig()).get(cities.get(mySale.getCity())).put(types.get(mySale.getType()), new ArrayList<Double>());
			}
			
			aggregates.get(mySale.getDateStrig()).get(cities.get(mySale.getCity())).get(types.get(mySale.getType())).add(mySale.getPrice());
			
		}
		
		for (String date : aggregates.keySet()) {
			for (int city_id : aggregates.get(date).keySet()) {
				for (int type_id : aggregates.get(date).get(city_id).keySet()) {
					List<Double> sets = aggregates.get(date).get(city_id).get(type_id);
					Collections.sort(sets);
				    Double median = Math.floor(sets.size() / 2);
				    median = median > 0 && median % 2 == 0 ? (sets.get(median.intValue()) + sets.get(median.intValue() - 1)) /2 : sets.get(median.intValue());
					String insertSaleSql = "INSERT INTO median_sale (city_id, property_type_id, price, `date`) VALUES (?, ?, ?, ?);";
					stmt = conn.prepareStatement(insertSaleSql);
					stmt.setInt(1, city_id);
					stmt.setInt(2, type_id);
					stmt.setFloat(3, median.floatValue());
					stmt.setString(4, date);
					stmt.execute();
				}
			}
		}
		
		Connect.Disconnect(conn, stmt);
		
		System.out.println("Data stored!");
	}
}
