/// <reference path="D:\New courses\9 JavaScript UI and DOM\TeamworkPaintDotBg\TeamworkPaintDotBg\libs/kinetic-v5.1.0.js" />
/// <reference path="D:\New courses\9 JavaScript UI and DOM\TeamworkPaintDotBg\TeamworkPaintDotBg\controls.js" />

var stage = new Kinetic.Stage({
    container: 'canvas-container',
    width: (window.innerWidth / 100) * 50,
    height: 510
});

var toolBox = new Kinetic.Stage({
    container: 'toolbox',
    width: (window.innerWidth / 100) * 15,
    height: 510
});

var colorBox = new Kinetic.Stage({
    container: 'colorbox',
    width: 340,
    height: 510
});

var drawLayer = new Kinetic.Layer(),
    toolBoxLayer = new Kinetic.Layer(),
    colorBoxLayer = new Kinetic.Layer(),
    selectedTool,
    selectedWidth = 1,
    selectedfillColor = 'transparent',
    selectedStrokeColor = 'black',
    selectedColorBoxColor = 'transparent',
    currentlyDrawnShape,
    drawnShapeBeginX,
    drawnShapeBeginY,
    drawingWithPen = false,
    erasing = false,
    fillJustClicked = false,
    strokeJustClicked = false;

function selectTool(tool) {
    selectedTool = tool;
}

var emptyRectangle = new Kinetic.Rect(new FilledRectangleControl(0, 0, stage.getWidth(), stage.getHeight(), 0, 0, 0));
toolBoxDrawer.setStage(stage);
toolBoxDrawer.setLayer(toolBoxLayer);

toolBoxDrawer.drawText(15, 15, 'Tools');

toolBoxDrawer.createBox(15, 45, toolBoxDrawer.LINE, 'line', 'tool')
             .setStrokeWidth(2);
toolBoxDrawer.createBox(75, 45, toolBoxDrawer.RECT, 'rect', 'tool');
toolBoxDrawer.createBox(135, 44, toolBoxDrawer.CIRCLE, 'circle', 'tool');
toolBoxDrawer.createBox(15, 105, toolBoxDrawer.TRIANGLE, 'triangle', 'tool');
selectTool(toolBoxDrawer.createBox(75, 105, toolBoxDrawer.PENCIL, 'pen', 'tool')
             .setStrokeWidth(2));

toolBoxDrawer.drawText(15, 175, 'Stroke and fill');

var strokeBox = toolBoxDrawer.createBox(15, 210, toolBoxDrawer.RECT,'strokedRect', 'stroke');
    strokeBox.setStroke('black');
             
var fillBox = toolBoxDrawer.createBox(75, 210, toolBoxDrawer.RECT,'filledRect', 'fill');
    fillBox.setFill('black');
    fillBox.setStroke('black');
toolBoxDrawer.createBox(15, 270, toolBoxDrawer.LINE, 'small', 'lineWidth')
             .setStrokeWidth(2);
toolBoxDrawer.createBox(75, 270, toolBoxDrawer.LINE, 'medium', 'lineWidth')
             .setStrokeWidth(4);
toolBoxDrawer.createBox(15, 330, toolBoxDrawer.LINE, 'large', 'lineWidth')
             .setStrokeWidth(6);
toolBoxDrawer.createBox(75, 330, toolBoxDrawer.LINE, 'huge', 'lineWidth')
             .setStrokeWidth(8);
    
toolBoxDrawer.drawText(15, 390, 'Eraser');

toolBoxDrawer.createBox(15, 420, toolBoxDrawer.CIRCLE, 'eraserSmall', 'tool')
             .setRadius(10)
             .setFill('white')
             .setStroke('darkgray');
toolBoxDrawer.createBox(75, 420, toolBoxDrawer.CIRCLE, 'eraserBig', 'tool')
             .setRadius(17)
             .setFill('white')
             .setStroke('darkgray');
toolBoxDrawer.createBox(135, 420, toolBoxDrawer.CIRCLE, 'eraserBiggest', 'tool')
             .setRadius(23)
             .setFill('white')
             .setStroke('darkgray');

var i, j, rgb, palette = [];

for (i = 0; i < 12; i += 1) {
    for (j = 0; j < 10; j += 1) {
        rgb = 'rgb(' + i * 25 + ', ' + j * 32 + ', ' + i * j * 13 + ')';
        palette.push(new FilledRectangleControl(j * 34, i * 34, 34, 34, rgb, 'gray', 4));
    }
}

for (i = 12; i < 15; i += 1) {
    for (j = 0; j < 10; j += 1) {
        rgb = 'rgb(' + i * 25 + ', ' + j * 80 + ', ' + i * j * 2 + ')';
        palette.push(new FilledRectangleControl(j * 34, i * 34, 34, 34, rgb, 'gray', 4));
    }
}


palette.forEach(function (item) {
    colorBoxLayer.add(new Kinetic.Rect(item));
});

//toolBoxLayer.add(circle);
//toolBoxLayer.add(square);
drawLayer.add(emptyRectangle); // DO NOT REMOVE KinectJS requires somethings drawn on the layer enable drawing on it.

//colorBoxLayer.add(color);
colorBox.add(colorBoxLayer);
stage.add(drawLayer);
toolBox.add(toolBoxLayer);

function frame() {
    drawLayer.drawScene();
    toolBoxLayer.drawScene();
    setTimeout(frame, 10);
}

frame();
