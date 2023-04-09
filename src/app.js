import express from 'express';
import ProductManager from "./productmanager/productManager.js";

const app = express();

const productManager = new ProductManager('./src/files/products.json');

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
    try {
        const limit = Number(req.query.limit);

        const products = await productManager.getAll();
        const limitProduct = products.slice(0, limit);

        if (!limit) {
            res.send(products);
        } else {
            res.send(limitProduct);
        };

    } catch (error) {
        console.log(error);
    };
});

app.get('/products/:pid', async (req, res) => {
    try {
        const ProductId = Number(req.params.pid);
        const products = await productManager.getAll();

        const product = products.find(prod => prod.id === ProductId);
        if (product) {
            res.send(product);
        } else {
            res.send(`${ProductId} no coincide con nuestra base de datos`);
        };

    } catch (error) {
        console.log(error);
    };
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