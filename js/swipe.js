	
	var startX = 0;
	var dx = 0;
	var dxOld = 0;
	var direction = "";
	var directionOld = "";
	
	// Using var stepCount and var toNext defined in carousel.js .
	// Also, using functions placeImages(), moveImage() and rotateToNext() 
	// defined in the same file, carousel.js .
	
	function touchStart(event)
	{
		// event.preventDefault();
		startX = event.targetTouches[0].pageX;
	}
	
	function touchMove(event)
	{
		// event.preventDefault();
		
		// Determine dx of finger move:
		dx = event.targetTouches[0].pageX - startX;
		
		// Determine the swipe direction:
		(dx <= dxOld) ? direction = "yes" : direction = "no";
		// yes = clockwise.
		
		// Slide or reset startX and wait for the next dx.
		if (direction != directionOld)
		{
			// Reset startX and wait for the next dx:
			startX = event.targetTouches[0].pageX;
		}
		else 
		{			
			// Rotate (as long as finger is on screen and swiping):
    		// Rotate with 0.5 degrees. Full rotation in 720 steps.
			if(stepCount <= 720)
			{
				(direction == 'yes')?(stepCount = stepCount + 1):(stepCount = stepCount - 1);
			}
			else 
			{
				(direction == 'yes')?(stepCount = 1):(stepCount = -1);
			}
	
			placeImages();	// Move (as finger moves on screen).
    					
		}
		
		// Remember the swipe data:
		dxOld = dx;
		directionOld = direction;
		
	}
	
	function touchEnd(event)
	{
		// event.preventDefault();
		
		// Step (finish rotation step after finger is lifted up from screen):
		// 8 pictures. 720 steps / 8 = 90 steps to the next picture.
		if (stepCount % 90 != 0)
		{
			if(direction == 'yes')
			{
				cancelAnimationFrame(carouselOn); carouselOn = false; cancelAnimationFrame(toNext); 
				toNext = requestAnimationFrame(function(){rotateToNext('yes');}) // Step clockwise recursively.
			}
			else 
			{
				cancelAnimationFrame(carouselOn); carouselOn = false; cancelAnimationFrame(toNext); 
				toNext = requestAnimationFrame(function(){rotateToNext('no');}) // Step back recursively.
			}
		}	
		else 
		{
			cancelAnimationFrame(toNext); // Stop recursive steps.
			toNext = false;			
		}		
	
		// Reset variables.
		startX = 0;
		dx = 0;
		dxOld = 0;
		direction = "";
		directionOld = "";
		
	}
	
	function touchCancel(event)
	{
		// event.preventDefault();
		
		// Reset variables.
		startX = 0;
		dx = 0;
		dxOld = 0;
		direction = "";
		directionOld = "";
		
	}
	
	
    	    	
