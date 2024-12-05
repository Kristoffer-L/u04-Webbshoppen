async function getInfo() {
    try {
        const response = await fetch("./json/data.jsons")
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
    data.map((Data) => {
        const card = document.createElement("div")
        document.querySelector(".section").appendChild(card)
        card.innerHTML = `<div>${Data}</div>`
    })
}