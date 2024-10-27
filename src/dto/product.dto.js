
class ProductDTO {
    constructor(data){

        this.title = data.title;
        this.description = data.description;
        this.price = data.price;
        this.code = data.code;
        this.stock = data.stock;
        this.category = data.category;
        this.status = true;
        this.thumnails = data.thumbnails;

    }

}

module.exports = ProductDTO;
