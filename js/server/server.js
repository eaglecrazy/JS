//1. Привязать добавление товара в корзину к реальному API.
//2. Добавить API для удаления товара из корзины.
//3. *Добавить файл stats.json, в котором будет храниться статистика действий пользователя с корзиной. В файле должны быть поля с названием действия (добавлено/удалено), названием товара, с которым производилось действие и временем, когда оно было совершено.

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
    console.log('GET');
    fs.readFile('data/catalog.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404);
        }
        res.send(data);
    })
});

const cartFileName = 'data/cart.json';

app.post('/cart', (req, res) => {

    const item = req.body;
    let cart = [];
    if (fs.existsSync(cartFileName)) {
        try {
            data = fs.readFileSync(cartFileName, 'utf-8');
            cart = JSON.parse(data);
        } catch {
            res.sendStatus(500);
        }
    }
    cart.push(item); //тут нужно добавлять уникальные значения

    console.log('будем добавлять в файл');
    console.log(cart);

    fs.writeFileSync(cartFileName, JSON.stringify(cart), (err) => {
        if (err) {
            res.sendStatus(500);
        }
        res.sendStatus(200);
    });
});
