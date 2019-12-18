class Form {
    render() {
        const formHtml =
            `<div class="form-wrap">
            <form action="#" class="form">
                <label for="input-name" class="form-label">Ваше имя:</label><input class="form-input" type="text" id="input-name" name="login" placeholder="Имя">
                <label for="input-phone" class="form-label">Ваш телефон:</label><input class="form-input" type="text" id="input-phone" name="phone" placeholder="+7(123)456-7890">
                <label for="input-email" class="form-label">Ваш e-mail:</label><input class="form-input" type="email" id="input-email" name="email"  placeholder="test@test.com">
                <label for="input-text" class="form-label">Ваш отзыв:</label>
                <textarea id="input-text" class="form-input form-textarea"></textarea>
                <input type="submit" class="button form-button" value="Отправить">
            </form>
        </div>`;
        document.querySelector('main').innerHTML = formHtml;
        this.addEvents();
    }

    addEvents() {
        const me = this;
        const button = document.querySelector('.form-button');
        button.addEventListener('click', (evt) => {
            evt.preventDefault();
            me.checkAllInputs();
        });
    }

    checkAllInputs() {
        this.checkInput('#input-name', '^[A-Za-zА-Яа-яЁё]+$');
        //Очень долго я просидел с этим выражением. На сайте https://regex101.com/ это вырожение вполне валидное и находит такую строку +7(123)456-7890. А броузер выбрасывает ошибку: 
        //SyntaxError: Invalid regular expression: /^+7(d{3})d{3}-d{4}/: Nothing to repeat
        //Поэтому я оставлю его закомментированным
        this.checkInput('#input-phone', `^\+7\(\d{3}\)\d{3}\-\d{4}$`);
        this.checkInput('#input-email', '^[a-z]{1}[a-z.-]+[a-z]{1}@[a-z]+\.[a-z]+$');
    }

    checkInput(selector, regExpStr) {
        const input = document.querySelector(selector);
        const value = input.value;
        const regexp = new RegExp(regExpStr, 'gi');
        if (!regexp.test(value)) {
            input.classList.add('form-input-error');
        } else {
            if (input.classList.contains('form-input-error')) {
                input.classList.remove('form-input-error');
            }
        }
    }
}
