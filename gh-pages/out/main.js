import * as Lib from "./littelLib.js";
import { Rect, Circle, Text_isIntersect, Point } from "./drawing.js";
const allCanvas = {
    canvas: Lib.get.canvas("canvas_canvas"),
    intersect: {
        rectPoint: Lib.get.canvas("canvas_intersect_rectPoint"),
        rects: Lib.get.canvas("canvas_intersect_rects"),
        circlePoint: Lib.get.canvas("canvas_intersect_circlePoint"),
        circles: Lib.get.canvas("canvas_intersect_circles"),
    },
};
const allContext = {
    canvas: Lib.canvas.getContext2d(allCanvas.canvas),
    intersect: {
        rectPoint: Lib.canvas.getContext2d(allCanvas.intersect.rectPoint),
        rects: Lib.canvas.getContext2d(allCanvas.intersect.rects),
        circlePoint: Lib.canvas.getContext2d(allCanvas.intersect.circlePoint),
        circles: Lib.canvas.getContext2d(allCanvas.intersect.circles),
    },
};
const allObjects = {
    intersect: {
        rectPoint: { main: null, second: null, text: null },
        rects: { main: null, second: null, text: null },
        circlePoint: { main: null, second: null, text: null },
        circles: { main: null, second: null, text: null },
    },
};
const allDrawToggled = {
    intersect: {
        rectPoint: false,
        rects: false,
        circlePoint: false,
        circles: false,
    },
};
const mainColor = "rgba(0, 100, 255, 0.3)";
const secondColor = "rgba(0, 200, 0, 0.3)";
allObjects.intersect.rectPoint.text = new Text_isIntersect(2, allCanvas.intersect.rectPoint.height - 5);
allObjects.intersect.rects.text = new Text_isIntersect(2, allCanvas.intersect.rects.height - 5);
allObjects.intersect.circlePoint.text = new Text_isIntersect(2, allCanvas.intersect.circlePoint.height - 5);
allObjects.intersect.circles.text = new Text_isIntersect(2, allCanvas.intersect.circles.height - 5);
window.addEventListener("resize", resizeAllCanvas);
resizeAllCanvas();
Lib.addButtonListener("button_canvas_drawGrid", () => {
    const canvas = allCanvas.canvas;
    const ctx = allContext.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Lib.canvas.drawGrid(ctx, 20);
});
Lib.addButtonListener("button_canvas_fitToParent", () => { Lib.canvas.fitToParent(allCanvas.canvas); });
addListenerToDraw("button_intersect_rectPoint", "intersect", "rectPoint", "point");
addListenerToDraw("button_intersect_rects", "intersect", "rects", "rect");
addListenerToDraw("button_intersect_circlePoint", "intersect", "circlePoint", "point");
addListenerToDraw("button_intersect_circles", "intersect", "circles", "circle");
function addListenerToDraw(buttonId, keyGroup, key, shape) {
    Lib.addButtonListener(buttonId, () => {
        allDrawToggled[keyGroup][key] = true;
        const canvasParent = allCanvas[keyGroup][key].parentElement;
        const objects = allObjects[keyGroup][key];
        objects.second = null;
        if (canvasParent != null) {
            canvasParent.style.boxShadow = "0px 0px 5px blue, 0px 0px 10px blue";
        }
    });
    const canvas = allCanvas[keyGroup][key];
    canvas.addEventListener("click", (e) => {
        if (allDrawToggled[keyGroup][key]) {
            const ctx = allContext[keyGroup][key];
            const objects = allObjects[keyGroup][key];
            if (objects.second == null) {
                switch (shape) {
                    case "point":
                        objects.second = new Point(e.offsetX, e.offsetY);
                        endDrawing(keyGroup, key);
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
                endDrawing(keyGroup, key);
            }
            drawOne(keyGroup, key);
            if (allDrawToggled[keyGroup][key])
                Lib.canvas.drawCoords(e.offsetX, e.offsetY, ctx);
        }
    });
    canvas.addEventListener("mousemove", (e) => {
        if (allDrawToggled[keyGroup][key]) {
            const objects = allObjects[keyGroup][key];
            const ctx = allContext[keyGroup][key];
            if (objects.second != null) {
                if (objects.second instanceof Rect) {
                    objects.second.width = e.offsetX - objects.second.x;
                    objects.second.height = e.offsetY - objects.second.y;
                }
                if (objects.second instanceof Circle) {
                    objects.second.r = Math.sqrt(Lib.square(objects.second.x - e.offsetX) + Lib.square(objects.second.y - e.offsetY));
                }
            }
            isIntersect(keyGroup, key);
            drawOne(keyGroup, key);
            Lib.canvas.drawCoords(e.offsetX, e.offsetY, ctx);
        }
    });
    canvas.addEventListener("mouseleave", (e) => {
        drawOne(keyGroup, key);
    });
}
function endDrawing(keyGroup, key) {
    allDrawToggled[keyGroup][key] = false;
    const canvasParent = allCanvas[keyGroup][key].parentElement;
    if (canvasParent != null) {
        canvasParent.style.boxShadow = "";
    }
    isIntersect(keyGroup, key);
}
function isIntersect(keyGroup, key) {
    const objects = allObjects[keyGroup][key];
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
    allObjects.intersect.rectPoint.main = new Rect(Math.round((allCanvas.intersect.rectPoint.width - 100) / 2), Math.round((allCanvas.intersect.rectPoint.height - 100) / 2), 100, 100, mainColor);
    allObjects.intersect.rects.main = new Rect(Math.round((allCanvas.intersect.rectPoint.width - 100) / 2), Math.round((allCanvas.intersect.rectPoint.height - 100) / 2), 100, 100, mainColor);
    allObjects.intersect.circlePoint.main = new Circle(Math.round(allCanvas.intersect.circlePoint.width / 2), Math.round(allCanvas.intersect.circlePoint.height / 2), 50, mainColor);
    allObjects.intersect.circles.main = new Circle(Math.round(allCanvas.intersect.circlePoint.width / 2), Math.round(allCanvas.intersect.circlePoint.height / 2), 50, mainColor);
    drawOne("intersect", "rectPoint");
    drawOne("intersect", "rects");
    drawOne("intersect", "circlePoint");
    drawOne("intersect", "circles");
}
function drawOne(keyGroup, key) {
    const ctx = allContext[keyGroup][key];
    const objects = allObjects[keyGroup][key];
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    objects.main?.draw(ctx);
    objects.second?.draw(ctx);
    objects.text?.draw(ctx);
}
function resizeAllCanvas() {
    resetCanvas(allCanvas.intersect.rectPoint);
    resetCanvas(allCanvas.intersect.rects);
    resetCanvas(allCanvas.intersect.circlePoint);
    resetCanvas(allCanvas.intersect.circles);
    Lib.canvas.fitToParent(allCanvas.intersect.rectPoint);
    Lib.canvas.fitToParent(allCanvas.intersect.rects);
    Lib.canvas.fitToParent(allCanvas.intersect.circlePoint);
    Lib.canvas.fitToParent(allCanvas.intersect.circles);
    redrawAll();
}
function resetCanvas(canvas) {
    canvas.style.width = "0px";
    canvas.style.height = "0px";
}
