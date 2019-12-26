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


/*
1. Вынести поиск в отдельный компонент.
2. Вынести корзину в отдельный компонент.
3. *Создать компонент с сообщением об ошибке. Компонент должен отображаться, когда не удаётся выполнить запрос к серверу.
*/

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
class GoodsItem {
    constructor(title = 'Без имени', price = 0) {
        this.title = title;
        this.price = price;
    }
}

const URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const fetchError = {
    name: 'fetch-error',
    props: ['visible'],
    template : `<div v-if="visible" class="goods-list-info">Не удалось получить список товаров с сервера.</div>`
}

const goodsItem = {
    name: 'goods-item',
    props: ['goods', 'good', 'cart'],
    template: `<div class="goods-item">
            <h3 class="goods-item-heading">{{ good.title }}</h3>
            <img class="item-image" src="img/game.jpg" width="250" height="156" v-bind:alt="good.title">
            <p class="goods-item-text">Цена: {{ good.price }} рублей</p>
            <button class="button" v-bind:id="good.title" @click="addItemToCart(good)">Добавить в корзину</button>
        </div>`,
    methods: {
        addItemToCart(item) {
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
    }
}

const goodsList = {
    name: 'goods-list',
    props: ['goods', 'filteredGoods', 'cart', 'visible', 'fetch-error'],
    //Тут тоже со свойствами непонятно. В index.html написано ":fetch-error="isVisibleFetchError", в компоненте свойство тоже называется 'fetch-error', а в отладчике оно вообще fetchError называется. Почему так?
    
    template: `<div class="goods-list" v-if="visible">
            <goods-item v-for="good in filteredGoods" :goods="filteredGoods" :good="good" :cart="cart" :key="good.title"></goods-item>
            <div class="goods-list-info" v-if="goodsListEmpty">Товаров не найдено.</div>
        </div>`,
    computed: {
        goodsListEmpty() {
            if(this.fetchError){
                return false;
            }
            return this.filteredGoods.length === 0;
        }
    },
    components: {
        goodsItem
    }
};

const search = {
    template: `<form class="searchForm">
        <input type="text" class="searchInput form-input" placeholder="" v-model="searchLine" >
        <button class="button searchButton" @click="buttonSearchClick">Поиск</button>
     </form>`,

    props: ['goods', 'filtered-goods'],//Я не понимаю, почему тут не важно как назвать свойство "filtered-goods" или "filteredGoods", всё работает и так и так. Объясните, пожалуйста этот момент.
    data() {
        return {
            searchLine: ''
        }
    },
    methods: {
        buttonSearchClick(evt) {
            evt.preventDefault();
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods.splice(0, this.filteredGoods.length);
            this.goods.forEach((currentItem) => {
                if (regexp.test(currentItem.title)) {
                    this.filteredGoods.push(currentItem);
                }
            });
        },
    }
}

const cartItem = {
    props: ['good', 'cart'],
    template: `<div class="cart-item">
                    <img class="item-image" src="img/game.jpg" width="250" height="156" v-bind:alt="good.title">
                    <div class="cart-item-info">
                        <h3 class="goods-item-heading">{{ good.title }}</h3>
                        <p class="goods-item-text cart-item-price">Цена: {{ good.price }} рублей.</p>
                        <input v-model="good.quantity" type="number" min="1" max="99" class="cart-item-quantity">
                    </div>
                    <svg class="cart-item-cross" viewBox="0 0 52 52" @click="cartCrossClick(good)">
                        <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z" />
                        <path d="M35.707,16.293c-0.391-0.391-1.023-0.391-1.414,0L26,24.586l-8.293-8.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L24.586,26l-8.293,8.293c-0.391,0.391-0.391,1.023,0,1.414C16.488,35.902,16.744,36,17,36s0.512-0.098,0.707-0.293L26,27.414l8.293,8.293C34.488,35.902,34.744,36,35,36s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L27.414,26l8.293-8.293C36.098,17.316,36.098,16.684,35.707,16.293z" /></svg>
                </div>`,
    methods: {
        cartCrossClick(good) {
            this.cart.splice(this.cart.indexOf(good), 1);
        },
    }
}

const cart = {
    name: 'cart',
    props: ['visible', 'cart'],
    template: `<div class="cart-wrapper" v-if="visible">
            <div class="cart-items">
                <cartItem v-for="good in cart" :cart="cart" :good="good" :key="good.title"></cartItem>
            </div>
            <div class="cart-info">
                <span class="cart-info-text">Всего товаров:</span><span class="cart-info-text cart-info-quantity">{{ cartTotalQuantity }} шт.</span>
                <span class="cart-info-text">Общая стоимость:</span><span class="cart-info-text cart-info-price">{{ cartTotalPrice }} руб.</span>
                <button class="button cart-issue-button">Перейти к оформлению</button>
            </div>
        </div>`,
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
    components: {
        cartItem
    }
}

const app = new Vue({
    el: '#app',
    data: {
        isVisibleGoodsList: true,
        goods: [],
        filteredGoods: [],
        isVisibleCart: false,
        cart: [],
        isVisibleFetchError: false
    },
    methods: {
        //header
        buttonIndexClick() {
            this.isVisibleGoodsList = true;
            this.isVisibleCart = false;
        },
        buttonCartClick() {
            this.isVisibleGoodsList = false;
            this.isVisibleCart = true;
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
            let promice = this.makeGetRequest(`${URL}/catalogData.json`);
            promice.then((newGoods) => {
                this.goods = newGoods.map(item => {
                    return new GoodsItem(item.product_name, item.price);
                });
                this.goods.forEach(item => {
                    this.filteredGoods.push(item);
                });
            }).catch((error) => {
                console.log('fetchGoods error');
                this.isVisibleFetchError = true;
            });
        },
    },
    mounted() {
        this.fetchGoods();
    },
    components: {
        goodsList,
        search,
        cart,
        fetchError
    }
});
