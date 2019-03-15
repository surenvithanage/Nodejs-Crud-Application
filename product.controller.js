const Product = require('./product.model.js');

//Create a new Product
exports.create = (req,res) => {
    //Request Validation
    if(!req.body){
        return res.status(400).send({
            message : "Product content can not be empty"
        });
    }

    //Creating a new product
    const product = new Product({
        title : req.body.title || "No product title",
        description : req.body.description,
        price : req.body.price,
        company : req.body.company
    });

    //Save a product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Something went wrong"
        });
    });
};

//Retrieving all products
exports.findAll = (req,res) => {
    Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Something went wrong while retrieving the data"
        });
    });
};

//Find a single product with a productId
exports.findOne = (req,res) => {
    Product.findById(req.params.productId)
    .then(product => {
        if(!product){
            return res.status(404).send({
                message : "Product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message : "Product not found with id : " + req.params.productId
            });
        }

        return res.status(500).send({
            message : "Something went wrong retrieving the product id " + req.params.productId
        });
    });
};

//Update a Product
exports.update = (req,res) => {
    //Validate request
    if(!req.body){
        return res.status(400).send({
            message : "Product content cannot be empty"
        });
    }

    //Find and update product with the request body
    Product.findByIdAndUpdate(req.params.productId , {
        title : req.body.title || "No Product Title",
        description : req.body.description,
        price : req.body.price,
        company : req.body.company
    }, { new : true})
    .then(product => {
        if(!product){
            return res.status(404).send({
                message : "Product not found with id : " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message : "product not found with id : " + req.params.productId
            });
        }
        return res.status(500).send({
            message : " Something went wrong while processing the request"
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    });
};