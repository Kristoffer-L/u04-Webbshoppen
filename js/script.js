const mensClothingBtn = document.getElementById("mensClothing");
const womensClothingBtn = document.getElementById("womensClothing");
const jewelerybtn = document.getElementById("jewelery");
const electronicsBtn = document.getElementById("electronics");
const cardSection = document.getElementById("cardSection");
const cartIcon = document.getElementById("cartCaption");
const navBtns = document.querySelectorAll(".navBtn");
const cartDropdown = document.getElementById("cartDropdown");
const cartItems = document.getElementById("cartItems");
const navBurger = document.getElementById("navBurger");
const navList = document.getElementById("navList");
const navCart = document.getElementById("cart");
const apiLoading = document.getElementById("apiLoading");
const selectPR = document.getElementById("priceRating");

let inputValue = "";
async function getInfo() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("data", data);
    runner(data);
  } catch (error) {
    console.error("Error", error);
    apiLoading.textContent = "Something went wrong"
  }
}

getInfo();

function cartItemDisplay() {
  let itemContainer = 0;
  const itemArrayTracker = [];
  for (let i = 1; i <= 20; i++) {
    itemContainer = Number(localStorage.getItem(`${i}`));
    itemArrayTracker.push(itemContainer);
  }
  console.log(itemArrayTracker);
  const amountOfItems = itemArrayTracker.reduce((acc, current) => {
    return acc + current;
  });
  localStorage.setItem("totalItems", amountOfItems);
  cartIcon.textContent = amountOfItems;
  if (amountOfItems < 1) {
    cartIcon.classList.add("display-none");
  }
}

function renderHTML(data) {
  data.map(({ id, image, title, price, rating: { rate } }) => {
    const card = document.createElement("div");

    cardSection.appendChild(card);
    card.classList.add("card-container");
    card.innerHTML = `                
          <div>
            <img class="images" src="${image}">
          </div>
          <h1 class="card-headline">${title.slice(0, 20)}...</h1>  

          <button class="buy-btn" data-id="${id}">Buy</button>
          <div class="card-info-container">
            <p class="card-info-price">Price: €${price}</p>
            <p class="card-info-rate">Rating: ${rate}/5.0</p>
          </div>
        `;

    // Add to cart button
    const buyBtn = card.querySelector(".buy-btn");
    buyBtn.addEventListener("click", () => {
      cartIcon.classList.remove("display-none");
      let itemTracker = 0;
      itemTracker = Number(localStorage.getItem(`${id}`));
      itemTracker++;
      localStorage.setItem(`${id}`, itemTracker);
      cartItemDisplay();
      addToCart({ id, title, price, image });
    });
  });
}

function sortFunction(event, type, data) {
  cardSection.innerHTML = ` `;
  let selectedValue = event;

  gtag('event', 'change_sorting', {
    'event_category': 'Sorting products by price or rating',
    'event_label': `${selectedValue}`,
    'value': 2,
    'debug_mode': true
  });

  if (selectedValue === "highestPrice" || selectedValue === "lowestPrice") {
    const sortedData = data.sort((a, b) => (selectedValue === "lowestPrice" ? a.price - b.price : b.price - a.price));
    const filterSorted = filterData(sortedData, type);
    renderHTML(filterSorted);
  } else {
    const sortedData = data.sort((a, b) => (selectedValue === "lowestRating" ? a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate));
    const filterSorted = filterData(sortedData, type);
    renderHTML(filterSorted);
  }
}

function filterData(data, type) {
  if (type === "empty") {
    return data;
  }

  cardSection.innerHTML = ` `;

  typeCategory = data.filter((v) => {
    return v.category === `${type}`;
  });
  return typeCategory;
}

function runner(data) {
  apiLoading.classList.add("display-none")
  renderHTML(data);
  let type = "empty";
  const currentData = filterData(data, type);

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
        gtag('event', 'category_change', {
    'event_category': 'swapped category',
    'event_label': `${type}`,
    'value': 1,
    'debug_mode': true
  });
      renderHTML(filterData(data, type));
    });
  });

  selectPR.addEventListener("change", (event) => {
    inputValue = event.target.value;
    sortFunction(event.target.value, type, currentData);
  });
}

