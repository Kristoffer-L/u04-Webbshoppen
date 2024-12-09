const mensClothingBtn = document.getElementById("mensClothing");
const womensClothingBtn = document.getElementById("womensClothing");
const jewelerybtn = document.getElementById("jewelery");
const electronicsBtn = document.getElementById("electronics");
const cardSection = document.getElementById('cardSection');
const cartIcon = document.getElementById('cartCaption');
const navBtns = document.querySelectorAll('.navBtn');
const cartDropdown = document.getElementById("cartDropdown");
const cartItems = document.getElementById('cartItems');
let buyItems = 0;

const selectPR = document.getElementById('priceRating');

// Shoppingcart with products array
let shoppingCart = [];
console.log(shoppingCart);

let inputValue = "";



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
          <p>${title.slice(title.length = 0, 20) + "..."}</p>  
          <p>Price: ${price} </p>
          <p>Rating: ${rate}/5.0</p>
          <button class="buy-btn" data-id="${id}">Buy</button>
        `;
  
      // Add to cart button
      const buyBtn = card.querySelector(".buy-btn");
      buyBtn.addEventListener("click", () => {
        addToCart({ id, title, price, image });
        console.log("Shopping Cart:", shoppingCart); // Debugging

        cartIcon.classList.remove("display-none")
        buyItems += 1;
        cartIcon.textContent = buyItems
        console.log("buyItems", buyItems)
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

function sortFunction (event, type, data) {
    cardSection.innerHTML = ` `;
    let selectedValue = event;    
    
    if (selectedValue === 'highestPrice' || selectedValue === 'lowestPrice') {

        const sortedData = data.sort((a, b) => (selectedValue === 'lowestPrice' ?   a.price - b.price : b.price - a.price));
        renderHTML(sortedData);
    
    } else {

        const sortedData = data.sort((a, b) => (selectedValue === 'lowestRating' ?  a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate));
        renderHTML(sortedData);

    }

}

function filterData (data, type) {
    if (type === 'empty') {
        return data;
    }

    cardSection.innerHTML = ` `;

    typeCategory = data.filter((v) => {
        return v.category === `${type}`;
    }) 
    return typeCategory;
};




function runner (data) {
    renderHTML(data);
    let type = 'empty';
    const currentData = filterData(data, type);
    
    navBtns.forEach((e) => {
        e.addEventListener('click', (event) => {
            console.log('button press')
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
            };
        renderHTML(filterData(data, type));
        })

    });
    selectPR.addEventListener('change', (event) => {
        inputValue = event.target.value;
        sortFunction(event.target.value , type, currentData);

        
    });


};

// Add to cart function with display items and remove buttons for each item
cartIcon.addEventListener("click", () => {
    cartDropdown.classList.toggle("hidden");
});

const updateCartDropdown = () => {
    cartItems.innerHTML = ""; 
    shoppingCart.forEach((item, index) => {
        const li = document.createElement("li"); 
        li.innerHTML = `
            <img class="cart-image" src="${item.image}" alt="${item.title}">
            ${item.title} - $${item.price}
            <button class="remove-btn data-index="${index}">Remove</button> 
        `; 
        cartItems.appendChild(li); 
    });

    const removeButtons = cartItems.querySelectorAll(".remove-btn");
    removeButtons.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            const index = event.target.dataset.index; //Get button index
            shoppingCart.splice(index, 1);
            updateCartDropdown();
        })
    })
};

const addToCart = (product) => {
    shoppingCart.push(product);
    updateCartDropdown();
};

// Pressing outside the cart to close function
document.addEventListener("click", (event) => {
    if (!cartDropdown.contains(event.target) && event.target !== cartIcon) {
        cartDropdown.classList.add("hidden");
    }
})

