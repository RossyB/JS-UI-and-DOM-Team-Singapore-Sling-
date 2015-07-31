var emptyRectangle = new Kinetic.Rect(new FilledRectangleControl(0, 0, stage.getWidth(), stage.getHeight(), 0, 0, 0)),
    circle = new Kinetic.Circle(new CircleControl(30, 30, 30, 'white', 'black', 1)),
    square = new Kinetic.Rect(new FilledRectangleControl(5, 80, 60, 60, 'white', 'black', 1)),
    image = new ImageControl(30, 30, 200, 200, 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTBWymOLW11o8_b8vm5kPzFTvd4I5HrS-vcHcZKlRBrlTSRvxDd7tJs_ucK', 'black', 4);

toolBoxDrawer.setStage(stage);
toolBoxDrawer.setLayer(toolBoxLayer);

toolBoxDrawer.drawText(15, 15, 'Tools');

toolBoxDrawer.createBox(15, 45, toolBoxDrawer.LINE, 'line')
             .setStrokeWidth(2);
toolBoxDrawer.createBox(75, 45, toolBoxDrawer.RECT, 'rect');
toolBoxDrawer.createBox(135, 44, toolBoxDrawer.CIRCLE, 'circle');
toolBoxDrawer.createBox(15, 105, toolBoxDrawer.TRIANGLE, 'triangle');
toolBoxDrawer.createBox(75, 105, toolBoxDrawer.PENCIL, 'pen')
             .setStrokeWidth(2);

toolBoxDrawer.drawText(15, 175, 'Stroke and fill');

toolBoxDrawer.createBox(15, 210, toolBoxDrawer.RECT,'strokedRect')
             .setStroke('darkcyan');
toolBoxDrawer.createBox(75, 210, toolBoxDrawer.RECT,'filledRect')
             .setFill('darkcyan')
             .setStroke('darkcyan');
toolBoxDrawer.createBox(15, 270, toolBoxDrawer.LINE, 'small')
             .setStrokeWidth(2);
toolBoxDrawer.createBox(75, 270, toolBoxDrawer.LINE, 'medium')
             .setStrokeWidth(4);
toolBoxDrawer.createBox(15, 330, toolBoxDrawer.LINE, 'large')
             .setStrokeWidth(6);
toolBoxDrawer.createBox(75, 330, toolBoxDrawer.LINE, 'huge')
             .setStrokeWidth(8);
    
toolBoxDrawer.drawText(15, 390, 'Eraser');

toolBoxDrawer.createBox(15, 420, toolBoxDrawer.CIRCLE, 'eraserSmall')
             .setRadius(10)
             .setFill('white')
             .setStroke('darkgray');
toolBoxDrawer.createBox(75, 420, toolBoxDrawer.CIRCLE, 'eraserBig')
             .setRadius(17)
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
    setTimeout(frame, 100);
}

frame();
