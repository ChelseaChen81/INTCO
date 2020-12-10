let products=document.getElementsByClassName("products")[0];
let list=products.getElementsByTagName("li");
console.log(list);
let data=null;
let data1=null;

let span=document.getElementsByClassName("span");
let xhr= new XMLHttpRequest();
let xhr1= new XMLHttpRequest();
xhr.open("get","json/data.json",false);
xhr1.open("get","json/data1.json",false);


xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
        data=JSON.parse(xhr.responseText);

}
};
xhr1.onreadystatechange=function(){
    if(xhr1.readyState==4&&xhr1.status==200){
        data1=JSON.parse(xhr1.responseText);
    }
};
xhr.send(null);
xhr1.send(null);
console.log(data);
console.log(data1);

bindHTML(data);
function bindHTML(data){
    let str=``;
    data.forEach((item)=>{
        str+=`
       <li><img src="${item.picImg}" alt="">
                <p>${item.title}</p></li>
        `
    });
    products.innerHTML=str;

}
console.log(list);

span.onclick=change;



