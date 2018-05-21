/**
 * MyHalfSphere
 * @constructor
 */

var ang2rad = Math.PI/180;

class MyHalfSphere extends CGFobject
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

        var inc = 1.0 / this.stacks;

        //Vertices + Normals

        for(var j = 0; j <= 1.0;){

            for(var i = 0; i < this.slices; i++){
                this.vertices.push(Math.sqrt(1-(j*j))*Math.cos(i*(2*Math.PI)/this.slices), Math.sqrt(1-(j*j))*Math.sin(i*(2*Math.PI)/this.slices), j);
                this.normals.push(Math.sqrt(1-(j*j))*Math.cos(i*(2*Math.PI)/this.slices), Math.sqrt(1-(j*j))*Math.sin(i*(2*Math.PI)/this.slices), j);

            }
            j += inc;

        }

        //Indices

        for(var j = 0; j < this.stacks; j++){
            
            for(var i = 0; i < this.slices; i++){
                
                this.indices.push(this.slices*j+i, this.slices*j+i+1, this.slices*(j+1)+i);
                if(i != (this.slices - 1)){
                    this.indices.push(this.slices*(j+1)+i+1,this.slices*(j+1)+i,this.slices*j+i+1);
                }
                else{
                    this.indices.push(this.slices*j,this.slices*j+i+1,this.slices*j+i);
                }


            }


        }



		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
