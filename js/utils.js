var utils = (function () {
    function listToAry(arg) {
        var ary = [];
        try {
            ary = [].slice.call(arg)
        } catch (e) {
            for (var i = 0; i < arg.length; i++) {
                ary[i] = arg[i]
            }
        }
        return ary;
    }

    function toJson(jsonstr) {
        return "JSON" in window ? JSON.parse(jsonstr) : eval("(" + jsonstr + ")")
    }

    function offset(ele) {
        let l = ele.offsetLeft;
        let t = ele.offsetTop;
        let p = ele.offsetParent;
        while (p) {
            l += p.offsetLeft + p.clientLeft;
            t = p.offsetTop + p.clientTop;
            p = p.offsetParent;
        }
        return {l, t}
    }

    function getCss(ele, attr) {
        let res = null;
        if (window.getComputedStyle) {
            res = window.getComputedStyle(ele, null)[attr];
        } else {
            res = ele.currentStyle[attr]
        }
        // "数值"+"数值+单位"---> 提取数值部分，并且转换成数类型
        let reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|rem|em|pt)?$/;

        return reg.test(res) ? parseFloat(res) : res
    }

    function setCss(ele, attr, value) {
        // 判断attr是否是如下这些，width|height|margin|padding|left|top|right|bottom...
        var reg = /^(width|height|(margin|padding)?(left|top|bottom|right)?)$/i;
        if (reg.test(attr)) {
            if (!isNaN(value)) {
                value += "px";
            }
        }
        ele.style[attr] = value;


    }

    function setGroup(ele, obj) {

        if (!Object.prototype.toString.call(obj) === "[object Object]") return;
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                setCss(ele, attr, obj[attr]);
            }
        }
    }

    // 根据传参的不同，调用不同的方法
    function css() {
        var args = arguments;
        var fn = getCss;
        if (args.length === 3) fn = setCss;
        if (args.length === 2 && args[1] instanceof Object) {
            fn = setGroup;
        }
        return fn.apply(null, args)
    }

    function win(attr, value) {//第二个没传,表示获取值
        if (typeof value =="undefined") {
            return document.documentElement[attr]|| document.body[attr]
        }
        document.documentElement[attr] = value;
        document.body[attr] = value
    }

    function random(n, m) {//求随机数
        n = Number(n);
        m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            //只要有一个不是有效数字,则返回默认的一个0-1随机数
            return Math.random();
        }
        if (n > m) {//则交换n和m的值
            n = n + m;
            m = n - m;//把n的值赋给m
            n = n - m;//再把m的值赋给n
        }
        return Math.round(Math. random()*(m-n)+n);

    }


        return {
            listToAry: listToAry,
            toJson: toJson,
            offset: offset,
            getCss: getCss,
            setCss: setCss,
            setGroup: setGroup,
            css: css,
            win: win,
            random:random
        }
    }

)();
