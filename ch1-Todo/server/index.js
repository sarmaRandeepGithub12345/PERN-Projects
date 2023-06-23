require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
//const pool =require("./db.js")
const pg = require("pg")

const conString = process.env.DATABASE_URL
const poolConfig = {
    connectionString : conString,
    max:20,
    idleTimeoutMillis : 30000,
    connectionTimeoutMillis : 2000
    }
const pool = new pg.Pool(poolConfig)
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS todo(
      todo_id SERIAL PRIMARY KEY,
      description VARCHAR(255)
    );
  `;
pool.query(`
CREATE TABLE IF NOT EXISTS todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);
`, (err, res) => {
    console.log('Table created');
    //pool.end();
});
//middlewares
app.use(cors())
app.use(express.json())

//ROUTES//
//1) create a todo
app.post("/todos",async (req,res)=>{
   try {
    const {description } = req.body;
    //insert into table named "todo" a column named description
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description]);
    res.json(newTodo.rows[0])

   } catch (error) {
     console.error(error.message)
   }
})


//2) get all todos
app.get("/todos",async(req,res) => {
   try {
    const allTodos = await pool.query("SELECT * FROM todo;");
    res.json(allTodos.rows);
   } catch (error) {
    console.error(error.message)
   } 
})
//3) get a todo
app.get("/todos/:id",async(req,res)=>{
    try {
        //console.log(req.params)  
        const {id } = req.params;
        const todo = await pool.query("SELECT * FROm todo WHERE todo_id = $1;",[id]);
        res.json(todo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

//4)update a todo
app.put("/todos/:id",async(req,res)=>{
    try {
        const { id } =req.params;
        const { description } = req.body;
        console.log(id,description)
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description , id]);
        res.json("Todo was updated")
    } catch (error) {
        console.error(error.message)
    }
})
//5)delete a todo
app.delete("/todos/:id",async (req,res) => {
    try {
        const { id } =req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[
            id
        ]);
        res.json("Todo was deleted")
    } catch (error) {
        console.error(error.message) 
    }
})

app.listen(5000, ()=>{
  console.log("Server has started on port 5000")  
})