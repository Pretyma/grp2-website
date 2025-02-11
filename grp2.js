"use strict";

var $ = function(id){return document.getElementById(id); };

var Entry = 
{
	entry: "",
	entryType: "",
	status: "",
	getEntry: function(entry, type)
	{
	this.entry = entry;
	this.entryType = type;
	this.status = this.validate();
	},

	validate: function()
	{
		if (this.entry === "")
		{
			return "empty"
		}
		else
		{
			if (this.entryType == "phone")
			{
				if ((/^\d{3}-\d{3}-\d{4}$/.test(this.entry)))
					return "valid";
				else
					return "invalid";
					
					
			}
			
			else if (this.entryType == "email")
			{

					var parts = this.entry.split("@");
					if (parts.length !== 2 ) return "invalid";
					if (parts[0].length > 64) return "invalid";
					if (parts[1].length > 255) return "invalid";
					var address =
						"(^[\\w!#$%&'*+/=?^`{|}~-]+(\\.[\\w!#$%&'*+/=?^`{|}~-]+)*$)";
					var quotedText = "(^\"(([^\\\\\"])|(\\\\[\\\\\"]))+\"$)";
					var localPart = new RegExp( address + "|" + quotedText );
					if ( !parts[0].match(localPart) ) return "invalid";
					var hostnames =
						"(([a-zA-Z0-9]\\.)|([a-zA-Z0-9][-a-zA-Z0-9]{0,62}[a-zA-Z0-9]\\.))+";
					var tld = "[a-zA-Z0-9]{2,6}";
					var domainPart = new RegExp("^" + hostnames + tld + "$");
					if ( !parts[1].match(domainPart) ) return "invalid";
					return "valid";

			}
			else 
				return "valid";
		}
	}
};





var processEntries = function() {
	
	var header = "";
	var html = "";
	var required = "<span>Required field</span>";
	var invalid = "<span>Invalid entry</span>";
	var noComment = "None";
	var yesComment = "\u2714";
	var msg = "Please review your entries and complete all required fields before you submit";
	
	
	var first_name = Object.create(Entry);
	first_name.getEntry($("first").value, "first_name")
	var last_name = Object.create(Entry);
	last_name.getEntry($("last").value, "last_name");
	var phone = Object.create(Entry);
	phone.getEntry($("phone").value, "phone");
	var email = Object.create(Entry);
	email.getEntry($("email").value, "email");
	var city = Object.create(Entry);
	city.getEntry($("city").value, "city");
	var infosource = Object.create(Entry);
	infosource.getEntry( $("infosource").options[$("infosource").selectedIndex].text, "infosource");
	var comments = Object.create(Entry);
	comments.getEntry($("comments").value, "comments");
	
	
	if(first_name.status == "empty")
	{
		first_name.entry = required;
		header = msg;
	}
	
	if(last_name.status == "empty")
	{
		last_name.entry = required;
		header = msg;
	}
	
	if(phone.status == "empty")
	{
		phone.entry = required;
		header = msg;
	}
	else if (phone.status == "invalid")
	{
		phone.entry = invalid;
		header = msg;
	}
	if(email.status == "empty")
	{
		email.entry = required;
		header = msg;
	}
	else if (email.status == "invalid")
	{
		email.entry = invalid;
		header = msg;
	}
	if(city.status == "empty")
	{
		city.entry = required;
		header = msg;
	}
	if(infosource.status == "empty")
	{
		infosource.entry = required;
		header = msg;
	}
	var commentStatus;
	if(comments.status == "empty")
	{
		commentStatus = noComment;
	}
	else
	{
		commentStatus = yesComment;
	}
	

	$("registration_header").firstChild.nodeValue = header;
	if(header == msg){
		html = html + "<tr><td>First Name: </td><td> <span style='color:blue'>" + first_name.entry + "</span> </td></tr>" ;
		html = html + "<tr><td>Last Name: </td><td> <span style='color:blue'>" + last_name.entry + "</span> </td></tr>" ;
		html = html + "<tr><td>Phone Number: </td><td> <span style='color:blue'>" + phone.entry + "</span> </td></tr>" ;
		html = html + "<tr><td>Email: </td><td> <span style='color:blue'>" + email.entry + "</span> </td></tr>" ;
		html = html + "<tr><td>City: </td><td> <span style='color:blue'>"  + city.entry + "</span> </td></tr>" ;
		html = html + "<tr><td>Heard about us from: </td><td> <span style='color:blue'>" + infosource.entry + "</span> </td></tr>" ;
		html = html + "<tr><td>Comments:  </td><td> <span style='color:blue'>" + commentStatus + "</span> </td></tr>" ;
		$("registration_info").innerHTML = html;
	}else {
		$("registration_info").innerHTML = "";
		$("contact").submit();
	}
};




var resetForm = function(){
	$("contact").reset();
	$("registration_header").firstChild.nodeValue = "";
	$("registration_info").innerHTML = "";
	$("first").focus();
};

window.onload = function(){
	$("mySubmit").onclick = processEntries;
	$("mySubmit1").onclick = resetForm;
	$("first").focus();
};