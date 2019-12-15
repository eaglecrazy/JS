//ЧАТ
let admin = new User('Саймон Б.', 'Кoнсультант', true);
let user = new User('Пользователь сайта.', '', false);
let chat = new Chat(false, user, admin);
chat.addMessage(new Message('Не можете.', new Date, user));
chat.addMessage(new Message('Хорошо.', new Date, admin));







//КОРЗИНА
const cart = new Cart();
//let a = new CartItem({
//    title: 'Mario',
//    price: 150
//});
//let b = new CartItem({
//    title: 'Castlevania',
//    price: 200
//});
//let c = new CartItem({
//    title: 'Battletoads',
//    price: 180
//});
//
//cart.addItem(a);
//cart.addItem(a);
//cart.addItem(b);
//cart.addItem(c);
//
//cart.render();




//ТОВАРЫ
const l = new GoodsList();
l.fetchGoods();