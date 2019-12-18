//ЧАТ
let admin = new User('Саймон Б.', 'Кoнсультант', true);
let user = new User('Пользователь сайта.', '', false);
let chat = new Chat(false, user, admin);
chat.addMessage(new Message('Не можете.', new Date, user));
chat.addMessage(new Message('Хорошо.', new Date, admin));

//КОРЗИНА
const cart = new Cart();

//ФОРМА
const form = new Form();

//ТОВАРЫ
const goods = new GoodsList();
goods.fillList();

//очистка мейна
const erase = function() {
    const root = document.querySelector('.main');
    root.innerHTML = '';
}

//события кнопок в хидере
const cartButton = document.querySelector('.cartButton');
cartButton.addEventListener('click', () => {
    erase();
    cart.render();
});
const indexButton = document.querySelector('.indexButton');
indexButton.addEventListener('click', () => {
    erase();
    goods.render();
});
const formButton = document.querySelector('.formButton');
formButton.addEventListener('click', () => {
    erase();
    form.render();
});

/*
добавить поиск
события
использовать один класс в чатике
3. *Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
a. Имя содержит только буквы.
b. Телефон имеет вид +7(000)000-0000.
c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
d. Текст произвольный.
e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.

*/