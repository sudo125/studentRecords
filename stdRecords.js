//seperating concers 
var recordArr = [];
var selectedIndex = -1;
//var index = -1;
//getting json file using ajax and jquery 

jQuery(document).ready(function(){
    
    //check if data available in LS
    //if its not their get json and store it ot local storage. 
    //load to storage and 
    
    
    if(localStorage.getItem('sendData') != null) {
        console.log("data present in LS");
        loadData();
        // display the data
        displayData();
        
    }
    else {
        // get data form JSON
        console.log("data not present in LS");
        getJasonData();
        
    }
    
//on click the data should get inserted in the table and the local storage should also get updated.  
jQuery('#submitClick').click(function(){
    console.log("submit fiunction triggered");
    
    if(!checkValidation()) {
            return;
        }
    
    var readObj = {
        name:jQuery("#name").val(),
        location:jQuery("#loc").val(),
        phoneNumber:jQuery("#pnum").val(),
        address:jQuery("#add").val(),
        age:jQuery("#age").val(),
        email:jQuery("#email").val(),
        mark:jQuery("#mark").val(),
    }
    
    if (selectedIndex === -1) {
       recordArr.push(readObj);
   } else {
       recordArr.splice(selectedIndex, 1, readObj);
   }
    console.log("adding new user");
    console.log(readObj);
    
    saveData();
    displayData();
    
    onClarPressed();
    console.log("the text box gets clear as soon as we press submit");
});
    
    //showing and hideing of the adding data form 
    jQuery('#addInfo').click(function(){
        jQuery('#displayDetails').toggle();
    });
    
  
    
    
});



//getting the jason file using ajax
var getJasonData = function(){

    jQuery.ajax({
        url: 'personInfo.json',
        dataType: 'json',
        success: function(result){
            console.log("the data is");
            console.log(result);
            recordArr = result;
            displayData();
            saveData();
    }});
    
    
    console.log('the ajax is working')
};
    

 // displaying the data in the table 
var displayData = function(index){
    
    //clear the table 
    jQuery("#showDeatilsInTable").empty();
    
    //
    
    
    // display data from record arr
    
    var tbl = "";
    tbl = "<tr><th id=\"nameCell\" class=\"celldecor\">Name</th><th id=\"locCell\" class=\"celldecor\">Location</th><th id=\"pnumCell\" class=\"celldecor\">Phone Number</th><th id=\"addCell\" class=\"celldecor\">Address</th><th id=\"activities\" class=\"celldecor\">Activities</th></tr>"
    
    for (var i = 0; i < recordArr.length ; i++){
    
        tbl += '<tr><th id=\"nameCell\" class=\"celldecor\">'+recordArr[i].name+'</th><th id=\"locCell\" class=\"celldecor\">'+recordArr[i].location+'</th><th id=\"pnumCell\" class=\"celldecor\">'+recordArr[i].phoneNumber+'</th><th id=\"addCell\" class=\"celldecor\">'+recordArr[i].address+'</th><th id=\"activities\" class=\"celldecor\"><input type=\"button\" name=\"view\" class=\"view\" onclick=view('+i+')><input type=\"button\" name=\"edit\" class=\"edit\" onclick=onEditPressed('+i+')><input type=\"button\" name=\"delete\" class=\"delete\" onclick=deleteTableRow('+i+')></th></tr><tr><td id=\"extraDetails'+i+'\" style = \"background-color: darkgreen;display:none;color: white;font-size: 20px;\"colspan = \"5\" class=\"celldecor\">'+'Age:'+recordArr[i].age+'&nbsp &nbsp &nbsp '+'Email:'+recordArr[i].email+'&nbsp &nbsp &nbsp '+'Marks:'+recordArr[i].mark+ '</td></tr>';
    }
    
   // $("td[id^='#extraDetails']").css('display','none');
   
    jQuery('#showDeatilsInTable').append(tbl);
    console.log("displaying Data");

    };
    

//saves the global array to the local storage.
var saveData = function(){
    
    //saves the record array to the local storage.
    localStorage.setItem('sendData', JSON.stringify(recordArr));
    console.log("saving data to LS");
    
};

