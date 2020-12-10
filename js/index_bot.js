/*0.3125*/

let $bannerTop = $('.banner-top');

let $bannerBottom = $('.banner-bottom');

/*let banner = function (ele) {
    let $banner = $('.banner');
    //let $banner=ele;
    let $treeCon = $('.banner .treeCon');
    let $img = $treeCon.children().eq(1);
    let $aBtn = $('.banner .aul li');
    let num = 0;
    let timer = null;

    function init() {
        $treeCon.eq(0).children().eq(0).css({opacity: 1, zIndex: 1});
        $aBtn.eq(0).children().addClass('bg').parent().siblings().removeClass('bg');

    };
    init();
    $aBtn.on('click', function () {
        let index = $(this).index();

 /!*       $treeCon.eq(index).children().eq(0).css({zIndex: 1}).siblings().not('.aul').css({zIndex: -1});

        $treeCon.eq(index).children().eq(0).css({opacity: 1}).siblings().not('.aul').css({opacity: 0.3});*!/
        /////////////
        let children = $treeCon.eq(index).siblings().not(".aul");

        children.each((index, item) => {
            // console.log( $(item).children().eq(0).not('.aul'));
            $(item).children().eq(0).css({zIndex: -1});
            $(item).children().eq(0).css({opacity: 0});
        })
        $treeCon.eq(index).children().eq(0).css({zIndex: 1});//改变当前图片层级
        $treeCon.eq(index).children().eq(0).css({opacity: 1});



        $aBtn.eq(index).children().addClass('bg');
        $aBtn.eq(index).siblings().children().removeClass('bg');

    })

    function autoPlay() {
        num = num === 2 ? 0 : num + 1;
        let children = $treeCon.eq(num).siblings().not(".aul");

        children.each((index, item) => {
            // console.log( $(item).children().eq(0).not('.aul'));
            $(item).children().eq(0).css({zIndex: -1});
            $(item).children().eq(0).css({opacity: 0});
        })
        $treeCon.eq(num).children().eq(0).css({zIndex: 1});//改变当前图片层级
        $treeCon.eq(num).children().eq(0).css({opacity: 1});

        $aBtn.eq(num).children().addClass('bg');
        $aBtn.eq(num).siblings().children().removeClass('bg');

    };
    timer = window.setInterval(() => {
        autoPlay();
    }, 2000);

    $treeCon.on('mouseenter', function () {
        window.clearInterval(timer);
    })
    $treeCon.on('mouseleave', function () {
        timer = window.setInterval(() => {
            autoPlay();
        }, 2000);
    })
};*/

let banner = function (ele) {
    //let $banner = $('.banner');
    let $banner = ele;
    let $treeCon = $banner.find('.treeCon');
    let $img = $treeCon.children().eq(1);
    let $aBtn = $banner.find('.aul li');
    let num = 0;
    let timer = null;

    function init() {
        $treeCon.eq(0).children().eq(0).css({opacity: 1, zIndex: 1});
        $aBtn.eq(0).children().addClass('bg').parent().siblings().removeClass('bg');

    };
    init();
    $aBtn.on('click', function () {
        let index = $(this).index();

        /*       $treeCon.eq(index).children().eq(0).css({zIndex: 1}).siblings().not('.aul').css({zIndex: -1});

               $treeCon.eq(index).children().eq(0).css({opacity: 1}).siblings().not('.aul').css({opacity: 0.3});*/
        /////////////
        let children = $treeCon.eq(index).siblings().not(".aul");

        children.each((index, item) => {
            // console.log( $(item).children().eq(0).not('.aul'));
            $(item).children().eq(0).css({zIndex: -1});
            $(item).children().eq(0).css({opacity: 0});
        })
        $treeCon.eq(index).children().eq(0).css({zIndex: 1});//改变当前图片层级
        $treeCon.eq(index).children().eq(0).css({opacity: 1});


        $aBtn.eq(index).children().addClass('bg');
        $aBtn.eq(index).siblings().children().removeClass('bg');

    })

    function autoPlay() {
        num = num === 2 ? 0 : num + 1;
        let children = $treeCon.eq(num).siblings().not(".aul");

        children.each((index, item) => {
            // console.log( $(item).children().eq(0).not('.aul'));
            $(item).children().eq(0).css({zIndex: -1});
            $(item).children().eq(0).css({opacity: 0});
        })
        $treeCon.eq(num).children().eq(0).css({zIndex: 1});//改变当前图片层级
        $treeCon.eq(num).children().eq(0).css({opacity: 1});

        $aBtn.eq(num).children().addClass('bg');
        $aBtn.eq(num).siblings().children().removeClass('bg');

    };
    timer = window.setInterval(() => {
        autoPlay();
    }, 2000);

    $treeCon.on('mouseenter', function () {
        window.clearInterval(timer);
    })
    $treeCon.on('mouseleave', function () {
        timer = window.setInterval(() => {
            autoPlay();
        }, 2000);
    })
};
banner($bannerTop);
banner($bannerBottom);

