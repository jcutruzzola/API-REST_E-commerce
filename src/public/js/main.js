const socket = io();


socket.on("productos", (data) => {
    console.log(data);

    productsRender(data);

})


const productsRender = products => {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";

    products.forEach(item => {
        const card = document.createElement("div");
        card.innerHTML = `
                            <p> ${item.id} </p>
                            <p> ${item.title} </p>
                            <p> ${item.description} </p>
                            <p> ${item.price} </p>
                            <button> Eliminar </button>
                        
                        `

    
        productsContainer.appendChild(card);


        const button = card.querySelector("button");

        button.addEventListener("click", () => {
                deleteProduct(item.id)


        })

    })

}


const deleteProduct = (id) => {
    socket.emit("deleteProduct", id);

}