const express = require('express');
const mysql = require('mysql');

/** Create Connection */
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_mysql'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected');
});
const app = express();

/** Create Db */
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE node_mysql';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Database created ......');
  });
});

/** Create Table */
app.get('/createtable', (req, res) => {
  let sql =
    'CREATE TABLE posts(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), body VARCHAR(255))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Table created .......');
  });
});

/** Insert */
app.get('/addpost', (req, res) => {
  let post = { title: 'New Post', body: 'This is new post' };
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Value inserted ...........');
  });
});

/** Select all data */
app.get('/getpost', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post fetched....');
  });
});

/** Select single id */
app.get('/getpost/:id', (req, res) => {
  const id = req.params.id;
  let sql = `SELECT * FROM posts WHERE id = ${id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post fetched....');
  });
});

/** Update data */
app.get('/updatepost/:id', (req, res) => {
  const id = req.params.id;
  const newTitle = 'Title Update';
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post updated....');
  });
});

/** Delete data */
app.get('/deletepost/:id', (req, res) => {
  const id = req.params.id;
  let sql = `DELETE FROM posts WHERE id = ${id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post deleted....');
  });
});
app.listen(3000, () => {
  console.log('Server started on port');
});
