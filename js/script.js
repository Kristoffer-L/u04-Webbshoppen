const mensClothingBtn = document.getElementById("mensClothing");
const womensClothingBtn = document.getElementById("womensClothing");
const jewelerybtn = document.getElementById("jewelery");
const electronicsBtn = document.getElementById("electronics");
const cardSection = document.getElementById('cardSection');
const navBtns = document.querySelectorAll('.navBtn');
const selectPR = document.getElementById('priceRating');

async function getInfo() {
    try {
        const response = await fetch("./json/data.json")
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        console.log("data", data)
        runner(data);
    } catch(error) {
        console.error("Error", error);
    }
}

getInfo()

function renderHTML(data) {
    
    data.map(({image, title, price, rating:{rate}}) => {
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
                <button>Buy</button>
                `;

    })

}

function filterData (data, type) {
    if (type === 'empty') {
        return data;
    }
    cardSection.innerHTML = ` `;

    const typeCategory = data.filter((v) => {
        return v.category === `${type}`;
    }) 
    console.log(typeCategory);
    return typeCategory;
};




function runner (data) {
    renderHTML(data);
    let type = 'empty';

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
        cardSection.innerHTML = ` `;
         
        let selectedValue = 'lowestRating';
        // const selectedValue = event.target.value;
        console.log(selectedValue);
        if (selectedValue === 'highestPrice' || 'lowestPrice') {
            console.log('changed price');
            const sortedData = filterData(data, type).sort((a, b) => (selectedValue === 'lowestPrice' ?   a.price - b.price : b.price - a.price));
            renderHTML(sortedData);

        } else {
            console.log('changed rating');
            console.log(selectedValue);
            const sortedData = filterData(data, type).sort((a, b) => (console.log('a', a.rating.rate), console.log('b', b.rating.rate), selectedValue === 'lowestRating' ?  a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate));
            renderHTML(sortedData);
        }

        
    });


};







