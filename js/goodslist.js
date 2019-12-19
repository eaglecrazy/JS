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
                    <button class="button" id="${this.title}">Добавить в корзину</button>
                </div>`;
    }
}

class GoodsList {

    constructor() {
        this.url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
        this.goods = [];
        this.filteredGoods = [];
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
        return new Promise((resolve, reject) => {
            let promice = this.makeGetRequest(`${this.url}/catalogData.json`);
            promice.then((newGoods) => {
                this.goods = newGoods.map(item => {
                    return new GoodsItem(item.product_name, item.price);
                });

                this.goods.forEach(item => {
                    this.filteredGoods.push(item);
                });
                
                resolve();
            }).catch((error) => {
                reject('fetchGoods error');
            });
        });
    }

    filter(searchText, allItems) {
        if (allItems) { //вывод всех товаров
            this.filteredGoods = this.goods.map((good) => {
                return new GoodsItem(good.title, good.price);
            });
            
        } else {
            const regexp = new RegExp(searchText, 'i');
            this.filteredGoods = this.goods.filter((good) => {
                return regexp.test(good.title);
            });
        }
        this.render();
    }


    render() {
        let listHtml = '<div class="goods-list">';
        this.filteredGoods.forEach(good => {
            listHtml += good.render();
        });
        document.querySelector('.main').innerHTML = listHtml + '</div>';
        this.addEvents();
    }

    fillList() {
        let promice = this.fetchGoods();
        promice.then(() => {
            this.render();
        }).catch((error) => {
            console.log('fillList error');
        });
    }

    addEvents() {
        const buttons = document.querySelectorAll('.goods-list .button');
        const me = this;
        buttons.forEach(button => {
            button.addEventListener('click', (ewt) => {
                let thisGood = me.goods.find((good) => {
                    if (ewt.target.id === good.title) {
                        return good;
                    }
                });
                cart.addItem(thisGood);
            });
        });
    }
}









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
