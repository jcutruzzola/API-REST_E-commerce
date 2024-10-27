
const totalCalc = (products) => {
    let total = 0;

    products.forEach(item => {
        total += item.product.price * item.quantity;

    });

    return total;
};

const randomCode = (length) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;

    while(counter < length){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }

    return result;
}

module.exports = { totalCalc, randomCode}
