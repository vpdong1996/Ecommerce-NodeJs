module.exports = function Cart(oldCart) {
    // Khởi tạo constructor Cart
    this.items = oldCart.items || {};
    this.totalQuantity = oldCart.totalQuantity || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    // Hàm Add truyền vào 2 params Product & Product.ID 
    this.add = (item, id) => {
        let storeItem = this.items[id]; //Id product được add vào Cart 
        if(!storeItem) {
            storeItem = this.items[id] = {
                item,
                quantity: 0,
                price : 0
            };
        }
        storeItem.quantity++;
        storeItem.price = storeItem.quantity * storeItem.item.price;
        this.totalQuantity++;
        this.totalPrice += storeItem.item.price;
    };
    this.generateArray = function() {
        const arr = [];
        for (let id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    }
}