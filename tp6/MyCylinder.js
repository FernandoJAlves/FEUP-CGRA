/**
 * MyCylinder
 * @constructor
 */

var ang2rad = Math.PI/180;

class MyCylinder extends CGFobject
{
	constructor(scene, slices, stacks) 
	{
		super(scene);
		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	}

	initBuffers() 
	{
		var ang = ang2rad * (360.0/this.slices); 

		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		//pontos e normais das faces laterais
		for(var i = 0; i <= this.stacks; i++){
		
			for(var j = 0; j < this.slices; j++){
				this.vertices.push(Math.cos(j*ang),Math.sin(j*ang),i*(1.0/this.stacks));
    			this.normals.push(Math.cos(j*ang),Math.sin(j*ang),0);
			}
			
		}

		//indices
		for(var i = 0; i < this.stacks; i++){

			for(var j = 0; j < this.slices; j++){

				this.indices.push(this.slices*i+j,this.slices*i+j+1,this.slices*(i+1)+j);

				if (j != (this.slices - 1)) {
					this.indices.push(this.slices*(i+1)+j+1,this.slices*(i+1)+j,this.slices*i+j+1);
				}
				else {
					this.indices.push(this.slices*i,this.slices*i+j+1,this.slices*i+j);
				}

			}
			
		}

 		// Tex Coords
		var tex_s = 0;
		var tex_t = 0;
		var inc_s = 1.0/this.slices;
		var inc_t = 1.0/this.stacks;

		for(var i = 0; i <= this.stacks; i++){
			for(var j = 0; j < this.slices; j++){
				this.texCoords.push(tex_s, tex_t);
				tex_s += inc_s;
			}
			tex_t += inc_t;
			tex_s = 0;	
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
