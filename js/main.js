const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
});

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// lista de contenedores de productos

const productList = document.querySelector('.container-items');

// variable de arreglos de productos

let allProducts = [];

let valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');

productList.addEventListener('click', e => {
    if(e.target.classList.contains('botonsito')) {
        const producto = e.target.parentElement;
        const infoProduct = {
            quantity: 1,
            title: producto.querySelector('h2').textContent,
            price: producto.querySelector('p').textContent
        }

        const exits = allProducts.some(producto => producto.title === infoProduct.title);

        if (exits) {
            const products = allProducts.map(producto => {
                if(producto.title === infoProduct.title) {
                    producto.quantity++;
                    return producto;
                }
            })
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct];
        }
        showHTML();
    }
});

rowProduct.addEventListener('click', (e) => {
    if(e.target.classList.contains('fa-xmark')) {
        const producto = e.target.parentElement;
        const title = producto.querySelector('p').textContent;

        allProducts = allProducts.filter( 
        producto => producto.title !== title);
        showHTML();
    }
});


// funcion para mostrar html

const showHTML = () => {

    if(!allProducts.length) {
        containerCartProducts.innerHTML = `
        <p class="cart-empty">El carrito esta vacio<p>
        `
    }

    //limpiar html
    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(producto => {
        const containerProduct = document.createElement('div')
        containerProduct.classList.add('cart-product')
        containerProduct.innerHTML = `
        <div class="info-cart-product">
        <span class="cantidad-producto-carrito">${producto.quantity}</span>
        <p class="titulo-producto-carrito">${producto.title}</p>
        <span class="precio-producto-carrito">${producto.price}</span>
        </div>
        <i class="fa-sharp fa-solid fa-xmark"></i>
        `
        rowProduct.append(containerProduct);
        total = total + parseInt(producto.quantity * producto.price.slice(1));
        totalOfProducts = totalOfProducts + producto.quantity;
    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
};
