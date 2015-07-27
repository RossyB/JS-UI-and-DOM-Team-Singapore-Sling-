/// <reference path="D:\New courses\9 JavaScript UI and DOM\TeamworkPaintDotBg\TeamworkPaintDotBg\libs/kinetic-v5.1.0.js" />

(function () {
    window.onload = function() {
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
            selectedColor,
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
    
        var RectangleControl = (function(parent) {
          RectangleControl.prototype = parent.prototype;
          
          function RectangleControl(x, y, width, height, stroke, strokeWidth) {
            parent.call(this, x, y, stroke, strokeWidth);
            this.width = width;
            this.height = height;
          }
    
          return RectangleControl;
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
          
          function CircleControl (x, y, radius, fill, stroke, strokeWidth) {
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
        var image = new ImageControl(30, 30, 200, 200, 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTBWymOLW11o8_b8vm5kPzFTvd4I5HrS-vcHcZKlRBrlTSRvxDd7tJs_ucK', 'black', 4);
        //Palette
        var pick_blue = new FilledRectangleControl(0, 0, 30, 110, 'rgb(5, 123, 231)', 'black', 4),
            pick_red = new FilledRectangleControl(30, 0, 30, 110, 'rgb(255, 12, 35)', 'black', 4),
            pick_green = new FilledRectangleControl(60, 0, 30, 110, 'rgb(10, 255, 25)', 'black', 4),
            pick_yellow = new FilledRectangleControl(90, 0, 30, 110, 'rgb(255, 255, 25)', 'black', 4),
            pick_orange = new FilledRectangleControl(120, 0, 30, 110, 'rgb(255, 125, 25)', 'black', 4),
            pick_pink = new FilledRectangleControl(150, 0, 30, 110, 'rgb(255, 25, 125)', 'black', 4);
        
        toolBoxLayer.on('click', function(e) {
            selectTool(e.target);
    
        });
        
        stage.on('mousedown', function() {
            var mousePos = stage.getPointerPosition();
            
            drawnShapeBeginX = mousePos.x;
            drawnShapeBeginY = mousePos.y;
            
            switch (selectedTool.className.toLowerCase()) {
                case 'circle':
                    currentlyDrawnShape = new CircleControl(drawnShapeBeginX, drawnShapeBeginY, 0, 'white', 'black', 1);
                    break;
    
            }
        });
        
        stage.on('mouseup', function() {
            var mousePos = stage.getPointerPosition(),
            currentX = mousePos.x,
            currentY = mousePos.y;
            
            switch(selectedTool.className.toLowerCase()) {
                case 'circle':
                    currentlyDrawnShape.radius = Math.sqrt( Math.pow( (currentlyDrawnShape.x - currentX) , 2) + Math.pow( (currentlyDrawnShape.y - currentY), 2) );
                    currentlyDrawnShape = new Kinetic.Circle(currentlyDrawnShape);
                    break;
            }
            
            drawLayer.add(currentlyDrawnShape);
        });
        
        colorBoxLayer.add(new Kinetic.Rect(pick_blue));
        colorBoxLayer.add(new Kinetic.Rect(pick_red));
        colorBoxLayer.add(new Kinetic.Rect(pick_green));
        colorBoxLayer.add(new Kinetic.Rect(pick_yellow));
        colorBoxLayer.add(new Kinetic.Rect(pick_orange));
        colorBoxLayer.add(new Kinetic.Rect(pick_pink));
        toolBoxLayer.add(circle);
        drawLayer.add(emptyRectangle);
        
        //colorBoxLayer.add(color);
        colorBox.add(colorBoxLayer);
        stage.add(drawLayer);
        toolBox.add(toolBoxLayer);
        
        function frame() {
            drawLayer.drawScene();
            
            setTimeout(frame, 100);        
        }
        
        frame();
    }
}());