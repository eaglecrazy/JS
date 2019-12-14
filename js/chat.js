class Message {
    constructor(text, time, user) {
        this.text = text;
        this.time = time;
        this.user = user;
    }
    
    render(){
        let userClass;
        if (this.user.isAdmin) {
            userClass = 'chatMessageAdmin';
        } else {
            userClass = 'chatMessageUser';
        }
        let text = `<div class="chatMessage ${userClass}">${this.text}</div>`;
        let formatedTime = this.time.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        let time = `<time class="chatTime">${formatedTime}</time>`;
        let msgText;
        if (this.user.isAdmin) {
            msgText = text + time;
        } else {
            msgText = time + text;
        }
        return `<div class="messageWrap">${msgText}</div>`;
    }
}

class User {
    constructor(name = 'Пользователь', position = 'пользователь', isAdmin = false) {
        this.name = name;
        this.position = position;
        this.isAdmin = isAdmin
    }
}

class Chat {
    chatCrossRender(visibility) {
        const str1 = '<svg class="chatCross '
        let str2 = this.dN();
        const str3 = '" viewBox="0 0 52 52"><path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z" /><path d="M35.707,16.293c-0.391-0.391-1.023-0.391-1.414,0L26,24.586l-8.293-8.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L24.586,26l-8.293,8.293c-0.391,0.391-0.391,1.023,0,1.414C16.488,35.902,16.744,36,17,36s0.512-0.098,0.707-0.293L26,27.414l8.293,8.293C34.488,35.902,34.744,36,35,36s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L27.414,26l8.293-8.293C36.098,17.316,36.098,16.684,35.707,16.293z" /></svg>'
        if(visibility){
           str2 = '' ;
        }
        return str1 + str2 + str3;
    }
    chatAvatarRender(visibility) {
        const str1 = '<svg class="chatAvatar ';
        let str2 = this.dN();
        const str3 = '" viewBox="0 0 53 53"><path style="fill:#E7ECED;" d="M18.613,41.552l-7.907,4.313c-0.464,0.253-0.881,0.564-1.269,0.903C14.047,50.655,19.998,53,26.5,53c6.454,0,12.367-2.31,16.964-6.144c-0.424-0.358-0.884-0.68-1.394-0.934l-8.467-4.233c-1.094-0.547-1.785-1.665-1.785-2.888v-3.322c0.238-0.271,0.51-0.619,0.801-1.03c1.154-1.63,2.027-3.423,2.632-5.304c1.086-0.335,1.886-1.338,1.886-2.53v-3.546c0-0.78-0.347-1.477-0.886-1.965v-5.126c0,0,1.053-7.977-9.75-7.977s-9.75,7.977-9.75,7.977v5.126c-0.54,0.488-0.886,1.185-0.886,1.965v3.546c0,0.934,0.491,1.756,1.226,2.231c0.886,3.857,3.206,6.633,3.206,6.633v3.24C20.296,39.899,19.65,40.986,18.613,41.552z" /><path style="fill:#556080;" d="M26.953,0.004C12.32-0.246,0.254,11.414,0.004,26.047C-0.138,34.344,3.56,41.801,9.448,46.76c0.385-0.336,0.798-0.644,1.257-0.894l7.907-4.313c1.037-0.566,1.683-1.653,1.683-2.835v-3.24c0,0-2.321-2.776-3.206-6.633c-0.734-0.475-1.226-1.296-1.226-2.231v-3.546c0-0.78,0.347-1.477,0.886-1.965v-5.126c0,0-1.053-7.977,9.75-7.977s9.75,7.977,9.75,7.977v5.126c0.54,0.488,0.886,1.185,0.886,1.965v3.546c0,1.192-0.8,2.195-1.886,2.53c-0.605,1.881-1.478,3.674-2.632,5.304c-0.291,0.411-0.563,0.759-0.801,1.03V38.8c0,1.223,0.691,2.342,1.785,2.888l8.467,4.233c0.508,0.254,0.967,0.575,1.39,0.932c5.71-4.762,9.399-11.882,9.536-19.9C53.246,12.32,41.587,0.254,26.953,0.004z" /></svg>'
        if(visibility){
           str2 = '' ;
        }
        return str1 + str2 + str3;
    }
    chatClipRender() {
        return '<svg class="chatClip" viewBox="0 0 30.34 30.34"><path d="M22.562,12.491c0,0,1.227-0.933,0.293-1.866c-0.934-0.933-1.842,0.271-1.842,0.271l-9.389,9.391c0,0-2.199,2.838-3.871,1.122c-1.67-1.718,1.121-3.872,1.121-3.872l12.311-12.31c0,0,2.873-3.165,5.574-0.466c2.697,2.7-0.477,5.579-0.477,5.579L12.449,24.173c0,0-4.426,5.113-8.523,1.015s1.066-8.474,1.066-8.474L15.494,6.209c0,0,1.176-0.982,0.295-1.866c-0.885-0.883-1.865,0.295-1.865,0.295L1.873,16.689c0,0-4.549,4.989,0.531,10.068c5.08,5.082,10.072,0.533,10.072,0.533l16.563-16.565c0,0,3.314-3.655-0.637-7.608s-7.607-0.639-7.607-0.639L6.543,16.728c0,0-3.65,2.969-0.338,6.279c3.312,3.314,6.227-0.39,6.227-0.39L22.562,12.491z" /></svg>'
    }
    dN() {
        return 'displayNone'
    }

