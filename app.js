//jshint esversion:6


const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");



const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));
app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");

});
app.post("/", function(req, res){
  const first_name = req.body.fname;
  const last_name  = req.body.lname;
  const email = req.body.email;
  const data = {
  members: [{
    email_address: email,
    status: "subscribed",
    merge_fields: {
       FNAME: first_name,
       LNAME: last_name
     }

    }
  ]
};
const json_data = JSON.stringify(data);

const url = "https://us10.api.mailchimp.com/3.0/lists/da0f03b165";
const options = {
  method: "POST",
  auth: "itachi:364a177b3ceec5871f844fff7e546f74-us10"
}
const request = https.request(url, options, function(response){
  if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }else{
    res.sendFile(__dirname + "/failure.html");
}



  response.on("data", function(data){
    console.log(JSON.parse(data));
  });
});
  request.write(json_data);
  request.end();

});

json_obj = {
	"name": "Freddie'\''s Favorite Hats",
	"contact": {
		"company": "Mailchimp",
		"address1": "675 Ponce De Leon Ave NE",
		"address2": "Suite 5000",
		"city": "Atlanta",
		"state": "GA",
		"zip": "30308",
		"country": "US",
		"phone": ""
	},
	"permission_reminder": "You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.",
	"campaign_defaults": {
		"from_name": "Freddie",
		"from_email": "freddie@freddiehats.com",
		"subject": "",
		"language": "en"
	},
	"email_type_option": true
}
app.post("/failure", function(req, res){
  res.redirect("/");
}); 

app.listen(3000, function(){

  console.log("Server is running on port 3000");
});
//API keys
// 364a177b3ceec5871f844fff7e546f74-us10
// List // // ID
// da0f03b165
