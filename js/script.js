const mensClothingBtn = document.getElementById("mensClothing");
const womensClothingBtn = document.getElementById("womensClothing");
const jewelerybtn = document.getElementById("jewelery");
const electronicsBtn = document.getElementById("electronics");

const cardSection = document.getElementById('cardSection');
const cartIcon = document.getElementById('cartCaption');
const buyBtn = document.getElementById('cardSection');
const navBtns = document.querySelectorAll('.buyBtn');
console.log(navBtns);

// Shoppingcart with products array
let shoppingCart = [];
console.log(shoppingCart);

async function getInfo() {
  try {
    const response = await fetch("./json/data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("data", data);
    runner(data);
  } catch (error) {
    console.error("Error", error);
  }
}

getInfo();

function renderHTML(data) {
    data.map(({ id, image, title, price, rating: { rate } }) => {
      const card = document.createElement("div");
  
      cardSection.appendChild(card);
      card.classList.add("card-container");
      card.innerHTML = `                
          <div>
            <img class="images" src="${image}">
          </div>
          <p>${title}</p>  
          <p>Price: ${price} </p>
          <p>Rating: ${rate}/5.0</p>
          <button class="buy-btn" data-id="${id}">Buy</button>
        `;
  
      // Add to cart button
      const buyBtn = card.querySelector(".buy-btn");
      buyBtn.addEventListener("click", () => {
        addToCart({ id, title, price });
        console.log("Shopping Cart:", shoppingCart); // Debugging
      });
    });
  }
  
function filterData(data, type) {
  cardSection.innerHTML = ` `;
  const mensClothing = data.filter((v) => {
    return v.category === `${type}`;
  });
  return mensClothing;

}

function runner(data) {
  renderHTML(data);
  let type;
  navBtns.forEach((e) => {
    e.addEventListener("click", (event) => {
      const typeCategory = `${event.target.id}`;

      switch (typeCategory) {
        case "womensClothing":
          type = "women's clothing";
          break;
        case "mensClothing":
          type = "men's clothing";
          break;
        case "electronics":
          type = "electronics";
          break;
        case "jewelery":
          type = "jewelery";
          break;
      }
      renderHTML(filterData(data, type));
    });
  });
}

// Add to cart function
const addToCart = (product) => {
  shoppingCart.push(product);
};
let buyItems = 0;
buyBtn.addEventListener("click", () => {
    cartIcon.classList.remove("display-none")
    cartIcon.textContent = buyItems
    console.log("buyItems", buyItems)
    buyItems += 1;
})

