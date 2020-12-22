function helper(o, x, y, z, w, h, d, c){
				var material = new THREE.MeshLambertMaterial( {color: c} );
				var geometry = new THREE.CubeGeometry(w, h, d, 1, 1, 1);
				var mesh = new THREE.Mesh( geometry, material );
				mesh.position.x=x+(w/2);
				mesh.position.y=y-(h/2);
				mesh.position.z=z+(d/2);
				o.add( mesh );
			}
		

function buildStar(star, state) {
	switch(state){
		case 0:
			helper( star, 0, 0, 0, 1, 1, 1, 0x888888);
			break;
		case 1:
			helper( star, 1, 0, 0, 1, 1, 1, 0x888888);
			helper( star,-1, 0, 0, 1, 1, 1, 0x888888);
			helper( star, 0, 1, 0, 1, 1, 1, 0x888888);
			helper( star, 0,-1, 0, 1, 1, 1, 0x888888);
			break;
		case 2:
			helper( star, 1, 0, 0, 2, 1, 1, 0x888888);
			helper( star,-2, 0, 0, 2, 1, 1, 0x888888);
			helper( star, 0, 2, 0, 1, 2, 1, 0x888888);
			helper( star, 0,-1, 0, 1, 2, 1, 0x888888);
			break;
		case 3:
			helper( star, 0, 0, 0, 1, 1, 1, 0x888888);
			helper( star, 2, 0, 0, 2, 1, 1, 0x888888);
			helper( star,-3, 0, 0, 2, 1, 1, 0x888888);
			helper( star, 0, 3, 0, 1, 2, 1, 0x888888);
			helper( star, 0,-2, 0, 1, 2, 1, 0x888888);
			break;
		case 4:
			helper( star, 0, 3, 0, 1, 1, 1, 0x888888);
			helper( star, 2, 2, 0, 1, 1, 1, 0x888888);
			helper( star, 3, 0, 0, 1, 1, 1, 0x888888);
			helper( star, 2,-2, 0, 1, 1, 1, 0x888888);
			helper( star, 0,-3, 0, 1, 1, 1, 0x888888);
			helper( star,-2,-2, 0, 1, 1, 1, 0x888888);
			helper( star,-3, 0, 0, 1, 1, 1, 0x888888);
			helper( star,-2, 2, 0, 1, 1, 1, 0x888888);
			break;
		case 5:
			helper( star, 2, 0, 0, 1, 1, 1, 0x888888);
			helper( star,-2, 0, 0, 1, 1, 1, 0x888888);
			helper( star, 0, 2, 0, 1, 1, 1, 0x888888);
			helper( star, 0,-2, 0, 1, 1, 1, 0x888888);
			break;
	}
}
function bodytheme(edgecolor, edge2color, bodycolor) {

		//	object	   x    y    z    w    h    d	  color
		//black edge
		helper(	body,   0,  -2,  -5,  21,  14,   16, edgecolor);
		helper(	body,   1,  -1,  -5,  19,  16,   16, edgecolor);
		helper(	body,   2,   0,  -5,  17,  18,   16, edgecolor);
		//white
		helper(	body,   1,  -2,-5.5,  19,  14,   17, edge2color);
		helper(	body,   2,  -1,-5.5,  17,  16,   17, edge2color);
		//pink cream
		helper(	body,   2,  -4,   -2,  17,  10,  13.6, bodycolor);
		helper(	body,   3,  -3,   -2,  15,  12,  13.6, bodycolor);
		helper(	body,   4,  -2,   -2,  13,  14,  13.6, bodycolor);
		//red dots

}
function feettheme(edgecolor, bodycolor){
		helper(	feet,   2,  -3, -1.49,  3,  3,   2, edgecolor);
		helper(	feet,   3,  -2, -1.49,  3,  3,   2, edgecolor);
		helper(	feet,   3,  -3,-1.01,  2,  2,   3, bodycolor);
		helper(	feet,   4,  -2,-1.01,  2,  2,   3, bodycolor);
		
		helper(	feet,   4,  -3, 5.49,  3,  3,   2, edgecolor);
		helper(	feet,   5,  -2, 5.49,  3,  3,   2, edgecolor);
		helper(	feet,   5,  -3, 4.99,  2,  2,   3, bodycolor);
		helper(	feet,   6,  -2, 4.99,  2,  2,   3, bodycolor);
		
		helper(	feet,   16, -4, 5.49,  3,  2,   2, edgecolor);
		helper(	feet,   15, -3, 5.49,  3,  2,   2, edgecolor);
		helper(	feet,   15, -3, 4.99,  2,  1,   3, bodycolor);
		helper(	feet,   16, -4, 4.99,  2,  1,   3, bodycolor);
		
		helper(	feet,   19, -4, -1.49,  3,  2,   2, edgecolor);
		helper(	feet,   18, -3, -1.49,  3,  2,   2, edgecolor);
		helper(	feet,   18, -3,-1.01,  2,  1,   3, bodycolor);
		helper(	feet,   19, -4,-1.01,  2,  1,   3, bodycolor);
}
function facetheme(edgecolor, bodycolor) {
		helper(	   face,  10,  -5,   -9,   3.3,   5,   16, edgecolor);
		helper(	   face,  10,  -1,   -8,   3.3,  10,   4, edgecolor);
		helper(	   face,  10,  -1,    2,   3.3,  10,   4, edgecolor);
		helper(	   face,  10, -11,   -6,   3.3,   2,  10, edgecolor);
		helper(	   face,  10,   0,   -7,   3.3,   2,   2, edgecolor);
		helper(	   face,  10,  -2,   -5,   3.3,   2,   2, edgecolor);
		helper(	   face,  10,   0,    3,   3.3,   2,   2, edgecolor);
		helper(	   face,  10,  -2,    0,   3.3,   2,   2, edgecolor);
		
		helper(	   face,  10.5, -5,    -8,   4,   5,  14, bodycolor);
		helper(	   face,  10.5, -4,    -6,   4,   8,  10, bodycolor);
		helper(	   face,  10.5, -1,    -7,   4,  10,   2, bodycolor);
		helper(	   face,  10.5, -1,     3,   4,  10,   2, bodycolor);
		helper(	   face,  10.5, -2,    -5,   4,   2,   1, bodycolor);
		helper(	   face,  10.5, -3,    -4,   4,   1,   1, bodycolor);
		helper(	   face,  10.5, -2,     2,   4,   2,   1, bodycolor);
		helper(	   face,  10.5, -3,     1,   4,   1,   1, bodycolor);
		//Eyes
		helper(	   face,  10.6,  -6,   -5,   4.5,   2,   2, edgecolor);
		helper(	   face,  10.6,  -6,    1,   4.5,   2,   2, edgecolor);
		helper(	   face, 10.6,-5.99,-5.01,4.51,1.01,1.01, 0xffffff);
		helper(	  face, 10.6, -5.99,  0.99,4.51,1.01,1.01, 0xffffff);
		//MOUTH
		helper(	   face,  10.6, -10,   -5,   4.5,   1,   8, edgecolor);
		helper(	   face,  10.6,  -9,   -5,   4.5,   2,   1, edgecolor);
		helper(	   face,  10.6,  -9,   -1,   4.5,   2,   1, edgecolor);
		helper(	   face,  10.6,  -9,    2,   4.5,   2,   1, edgecolor);
		//CHEEKS
		helper(	   face,  10.6,  -8,   -7,  4.5,  2,   2, 0xff9999);
		helper(	   face,  10.6,  -8,    3,  4.5,  2,   2, 0xff9999);
}

