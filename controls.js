/// <reference path="D:\New courses\9 JavaScript UI and DOM\TeamworkPaintDotBg\TeamworkPaintDotBg\libs/kinetic-v5.1.0.js" />

var toolBoxDrawer = (function(){
    function drawText(stage, layer, x, y, text) {
        var text = new Kinetic.Text({
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
    
    function createBoxOutLine(x, y) {
        return new Kinetic.Rect({
            x: x,
            y: y,
            width: 50,
            height: 50,
            fill: 'buttonface',
            stroke: 'gray',
            strokeWidth: 2
        });
    }
    
    var createToolBox = (function(){
        
        function createToolBox(stage, layer, x, y, shape, id, optionalfill, optionalStroke) {
            var outline;
            if (shape === defaultLine) {
                shape = defaultLine(x, y);
            }
            
            if (shape === defaultCircle) {
                shape = defaultCircle(x, y);
            }
            
            if (shape === defaultRectangle) {
                shape = defaultRectangle(x, y);
            }
            
            if (shape === defaultTriangle) {
                shape = defaultTriangle(x, y);
            }
            
            if (optionalfill) {
                shape.attrs.fill = optionalfill;
            }
            
            if (optionalStroke) {
                shape.attrs.stroke = optionalStroke;
            }
            
            outline = createBoxOutLine(x, y);
            
            outline.shapeId = id;
            shape.shapeId = id;
            
            layer.add(outline);
            layer.add(shape);
            stage.add(layer);
            
            return this;
        }
        
        return createToolBox;
    }());
    
    function defaultLine(x, y) {
        return new Kinetic.Line({
            points: [x + 10, y + 25, x + 40, y + 25],
            stroke: 'gray',
            strokeWidth:  2
        });
    }
    
    function defaultCircle(x, y) {
        return new Kinetic.Circle({
            x: x + 25,
            y: y + 25,
            radius: 16,
            stroke: 'gray',
            strokeWidth: 2
        });
    }
    
    function defaultRectangle(x, y) {
        return new Kinetic.Rect({
            x: x + 10,
            y: y + 10,
            width: 30,
            height: 30,
            fill: 'buttonface',
            stroke: 'gray',
            strokeWidth: 2
        });
    }
    
    function defaultTriangle(x, y) {
        return new Kinetic.Line({
            points: [x + 10, y + 40, x + 40, y + 40, x + 25, y + 10 ],
            stroke: 'gray',
            strokeWidth: 2,
            closed: true
        });
    }
    
    return {
        createBox: createToolBox,
        drawText: drawText,
        LINE: defaultLine,
        CIRCLE: defaultCircle,
        RECT: defaultRectangle,
        TRIANGLE: defaultTriangle
    }
}());