let contact = function () {
    let $con_touch = $('.con_touch'),
        $email_text = $('.email_text');
    $chat_online = $con_touch.children().eq(2),
        $close = $('.close'),
        $smaller = $('.smaller'),
        $show2 = $('.show2'),
        $input = $('.input'),
        $hidener = $('.hidener'),
        text = '',
        con = '',
        nextStr = '',


    num = 0,
        send_timer = null;
    $send_btn = $('.send_btn');
    $chat_online.on('click', () => {
        $email_text.css({display: 'block'});
        $hidener.css({'display': 'none'}).animate({'left': '670px'}, 100);
    })

    send_timer = window.setInterval(() => {
        text = $input[0].value;
        if (text) {
            $send_btn.css({background: 'gray'});
        } else {
            $send_btn.css({background: 'white'});
        }
    }, 1000);
    $send_btn.on('click', function () {
        num++;
        $input[0].value = null;
        if (num > 2) {
            con = `<p>${text}</p>`;
            $show2.children().remove();
            num = 1;
        } else {
            con += `<p>${text}</p>`;
        }
        window.setTimeout(() => {
            //console.log($show2.css('lineHeight'));
            $show2.html(con);
        }, 500)

    })
    $close.on('click', function () {
        $email_text.css({display: 'none'});
    });
    $smaller.on('click', function () {
        $email_text.css({display: 'none'});
        $hidener.css({'opacity': '1', 'display': 'block', 'position': 'fixed', 'top': '50%'}).animate({
            'left': '1280px',
            'top': '50%'
        }, 500);
    });
    $hidener.on('click', function () {
        $email_text.css({display: 'block'});
        $hidener.css({'display': 'none'}).animate({'left': '670px'}, 100, function () {
            $(document.documentElement).animate({'scrollTop': '3272px'}, 500);
        });
    });
    $input.keydown(function (event) {
        if(event.keyCode===13){
            num++;
            $input[0].value = null;
            if (num > 2) {
                con = `<p>${text}</p>`;
                $show2.children().remove();
                num = 1;
            } else {
                con += `<p>${text}</p>`;
            }
            window.setTimeout(() => {
                //console.log($show2.css('lineHeight'));
                $show2.html(con);
            }, 500)

        }
    })
}
contact();

let user = function () {
    let $user_say = $('.user_say');
    let $list = $('.user_say li');
    let $h3 = $list.find('h3');
    let $iImg = $list.find('i');
    let $user_pic = $list.find('.user_pic');
    let $green = $list.find('.user_smallGreen');
    let $gray = $list.find('.user_smallGray');

    function init() {
        $h3.eq(1).css({background: '#00d15a', color: 'white'});
        $iImg.eq(1).children().css({display: 'block'});
        $green.eq(1).css({display: 'block'});
        $gray.eq(1).children().css({display: 'none'});

    }

    init();

    $list.on('mouseenter', function () {
        let index = $(this).index();
        $h3.eq(index).css({background: '#00d15a ', color: 'white'});
        $iImg.eq(index).children().css({display: 'block'});
        $green.eq(index).css({display: 'block'});
        $gray.eq(index).children().css({display: 'none'});
        if (index !== 1) {
            $h3.eq(1).css({background: 'white', color: 'rgba(0,0,0,0.2)'});
            $iImg.eq(1).children().css({display: 'none'});
            $green.eq(1).css({display: 'none'});
            $gray.eq(1).children().css({display: 'block'});

        }
    });

    $list.on('mouseleave', function () {
        let index = $(this).index();
        $h3.eq(index).css({background: 'white ', color: 'rgba(0,0,0,0.2)'});
        $iImg.eq(index).children().css({display: 'none'});
        $green.eq(index).css({display: 'none'});
        $gray.eq(index).children().css({display: 'block'});
        init();
    })


};
user();



