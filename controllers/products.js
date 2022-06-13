const express = require("express"); // import express
const Product = require('../models/product');





/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////



//////////////////////////////////////////////
// Index Route
//////////////////////////////////////////////
router.get("/", (req, res) => {
  console.log("working")
  Product.find({})
    
    .then((products) => {
      res.render("index", { products });
      console.log(products)
    })
    .catch((error) => {
      res.json({ error });
    });
});

//////////////////////////////////////////////
// Show Route
//////////////////////////////////////////////
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    
    .then((product) => {
      res.render("show", { product });
      
    })
    .catch((error) => {
      res.json({ error });
    });
});


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;