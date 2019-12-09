/* jslint white: true */
/*eslint-env browser*/
/*eslint no-console: 0*/

class GoodsItem {
    constructor(title = 'Без имени', price = 0) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3 class="goods-item-heading">${this.title}</h3><img class="item-image" src="img/game.jpg" width="250" height="156" alt="${this.title}"><p class="goods-item-text">Цена: ${this.price} рублей</p><button class="button">Добавить в корзину</button></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [{
                title: 'Mario',
                price: 150
        }, {
                title: 'Castlevania',
                price: 200
        }, {
                title: 'Battletoads',
                price: 180
        }, {
                title: 'Contra',
                price: 140
        }];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

const l = new GoodsList();
l.fetchGoods();
l.render();
