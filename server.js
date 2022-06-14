/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////

require("dotenv").config();
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("./models/connection")
// const fetch = require('node-fetch')
const path = require("path")
const Product = require('./models/product');
//Router
const ProductRouter = require("./controllers/products")
const reviewsRouter = require('./controllers/reviews');
// const weatherAlarmRouter = require("./controller/weatherAlarms")


/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), { root: [path.resolve(__dirname, 'views/')] })

const rowdy = require('rowdy-logger')
const routesReport = rowdy.begin(app)


/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically
app.use("/products",ProductRouter)
app.use('/', reviewsRouter);


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Now Listening on port ${PORT}`)
    //   routesReport.print()
});




//seed data testing place
// app.get("/seed", (req, res) => {
    
//      const requestURL = `https://api.rainforestapi.com/request?api_key=${process.env.AMAZON_BEST_API_KEY}&type=bestsellers&url=https://www.amazon.com/s/zgbs/pc/516866`
//     fetch(requestURL).then(
        
//         (response) => {

//             response.json().then((data) => {

//                 res.send(data)
//                 console.log(data.results);

//             })
//         }

//     )
// })
