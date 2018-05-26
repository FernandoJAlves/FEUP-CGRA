/**
 * MyTerrain
 * @constructor
 */
 class MyTerrain extends Plane
 {
     constructor(scene, divs, altimetry){
         super(scene,divs,0,5,0,5);
         this.nrDivs = divs;
         this.altimetry = altimetry;
         this.initTerrain();
     }

     initTerrain(){
		let count = 2;
		for (var j = 0; j < this.altimetry.length; j++) {
			for (var i = 0; i < this.altimetry[j].length; i++) 
			{
				this.vertices[count] = this.altimetry[j][i]*this.patchLength;
				count += 3
			}	
		}
		this.initGLBuffers();
	}

	display(){
		super.display();
	}


	checkBorders(x,y){
		let limit = this.nrDivs + 1;
		let dist = this.patchLength*50;

		x+= 25;
		y+= 25;

		x /= dist;
		y /= dist;

		x = Math.floor(x);
		y = Math.floor(y);

		if(x <= 0 || y <= 0 || x >= limit || y >= limit){
			return false;
		}

		if(this.altimetry[y][x] != 0){
			return false;
		}
		return true;
	}

 }