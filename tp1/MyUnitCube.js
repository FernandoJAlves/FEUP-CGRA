/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCube extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [
				-0.5, -0.5, -0.5,
				-0.5, -0.5, 0.5,
				0.5, -0.5, 0.5,
				0.5, -0.5, -0.5,
				-0.5, 0.5, -0.5,
				-0.5, 0.5, 0.5,
				0.5, 0.5, 0.5,
				0.5, 0.5, -0.5
				];

		this.indices = [
				0, 2, 1,
				0, 3, 2,
				2, 3, 6,
				3, 7, 6,
				6, 1, 2,
				6, 5, 1,
				5, 4, 0,
				5, 0, 1,
				3, 0, 4,
				3, 4, 7,
				7, 4, 5,
				7, 5, 6

			];
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
