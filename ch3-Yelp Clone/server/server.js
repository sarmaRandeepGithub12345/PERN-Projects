require("dotenv").config()
const cors=require("cors")
const express = require('express')
//const db = require("./db")
const morgan = require('morgan')
const app = express()
const pg = require("pg")

const conString = process.env.DATABASE_URL

const poolConfig = {
    connectionString : conString,
    max:20,
    idleTimeoutMillis : 30000,
    connectionTimeoutMillis : 2000
    }
const db = new pg.Pool(poolConfig)

db.query(`
CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >=1 and price_range <=5)
 );
`, (err, res) => {
    console.log('Restaurant Table created');
});
db.query(`
CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >=1 and rating <=5)
);
`, (err, res) => {
    console.log('Reviews Table created');
   
});

const port = process.env.PORT || 3005

//app.use(morgan("dev"))

app.use(express.json())
app.use(cors())

// Get all restaurants
app.get("/api/v1/restaurants",async(req,res)=>{

   // const results = await db.query("select * from restaurants;")
    const restaurantRatingsData = await db.query("select * from restaurants left join (select restaurant_id,COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;") 
    //console.log(restaurantRatingsData.rows)
    try{
 
        res.status(200).json({
            status:"success",
            results: restaurantRatingsData.rows.length,
            data: {
                restaurant : restaurantRatingsData["rows"]
            }
        });
    }catch(error){
       res.status(500).json(error)
    }
    
});

//Get all restaurant
app.get("/api/v1/restaurants/:id",async(req,res)=>{
    
    try {
        const restaurant = await db.query(`select * from restaurants left join (select restaurant_id,COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id=$1;`,[req.params.id])
        
        const reviews = await db.query("select * from reviews where restaurant_id = $1",[
            req.params.id
        ])

        res.status(200).json({
            status:"success",
            data:{
                restaurant:restaurant.rows[0],
                reviews: reviews.rows
            }

        })
    } catch (error) {
        
    }
    
})

//Create a restaurant
app.post("/api/v1/restaurants",async(req,res)=>{
    try {
        const results = await db.query("INSERT INTO restaurants (name,location,price_range) values ($1,$2,$3) returning *",[req.body.name,req.body.location,req.body.price_range])
        res.status(201).json({
            status:"success",
            data:results
        })
    } catch (error) {
        
    }
})

//Update Restaurants
app.put('/api/v1/restaurants/:id',async(req,res)=>{
    try {
       //console.log(req.params,req.body)
       const results = await db.query("UPDATE restaurants SET name=$1 , location=$2,price_range = $3 WHERE id = $4 returning *",[req.body.name,req.body.location,req.body.price_range,req.params.id])
       
       res.status(200).json({
        "status":"success",
        "data":{
            restaurant:results.rows[0]
        },
       })
    } catch (error) {
        
    }
})

//delete restaurant
app.delete("/api/v1/restaurants/:id",async(req,res)=>{
    
    try {
        const results = await db.query("DELETE FROM restaurants where id = $1",[req.params.id])
        res.status(200).json({
            status:"success",

        })
    } catch (error) {
        
    }
})

app.post(`/api/v1/restaurants/:id/addReview`,async(req,res)=>{
    try {
        //console.log(req.body)
        const newReviews = await db.query(`insert into reviews (restaurant_id,name,review,rating) values ($1,$2,$3,$4) returning *;`,[req.params.id,req.body.name,req.body.review,req.body.rating])
        //console.log(newReviews)
        res.status(201).json({
            status:'success',
            data:{
                review: newReviews.rows[0]
            }
        })
    } catch (error) {
        res.json(error)
    }
})

app.listen(port,()=>{
    console.log(`Server is up and listening on port ${port}`)
})