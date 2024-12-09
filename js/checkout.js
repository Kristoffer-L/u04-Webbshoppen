const cart = [{ id: 3, title: "Mens Cotton Jacket", price: 55.99, image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg" }];

const cartItem = document.getElementById("cartItem");

cart.map(({ id, image, title, price }) => {
  cartItem.innerHTML = `
            <img class="cart-item-img" src="${image}" alt="cart item" />
            <div>
              <h2>${title}</h2>
              <p>price: ${price}</p>
              <p>antal:</p>
            </div>`;
});
