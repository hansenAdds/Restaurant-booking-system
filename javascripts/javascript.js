function goBack()
{
	window.history.back();
};

function loginPopUp() {
	window.open("login.html", "login", "width=500, height=300, left=100, top=50");
}
function regesPopUp(){
	window.open("reges.html","reges","width=500, height=300, left=100, top=50");
}
function historyPopUp(){
	window.open("view-booking.html","width=500, height=300, left=100, top=50");
}

function loginOpenID(googleUser){
	// Useful data for your client-side scripts:
	var profile = googleUser.getBasicProfile();
	console.log("ID: " + profile.getId()); // Don't send this directly to your server!
	console.log('Full Name: ' + profile.getName());
	console.log('Given Name: ' + profile.getGivenName());
	console.log('Family Name: ' + profile.getFamilyName());
	console.log("Image URL: " + profile.getImageUrl());
	console.log("Email: " + profile.getEmail());

	// The ID token you need to pass to your backend:
	var id_token = googleUser.getAuthResponse().id_token;
	console.log("ID Token: " + id_token);
            
	// Pass the token to auth function
	authServer({idtoken: id_token});
};
    
	// Load and show users details
function loginForm(){
	authServer({username:app.loginuser, password:app.loginpass});
	app.loginpass = '';
	
};

      
// Send login request to server
function authServer(params){          
	var xhttp = new XMLHttpRequest();
	// Define behaviour for a response
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status < 400) {
			app.auth = true;
			getSecretUserData();
		}
		else if (this.readyState == 4 && this.status == 401) {
			app.auth = false;
		}
	};
	// Initiate connection
	xhttp.open("POST", "/login", true);
            
	xhttp.setRequestHeader("Content-type","application/json");

	// Send request
	xhttp.send(JSON.stringify(params));
}

        // Load secret user information on the page
function getSecretUserData() {
	var xhttp = new XMLHttpRequest();
	// Define behaviour for a response
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status < 400) {
		app.userdata = this.responseText;
	}
	else if (this.readyState == 4 && this.status == 403) {
		app.auth = false;
	}
	};
            
	// Initiate connection
	xhttp.open("GET", "/users", true);
	// Send request
	xhttp.send();
}