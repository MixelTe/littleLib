import * as Lib from "../littelLib.js";
import { Rect, Text_simple } from "./drawing.js";
const outputsInt = getOutputs("table_random_int");
const outputsBoolean = getOutputs("table_random_boolean");
const canvasAbsOrNot = Lib.get.canvas("canvas_random_absOrNot");
const AbsOrNot = {
    ctx: Lib.canvas.getContext2d(canvasAbsOrNot),
    obj: new Rect(Math.round((canvasAbsOrNot.width - 50) / 2), Math.round((canvasAbsOrNot.height - 50) / 2), 50, 50, "transparent"),
    textX: new Text_simple(2, 16, "dX: 0"),
    textY: new Text_simple(2, 36, "dY: 0"),
    speed: 10,
};
export function run() {
    Lib.addButtonListener("button_random_int", () => {
        outputsInt.forEach(el => {
            el.innerText = `${Lib.random.int(1000)}`;
        });
    });
    Lib.addButtonListener("button_random_boolean", () => {
        outputsBoolean.forEach(el => {
            el.innerText = `${Lib.random.boolean()}`;
        });
    });
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    setInterval(moveAll, 200);
}
function moveAll() {
    const dx = Lib.random.asbOrNot(AbsOrNot.speed);
    const dy = Lib.random.asbOrNot(AbsOrNot.speed);
    AbsOrNot.obj.x += dx;
    if (AbsOrNot.obj.x < 0)
        AbsOrNot.obj.x = canvasAbsOrNot.width;
    if (AbsOrNot.obj.x > canvasAbsOrNot.width)
        AbsOrNot.obj.x = 0;
    AbsOrNot.obj.y += dy;
    if (AbsOrNot.obj.y < 0)
        AbsOrNot.obj.y = canvasAbsOrNot.height;
    if (AbsOrNot.obj.y > canvasAbsOrNot.height)
        AbsOrNot.obj.y = 0;
    if (dx > 0)
        AbsOrNot.textX.text = `X: +${AbsOrNot.speed}`;
    else
        AbsOrNot.textX.text = `X: -${AbsOrNot.speed}`;
    if (dy > 0)
        AbsOrNot.textY.text = `Y: +${AbsOrNot.speed}`;
    else
        AbsOrNot.textY.text = `Y: -${AbsOrNot.speed}`;
    redrawAll();
}
function redrawAll() {
    AbsOrNot.ctx.clearRect(0, 0, canvasAbsOrNot.width, canvasAbsOrNot.height);
    AbsOrNot.obj.draw(AbsOrNot.ctx);
    if (AbsOrNot.obj.x > canvasAbsOrNot.width - AbsOrNot.obj.width) {
        AbsOrNot.ctx.save();
        AbsOrNot.ctx.translate(-canvasAbsOrNot.width, 0);
        AbsOrNot.obj.draw(AbsOrNot.ctx);
        AbsOrNot.ctx.restore();
    }
    if (AbsOrNot.obj.y > canvasAbsOrNot.height - AbsOrNot.obj.height) {
        AbsOrNot.ctx.save();
        AbsOrNot.ctx.translate(0, -canvasAbsOrNot.height);
        AbsOrNot.obj.draw(AbsOrNot.ctx);
        AbsOrNot.ctx.restore();
    }
    AbsOrNot.textX.draw(AbsOrNot.ctx);
    AbsOrNot.textY.draw(AbsOrNot.ctx);
}
function resizeCanvas() {
    resetCanvas(canvasAbsOrNot);
    Lib.canvas.fitToParent(canvasAbsOrNot);
    const x = Math.round((canvasAbsOrNot.width - 50) / 2);
    const y = Math.round((canvasAbsOrNot.height - 50) / 2);
    AbsOrNot.obj = new Rect(x, y, 50, 50, "transparent");
    redrawAll();
}
function resetCanvas(canvas) {
    canvas.style.width = "0px";
    canvas.style.height = "0px";
}
function getOutputs(tableId) {
    const table = getTable(tableId);
    const tableChildren = table.children;
    let tableBody;
    for (let i = 0; i < tableChildren.length; i++) {
        const el = tableChildren[i];
        if (el instanceof HTMLTableSectionElement) {
            tableBody = el;
            break;
        }
    }
    if (tableBody == null)
        throw new Error("table body not found");
    const tableBodyChildren = tableBody.children;
    const tableRows = [];
    for (let i = 0; i < tableBodyChildren.length; i++) {
        const el = tableBodyChildren[i];
        if (el instanceof HTMLTableRowElement) {
            tableRows.push(el);
        }
    }
    const outputs = [];
    tableRows.forEach(el => {
        const rowChildren = el.children;
        const rowCells = [];
        for (let i = 0; i < rowChildren.length; i++) {
            const el = rowChildren[i];
            if (el instanceof HTMLTableCellElement) {
                rowCells.push(el);
            }
        }
        const output1 = rowCells[1];
        const output2 = rowCells[3];
        if (output1 != null)
            outputs.push(output1);
        if (output2 != null)
            outputs.push(output2);
    });
    return outputs;
}
function getTable(id) {
    const el = document.getElementById(id);
    if (el == null)
        throw new Error(`${id} not found`);
    if (el instanceof HTMLTableElement)
        return el;
    throw new Error(`${id} element not Table`);
}
