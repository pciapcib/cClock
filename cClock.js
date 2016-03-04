cClock({
    // hourLength: 0.9,
    // minuteLength: 0.9,
    // secondLength: 0.9,
    // handWidth: 8,
    // handColor: "#777",
    // handType: "butt",
    // noCenter: true,
    // centerRadius: 12,
    // noHandTail: true,
    // hourTailLength: 0.4,
    // minuteTailLength: 0.4,
    // secondTailLength: 0.4,
    // noBorder: true,
    // borderWidth: 26,
    // borderColor: "#ccc",
    // bgColor: "#aaa",
    // noDial: true,
    // noMinuteDial: true,
    // hourDialLength: 0.2,
    // hourDialWidth: 6,
    // minuteDialLength: 0.1,
    // minuteDialWidth: 2,
    // dialColor: "#f2f2f2"
});

function cClock(options) {
    var canvas = document.getElementById("canvas");

    if (!canvas) {
        return false;
    }

    var context = canvas.getContext("2d");

    var canvasWidth = canvas.offsetWidth;
    context.translate(canvasWidth / 2, canvasWidth / 2);

    var width = canvasWidth - (options.borderWidth || 2);

    var twoPi = 2 * Math.PI,
        clockSize = calcSize(width),
        currentTime;

    var flag = 0,
        timeTest;

    rotateClock();

    function calcSize(width) {
        var radius = width / 2 - 1;

        var size = {
            radius: radius,

            hourLength: radius * (options.hourLength || 0.65),
            minuteLength: radius * (options.minuteLength || 0.85),
            secondLength: radius * (options.secondLength || 0.8),

            hourDialLength: radius * (1 - (options.hourDialLength || 0.15)),
            minuteDialLength: radius * (1 - (options.minuteDialLength || 0.08))
        };

        size.hourTailLength = options.noHandTail ? null : radius * (options.hourTailLength || 0.2);
        size.minuteTailLength = options.noHandTail ? null : radius * (options.minuteTailLength || 0.2);
        size.secondTailLength = options.noHandTail ? null : radius * (options.secondTailLength || 0.2);

        return size;
    }

    function rotateClock() {
        // currentTime = dateNow();
        currentTime = dateNowTest(10,8,30);

        var hourCoord = calcCoordinate(currentTime.hour, clockSize.hourLength, true);
        var minuteCoord = calcCoordinate(currentTime.minute, clockSize.minuteLength, false);
        var secondCoord = calcCoordinate(currentTime.second, clockSize.secondLength);

        var hourTailCoord = calcCoordinate(currentTime.hour, clockSize.hourTailLength, true);
        var minuteTailCoord = calcCoordinate(currentTime.minute, clockSize.minuteTailLength, false);
        var secondTailCoord = calcCoordinate(currentTime.second, clockSize.secondTailLength);

        drawClock(hourCoord, minuteCoord, secondCoord, hourTailCoord, minuteTailCoord, secondTailCoord);
        // console.clear();
        // console.log(currentTime.hour + ":" + currentTime.minute + ":" + currentTime.second);

        setTimeout(function() {
            rotateClock();
        }, 100);
    }

    function dateNow() {
        var date = new Date();

        var time = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        };

        return time;
    }

    function calcCoordinate(time, handLenth, isHour) {
        if (isHour) {
            if (time >= 12) {
                time -= 12;
            }
            time *= 5;
        }

        var offsetR = correctRadian(isHour);

        var radian = (time / 60 + 1 / 4) * twoPi + offsetR;

        var x = -Math.round(handLenth * Math.cos(radian));
        var y = -Math.round(handLenth * Math.sin(radian));

        return [x, y];

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

    function drawClock(hourCoord, minuteCoord, secondCoord, hourTailCoord, minuteTailCoord, secondTailCoord) {
        context.clearRect(-canvasWidth / 2, -canvasWidth / 2, canvasWidth, canvasWidth);

        drawCircle(clockSize.radius);

        options.noDial || drawDial();

        drawHand();

        function drawCircle(radius) {
            context.beginPath();

            context.arc(0, 0, radius, 0, twoPi, false);

            context.lineWidth = options.borderWidth || 2;
            context.strokeStyle = options.noBorder ? options.bgColor : (options.borderColor || "#000");
            context.stroke();

            context.fillStyle = options.bgColor || "#fff";
            context.fill();

            if (!options.noCenter) {
                context.beginPath();
                context.arc(0, 0, options.centerRadius || 5, 0, twoPi, false);
                context.fillStyle = options.handColor || "#000";
                context.fill();
            };
        }

        function drawDial() {
            context.beginPath();

            var i, hourDialStart, hourDialEnd;

            for (i = 0; i < 60; i += 5) {
                hourDialStart = calcCoordinate(i, clockSize.hourDialLength);
                hourDialEnd = calcCoordinate(i, clockSize.radius);

                context.moveTo(hourDialStart[0], hourDialStart[1]);
                context.lineTo(hourDialEnd[0], hourDialEnd[1]);
            }

            context.lineCap = "butt";
            context.lineWidth = options.hourDialWidth || 2;
            context.strokeStyle = options.dialColor || "#4d4d4d";
            context.stroke();

            if (!options.noMinuteDial) {
                var minuteDialStart, minuteDialEnd;

                for (i = 0; i < 60; i++) {
                    minuteDialStart = calcCoordinate(i, clockSize.minuteDialLength);
                    minuteDialEnd = calcCoordinate(i, clockSize.radius);

                    context.moveTo(minuteDialStart[0], minuteDialStart[1]);
                    context.lineTo(minuteDialEnd[0], minuteDialEnd[1]);
                }

                context.lineWidth = options.minuteDialWidth || 2;
                context.stroke();
            }
        }

        function drawHand() {
            context.beginPath();

            context.moveTo(-hourTailCoord[0], -hourTailCoord[1]);
            context.lineTo(hourCoord[0], hourCoord[1]);

            context.moveTo(-minuteTailCoord[0], -minuteTailCoord[1]);
            context.lineTo(minuteCoord[0], minuteCoord[1]);

            context.moveTo(-secondTailCoord[0], -secondTailCoord[1]);
            context.lineTo(secondCoord[0], secondCoord[1]);

            context.lineWidth = options.handWidth || 2;
            context.lineCap = options.handType || "round";
            context.strokeStyle = options.handColor || "#000";
            context.stroke();
        }
    }

    function dateNowTest(hour, minute, second) {
        if (hour>=0 && minute>=0 && second>=0) {

            timeTest = {
                hour: hour,
                minute: minute,
                second: second
            };

            return timeTest;
        };

        if (flag === 0) {
            var dateTest = new Date();

            timeTest = {
                hour: dateTest.getHours(),
                minute: dateTest.getMinutes(),
                second: dateTest.getSeconds()
            };

            flag++;
        } else {
            if (timeTest.second == 59) {
                timeTest.second = 0;
                timeTest.minute++;
            } else {
                timeTest.second++;
            }

            if (timeTest.minute == 60) {
                timeTest.minute = 0;
                timeTest.hour++;
            }

            if (timeTest.hour == 24) {
                timeTest.hour = 0;
            }
        }

        return timeTest;
    }
}
