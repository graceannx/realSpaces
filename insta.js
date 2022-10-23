import React from "react";

const insta = require("instagram-node").instagram()

// Add client ID and secret to a config file - obtained from Instagram admin area
insta.use({
  client_id: config.insta.clientID,
  client_secret: config.insta.clientSecret,
})

//redurect URI needs to be http:// or https://
var redirect_uri = "http://localhost:3000/api/insta/getToken"

//app will send API request to this end point
router.post("/authorize_user", getAuthUrl)

//server sends back the authorization URL to the app
getAuthUrl = function (req, res) {
  res.send({
    success: true,
    url: insta.get_authorization_url(redirect_uri, {
      scope: ["likes"],
      state: "a state",
    }),
  })
}

//once user had entered credentials and is authorized with Instagram, the redirect URI will send the app to here
router.get("/getToken", (req, res) => {
  //the instagram-node package performs a final request to exchange the code in the redirect URI for the almighty access token
  insta.authorize_user(req.query.code, redirect_uri, function (err, result) {
    if (err) {
      console.log(err.body)
      res.send("Didn't work")
    } else {
      console.log("Yay! Access token is " + result.access_token)
      //user is directed to the app with the access token via the URL scheme using Express redirect instead
      res.redirect(`myapp://instaAuth?token=${result.access_token}`)
    }
  })
})