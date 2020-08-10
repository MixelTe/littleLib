export abstract class DrawObj
{
	public abstract draw(ctx: CanvasRenderingContext2D): void
}

export class Point extends DrawObj
{
	private x: number;
	private y: number;
	private r = 2;
	constructor(x: number, y: number)
	{
		super();
		this.x = x;
		this.y = y;
	}
	draw(ctx: CanvasRenderingContext2D)
	{
		ctx.fillStyle = "orange";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fill();
	}
	getPoint()
	{
		return { x: this.x, y: this.y };
	}
}

export class Rect extends DrawObj
{
	public x: number;
	public y: number;
	public width: number;
	public height: number;
	private color: string;
	constructor(x: number, y: number, width: number, height: number, color = "transparent")
	{
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}
	draw(ctx: CanvasRenderingContext2D)
	{
		ctx.strokeStyle = "black";
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}
	getRect()
	{
		return { x: this.x, y: this.y, width: this.width, height: this.height };
	}
}

export class Circle extends DrawObj
{
	public x: number;
	public y: number;
	public r: number;
	private color: string;
	constructor(x: number, y: number, r: number, color: string)
	{
		super();
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = color;
	}
	draw(ctx: CanvasRenderingContext2D)
	{
		ctx.strokeStyle = "black";
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fill();
	}
	getCircle()
	{
		return { x: this.x, y: this.y, r: this.r };
	}
}

export class Text_isIntersect extends DrawObj
{
	private x: number;
	private y: number;
	public intersect = false;
	constructor(x: number, y: number)
	{
		super();
		this.x = x;
		this.y = y;
	}
	draw(ctx: CanvasRenderingContext2D)
	{
		ctx.font = "16px Arial";
		ctx.fillStyle = "black";
		ctx.fillText("intersect: ", this.x, this.y);
		if (this.intersect) ctx.fillStyle = "green";
		else ctx.fillStyle = "red";
		ctx.fillText(`${this.intersect}`, this.x + ctx.measureText("intersect: ").width, this.y);
	}
}

export class Text_simple extends DrawObj
{
	public x: number;
	public y: number;
	public text: string;
	constructor(x: number, y: number, text: string)
	{
		super();
		this.x = x;
		this.y = y;
		this.text = text;
	}
	draw(ctx: CanvasRenderingContext2D)
	{
		ctx.font = "16px Arial";
		ctx.fillStyle = "black";
		ctx.fillText(this.text, this.x, this.y);
	}
}