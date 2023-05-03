const express = require('express');


const connection = require('./confi/Db');
const posts_route = require('./src/posts/route/posts.route');
const reported_route = require('./src/reported posts/route/reported.route');
const user_route = require('./src/user/Route/user.Route');

const app = express()
require("dotenv").config()
const port = process.env.port|| 5000;
connection();
app.use(express.json())
app.use(user_route)
app.use(posts_route)
app.use(reported_route)


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))