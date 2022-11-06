import { intersection } from "./littleLib.js";
export class MoveAnimator {
    x;
    y;
    shiftX;
    shiftY;
    maxX;
    maxY;
    stepX;
    stepY;
    constructor(x, y, shiftX, shiftY, maxX, maxY, stepX, stepY) {
        this.x = x;
        this.y = y;
        this.shiftX = shiftX;
        this.shiftY = shiftY;
        this.maxX = maxX;
        this.maxY = maxY;
        this.stepX = stepX;
        this.stepY = stepY;
    }
    X() {
        if (this.x > this.maxX)
            return this.maxX - (this.x - this.maxX) + this.shiftX;
        return this.x + this.shiftX;
    }
    Y() {
        if (this.y > this.maxY)
            return this.maxY - (this.y - this.maxY) + this.shiftY;
        return this.y + this.shiftY;
    }
    nextX(step) {
        if (step == undefined) {
            if (typeof this.stepX == "number")
                this.x += this.stepX;
            else
                this.x += this.stepX();
        }
        else
            this.x += step;
        this.x %= this.maxX;
        return this.x + this.shiftX;
    }
    nextY(step) {
        if (step == undefined) {
            if (typeof this.stepY == "number")
                this.y += this.stepY;
            else
                this.y += this.stepY();
        }
        else
            this.y += step;
        this.y %= this.maxY;
        return this.y + this.shiftY;
    }
    nextBounceX(step) {
        if (step == undefined) {
            if (typeof this.stepX == "number")
                this.x += this.stepX;
            else
                this.x += this.stepX();
        }
        else
            this.x += step;
        this.x %= this.maxX * 2;
        if (this.x > this.maxX)
            return this.maxX - (this.x - this.maxX) + this.shiftX;
        return this.x + this.shiftX;
    }
    nextBounceY(step) {
        if (step == undefined) {
            if (typeof this.stepY == "number")
                this.y += this.stepY;
            else
                this.y += this.stepY();
        }
        else
            this.y += step;
        this.y %= this.maxY * 2;
        if (this.y > this.maxY)
            return this.maxY - (this.y - this.maxY) + this.shiftY;
        return this.y + this.shiftY;
    }
}
export class Rect {
    x;
    y;
    width;
    height;
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    static Create(point, width, height) {
        return new Rect(point.x, point.y, width, height);
    }
    static Create2(point, point2) {
        return new Rect(point.x, point.y, point2.x - point.x, point2.y - point.y);
    }
    intersectRect(rect) {
        return intersection.rects(this, rect);
    }
    intersectPoint(point) {
        return intersection.rectPoint(this, point);
    }
    fill(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    stroke(ctx) {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    copy() {
        return new Rect(this.x, this.y, this.width, this.height);
    }
    getPoint() {
        return new Point(this.x, this.y);
    }
}
export class Point {
    x;
    y;
    static r = 2;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    intersectRect(rect) {
        return intersection.rectPoint(rect, this);
    }
    intersectCircle(circte) {
        return intersection.circlePoint(circte, this);
    }
    fill(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, Point.r, 0, Math.PI * 2);
        ctx.fill();
    }
    stroke(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, Point.r, 0, Math.PI * 2);
        ctx.stroke();
    }
    copy() {
        return new Point(this.x, this.y);
    }
    getPoint() {
        return this.copy();
    }
}
export class Circle {
    x;
    y;
    r;
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    static Create(point, r) {
        return new Circle(point.x, point.y, r);
    }
    intersectCircle(circle) {
        return intersection.circles(this, circle);
    }
    intersectPoint(point) {
        return intersection.circlePoint(this, point);
    }
    fill(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
    stroke(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.stroke();
    }
    copy() {
        return new Circle(this.x, this.y, this.r);
    }
    getPoint() {
        return new Point(this.x, this.y);
    }
}
