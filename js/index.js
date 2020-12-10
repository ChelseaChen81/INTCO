let photo1 = (function () {
    //1获取元素
    let photo1 = document.querySelector("#photo1"),
        bottomPhoto=photo1.querySelector("#bottomPhoto"),
        oUl = document.querySelector("#bottomPhoto>ul"),
        oLis = oUl.getElementsByTagName("li"),
        oImgs = oUl.getElementsByTagName("img"),
        btnLeft = document.querySelector(".left"),
        btnRight = document.querySelector(".right"),
        autoTimer = null,
        step = 0,
        resData = null;
//2绑定数据
    function getData() {
        let xhr = new XMLHttpRequest();
        xhr.open("get","../json/data2.json",false);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4&&xhr.status===200){
                resData = JSON.parse(xhr.responseText)

            }
            console.log(resData);
        };
        xhr.send(null);

    }
//3插入图片
    let strLi = ``;
    function bindHtml(){
        resData.forEach((item,index)=>{
            strLi+=`<li><img src="" realImg="${item.img}"></li>`;
        });
        oUl.innerHTML = strLi+strLi;


    }
//4.图片加载
    function loadImg(){
        [...oImgs].forEach((item,index)=>{
            let tempImg = new Image();
            tempImg.src = item.getAttribute("realImg");
            tempImg.onload = function(){
                item.src = this.src;
                animate(item,{opacity:1},500);
            }
        })
    }
//5.自动播放
    function autoPlay(){
        step++;
        if(step===oLis.length-3){
            oUl.style.left = 0;
            step = 1;

        }
        animate(oUl,{left:-step*200},500);


    }

    function overout(){
        //划过时，去掉自动轮播效果，左右箭头显示出来
        photo1.onmouseover = ()=>{
            clearInterval(autoTimer);
            btnLeft.style.display = btnRight.style.display = "block";
        };
        //划出时：左右箭头隐藏，再重新自动轮播
        photo1.onmouseout = ()=>{
            btnLeft.style.display = btnRight.style.display = "none";
            autoTimer = window.setInterval(autoPlay,2000);
        }
    }
    function bannerBtn(){
        [...oLis].forEach((item,index)=>{
            item.onclick = ()=>{
                step = index; //把要显示的banner的索引改成当前点击焦点的索引
                animate(oUl,{left:-step*200},500);
            };
        })
    }

    function handleArrow(){
        btnLeft.onclick = function(){
            step--;
            if(step<0){

                oUl.style.left = -(oLis.length-4)*200+"px";
                step = oLis.length-5;
            }
            animate(oUl,{left:-step*200},500);
        };
        btnRight.onclick = autoPlay;
    }
    return {
        init() {
            //img.获取数据
            getData();
            //2.绑定数据
            bindHtml();
            //3.延迟加载
            window.setTimeout(loadImg,1000);
            //4.自动轮播
            autoTimer = window.setInterval(autoPlay,2000);
            //5.启动和停止轮播
            overout();
            //6.点击焦点切换
            bannerBtn();
            //7.点击左右箭头切换
            handleArrow();
        }
    }
})();
photo1.init();


