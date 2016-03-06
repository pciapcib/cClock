cClock({
    // hourLength: 0.9,
    // minuteLength: 0.9,
    // secondLength: 0.7,
    // handWidth: 8,
    // handColor: "#777",
    // handStyle: "butt",
    // centerRadius: 5,
    // hourBackLength: 0,
    // minuteBackLength: 0,
    // secondBackLength: 0,
    // borderWidth: 24,
    // borderColor: "#4d4d4d",
    // bgColor: "#aaa",
    // hourDialWidth: 6,
    // hourDialLength: 0.2,
    // minuteDialWidth: 2,
    // minuteDialLength: 0.1,
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
        var radius = Math.ceil(width / 2 - 1);

        var size = {
            radius: radius,

            hourLength: radius * (options.hourLength || 0.65),
            minuteLength: radius * (options.minuteLength || 0.85)
        };

        size.secondLength = options.secondLength ? radius * options.secondLength : (options.secondLength === 0 ? 0 : radius * 0.8);

        size.hourBackLength = options.hourBackLength ? radius * options.hourBackLength : (options.hourBackLength === 0 ? 0 : radius * 0.2);
        size.minuteBackLength = options.minuteBackLength ? radius * options.minuteBackLength : (options.minuteBackLength === 0 ? 0 : radius * 0.2);
        size.secondBackLength = options.secondLength === 0 ? 0 : (options.secondBackLength ? radius * options.secondBackLength : (options.secondBackLength === 0 ? 0 : radius * 0.2));

        size.hourDialLength = options.hourDialLength ? radius * (1 - options.hourDialLength) : (options.hourDialLength === 0 ? 0 : radius * (1 - 0.15));
        size.minuteDialLength = options.minuteDialLength ? radius * (1 - options.minuteDialLength) : (options.minuteDialLength === 0 ? 0 : radius * (1 - 0.08));

        return size;
    }

    function rotateClock() {
        // currentTime = dateNow();
        currentTime = dateNowTest(10, 8);

        var hourCoord = calcCoordinate(currentTime.hour, clockSize.hourLength, true);
        var minuteCoord = calcCoordinate(currentTime.minute, clockSize.minuteLength, false);
        var secondCoord = calcCoordinate(currentTime.second, clockSize.secondLength);

        var hourBackCoord = calcCoordinate(currentTime.hour, clockSize.hourBackLength, true);
        var minuteBackCoord = calcCoordinate(currentTime.minute, clockSize.minuteBackLength, false);
        var secondBackCoord = calcCoordinate(currentTime.second, clockSize.secondBackLength);

        drawClock(hourCoord, minuteCoord, secondCoord, hourBackCoord, minuteBackCoord, secondBackCoord);
        // console.clear();
        // console.log(currentTime.hour + ":" + currentTime.minute + ":" + currentTime.second);

        setTimeout(function() {
            rotateClock();
        }, 1000);
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

    function drawClock(hourCoord, minuteCoord, secondCoord, hourBackCoord, minuteBackCoord, secondBackCoord) {
        context.clearRect(-canvasWidth / 2, -canvasWidth / 2, canvasWidth, canvasWidth);

        drawCircle(clockSize.radius);

        if (!(options.hourDialWidth === 0 || options.hourDialLength === 0)) {
            drawDial();
        }

        drawHand();

        function drawCircle(radius) {
            context.beginPath();

            context.arc(0, 0, radius, 0, twoPi, false);

            if (options.borderWidth || options.borderWidth === undefined) {
                context.lineWidth = options.borderWidth || 2;
                context.strokeStyle = options.borderColor || "#000";
                context.stroke();
            }

            context.fillStyle = options.bgColor || "#fff";
            context.fill();

            if (options.centerRadius || options.centerRadius === undefined) {
                context.beginPath();
                context.arc(0, 0, options.centerRadius || 5, 0, twoPi, false);
                context.fillStyle = options.handColor || "#000";
                context.fill();
            }
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

            if (!(options.minuteDialWidth === 0 || options.minuteDialLength === 0)) {
                drawMinuteDial();
            }

            function drawMinuteDial() {
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

            context.moveTo(-hourBackCoord[0], -hourBackCoord[1]);
            context.lineTo(hourCoord[0], hourCoord[1]);

            context.moveTo(-minuteBackCoord[0], -minuteBackCoord[1]);
            context.lineTo(minuteCoord[0], minuteCoord[1]);

            context.moveTo(-secondBackCoord[0], -secondBackCoord[1]);
            context.lineTo(secondCoord[0], secondCoord[1]);

            context.lineWidth = options.handWidth || 2;
            context.lineCap = options.handStyle || "round";
            context.strokeStyle = options.handColor || "#000";
            context.stroke();
        }
    }

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
