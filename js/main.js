/*
//ЧАТ
let admin = new User('Саймон Б.', 'Кoнсультант', true);
let user = new User('Пользователь сайта.', '', false);
let chat = new Chat(false, user, admin);
chat.addMessage(new Message('Не можете.', new Date, user));
chat.addMessage(new Message('Хорошо.', new Date, admin));

//КОРЗИНА
const cart = new Cart();

//ФОРМА
const form = new Form();

//ТОВАРЫ
const goods = new GoodsList();
goods.fillList();


//очистка мейна
const erase = function () {
    const root = document.querySelector('.main');
    root.innerHTML = '';
}

//события кнопок в хидере
const cartButton = document.querySelector('.cartButton');
cartButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    erase();
    cart.render();
});
const indexButton = document.querySelector('.indexButton');
indexButton.addEventListener('click', () => {
    erase();
    goods.filter('', true);
});
const formButton = document.querySelector('.formButton');
formButton.addEventListener('click', () => {
    erase();
    form.render();
});

const searchForm = document.querySelector('.searchForm');
const searchInput = document.querySelector('.searchInput');
searchForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    erase();
    if (searchInput.value === '') {
        goods.filter('', true);
    } else {
        goods.filter(searchInput.value, false);
    }
});
*/


/*1. Добавить методы и обработчики событий для поля поиска. Создать в объекте данных поле searchLine и привязать к нему содержимое поля ввода. На кнопку «Искать» добавить обработчик клика, вызывающий метод FilterGoods.
2. Добавить корзину. В html-шаблон добавить разметку корзины. Добавить в объект данных поле isVisibleCart, управляющее видимостью корзины.
3. *Добавлять в .goods-list заглушку с текстом «Нет данных» в случае, если список товаров пуст.*/

const app = new Vue({
    el: '#app',
    data: {
        url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',

        isVisibleGoodsList: true,
        goods: [],
        filteredGoods: [],
        searchLine: '',

        isVisibleCart: false,
        cart: []
        //        cartTotalQuantity: 0,
        //        cartTotalPrice: 0
    },
    methods: {
        //header
        buttonIndexClick(evt) {
            this.isVisibleGoodsList = true;
            this.isVisibleCart = false;
        },
        buttonCartClick(evt) {
            this.isVisibleGoodsList = false;
            this.isVisibleCart = true;
        },
        buttonSearchClick(evt) {
            evt.preventDefault();
            if (this.searchLine === '') {
                this.filter('', true);
            } else {
                this.filter(this.searchLine, false);
            }
        },

        //goodsList
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
        },
        fetchGoods() {
            let promice = this.makeGetRequest(`${this.url}/catalogData.json`);
            promice.then((newGoods) => {
                this.goods = newGoods.map(item => {
                    return new GoodsItem(item.product_name, item.price);
                });
                this.goods.forEach(item => {
                    this.filteredGoods.push(item);
                });
            }).catch((error) => {
                console.log('fetchGoods error');
            });
        },
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
        },
        productButtonClick(ewt) {
            const thisGood = this.goods.find((good) => {
                if (ewt.target.id === good.title) {
                    return good;
                }
            });
            this.cartAddItem(thisGood);
        },

        //cart
        cartAddItem(item) {
            let exists = this.cart.find((cartItem) => {
                if (cartItem.title === item.title) {
                    return cartItem;
                }
            });

            if (!exists) {
                let newItem = new CartItem(item);
                this.cart.push(newItem);
            } else {
                exists.quantity++;
            }
        },
        cartCrossClick(good) {             
            this.cart.splice(this.cart.indexOf(good), 1);
        }

    },
    computed: {
        cartTotalPrice() {
            return this.cart.reduce((sum, item) => {
                if (item.price) {
                    sum += item.price * item.quantity;
                }
                return sum;
            }, 0);
        },
        cartTotalQuantity() {
            return this.cart.reduce((sum, item) => {
                if (item.quantity) {
                    sum += parseInt(item.quantity);
                }
                return sum;
            }, 0);
        }
    },

    mounted() {
        this.fetchGoods();
    }
});
