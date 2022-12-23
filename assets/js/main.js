(function ($) {
    'use strict';

    //===== Prealoder

    $(window).on('load', function (event) {
        $('.preloader').delay(500).fadeOut(500);
    });

    //===== Mobile Menu

    $('.navbar-toggler').on('click', function () {
        $(this).toggleClass('active');
    });

    $('.navbar-nav a').on('click', function () {
        $('.navbar-toggler').removeClass('active');
    });

    //===== close navbar-collapse when a  clicked

    $('.navbar-nav a').on('click', function () {
        $('.navbar-collapse').removeClass('show');
    });

    //===== Sticky

    $(window).on('scroll', function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 10) {
            $('.navigation').removeClass('sticky');
        } else {
            $('.navigation').addClass('sticky');
        }
    });

    //===== Section Menu Active

    var scrollLink = $('.page-scroll');
    // Active link switching
    $(window).scroll(function () {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function () {
            var sectionOffset = $(this.hash).offset().top - 73;

            if (sectionOffset <= scrollbarLocation) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        });
    });

    // Parallaxmouse js

    function parallaxMouse() {
        if ($('#parallax').length) {
            var scene = document.getElementById('parallax');
            var parallax = new Parallax(scene);
        }
    }
    parallaxMouse();

    //===== Progress Bar

    if ($('.progress-line').length) {
        $('.progress-line').appear(
            function () {
                var el = $(this);
                var percent = el.data('width');
                $(el).css('width', percent + '%');
            },
            { accY: 0 }
        );
    }

    //===== Counter Up

    $('.counter').counterUp({
        delay: 10,
        time: 1600,
    });

    //===== Magnific Popup

    $('.image-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true,
        },
    });

    //===== Back to top

    // Show or hide the sticky footer button
    $(window).on('scroll', function (event) {
        if ($(this).scrollTop() > 600) {
            $('.back-to-top').fadeIn(200);
        } else {
            $('.back-to-top').fadeOut(200);
        }
    });

    //Animate the scroll to yop
    $('.back-to-top').on('click', function (event) {
        event.preventDefault();

        $('html, body').animate(
            {
                scrollTop: 0,
            },
            1500
        );
    });

    //=====
})(jQuery);

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
            }
        })
        .catch(function (error) {
            console.log(error);
            errorText();
        });
});
