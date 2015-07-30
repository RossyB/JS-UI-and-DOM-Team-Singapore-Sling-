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
    selectedWidth,
    fillColor,
    selectedColor = 'black',
    currentlyDrawnShape,
    drawnShapeBeginX,
    drawnShapeBeginY,
    drawingWithPen = false,
    erasing = false;


function selectTool(tool) {
    selectedTool = tool;
    console.log(selectedTool.shapeId);
}