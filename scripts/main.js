"use strict";
var Figure = /** @class */ (function () {
    function Figure(radius, vertices_count) {
        this._points = [];
        for (var i = 0; i < vertices_count; i++) {
            var angle = i * (Math.PI / vertices_count * 2);
            this._points.push(new vec2([
                radius * Math.cos(angle),
                radius * Math.sin(angle)
            ]));
        }
        this.position = new vec2([0, 0]);
        this.rotation = { point: new vec2([0, 0]), angle: 0 };
        this.scale = 1;
        this._radius = radius;
    }
    Object.defineProperty(Figure.prototype, "points", {
        get: function () {
            var points = [];
            for (var _i = 0, _a = this._points; _i < _a.length; _i++) {
                var point = _a[_i];
                var m = new mat3([
                    1, 0, 0,
                    0, 1, 0,
                    0, 0, 1
                ]);
                m.multiply(new mat3([
                    1, 0, 0,
                    0, 1, 0,
                    this.rotation.point.x, this.rotation.point.y, 1
                ]));
                m.multiply(new mat3([
                    Math.cos(this.rotation.angle), Math.sin(this.rotation.angle), 0,
                    -Math.sin(this.rotation.angle), Math.cos(this.rotation.angle), 0,
                    0, 0, 1
                ]));
                m.multiply(new mat3([
                    1, 0, 0,
                    0, 1, 0,
                    -this.rotation.point.x, -this.rotation.point.y, 1
                ]));
                m.multiply(new mat3([
                    this.scale, 0, 0,
                    0, this.scale, 0,
                    this.position.x, this.position.y, 1
                ]));
                points.push(new vec3([point.x, point.y, 1]).multiplyByMat3(m));
            }
            return points;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Figure.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        enumerable: false,
        configurable: true
    });
    return Figure;
}());
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var hill = [new vec2([0, 0]), new vec2([canvas.width, canvas.height])];
var inclination = Math.asin((hill[1].y - hill[0].y) /
    (hill[1].copy().subtract(hill[0]).length()));
var snowball = new Figure(30, 16);
snowball.scale = 1;
var current_point = hill[0].copy();
var STEP = 8;
setInterval(function () {
    // snowball.rotation.angle += Math.PI / 200
    // snowball.scale = Math.abs(Math.sin(snowball.rotation.angle) / 2) + 0.5
    snowball.position.xy = [
        current_point.x + snowball.radius * snowball.scale * Math.cos(Math.PI / 2 - inclination),
        current_point.y - snowball.radius * snowball.scale * Math.sin(Math.PI / 2 - inclination)
    ];
    snowball.rotation.point = snowball.position;
    context.fillStyle = 'blue';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'green';
    context.beginPath();
    context.moveTo(hill[0].x, hill[0].y);
    context.lineTo(hill[1].x, hill[1].y);
    context.lineTo(canvas.width, canvas.height);
    context.lineTo(0, canvas.height);
    context.fill();
    context.fillStyle = 'white';
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(snowball.points[0].x + 0.5, snowball.points[0].y + 0.5);
    for (var _i = 0, _a = snowball.points.slice(1); _i < _a.length; _i++) {
        var point = _a[_i];
        context.lineTo(point.x + 0.5, point.y + 0.5);
    }
    context.fill();
    context.fillStyle = 'red';
    context.fillRect(snowball.position.x + snowball.radius * Math.cos(-snowball.rotation.angle), snowball.position.y - snowball.radius * Math.sin(-snowball.rotation.angle), 8, 8);
    if (canvas.width - snowball.radius * snowball.scale > snowball.position.x) {
        current_point.x += STEP * Math.cos(inclination);
        current_point.y += STEP * Math.sin(inclination);
        snowball.scale *= 1.01;
        snowball.rotation.angle += Math.PI / 14;
    }
}, 1000 / 10);
