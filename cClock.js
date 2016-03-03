cClock();

function cClock() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    if (!context) {
        return false;
    }

    context.strokeStyle = "#4d4d4d";
    context.fillStyle = "#f2f2f2";

    var twoPi = 2 * Math.PI;

    var radius = 199;

    var hourLenth = radius * 0.85 / 1.3;
    var minuteLenth = radius * 0.85;
    var secondLenth = radius * 0.8;

    context.translate(200, 200);

    // createDate();

    rotateClock();

    function rotateClock() {
        currentTime = dateNow();
        // currentTime = dateNowTest();

        var hourCoord = calcCoordinate(currentTime.hour, hourLenth, true);

        var minuteCoord = calcCoordinate(currentTime.minute, minuteLenth, false);

        var secondCoord = calcCoordinate(currentTime.second, secondLenth);

        drawClock(hourCoord, minuteCoord, secondCoord);
        console.clear();
        console.log(currentTime.hour + ":" + currentTime.minute + ":" + currentTime.second);

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

        var radian = (time / 60 + 1 / 4) * twoPi;
        radian += offsetR;

        var x = -Math.round(handLenth * Math.cos(radian));
        var y = -Math.round(handLenth * Math.sin(radian));

        return [x, y];
    }

    function correctRadian(isHour) {
        var offsetR;

        if (isHour) {
            offsetR = (currentTime.minute / 60) * (1 / 12) * twoPi;
        } else {
            if (isHour === false) {
                offsetR = (currentTime.second / 60) * (1 / 60) * twoPi;
            } else {
                offsetR = 0;
            }
        }

        return offsetR;
    }

    function drawClock(hour, minute, second) {
        drawCircle(radius);

        context.moveTo(0, 0);
        context.lineTo(hour[0], hour[1]);

        context.moveTo(0, 0);
        context.lineTo(minute[0], minute[1]);

        context.moveTo(0, 0);
        context.lineTo(second[0], second[1]);

        context.stroke();
    }

    function drawCircle(radius) {
        context.clearRect(-200, -200, 400, 400);

        context.beginPath();

        context.arc(0, 0, radius, 0, twoPi, false);

        context.stroke();
    }

    function createDate() {
        dateTest = new Date();

        hourTest = dateTest.getHours();
        minuteTest = dateTest.getMinutes();
        secondTest = dateTest.getSeconds();

    }

    function dateNowTest() {
        if (secondTest == 59) {
            secondTest = 0;
            minuteTest++;
        } else {
            secondTest++;
        }

        if (minuteTest == 60) {
            minuteTest = 0;
            hourTest++;
        }

        if (hourTest == 24) {
            hourTest = 0;
        }

        var timeTest = {
            hour: hourTest,
            minute: minuteTest,
            second: secondTest
        };

        return timeTest;
    }

}
