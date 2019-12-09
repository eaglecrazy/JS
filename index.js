/* jslint white: true */
/*eslint-env browser*/
/*eslint no-console: 0*/


const goods = [
    {title: 'Mario', price: 150},
    {title: 'Castlevania', price: 200},
    {title: 'Battletoads', price: 180},
    {title: 'Contra', price: 140}
];

const renderGoodsItem = (title = 'Название', price = 0) => 
    `<div class="goods-item"><h3 class="goods-item-heading">${title}</h3><img class="item-image" src="img/game.jpg" width="250" height="156" alt="${title}"><p class="goods-item-text">Цена: ${price} рублей</p><button class="button">Добавить в корзину</button></div>`;
;


const renderGoodsList = (list = []) => {
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
};


renderGoodsList(goods);

