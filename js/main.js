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

var number = 1;

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
class GoodsItem {
    constructor(title = 'Без имени', price = 0) {
        this.title = title;
        this.price = price;
    }
}

//const URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const fetchError = {
    name: 'fetch-error',
    props: ['visible'],
    template: `<div v-if="visible" class="goods-list-info">Не удалось получить список товаров с сервера.</div>`
}

const goodsItem = {
    name: 'goods-item',
    props: ['good'],
    template: `<div class="goods-item">
            <h3 class="goods-item-heading">{{ good.title }}</h3>
            <img class="item-image" src="img/game.jpg" width="250" height="156" v-bind:alt="good.title">
            <p class="goods-item-text">Цена: {{ good.price }} рублей</p>
            <button class="button" v-bind:id="good.title" @click="addItemToCart">Добавить в корзину</button>
        </div>`,
    methods: {
        addItemToCart(item) {
            this.$emit('add-item-to-cart', this.item);
        }
    }
}

const goodsList = {
    name: 'goods-list',
    props: ['goods', 'filteredGoods', 'visible', 'fetch-error'],

    template: `<div class="goods-list" v-if="visible">
                    <goods-item v-for="good in filteredGoods" :good="good" :key="good.title" @add-item-to-cart="addItemToCart(good)"></goods-item>
                    <div class="goods-list-info" v-if="goodsListEmpty">Товаров не найдено.</div>
                </div>`,
    computed: {
        goodsListEmpty() {
            if (this.fetchError) {
                return false;
            }
            return this.filteredGoods.length === 0;
        }
    },
    components: {
        goodsItem
    },
    methods: {
        addItemToCart(good) {
            this.$emit('add-item-to-cart', good);
        }
    }

};

