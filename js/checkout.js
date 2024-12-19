const submitBtn = document.getElementById("submitBtn");
const cart = JSON.parse(localStorage.all);
const articleCart = document.querySelector(".article-cart");
const uniqueItems = [...new Map(cart.map((v) => [v.id, v])).values()];

submitBtn.addEventListener("click", () => {
  gtag('event', 'button_click', {
    'event_category': 'interactions on product buy button',
    'event_label': 'buying products from cart',
    'value': 1,
    'debug_mode': true
  });
})

const prices = cart.map((v) => {
  return v.price;
});

console.log(prices);
const total = prices.reduce((acc, cur) => {
  return acc + cur;
});

function cartItemAndPrice() {
  uniqueItems.map(({ id, image, title, price }) => {
    const card = document.createElement("div");
    const itemTracker = localStorage.getItem(`${id}`);
    articleCart.appendChild(card);
    card.classList.add("cart-item");
    card.innerHTML = `
            <img class="cart-item-img" src="${image}" alt="cart item" />
            <div>
              <h2>${title}</h2>
              <p>price: €${price}</p>
              <p>antal: ${itemTracker}</p>
            </div>`;
  });
  const price = document.createElement("div");
  articleCart.appendChild(price);
  price.innerHTML = `
  <p class="cart-price">amount: €${total.toFixed(2)}</p>
  `;
}
cartItemAndPrice();

console.log(total.toFixed(2));
