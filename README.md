#cClock

A flat and dynamic clock by Canvas

##Index

* [Quick start](#quick-start)
* [Options](#options)
* [Attentions](#attentions)
* [License](#license)

##中文说明
* [使用说明](#使用说明)
* [配置参数](#配置参数)
* [注意事项](#注意事项)
* [其它](#其它)

##Index

###Quick start

The following file should be included.

```html
<script src="scripts/cClock.min.js"></script>
```

Apply cClock and call the function as simple as

```html
<canvas class="cClock" width="400" height="400">A flat and dynamic clock.</canvas>
```

```javascript
cClock({}, "cClock");
```

All done !

###Options

The cClock has awesome and customizable feature.

```javascript
cClock(options, className, showTime);
//or
cClock({
    option: value,
    option2: value2,
    ...
}, className, {
    hour: hour,
    minute: minute,
    second: second
});
```

The Parameters are :

1. A object to custom cClock including available options which are listed below. A null object means default options.

2. cClock's class name, should be string.

3. Optional, a object to make the cClock at including time. Also can be `true` to make it at default time which is 10 : 08 : 30.

| Option | Type | Default | Description |
|:---:|:---:|:---:|:---:|
| hourLength | Number | 0.65 | The length of hour hand. |
| hourWidth | Number | 2 | The width of hour hand. |
| minuteLength | Number | 0.85 | The length of minute hand. |
| minuteWidth | Number | 2 | The width of minute hand. |
| secondLength | Number | 0.8 | The length of second hand. |
| secondWidth | Number | 2 | The width of second hand. |
| handColor | String | "#000" | The color of hands. |
| handStyle | String | "butt" | The style of hands. Only "round" and "square" are permitted. |
| centerRadius | Number | 5 | The radius of center circle. |
| hourBackLength | Number | 0.2 | The length of back hour hand. |
| minuteBackLength | Number | 0.2 | The length of back minute hand. |
| secondBackLength | Number | 0.2 | The length of back second hand. |
| borderWidth | Number | 2 | The width of border. |
| borderColor | String | "#000" | The color of border. |
| padding | Number | 0 | The distance between border and dial. |
| bgColor | String | "#fff" | The backgound color of clock. |
| hourDialWidth | Number | 2 | The width of hour dial.  |
| hourDialLength | Number | 0.15 | The length of hour dial. |
| minuteDialWidth | Number | 2 | The width of minute dial. |
| minuteDialLength | Number | 0.08 | The length of minute dial. |
| dialColor | String | "#000" | The color of dial. |

###Attentions

1. The width and height of cClock depend on `<canvas>`.

2. So assign the width and height in this tag and make sure the tag is a square which means width equal height !

3. The length of some options should be assigned decimal, which means "decimal times the radius length".

4. If the length or width of one option equal 0,  the option will not display.

5. For example, if "secondLength: 0", then there is no second hand.

6. There will be no minute dial if there is no hour dial.

###License

The MIT License (MIT)

Copyright (c) 2016 Shen Ting

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

--------

##中文说明

###使用说明

引入下列文件，

```html
<script src="scripts/cClock.min.js"></script>
```

添加`<canvas>`标签，设置宽高，并在标签内部添加一些描述，

```html
<canvas class="cClock" width="400" height="400">A flat and dynamic clock.</canvas>
```

运行函数，

```javascript
cClock({}, "cClock");
```

即可实现默认效果。

###配置选项

cClock拥有丰富的自定义功能。

```javascript
cClock(options, className, showTime);
//或
cClock({
    option: value,
    option2: value2,
    ...
}, className, {
    hour: hour,
    minute: minute,
    second: second
});
```

参数分别为：

1. 自定义cClock外观的配置对象，可选参数列于下表，空对象表示默认效果。

2. cClock的类名，字符串形式。

3. 可选，传入一个时间对象，可使cClock静止在设置的时间，也可传入`true`使之静止在默认时间——10 : 08 : 30。

| 选项 | 类型 | 默认值 | 描述 |
|:---:|:---:|:---:|:---:|
| hourLength | Number | 0.65 | 时针的长度 |
| hourWidth | Number | 2 | 时针的宽度 |
| minuteLength | Number | 0.85 | 分针的长度 |
| minuteWidth | Number | 2 | 分针的宽度 |
| secondLength | Number | 0.8 | 秒针的长度 |
| secondWidth | Number | 2 | 秒针的宽度 |
| handColor | String | "#000" | 指针的颜色 |
| handStyle | String | "butt" | 指针的类型，还可设置为"round"、"square" |
| centerRadius | Number | 5 | 中心圆的半径 |
| hourBackLength | Number | 0.2 | 时针后部的长度 |
| minuteBackLength | Number | 0.2 | 分针后部的长度 |
| secondBackLength | Number | 0.2 | 秒针后部的长度 |
| borderWidth | Number | 2 | 边框的宽度 |
| borderColor | String | "#000" | 边框的颜色 |
| padding | Number | 0 | 边框和刻度之间的内边距 |
| bgColor | String | "#fff" | 时钟的背景色 |
| hourDialWidth | Number | 2 | 小时刻度的宽度  |
| hourDialLength | Number | 0.15 | 小时刻度的长度 |
| minuteDialWidth | Number | 2 | 分钟刻度的宽度 |
| minuteDialLength | Number | 0.08 | 分钟刻度的长度 |
| dialColor | String | "#000" | 刻度的颜色 |

###注意事项

1. 时钟的大小取决于`<canvas>`的宽高。

2. 必须要给该标签设置宽高，并且保证是一个正方形，也就是宽高要相等。

3. 一些与长度有关的选项需设置为小数，与时钟半径有关。

4. 如果选项的长度或宽度设置为0，则表示不显示该选项有关的内容。

5. 例如，如果设置"secondLength: 0"，就表示不需要秒针。

6. 如果把小时刻度设置为不显示，那么分钟刻度也不会显示。

###其它

1. 制作这个时钟的原因是我在看红皮书《JavaScript高级程序设计》时，在“使用 Canvas 绘图”这一章看到了作为示例的时钟。感叹Canvas的神奇之时，有了让这个时钟转动起来的想法。

2. 开发过程中，看着代码逐渐从稀少到臃肿，从清晰到混乱，一遍又一遍地重构、剥离函数，增长了一些这方面的经验。

3. 复习了不少高中数学的知识。。。

4. 未来有时间精力的情况下，会继续维护开发这款时钟，提供更多效果。
