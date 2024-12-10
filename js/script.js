const mensClothingBtn = document.getElementById("mensClothing");
const womensClothingBtn = document.getElementById("womensClothing");
const jewelerybtn = document.getElementById("jewelery");
const electronicsBtn = document.getElementById("electronics");
const cardSection = document.getElementById("cardSection");
const cartIcon = document.getElementById("cartCaption");
const navBtns = document.querySelectorAll(".navBtn");
let buyItems = 0;

const selectPR = document.getElementById('priceRating');

// Shoppingcart with products array
let shoppingCart = [];

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
    // counts occurences of same item;   
      let itemTracker = 0;
      itemTracker = Number(localStorage.getItem(`${id}`));
      itemTracker++;
      localStorage.setItem(`${id}`, itemTracker);
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

function sortFunction (event, type, data) {
    cardSection.innerHTML = ` `;
    let selectedValue = event;    
    
    if (selectedValue === 'highestPrice' || selectedValue === 'lowestPrice') {

        const sortedData = data.sort((a, b) => (selectedValue === 'lowestPrice' ?   a.price - b.price : b.price - a.price));
        const filterSorted = filterData(sortedData, type);
        renderHTML(filterSorted);
    
    } else {

        const sortedData = data.sort((a, b) => (selectedValue === 'lowestRating' ?  a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate));
        const filterSorted = filterData(sortedData, type);
        renderHTML(filterSorted);

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

// Add to cart function
const addToCart = (product) => {
    // puts cart in localStorage
    const storageCart = [];
    const previousCart = JSON.parse(localStorage.getItem('all'));

    if (previousCart !== null) {
        previousCart.forEach(e => {
            storageCart.push(e);
        })  
    }
    storageCart.push(product);

    // example
    console.log(new Map(storageCart.map(v => [v.id, v])))
    // Maps through cart and creates 2d array of key value pairs, new Map() cant have duplicat keys
    // using id as the key and the object is our value. values() iterates through the values aka our object 
    // and then the spread operator splits each object into an array element
    const uniqueItems = [...new Map(storageCart.map(v => [v.id, v])).values()];

    console.log(uniqueItems);
 

    // makes array to reduce
    const cost = storageCart.map(({price}) => {
        return price;
    });

    // calculates total price
    const total = cost.reduce((acc, current) => {
    
        return acc + current;
    });
    console.log(total.toFixed(2));
    localStorage.setItem('all', JSON.stringify(storageCart));
    shoppingCart.push(product);
};


