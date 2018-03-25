/**
 * MyFloor
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyFloor extends CGFobject
{
	constructor(scene) 
	{
		super(scene);

		this.floor = new MyUnitCubeQuad(this.scene);
	};

	display(){

		var ang2rad = Math.PI/180;

		//Floor
		this.scene.pushMatrix();
		this.scene.translate(3.5, 0, 2.5);
		this.scene.scale(8,0.1,6);
        this.floor.display();
       	this.scene.popMatrix();


		

	};
};
