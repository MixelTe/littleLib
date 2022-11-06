import { ICircle, intersection, IPoint, IRect } from "./littleLib.js";


export class MoveAnimator
{
	constructor(
		private x: number,
		private y: number,
		private shiftX: number,
		private shiftY: number,
		private maxX: number,
		private maxY: number,
		private stepX: number | (() => number),
		private stepY: number | (() => number),
	) { }

	X()
	{
		if (this.x > this.maxX) return this.maxX - (this.x - this.maxX) + this.shiftX;
		return this.x + this.shiftX;
	}
	Y()
	{
		if (this.y > this.maxY) return this.maxY - (this.y - this.maxY) + this.shiftY;
		return this.y + this.shiftY;
	}

	nextX(step?: number)
	{
		if (step == undefined)
		{
			if (typeof this.stepX == "number") this.x += this.stepX;
			else this.x += this.stepX();
		}
		else this.x += step;

		this.x %= this.maxX;
		return this.x + this.shiftX;
	}
	nextY(step?: number)
	{
		if (step == undefined)
		{
			if (typeof this.stepY == "number") this.y += this.stepY;
			else this.y += this.stepY();
		}
		else this.y += step;

		this.y %= this.maxY;
		return this.y + this.shiftY;
	}

	nextBounceX(step?: number)
	{
		if (step == undefined)
		{
			if (typeof this.stepX == "number") this.x += this.stepX;
			else this.x += this.stepX();
		}
		else this.x += step;

		this.x %= this.maxX * 2;
		if (this.x > this.maxX) return this.maxX - (this.x - this.maxX) + this.shiftX;
		return this.x + this.shiftX;
	}
	nextBounceY(step?: number)
	{
		if (step == undefined)
		{
			if (typeof this.stepY == "number") this.y += this.stepY;
			else this.y += this.stepY();
		}
		else this.y += step;

		this.y %= this.maxY * 2;
		if (this.y > this.maxY) return this.maxY - (this.y - this.maxY) + this.shiftY;
		return this.y + this.shiftY;
	}
}

export class Rect
{
	constructor(
		public x: number,
		public y: number,
		public width: number,
		public height: number) { }

	public static Create(point: IPoint, width: number, height: number)
	{
		return new Rect(point.x, point.y, width, height);
	}
	public static Create2(point: IPoint, point2: IPoint)
	{
		return new Rect(point.x, point.y, point2.x - point.x, point2.y - point.y);
	}

	public intersectRect(rect: IRect)
	{
		return intersection.rects(this, rect);
	}
	public intersectPoint(point: IPoint)
	{
		return intersection.rectPoint(this, point);
	}
	public fill(ctx: CanvasRenderingContext2D)
	{
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	public stroke(ctx: CanvasRenderingContext2D)
	{
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}
	public copy()
	{
		return new Rect(this.x, this.y, this.width, this.height);
	}
	public getPoint()
	{
		return new Point(this.x, this.y);
	}
}

export class Point {
	static r = 2;
	constructor(
		public x: number,
		public y: number) { }

	public intersectRect(rect: IRect)
	{
		return intersection.rectPoint(rect, this);
	}
	public intersectCircle(circte: ICircle)
	{
		return intersection.circlePoint(circte, this);
	}
	public fill(ctx: CanvasRenderingContext2D)
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, Point.r, 0, Math.PI * 2);
		ctx.fill();
	}
	public stroke(ctx: CanvasRenderingContext2D)
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, Point.r, 0, Math.PI * 2);
		ctx.stroke();
	}
	public copy()
	{
		return new Point(this.x, this.y);
	}
	public getPoint()
	{
		return this.copy();
	}
}

export class Circle {
	constructor(
		public x: number,
		public y: number,
		public r: number) { }

	public static Create(point: IPoint, r: number)
	{
		return new Circle(point.x, point.y, r);
	}

	public intersectCircle(circle: ICircle)
	{
		return intersection.circles(this, circle);
	}
	public intersectPoint(point: IPoint)
	{
		return intersection.circlePoint(this, point);
	}
	public fill(ctx: CanvasRenderingContext2D)
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fill();
	}
	public stroke(ctx: CanvasRenderingContext2D)
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.stroke();
	}
	public copy()
	{
		return new Circle(this.x, this.y, this.r);
	}
	public getPoint()
	{
		return new Point(this.x, this.y);
	}
}

export interface IFigure
{
	fill(ctx: CanvasRenderingContext2D): void,
	stroke(ctx: CanvasRenderingContext2D): void,
	copy(): IFigure,
	getPoint(): Point,
}