const search = {
    template: `<form class="searchForm">
        <input type="text" class="searchInput form-input" placeholder="" v-model="searchLine" >
        <button class="button searchButton" @click="buttonSearchClick">Поиск</button>
     </form>`,

    props: ['goods', 'filteredGoods'],
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

const chatHeader = {
    name: 'chatHeader',
    template: `<div class="chatHeader">
            <svg class="chatCross" viewBox="0 0 52 52"><path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"></path><path d="M35.707,16.293c-0.391-0.391-1.023-0.391-1.414,0L26,24.586l-8.293-8.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L24.586,26l-8.293,8.293c-0.391,0.391-0.391,1.023,0,1.414C16.488,35.902,16.744,36,17,36s0.512-0.098,0.707-0.293L26,27.414l8.293,8.293C34.488,35.902,34.744,36,35,36s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L27.414,26l8.293-8.293C36.098,17.316,36.098,16.684,35.707,16.293z"></path></svg>
            <svg class="chatAvatar" viewBox="0 0 53 53"><path style="fill:#E7ECED;" d="M18.613,41.552l-7.907,4.313c-0.464,0.253-0.881,0.564-1.269,0.903C14.047,50.655,19.998,53,26.5,53c6.454,0,12.367-2.31,16.964-6.144c-0.424-0.358-0.884-0.68-1.394-0.934l-8.467-4.233c-1.094-0.547-1.785-1.665-1.785-2.888v-3.322c0.238-0.271,0.51-0.619,0.801-1.03c1.154-1.63,2.027-3.423,2.632-5.304c1.086-0.335,1.886-1.338,1.886-2.53v-3.546c0-0.78-0.347-1.477-0.886-1.965v-5.126c0,0,1.053-7.977-9.75-7.977s-9.75,7.977-9.75,7.977v5.126c-0.54,0.488-0.886,1.185-0.886,1.965v3.546c0,0.934,0.491,1.756,1.226,2.231c0.886,3.857,3.206,6.633,3.206,6.633v3.24C20.296,39.899,19.65,40.986,18.613,41.552z"></path><path style="fill:#556080;" d="M26.953,0.004C12.32-0.246,0.254,11.414,0.004,26.047C-0.138,34.344,3.56,41.801,9.448,46.76c0.385-0.336,0.798-0.644,1.257-0.894l7.907-4.313c1.037-0.566,1.683-1.653,1.683-2.835v-3.24c0,0-2.321-2.776-3.206-6.633c-0.734-0.475-1.226-1.296-1.226-2.231v-3.546c0-0.78,0.347-1.477,0.886-1.965v-5.126c0,0-1.053-7.977,9.75-7.977s9.75,7.977,9.75,7.977v5.126c0.54,0.488,0.886,1.185,0.886,1.965v3.546c0,1.192-0.8,2.195-1.886,2.53c-0.605,1.881-1.478,3.674-2.632,5.304c-0.291,0.411-0.563,0.759-0.801,1.03V38.8c0,1.223,0.691,2.342,1.785,2.888l8.467,4.233c0.508,0.254,0.967,0.575,1.39,0.932c5.71-4.762,9.399-11.882,9.536-19.9C53.246,12.32,41.587,0.254,26.953,0.004z"></path></svg>
            <span class="chatName">Саймон Б.</span>
            <span class="chatInfo">Напишите нам, мы онлайн!</span>
            <span class="chatWorker">Кoнсультант</span>
	   </div>`
}

const chatContent = {
    name: 'chatContent',
    template: `<div class="chatContent">
		<div class="messageWrap">
			<div class="chatMessage chatMessageAdmin">Хорошо.</div>
			<time  class="chatTime">18:02</time>
		</div>
		<div class="messageWrap">
			<time class="chatTime">18:02</time>
			<div class="chatMessage chatMessageUser">Не можете.</div>
		</div>
		<div class="messageWrap">
			<div class="chatMessage chatMessageAdmin">Здравствуйте! Я могу вам чем-то помочь?</div>
			<time class="chatTime">18:02</time>
		</div>
	</div>`
}

const chatForm = {
    name: 'chatForm',
    template: `<form action="#" method="post" class="chatForm">
            <svg class="chatClip" viewBox="0 0 30.34 30.34"><path d="M22.562,12.491c0,0,1.227-0.933,0.293-1.866c-0.934-0.933-1.842,0.271-1.842,0.271l-9.389,9.391c0,0-2.199,2.838-3.871,1.122c-1.67-1.718,1.121-3.872,1.121-3.872l12.311-12.31c0,0,2.873-3.165,5.574-0.466c2.697,2.7-0.477,5.579-0.477,5.579L12.449,24.173c0,0-4.426,5.113-8.523,1.015s1.066-8.474,1.066-8.474L15.494,6.209c0,0,1.176-0.982,0.295-1.866c-0.885-0.883-1.865,0.295-1.865,0.295L1.873,16.689c0,0-4.549,4.989,0.531,10.068c5.08,5.082,10.072,0.533,10.072,0.533l16.563-16.565c0,0,3.314-3.655-0.637-7.608s-7.607-0.639-7.607-0.639L6.543,16.728c0,0-3.65,2.969-0.338,6.279c3.312,3.314,6.227-0.39,6.227-0.39L22.562,12.491z"></path></svg>
            <textarea name="" id="" class="chatInput" placeholder="Введите сообщение и нажимте Enter"></textarea>
	   </form>`
}

const chat = {
    name: 'chat',
    props: ['visible'],
    //    template: `<div class="chatWrapper" v-bind:class="{ chatCollapsed: this.visible }">
    template: `<div class="chatWrapper" v-bind:class="{ 'chatCollapsed': isCollapsed }">
                    <chatHeader></chatHeader>
                    <chatContent></chatContent>
                    <chatForm></chatForm>
                </div>`,
    components: {
        chatHeader,
        chatContent,
        chatForm
    },
    computed: {
        isCollapsed() {
            return !this.visible;
        }
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
        isVisibleFetchError: false,
//        chatVisibility: true
        chatVisibility: false
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
            //            let promice = this.makeGetRequest(`${URL}/catalogData.json`);
            let promice = this.makeGetRequest(`/catalog`);
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
        
        
        
        
        
        
        
        
        
        makePostRequest(url, data) {
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
                            resolve();
                        } else {
                            reject('Error');
                        }
                    }
                }
                xhr.open('POST', url);
                xhr.setRequestHeader('Content-Type', 'application/json', 'charset=UTF-8');
//                xhr.send('{ "product_name": "Кресло", "price": "160" }');
                xhr.send(JSON.stringify(data));
            });
            
            
            
            
            
            
            
        },
//        post() {
//            let promice = this.makePostRequest(`/cart`, `{ "product_name": "Кресло", "price": "160" }`);
//            promice.then(() => {
//                console.log('FRONT POST OK');
//            }).catch((error) => {
//                console.log('FRONT POST ERROR');
//            });
//        },
        addItemToCart(good) {

//            good.title = number;
//            console.log('отправляем ' + number++);
//            console.log(good);

            let promice = this.makePostRequest(`/cart`, good);
            promice.then(() => {
                console.log('FRONT POST OK');
            }).catch((error) => {
                console.log('FRONT POST ERROR');
            });
        }
    },
    mounted() {
        this.fetchGoods();
    },
    components: {
        goodsList,
        search,
        cart,
        fetchError,
        chat
    }
});
