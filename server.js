const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

let products = [
    { id: 1, name: 'Café Espresso', price: 2.50 },
    { id: 2, name: 'Café Latte', price: 3.00 },
    { id: 3, name: 'Café Mocha', price: 3.50 }
];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(product);
});

app.post('/api/products', (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
    }
    
    const newProduct = {
        id: products.length + 1,
        name,
        price
    };
    
    products.push(newProduct);
    
    res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;

    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    if (name) {
        product.name = name;
    }

    if (price) {
        product.price = price;
    }

    res.json(product);
});

app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === productId);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    products.splice(index, 1);
    
    res.json({ message: 'Produto excluído com sucesso' });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});