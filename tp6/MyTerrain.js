/**
 * MyTerrain
 * @constructor
 */
 class MyTerrain extends Plane
 {
     constructor(scene, nrDivs, altimetry){
         super(scene,nrDivs,0,5,0,5);
         this.nrDivs = nrDivs;
         this.altimetry = altimetry;
         this.initTerrain();
     }

     initTerrain(){
		for (var j = 0; j <= this.nrDivs; j++) {
			for (var i = 0; i < this.nrDivs; i++) 
			{
				this.vertices[j*(this.nrDivs+1) + (i*3) + 2] = this.altimetry[j][i];

			}
		}
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	}

	display(){
		super.display();
	}

 }