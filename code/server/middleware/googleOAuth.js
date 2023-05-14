require('dotenv').config();
const express = require('express');


app.post('/auth/google', async (req, res) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
  console.log(tokens);
  
  res.json(tokens);
});

app.post('/auth/google/refresh-token', async (req, res) => {
  const user = new UserRefreshClient(
    clientId,
    clientSecret,
    req.body.refreshToken,
  );
  const { credentials } = await user.refreshAccessToken(); // optain new tokens
  res.json(credentials);
})