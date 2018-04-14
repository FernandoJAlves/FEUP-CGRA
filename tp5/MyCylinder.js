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
		var tex = 1;

		//pontos e indices das faces laterais
		for(var i = 0; i < this.stacks; i++){

			for(var j = 0; j < this.slices - 1; j++){
				this.vertices.push(Math.cos(j*ang),Math.sin(j*ang),i*(1.0/this.stacks));
				//this.texCoords.push()
    			this.normals.push(Math.cos(j*ang),Math.sin(j*ang),0);

    			this.indices.push((this.slices*i) + j,(this.slices*i)+1+j,(this.slices*(i+1))+j);
    			this.indices.push((this.slices*i) + 1 +j,(this.slices*(i+1))+j+1,(this.slices*(i+1))+j);
			}

			this.vertices.push(Math.cos(j*ang),Math.sin(j*ang),i*(1.0/this.stacks));
    		this.normals.push(Math.cos(j*ang),Math.sin(j*ang),0);
			this.indices.push((this.slices*i) + j,(this.slices*i),(this.slices*(i+1))+j);
    		this.indices.push((this.slices*i),(this.slices*(i+1)),(this.slices*(i+1))+j);

		}

		//iteracao final
		for(var j = 0; j < this.slices ;j++){
				this.vertices.push(Math.cos(j*ang),Math.sin(j*ang),1);
    			//this.vertices.push(Math.cos((j+1)*ang),Math.sin((j+1)*ang),1);
    			this.normals.push(Math.cos(j*ang),Math.sin(j*ang),0);
    			//this.normals.push(Math.cos((j+1)*ang),Math.sin((j+1)*ang),0);
		}

		this.vertices.push(0,0,0);
		this.normals.push(0,0,-1);

		//tampa z = 0
		for (var i = 0; i < this.slices; i++) {
    		this.vertices.push(Math.cos(i*ang),Math.sin(i*ang),0);
    		this.vertices.push(Math.cos((i+1)*ang),Math.sin((i+1)*ang),0);
    		this.indices.push((this.slices * (this.stacks + 1) ),(this.slices * (this.stacks + 1) ) + 1 + (2*i) + 1,(this.slices * (this.stacks + 1) ) + 1 + (2*i));
    		this.normals.push(0,0,-1);
    		this.normals.push(0,0,-1);
		}



		//tampa z = 1
		this.vertices.push(0,0,1);

		this.texCoords.push(tex/2,tex/2);
		this.normals.push(0,0,1);
		for (var i = 0; i < this.slices; i++) {
    		this.vertices.push(Math.cos(i*ang),Math.sin(i*ang),1);
    		this.vertices.push(Math.cos((i+1)*ang),Math.sin((i+1)*ang),1);
    		this.texCoords.push((Math.cos(i*ang)+tex)/2,(Math.sin(i*ang)+tex)/2);
    		this.texCoords.push((Math.cos((i+1)*ang)+tex)/2,(Math.sin((i+1)*ang)+tex)/2);
    		this.indices.push((this.slices * (this.stacks + 1) ) + 1 + (2*this.slices) + 1,(this.slices * (this.stacks + 1) ) + 1 + (2*this.slices) + 1 + (2*i),(this.slices * (this.stacks + 1) ) + 1 + (2*this.slices) + 1 + 1 + (2*i));
    		this.normals.push(0,0,1);
    		this.normals.push(0,0,1);
		}
		


		
		

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
