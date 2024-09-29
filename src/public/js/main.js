const socket = io();


socket.on("productos", (data) => {
    // console.log(data);

    productsRender(data.docs);

})


const productsRender = products => {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";
    productsContainer.classList = "container-fluid"

    products.forEach(item => {
        const card = document.createElement("div");
        card.classList = "container-fluid"
        card.innerHTML =
                         `
                            <div class="card" style="width: 18rem;">
                                <img src="..." class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${item._id} - ${item.title}</h5>
                                    <p class="card-text"> ${item.description}</p>
                                    <p class="card-text"> ${item.price}</p>
                                    <button class="btn btn-primary"> Eliminar </button>
                                </div>
                             </div>
                          `


    
        productsContainer.appendChild(card);


        const button = card.querySelector("button");

        button.addEventListener("click", () => {
                deleteProduct(item._id)


        })

    })

}


const deleteProduct = (id) => {
    socket.emit("deleteProduct", id);

}



const form = document.getElementById("add-products-form");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    let title = document.getElementById("product-input").value;
    let description = document.getElementById("product-description").value;
    let price = document.getElementById("product-price").value;
    let code = document.getElementById("product-code").value;
    let stock = document.getElementById("product-stock").value;
    let img = document.getElementById("product-img").value;
    let category = document.getElementById("product-category").value;


     e ? socket.emit("newProduct", { title, description, price, code, stock, img, category }) : console.log("Faltan datos en alguno de los campos");
     

     form.reset();
})

