let $lBox=$(".pic1"),
    $oImg1=$lBox.children("img"),
$pic2=$(".pic2"),
    $oImg2=$pic2.find("img"),
    $rBox=$(".bigPic"),
    $mask=$("#mask"),
    $rImg=$rBox.children("img");

function init() {
    $oImg1.eq(0).css({display:"block"}).siblings().css({display:"none"});
}
init();
var n=0;
$oImg2.each(function (index,item) {
    $(item).on("click",function () {
        $oImg1.eq(index).css({display:"block"}).siblings().css({display:"none"})
        n=index;
    })

});

$oImg1.each(function (index,item) {

    $lBox.on("mouseenter",function (e) {
        $rImg.eq(n).css({display:"block"}).siblings().css({display:"none"});
        $mask.show().css({
            left:e.pageX-$(this).offset().left-$mask.outerWidth()/2,
            top:e.pageY-$(this).offset().top-$mask.outerHeight()/2
        });
        $rBox.show();
    }).on("mousemove",function (e) {
        let x=e.pageX-$(this).offset().left-$mask.outerWidth()/2;
        let y=e.pageY-$(this).offset().top-$mask.outerHeight()/2;
        let maxLeft=$(this).outerWidth()-$mask.outerWidth();
        let maxTop=$(this).outerHeight()-$mask.outerHeight()-20;
        x=x<0?0:x>maxLeft?maxLeft:x;
        y=y<0?0:y>maxTop?maxTop:y;
        $mask.css({
            left:x,
            top:y
        });
       // console.log($rImg.eq(index));
        $rImg.eq(n).css({
            left:-4*x,
            top:-4*y
        })
    }).on("mouseleave",function(){
        $mask.hide();
        $rBox.hide();
    })
});