function tailtheme(edgecolor, bodycolor) {
		helper(	tail,   0,  0,1.75,  4,  3, 2.5, edgecolor);
		helper(	tail,   1, -1,1.75,  4,  3, 2.5, edgecolor);
		helper(	tail,   2, -2,1.75,  4,  3, 2.5, edgecolor);
		helper(	tail,   3, -3,1.75,  4,  3, 2.5, edgecolor);
		helper(	tail,   1, -1, 1.5,  2,  1,   3, bodycolor);
		helper(	tail,   2, -2, 1.5,  2,  1,   3, bodycolor);
		helper(	tail,   3, -3, 1.5,  2,  1,   3, bodycolor);
		helper(	tail,   4, -4, 1.5,  2,  1,   3, bodycolor);
}
function rainbowtheme(red, org, yel, gre, blu, pur) {
			for(var c=0;c<numRainChunks-1;c++){
			var yOffset=8;
			if(c%2==1) yOffset=7;
			var xOffset=(-c*8)-16.5;
			helper( rainbow,xOffset,yOffset,    0, 8, 3, 1, red);
			helper( rainbow,xOffset,yOffset-3,  0, 8, 3, 1, org);
			helper( rainbow,xOffset,yOffset-6,  0, 8, 3, 1, yel);
			helper( rainbow,xOffset,yOffset-9,  0, 8, 3, 1, gre);
			helper( rainbow,xOffset,yOffset-12, 0, 8, 3, 1, blu);
			helper( rainbow,xOffset,yOffset-15, 0, 8, 3, 1, pur);
		}
}
function rainchunktheme(red, org, yel, gre, blu, pur) {
			helper( rainChunk, -16.5,  7,  0, 8,  3,   1, red);
			helper( rainChunk, -16.5,  4,  0, 8,  3,   1, org);
			helper( rainChunk, -16.5,  1,  0, 8,  3,   1, yel);
			helper( rainChunk, -16.5, -2,  0, 8,  3,   1, gre);
			helper( rainChunk, -16.5, -5,  0, 8,  3,   1, blu);
			helper( rainChunk, -16.5, -8,  0, 8,  3,   1, pur);
}
Nyan = function(x, y, z) {

		//umbtheme
		body=new THREE.Object3D();
		body.position.x=-10.5;
		body.position.y=9;
		bodytheme(0x222222, 0xffcc99, 0xff99ff);
		//FEET
		feet=new THREE.Object3D();
		feet.position.x=-12.5;
		feet.position.y=-6; 
		feettheme(0x222222, 0x666666);

		face=new THREE.Object3D();
		face.position.x=-.5;
		face.position.y=4;
		face.position.z=4;
		facetheme(0x222222, 0x666666);

		tail=new THREE.Object3D();
		tail.position.x=-16.5;
		tail.position.y=2;
		tailtheme(0x222222, 0x666666);

		rainbow=new THREE.Object3D();
		rainbowtheme(0xff0000, 0xff9900, 0xffff00, 0x33ff00, 0x0099ff, 0x6633ff);

		rainChunk=new THREE.Object3D();
		rainchunktheme(0xff0000, 0xff9900, 0xffff00, 0x33ff00, 0x0099ff, 0x6633ff);
		rainChunk.position.x-=(8*(numRainChunks-1));


		this.theme = null;

		umbtheme = new THREE.Object3D();
		umbtheme.position.x=-10.5;
		umbtheme.position.y=9;

		santa = new THREE.Object3D();
		santa.position.x=-10.5;
		santa.position.y=9;

		usa = new THREE.Object3D();
		usa.position.x=-10.5;
		usa.position.y=9;

		cs = new THREE.Object3D();
		cs.position.x=-10.5;
		cs.position.y=9;

		this.head = new THREE.Group();
		this.head.position.x = x;
		this.head.position.y = y;
		this.head.position.z = z;


};

