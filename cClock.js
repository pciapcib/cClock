cClock();

function cClock() {
    var canvas = document.getElementById("canvas");

    if (!canvas) {
        return false;
    }

    var context = canvas.getContext("2d");

    context.strokeStyle = "#4d4d4d";
    context.fillStyle = "#f2f2f2";
    var twoPi = 2 * Math.PI;

    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    var radius = 200;

    var hourLenth = radius * 0.85 / 1.3;
    var minuteLenth = radius * 0.85;
    var secondLenth = radius * 0.8;

    context.translate(200, 200);

    startClock();

    function drawCircle(radius) {
        context.beginPath();

        context.arc(0, 0, radius, 0, twoPi, false);

        context.stroke();
    }

    function startClock() {
        var day = new Date();

        var hourCoord = calcCoordinate(hour * 5, hourLenth);
        var minuteCoord = calcCoordinate(minute, minuteLenth);
        var secondCoord = calcCoordinate(second, secondLenth);

        drawClock(hourCoord, minuteCoord, secondCoord);
        console.clear();
        console.log(hour + ":" + minute + ":" + second);
        console.log(day);

        if (second === 59) {
            second = 0;
            minute++;
        } else {
            second++;
        }

        if (minute === 60) {
            minute = 0;
            hour++;
        }

        if (hour == 24) {
            hour = 0;
        }

        setTimeout(function() {
            startClock();
        }, 1000);
    }

    function drawClock(hour, minute, second) {
        context.clearRect(-200, -200, 400, 400);
        drawCircle(radius);

        context.moveTo(0, 0);
        context.lineTo(hour[0], hour[1]);

        context.moveTo(0, 0);
        context.lineTo(minute[0], minute[1]);

        context.moveTo(0, 0);
        context.lineTo(second[0], second[1]);

        context.stroke();
    }

    function calcCoordinate(time, handLenth) {
        var radian = (time / 60 + 1 / 4) * twoPi;
        var x = -Math.round(handLenth * Math.cos(radian));
        var y = -Math.round(handLenth * Math.sin(radian));

        var coordinate = [x, y];
        return coordinate;
    }
}
