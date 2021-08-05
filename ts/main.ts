import { run as run_canvas } from "./testBlocks/block_canvas.js";
import { run as run_intersect } from "./testBlocks/block_intersect.js";
import { run as run_random } from "./testBlocks/block_random.js";
import { run as run_moveAnimator } from "./testBlocks/block_moveAnimator.js";
import { run as run_popup } from "./testBlocks/block_popup.js";

run_canvas();
run_intersect();
run_random();
run_moveAnimator();
run_popup();