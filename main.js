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
        var pickBlue1 = new FilledRectangleControl(0, 0, 30, 120, 'rgb(0, 128, 255)', 'black', 4),
            pickBlue2 = new FilledRectangleControl(30, 0, 30, 120, 'rgb(0, 128, 192)', 'black', 4),
            pickBlue3 = new FilledRectangleControl(60, 0, 30, 120, 'rgb(0, 64, 128)', 'black', 4),
            pickBlue4 = new FilledRectangleControl(90, 0, 30, 120, 'rgb(0, 0, 255)', 'black', 4),
            pickBlue5 = new FilledRectangleControl(120, 0, 30, 120, 'rgb(0, 0, 160)', 'black', 4),
            pickBlue6 = new FilledRectangleControl(150, 0, 30, 120, 'rgb(0, 0, 128)', 'black', 4),
            pickBlue7 = new FilledRectangleControl(180, 0, 30, 120, 'rgb(0, 0, 64)', 'black', 4),
            pickRed1 = new FilledRectangleControl(0, 120, 30, 120, 'rgb(255, 128, 128)', 'black', 4),
            pickRed2 = new FilledRectangleControl(30, 120, 30, 120, 'rgb(255, 0, 0)', 'black', 4),
            pickRed3 = new FilledRectangleControl(60, 120, 30, 120, 'rgb(255, 128, 64)', 'black', 4),
            pickRed4 = new FilledRectangleControl(90, 120, 30, 120, 'rgb(255, 128, 0)', 'black', 4),
            pickRed5 = new FilledRectangleControl(120, 120, 30, 120, 'rgb(128, 64, 0)', 'black', 4),
            pickRed6 = new FilledRectangleControl(150, 120, 30, 120, 'rgb(128, 0, 0)', 'black', 4),
            pickRed7 = new FilledRectangleControl(180, 120, 30, 120, 'rgb(64, 0, 0)', 'black', 4),
            pickGreen1 = new FilledRectangleControl(0, 240, 30, 120, 'rgb(0, 255, 128)', 'black', 4),
            pickGreen2 = new FilledRectangleControl(30, 240, 30, 120, 'rgb(0, 255, 64)', 'black', 4),
            pickGreen3 = new FilledRectangleControl(60, 240, 30, 120, 'rgb(128, 255, 0)', 'black', 4),
            pickGreen4 = new FilledRectangleControl(90, 240, 30, 120, 'rgb(0, 255, 0)', 'black', 4),
            pickGreen5 = new FilledRectangleControl(120, 240, 30, 120, 'rgb(0, 128, 0)', 'black', 4),
            pickGreen6 = new FilledRectangleControl(150, 240, 30, 120, 'rgb(0, 64, 0)', 'black', 4),
            pickGreen7 = new FilledRectangleControl(180, 240, 30, 120, 'rgb(0, 64, 64)', 'black', 4),
            pickGray1 = new FilledRectangleControl(0, 360, 30, 120, 'rgb(255, 255, 255)', 'black', 4),
            pickGray2 = new FilledRectangleControl(30, 360, 30, 120, 'rgb(192, 192, 192)', 'black', 4),
            pickGray3 = new FilledRectangleControl(60, 360, 30, 120, 'rgb(255, 255, 0)', 'black', 4),
            pickGray4 = new FilledRectangleControl(90, 360, 30, 120, 'rgb(255, 0, 255)', 'black', 4),
            pickGray5 = new FilledRectangleControl(120, 360, 30, 120, 'rgb(0, 255, 255)', 'black', 4),
            pickGray6 = new FilledRectangleControl(150, 360, 30, 120, 'rgb(128, 128, 64)', 'black', 4),
            pickGray7 = new FilledRectangleControl(180, 360, 30, 120, 'rgb(0, 0, 0)', 'black', 4);


            ;
        
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
        
        colorBoxLayer.add(new Kinetic.Rect(pickBlue1));
        colorBoxLayer.add(new Kinetic.Rect(pickBlue2));
        colorBoxLayer.add(new Kinetic.Rect(pickBlue3));
        colorBoxLayer.add(new Kinetic.Rect(pickBlue4));
        colorBoxLayer.add(new Kinetic.Rect(pickBlue5));
        colorBoxLayer.add(new Kinetic.Rect(pickBlue6));
        colorBoxLayer.add(new Kinetic.Rect(pickBlue7));
        colorBoxLayer.add(new Kinetic.Rect(pickRed1));
        colorBoxLayer.add(new Kinetic.Rect(pickRed2));
        colorBoxLayer.add(new Kinetic.Rect(pickRed3));
        colorBoxLayer.add(new Kinetic.Rect(pickRed4));
        colorBoxLayer.add(new Kinetic.Rect(pickRed5));
        colorBoxLayer.add(new Kinetic.Rect(pickRed6));
        colorBoxLayer.add(new Kinetic.Rect(pickRed7));
        colorBoxLayer.add(new Kinetic.Rect(pickGreen1));
        colorBoxLayer.add(new Kinetic.Rect(pickGreen2));
        colorBoxLayer.add(new Kinetic.Rect(pickGreen3));
        colorBoxLayer.add(new Kinetic.Rect(pickGreen4));
        colorBoxLayer.add(new Kinetic.Rect(pickGreen5));
        colorBoxLayer.add(new Kinetic.Rect(pickGreen6));
        colorBoxLayer.add(new Kinetic.Rect(pickGreen7));
        colorBoxLayer.add(new Kinetic.Rect(pickGray1));
        colorBoxLayer.add(new Kinetic.Rect(pickGray2));
        colorBoxLayer.add(new Kinetic.Rect(pickGray3));
        colorBoxLayer.add(new Kinetic.Rect(pickGray4));
        colorBoxLayer.add(new Kinetic.Rect(pickGray5));
        colorBoxLayer.add(new Kinetic.Rect(pickGray6));
        colorBoxLayer.add(new Kinetic.Rect(pickGray7));

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