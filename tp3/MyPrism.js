/**
 * MyPrism
 * @constructor
 */

class MyPrism extends CGFobject
{
	constructor(scene,slices,stacks)
	{
		super(scene);

		this.slices = slices;
		this.stacks = stacks;
		
		this.initBuffers();
	};

	initBuffers()
	{
		var ang = (2.0 * Math.PI)/this.slices;

		this.vertices = [
		0,0,0,
		];

		this.indices = [];

		this.normals = [0,0,-1];

		//Lados do prisma
        for(var i = 0; i < this.stacks;i++){
        	for(var j = 0; j < this.slices;j++){
        		this.vertices.push(Math.cos(ang*(j)),Math.sin(ang*(j)),i*(1.0/this.stacks));
        		this.vertices.push(Math.cos(ang*(j+1)),Math.sin(ang*(j+1)),i*(1.0/this.stacks));
        		this.indices.push(1+(this.slices*2*i)+(j*2),1+(this.slices*2*i) + 1 +(j*2) ,1+(this.slices*2*(i+1))+(j*2));
    			this.indices.push(1+(this.slices*2*i) + 1 +(j*2),1+(this.slices*2*(i+1))+(j*2) + 1 ,1+(this.slices*2*(i+1))+(j*2));
    			this.normals.push(Math.cos(j*ang-(ang/2.0),Math.sin(j*ang-(ang/2.0))),0);
        		this.normals.push(Math.cos(j*ang-(ang/2.0),Math.sin(j*ang-(ang/2.0))),0);

        	}
        }

        //Iteração final
        for(var j = 0; j < this.stacks;j++){
        	this.vertices.push(Math.cos(ang*(j)),Math.sin(ang*(j)),1);
        	this.vertices.push(Math.cos(ang*(j+1)),Math.sin(ang*(j+1)),1);
    			this.normals.push(Math.cos(j*ang-(ang/2.0),Math.sin(j*ang-(ang/2.0))),0);
        		this.normals.push(Math.cos(j*ang-(ang/2.0),Math.sin(j*ang-(ang/2.0))),0);
        }

        
		//Base z = 0
        for(var j = 0; j < this.slices;j++){
       		this.vertices.push(Math.cos(ang*(j)),Math.sin(ang*(j)),0);
       		this.vertices.push(Math.cos(ang*(j+1)),Math.sin(ang*(j+1)),0);
       		this.indices.push(0,(this.slices*(this.stacks + 1)*2)+1+(2*j)+1,(this.slices*(this.stacks+1)*2)+1+(2*j));
       		this.normals.push(0,0,-1);
       		this.normals.push(0,0,-1);
       	}



       	//topo z = 1
       	this.vertices.push(0,0,1);
       	this.normals.push(0,0,1);
   		for(var i = 0; i < this.slices;i++){
   			this.vertices.push(Math.cos(ang*(i)),Math.sin(ang*(i)),1);
       		this.vertices.push(Math.cos(ang*(i+1)),Math.sin(ang*(i+1)),1);
			this.indices.push((this.slices * (this.stacks + 1) * 2) + 1 + (2*this.slices) + 1,(this.slices * (this.stacks + 1) * 2) + 1 + (2*this.slices) + 1 + (2*i),(this.slices * (this.stacks + 1) * 2) + 1 + (2*this.slices) + 1 + 1 + (2*i));
			this.normals.push(0,0,1);
       		this.normals.push(0,0,1);
		}


		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
