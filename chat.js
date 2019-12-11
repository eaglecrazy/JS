class Message {
    constructor(txt, tm, u) {
        this.text = txt;
        this.time = tm;
        this.user = u;
    }
}

class Chat {
    constructor() {
        this.findElements();
        this.addEvents();
        this.max = false;
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
        //Как тут обратиться к самому объекту? this указывает на объект события
        if (!chat.max) {
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
        this.max = !this.max;
    }


    clipClick() {
        console.log('Нажали на скрепку');
    }

    endInputMessage(ewt) {
        if (ewt.keyCode !== 13) {
            return;
        }

        let m = new Message(chat.textarea.value, new Date(), true);
        chat.addMessage(m);
        chat.textarea.value = "";
        //Как вернуть textarea изначальное состояние? После ввода сообщения и изменения я обнуляю значение, но плейсхолдер не появляется обратно. 
    }

    addMessage(message) {
        let userClass;
        if (message.user) {
            userClass = 'chatMessageUser';
        } else {
            userClass = 'chatMessageAdmin';
        }

        let text = `<div class="chatMessage ${userClass}">${message.text}</div>`;
        let formatedTime = message.time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        let time = `<time class="chatTime">${formatedTime}</time>`;
        let msgText;
        
        if (message.user) {
            msgText = time + text;      
        } else {
            msgText = text + time;
        }
        this.content.innerHTML = `<div class="messageWrap">${msgText}</div>${this.content.innerHTML}`;
    }
}

chat = new Chat();
