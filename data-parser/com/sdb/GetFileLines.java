package com.sdb;
/**
 * GetFileLines.java
 * Brooke Lampe
 * 2017/01/30
 * This class retrieves lines from a file and stores them in an array
 */

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class GetFileLines {

	public static ArrayList<String> getFileLines(String fileName) {
		if(fileName == null) {
			return null;
		}
		
		File f = new File(fileName);

		Scanner s;
		
		try {
			s = new Scanner(f);
		} catch (FileNotFoundException e) {
			Log.logger.error("FileNotFoundException: ", e);
			throw new RuntimeException();
		}
		
		ArrayList<String> lines = new ArrayList<String>();
		
		while(s.hasNext()) {
			lines.add(s.nextLine().trim());
		}
		
		s.close();
		
		return lines;
	}
}
