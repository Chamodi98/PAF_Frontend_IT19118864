package model;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.HashMap; 
import java.util.Map; 
import java.util.Scanner;

/**
 * Servlet implementation class ProjectsAPI
 */
@WebServlet("/ProjectsAPI")
public class ProjectsAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	Project projectObj = new Project();
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ProjectsAPI() {
       
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("Got inserted.");
		
		String output = projectObj.insertProject
				(request.getParameter("pmid"), 
				request.getParameter("fbid"), 
				request.getParameter("Project_Name"), 
				request.getParameter("Start_Date"), 
				request.getParameter("Deadline_Date"), 
				 request.getParameter("Project_Status"), 
				request.getParameter("Project_Fund_Amt"), 
				request.getParameter("Project_Sell_Amt")); 
				response.getWriter().write(output);	

	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("Got here");
		Map paras = getParasMap(request); 
		 String output = projectObj.updateProject(paras.get("hidProjectIDSave").toString(), 
		 paras.get("pmid").toString(), 
		 paras.get("fbid").toString(), 
		 paras.get("Project_Name").toString(), 
		 paras.get("Start_Date").toString(), 
		 paras.get("Deadline_Date").toString(), 
		paras.get("Project_Status").toString(), 
		paras.get("Project_Fund_Amt").toString(), 
		paras.get("Project_Sell_Amt").toString()); 
		response.getWriter().write(output); 
	}
	

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Map paras = getParasMap(request); 
		 String output = projectObj.deleteProject(paras.get("ProjectID").toString()); 
		response.getWriter().write(output);
	}
	
	
	// Convert request parameters to a Map
	private static Map getParasMap(HttpServletRequest request) 
	{ 
	 Map<String, String> map = new HashMap<String, String>(); 
	try
	 { 
	 Scanner scanner = new Scanner(request.getInputStream(), "UTF-8"); 
	 String queryString = scanner.hasNext() ? 
	 scanner.useDelimiter("\\A").next() : ""; 
	 scanner.close(); 
	 String[] params = queryString.split("&"); 
	 for (String param : params) 
	 { 
	String[] p = param.split("=");
	 map.put(p[0], p[1]); 
	 } 
	 } 
	catch (Exception e) 
	 { 
	 } 
	return map; 
	}

	

}