//loads the data from the local  storage 
var loadData = function(){
    
    console.log("loading data frm LS");
    //logic
    recordArr = JSON.parse(localStorage.getItem('sendData'));
    console.log(recordArr);
};

    
// adding validation to the code 
var checkValidation = function () {
//adding validation to the text boxes.
    //getting all the input text objects where we wanna apply the validation.
        
    var xname= document.getElementById("name");
    var xloc= document.getElementById("loc");
    var xpnum= document.getElementById("pnum");
    var xadd= document.getElementById("add");
    var xage= document.getElementById("age");
    var xemail= document.getElementById("email");
    var xmark= document.getElementById("mark");
    
    //getting the error displayed. 
    var nameError = document.getElementById("nameError");
    var locError = document.getElementById("locError");
    var pnumError = document.getElementById("pnumError");
    var addError = document.getElementById("addError");
    var ageError = document.getElementById("ageError");
    var emailError = document.getElementById("emailError");
    var markError = document.getElementById("markError");
    
    //refreshing the text
    nameError.innerHTML = "";
    locError.innerHTML = "";
    pnumError.innerHTML = "";
    addError.innerHTML = "";
    ageError.innerHTML = "";
    emailError.innerHTML = "";
    markError.innerHTML = "";
    
    //for the border
    xname.style.border ="";
    xloc.style.border ="";
    xpnum.style.border ="";
    xadd.style.border ="";
    xage.style.border ="";
    xemail.style.border ="";
    xmark.style.border ="";
    
    
    if(xname.value == "" || xloc.value == "" || xpnum.value =="" || xadd.value == "" || xage.value == "" || xemail.value == "" || xmark.value == "")
    {
        
        if(xname.value == ""){
                xname.style.border = "1px solid red";
                nameError.innerHTML = "Please Enter something";
                xname.focus();
                //return false;
            }
        if(xloc.value == ""){
                xloc.style.border = "1px solid red";
                locError.innerHTML = "Please Enter something";
                xloc.focus();
                //return false;
            }
        if(xpnum.value == ""){
                xpnum.style.border = "1px solid red";
                pnumError.innerHTML = "Please Enter something";
                xpnum.focus();
                //return false
            }
        if(xadd.value == ""){
                xadd.style.border = "1px solid red";
                addError.innerHTML = "Please Enter something";
                xadd.focus();
                //return false
            }
        if(xage.value == ""){
                xage.style.border = "1px solid red";
                ageError.innerHTML = "Please Enter something";
                xage.focus();
                //return false
            }
        if(xemail.value == ""){
                xemail.style.border = "1px solid red";
                emailError.innerHTML = "Please Enter something";
                xemail.focus();
                //return false
            }
        if(xmark.value == ""){
                xmark.style.border = "1px solid red";
                markError.innerHTML = "Please Enter something";
                xmark.focus();
                //return false
            }
        
        
        
        return false;
    }
    else {
        return true;
    }       
    
};

//seraching names
var seachBar = function() {
    console.log("the search function is working");
  var input = document.getElementById("myInput");
  var filter = input.value.toUpperCase();
  var table = document.getElementById("showDeatilsInTable");
  var tr = table.getElementsByTagName("tr");
    
  for (i = 0; i < tr.length; i++) {
    th = tr[i].getElementsByTagName("th")[0];
    if (th) {
      if (th.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
/* //search button 
    jQuery.('#showDeatilsInTable').onkeyup('myInput', function() {
    var input = jQuery('#myInput').val();
    var filter = input.value.toUpperCase();
    var table = jQuery('#showDeatilsInTable').val();
    var tr = jQuery('#tr').val();
    for (i = 0; i < tr.length; i++) {
    th = tr[i].jQuery('#nameCell')[0];
    if (th) {
      if (th.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
    
});
*/

};

//edit a perticular row in the table 
var onEditPressed = function(index) {
    selectedIndex = index;
    var stuObj = recordArr[index];
    
    console.log(stuObj);
     console.log(index);
    jQuery("#name").val(stuObj.name);
   jQuery("#loc").val(stuObj.location);
    jQuery("#pnum").val(stuObj.phoneNumber);
    jQuery("#add").val(stuObj.address);
     jQuery("#age").val(stuObj.age);
    jQuery("#email").val(stuObj.email);
    jQuery("#mark").val(stuObj.mark);
    
    jQuery("#submitClick").html("Update");
    
    console.log("edit is working"+index);
};

//delete a perticular row in the table
var deleteTableRow = function (index) {
    
    recordArr.splice(index, 1);
    //save data
    saveData();
    
    //displace data 
    displayData();
    
    //making sure that i am reseting the index. 
    
    selectedIndex = -1;
    
    
    console.log("delete is working"+index);
};

//reseting the value
var onClarPressed = function (index) {
    selectedIndex = -1;
    jQuery("#name").val("");
    jQuery("#loc").val("");
    jQuery("#pnum").val("");
    jQuery("#add").val("");
    jQuery("#age").val("");
    jQuery("#email").val("");
    jQuery("#mark").val("");
};

var  view = function (index){
    
    jQuery('#extraDetails'+index).toggle();
    console.log("the view botton is working");
    selectedIndex = -1;
    
    
}

//hideing the form
/*function showHideForm() {
    var x = document.getElementById('displayDetails');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
    
     
};*/