    constructor(visibility = false, user = new User, admin = new User) {
        this.visibility = visibility;
        this.user = user;
        this.admin = admin;
        this.messages = [];
        this.render();
        this.findElements();
        this.addEvents();
        this.addMessage(new Message('Здравствуйте! Я могу вам чем-то помочь?', new Date, this.admin));
    }

    findElements() {
        this.cross = document.querySelector('.chatCross');
        this.clip = document.querySelector('.chatClip');
        this.textarea = document.querySelector('.chatInput');
        this.content = document.querySelector('.chatContent');
        this.form = document.querySelector('.chatForm');
        this.avatar = document.querySelector('.chatAvatar');
        this.name = document.querySelector('.chatName');
        this.info = document.querySelector('.chatInfo');
        this.worker = document.querySelector('.chatWorker');
        this.header = document.querySelector('.chatHeader');
    }

    addEvents() {
        this.cross.onclick = this.crossClick;
        this.header.onclick = this.headerClick;
        this.clip.onclick = this.clipClick;
        this.textarea.onkeydown = this.endInputMessage;
    }

    crossClick(ewt) {
        ewt.stopPropagation(); //прекращаем обработку события иначе будет ещё один клик на хидер
        //Как тут обратиться к самому объекту? this указывает на объект события
        chat.changeState();
    }

    headerClick() {
        if (!chat.max) {
            //Как тут обратиться к самому объекту? this указывает на объект события
            chat.changeState();
        }
    }

    changeState() {
        this.content.classList.toggle('displayNone');
        this.form.classList.toggle('displayNone');
        this.cross.classList.toggle('displayNone');
        this.avatar.classList.toggle('displayNone');
        this.name.classList.toggle('displayNone');
        this.worker.classList.toggle('displayNone');
        this.info.classList.toggle('displayNone');
        this.header.classList.toggle('chatHeaderMax');
        this.header.classList.toggle('chatHeaderMin');
        this.visibility = !this.visibility;
    }

    clipClick() {
        console.log('Нажали на скрепку');
    }

    endInputMessage(ewt) {
        if (ewt.keyCode !== 13) {
            return;
        }
        
        if (chat.textarea.value === '' || chat.textarea.value === '\n' || chat.textarea.value === '\r\n') {
            chat.textarea.value = "";
            return;
        }
        
        let message = new Message(chat.textarea.value.trim(), new Date(), chat.user);
        //Как вернуть textarea изначальное состояние? После ввода сообщения и изменения я обнуляю значение, но плейсхолдер не появляется обратно. 
        chat.textarea.value = "";
        chat.addMessage(message);
    }

    addMessage(message) { 
        this.messages.push(message);
        this.content.innerHTML = message.render() + this.content.innerHTML;
    }

    render() {    
        let otherClass, infoClass, headerClass;
        if(this.visibility){
            infoClass = this.dN();
            headerClass = '';
            otherClass = '';
        } else {
            infoClass = '';
            headerClass = 'chatHeaderMin';
            otherClass = this.dN();
        }

        let str =  `<div class="chatWrapper">
                        <div class="chatHeader  ${headerClass}">
                            ${this.chatCrossRender(this.visibility)}
                            ${this.chatAvatarRender(this.visibility)}
                            <span class="chatName ${otherClass}">${this.admin.name}</span>
                            <span class="chatInfo ${infoClass}">Напишите нам, мы онлайн!</span>
                            <span class="chatWorker ${otherClass}">${this.admin.position}</span>
                        </div>
                        <div class="chatContent ${otherClass}">
                        </div>
                        <form action="#" method="post" class="chatForm  ${otherClass}">
                            ${this.chatClipRender()}
                            <textarea name="" id="" class="chatInput" placeholder="Введите сообщение и нажимте Enter"></textarea>
                        </form>
                    </div>`;

        let body = document.querySelector('body');
        body.innerHTML += str;
    }
}

let admin = new User('Саймон Б.', 'Кoнсультант', true);
let user = new User('Пользователь сайта.', '', false);
let chat = new Chat(false, user, admin);


chat.addMessage(new Message('Не можете.', new Date, user));
chat.addMessage(new Message('Хорошо.', new Date, admin));