// Add to cart function with display items and remove buttons for each item
navCart.addEventListener("click", () => {
  cartDropdown.classList.toggle("hidden");
});

// Function to calculate the total amount for all items in the shopping cart - Therese
const calculateTotal = () => {
  shoppingCart = JSON.parse(localStorage.getItem("all"));
  const total = shoppingCart.reduce((acc, item) => acc + item.price, 0);
  const totalElement = document.getElementById("totalPrice");
  if (totalElement) {
    totalElement.textContent = `Total: €${total.toFixed(2)}`;
  }
  return total;
};

const updateCartDropdown = () => {
  cartItems.innerHTML = "";
  let shoppingCart = JSON.parse(localStorage.getItem("all"));
  console.log(shoppingCart);
  const uniqueItems = [...new Map(shoppingCart.map((v) => [v.id, v])).values()];

  uniqueItems.forEach(({ id, image, title, price }, index) => {
    console.log(id);
    const numberOfItems = Number(localStorage.getItem(`${id}`));
    // const numberOfItems = Number(localStorage.getItem(`${uniqueItems[index].id}`));
    // console.log(`${uniqueItems[index].id}`)

    const li = document.createElement("li");
    li.innerHTML = `
            <p>Amount ${numberOfItems}</p>
            <img class="cart-image" src="${image}" alt="${title}">
            ${title} - $${price}
            <button class="remove-btn" data-index="${index} "data-id="${id}">Remove</button> 
        `;
    cartItems.appendChild(li);
  });

  const removeButtons = cartItems.querySelectorAll(".remove-btn");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const objectID = event.target.dataset.id; //Get button index
      calculateTotal();
      itemTracker = Number(localStorage.getItem(`${objectID}`));
      itemTracker--;
      localStorage.setItem(`${objectID}`, itemTracker);
      const idx = shoppingCart.findIndex((e) => e.id == objectID);
      shoppingCart.splice(idx, 1);
      localStorage.setItem("all", JSON.stringify(shoppingCart));
      cartItemDisplay();

      updateCartDropdown();
    });
  });
  calculateTotal();
};

const addToCart = (product) => {
  //   shoppingCart.push(product);
  const storageCart = [];
  const previousCart = JSON.parse(localStorage.getItem("all"));

  if (previousCart !== null) {
    previousCart.forEach((e) => {
      storageCart.push(e);
    });
  }
  storageCart.push(product);

  // example
  // console.log(new Map(storageCart.map(v => [v.id, v])))

  // Maps through cart and creates 2d array of key value pairs, new Map() cant have duplicat keys
  // using id as the key and the object is our value. values() iterates through the values aka our object
  // and then the spread operator splits each object into an array element
  const uniqueItems = [...new Map(storageCart.map((v) => [v.id, v])).values()];

  console.log(uniqueItems);

  // makes array to reduce
  const cost = storageCart.map(({ price }) => {
    return price;
  });

  // calculates total price
  const total = cost.reduce((acc, current) => {
    return acc + current;
  });
  console.log(total.toFixed(2));
  localStorage.setItem("all", JSON.stringify(storageCart));
  updateCartDropdown();
  calculateTotal(); // Updates the total as it is added - Therese
};

let appendNav = true;
navBurger.addEventListener("click", () => {
  if (appendNav) {
    navList.classList.add("display-none");
    appendNav = false;
  } else {
    navList.classList.remove("display-none");
    appendNav = true;
  }
});

// Pressing outside the cart to close function
document.addEventListener("click", (event) => {
  // Check if the click is outside the cart and not on the remove button
  if (!cartDropdown.contains(event.target) && event.target !== navCart && !event.target.classList.contains("remove-btn")) {
    cartDropdown.classList.add("hidden");
  }
});
