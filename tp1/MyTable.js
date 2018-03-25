/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

 class MyTable extends CGFobject
 {
	constructor(scene)
	{
		super(scene);
		this.cube = new MyUnitCubeQuad(scene);
		this.cube.initBuffers();
	};
	display(){

	};
 }
