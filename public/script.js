const list = document.getElementById('products-list');

let products = [
    { id: 1, name: 'Café Espresso', price: 2.50 },
    { id: 2, name: 'Café Latte', price: 3.00 },
    { id: 3, name: 'Café Mocha', price: 3.50 }
];

function mostrarProdutos() {
    list.innerHTML = '';

    products.forEach(product => { 
        const listItem = document.createElement('li');

        listItem.textContent = `${product.name} - R$ ${product.price.toFixed(2)}`; 

        list.appendChild(listItem);
    });
}

mostrarProdutos();