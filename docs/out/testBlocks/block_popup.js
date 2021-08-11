import * as Lib from "../littleLib.js";
import { contextMenu, Popup } from "../popup.js";
export function run() {
    const r1 = Lib.get.div("popup_open_result");
    const r2 = Lib.get.div("popup_openAsync_result");
    const r3 = Lib.get.div("popup_contextMenu_result");
    Lib.addButtonListener("button_popup_open", () => {
        const popup = new Popup();
        popup.title = "Title";
        popup.addListener("close", r => r1.innerText = `confirmed: ${r}`);
        popup.open();
    });
    Lib.addButtonListener("button_popup_openAsync", async () => {
        const popup = new Popup();
        popup.title = "Title";
        const r = await popup.openAsync();
        r2.innerText = `confirmed: ${r}`;
    });
    Lib.addButtonListener("button_popup_contextMenu", async () => {
        const r = await contextMenu("Title", [
            { text: "Item 1", id: "item1" },
            { text: "Item with id: xyz", id: "xyz" },
            { text: "Item without id" },
            { text: "Sub-menu", subItems: [
                    { text: "Item 1", id: "item2" },
                    { text: "Item 2", id: "item3" },
                    { text: "Item 3", id: "item4" },
                    { text: "Sub-sub-menu", subItems: [
                            { text: "Item 1", id: "item5" },
                            { text: "Item 2", id: "item6" },
                            { text: "Item 3", id: "item7" },
                        ] },
                ] },
        ]);
        r3.innerText = `result: ${r}`;
    });
}
