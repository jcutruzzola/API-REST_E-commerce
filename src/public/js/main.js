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
        card.classList = "container-fluid"
        card.innerHTML =
                         `
                            <div class="card" style="width: 18rem;">
                                <img src="..." class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${item.id} - ${item.title}</h5>
                                    <p class="card-text"> ${item.description}</p>
                                    <p class="card-text"> ${item.price}</p>
                                    <button class="btn btn-primary"> Eliminar </button>
                                </div>
                             </div>
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


/*   <p> ${item.id} </p>
                            <p> ${item.title} </p>
                            <p> ${item.description} </p>
                            <p> ${item.price} </p>
                            <button> Eliminar </button> */