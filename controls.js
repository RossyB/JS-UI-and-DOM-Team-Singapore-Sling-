/// <reference path="D:\New courses\9 JavaScript UI and DOM\TeamworkPaintDotBg\TeamworkPaintDotBg\libs/kinetic-v5.1.0.js" />

function drawText(stage, layer, x, y, text) {
    text = new Kinetic.Text({
        x: x,
        y: y,
        text: text,
        fontSize: 20,
        fontFamily: 'Segoe UI',
        fill: 'gray'
    });
    layer.add(text);
    stage.add(layer);
}

function drawLineToolBox(stage, layer, x, y, strokeWidth, id) {
    var rect = new Kinetic.Rect({
        x: x,
        y: y,
        width: 50,
        height: 50,
        fill: 'buttonface',
        stroke: 'gray',
        strokeWidth: 2,
        id: id
    });

    var line = new Kinetic.Line({
        points: [x + 10, y + 25, x + 40, y + 25],
        stroke: 'gray',
        strokeWidth: strokeWidth || 2,
        id: id
    });

    layer.add(rect);
    layer.add(line);
    stage.add(layer);
}

function drawRectToolBox(stage, layer, x, y, fill, stroke, id) {
    var rect = new Kinetic.Rect({
        x: x,
        y: y,
        width: 50,
        height: 50,
        fill: 'buttonface',
        stroke: 'gray',
        strokeWidth: 2,
        id: id
    });

    var innerRect = new Kinetic.Rect({
        x: x + 10,
        y: y + 10,
        width: 30,
        height: 30,
        fill: fill || 'buttonface',
        stroke: stroke || 'gray',
        strokeWidth: 2,
        id: id
    });

    layer.add(rect);
    layer.add(innerRect);
    stage.add(layer);
}

function drawCircleToolBox(stage, layer, x, y, id) {
    var rect = new Kinetic.Rect({
        x: x,
        y: y,
        width: 50,
        height: 50,
        fill: 'buttonface',
        stroke: 'gray',
        strokeWidth: 2,
        id: id
    });

    var circle = new Kinetic.Circle({
        x: x + 25,
        y: y + 25,
        radius: 16,
        stroke: 'gray',
        strokeWidth: 2,
        id: id
    });

    layer.add(rect);
    layer.add(circle);
    stage.add(layer);
}

function drawTriangleToolBox(stage, layer, x, y, id) {
    var rect = new Kinetic.Rect({
        x: x,
        y: y,
        width: 50,
        height: 50,
        fill: 'buttonface',
        stroke: 'gray',
        strokeWidth: 2,
        id: id
    });

    var line = new Kinetic.Line({
        points: [x + 10, y + 40, x + 40, y + 40, x + 25, y + 10 ],
        stroke: 'gray',
        strokeWidth: 2,
        closed: true,
        id: id
    });

    layer.add(rect);
    layer.add(line);
    stage.add(layer);
}