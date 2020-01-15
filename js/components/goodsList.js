import goodsItem from './goodsItem.js';

export default {
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