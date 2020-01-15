//const URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

import CartItemClass from  './classes/cartItemClass.js';
import GoodsItemClass from  './classes/goodsItemClass.js';

import cart from './components/cart.js';
import goodsList from './components/goodsList.js';
import fetchError from './components/fetchError.js'
import search from './components/search.js'
import chat from './components/chat.js'

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
        buttonIndexClick() {
            this.isVisibleGoodsList = true;
            this.isVisibleCart = false;
        },
        buttonCartClick() {
            this.fetchCart();
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
                            if (xhr.responseText == '[]') {
                                resolve([]);
                            }
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
        fetchCart() {
            let promice = this.makeGetRequest(`/cart`);
            promice.then((newCart) => {
                this.newCart = newCart.map(item => {
                    return new CartItemClass(item.title, item.price, item.quantity);
                });
                this.cart = newCart;
            }).catch((error) => {
                console.log('fetchCart error');
            });
        },
        fetchGoods() {
            //            let promice = this.makeGetRequest(`${URL}/catalogData.json`);
            let promice = this.makeGetRequest(`/catalog`);
            promice.then((newGoods) => {
                this.goods = newGoods.map(item => {
                    return new GoodsItemClass(item.product_name, item.price);
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
                xhr.send(JSON.stringify(data));
            });
        },
        addItemToCart(cartItem) {
            
            var found = false;
            this.cart.find((currentCartItem) => {
                if(currentCartItem.title === cartItem.title){
                    currentCartItem.quantity++;
                    found = currentCartItem;
                    return found;
                }
            });
            
            if(found){
                this.changeItemInCart(found);
                return;
            }
                        
            const promice = this.makePostRequest(`/cart-add`, cartItem);
            promice.then(() => {
                console.log('FRONT POST OK');
                this.fetchCart();
            }).catch((error) => {
                console.log('FRONT POST ERROR');
            });

        },
        removeItemFromCart(cartItem) {
            const promice = this.makePostRequest(`/cart-remove`, cartItem);
            promice.then(() => {
                console.log('FRONT POST OK');
                this.fetchCart();
            }).catch((error) => {
                console.log('FRONT POST ERROR');
            });
        },
        changeItemInCart(cartItem) {
            const promice = this.makePostRequest(`/cart-change`, cartItem);
            promice.then(() => {
                console.log('FRONT POST OK');
                this.fetchCart();
            }).catch((error) => {
                console.log('FRONT POST ERROR');
            });
        }
    },
    mounted() {
        this.fetchGoods();
        this.fetchCart();
    },
    components: {
        goodsList,
        search,
        cart,
        fetchError,
        chat
    }
});
