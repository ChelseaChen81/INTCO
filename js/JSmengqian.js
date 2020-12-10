let $=(function () {
    //获取浏览器盒子模型
    function win(attr,value) {
        if(arguments.length==1){
            return document.documentElement[attr]||document.body[attr];
        }else if(arguments.length==2) {
            document.documentElement[attr]=value;
            document.body[attr]=value;
            return this;
        }
    }
    //获取当前元素距离body的偏移量
    function offset(curEle){
        let T=curEle.offsetTop;
        let L=curEle.offsetLeft;
        let parent=curEle.offsetParent;
        while(parent){
            if(!/MS 8/g.test(navigator.userAgent)){
                T+=parent.clientTop;
                L+=parent.clientLeft;
            }
            T+=parent.offsetTop;
            L+=parent.offsetLeft;
            parent=parent.offsetParent;
        }
        return{top:T,left:L}
    }
    //获取 n-m的随机整数
    function getRandom(n,m) {
        n=Number(n);
        m=Number(m);
        if(isNaN(n) || isNaN(m)){//只要有一个不是有效数，则返回默认的一个0~1随机数
            return Math.random();
        }
        //如果n>m 则交换位置
        if (n>m)[n,m]=[m,n]; // n=n+m; m=n-m; n=n-m;
        return Math.round(Math.random()*(m-n)+n);
    }

    function hasClass(curEle,classStr) {
        //1.根据参数curEle获取当前元素的className
        let className=curEle.className;
        //2.根据参数classStr创建正则
        ///(^| )box1( |$)/g
        let reg=new RegExp("(^| )"+classStr+"( |$)","g");
        //3.判断字符串className是否匹配正则reg
        return reg.test(className);
    }
    function addClass(curEle,...arg) {
        //arg是一个数组 里面存放着所有想要增加的类名 我们就遍历数组
        arg.forEach((item)=>{
            //根据hasClass方法判断当前元素有没此类名 没有才加
            if(!this.hasClass(curEle,item)){
                curEle.className+=" "+item;
            }
        });
        return this;
    }
    function removeClass(curEle,...arg) {
        let reg;
        let className=curEle.className;
        arg.forEach((item)=>{
            reg=new RegExp("(^| )"+item+"( |$)","g");
            className=className.replace(reg," ");
        });
        className=className.replace(/^ +| +$/g,"");
        curEle.className=className;
        return this;
    }
    function toggleClass(curEle,classStr) {
        if(this.hasClass(curEle,classStr)){
            this.removeClass(curEle,classStr)
        }else {
            this.addClass(curEle,classStr);
        }
        return this;
    }

    function getCss(curEle,cssAttr) {
        //获取当前元素curEle的指定样式属性cssAttr的值 也是字符串
        let val=getComputedStyle(curEle)[cssAttr];
        //只要是px,pt,pp,em,rem,deg中任意一个作为单位了 就会去掉
        let reg=/^[+-]?([1-9]\d+|\d)(\.\d+)?(px|pt|pp|em|rem|deg)$/g;
        if(reg.test(val)){
            val=parseFloat(val);
        }
        return val;
    }
    function setCss(curEle,cssAttr,cssValue) {
        let reg=/^width|height|left|top|bottom|right|(margin|padding)(Left|Top|Bottom|Right)$/;
        if(reg.test(cssAttr)){
            //判断cssValue 没有单位加上单位
            /px/.test(cssValue.toString())?null:cssValue+="px";
        }
        curEle.style[cssAttr]=cssValue;
        return this;
    }
    function setGroupCss(curEle,cssObj) {
        //只需要遍历cssObj 分别将属性名和属性值传给setCss执行即可
        if(Object.prototype.toString.call(cssObj)=="[object Object]"){
            for (let key in cssObj){
                this.setCss(curEle,key,cssObj[key]);
            }
        }
        return this;
    }
    function css(curEle,...arg) {
        if(arg.length==2){
            return this.setCss(curEle,arg[0],arg[1]);
        }else if(arg.length==1){
            if(Object.prototype.toString.call(arg[0])=="[object Object]"){
                return this.setGroupCss(curEle,arg[0]);
            }else {
                return this.getCss(curEle,arg[0]);
            }
        }
    }

    return{
        win:win,
        offset:offset,
        getRandom:getRandom,
        hasClass,
        addClass,
        removeClass,removeClass,
        toggleClass:toggleClass,
        getCss:getCss,
        setCss,setCss,
        setGroupCss:setGroupCss,
        css:css,
    }
})();

