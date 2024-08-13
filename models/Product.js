const path = require("node:path");
const dataSource = require("../services/dataSource");
const productsFilePath = path.join(__dirname, '../data/products.json')

const Product = {
    generateId(){
        const allProducts = this.findAll();
        const newId = allProducts.length ? allProducts[allProducts.length - 1].id + 1 : 1;
        return newId;
    },
    findAll(){
        return dataSource.load(productsFilePath);
    },
    findById(id){
        const allProducts = this.findAll();
        const productFound = allProducts.find(prod => prod.id == id);
        return productFound;
    },
    findByField(field, text){
        const allProducts = this.findAll();
        const productFound = allProducts.find(prod => prod[field] == text);
        return productFound;
    },
    create(productData){
        const allProducts = this.findAll();
        const newProduct = {
            id: this.generateId(),
            ...productData
        }
        allProducts.push(newProduct);
        dataSource.save(productsFilePath, allProducts);
        return newProduct;
    },
    deleteById(id){
        const allProducts = this.findAll();
        const finalProducts = allProducts.filter(prod => prod.id != id);
        dataSource.save(productsFilePath, finalProducts);
        return true;
    },
    editProduct(id, product){
        const allProducts = this.findAll();
        allProducts.forEach(prod => {
            if(prod.id == id){
                prod.name = product.name;
                prod.color = product.color;
                prod.size = product.size;
                prod.category = product.category;
                prod.description = product.description;
                prod.price = product.price;
                prod.image = product.image ? product.image : prod.image;
            }
        });
        dataSource.save(productsFilePath, allProducts);
        return true;
    }
}

module.exports = Product;