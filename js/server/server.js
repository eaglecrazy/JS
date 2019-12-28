//1. Привязать добавление товара в корзину к реальному API.
//2. Добавить API для удаления товара из корзины.
//3. *Добавить файл stats.json, в котором будет храниться статистика действий пользователя с корзиной. В файле должны быть поля с названием действия (добавлено/удалено), названием товара, с которым производилось действие и временем, когда оно было совершено.

class CartItem {
    constructor(item) {
        this.title = item.title;
        if(!this.title){
            this.title = item.product_name;
        }
        this.price = item.price;
        this.quantity = 1;
    }
}

const cartFileName = 'data/cart.json';

const cart = {
    addItem(item) {
        let cart = [];
        
        if (fs.existsSync(cartFileName)) {
            try {
                let data = fs.readFileSync(cartFileName, 'utf-8');
                cart = JSON.parse(data);
            } catch {
                return 500;
            }
        }
                
        let exists = cart.find((cartItem) => {
            if (cartItem.title === item.title) {
                return cartItem;
            }
        });

        if (!exists) {
            let newItem = new CartItem(item);
            cart.push(newItem);
        } else {
            exists.quantity++;
        }

        cartString = JSON.stringify(cart); 

        try {
            fs.writeFileSync(cartFileName, cartString);
            return 200;

        } catch {
            return 500;
        }



    },

    removeItem(itemTitle) {
        let i;
        for (i = 0; i < this.cart.length; i++) {
            if (this.cart[i].title === itemTitle) {
                break;
            }
        }
        if (i !== undefined) {
            this.cart.splice(i, 1);
        }
    }
};




const PORT = 3000;
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');


const app = express();
app.use(express.static('../../'));
app.use(bodyParser.json());


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



app.get('/catalog', (req, res) => {
    console.log('GET request')
    fs.readFile('data/catalog.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404);
        }
        res.send(data);
    })
});



app.post('/cart', (req, res) => {
    console.log('POST requеst');
    const item = req.body;
    res.sendStatus(cart.addItem(item));

    
    

    //    let cart = [];
    //    if (fs.existsSync(cartFileName)) {
    //        try {
    //            data = fs.readFileSync(cartFileName, 'utf-8');
    //            cart = JSON.parse(data);
    //        } catch {
    //            res.sendStatus(500);
    //        }
    //    }
    //    cart.push(item); //тут нужно добавлять уникальные значения
    //
    //    console.log('корзина:');
    //    console.log(cart);
    //
    //    try {
    //        fs.writeFileSync(cartFileName, JSON.stringify(cart));
    //        res.sendStatus(200);
    //
    //    } catch {
    //        res.sendStatus(500);
    //    }
});







//addItemToCart(item) {
//    let exists = this.cart.find((cartItem) => {
//        if (cartItem.title === item.title) {
//            return cartItem;
//        }
//    });
//
//    if (!exists) {
//        let newItem = new CartItem(item);
//        this.cart.push(newItem);
//    } else {
//        exists.quantity++;
//    }
//},
