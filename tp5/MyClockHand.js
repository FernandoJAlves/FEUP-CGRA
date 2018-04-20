/**
 * MyClockHand
 * @constructor
 */
 class MyClockHand extends CGFobject
 {
	constructor(scene, length, width) 
	{
		super(scene);
		this.ang = 0;
		this.initBuffers();
		this.scene.pushMatrix();
		this.scene.scale(width,length,1);
		this.scene.popMatrix();

	};

	setAngle(a){
	    this.ang = -a * Math.PI/180.0;
	}

	initBuffers(){

		this.vertices =[
		-0.07,0.05,1.01,
		0.07,0.05,1.01,
		0,0.4,1.01
		];

		this.indices = [
		0,1,2];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	display() {
		this.scene.pushMatrix();
	    this.scene.rotate(this.ang,0,0,1);
	    super.display();
	    this.scene.popMatrix();
	};
 };