//回到顶部
let backTop = function () {
    let top = document.getElementsByClassName("top")[0];
    let timer;
    top.onclick = function () {
        //当前滚动量
        let H = document.documentElement.scrollTop;
        timer = setInterval(() => {
            console.log(1);
            H -= 10;
            if (H <= 0) {
                clearInterval(timer)
            }
            document.documentElement.scrollTop = H;
        }, 10);
    };
    if (document.documentElement.scrollTop > document.documentElement.clientHeight) {
        top.style.display = "block";
    } else {
        top.style.display = "none";
    }
    window.onscroll = function () {
        let H = document.documentElement.scrollTop;
        if (H > document.documentElement.clientHeight) {
            top.style.display = "block";
        } else {
            top.style.display = "none";
        }
    };
    window.onwheel = function () {
        clearInterval(timer)
    }
};
backTop();

//购物车事件
let car = function () {
    //全部选择勾选处理
    let car = $(".car");
    let checkAll = document.getElementsByClassName("all")[0];
    let otherCheack = $(".product1>.check"),
        prc = $(".product1>.text>.bottom> .prc"),
        minus = $(".product1>.text>.bottom .minus"),
        add = $(".product1>.text>.bottom .add"),
        num = $(".product1>.text>.bottom .num"),
        del = $(".product1>.text>.bottom .delete");
    checkAll.onclick = function () {
        if (checkAll.checked) {
            otherCheack.prop("checked", true)
        } else {
            otherCheack.prop("checked", false)
        }
    };
    otherCheack.click(function () {
        let flg = true;
        otherCheack.each(function () {
            if (this.checked === false) {
                flg = false
            }
        });
        if (flg) {
            checkAll.checked = true;
        } else {
            checkAll.checked = false;
        }
    });

    //商品数量与价格处理
    minus.click(function () {
        let val = $(this).next()[0].value;
        $(this).next()[0].value = --val;
        if (val <= 1) {
            $(this).next()[0].value = 1
        }
        change.call(this, val, -1)
    });
    add.click(function () {
        let val = $(this).prev()[0].value;
        $(this).prev()[0].value = ++val;
        change.call(this, val, 1)
    });

    num.on("keyup", function () {
        let val = $(this)[0].value;
        $(this).parent().prev().html(`$${val * 150}`);
    });

    del.click(function () {
        $(this).parents(".product1").remove();
    });

    function change(n, m) {
        let val;
        if (m > 0) {
            //加
            val = $(this).prev()[0].value;
        } else {
            //减
            val = $(this).next()[0].value;
        }
        if (n !== val) {
            $(this).parent().prev().html(`$${n * 150}`)
        }
    };

    car.on("mouseenter", function () {

    })
};
car();
//订单加减
let orderShow = function () {
    let pro = $(".order-show>.product>.pro");
    let del = pro.find(".del");
    let num = pro.find(".num");
    let minus = num.children(".minus");
    let count = num.children(".count");
    let add = num.children(".add");

    minus.click(function () {
        let val = $(this).next()[0].value;
        $(this).next()[0].value = --val;
        if (val <= 1) {
            $(this).next()[0].value = 1
        }
    });
    add.click(function () {
        let val = $(this).prev()[0].value;
        $(this).prev()[0].value = ++val;
    });
    del.click(function () {
        $(this).parents(".pro").remove();
    });
};
orderShow();

//订单统计
let click = function () {
    let minus = $(".order-show .minus"),
        add = $(".order-show .add"),
        count = $(".order-show>.product>.pro>.price .count"),
        remove = $(".order-show .del");
    let cc = function () {
        let count = $(".order-show>.product>.pro>.price .count");
        let tt = $(".order-banner3>p>span");
        let n = 0;
        count.each(function () {
            n += parseFloat(this.value) || 0;
        });
        tt.html(n.toString())
    };

    minus.click(cc);
    add.click(cc);
    count.on("blur", cc)
    remove.on("click", cc)

};
click();
//弹出对话框
let contact = function () {
    let $contact = $('.order-banner4'),
        $con_touch = $('.con_touch'),
        $email_text = $('.email_text');
    $chat_online = $(".order-banner4>.mask>p>a");
    $close = $('.close'),
        $smaller = $('.smaller'),
        $show2 = $('.show2'),
        $input = $('.input'),
        $hidener = $('.hidener'),
        text = '',
        con = '',
        nextStr = '';
    num = 0,
        send_timer = null;
    $send_btn = $('.send_btn');
    $chat_online.on('click', () => {
        console.log($email_text);
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

    });

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
            $(document.documentElement).animate({'scrollTop': '3000'}, 500);
        });
    });
    $input.keydown(function (event) {
        if (event.keyCode === 13) {
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
            }, 100)

        }
    })
};
contact();

//文字跑马灯
let autoplay = function () {
    let text = $(".order-banner2>.text>.p2");
    let span = text.children("span").eq(0);
    let span1 = text.children("span").eq(1);
    let H = span.outerHeight();
    let n = 0;
    let timer = setInterval(() => {
        n++;
        text.scrollTop(n);
        if (text.scrollTop()>= H+5 ) {
            text.scrollTop(0);
            n = 0;
        }
    }, 50);
    //鼠标经过离开
    text.on("mouseover", function () {
        clearInterval(timer);
        n = text.scrollTop();
    });
    text.on("mouseout", function () {

        timer = setInterval(() => {
            n++;
            text.scrollTop(n);
            if (text.scrollTop()>= H+5 ) {
                text.scrollTop(0);
                n = 0;
            }
        }, 50);
    })
};
autoplay();

//视频点击
let videoClick = function () {
    let vv = $(".vv");
    let video = vv.children("video");
    let title = $(".order-banner1>.mask>p>a");
    let mask = $(".order-banner1>.mask");
    title.click(function () {
        mask.hide();
        vv.show();
        video[0].play();
    });
    video[0].addEventListener("ended", function () {
        console.log(1);
        mask.show();
        vv.hide();
        video[0].pause();
    });


};
videoClick();


