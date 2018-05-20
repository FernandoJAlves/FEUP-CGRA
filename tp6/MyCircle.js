/**
 * MyCircle
 * @constructor
 */

var ang2rad = Math.PI/180;

class MyCircle extends CGFobject
{
	constructor(scene, slices, zPos) 
	{
		super(scene);
		this.slices = slices;
		this.zPos = zPos;
		this.initBuffers();
	}

	initBuffers() 
	{
		var ang = ang2rad * (360.0/this.slices); 

		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];
		var tex = 1;

		this.vertices.push(0,0,this.zPos);

		this.texCoords.push(tex/2,tex/2);
		this.normals.push(0,0,1);
		for (var i = 0; i < this.slices; i++) {
    		this.vertices.push(Math.cos(i*ang),Math.sin(i*ang),this.zPos);
    		this.vertices.push(Math.cos((i+1)*ang),Math.sin((i+1)*ang),this.zPos);
    		this.texCoords.push((Math.cos(i*ang)+tex)/2,(-Math.sin(i*ang)+tex)/2);
    		this.texCoords.push((Math.cos((i+1)*ang)+tex)/2,(-Math.sin((i+1)*ang)+tex)/2);
    		this.indices.push((2*i)+1,(2*i)+2,0);
    		this.normals.push(0,0,1);
    		this.normals.push(0,0,1);
		}
		

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
