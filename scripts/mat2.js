"use strict";
var mat2 = /** @class */ (function () {
    function mat2(values) {
        this.values = new Float32Array(4);
        if (values !== undefined) {
            this.init(values);
        }
    }
    mat2.prototype.at = function (index) {
        return this.values[index];
    };
    mat2.prototype.init = function (values) {
        for (var i = 0; i < 4; i++) {
            this.values[i] = values[i];
        }
        return this;
    };
    mat2.prototype.reset = function () {
        for (var i = 0; i < 4; i++) {
            this.values[i] = 0;
        }
    };
    mat2.prototype.copy = function (dest) {
        if (!dest) {
            dest = new mat2();
        }
        for (var i = 0; i < 4; i++) {
            dest.values[i] = this.values[i];
        }
        return dest;
    };
    mat2.prototype.all = function () {
        var data = [];
        for (var i = 0; i < 4; i++) {
            data[i] = this.values[i];
        }
        return data;
    };
    mat2.prototype.row = function (index) {
        return [
            this.values[index * 2 + 0],
            this.values[index * 2 + 1],
        ];
    };
    mat2.prototype.col = function (index) {
        return [
            this.values[index],
            this.values[index + 2],
        ];
    };
    mat2.prototype.equals = function (matrix, threshold) {
        if (threshold === void 0) { threshold = epsilon; }
        for (var i = 0; i < 4; i++) {
            if (Math.abs(this.values[i] - matrix.at(i)) > threshold) {
                return false;
            }
        }
        return true;
    };
    mat2.prototype.determinant = function () {
        return this.values[0] * this.values[3] - this.values[2] * this.values[1];
    };
    mat2.prototype.setIdentity = function () {
        this.values[0] = 1;
        this.values[1] = 0;
        this.values[2] = 0;
        this.values[3] = 1;
        return this;
    };
    mat2.prototype.transpose = function () {
        var temp = this.values[1];
        this.values[1] = this.values[2];
        this.values[2] = temp;
        return this;
    };
    mat2.prototype.inverse = function () {
        var det = this.determinant();
        if (!det) {
            return null;
        }
        det = 1.0 / det;
        var a11 = this.values[0];
        this.values[0] = det * (this.values[3]);
        this.values[1] = det * (-this.values[1]);
        this.values[2] = det * (-this.values[2]);
        this.values[3] = det * a11;
        return this;
    };
    mat2.prototype.multiply = function (matrix) {
        var a11 = this.values[0];
        var a12 = this.values[1];
        var a21 = this.values[2];
        var a22 = this.values[3];
        this.values[0] = a11 * matrix.at(0) + a12 * matrix.at(2);
        this.values[1] = a11 * matrix.at(1) + a12 * matrix.at(3);
        this.values[2] = a21 * matrix.at(0) + a22 * matrix.at(2);
        this.values[3] = a21 * matrix.at(1) + a22 * matrix.at(3);
        return this;
    };
    mat2.prototype.rotate = function (angle) {
        var a11 = this.values[0];
        var a12 = this.values[1];
        var a21 = this.values[2];
        var a22 = this.values[3];
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);
        this.values[0] = a11 * cos + a12 * sin;
        this.values[1] = a11 * -sin + a12 * cos;
        this.values[2] = a21 * cos + a22 * sin;
        this.values[3] = a21 * -sin + a22 * cos;
        return this;
    };
    mat2.prototype.multiplyVec2 = function (vector, result) {
        var x = vector.x;
        var y = vector.y;
        if (result) {
            result.xy = [
                x * this.values[0] + y * this.values[1],
                x * this.values[2] + y * this.values[3],
            ];
            return result;
        }
        else {
            return new vec2([
                x * this.values[0] + y * this.values[1],
                x * this.values[2] + y * this.values[3],
            ]);
        }
    };
    mat2.prototype.scale = function (vector) {
        var a11 = this.values[0];
        var a12 = this.values[1];
        var a21 = this.values[2];
        var a22 = this.values[3];
        var x = vector.x;
        var y = vector.y;
        this.values[0] = a11 * x;
        this.values[1] = a12 * y;
        this.values[2] = a21 * x;
        this.values[3] = a22 * y;
        return this;
    };
    mat2.product = function (m1, m2, result) {
        var a11 = m1.at(0);
        var a12 = m1.at(1);
        var a21 = m1.at(2);
        var a22 = m1.at(3);
        if (result) {
            result.init([
                a11 * m2.at(0) + a12 * m2.at(2),
                a11 * m2.at(1) + a12 * m2.at(3),
                a21 * m2.at(0) + a22 * m2.at(2),
                a21 * m2.at(1) + a22 * m2.at(3),
            ]);
            return result;
        }
        else {
            return new mat2([
                a11 * m2.at(0) + a12 * m2.at(2),
                a11 * m2.at(1) + a12 * m2.at(3),
                a21 * m2.at(0) + a22 * m2.at(2),
                a21 * m2.at(1) + a22 * m2.at(3),
            ]);
        }
    };
    mat2.identity = new mat2().setIdentity();
    return mat2;
}());
