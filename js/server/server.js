//1. Привязать добавление товара в корзину к реальному API.
//2. Добавить API для удаления товара из корзины.
//3. *Добавить файл stats.json, в котором будет храниться статистика действий пользователя с корзиной. В файле должны быть поля с названием действия (добавлено/удалено), названием товара, с которым производилось действие и временем, когда оно было совершено.

const cartFileName = 'data/cart.json';
const cartLogFileName = 'data/cart-log.json';

class CartItem {
    constructor(item) {
        this.title = item.title;
        if (!this.title) {
            this.title = item.product_name;
        }
        this.price = item.price;
        this.quantity = 1;
    }
}

class Message {
    constructor(str) {
        this.message = str;
        this.time = new Date();
    }
}

const cart = {
    log(message) {
        console.log('LOG ' + message);
        let log = [];
        if (fs.existsSync(cartLogFileName)) {
            try {
                let data = fs.readFileSync(cartLogFileName, 'utf-8');
                log = JSON.parse(data);
            } catch {
                console.log('LOG ошибка чтения файла');
            }
        }
        log.push(new Message(message));
        try {
            fs.writeFileSync(cartLogFileName, JSON.stringify(log));
        } catch {
            console.log('LOG ошибка записи файла');
        }
    },

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

        const newItem = new CartItem(item);
        cart.push(newItem);

        try {
            fs.writeFileSync(cartFileName, JSON.stringify(cart));
            this.log('Добавлен товар: ' + newItem.title + ', количество: ' + newItem.quantity);
            return 200;

        } catch {
            return 500;
        }
    },

    removeItem(item) {
        let cart = [];

        if (fs.existsSync(cartFileName)) {
            try {
                let data = fs.readFileSync(cartFileName, 'utf-8');
                cart = JSON.parse(data);
            } catch {
                return 500;
            }
        }
        let cartItem = cart.find((cartItem) => {
            if (cartItem.title === item.title) {
                return cartItem;
            }
        });
        if (!cartItem) {
            return 500;
        } else {
            cart.splice(cart.indexOf(cartItem), 1);
        }

        try {
            fs.writeFileSync(cartFileName, JSON.stringify(cart));
            this.log('Удалён товар: ' + cartItem.title);
            return 200;

        } catch {
            return 500;
        }
    },

    changeItem(item) {
        let cart = [];

        if (fs.existsSync(cartFileName)) {
            try {
                let data = fs.readFileSync(cartFileName, 'utf-8');
                cart = JSON.parse(data);
            } catch {
                return 500;
            }
        }

        let cartItem = cart.find((cartItem) => {
            if (cartItem.title === item.title) {
                return cartItem;
            }
        });

        if (!cartItem) {
            return 500;
        } else {
            cartItem.quantity = item.quantity;
        }

        try {
            fs.writeFileSync(cartFileName, JSON.stringify(cart));
            this.log('Изменён товар: ' + cartItem.title + ', количество: ' + cartItem.quantity);
            return 200;

        } catch {
            return 500;
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
    console.log('GET request /catalog')
    fs.readFile('data/catalog.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404);
        }
        res.send(data);
    })
});



app.get('/cart', (req, res) => {
    console.log('GET request /cart');
    let cart = [];
    if (fs.existsSync(cartFileName)) {
        try {
            let data = fs.readFileSync(cartFileName, 'utf-8');
            cart = JSON.parse(data);
        } catch {
            res.sendStatus(500);
        }
    }
    res.send(cart);
});


app.post('/cart-add', (req, res) => {
    const item = req.body;
    console.log('POST requеst /cart-add ' + item.title);
    res.sendStatus(cart.addItem(item));
});


app.post('/cart-remove', (req, res) => {
    const item = req.body;
    console.log('POST requеst /cart-remove ' + item.title);
    res.sendStatus(cart.removeItem(item));
});


app.post('/cart-change', (req, res) => {
    const item = req.body;
    console.log('POST requеst /cart-change ' + item.title);
    res.sendStatus(cart.changeItem(item));
});
