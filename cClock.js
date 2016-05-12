/*!
 * cClock.js
 *
 * Version 1.3.0
 *
 * https://github.com/pciapcib/cClock
 *
 * MIT licensed
 *
 * Copyright (c) 2016 Ting Shen
 */
function cClock(cClockObj) {
    'use strict';

    var canvas = document.querySelector('[data-cClock=' + cClockObj.dataName + ']');

    if (!canvas) {
        return false;
    }

    var options = cClockObj.options,
        showTime = cClockObj.showTime;

    var defaultOptions = {
        hourLength: 0.65,
        hourWidth: 2,
        minuteLength: 0.85,
        minuteWidth: 2,
        secondLength: 0.8,
        secondWidth: 2,
        handColor: '#000',
        handStyle: 'butt',
        centerRadius: 5,
        hourBackLength: 0.2,
        minuteBackLength: 0.2,
        secondBackLength: 0.2,
        borderWidth: 2,
        borderColor: '#000',
        padding: 0,
        bgColor: '#fff',
        hourDialWidth: 2,
        hourDialLength: 0.15,
        minuteDialWidth: 2,
        minuteDialLength: 0.08,
        dialColor: '#000'
    };

    for (var option in defaultOptions) {
        if (!options.hasOwnProperty(option)) {
            options[option] = defaultOptions[option];
        }
    }

    var context = canvas.getContext('2d');

    var canvasWidth = canvas.offsetWidth;
    context.translate(canvasWidth / 2, canvasWidth / 2);

    var width = canvasWidth - options.borderWidth;

    var twoPi = 2 * Math.PI,
        clockLength = calcLength(width),
        currentTime;

    // Test
    if (showTime) {
        var flag = 0,
            timeTest;
    }

    runClock();

    /**
     * 计算时钟各部分的长度
     * calculate the length of clock's each part
     * @param  {Number} width 用于计算半径 For calculating radius
     * @return {Object}       包含各部分长度的对象 A Object including lengths
     */
    function calcLength(width) {
        var radius = Math.ceil(width / 2 - 1);

        var length = {
            radius: radius,

            hourLength: radius * options.hourLength,
            minuteLength: radius * options.minuteLength,
            secondLength: radius * options.secondLength,

            hourBackLength: radius * options.hourBackLength,
            minuteBackLength: radius * options.minuteBackLength,
            secondBackLength: radius * (options.secondLength === 0 ? 0 : options.secondBackLength),

            hourDialLength: radius * (1 - options.hourDialLength),
            minuteDialLength: radius * (1 - options.minuteDialLength)
        };

        return length;
    }

    /**
     * 最主要的函数，计算坐标，绘制时钟
     * The most important function for calculating coordinates and drawing the clock
     */
    function runClock() {
        currentTime = dateNow();

        // Test
        if (showTime === true) {
            currentTime = dateNowTest(10, 8, 30);
        } else if (showTime) {
            currentTime = dateNowTest(showTime.hour, showTime.minute, showTime.second);
        }

        // 计算各指针的坐标
        // Calculate coordinates of hands
        var hourCoord = calcCoordinate(currentTime.hour, clockLength.hourLength, true);
        var minuteCoord = calcCoordinate(currentTime.minute, clockLength.minuteLength, false);
        var secondCoord = calcCoordinate(currentTime.second, clockLength.secondLength);

        var hourBackCoord = calcCoordinate(currentTime.hour, clockLength.hourBackLength, true);
        var minuteBackCoord = calcCoordinate(currentTime.minute, clockLength.minuteBackLength, false);
        var secondBackCoord = calcCoordinate(currentTime.second, clockLength.secondBackLength);

        drawClock(hourCoord, minuteCoord, secondCoord, hourBackCoord, minuteBackCoord, secondBackCoord);

        // Test
        // console.clear();
        // console.log(currentTime.hour + ":" + currentTime.minute + ":" + currentTime.second);

        var timeOut = setTimeout(function() {
            runClock();
        }, 1000);

        if (showTime) {
            clearTimeout(timeOut);
        }
    }

    /**
     * 取得当前时间
     * Get current time
     * @return {Object} 包含各部分时间的对象 A Object including time
     */
    function dateNow() {
        var date = new Date();

        var time = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        };

        return time;
    }

    /**
     * 计算坐标
     * Calculate coordinates
     * @param  {Number}  time
     * @param  {Number}  handLenth
     * @param  {Boolean} isHour
     * @return {Array}            坐标 [x, y]
     */
    function calcCoordinate(time, handLenth, isHour) {
        // 传入的事件如果是小时，就改成12小时制，并乘5(使最大值与分钟相同)
        // Change hour to 12-hour clock and times 5
        if (isHour) {
            if (time >= 12) {
                time -= 12;
            }
            time *= 5;
        }

        var offsetR = correctRadian(isHour);

        // 1/4 表示将坐标轴顺时针旋转90度
        // 1/4 means rotating the coordinate axes 90 degrees
        var radian = (time / 60 + 1 / 4) * twoPi + offsetR;

        var x = -handLenth * Math.cos(radian);
        var y = -handLenth * Math.sin(radian);

        return [x, y];

        /**
         * 补偿偏移的弧度
         * Correct offsets of radian
         * @param  {Boolean} isHour
         * @return {Number}
         */
        function correctRadian(isHour) {
            var offset;

            if (isHour) {
                offset = (currentTime.minute / 60) * (1 / 12) * twoPi;
            } else {
                if (isHour === false) {
                    offset = (currentTime.second / 60) * (1 / 60) * twoPi;
                } else {
                    offset = 0;
                }
            }

            return offset;
        }
    }

    /**
     * 绘制时钟
     * Draw clock
     */
    function drawClock(hourCoord, minuteCoord, secondCoord, hourBackCoord, minuteBackCoord, secondBackCoord) {
        context.clearRect(-canvasWidth / 2, -canvasWidth / 2, canvasWidth, canvasWidth);

        drawCircle(clockLength.radius);

        if (options.hourDialWidth && options.hourDialLength) {
            drawDial();
        }

        drawHand();

        /**
         * 绘制边框和中心圆
         * Draw border and center circle
         * @param  {Number} radius
         */
        function drawCircle(radius) {
            context.beginPath();

            context.arc(0, 0, radius, 0, twoPi, false);

            if (options.borderWidth) {
                context.lineWidth = options.borderWidth;
                context.strokeStyle = options.borderColor;
                context.stroke();
            }

            context.fillStyle = options.bgColor;
            context.fill();

            if (options.centerRadius) {
                context.beginPath();
                context.arc(0, 0, options.centerRadius, 0, twoPi, false);
                context.fillStyle = options.handColor;
                context.fill();
            }
        }

        /**
         * 绘制刻度
         * Draw dials
         */
        function drawDial() {
            context.beginPath();

            var i, hourDialStart, hourDialEnd;

            for (i = 0; i < 60; i += 5) {
                hourDialStart = calcCoordinate(i, clockLength.hourDialLength - options.padding);
                hourDialEnd = calcCoordinate(i, clockLength.radius - options.padding);

                context.moveTo(hourDialStart[0], hourDialStart[1]);
                context.lineTo(hourDialEnd[0], hourDialEnd[1]);
            }

            context.lineCap = 'butt';
            context.lineWidth = options.hourDialWidth;
            context.strokeStyle = options.dialColor;
            context.stroke();

            if (options.minuteDialWidth && options.minuteDialLength) {
                drawMinuteDial();
            }

            /**
             * 绘制分钟刻度
             * Draw minute dial
             */
            function drawMinuteDial() {
                var minuteDialStart, minuteDialEnd;

                for (i = 0; i < 60; i++) {
                    minuteDialStart = calcCoordinate(i, clockLength.minuteDialLength - options.padding);
                    minuteDialEnd = calcCoordinate(i, clockLength.radius - options.padding);

                    context.moveTo(minuteDialStart[0], minuteDialStart[1]);
                    context.lineTo(minuteDialEnd[0], minuteDialEnd[1]);
                }

                context.lineWidth = options.minuteDialWidth;
                context.stroke();
            }

        }

        /**
         * 绘制指针
         * Draw hands
         */
        function drawHand() {
            context.beginPath();

            context.lineCap = options.handStyle;
            context.strokeStyle = options.handColor;

            context.moveTo(-hourBackCoord[0], -hourBackCoord[1]);
            context.lineTo(hourCoord[0], hourCoord[1]);

            context.lineWidth = options.hourWidth;
            context.stroke();

            context.moveTo(-minuteBackCoord[0], -minuteBackCoord[1]);
            context.lineTo(minuteCoord[0], minuteCoord[1]);

            context.lineWidth = options.minuteWidth;
            context.stroke();

            context.moveTo(-secondBackCoord[0], -secondBackCoord[1]);
            context.lineTo(secondCoord[0], secondCoord[1]);

            context.lineWidth = options.secondWidth;
            context.stroke();
        }
    }

    // Test
    function dateNowTest(hour, minute, second) {
        if (hour >= 0 && minute >= 0 && second >= 0) {
            timeTest = {
                hour: hour,
                minute: minute,
                second: second
            };

            return timeTest;
        }

        if (flag === 0) {
            var dateTest = new Date();

            timeTest = {
                hour: dateTest.getHours(),
                minute: dateTest.getMinutes(),
                second: dateTest.getSeconds()
            };

            flag++;
        } else {
            if (timeTest.second === 59) {
                timeTest.second = 0;
                timeTest.minute++;
            } else {
                timeTest.second++;
            }

            if (timeTest.minute === 60) {
                timeTest.minute = 0;
                timeTest.hour++;
            }

            if (timeTest.hour === 24) {
                timeTest.hour = 0;
            }
        }

        return timeTest;
    }
}
