toolBoxLayer.on('click', function (e) {
    
    console.log(e.target.shapeType);
    
    if (e.target.shapeType == 'tool') {
        selectTool(e.target);
    } else if (e.target.shapeType == 'fill') {
        fillJustClicked = true;
        strokeJustClicked = false;
    } else if (e.target.shapeType == 'stroke') {
        fillJustClicked = false;
        strokeJustClicked = true;
    } else if (e.target.shapeType == 'lineWidth') {
        switch (e.target.shapeId) {
            case 'small':
                selectedWidth = 2;
                break;
            case 'medium':
                selectedWidth = 4;
                break;
            case 'large':
                selectedWidth = 6;
                break;
            case 'huge':
                selectedWidth = 8;
                break;
        }
    }
});

colorBoxLayer.on('click', function (e) {
    selectedColorBoxColor = e.target.fill();
    
    console.log(e.target);
    
    if (fillJustClicked) {
        selectedfillColor = selectedColorBoxColor;
        fillBox.setFill(selectedColorBoxColor);
        fillBox.setStroke(selectedColorBoxColor);
    }
    
    if (strokeJustClicked) {
        selectedStrokeColor = selectedColorBoxColor;
        strokeBox.setStroke(selectedColorBoxColor);
    }
    
    toolBoxLayer.add(fillBox);
    toolBoxLayer.add(strokeBox);
});

stage.on('mousedown', function () {
    var mousePos = stage.getPointerPosition();
    drawnShapeBeginX = mousePos.x;
    drawnShapeBeginY = mousePos.y;
    
    switch (selectedTool.shapeId) {
        case 'circle':
            currentlyDrawnShape = new CircleControl(drawnShapeBeginX, drawnShapeBeginY, 0, selectedfillColor || 'transparent', selectedStrokeColor || 'black', selectedWidth || 1);
            break;

        case 'rect':
            currentlyDrawnShape = new FilledRectangleControl(drawnShapeBeginX, drawnShapeBeginY, 0, 0, selectedfillColor || 'transparent', selectedStrokeColor || 'black', selectedWidth || 1);
            break;

        case 'line':
            currentlyDrawnShape = new LineControl(drawnShapeBeginX, drawnShapeBeginY, [0, 0], selectedStrokeColor, selectedWidth);
            break;

        case 'triangle':
            currentlyDrawnShape = new LineControl(drawnShapeBeginX, drawnShapeBeginY, [0, 0], selectedStrokeColor, selectedWidth);
            //TODO IMPLEMENT
            break;
        //TODO UNBUG
        case 'eraserSmall':
            erasing = true;
            break;
        case 'eraserBig':
            erasing = true;
            break;
        case 'eraserBiggest':
            erasing = true;
            break;
        case 'pen':
            currentlyDrawnShape = new Kinetic.Line({
                points: [drawnShapeBeginX, drawnShapeBeginY],
                stroke: selectedStrokeColor,
                strokeWidth: selectedWidth || 1
            });
            
            drawingWithPen = true;
            break;
    }
    
});

stage.on('mousemove', function(){
     if (!selectedTool) {
         return;
     }
     
     var mousePos = stage.getPointerPosition(),
         currentX = mousePos.x,
         currentY = mousePos.y;
         
     if (selectedTool.shapeId == 'pen' && drawingWithPen) {
         currentlyDrawnShape.attrs.points.push(currentX, currentY);
     }
     //TODO CONSTANTS && OPTIMISATIONS!!
     if (selectedTool.shapeId == 'eraserSmall' && erasing) {
          currentlyDrawnShape = new Kinetic.Circle(new CircleControl(currentX, currentY, 2, 'white', 'white', 1));
     }
     
     if (selectedTool.shapeId == 'eraserBig' && erasing) {
          currentlyDrawnShape = new Kinetic.Circle(new CircleControl(currentX, currentY, 5, 'white', 'white', 1));
     }
     
     if (selectedTool.shapeId == 'eraserBiggest' && erasing) {
          currentlyDrawnShape = new Kinetic.Circle(new CircleControl(currentX, currentY, 14, 'white', 'white', 1));
     }
     
     drawLayer.add(currentlyDrawnShape);
});

stage.on('mouseup', function () {
    var mousePos = stage.getPointerPosition(),
        currentX = mousePos.x,
        currentY = mousePos.y;

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
                stroke: selectedStrokeColor,
                strokeWidth: selectedWidth || 1
            });
            break;
        case 'triangle':
            currentlyDrawnShape = new Kinetic.Line({
                points: [drawnShapeBeginX, drawnShapeBeginY, 
                         currentX, currentY,
                         2 * drawnShapeBeginX - currentX, currentY],
                stroke: selectedStrokeColor,
                fill: selectedfillColor,
                closed: true,
                strokeWidth: selectedWidth || 1
            });
            break;
         case 'eraserSmall':
            erasing = false;
            break;
         case 'eraserBig':
            erasing = false;
            break;
         case 'eraserBiggest':
            erasing = false;
            break;
         case 'pen':
            drawingWithPen = false;
            break;
    }
    
    drawLayer.add(currentlyDrawnShape);
});