
var w = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var h = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

w = Math.min(w, 1000);
h = Math.min(h, 800);

window.onresize = function(e)
{
	w = window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth;
	
	h = window.innerHeight
	|| document.documentElement.clientHeight
	|| document.body.clientHeight;
	
	w = Math.min(w, 1000);
	h = Math.min(h, 800);
	
	makeCarousel();
	
}

var stepCount = 0;
var carouselOn = false;
var toNext = false;

function makeCarousel()
{
	placeImages();
	document.getElementById("carouselSection").style.height = w * 0.55 + "px";
	
	// alert(w + " / " + h);
	
}

function placeImages	() // Resize images and place them in circle (on the ellipsis).
{
	for (n=1; n<9; n++) // Move.
	{
		var imageId = "image" + n;
		var imageToMove = document.getElementById(imageId);
		
		alpha = n * Math.PI/4 + (2 * Math.PI / 720) * stepCount;
		imageToMove.width = 0.09 * w * (2 + Math.sin(alpha)/2); // Max image width is 2.5*90px.
		moveImage(imageId, alpha);
	}
	
}

function moveImage(imageId, alpha) // Image with absolute coordinates, alpha in radians.
{
	var theImage = document.getElementById(imageId);
	
	var x = w/2 - theImage.width/2;
	var y = 0.77 * w * 0.55 - theImage.height/2;
	theImage.style.left = (x + 0.6 * w/2 * Math.cos(alpha)) + "px"; 
	theImage.style.top = ((y + 0.6 * w/2 * Math.sin(alpha))/2) + "px";		
	
	var z = 20 + 10 * Math.sin(alpha);
	var zz = "" + Math.ceil(z);
	theImage.style.zIndex = zz;
	
}

function rotateImages() // Rotate with 0.5 degrees. Full rotation in 720 steps.
{
		if(stepCount <= 720)
		{
			stepCount = stepCount + 1;
		}
		else 
		{
			stepCount = 1;
		}

		placeImages();	// Move.
		carouselOn = requestAnimationFrame(rotateImages); // Ensure recursive execution.
			
}

function rotateToNext(clockwise) // Rotate 0.5 degrees. The images are 90 steps or 45 degrees apart.
{
		// A full rotation is executed in 720 steps.
		if(stepCount <= 720)
		{
			(clockwise == 'yes')?(stepCount = stepCount + 1):(stepCount = stepCount - 1);
		}
		else 
		{
			(clockwise == 'yes')?(stepCount = 1):(stepCount = -1);
		}
		
		// 8 pictures. 720 steps / 8 = 90 steps to the next picture.
		if (stepCount % 90 != 0)
		{
			placeImages(); // Move.
			toNext = requestAnimationFrame(function(){rotateToNext(clockwise);}) // Make recursive.
		}	
		else 
		{
			cancelAnimationFrame(toNext);	
			toNext = false;			
		}		
		
}

function rotationToggle()
{
	if(carouselOn == false)
	{
		carouselOn = requestAnimationFrame(rotateImages);
	}
	else 
	{
		cancelAnimationFrame(carouselOn);
		carouselOn = false;
	}
}


