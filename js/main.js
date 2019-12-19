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
const erase = function () {
    const root = document.querySelector('.main');
    root.innerHTML = '';
}

//события кнопок в хидере
const cartButton = document.querySelector('.cartButton');
cartButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    erase();
    cart.render();
});
const indexButton = document.querySelector('.indexButton');
indexButton.addEventListener('click', () => {
    erase();
    goods.filter('', true);
});
const formButton = document.querySelector('.formButton');
formButton.addEventListener('click', () => {
    erase();
    form.render();
});

const searchForm = document.querySelector('.searchForm');
const searchInput = document.querySelector('.searchInput');
searchForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    erase();
    if (searchInput.value === '') {
        goods.filter('', true);
    } else {
        goods.filter(searchInput.value, false);
    }
});