Nyan.prototype.show = function(scene) {

		this.head.add( body );
		this.head.add( feet );
		this.head.add( face );
		this.head.add( tail );
		this.head.add( rainbow);
		this.head.add( rainChunk );

		scene.add(this.head);
}

Nyan.prototype.moving = function() {
	var delta = clock.getDelta();
	if(running) deltaSum+=delta;
	if(deltaSum>.07){
		deltaSum=deltaSum%.07;
		frame=(frame+1)%12;
		for(var c=0;c<numStars;c++){
			var tempX=stars[5][c].position.x,
				tempY=stars[5][c].position.y,
				tempZ=stars[5][c].position.z;
			for(var state=5;state>0;state--){
				var star=stars[state][c];
				var star2=stars[state-1][c];
				star.position.x=star2.position.x-8;
				star.position.y=star2.position.y;
				star.position.z=star2.position.z;
				
				if(star.position.x<-100){
					star.position.x+=200;
					star.position.y = Math.random() * 200 - 100;
					star.position.z = Math.random() * 200 - 100;
				}
			}
			stars[0][c].position.x=tempX;
			stars[0][c].position.y=tempY;
			stars[0][c].position.z=tempZ;
		}
		switch(frame){
			case 0://2nd frame
				face.position.x++;
				feet.position.x++;
				break;
			case 1:
				face.position.y--;
				feet.position.x++;
				feet.position.y--;
				body.position.y--;
				rainbow.position.x-=9;
				rainChunk.position.x+=(8*(numRainChunks-1))-1;
				break;
			case 2:
				feet.position.x--;
				break;
			case 3:
				face.position.x--;
				feet.position.x--;
				rainbow.position.x+=9;
				rainChunk.position.x-=(8*(numRainChunks-1))-1;
				break;
			case 4:
				face.position.y++;
				break;
			case 5:
				body.position.y++;
				feet.position.y++;
				rainbow.position.x-=9;
				rainChunk.position.x+=(8*(numRainChunks-1))-1;
				break;
			case 6://8th frame
				face.position.x++;
				feet.position.x++;
				break;
			case 7:
				body.position.y--;
				face.position.y--;
				feet.position.x++;
				feet.position.y--;
				rainbow.position.x+=9;
				rainChunk.position.x-=(8*(numRainChunks-1))-1;
				break;
			case 8:
				feet.position.x--;
				break;
			case 9:
				face.position.x--;
				feet.position.x--;
				rainbow.position.x-=9;
				rainChunk.position.x+=(8*(numRainChunks-1))-1;
				break;
			case 10:
				face.position.y++;
				break;
			case 11://1st frame
				body.position.y++;
				feet.position.y++;
				rainbow.position.x+=9;
				rainChunk.position.x-=(8*(numRainChunks-1))-1;
				break;
		}
	}
};
Nyan.prototype.Original = function() {
	this.theme = 'Original';
};

