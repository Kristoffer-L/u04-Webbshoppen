const mensClothingBtn = document.getElementById("mensClothing");
const womensClothingBtn = document.getElementById("womensClothing");
const jewelerybtn = document.getElementById("jewelery");
const electronicsBtn = document.getElementById("electronics");
const cardSection = document.getElementById('cardSection');
const navBtns = document.querySelectorAll('.navBtn');
console.log(navBtns);

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
                <p class="card-title">${title}</p>  
                <p>Price: ${price} </p>
                <p>Rating: ${rate}/5.0</p>
                <button>Buy</button>
                `;

    })

}

function filterData (data, type) {
    cardSection.innerHTML = ` `;
    const mensClothing = data.filter((v) => {
        return v.category === `${type}`;
    }) 
    return mensClothing;
};



function runner (data) {
    renderHTML(data);
    let type;
    navBtns.forEach((e) => {
        e.addEventListener('click', (event) => {

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

};







