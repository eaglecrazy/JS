/* jslint white: true */
/*eslint-env browser*/
/*eslint no-console: 0*/


const goods = [
    {title: 'Mario', price: 150},
    {title: 'Castlevania', price: 200},
    {title: 'Battletoads', price: 180},
    {title: 'Contra', price: 140}
];

const renderGoodsItem = (title, price) => {
    return `<div class="goods-item"><h3>${title}</h3><img class="item-image" src="img/game.jpg" width="250" height="156" alt="${title}"><p>Цена: ${price} рублей</p><button class="button">Добавить в корзину</button></div>`;
};


const renderGoodsList = (list) => {
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    let str = (goodsList.toString()).replace(/,/g, '');
    document.querySelector('.goods-list').innerHTML = str;
};


renderGoodsList(goods);

