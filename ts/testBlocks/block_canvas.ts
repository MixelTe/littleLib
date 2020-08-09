import * as Lib from "../littelLib.js";

export function run()
{
	const canvas = Lib.get.canvas("canvas_canvas");
	const ctx = Lib.canvas.getContext2d(canvas);

	Lib.addButtonListener("button_canvas_drawGrid", () =>
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		Lib.canvas.drawGrid(ctx, 20);
	});
	Lib.addButtonListener("button_canvas_fitToParent", () => { Lib.canvas.fitToParent(canvas); });
}
