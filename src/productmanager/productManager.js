import fs from 'fs';

export default class ProductManager {

    constructor(path) {
        this.path = path;
    };

    addProduct = async (obj) => {
        try {
            const products = await this.getAll();

            const product = {
                title: obj.title,
                description: obj.description,
                price: obj.price,
                thumbnail: obj.thumbnail,
                code: obj.code,
                stock: obj.stock
            };

            const { title, description, price, thumbnail, code, stock } = product;

            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log('Todos los campos son obligatorios');
                return;
            };

            const codeFinde = products.find(prod => prod.code === code);
            if (codeFinde) return console.log('El código se encuentra repetido')

            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = products[products.length - 1].id + 1;
            };

            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            const productsList = await this.getAll();
            console.log(productsList);

        } catch (error) {
            console.log(error);
        };
    };

    updateProduct = async (id, obj) => {
        try {
            const products = await this.getAll();
            const productBuscado = await this.getById(id)

            const product = { ...productBuscado, ...obj };

            const indexProduct = products.findIndex(prod => prod.id === id);
            products.splice(indexProduct, 1);

            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            const productsList = await this.getAll();
            console.log(productsList);

        } catch (error) {
            console.log(error);
        }
    };

    getAll = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products;
            } else { 
                return [];
            };

        } catch (error) {
            console.log(error);
        };
    };

    getById = async (id) => {
        try {
            const products = await this.getAll();

            const prodductId = products.find(prod => prod.id === id);
            if (!prodductId) {
                return console.log("El producto no existe");
            } else {
                return prodductId;
            };

        } catch (error) {
            console.log(error);
        };
    };

    deleteById = async (id) => {
        const products = await this.getAll();

        const productDelete = products.findIndex(prod => prod.id === id);

        if (productDelete) {
            products.splice(productDelete, 1);
        } else {
            console.log("producto no encontrado");
            return
        };

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

        const productsList = await this.getAll();
        console.log(productsList);
    };

    deleteAll = async () => {
        try {
            if (fs.existsSync(this.path)) {
                await fs.promises.unlink(this.path);
                console.log("Todos los elementos borrados exitosamenete");
            } else {
                console.log("No hay elementos a eliminar");
            };

        } catch (error) {
            console.log(error);
        };
    };
};