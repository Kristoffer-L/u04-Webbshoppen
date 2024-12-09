const mensClothingBtn = document.getElementById("mensClothing");
const womensClothingBtn = document.getElementById("womensClothing");
const jewelerybtn = document.getElementById("jewelery");
const electronicsBtn = document.getElementById("electronics");
const cardSection = document.getElementById("cardSection");
const cartIcon = document.getElementById("cartCaption");
const navBtns = document.querySelectorAll(".navBtn");
let buyItems = 0;
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
          <h1 class="card-headline">${title.slice(0, 20)}</h1>  
          <button class="buy-btn" data-id="${id}">Buy</button>
          <div class="card-info-container">
            <p class="card-info-price">Price: €${price}</p>
            <p class="card-info-rate">Rating: ${rate}/5.0</p>
          </div>
        `;

    // Add to cart button
    const buyBtn = card.querySelector(".buy-btn");
    buyBtn.addEventListener("click", () => {
      addToCart({ id, title, price });
      console.log("Shopping Cart:", shoppingCart); // Debugging

      cartIcon.classList.remove("display-none");
      buyItems += 1;
      cartIcon.textContent = buyItems;
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
