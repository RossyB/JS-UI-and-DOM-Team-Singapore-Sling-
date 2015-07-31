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
    selectedStrokeColorBoxColor = e.target.fill();

    console.log(e.target);

    if (fillJustClicked) {
        selectedfillColor = selectedStrokeColorBoxColor;
        fillBox.setFill(selectedStrokeColorBoxColor);
        fillBox.setStroke(selectedStrokeColorBoxColor);
    }

    if (strokeJustClicked) {
        selectedStrokeColor = selectedStrokeColorBoxColor;
        strokeBox.setStroke(selectedStrokeColorBoxColor);
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
          currentlyDrawnShape = new CircleControl(drawnShapeBeginX, drawnShapeBeginY, 0, fillColor || 'transparent', selectedStrokeColor || 'black', selectedWidth || 1);
          drawingCircle = true;
          break;

      case 'rect':
          currentlyDrawnShape = new FilledRectangleControl(drawnShapeBeginX, drawnShapeBeginY, 0, 0, fillColor || 'transparent', selectedStrokeColor || 'black', selectedWidth || 1);
          drawingRect = true;
          break;

      case 'line':
          currentlyDrawnShape = new LineControl(drawnShapeBeginX, drawnShapeBeginY, [0, 0], 'black', selectedWidth);
          break;

      case 'triangle':
          currentlyDrawnShape = new LineControl(drawnShapeBeginX, drawnShapeBeginY, [0, 0], 'black', selectedWidth);
          drawingTriangle = true;
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

     if (selectedTool.shapeId == 'rect' && drawingRect) {
          currentlyDrawnShape = new Kinetic.Rect(new FilledRectangleControl(drawnShapeBeginX, drawnShapeBeginY, currentX, currentY, fillColor || 'transparent', selectedStrokeColor || 'black', selectedWidth || 1));
          var clear = new Kinetic.Rect(new FilledRectangleControl(drawnShapeBeginX, drawnShapeBeginY, currentX, currentY, 'white', 'white', selectedWidth || 1));
          drawLayer.add(clear);
      }

      if (selectedTool.shapeId == 'circle' && drawingCircle) {
        console.log("HERE");
          var radius = Math.sqrt(Math.abs(currentX - drawnShapeBeginX) * 2
              + Math.abs(currentY - drawnShapeBeginY) * 2);
          currentlyDrawnShape = new Kinetic.Circle(new CircleControl(drawnShapeBeginX, drawnShapeBeginY, radius, fillColor || 'transparent', selectedStrokeColor || 'black', selectedWidth || 1));
          var clear = new Kinetic.Circle(new CircleControl(drawnShapeBeginX, drawnShapeBeginY, radius, 'white', 'white', selectedWidth || 1));;
          drawLayer.add(clear);
      }

      if (selectedTool.shapeId == 'triangle' && drawingTriangle) {
          currentlyDrawnShape = new Kinetic.Line({
              points: [drawnShapeBeginX, drawnShapeBeginY,
                       currentX, currentY,
                       2 * drawnShapeBeginX - currentX, currentY],
              stroke: selectedStrokeColor,
              fill: fillColor,
              closed: true,
              strokeWidth: selectedWidth || 1
          });
          var startX = drawnShapeBeginX - (currentX - drawnShapeBeginX);
          var clear = new Kinetic.Rect(new FilledRectangleControl(startX, drawnShapeBeginY, currentX, currentY, 'white', 'white', selectedWidth || 1));
          drawLayer.add(clear);
      }

     drawLayer.add(currentlyDrawnShape);
});
//here niki is         stupid
//its late now and he is ^
stage.on('mouseup', function () {
    var mousePos = stage.getPointerPosition(),
        currentX = mousePos.x,
        currentY = mousePos.y;

    switch (selectedTool.shapeId) {

      case 'circle':
          currentlyDrawnShape.radius = Math.sqrt(Math.pow((currentlyDrawnShape.x - currentX), 2) + Math.pow((currentlyDrawnShape.y - currentY), 2));
          currentlyDrawnShape = new Kinetic.Circle(currentlyDrawnShape);
          drawingCircle = false;
          break;
      case 'rect':
          currentlyDrawnShape.width = currentX - currentlyDrawnShape.x;
          currentlyDrawnShape.height = currentY - currentlyDrawnShape.y;
          currentlyDrawnShape = new Kinetic.Rect(currentlyDrawnShape);
          drawingRect = false;
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
              fill: fillColor,
              closed: true,
              strokeWidth: selectedWidth || 1
          });
          drawingTriangle = false;
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
