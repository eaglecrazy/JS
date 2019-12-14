//1. Переделайте makeGETRequest() так, чтобы она использовала промисы.
//2. Добавьте в соответствующие классы методы добавления товара в корзину, 
//удаления товара из корзины и получения списка товаров корзины.
//3* Переделайте GoodsList так, чтобы fetchGoods() возвращал промис, 
//а render() вызывался в обработчике этого промиса.


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
        this.url  = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
        this.goods = [];
    }

    makeGetRequest(url) {
        return new Promise((resolve, reject) => {
            let xhr;
            if (window.XMLHttpRequest) {
                xhr = new window.XMLHttpRequest();
            } else {
                xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject('Error')
                    }
                }
            }
            xhr.open('GET', url);
            xhr.send();
        });
    }

    fetchGoods() {
        //        this.goods = [{
        //            title: 'Mario',
        //            price: 150
        //        }, {
        //            title: 'Castlevania',
        //            price: 200
        //        }, {
        //            title: 'Battletoads',
        //            price: 180
        //        }, {
        //            title: 'Contra',
        //            price: 140
        //        }];
        let promice = this.makeGetRequest(`${this.url}/catalogData.json`);
        promice.then((goods) => {
            this.goods = goods;
            console.log('FETCH');
            console.log(this.goods);
            this.render();
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

const l = new GoodsList();
//l.fetchGoods();
