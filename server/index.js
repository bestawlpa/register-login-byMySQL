// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const port = 8000 ;
// const mysql = require('mysql2/promise');
// const cors = require('cors')
// const morgan = require('morgan')

// app.use(morgan('dev'))
// app.use(bodyParser.json())
// app.use(cors())

// let conn = null ;

// const initMySQL = async () => {
//   conn = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'tutorials',
//     port:3306
//   })
// };

// app.get('/', (req, res) => {
//   res.send("Hello!. This my first mySql")
// });

// //path get users
// app.get('/users', async (req,res) => {
//   const result = await conn.query('SELECT * FROM users');
//   res.json(result[0])
// }); 

// app.get('/user/:id', async (req,res) => {
//   try {
//     const id = req.params.id;
//     const result = await conn.query('SELECT * FROM users WHERE id = ?' ,id);

//     if (result[0].length == 0)  {
//       throw {statusCode : 404 , message : "there is don't have this ID in the system"}
//     } 
//     res.json(result[0][0]);
//   } catch (error) {
//     console.log("errorMessage" ,error.message);
//     let statusCode = error.statusCode || 500
//     res.status(statusCode).json({
//       message : " sometjing wrong",
//       errorMessage : error.message
//     });
//   }
// }); 

// // path add user
// app.post('/user', async (req,res) => {

//   try {
//     const user = req.body;
//     const result = await conn.query('INSERT INTO users SET ?',user);
//     res.json({
//     message : "insert success!",
//     data : result[0]
//   })
//   } catch (error) {
//     console.log("errorMessage" ,error.message);
//     res.status(500).json({
//       message : " sometjing wrong",
//     });
//   }
// })

// // path update
// app.put('/user/:id' , async (req,res) => {
//   try {
//     const id = req.params.id;
//     const updateUser = req.body
//     const result = await conn.query('UPDATE users SET ? WHERE id =?', [updateUser,id]);
//     res.json({
//     message : "update success!",
//     data : result[0]
//   })
//   } catch (error) {
//     console.log("errorMessage" ,error.message);
//     res.status(500).json({
//       message : " sometjing wrong",
//     });
//   }
// })

// // path delete
// app.delete('/user/:id', async (req,res) => {
//   try {
//     const id = req.params.id;
//     const result = await conn.query('DELETE from users WHERE id =?', id);
//     res.json({
//     message : "delete success!!",
//     data : result[0]
//   })
//   } catch (error) {
//     console.log("errorMessage" ,error.message);
//     res.status(500).json({
//       message : " sometjing wrong",
//     });
//   }
// }); 

// app.listen(port, async  () => {
//     await  initMySQL()
//     console.log(`Server is running on : ${port}`)
// })



const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const mysql = require('mysql2/promise');
const cors = require('cors');
const morgan = require('morgan');
const usersRouter = require('./routes/userRoutes');
// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// Initialize MySQL connection
let conn = null;
const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tutorials',
    port: 3306
  });
};

// Routes
app.use('/users', usersRouter);


// Start server
app.listen(port, async () => {
  await initMySQL();
  console.log(`Server is running on port ${port}`);
});
