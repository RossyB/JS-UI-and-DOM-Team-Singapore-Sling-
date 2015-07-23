/// <reference path="D:\New courses\9 JavaScript UI and DOM\TeamworkPaintDotBg\TeamworkPaintDotBg\libs/kinetic-v5.1.0.js" />

(function () {
    var stage = new Kinetic.Stage({
        container: 'canvas-container',
        width: 800,
        height: 500
    });

    var tollBox = new Kinetic.Stage({
        container: 'toolbox',
        width: 150,
        height: 500
    });

    var colorBox = new Kinetic.Stage({
        container: 'colorbox',
        width: 150,
        height: 500
    });

    var drawLayer = new Kinetic.Layer();
    var tollBoxLayer = new Kinetic.Layer();
    var colorBoxLayer = new Kinetic.Layer();

    stage.add(drawLayer);
    tollBox.add(tollBoxLayer);
    colorBox.add(colorBoxLayer);

}());