import * as Lib from "../littelLib.js";
import { Rect } from "./drawing.js";
const speedX = 10;
const speedY = 10;
const width = 50;
const height = 50;
const canvasNext = Lib.get.canvas("canvas_moveAnimator_next");
const next = {
    ctx: Lib.canvas.getContext2d(canvasNext),
    moveAnimator: new Lib.MoveAnimator(0, 0, 0, 0, 0, 0, 0, 0),
    rect: new Rect(0, 0, width, height),
};
const canvasBounce = Lib.get.canvas("canvas_moveAnimator_nextBounce");
const bounce = {
    ctx: Lib.canvas.getContext2d(canvasBounce),
    moveAnimator: new Lib.MoveAnimator(0, 0, 0, 0, 0, 0, 0, 0),
    rect: new Rect(0, 0, width, height),
};
export function run() {
    window.addEventListener("resize", resizeAllCanvas);
    resizeAllCanvas();
    setInterval(redrawAll, 100);
}
function redrawAll() {
    next.rect.x = next.moveAnimator.nextX();
    next.rect.y = next.moveAnimator.nextY();
    next.ctx.clearRect(0, 0, canvasNext.width, canvasNext.height);
    next.rect.draw(next.ctx);
    bounce.rect.x = bounce.moveAnimator.nextBounceX();
    bounce.rect.y = bounce.moveAnimator.nextBounceY();
    bounce.ctx.clearRect(0, 0, canvasBounce.width, canvasBounce.height);
    bounce.rect.draw(bounce.ctx);
}
function resizeAllCanvas() {
    resetCanvas(canvasNext);
    resetCanvas(canvasBounce);
    Lib.canvas.fitToParent.ClientWH(canvasNext);
    Lib.canvas.fitToParent.ClientWH(canvasBounce);
    next.moveAnimator = new Lib.MoveAnimator(Math.round((canvasNext.width - width) / 2), Math.round((canvasNext.height - height) / 2), 0, 0, canvasNext.width - width, canvasNext.height - height, speedX, speedY);
    bounce.moveAnimator = new Lib.MoveAnimator(Math.round((canvasBounce.width - width) / 2), Math.round((canvasBounce.height - height) / 2), 0, 0, canvasBounce.width - width, canvasBounce.height - height, speedX, speedY);
    redrawAll();
}
function resetCanvas(canvas) {
    canvas.style.width = "0px";
    canvas.style.height = "0px";
}
