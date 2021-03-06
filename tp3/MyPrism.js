/**
 * MyPrism
 * @constructor
 */

var ang2rad = Math.PI/180;

class MyPrism extends CGFobject
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

		this.vertices = [
		0, 0, 0,
		];

		this.indices = [];
		this.normals = [0,0,-1];


		//pontos e indices das faces laterais
		for(var i = 0; i < this.stacks; i++){

			for(var j = 0; j < this.slices; j++){
				this.vertices.push(Math.cos(j*ang),Math.sin(j*ang),i*(1.0/this.stacks));
    			this.vertices.push(Math.cos((j+1)*ang),Math.sin((j+1)*ang),i*(1.0/this.stacks));
    			this.indices.push(1+(this.slices*2*i)+(j*2),1+(this.slices*2*i) + 1 +(j*2) ,1+(this.slices*2*(i+1))+(j*2));
    			this.indices.push(1+(this.slices*2*i) + 1 +(j*2),1+(this.slices*2*(i+1))+(j*2) + 1 ,1+(this.slices*2*(i+1))+(j*2));
    			this.normals.push(Math.cos(j*ang-(ang/2.0)),Math.sin(j*ang-(ang/2.0)),0);
    			this.normals.push(Math.cos(j*ang-(ang/2.0)),Math.sin(j*ang-(ang/2.0)),0);
			}
    		
		}

		//iteracao final
		for(var j = 0; j < this.slices;j++){
				this.vertices.push(Math.cos(j*ang),Math.sin(j*ang),1);
    			this.vertices.push(Math.cos((j+1)*ang),Math.sin((j+1)*ang),1);
    			this.normals.push(Math.cos(j*ang-(ang/2.0)),Math.sin(j*ang-(ang/2.0)),0);
    			this.normals.push(Math.cos(j*ang-(ang/2.0)),Math.sin(j*ang-(ang/2.0)),0);
		}


		//tampa z = 0
		for (var i = 0; i < this.slices; i++) {
    		this.vertices.push(Math.cos(i*ang),Math.sin(i*ang),0);
    		this.vertices.push(Math.cos((i+1)*ang),Math.sin((i+1)*ang),0);
    		this.indices.push(0,(this.slices * (this.stacks + 1) * 2) + 1 + (2*i) + 1,(this.slices * (this.stacks + 1) * 2) + 1 + (2*i));
    		this.normals.push(0,0,-1);
    		this.normals.push(0,0,-1);
		}



		//tampa z = 1
		this.vertices.push(0,0,1);
		this.normals.push(0,0,1);
		for (var i = 0; i < this.slices; i++) {
    		this.vertices.push(Math.cos(i*ang),Math.sin(i*ang),1);
    		this.vertices.push(Math.cos((i+1)*ang),Math.sin((i+1)*ang),1);
    		this.indices.push((this.slices * (this.stacks + 1) * 2) + 1 + (2*this.slices) + 1,(this.slices * (this.stacks + 1) * 2) + 1 + (2*this.slices) + 1 + (2*i),(this.slices * (this.stacks + 1) * 2) + 1 + (2*this.slices) + 1 + 1 + (2*i));
    		this.normals.push(0,0,1);
    		this.normals.push(0,0,1);
		}
		


		
		

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
