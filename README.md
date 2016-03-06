#cClock

A flat and dynamic clock by Canvas

##Index

* [Quick start](#quick-start)
* [Arguments](#arguments)
* [Options](#options)
* [License](#license)

###中文说明
* [使用说明](#使用说明)
* [配置参数](#配置参数)
* [注意事项](#注意事项)
* [其它](#其它)

##Quick start

The following file should be included.

```html
<script src="scripts/cClock.min.js"></script>
```

Apply cClock and call the function as simple as

```html
<canvas id="canvas" width="400" height="400">A flat and dynamic clock.</canvas>
```

```javascript
cClock();
```

All done !

##Arguments

Custom cClock with available arguments which are listed below.

```javascript
cClock(argument, argument, argument);
```

| Option | Type | Default | Description |
|:---:|:---:|:---:|:---:|
| width | number | 400 | The width of  zooming window. |
| height | number | 400 | The height of  zooming window. |
| position | string | "right" | The relative positon to the zoomed image or container. "top", "bottom" and "left" are permitted.  |
| offsetX | number | 20 | The deviation on X-asix, can't be negative. |
| offsetY | number | 0 | The deviation on Y-asix, can't be negative. |
| opacity | number | 0.6 | The opacity of lens div. |
| bgColor | string | "#fff" | The background color of lens div. |
| loading | string | "Loading..." | The loading text on zooming window when  big image is loading. |
| suffixName | string | "_big" | The suffix name of big image. |
| imgType | string | the zoomed image type | The type of big image. The default option is recommended. |

##Options

1. 

##License

The MIT License (MIT)

Copyright (c) 2016 Ting Shen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

--------

###使用说明

引入下列文件

```html
<script src="scripts/cClock.min.js"></script>
```

添加`<canvas>`标签，设置宽高，并在标签内部添加一些描述，最后运行函数

```html
<canvas id="canvas" width="400" height="400">A flat and dynamic clock.</canvas>
```

```javascript
cClock();
```

即可实现默认效果。

###配置选项

自定义cClock时，在函数中传入一个对象，可选参数列于下表。

```javascript
cClock(argument, argument, argument);
```

<!-- 画布宽高 400 400 -->

<!-- 时针长度比例 0.65-->
<!-- 分针长度比例 0.85-->
<!-- 秒针长度比例 0.8-->

<!-- 指针粗细 2 -->
<!-- 指针颜色 #000-->
<!-- 指针类型 round -->

<!-- 圆心半径 5 -->

<!-- 时针背部长度比例 0.2-->
<!-- 分针背部长度比例 0.2-->
<!-- 秒针背部长度比例 0.2-->

<!-- 边框粗细 2 -->
<!-- 边框颜色 #000-->

<!-- 背景色 #fff-->

<!-- 小时刻度粗细 6-->
<!-- 小时刻度长度 0.15-->

<!-- 分钟刻度粗细 2-->
<!-- 分钟刻度长度 0.08-->

<!-- 刻度颜色 #000-->

| 选项 | 类型 | 默认值 | 描述 |
|:---:|:---:|:---:|:---:|
| width | number | 400 | 放大镜窗口的宽度 |
| height | number | 400 | 放大镜窗口的高度 |
| position | string | "right" | 放大镜窗口相对于图片或容器的位置，还可设置为"top", "bottom", "left" |
| offsetX | number | 20 | 放大镜窗口在水平方向上的偏移，不能为负 |
| offsetY | number | 0 | 放大镜窗口在水平方向上的偏移，不能为负 |
| opacity | number | 0.6 | 镜头div的透明度 |
| bgColor | string | "#fff" | 镜头div的背景色 |
| loading | string | "Loading..." | 加载图片时显示的文字，水平垂直居中 |
| suffixName | string | "_big" | 大图后缀名 |
| imgType | string | 原图格式 | 大图的格式，建议与原图相同 |

###注意事项

1. 

###其它

1. 制作这个时钟的原因是我在看红皮书《JavaScript高级程序设计》时，在“使用 Canvas 绘图”这一章看到了作为示例的时钟，在感叹Canvas的神奇之时，有了让这个时钟转动起来的想法，同时也是对自己的一个挑战。

2. 开发过程中，看着代码逐渐从稀少到臃肿，从清晰到混乱，于是一遍又一遍地重构、剥离函数，增长了一些这方面的经验。

3. 开发能自定义的程序，能让自己同时站在开发者和用户的角度看到需求和问题。

4. 复习了不少高中数学的知识。。。

5. 未来有时间精力的情况下，会继续维护开发这款时钟，提供更多效果。
