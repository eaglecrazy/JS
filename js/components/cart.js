import cartItem from './cartItem.js';

export default {
    name: 'cart',
    props: ['visible', 'cart'],
    template: `<div class="cart-wrapper" v-if="visible">
            <div class="cart-items">
                <cartItem v-for="cartItem in cart" :cartItem="cartItem" :key="cartItem.title" @remove-item-from-cart="removeItemFromCart(cartItem)" @change-item-in-cart="changeItemInCart(cartItem)"></cartItem>
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
    },
    methods: {
        removeItemFromCart(cartItem) {
            this.$emit('remove-item-from-cart', cartItem);
        },
        changeItemInCart(cartItem) {
            this.$emit('change-item-in-cart', cartItem);
        }
    }
}