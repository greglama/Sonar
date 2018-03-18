const httpGet = theUrl =>{

	const xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false);
	xmlHttp.send( null );
	return xmlHttp.responseText;
}

const r = 5;
let tabpoint = [{x:0, y:0}];

//object factory
const Point = (X,Y) =>{
	return {x:X, y:Y};
}

const ratio = 2;

function setup() {
  createCanvas(windowWidth - 50, windowHeight -50);

  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;

  background(0);
  noSmooth();
}

function draw() {

	background(0);
	translate ((windowWidth - 50)/2, (windowHeight - 50));

	tabpoint = JSON.parse(httpGet("http://localhost:3000/api/data"));

	stroke(0,255,0);
	
	for ( let iter = 0; iter < tabpoint.length - 1; iter ++){ // length is 180 degre
		
		const x1 = ratio * tabpoint[iter].x;
		const x2 = ratio * tabpoint[iter + 1].x;
		const y1 = -ratio * tabpoint[iter].y;
		const y2 = -ratio * tabpoint[iter + 1].y;

		line(x1, y1, x2, y2);
	}
}