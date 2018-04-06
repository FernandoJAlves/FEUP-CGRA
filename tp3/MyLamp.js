/**
 * MyLamp
 * @constructor
 */

var ang2rad = Math.PI/180;

class MyLamp extends CGFobject
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

		var mult = 0;

		//pontos e indices das faces laterais
		for(var i = 0; i < this.stacks; i++){

			mult = 1 - (i/this.stacks);

			for(var j = 0; j < this.slices - 1; j++){
				this.vertices.push(mult*Math.cos(j*ang),mult*Math.sin(j*ang),i*(1.0/this.stacks));
    			this.normals.push(Math.cos(j*ang),Math.sin(j*ang),0);

    			this.indices.push((this.slices*i) + j,(this.slices*i)+1+j,(this.slices*(i+1))+j);
    			this.indices.push((this.slices*i) + 1 +j,(this.slices*(i+1))+j+1,(this.slices*(i+1))+j);
			}

			this.vertices.push(mult*Math.cos(j*ang),mult*Math.sin(j*ang),i*(1.0/this.stacks));
    		this.normals.push(Math.cos(j*ang),Math.sin(j*ang),0);
			this.indices.push((this.slices*i) + j,(this.slices*i),(this.slices*(i+1))+j);
    		this.indices.push((this.slices*i),(this.slices*(i+1)),(this.slices*(i+1))+j);

		}

		mult = 0;

		//iteracao final
		for(var j = 0; j < this.slices ;j++){
				this.vertices.push(mult*Math.cos(j*ang),mult*Math.sin(j*ang),1);
    			//this.vertices.push(Math.cos((j+1)*ang),Math.sin((j+1)*ang),1);
    			this.normals.push(Math.cos(j*ang),Math.sin(j*ang),0);
    			//this.normals.push(Math.cos((j+1)*ang),Math.sin((j+1)*ang),0);
		}





/*
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
		this.normals.push(0,0,1);
		for (var i = 0; i < this.slices; i++) {
    		this.vertices.push(Math.cos(i*ang),Math.sin(i*ang),1);
    		this.vertices.push(Math.cos((i+1)*ang),Math.sin((i+1)*ang),1);
    		this.indices.push((this.slices * (this.stacks + 1) ) + 1 + (2*this.slices) + 1,(this.slices * (this.stacks + 1) ) + 1 + (2*this.slices) + 1 + (2*i),(this.slices * (this.stacks + 1) ) + 1 + (2*this.slices) + 1 + 1 + (2*i));
    		this.normals.push(0,0,1);
    		this.normals.push(0,0,1);
		}
	*/	


		
		

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
