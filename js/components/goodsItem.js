export default {
    name: 'goods-item',
    props: ['good'],
    template: `<div class="goods-item">
            <h3 class="goods-item-heading">{{ good.title }}</h3>
            <img class="item-image" src="img/game.jpg" width="250" height="156" v-bind:alt="good.title">
            <p class="goods-item-text">Цена: {{ good.price }} рублей</p>
            <button class="button" v-bind:id="good.title" @click="addItemToCart">Добавить в корзину</button>
        </div>`,
    methods: {
        addItemToCart() {
            this.$emit('add-item-to-cart', this.item);
        },
        changeItemInCart() {
            this.$emit('change-item-in-cart', this.item);
        }
    }
}