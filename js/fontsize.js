let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
console.log(htmlWidth);
let htmlDom = document.getElementsByTagName('html')[0];
htmlDom.style.fontSize = htmlWidth / 10 + 'px';

// 动态修改根元素的font-size的值

window.addEventListener('resize',(e)=>{
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let htmlDom = document.getElementsByTagName('html')[0];
    htmlDom.style.fontSize = htmlWidth / 10 + 'px';
});

// 监听窗口宽度变化