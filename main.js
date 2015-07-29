/// <reference path="D:\New courses\9 JavaScript UI and DOM\TeamworkPaintDotBg\TeamworkPaintDotBg\libs/kinetic-v5.1.0.js" />
/// <reference path="D:\New courses\9 JavaScript UI and DOM\TeamworkPaintDotBg\TeamworkPaintDotBg\controls.js" />

(function () {
    window.onload = function () {
        var stage = new Kinetic.Stage({
            container: 'canvas-container',
            width: (window.innerWidth / 100) * 50,
            height: 500
        });

        var toolBox = new Kinetic.Stage({
            container: 'toolbox',
            width: (window.innerWidth / 100) * 15,
            height: 500
        });

        var colorBox = new Kinetic.Stage({
            container: 'colorbox',
            width: (window.innerWidth / 100) * 15,
            height: 500
        });


        var drawLayer = new Kinetic.Layer(),
            toolBoxLayer = new Kinetic.Layer(),
            colorBoxLayer = new Kinetic.Layer(),
            selectedTool,
            selectedWidth,
            fillColor,
            selectedColor = 'rgb(128, 255, 255)',
            currentlyDrawnShape,
            drawnShapeBeginX,
            drawnShapeBeginY;
        /*moved [stage].add on bottom,
         so everything is displayed correctly*/

        /*Not sure if i'm on the right path. // OF COURSE YOU FUCKING ARENT RADO
         This oop probably doesn't help much with the already given
         Kineticjs objects, but later lines and figures could be added perhaps.
         It is supposed to make drawing of the menu and drawing stuff on the stage
         easier.
         Maybe all classes shoud have drawTo method?
         Generally, it's a sad story, but we have to go through it*/
        var Control = (function () {
            function Control(x, y, stroke, strokeWidth) {
                this.x = x;
                this.y = y;
                this.stroke = stroke;
                this.strokeWidth = strokeWidth;
            }

            return Control;
        }());

        var RectangleControl = (function (parent) {
            RectangleControl.prototype = parent.prototype;

            function RectangleControl(x, y, width, height, stroke, strokeWidth) {
                parent.call(this, x, y, stroke, strokeWidth);
                this.width = width;
                this.height = height;
            }

            return RectangleControl;
        }(Control));

        var LineControl = (function (parent) {
            LineControl.prototype = parent.prototype;

            function LineControl(x, y, points, stroke, strokeWidth) {
                parent.call(this, x, y, stroke, strokeWidth);
                this.points = [];

            }

            return LineControl;
        }(Control));

        var FilledRectangleControl = (function (parent) {
            FilledRectangleControl.prototype = RectangleControl.prototype;

            function FilledRectangleControl(x, y, width, height, fill, stroke, strokeWidth) {
                parent.call(this, x, y, width, height, stroke, strokeWidth);
                this.fill = fill;
            }

            return FilledRectangleControl;
        }(RectangleControl));

        var ImageControl = (function (parent) {
            var image;
            ImageControl.prototype = parent.prototype;

            function ImageControl(x, y, width, height, imageSrc, stroke, strokeWidth) {
                parent.call(this, x, y, width, height, stroke, strokeWidth);
                this.imageSrc = imageSrc;
                this.image = new Image(width, height);
                this.image.src = imageSrc;
            }

            ImageControl.prototype.drawTo = function (stage, layer) {
                var self = this;
                self.image.onload = function () {
                    layer.add(new Kinetic.Image(self));
                    stage.add(layer);
                }
            }

            return ImageControl;
        }(RectangleControl));

        var CircleControl = (function (parent) {
            CircleControl.prototype = Control.prototype;

            function CircleControl(x, y, radius, fill, stroke, strokeWidth) {
                parent.call(this, x, y, stroke, strokeWidth);
                this.fill = fill;
                this.radius = radius;
            };

            return CircleControl;
        }(Control));

        function selectTool(tool) {
            selectedTool = tool;
        }

        var emptyRectangle = new Kinetic.Rect(new FilledRectangleControl(0, 0, stage.getWidth(), stage.getHeight(), 0, 0, 0));
        var circle = new Kinetic.Circle(new CircleControl(30, 30, 30, 'white', 'black', 1));
        var square = new Kinetic.Rect(new FilledRectangleControl(5, 80, 60, 60, 'white', 'black', 1));
        var image = new ImageControl(30, 30, 200, 200, 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTBWymOLW11o8_b8vm5kPzFTvd4I5HrS-vcHcZKlRBrlTSRvxDd7tJs_ucK', 'black', 4);

        toolBoxDrawer.drawText(toolBox, toolBoxLayer, 15, 15, 'Tools');
            toolBoxDrawer.createBox(toolBox, toolBoxLayer, 15, 45, toolBoxDrawer.LINE, 'line');
            toolBoxDrawer.createBox(toolBox, toolBoxLayer, 75, 45, toolBoxDrawer.RECT, 'rect');
            toolBoxDrawer.createBox(toolBox, toolBoxLayer, 135, 44, toolBoxDrawer.CIRCLE, 'circle');
            toolBoxDrawer.createBox(toolBox, toolBoxLayer, 15, 105, toolBoxDrawer.TRIANGLE, 'triangle');
        toolBoxDrawer.drawText(toolBox, toolBoxLayer, 15, 175, 'Stroke and fill');
            toolBoxDrawer.createBox(toolBox, toolBoxLayer, 15, 210, toolBoxDrawer.RECT,'blueFillRect', undefined, 'blue');
            toolBoxDrawer.createBox(toolBox, toolBoxLayer, 75, 210, toolBoxDrawer.RECT,'blueFillRect', 'blue', undefined);
            
            /*
        drawText(toolBox, toolBoxLayer, 15, 15, 'Tools');
        drawLineToolBox(toolBox, toolBoxLayer, 15, 45, 2, 'line');
        drawRectToolBox(toolBox, toolBoxLayer, 75, 45, 'buttonface', 'gray', 'rect');
        drawCircleToolBox(toolBox, toolBoxLayer, 135, 45, 'circle');
        drawTriangleToolBox(toolBox, toolBoxLayer, 15, 105, 'triangle');
        drawText(toolBox, toolBoxLayer, 15, 175, 'Stroke and fill');
        drawRectToolBox(toolBox, toolBoxLayer, 15, 210, 'blue', 'blue', 'fill');
        drawRectToolBox(toolBox, toolBoxLayer, 135, 270, 'white', 'black', 'stroke');
        drawLineToolBox(toolBox, toolBoxLayer, 75, 210, 2, 'small');
        drawLineToolBox(toolBox, toolBoxLayer, 135, 210, 4, 'meddium');
        drawLineToolBox(toolBox, toolBoxLayer, 15, 270, 6, 'large');
        drawLineToolBox(toolBox, toolBoxLayer, 75, 270, 10, 'huge');
*/

        var i, j, rgb, palette = [];
        for (i = 0; i < 4; i += 1) {
            for (j = 0; j < 7; j += 1) {
                rgb = 'rgb(' + i * 80 + ', ' + j * 40 + ', ' + i * j * 13 + ')';
                palette.push(new FilledRectangleControl(j * 30, i * 120, 30, 120, rgb, 'gray', 4));
            }
        }

        toolBoxLayer.on('click', function (e) {
            selectTool(e.target);
            console.log(selectedTool.attrs.id);
        });

        colorBoxLayer.on('click', function (e) {
            selectedColor = e.target.fill();
        });


        stage.on('mousedown', function () {
            var mousePos = stage.getPointerPosition();
            drawnShapeBeginX = mousePos.x;
            drawnShapeBeginY = mousePos.y;
         
            switch (selectedTool.shapeId) {
                case 'circle':
                    currentlyDrawnShape = new CircleControl(drawnShapeBeginX, drawnShapeBeginY, 0, fillColor || 'white', selectedColor || 'black', selectedWidth || 1);
                    break;
                case 'rect':

                    currentlyDrawnShape = new FilledRectangleControl(drawnShapeBeginX, drawnShapeBeginY, 0, 0, fillColor || 'white', selectedColor || 'black', selectedWidth || 1);

                    break;
                case 'line':
                    currentlyDrawnShape = new LineControl(drawnShapeBeginX, drawnShapeBeginY, [0, 0], 'black', 1);

                    break;
                case 'small':
                    selectedWidth = 2;
                    break;

                case 'meddium':
                    selectedWidth = 4;
                    break;

                case 'large':
                    selectedWidth = 6;
                    break;

                case 'huge':
                    selectedWidth = 8;
                    break;

                case 'fill':
                    fillColor = selectedColor;
                    break;

                case    'stroke':
                    fillColor = 'white';
                    break;
                case 'triangle':
                //TODO IMPLEMENT
                    break;
            }

        });


        stage.on('mouseup', function () {
            var mousePos = stage.getPointerPosition(),
                currentX = mousePos.x,
                currentY = mousePos.y;

            //var getPoints = function () {
            //    var points = [];
            //    points.push(currentX);
            //    points.push(currentY);
            //    return points;
            //};

            switch (selectedTool.shapeId) {

                case 'circle':
                    currentlyDrawnShape.radius = Math.sqrt(Math.pow((currentlyDrawnShape.x - currentX), 2) + Math.pow((currentlyDrawnShape.y - currentY), 2));
                    currentlyDrawnShape = new Kinetic.Circle(currentlyDrawnShape);
                    break;
                case 'rect':
                    currentlyDrawnShape.width = currentX - currentlyDrawnShape.x;
                    currentlyDrawnShape.height = currentY - currentlyDrawnShape.y;
                    currentlyDrawnShape = new Kinetic.Rect(currentlyDrawnShape);
                    break;
                case 'line':
                    currentlyDrawnShape = new Kinetic.Line({
                        points: [drawnShapeBeginX, drawnShapeBeginY, currentX, currentY],
                        stroke: selectedColor,
                        strokeWidth: selectedWidth || 1
                    });
                    break;
                case 'triangle': 
                //TODO IMPLEMENT
                    break;
            }

            drawLayer.add(currentlyDrawnShape);
        });

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
    };
}());