import * as Lib from "../littleLib.js";
import { Rect, Circle, Text_isIntersect, Point } from "./drawing.js";
const allCanvas = {
    rectPoint: Lib.get.canvas("canvas_intersect_rectPoint"),
    rects: Lib.get.canvas("canvas_intersect_rects"),
    circlePoint: Lib.get.canvas("canvas_intersect_circlePoint"),
    circles: Lib.get.canvas("canvas_intersect_circles"),
};
const allContext = {
    rectPoint: Lib.canvas.getContext2d(allCanvas.rectPoint),
    rects: Lib.canvas.getContext2d(allCanvas.rects),
    circlePoint: Lib.canvas.getContext2d(allCanvas.circlePoint),
    circles: Lib.canvas.getContext2d(allCanvas.circles),
};
const allObjects = {
    rectPoint: { main: null, second: null, text: null },
    rects: { main: null, second: null, text: null },
    circlePoint: { main: null, second: null, text: null },
    circles: { main: null, second: null, text: null },
};
const allDrawToggled = {
    rectPoint: false,
    rects: false,
    circlePoint: false,
    circles: false,
};
const mainColor = "rgba(0, 100, 255, 0.3)";
const secondColor = "rgba(0, 200, 0, 0.3)";
export function run() {
    allObjects.rectPoint.text = new Text_isIntersect(2, allCanvas.rectPoint.height - 5);
    allObjects.rects.text = new Text_isIntersect(2, allCanvas.rects.height - 5);
    allObjects.circlePoint.text = new Text_isIntersect(2, allCanvas.circlePoint.height - 5);
    allObjects.circles.text = new Text_isIntersect(2, allCanvas.circles.height - 5);
    window.addEventListener("resize", resizeAllCanvas);
    resizeAllCanvas();
    addListenerToDraw("button_intersect_rectPoint", "rectPoint", "point");
    addListenerToDraw("button_intersect_rects", "rects", "rect");
    addListenerToDraw("button_intersect_circlePoint", "circlePoint", "point");
    addListenerToDraw("button_intersect_circles", "circles", "circle");
}
function addListenerToDraw(buttonId, key, shape) {
    Lib.addButtonListener(buttonId, () => {
        allDrawToggled[key] = true;
        const canvasParent = allCanvas[key].parentElement;
        const objects = allObjects[key];
        objects.second = null;
        if (canvasParent != null) {
            canvasParent.style.boxShadow = "0px 0px 5px blue, 0px 0px 10px blue";
        }
    });
    const canvas = allCanvas[key];
    canvas.addEventListener("click", (e) => {
        if (allDrawToggled[key]) {
            const ctx = allContext[key];
            const objects = allObjects[key];
            if (objects.second == null) {
                switch (shape) {
                    case "point":
                        objects.second = new Point(e.offsetX, e.offsetY);
                        endDrawing(key);
                        break;
                    case "rect":
                        objects.second = new Rect(e.offsetX, e.offsetY, 0, 0, secondColor);
                        break;
                    case "circle":
                        objects.second = new Circle(e.offsetX, e.offsetY, 0, secondColor);
                        break;
                    default: throw new Error("switch default");
                }
            }
            else {
                endDrawing(key);
            }
            drawOne(key);
            if (allDrawToggled[key])
                Lib.canvas.drawCoords(ctx, e.offsetX, e.offsetY);
        }
    });
    canvas.addEventListener("mousemove", (e) => {
        if (allDrawToggled[key]) {
            const objects = allObjects[key];
            const ctx = allContext[key];
            if (objects.second != null) {
                if (objects.second instanceof Rect) {
                    objects.second.width = e.offsetX - objects.second.x;
                    objects.second.height = e.offsetY - objects.second.y;
                }
                if (objects.second instanceof Circle) {
                    objects.second.r = Math.sqrt(Lib.square(objects.second.x - e.offsetX) + Lib.square(objects.second.y - e.offsetY));
                }
            }
            isIntersect(key);
            drawOne(key);
            Lib.canvas.drawCoords(ctx, e.offsetX, e.offsetY);
        }
    });
    canvas.addEventListener("mouseleave", (e) => {
        drawOne(key);
    });
}
function endDrawing(key) {
    allDrawToggled[key] = false;
    const canvasParent = allCanvas[key].parentElement;
    if (canvasParent != null) {
        canvasParent.style.boxShadow = "";
    }
    isIntersect(key);
}
function isIntersect(key) {
    const objects = allObjects[key];
    let intersect = false;
    if (objects.second != null) {
        if (objects.second instanceof Point) {
            if (objects.main instanceof Rect) {
                intersect = Lib.intersection.rectPoint(objects.main.getRect(), objects.second.getPoint());
            }
            if (objects.main instanceof Circle) {
                intersect = Lib.intersection.circlePoint(objects.main.getCircle(), objects.second.getPoint());
            }
        }
        if (objects.second instanceof Rect) {
            if (objects.main instanceof Rect) {
                intersect = Lib.intersection.rects(objects.main.getRect(), objects.second.getRect());
            }
        }
        if (objects.second instanceof Circle) {
            if (objects.main instanceof Circle) {
                intersect = Lib.intersection.circles(objects.main.getCircle(), objects.second.getCircle());
            }
        }
    }
    if (objects.text != null)
        objects.text.intersect = intersect;
}
function redrawAll() {
    allObjects.rectPoint.main = new Rect(Math.round((allCanvas.rectPoint.width - 100) / 2), Math.round((allCanvas.rectPoint.height - 100) / 2), 100, 100, mainColor);
    allObjects.rects.main = new Rect(Math.round((allCanvas.rectPoint.width - 100) / 2), Math.round((allCanvas.rectPoint.height - 100) / 2), 100, 100, mainColor);
    allObjects.circlePoint.main = new Circle(Math.round(allCanvas.circlePoint.width / 2), Math.round(allCanvas.circlePoint.height / 2), 50, mainColor);
    allObjects.circles.main = new Circle(Math.round(allCanvas.circlePoint.width / 2), Math.round(allCanvas.circlePoint.height / 2), 50, mainColor);
    isIntersect("rectPoint");
    isIntersect("rects");
    isIntersect("circlePoint");
    isIntersect("circles");
    drawOne("rectPoint");
    drawOne("rects");
    drawOne("circlePoint");
    drawOne("circles");
}
function drawOne(key) {
    const ctx = allContext[key];
    const objects = allObjects[key];
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    objects.main?.draw(ctx);
    objects.second?.draw(ctx);
    objects.text?.draw(ctx);
}
function resizeAllCanvas() {
    resetCanvas(allCanvas.rectPoint);
    resetCanvas(allCanvas.rects);
    resetCanvas(allCanvas.circlePoint);
    resetCanvas(allCanvas.circles);
    Lib.canvas.fitToParent.ClientWH(allCanvas.rectPoint);
    Lib.canvas.fitToParent.ClientWH(allCanvas.rects);
    Lib.canvas.fitToParent.ClientWH(allCanvas.circlePoint);
    Lib.canvas.fitToParent.ClientWH(allCanvas.circles);
    redrawAll();
}
function resetCanvas(canvas) {
    canvas.style.width = "0px";
    canvas.style.height = "0px";
}
