$(document).ready(function()
{ 
if ($("#alertSuccess").text().trim() == "") 
 { 
 $("#alertSuccess").hide(); 
 } 
 $("#alertError").hide(); 
}); 
$(document).on("click", "#btnSave", function(event)
{ 
// Clear alerts---------------------
 $("#alertSuccess").text(""); 
 $("#alertSuccess").hide(); 
 $("#alertError").text(""); 
 $("#alertError").hide(); 
// Form validation-------------------
var status = validateItemForm(); 
if (status != true) 
 { 
 $("#alertError").text(status); 
 $("#alertError").show(); 
 return; 
 } 
// If valid------------------------
var type = ($("#hidProjectIDSave").val() == "") ? "POST" : "PUT"; 
 $.ajax( 
 { 
 url : "ProjectsAPI", 
 type : type, 
 data : $("#formProject").serialize(), 
 dataType : "text", 
 complete : function(response, status) 
 { 
 onProjectSaveComplete(response.responseText, status); 
 } 
 }); 
});

function onProjectSaveComplete(response, status)
{ 
if (status == "success") 
 { 
 var resultSet = JSON.parse(response); 
 if (resultSet.status.trim() == "success") 
 { 
 $("#alertSuccess").text("Successfully saved."); 
 $("#alertSuccess").show(); 
 $("#divItemsGrid").html(resultSet.data); 
 } else if (resultSet.status.trim() == "error") 
 { 
 $("#alertError").text(resultSet.data); 
 $("#alertError").show(); 
 } 
 } else if (status == "error") 
 { 
 $("#alertError").text("Error while saving."); 
 $("#alertError").show(); 
 } else
 { 
 $("#alertError").text("Unknown error while saving.."); 
 $("#alertError").show(); 
 } 
 $("#hidProjectIDSave").val(""); 
 $("#formProject")[0].reset(); 
}

$(document).on("click", ".btnUpdate", function(event)
{ 
$("#hidProjectIDSave").val($(this).data("Project_ID")); 
 $("#pmid").val($(this).closest("tr").find('td:eq(0)').text()); 
 $("#fbid").val($(this).closest("tr").find('td:eq(1)').text()); 
 $("#Project_Name").val($(this).closest("tr").find('td:eq(2)').text()); 
 $("#Start_Date").val($(this).closest("tr").find('td:eq(3)').text()); 
 $("#Deadline_Date").val($(this).closest("tr").find('td:eq(4)').text()); 
 $("#Project_Status").val($(this).closest("tr").find('td:eq(5)').text()); 
 $("#Project_Fund_Amt").val($(this).closest("tr").find('td:eq(6)').text()); 
 $("#Project_Sell_Amt").val($(this).closest("tr").find('td:eq(7)').text()); 

});

$(document).on("click", ".btnRemove", function(event)
{ 
 $.ajax( 
 { 
 url : "ProjectsAPI", 
 type : "DELETE", 
 data : "Project_ID=" + $(this).data("Project_ID"),
 dataType : "text", 
 complete : function(response, status) 
 { 
 onProjectDeleteComplete(response.responseText, status); 
 } 
 }); 
});

function onProjectDeleteComplete(response, status)
{ 
if (status == "success") 
 { 
 var resultSet = JSON.parse(response); 
 if (resultSet.status.trim() == "success") 
 { 
 $("#alertSuccess").text("Successfully deleted."); 
 $("#alertSuccess").show(); 
 $("#divItemsGrid").html(resultSet.data); 
 } else if (resultSet.status.trim() == "error") 
 { 
 $("#alertError").text(resultSet.data); 
 $("#alertError").show(); 
 } 
 } else if (status == "error") 
 { 
 $("#alertError").text("Error while deleting."); 
 $("#alertError").show(); 
 } else
 { 
 $("#alertError").text("Unknown error while deleting.."); 
 $("#alertError").show(); 
 } 
}
function validateProjectForm() 
{ 
// PMID
if ($("#pmid").val().trim() == "") 
 { 
 return "Insert Project Manager ID."; 
 }
  
// FBID
if ($("#fbid").val().trim() == "") 
 { 
 return "Insert Fund Body ID."; 
 } 
 
// PROJECT NAME
if ($("#Project_Name").val().trim() == "") 
 { 
 return "Insert Project Name."; 
 }
  
 // Start_Date
if ($("#Start_Date").val().trim() == "") 
 { 
 return "Insert FStart Date."; 
 } 
 
 // Deadline_Date
if ($("#Deadline_Date").val().trim() == "") 
 { 
 return "Insert Deadline Date."; 
 } 
 
 // Project_Status
if ($("#Project_Status").val().trim() == "") 
 { 
 return "Insert FProject Status."; 
 } 
 
 
 // Project_Fund_Amt
if ($("#Project_Fund_Amt").val().trim() == "") 
 { 
 return "Insert Project Fund Amount."; 
 } 
 // is numerical value
var tmpProject_Fund_Amt = $("#Project_Fund_Amt").val().trim(); 
if (!$.isNumeric(tmpProject_Fund_Amt)) 
 { 
 return "Insert a numerical value for Project Fund Amount."; 
 } 
// convert to decimal price
 $("#Project_Fund_Amt").val(parseFloat(tmpProject_Fund_Amt).toFixed(2)); 
 
 
 // Project_Sell_Amt
if ($("#Project_Sell_Amt").val().trim() == "") 
 { 
 return "Insert Project Sell Amount."; 
 } 
// is numerical value
var tmpProject_Sell_Amt = $("#Project_Sell_Amt").val().trim(); 
if (!$.isNumeric(tmpProject_Sell_Amt)) 
 { 
 return "Insert a numerical value for Project Sell Amount."; 
 } 
// convert to decimal price
 $("#Project_Sell_Amt").val(parseFloat(tmpProject_Sell_Amt).toFixed(2)); 
 
return true; 
}
