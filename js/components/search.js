export default {
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