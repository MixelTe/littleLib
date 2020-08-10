# littelLib
lib with simply functions

## Lib file
typescript:
littelLib/ts/littelLib.ts

javascript:
littelLib/docs/out/littelLib.js

## Usage
``` ts
import * as Lib from "./littelLib.js"
```
### Get Html element
function                  | arguments  | return
--------------------------|------------|---------------
Lib.get.div               | id: string | HTMLDivElement
Lib.get.button            | id: string | HTMLButtonElement
Lib.get.canvas            | id: string | HTMLCanvasElement


### Canvas functions
function                          | arguments                                                       | return
----------------------------------|-----------------------------------------------------------------|-----------------
Lib.canvas.getContext2d           | canvas: HTMLCanvasElement                                       | CanvasRenderingContext2D
Lib.canvas.fitToParent.BCR        | canvas: HTMLCanvasElement                                       |
Lib.canvas.fitToParent.ClientWH   | canvas: HTMLCanvasElement                                       |
Lib.canvas.drawGrid               | ctx: CanvasRenderingContext2D, cellSize: number, color?: string |
Lib.canvas.drawCoords             | ctx: CanvasRenderingContext2D, x: number, y: number             |


### Intersection test functions
function                        | arguments                        | return
--------------------------------|----------------------------------|---------------
Lib.intersection.rectPoint      | rect: Rect, point: Point         | boolean
Lib.intersection.rects          | rect1: Rect, rect2: Rect         | boolean
Lib.intersection.circlePoint    | circle: Circle, point: Point     | boolean
Lib.intersection.circles        | circle1: Circle, circle2: Circle | boolean

#### Point:
parameter | type
----------|--------
x	        | number
y	        | number

#### Rect:
parameter | type
----------|--------
x	        | number
y	        | number
width     | number
height    | number

#### Circle:
parameter | type
----------|--------
x	        | number
y	        | number
r	        | number

### Get random values
function                  | arguments                    | return
--------------------------|------------------------------|---------------
Lib.random.int            | bound: number                | 0 >= number < bound
Lib.random.intFrom        | start: number, bound: number | start >= number < bound
Lib.random.boolean        |                              | boolean
Lib.random.asbOrNot       | num: number                  | num or -num


### Other functions
function                  | arguments                              | return
--------------------------|----------------------------------------|---------------
Lib.square                | num: number                            | num * num
Lib.loadScript            | scriptPath: string                     |
Lib.addButtonListener     | id: string, f: (e: MouseEvent) => void |

