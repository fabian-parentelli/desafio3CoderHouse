import express from 'express';
import ProductManager from "./productmanager/productManager.js";

const app = express();

const productManager = new ProductManager('./files/products.json');

app.use(express.urlencoded({extended: true}));

app.get('/products', async (req, res) => {
    const products = await productManager.getAll();
    res.send(products);
});

// console.log(await productManager.getAll());

// console.log(await productManager.getById(2));

const createProduct = async () => {
    
    const obj = {
        title: "Cafe", 
        description: 'rico', 
        price: 200, 
        thumbnail: 'no hay foto', 
        code: 500, 
        stock: 50,
    };

    await productManager.addProduct(obj);
};
// createProduct();


const modificaProducto = async () => {

    const obj = {
        title: "manteca", 
        description: 'rico', 
        price: 200, 
        thumbnail: 'no hay foto', 
        code: 500, 
        stock: 50,
    };
    await productManager.updateProduct(4, obj);
};
// modificaProducto();


// await productManager.deleteById(4);

// await productManager.deleteAll();

app.listen(8080, () => console.log('Listening on port 8080'));