Nyan.prototype.UMB = function() {
	this.theme = 'UMB';
};

Nyan.prototype.Santa = function() {
	this.theme = 'Santa';
};

Nyan.prototype.USA = function() {
	this.theme = 'USA';
};

Nyan.prototype.CS460 = function() {
	this.theme = 'CS460';
};

Nyan.prototype.Invisible = function() {
	this.theme = 'Invisible';
};

Nyan.prototype.onAnimate = function() {
	if ( this.theme == 'UMB') {
		bodytheme(0x2630ff, 0x000582, 0x787eff);
		feettheme(0x2630ff, 0x000582);
		facetheme(0x2630ff, 0x000582);
		tailtheme(0x2630ff, 0x000582);
		rainbowtheme(0xff0000, 0xff9900, 0xffff00, 0x33ff00, 0x0099ff, 0x6633ff);
		rainchunktheme(0xff0000, 0xff9900, 0xffff00, 0x33ff00, 0x0099ff, 0x6633ff);


		helper(	umbtheme,   1,  10,1.75,  2,  8, 2.5, 0xffffff);
		helper(	umbtheme,   2,  4,1.75,  4,  2, 2.5, 0xffffff);
		helper(	umbtheme,   5,  10,1.75,  2,  8, 2.5, 0xffffff);
		helper(	umbtheme,   9,  10,1.75,  2,  8, 2.5, 0xffffff);
		helper(	umbtheme,   10,  10,1.75,  6,  2, 2.5, 0xffffff);
		helper(	umbtheme,   12,  10,1.75,  2,  8, 2.5, 0xffffff);
		helper(	umbtheme,   15,  10,1.75,  2,  8, 2.5, 0xffffff);
		helper(	umbtheme,   18,  10,1.75,  2,  8, 2.5, 0xffffff);
		helper(	umbtheme,   19,  10,1.75,  3,  1, 2.5, 0xffffff);
		helper(	umbtheme,   19,  6.5,1.75,  3,  1, 2.5, 0xffffff);
		helper(	umbtheme,   19,  3,1.75,  4,  1, 2.5, 0xffffff);
		helper(	umbtheme,   22,  9.5,1.75,  1,  4, 2.5, 0xffffff);
		helper(	umbtheme,   22,  6,1.75,  1,  4, 2.5, 0xffffff);
		this.head.add( body );
		this.head.add( feet );
		this.head.add( face );
		this.head.add( tail );
		this.head.add(umbtheme);
		this.head.remove(santa);
		this.head.remove(usa);
		this.head.remove(cs);
	}
	else if (this.theme == 'Original') {
		bodytheme(0x222222, 0xffcc99, 0xff99ff);
		facetheme(0x222222, 0x666666);
		feettheme(0x222222, 0x666666);
		tailtheme(0x222222, 0x666666);
		rainbowtheme(0xff0000, 0xff9900, 0xffff00, 0x33ff00, 0x0099ff, 0x6633ff);
		rainchunktheme(0xff0000, 0xff9900, 0xffff00, 0x33ff00, 0x0099ff, 0x6633ff);
		this.head.add( body );
		this.head.add( feet );
		this.head.add( face );
		this.head.add( tail );
		this.head.remove(umbtheme);
		this.head.remove(santa);
		this.head.remove(usa);
		this.head.remove(cs);

	}
	else if (this.theme == 'Santa') {
		
		bodytheme(0x008000, 0xe42217, 0x008000);
		facetheme(0x008000, 0xe42217);
		feettheme(0x008000, 0xe42217);
		tailtheme(0x008000, 0xe42217);
		rainbowtheme(0xff0000, 0xff9900, 0xffff00, 0x33ff00, 0x0099ff, 0x6633ff);
		rainchunktheme(0xff0000, 0xff9900, 0xffff00, 0x33ff00, 0x0099ff, 0x6633ff);

		helper(	santa,   21.25,  -5, -4,  3,  2,  14, 0xffffff);
		helper(	santa,   21.25,  -3, -3,  3,  2,  12, 0xe42217);
		helper(	santa,   20.75,  -1, -2,  3,  2,  10, 0xe42217);
		helper(	santa,   20,      1, -1,  3,  2,  8, 0xe42217);
		helper(	santa,   19,      3,  0,  3,  2,  6, 0xe42217);
		helper(	santa,   17,      3,  1,  3,  2,  4, 0xe42217);
		helper(	santa,   15,      3,  2,  3,  2,  2, 0xffffff);
		this.head.add( body );
		this.head.add( feet );
		this.head.add( face );
		this.head.add( tail );
		this.head.remove(umbtheme);
		this.head.add(santa);
		this.head.remove(usa);
		this.head.remove(cs);
	}
	else if (this.theme == 'USA') {

		rainbowtheme(0xff0000, 0xffffff, 0xff0000, 0xffffff, 0xff0000, 0xffffff);
		rainchunktheme(0xff0000, 0xffffff, 0xff0000, 0xffffff, 0xff0000, 0xffffff);
		bodytheme(0x222222, 0x000582, 0x000582);
		facetheme(0x222222, 0x666666);
		feettheme(0x222222, 0x666666);
		tailtheme(0x222222, 0x666666);

		helper(	usa,   4,  -4,   11,   1,   1,  .7, 0xffffff);
		helper(	usa,   9,  -3,   11,   1,   1,  .7, 0xffffff);
		helper(	usa,  12,  -3,   11,   1,   1,  .7, 0xffffff);
		helper(	usa,  16,  -5,   11,   1,   1,  .7, 0xffffff);
		helper(	usa,   8,  -7,   11,   1,   1,  .7, 0xffffff);
		helper(	usa,   5,  -9,   11,   1,   1,  .7, 0xffffff);
		helper(	usa,   9, -10,   11,   1,   1,  .7, 0xffffff);
		helper(	usa,   3, -11,   11,   1,   1,  .7, 0xffffff);
		helper(	usa,   7, -13,   11,   1,   1,  .7, 0xffffff);
		helper(	usa,   4, -14,   11,   1,   1,  .7, 0xffffff);
		helper(	usa,   13, -11,   11,   1,   1,  .7, 0xffffff);
		helper(	usa,   15, -14,   11,   1,   1,  .7, 0xffffff);
		this.head.add( body );
		this.head.add( feet );
		this.head.add( face );
		this.head.add( tail );
		this.head.remove(umbtheme);
		this.head.remove(santa);
		this.head.remove(cs);
		this.head.add(usa);
	}
	else if (this.theme == "CS460") {
		rainbowtheme(0xff0099, 0x000000, 0x00ffff, 0x000000, 0xcc00ff, 0x000000);
		rainchunktheme(0xff0099, 0x000000, 0x00ffff, 0x000000, 0xcc00ff, 0x000000);
		bodytheme(0x00ffff, 0x000000, 0xcc00ff);
		facetheme(0x000000, 0x00ffff);
		feettheme(0x00ffff, 0x000000);
		tailtheme(0x00ffff, 0x000000);
		//4
		helper(	cs,   -3,  14,1.75,  2,  6, 2, 0xffffff);
		helper(	cs,   -1,  8,1.75,  4,  2, 2, 0xffffff);
		helper(	cs,   2,  14,1.75,  2,  13, 2, 0xffffff);
		//6
		helper(	cs,   6,  12,1.75,  2,  9, 2, 0xffffff);
		helper(	cs,   8,  14,1.75,  4,  2, 2, 0xffffff);
		helper(	cs,   8,  8,1.75,  4,  2, 2, 0xffffff);
		helper(	cs,   8,  3,1.75,  4,  2, 2, 0xffffff);
		helper(	cs,   12,  6,1.75,  2,  3, 2, 0xffffff);
		helper(	cs,   12,  12,1.75,  2,  2, 2, 0xffffff);
		//0
		helper(	cs,   16,  12,1.75,  2,  9, 2, 0xffffff);
		helper(	cs,   18,  14,1.75,  4,  2, 2, 0xffffff);
		helper(	cs,   18,  3,1.75,  4,  2, 2, 0xffffff);
		helper(	cs,   22,  12,1.75,  2,  9, 2, 0xffffff);
		//c
		helper(	cs,   4,  -6,   11,   1,   6,  .7, 0xffffff);
		helper(	cs,   5,  -5,   11,   3,   1,  .7, 0xffffff);
		helper(	cs,   5,  -12,   11,   3,   1,  .7, 0xffffff);
		helper(	cs,   8,  -11,   11,   1,   1,  .7, 0xffffff);
		helper(	cs,   8,  -6,   11,   1,   1,  .7, 0xffffff);
		//s
		helper(	cs,   13,  -5,   11,   3,   1,  .7, 0xffffff);
		helper(	cs,   12,  -6,   11,   1,   2,  .7, 0xffffff);
		helper(	cs,   13,  -8,   11,   1,   1,  .7, 0xffffff);
		helper(	cs,   14,  -9,   11,   1,   1,  .7, 0xffffff);
		helper(	cs,   15,  -10,   11,   1,   2,  .7, 0xffffff);
		helper(	cs,   12,  -12,   11,   3,   1,  .7, 0xffffff);
		helper(	cs,   15,  -6,   11,   1,   1,  .7, 0xffffff);
		helper(	cs,   12,  -11,   11,   1,   1,  .7, 0xffffff);
		this.head.add( body );
		this.head.add( feet );
		this.head.add( face );
		this.head.add( tail );
		this.head.remove(umbtheme);
		this.head.remove(santa);
		this.head.add(cs);
		this.head.remove(usa);

	}
	else if (this.theme == 'Invisible') {
		this.head.remove( body );
		this.head.remove( feet );
		this.head.remove( face );
		this.head.remove( tail );
		this.head.remove(umbtheme);
		this.head.remove(santa);
		this.head.remove(usa);
		this.head.remove(cs);
	}
}