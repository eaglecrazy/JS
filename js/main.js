//ЧАТ
let admin = new User('Саймон Б.', 'Кoнсультант', true);
let user = new User('Пользователь сайта.', '', false);
let chat = new Chat(false, user, admin);
chat.addMessage(new Message('Не можете.', new Date, user));
chat.addMessage(new Message('Хорошо.', new Date, admin));

//КОРЗИНА
const cart = new Cart();

//ТОВАРЫ
const l = new GoodsList();
l.fetchGoods();


//сделать
//1. Переделайте makeGETRequest() так, чтобы она использовала промисы.
//2. Добавьте в соответствующие классы методы добавления товара в корзину, 
//удаления товара из корзины и получения списка товаров корзины.
//3* Переделайте GoodsList так, чтобы fetchGoods() возвращал промис, 
//а render() вызывался в обработчике этого промиса.