const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '0708',
    database : 'smart-brain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/",(req,res)=>{ res.send("It is working.")})

app.post("/signin",signin.handleSignin(db ,bcrypt))

app.post("/register",register.handleRegister(db, bcrypt))

app.get("/profile/:id",profile.handleProfile(db, bcrypt))

app.put("/image", image.handleImage(db))

app.post('/imageurl', (req,res) => { image.handleApiCall(req,res) })

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
	console.log(`Server started at port ${PORT}.`);
});
