#### 移动web开发与适配

1、移动web网页的特点

 - 跑在手机端的web页面（H5页面）
 - 跨平台
 - 基于webview
 - 告别IE，拥抱webkit
 - 更高的适配和性能要求

2、常见移动web的适配方法

 - PC：
	- 960px/1000px 居中
	- 盒子模型，定高定宽
	- display:inline=block

 - 移动web:
	- 定高，宽度百分比
	- flex
	- Media query(媒体查询)

3、关于媒体查询

```css
@media 媒体类型 and (媒体特性) {
  /* css样式 */
}
/* 媒体类型：screen,print */
/* 媒体特性： max-width,max-height */
```

4、移动端适配的方案

 - 简单的宽度百分比
 - 媒体查询的使用
 	
```css
.box {
  width: 100%;
}

.inner:nth-child(1){
  background: red;
}

.inner:nth-child(2){
  background: blue;
}

.inner:nth-child(3){
  background: red;
}

.inner:nth-child(4){
  background: blue;
}

@media screen and (max-width:320px) {
  .inner {
    width: 25%;
    height: 100px;
    float: left;
  }
}

@media screen and (min-width:321px) {
  .inner {
    width: 100%;
    height: 100px;
  }
}
```
```html
<div class="box">
  <div class="inner"></div>
  <div class="inner"></div>
  <div class="inner"></div>
  <div class="inner"></div>
</div>
```

5、rem(font size of the root element)

> Equal to the computed value of 'font-size' on the root element.When specified on the 'font-size' property of the root element,the 'rem' units refer to the property's initial value.

 - 字体单位
 	- 值根据html根元素大小而定，同样可以作为宽度，高度等单位
 - 适配原理
 	- 将px替换成rem，动态修改html的font-size适配
 - 兼容性
 	- ios6/android2.1以上，基本覆盖所有流行的手机系统 

6、动态修改font-size

 - media-query

 下面的例子就是在不同屏幕宽度下设置不同的font-size

```css
@media screen and (max-width:360px) and (min-width:321px){
  html {
    font-size: 20px;
  }
}

@media screen and (max-width:320px) {
  html {
    font-size: 24px;
  }
} 
```

 - js动态修改

我们可以在页面打开的时候，获取到屏幕的宽度，然后设置根元素的font-size：

```js
let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
let htmlDom = document.getElementsByTagName('html')[0];
htmlDom.style.fontSize = htmlWidth / 10 + 'px';
```

7、在scss中进行简单的适配

```scss
@function px2rem($px) {
  $rem: 37.5px;
  @return ($px / $rem) + rem;
}
```

在这里，37.5是一个基准值，相对于主流iPhone的宽度来的。例如，设计图上给你一个75px宽度的div(一般设计图都是二倍图)，也就是说，我们需要把这个div宽度设置成37.5px。但是，这里的37.5px指的是在375px屏幕下的宽度。如果屏幕宽度变成320px,那么我们要显示的宽度就不是37.5px了。

```css
div {
  width: px2rem(37.5px); /* 代码中的显示 */
  width: 1rem; /* 375屏幕浏览器中的显示 */
  width: 37.5px; /* 375屏幕下，div的实际宽度 */
  width: 1rem; /* 320屏幕浏览器中的显示*/
  width: 32px; /* 375屏幕下，div的实际宽度 */
}
```
	
实际css代码只有一句：`width: px2rem(37.5px);`但是，这种做法得到的div，宽度都是10%,并且这个宽度不依赖于父元素。

> 有时候我们要去开发自己的UI库，这个时候不适合使用rem来写样式。因为每个项目的根元素的font-size可能都是不一样的。