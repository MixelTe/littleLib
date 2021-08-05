import * as Lib from "../littleLib.js";
import { Popup } from "../popup.js";
export function run()
{
	const r1 = Lib.get.div("popup_open_result");
	const r2 = Lib.get.div("popup_openAsync_result");
	Lib.addButtonListener("button_popup_open", () =>
	{
		const popup = new Popup();
		popup.title = "Title";
		popup.addListener("close", r => r1.innerText = `confirmed: ${r}`);
		popup.open();
	});
	Lib.addButtonListener("button_popup_openAsync", async () =>
	{
		const popup = new Popup();
		popup.title = "Title";
		const r = await popup.openAsync();
		r2.innerText = `confirmed: ${r}`;
	});
}