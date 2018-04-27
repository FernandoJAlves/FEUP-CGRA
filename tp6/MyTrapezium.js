/**
 * MyTrapezium
 * @constructor
 */
class MyTrapezium extends CGFobject
{
	constructor(scene, lengthup,lengthbot, height,minS, maxS, minT, maxT) 
	{
		super(scene);
		this.lengthup = lengthup|| 1;
		this.lengthbot = lengthbot || 1;
		this.height = height || 1;
		this.minS = minS || 0;
		this.maxS = maxS || 1;
		this.minT = minT || 0;
		this.maxT = maxT || 1;
		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [
		-(this.lengthbot/2), -(this.height/2), 0,
		(this.lengthbot/2), -(this.height/2), 0,
		-(this.lengthup/2), (this.height/2), 0,
		(this.lengthup/2), (this.height/2), 0
		];

		this.texCoords = [
		this.minS,this.maxT,
		this.maxS,this.maxT,
		this.minS,this.minT,
		this.maxS,this.minT
		]

		this.indices = [
		0, 1, 2, 
		3, 2, 1
		];

		this.normals = [
       	0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
