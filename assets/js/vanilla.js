//===== кнопка показа работ

function showMoreWorks() {
    const workItems = document.querySelectorAll('.works-item');
    const showMoreBlock = document.querySelector('.work-more');
    const showMoreBtn = document.querySelector('.show-more');
    const moreItemsFirstRow = document.querySelectorAll('[data-number="1"]');
    const moreItemsFSecondRow = document.querySelectorAll('[data-number="2"]');
    let counter = 0;

    const showMore = elems => {
        elems.forEach(item => {
            item.classList.remove('d-none');
        });
    };

    const scrollToView = elem => {
        // let scrollPoint = elem.offsetHeight;
        elem.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
        });
    };

    moreItemsFirstRow.forEach(elem => {
        elem.classList.add('animate__animated', 'animate__fadeInUp');
    });
    moreItemsFSecondRow.forEach(elem => {
        elem.classList.add('animate__animated', 'animate__fadeInUp');
    });

    showMoreBtn.addEventListener('click', e => {
        counter++;
        e.preventDefault();
        if (counter === 1) {
            showMore(moreItemsFirstRow);
            scrollToView(workItems[2]);
            showMoreBtn.textContent = 'еще посмотреть';
        } else if (counter === 2) {
            showMore(moreItemsFSecondRow);
            scrollToView(moreItemsFirstRow[moreItemsFirstRow.length - 1]);
            showMoreBtn.classList.add('d-none');
            showMoreBlock.classList.add('d-none');
        }
    });
}
showMoreWorks();

//===== отправка запроса на телеграмм

const token = '5658438670:AAHrUrT3idqFud65fAaBXcMslFRgvvDKk2I';
const chatId = '-1001746616879';
const URI_API = `https://api.telegram.org/bot${token}/sendMessage`;

const formElems = {
    inputs: document.querySelectorAll('input'),
    messageInput: document.querySelectorAll('[name="message"]'),
    contactsInput: document.querySelectorAll('[name="contacts"]'),
};

const mainBtn = document.querySelector('[type="submit"]');

const clearInputs = () => {
    formElems.inputs.forEach(item => {
        item.value = '';
    });
    formElems.messageInput.forEach(item => {
        item.value = '';
    });
    formElems.contactsInput.forEach(item => {
        item.value = '';
    });
};

const thanksText = () => {
    mainBtn.innerText = 'Спасибо за обращение!';
    console.log(mainBtn);
    setTimeout(() => {
        mainBtn.innerText = 'Отправить сообщение';
    }, 1500);
};

const errorText = () => {
    mainBtn.innerText = 'Попробуйте еще разок';
    console.log(mainBtn);
    setTimeout(() => {
        mainBtn.innerText = 'Отправить сообщение';
    }, 3000);
};

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let message = `<b>Заявка с сайта-портфолио</b>\n`;
    message += `<b>Отправитель:</b>${this.name.value}\n`;
    message += `<b>Почта:</b>${this.email.value}\n`;
    message += `<b>Соцсети:</b>${this.contacts.value}\n`;
    message += `<b>Текст сообщения:</b>${this.message.value}`;
    console.log(message);

    axios
        .post(URI_API, {
            chat_id: chatId,
            parse_mode: 'html',
            text: message,
        })
        .then(function (response) {
            if (response.status === 200) {
                console.log(200);
                clearInputs();
                thanksText();
                document.querySelector('.alert').style.display = 'block';
                document.querySelector('.alert').style.position = 'absolute';
                setTimeout(() => {
                    document.querySelector('.alert').style.display = 'none';
                }, 2000);
            }
        })
        .catch(function (error) {
            console.log(error);
            errorText();
        });
});
