//backend api 
/* referenced https://www.youtube.com/watch?v=w3vs4a03y3I  and https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/ when learning how to setup server/backend api with express/node */

const express = require('express');
const wordData = require('./words.json');
const app = express();

//route for api : backend api that returns list of users 
app.get("/api", (req, res) => {
	res.json({wordData})	
});

app.listen(5000, () => {console.log("server started on port 5000")}) //server running on 5000, client on 3000
