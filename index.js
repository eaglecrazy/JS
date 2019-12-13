//1. Переделайте makeGETRequest() так, чтобы она использовала промисы.
//2. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.
//3* Переделайте GoodsList так, чтобы fetchGoods() возвращал промис, а render() вызывался в обработчике этого промиса.

class GoodsItem {
    constructor(title = 'Без имени', price = 0) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item">
                    <h3 class="goods-item-heading">${this.title}</h3>
                    <img class="item-image" src="img/game.jpg" width="250" height="156" alt="${this.title}">
                    <p class="goods-item-text">Цена: ${this.price} рублей</p>
                    <button class="button">Добавить в корзину</button>
                </div>`;
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

class Cart {
    constructor() {
        this.goods = [];
    }
    addItem(item) {
        this.goods.push(item);
    }
    removeItem(itemTitle) {
        let i;
        for (i = 0; i < this.goods.length; i++) {
            if (this.goods[i].title === itemTitle) {
                break;
            }
        }
        if (i !== undefined) {
            this.goods.splice(i, 1);
        }
    }
    totalPrice(){
        return this.goods.reduce((sum, item) => {
            if(item.price){
                sum += item.price; 
            }
            return sum;
        }, 0);
        
    }
    clean() {
        this.goods = [];
    }
}

/*
1. Добавил класс "корзина". В этом классе нужны методы: конструктор, добавление товара, удаление товара и вывод полной стоимости всех товаров. Для элемента корзины товаров новая сущность пока не нужна, можно вполне использовать класс GoodsItem.

2. Метод, определяющий суммарную стоимость всех товаров гораздо более актуален для корзины, поэтому я добавил его туда. Метод "costAllItems"
*/

const l = new GoodsList();
l.fetchGoods();
l.render();

const b = new Cart();
b.addItem(l.goods[2]);
b.addItem(l.goods[3]);
console.log(b.goods);
console.log(b.totalPrice());
b.removeItem(l.goods[2].title);
console.log(b.goods);
