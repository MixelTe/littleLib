export class DrawObj {
}
export class Point extends DrawObj {
    x;
    y;
    r = 2;
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
    draw(ctx) {
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
    getPoint() {
        return { x: this.x, y: this.y };
    }
}
export class Rect extends DrawObj {
    x;
    y;
    width;
    height;
    color;
    constructor(x, y, width, height, color = "transparent") {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw(ctx) {
        ctx.strokeStyle = "black";
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    getRect() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }
}
export class Circle extends DrawObj {
    x;
    y;
    r;
    color;
    constructor(x, y, r, color) {
        super();
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }
    draw(ctx) {
        ctx.strokeStyle = "black";
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
    getCircle() {
        return { x: this.x, y: this.y, r: this.r };
    }
}
export class Text_isIntersect extends DrawObj {
    x;
    y;
    intersect = false;
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
    draw(ctx) {
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("intersect: ", this.x, this.y);
        if (this.intersect)
            ctx.fillStyle = "green";
        else
            ctx.fillStyle = "red";
        ctx.fillText(`${this.intersect}`, this.x + ctx.measureText("intersect: ").width, this.y);
    }
}
export class Text_simple extends DrawObj {
    x;
    y;
    text;
    constructor(x, y, text) {
        super();
        this.x = x;
        this.y = y;
        this.text = text;
    }
    draw(ctx) {
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(this.text, this.x, this.y);
    }
}
