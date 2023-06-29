const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: ' ',
        database: 'drdo_report',
    },
});

const app = express();

let intialPath = path.join(__dirname, "public");

app.use(bodyParser.json());
app.use(express.static(intialPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(intialPath, "index.html"));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(intialPath, "login.html"));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(intialPath, "register.html"));
})

app.post('/register-user', (req, res) => {
  const { name, email, password, rank, group_name, OIC_name, OIC_designation } = req.body;

  if (!name || !email || !password || !rank || !group_name || !OIC_name || !OIC_designation) {
    res.json('Please fill in all the fields.');
  } else {
    db('users')
      .insert({
        name: name,
        email: email,
        password: password,
        rank: rank,
        group_name: group_name,
        oic_name: OIC_name,
        oic_design: OIC_designation,
      })
      .returning(['name', 'email'])
      .then((data) => {
        res.json(data[0]);
      })
      .catch((err) => {
        if (err.detail?.includes('already exists')) {
          res.json('Email already exists.');
        }
      });
  }
});

app.post('/login-user', (req, res) => {
    const { email, password } = req.body;

    db.select('name', 'email')
    .from('users')
    .where({
        email: email,
        password: password
    })
    .then(data => {
        if(data.length){
            res.json(data[0]);
        } else{
            res.json('email or password is incorrect');
        }
    })
})

app.listen(3000, (req, res) => {
    console.log('listening on port 3000......')
})