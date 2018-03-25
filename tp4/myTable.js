/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTable extends CGFobject
{
	constructor(scene) 
	{
		super(scene);

		this.cube = new MyUnitCubeQuad(this.scene);
	};

	display(){

		var ang2rad = Math.PI/180;

		//Tampo
		this.scene.pushMatrix();
		this.scene.translate(3.5, 3.6, 2.5);
		this.scene.scale(5,0.3,3);
        this.cube.display();
       	this.scene.popMatrix();


		
		//Perna 1
		this.scene.pushMatrix();
        this.scene.translate(1.3, 1.75, 1.3);
		this.scene.scale(0.3,3.5,0.3);
        this.cube.display(); 
        this.scene.popMatrix();

		//Perna 2
		this.scene.pushMatrix();
        this.scene.translate(5.7, 1.75, 1.3);
		this.scene.scale(0.3,3.5,0.3);
        this.cube.display(); 
        this.scene.popMatrix();
       
       	//Perna 3
		this.scene.pushMatrix();
        this.scene.translate(1.3, 1.75, 3.7);
		this.scene.scale(0.3,3.5,0.3);
        this.cube.display(); 
        this.scene.popMatrix();

		//Perna 4
		this.scene.pushMatrix();
        this.scene.translate(5.7, 1.75, 3.7);
		this.scene.scale(0.3,3.5,0.3);
        this.cube.display(); 
        this.scene.popMatrix();

	/*	


       	//Face 2
       	this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(180*ang2rad,1,0,0); 
        this.quad.display();
       	this.scene.popMatrix();

       	//Face 3
       	this.scene.pushMatrix();
       	this.scene.translate(0, -0.5, 0); 
       	this.scene.rotate(90*ang2rad,1,0,0);
        this.quad.display();
       	this.scene.popMatrix();

       	//Face 4
       	this.scene.pushMatrix();
       	this.scene.translate(0, 0.5, 0); 
       	this.scene.rotate(-90*ang2rad,1,0,0);
        this.quad.display();
       	this.scene.popMatrix();

       	//Face 5
       	this.scene.pushMatrix();
       	this.scene.translate(-0.5, 0, 0); 
       	this.scene.rotate(-90*ang2rad,0,1,0);
        this.quad.display();
       	this.scene.popMatrix();

       	//Face 6
       	this.scene.pushMatrix();
       	this.scene.translate(0.5, 0, 0); 
       	this.scene.rotate(90*ang2rad,0,1,0);
        this.quad.display();
       	this.scene.popMatrix();
*/
	};
};
