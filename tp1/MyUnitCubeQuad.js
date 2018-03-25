/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

 class MyUnitCubeQuad extends CGFobject
 {
	constructor(scene) 
	{
		super(scene);
		this.quad = new MyQuad(scene);
		this.quad.initBuffers();
	};
	display(){
		this.scene.translate(0,0,0.5);
		this.quad.display();
		this.scene.translate(0,0.5,-0.5);
		this.deg2rad=Math.PI/180.0;
        var a_rad = -90.0 * this.deg2rad;
        this.scene.rotate(a_rad,1,0,0);
		this.quad.display();
		this.scene.rotate(a_rad,1,0,0);
		this.scene.translate(0,0.5,0.5);
		this.quad.display();
		this.scene.rotate(a_rad,1,0,0);
		this.scene.translate(0,0.5,0.5);
		this.quad.display();
		this.scene.rotate(-a_rad,0,1,0);
		this.scene.translate(0.5,0,0.5);
		this.quad.display();
		this.scene.rotate(2*a_rad,1,0,0);
		this.scene.translate(0,0,1);
		this.quad.display();
	};
 }