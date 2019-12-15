class CartItem {
    constructor(item) {
        this.title = item.title;
        this.price = item.price;
        this.quantity = 1;
    }

    cartItemCrossRender() {
        return `<svg class="cart-item-cross" id="${this.title}-cross" viewBox="0 0 52 52"><path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z" /><path d="M35.707,16.293c-0.391-0.391-1.023-0.391-1.414,0L26,24.586l-8.293-8.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L24.586,26l-8.293,8.293c-0.391,0.391-0.391,1.023,0,1.414C16.488,35.902,16.744,36,17,36s0.512-0.098,0.707-0.293L26,27.414l8.293,8.293C34.488,35.902,34.744,36,35,36s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L27.414,26l8.293-8.293C36.098,17.316,36.098,16.684,35.707,16.293z" /></svg>`;
    }

    render() {
        return `<div class="cart-item">
                    <img class="item-image" src="img/game.jpg" width="250" height="156" alt="${this.title}">
                    <div class="cart-item-info">
                        <h3 class="goods-item-heading">${this.title}</h3>
                        <p class="goods-item-text cart-item-price">Цена: ${this.price} рублей.</p>
                        <input id="${this.title}-input" type="number" min="1" max="99" value="${this.quantity}" class="cart-item-quantity">
                    </div>
                    ${this.cartItemCrossRender(this.title)}
                </div>`
    }

    erase(cross) {
        const root = cross.parentElement;
        root.parentElement.removeChild(root);
    }
}

class Cart {
    constructor() {
        this.cart = [];
        this.rendered = false;
    }

    addItem(item) {
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

        console.log(cart.cart);
    }

    removeItem(itemTitle) {
        let i;
        for (i = 0; i < this.cart.length; i++) {
            if (this.cart[i].title === itemTitle) {
                break;
            }
        }
        if (i !== undefined) {
            this.cart.splice(i, 1);
        }
    }

    totalPrice() {
        return this.cart.reduce((sum, item) => {
            if (item.price) {
                sum += item.price * item.quantity;
            }
            return sum;
        }, 0);
    }

    totalQuantity() {
        return this.cart.reduce((sum, item) => {
            if (item.quantity) {
                sum += item.quantity;
            }
            return sum;
        }, 0);
    }

    clean() {
        this.cart = [];
    }

    render() {
        if (this.rendered) {
            return;
        }
        const listHtmlStart =
            `<div class="cart-wrapper">
                <div class="cart-items">`;
        const listHtmlEnd =
            `</div>
                <div class="cart-info">
                    <span class="cart-info-text">Всего товаров:</span><span class="cart-info-text cart-info-quantity">${this.totalQuantity()} шт.</span>
                    <span class="cart-info-text">Общая стоимость:</span><span class="cart-info-text cart-info-price">${this.totalPrice()} руб.</span>
                    <button class="button cart-issue-button">Перейти к оформлению</button>
                </div>
            </div>`;
        let listHtmlMiddle = '';
        this.cart.forEach(cartItem => {
            listHtmlMiddle += cartItem.render();
        });
        document.querySelector('main').innerHTML = listHtmlStart + listHtmlMiddle + listHtmlEnd;
        this.addEvents();
    }

    addEvents() {
        const me = this;
        
        cart.cart.forEach(item => {
            //клик на крестик
            const cross = document.querySelector(`#${item.title}-cross`);
            cross.addEventListener('click', () => {
                item.erase(cross);    
                cart.cart.splice(cart.cart.indexOf(item), 1);
                this.refreshInfo();
            });
            
            //изменение инпута
            const input = document.querySelector(`#${item.title}-input`);
            input.addEventListener('change', () => {
                const val = parseInt(input.value);
                if(val <= 0){
                    val = 1;
                    input.value = '1';
                }
                
                item.quantity = val;
                this.refreshInfo();
            });
        });
    }
    
    refreshInfo() {
        const quantity = document.querySelector('.cart-info-quantity ');
        quantity.textContent = this.totalQuantity() + ' шт.';
        const price = document.querySelector('.cart-info-price ');
        price.textContent = this.totalPrice() + ' руб.';
    }
}
