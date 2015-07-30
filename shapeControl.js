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