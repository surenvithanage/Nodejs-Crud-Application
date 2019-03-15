module.exports = (app) => {
    const product = require('./product.controller.js');

    //Create a new product
    app.post('/products' , product.create);

    // Retrieve all Products
    app.get('/products', product.findAll);

    // Retrieve a single Product with productId
    app.get('/products/:productId', product.findOne);

    // Update a Note with productId
    app.put('/products/:productId', product.update);

    // Delete a Note with productId
    app.delete('/products/:productId', product.delete);
}