export default {
    name: 'fetch-error',
    props: ['visible'],
    template: `<div v-if="visible" class="goods-list-info">Не удалось получить список товаров с сервера.</div>`
}