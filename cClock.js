cClock();

function cClock() {
    var canvas = document.getElementById("canvas");

    if (!canvas) {
        return false;
    }

    var context = canvas.getContext("2d");

    var width = canvas.offsetWidth;
    context.translate(width / 2, width / 2);

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
            hour: radius * 0.85 / 1.3,
            minute: radius * 0.85,
            second: radius * 0.8
        }

        return size;
    }

    function rotateClock() {
        // currentTime = dateNow();
        currentTime = dateNowTest();

        var hourCoord = calcCoordinate(currentTime.hour, clockSize.hour, true);

        var minuteCoord = calcCoordinate(currentTime.minute, clockSize.minute, false);

        var secondCoord = calcCoordinate(currentTime.second, clockSize.second);

        drawClock(hourCoord, minuteCoord, secondCoord);
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

    function drawClock(hour, minute, second) {
        context.clearRect(-width / 2, -width / 2, width, width);

        drawCircle(clockSize.radius);

        context.beginPath();

        context.moveTo(0, 0);
        context.lineTo(hour[0], hour[1]);

        context.moveTo(0, 0);
        context.lineTo(minute[0], minute[1]);

        context.moveTo(0, 0);
        context.lineTo(second[0], second[1]);

        context.strokeStyle = "#4d4d4d";
        context.stroke();

        function drawCircle(radius) {

            context.beginPath();

            context.strokeStyle = "#f2f2f2";
            context.arc(0, 0, radius, 0, twoPi, false);

            context.stroke();

            context.fillStyle = "#f2f2f2";
            context.fill();
        }
    }

    function dateNowTest() {
        if (flag === 0) {
            var dateTest = new Date();

            timeTest = {
                hour: dateTest.getHours(),
                minute: dateTest.getMinutes(),
                second: dateTest.getSeconds()
            }

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
