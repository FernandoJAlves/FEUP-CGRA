/**
 * MyPaperPlane
 * @constructor
 */
class MyPaperPlane extends CGFobject
{
	constructor(scene, xPos, zPos) 
	{
		super(scene);
		
		this.xPos = xPos;
		this.yPos = 3.85;
		this.zPos = zPos;

		this.last_time_pp = -1;
		this.rot_z = 0;

		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [
        //Asa direita
        0.3,0,-0.5,
        0.1,0,-0.5,
        0.1,0,0.2,
        //Asa esquerda
        -0.3,0,-0.5,
        -0.1,0,-0.5,
        -0.1,0,0.2,
        //Base
        0,-0.2,-0.5,
        0,-0.2,0.2,
        0,-0.2,0.4
		];


		this.indices = [
		0, 1, 2,
		0, 2, 1,

		3, 4, 5,
		3, 5, 4,
		
		1, 2, 6,
		1, 6, 2,
        2, 6, 7,
        2, 7, 6,
        2, 7, 8,
        2, 8, 7,

		4, 5, 6,
		4, 6, 5,
        5, 6, 7,
        5, 7, 6,
        5, 7, 8,
        5, 8, 7 
		
				
		];

		//this.normals = [
		//];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

	update(currTime){
		
		if(this.last_time_pp == -1){
			this.last_time_pp = currTime;
		}
		else if(this.xPos > 1){
			var temp = currTime - this.last_time_pp;
			this.last_time_pp = currTime;

			this.rot_z = -20;
			this.xPos += ((temp/1000.0) * -5);
			this.yPos += ((temp/1000.0) * 1);
		}
		else if(this.yPos > 0.3){
			var temp = currTime - this.last_time_pp;
			this.last_time_pp = currTime;

			this.rot_z = 90;
			this.yPos += ((temp/1000.0) * -3);
		}


	}

};
