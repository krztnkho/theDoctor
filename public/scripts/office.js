jQuery.extend({
    delete: function(url, data, callback) {
        return httpRequests(url, data, callback, 'DELETE');
	},

	put: function(url, data, callback){
		return httpRequests(url, data, callback, 'PUT');
	}

});

function httpRequests(url, data, callback, method) {
    return jQuery.ajax({
        url: url,
        type: method,
        data: data,
        success: callback
    });
}

function sendMessage(username){
	var msg=document.getElementById("entry").value;
	document.getElementById("chatarea").innerHTML=document.getElementById("chatarea").innerHTML+"<br/><b>"+username+" :</b> "+msg;
	//alert(msg);
	msg=msg.toUpperCase();
	$.post("/chat",{"message": msg}).done(function(data){
		//alert(data.responses[0]);
		var index=Math.floor((Math.random()*3)); 
	    data.responses[index]=data.responses[index].toLowerCase();
	   
    	document.getElementById("chatarea").innerHTML=document.getElementById("chatarea").innerHTML+"<br/>"+"<b> doctor_bot :</b> "+data.responses[index];
	});
	//alert("end sendmessage");
}

function editMe(data){
		alert("hey edit "+data);
}

function del(data){
	alert("Deleting your account.");
	    $.delete('/office', {'username' : data }, function(result) {
	    	window.location.href="/logout";	    
		});
		alert("account deleted");
		return false;
}
