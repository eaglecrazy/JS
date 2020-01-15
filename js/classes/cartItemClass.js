export default class {
    constructor(item) {
        this.title = item.title;
        if (!this.title) {
            this.title = item.product_name;
        }
        this.price = item.price;
        this.quantity = 1;
    }
}

