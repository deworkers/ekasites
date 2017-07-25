$(document).ready(function() {
    

    var scrollTo = function(pos) {
        var pos;
        $('html,body').animate({scrollTop:pos}, 1000);
        return false;
    }

    $('.j-scroll-to').on('click',function(event) {
        event.preventDefault(); 
        var div = $(this).attr('href');
        var toPos = $(div).offset().top;
        scrollTo(toPos);
    });

    /*Модальные окна*/
    var overlay = $('#overlay'); 
    var open_modal = $('.open_modal'); 
    var close = $('.modal__close'); 
    var modal = $('.modal'); 

    // для открытия модалки нужна ссылка вида <a href="#name"></a> и класс "open_modal"
    // будет открыта модалка с id="name"
    open_modal.click( function(event){
        modal.fadeOut(200);
        event.preventDefault(); 
        var div = $(this).attr('href'); 
        overlay.fadeIn(400);
        $(div).fadeIn(400);
        $('html, body').addClass('j-noScroll');
        baseBoxHeight = $('.mobile-menu__right').height();
    });

    close.click(function() {
        modal.fadeOut(200);
        overlay.fadeOut(200);
        $('html, body').removeClass('j-noScroll');
    });

    overlay.click(function(event) {
        if ( $( event.target ).attr('id') == 'overlay' ) {
            $(this).fadeOut(200);
            modal.fadeOut(200);
            $('html, body').removeClass('j-noScroll');
        }
    });

    /*селект*/
    $('.select').click(function(e) {
        if ( !$(this).hasClass('j-open') ) {
            e.stopPropagation();
            $(this).addClass('j-open');
            $('.select-list').hide();
            $('.select').not(this).removeClass('j-open');
            $(this).find('.select-list').slideDown(200);
        } else {
            $(this).find('.select-list').slideUp(200);
            $(this).removeClass('j-open');
        }
    });


    // подстановка значения по умолчанию
    $('.select').each(function() {
        var val = $(this).find('.select-default').text();
        $(this).find('.select-default').addClass('selected');
        console.log(val);
        $(this).find('input').val(val);
    })

    $('body').click(function() {
        $('.select-list').slideUp(200);
        $('.select').removeClass('j-open');
    });

    $('.select-list__one').click(function(e) {
        e.stopPropagation();
        var val = $(this).text();
        $('.select').removeClass('j-open');
        $(this).parents('.select').find('input').val(val);
        $(this).parents('.select').find('.select-list').slideUp(200);
        $(this).parents('.select-list').find('.select-list__one').removeClass('selected');
        $(this).addClass('selected');
    });


    var about = new Swiper('.main-slider-wrap', {
        loop: true,
        slidesPerView: 1,
        hashnav: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplay: 5000
    });

    var feedbacks = new Swiper('.slider-wrap', {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 30,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: '.swiper-pagination-sites',
        paginationClickable: true,
        autoplay: 8000,
        breakpoints: {
            768: {
                slidesPerView: 1
            }
        }
    });

    var feedbacks = new Swiper('.seo-wrap', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplay: 5000,
        breakpoints: {
            768: {
                slidesPerView: 1
            }
        }
    });

    var feedbacks = new Swiper('.consult-image-block', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: 21000
    });

    $("#order").validate({
        rules:{
            name:{
                required: true
            },
            phone:{
                required: true,
            },
        },
        messages:{
            name:{
                required: "Это поле обязательно для заполнения",
            },
            phone:{
                required: "Это поле обязательно для заполнения",
            },
        },
        submitHandler: function() {
            $('.contact-form').html('<h2>Ваше сообщение отправлено</h2><p>Наш менеджер свяжется с вами в бижайшее время</p>')
        }

    });

    $("#order").submit(function() { //устанавливаем событие отправки для формы с id=form
        var formData = $(this).serialize(); //собераем все данные из формы
        $.ajax({
            type: "POST", //Метод отправки
            url: "/ajax/send.php", //путь до php фаила отправителя
            data: formData
        });
    });



       

    jQuery(".eTimer").eTimer({
        etType: 0, etDate: "31.07.2017.0.0", etTitleText: "Осталось времени", etTitleSize: 17, etShowSign: 1, etSep: ":", etFontFamily: "Trebuchet MS", etTextColor: "#020202", etPaddingTB: 5, etPaddingLR: 5, etBackground: "transparent", etBorderSize: 0, etBorderRadius: 2, etBorderColor: "white", etShadow: " 0px 0px 0px 0px #333333", etLastUnit: 4, etNumberFontFamily: "Trebuchet MS", etNumberSize: 22, etNumberColor: "black", etNumberPaddingTB: 0, etNumberPaddingLR: 0, etNumberBackground: "transparent", etNumberBorderSize: 0, etNumberBorderRadius: 5, etNumberBorderColor: "white", etNumberShadow: "inset 0px 0px 0px 0px transparent"
    });

    $('#sum').val($('.select:checked').val());

    $("#pay-form").validate({
        rules:{
            cps_email:{
                required: true
            },
            payment:{
                required: true,
            },
            domen1:{
                required: true,
            },
            domen2:{
                required: true,
            },
            domen3:{
                required: true,
            }
        },
        messages:{
            cps_email:{
                required: "Это поле обязательно для заполнения",
            },
            payment:{
                required: "Выберете способ оплаты",
            },
            domen1:{
                required: "Это поле обязательно для заполнения",
            },
            domen2:{
                required: "Это поле обязательно для заполнения",
            },
            domen3:{
                required: "Это поле обязательно для заполнения",
            }
       }
    });


$('.select').change(function(){
    var idx = $(this).parents('tr').index();
    if ( idx == 0 ) {
        $($('.pay-domen-one')[1]).hide();
        $($('.pay-domen-one')[2]).hide();
    }
    if ( idx == 1 ) {
        $($('.pay-domen-one')[1]).show();
        $($('.pay-domen-one')[2]).hide();
    }
    if ( idx ==  2 ) {
        $($('.pay-domen-one')[1]).show();
        $($('.pay-domen-one')[2]).show();
    }

        
});
    

});