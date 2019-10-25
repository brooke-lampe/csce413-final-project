package com.sdb;

/**
 * Data.java
 * Brooke Lampe
 */

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Connect {
	
	public static Connection Connect() {
		
		System.out.println("Preparing to connect to database...");

		//Connect to the database
		try {
			Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
		} catch (InstantiationException e1) {
			Log.logger.error("InstantiationException: ", e1);
			throw new RuntimeException();
		} catch (IllegalAccessException e2) {
			Log.logger.error("IllegalAccessException: ", e2);
			throw new RuntimeException();
		} catch (ClassNotFoundException e3) {
			Log.logger.error("ClassNotFoundException: ", e3);
			throw new RuntimeException();
		}
		
		String url = "jdbc:mysql://localhost:3306/csce413";
		String username = "root";
		String password = "123";
		Connection conn = null;
		
		System.out.println("Connecting to database...");
		try {
			conn = DriverManager.getConnection(url, username, password);
			System.out.println("Database connected!");
		} catch (SQLException sqle) {
			Log.logger.error("SQLException: ", sqle);
			throw new RuntimeException("Cannot connect the database!", sqle);
		}
		
		return conn;
	}
	
	public static void Disconnect(Connection conn, PreparedStatement ps, ResultSet rs) {
		try {
			if(rs != null && !rs.isClosed()) {
				rs.close();
			}
			if(ps != null && !ps.isClosed()) {
				ps.close();
			}
			if(conn != null && !conn.isClosed()) {
				conn.close();
			}
		} catch (SQLException sqle) {
			Log.logger.error("SQLException: ", sqle);
			throw new RuntimeException();
		}
	}
	
	public static void Disconnect(Connection conn, PreparedStatement ps) {
		try {
			if(ps != null && !ps.isClosed()) {
				ps.close();
			}
			if(conn != null && !conn.isClosed()) {
				conn.close();
			}
		} catch (SQLException sqle) {
			Log.logger.error("SQLException: ", sqle);
			throw new RuntimeException();
		}
	}
}