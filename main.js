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
    /*moved [stage].add on bottom,
    so everything is displayed correctly*/

    /*Not sure if i'm on the right path.
    This oop probably doesn't help much with the already given
    Kineticjs objects, but later lines and figures could be added perhaps.
    It is supposed to make drawing of the menu and drawing stuff on the stage
    easier.
    Maybe all classes shoud have drawTo method?*/
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
    }(Control))

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
      }

      return CircleControl;
    }(Control));


    var circle = new CircleControl(30, 30, 30, '#6600CC', 'red', 2);
    var image = new ImageControl(30, 30, 50, 50, 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQCZ2BIJ8t8iUUmbAYtcWzx36zl5b9O0YsmDMQV8pvWQvgNd7gwhQ', 'black', 4);
    var rec = new FilledRectangleControl(0, 0, 30, 110, 'rgb(5, 123, 231)', 'black', 4);

    console.log(image);

    colorBoxLayer.add(new Kinetic.Rect(rec));
    tollBoxLayer.add(new Kinetic.Circle(circle));
    image.drawTo(stage, drawLayer);

    //colorBoxLayer.add(color);
    colorBox.add(colorBoxLayer);
    stage.add(drawLayer);
    tollBox.add(tollBoxLayer);
}());
