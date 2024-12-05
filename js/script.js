const mensClothingBtn = document.getElementById("mensClothing")
const womensClothingBtn = document.getElementById("womensClothing")
const jewelerybtn = document.getElementById("jewelery")
const electronicsBtn = document.getElementById("electronics")

async function getInfo() {
    try {
        const response = await fetch("./json/data.json")
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        console.log("data", data)
        renderHTML(data);
    } catch(error) {
        console.error("Error", error);
    }
}

getInfo()

function renderHTML(data) {
    
    data.map(({image, title, price, rating:{rate}}) => {
        const card = document.createElement("div")
        document.querySelector(".section").appendChild(card)
        card.classList.add("card-container")
        card.innerHTML += `                
                <div>
                    <img class="images" src="${image}">
                </div>
                <p>${title}</p>  
                <p>Price: ${price} </p>
                <p>Rating: ${rate}/5.0</p>
                <button>Buy</button>
                `

    })
    mensClothingBtn.addEventListener("click", () => {
        console.log(data)
        const mensClothing = data.filter((v) => {
            return v.category === "men's clothing";
        }) 
        renderHTML(mensClothing);
    });
}








