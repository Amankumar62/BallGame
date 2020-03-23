var canvas = document.getElementById("game");

var c  = canvas.getContext('2d');


const 	GAME_WIDTH = 800;
const   GAME_HEIGHT = 600;
var score = 0;
var life = 3;


//  Classes
class Game {
	constructor(gamewidth,gameheight){
		this.gamewidth = gamewidth;
		this.gameheight = gameheight;
	}
	start(){
		this.stick =  new Stick(this);
		this.blackball = new Blackball(this);
		this.greenball = new Greenball(this);
		this.redball = new Redball(this);
		this.blueball = new Blueball(this)

		var blackballs = [];
	


		this.gameObject = [
			this.blackball ,
			this.greenball,
			this.redball,
			this.blueball,
			this.stick,
			
		];1
		new InputHandler(this.stick);
		
	}
	draw(c){
	
		this.gameObject.forEach(object => object.draw(c));	
		c.font = "20px Arial";
		c.fillStyle ="black";
		c.fillText("Score:"+window.score,650,25);
		c.fillText("Live:"+window.life,50,25)

	}
	update(change){
	
		this.gameObject.forEach(object => object.update(change));	
		
	
	}
}


class Blackball{
	constructor(game){
	window.y1 = Math.floor(Math.random()*500);
	window.x1 = 800; 
	this.image1 = document.getElementById('blackball')
	 //add code here
	this.draw(c);
	}

	draw(c){

	 //add code here
	c.drawImage(this.image1,window.x1,window.y1,13,13);
	}

	update(change){
		// add code here
	window.x1 -= 6;
	if(window.x1 <0){
		window.x1 = 800;
		window.y1 = Math.floor(Math.random() * 500);
	}
		}

	}


// Greeen ball


class Greenball{
	constructor(game){
	  //add code here
	  window.x2 =800;
	  window.y2 = Math.floor(Math.random()*500);
	  this.image2 = document.getElementById("greenball");
	  this.draw(c);
	}

	draw(c){

	// add code here
	c.drawImage(this.image2,window.x2,window.y2,13,13);
		
	}

	update(change){
	   //add code here	
	   window.x2 -= 4;
	if(window.x2 <0){
		window.x2 = 800;
		window.y2 = Math.floor(Math.random()*500);
	}	

	}
}



class Redball{
	constructor(game){
	   //add code here
	   window.x3 = 800;
	   window.y3 = Math.floor(Math.random()*500);
	   this.image3 = document.getElementById("redball");
	  this.draw(c);
	}

	draw(c){

		//add code here
		c.drawImage(this.image3,window.x3,window.y3,13,13)
		
	}

	update(){
        //add code here		
		window.x3 -= 7;
		if(window.x3<0 ){
			window.x3 = 800;
			window.y3 = Math.floor(Math.random()*500);
		}
	
		
		
	}
}
// blue ball

class Blueball{
	constructor(game){
		//add code here
		window.x4 = 800;
		window.y4 = Math.floor(Math.random()*500);
		this.image4 = document.getElementById("blueball");
	  this.draw(c); 
	}

	draw(c){

		//add code here
		c.drawImage(this.image4,window.x4,window.y4,13,13)
	}

	update(){
		
	 //add code here
	 window.x4 -= 5;
	 if(window.x4 <0){
		 window.x4 = 800;
		 window.y4 = Math.floor(Math.random()*500);
	 } 

	}
}


class Stick{
    constructor(game){
	 // add code here
	 
	 window.y = 2;
	this.draw(c)
	
	}
	
	moveUp(){
		//add code here
		if(! (window.y <= 2)){
		window.y -=15;
		console.log("up");
		}
	}
	moveDown(){
		// add code here
		if(!(window.y >=400 ))
		console.log("down");
		window.y +=15;
	}

    draw(c){

	c.fillStyle = '#ffff00';
	c.fillRect(2,window.y,13,70);
	

	}
	update(change) {
	
	  // add code here
	  if(window.x1 <=15 &&window.x1>=10 &&window.y1 > window.y && window.y1<(window.y+70)){
		  window.score +=5;
	  }
	  if(window.x2 <=15 &&window.x2>=10 &&window.y2 > window.y && window.y2<(window.y+70)){
		window.score +=5;
	}
	if(window.x4 <=15 &&window.x4>=10 &&window.y4 > window.y && window.y4<(window.y+70)){
		window.score +=5;
	}
	  if(window.x3 <15 && window.x3 >2 && window.x3 >2 &&window.y3 > window.y && window.y3<(window.y+70)) {
		  window.life -= 1;
		  if(window.life == 0){
			  window.life=3;
			  window.score =0;
			  alert("YOU LOSE!");
		  }
	  }
	}
}
	 


class InputHandler{
	constructor(stick){
	document.addEventListener('keydown', (event) =>{
	
		switch(event.keyCode){
			case 38:
				stick.moveUp();
				break;
			case 40:
				stick.moveDown();
				break;
		}
	});
	}
}

// Classes end

//  Raw code

var previous =0;


var game = new Game(GAME_WIDTH,GAME_HEIGHT);
game.start();

function gameLoop(position){
	var change = position - previous;
	previous = position;
	c.clearRect(0,0,innerWidth,innerHeight);
	
	game.draw(c);
	game.update(change);

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


