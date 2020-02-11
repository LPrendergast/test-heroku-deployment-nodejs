const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  let data = {
    members: [
      {
        email_address: email,
        status: "subsribed"
      }
    ]
  };

  let jsonData = JSON.stringify(data);

  const options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/76e60932c6",
    method: "POST",
    headers: {
      Authorization: "WoopDiWoop 77fa94a98eb507b6cb6d2fee945e2de4-us4 "
    },
    body: jsonData
  };

  request(options, (error, response, body) => {
    if (error) {
      console.log(error);
    } else {
      console.log(response.statusCode);
    }
  });
});

app.listen(process.env.PORT || port, () =>
  console.log(`Server is running on port ${port}!`)
);

// API Key
// 77fa94a98eb507b6cb6d2fee945e2de4-us4

// List ID
// 76e60932c6
