var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var N_SLICES = 6;
var N_STACKS = 6;

class LightingScene extends CGFscene 
{
	constructor()
	{
		super();
	};

	init(application) 
	{
		super.init(application);

		this.enableTextures(true);

		this.initCameras();

		this.initLights();

		this.gl.clearColor(0.2075, 0.3169, 0.3616, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		// Scene elements

		this.terrain = new MyTerrain(this,50,0,5,0,5);

		this.vehicle = new MyVehicle(this,8,8);
		
		this.boardA = new Plane(this, BOARD_A_DIVISIONS, -0.25,1.25);
		this.boardB = new Plane(this, BOARD_B_DIVISIONS);

		// Materials
		this.materialDefault = new CGFappearance(this);
		
		this.materialA = new CGFappearance(this);
		this.materialA.setAmbient(0.3,0.3,0.3,1);
		this.materialA.setDiffuse(0.6,0.6,0.6,1);
		this.materialA.setSpecular(0,0.2,0.8,1);
		this.materialA.setShininess(120);

		this.materialB = new CGFappearance(this);
		this.materialB.setAmbient(0.3,0.3,0.3,1);
		this.materialB.setDiffuse(0.6,0.6,0.6,1);
		this.materialB.setSpecular(0.8,0.8,0.8,1);	
		this.materialB.setShininess(120);


		this.materialWood = new CGFappearance(this);
		this.materialWood.setAmbient(0.5,0.3,0,1);
		this.materialWood.setDiffuse(0.4,0.2,0,1);
		this.materialWood.setSpecular(0.5,0.3,0,0.5);	
		this.materialWood.setShininess(120);

		this.materialFloor = new CGFappearance(this);
		this.materialFloor.setAmbient(0.2,0.2,0.2,1);
		this.materialFloor.setDiffuse(0.4,0.4,0.4,1);
		this.materialFloor.setSpecular(0.2,0.2,0.2,0.5);	
		this.materialFloor.setShininess(120);

		this.materialMetal = new CGFappearance(this);
		this.materialMetal.setAmbient(0.2,0.2,0.2,1);
		this.materialMetal.setDiffuse(0.2,0.2,0.2,1);
		this.materialMetal.setSpecular(0.8,0.8,0.8,1);	
		this.materialMetal.setShininess(120);



		// Texture Objects Declaration
		this.tableAppearance = new CGFappearance(this);
		this.floorAppearance = new CGFappearance(this);
		this.windowAppearance = new CGFappearance(this);
		this.slidesAppearance = new CGFappearance(this);
		this.boardAppearance = new CGFappearance(this);
		this.terrainAppearance = new CGFappearance(this);
		this.tableAppearance.loadTexture("../resources/images/table.png");
		this.floorAppearance.loadTexture("../resources/images/floor.png");
		this.windowAppearance.loadTexture("../resources/images/window.png");
		this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
		this.slidesAppearance.loadTexture("../resources/images/slides.png");
		this.slidesAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
		this.boardAppearance.loadTexture("../resources/images/board.png");
		this.boardAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");

		this.terrainAppearance.loadTexture("../resources/images/terrain.png");
		this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);
		this.slidesAppearance.setShininess(10);
		this.slidesAppearance.setDiffuse(0.8,0.8,0.8,1);

		this.boardAppearance.setSpecular(0.5,0.5,0.5,1);
		this.boardAppearance.setShininess(80);
		this.boardAppearance.setDiffuse(0.3,0.3,0.3,1);

		//Clock

		this.clockAppearance = new CGFappearance(this);
		this.clockAppearance.loadTexture("../resources/images/clock.png");

		this.clockHandAppearance = new CGFappearance(this);
		//this.clockHandAppearance.setDiffuse(0,0,0,0);
		//this.clockHandAppearance.setSpecular(0,0,0,0);

		//Paper Plane

		this.paper_planeAppearance = new CGFappearance(this);
		this.paper_planeAppearance.setDiffuse(0.2,0.2,0.2,1);
		this.paper_planeAppearance.setAmbient(0.5,0.5,0.5,1);
		this.paper_planeAppearance.setSpecular(0.7,0.7,0.7,1);
		this.paper_planeAppearance.setShininess(20);

		//Vehicle
		this.vehicleAppearance = new CGFappearance(this);
		this.vehicleAppearance.setDiffuse(0,0.3,0,1);
		this.vehicleAppearance.setSpecular(0,0,0,0);
		this.vehicleAppearance.setShininess(1);

		this.glassAppearance = new CGFappearance(this);
		this.glassAppearance.setDiffuse(0,0,0.3,1);
		this.glassAppearance.setSpecular(0.0,0,0.8,1);
		this.glassAppearance.setShininess(1);

		this.wheelAppearance = new CGFappearance(this);
		this.wheelAppearance.setDiffuse(0,0,0,1);
		this.wheelAppearance.setSpecular(0,0,0,0);
		this.wheelAppearance.setShininess(1);

		
		this.setUpdatePeriod(100);
		
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
		this.setGlobalAmbientLight(0,0,0, 0);


		// Positions for four lights
		this.lights[0].setPosition(4, 6, 1, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)
		
		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setPosition(10.5,6.0,5.0,1.0);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)
		this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)

        this.lights[4].setPosition(0.1,4,7.5,1.0);
        this.lights[4].setVisible(true);

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1,1,0,1);
		this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1,1,1,1);
		this.lights[2].setLinearAttenuation(1.0);
		this.lights[2].setQuadraticAttenuation(0);
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].enable();

		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1,1,0,1);
		this.lights[3].setLinearAttenuation(0);
		this.lights[3].setQuadraticAttenuation(0.2);
		this.lights[3].setConstantAttenuation(0);
		this.lights[3].enable();

		this.lights[4].setAmbient(0, 0, 0, 1);
		this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[4].setSpecular(1,1,0,1);
		this.lights[4].enable();
	};

	updateLights() 
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}

	update(currTime){
		


	}


	display() 
	{
		// ---- BEGIN Background, camera and axis setup



		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup
	
		// ---- BEGIN Scene drawing section


		// Floor
		this.pushMatrix();
			this.translate(7.5, 0, 7.5);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(15, 15, 0.2);
			this.terrainAppearance.apply();
			//this.materialFloor.apply();
			this.terrain.display();
		this.popMatrix();


/*
		// First Table
		this.pushMatrix();
			this.translate(5, 0, 8);
			this.tableAppearance.apply();
			//this.materialWood.apply();
			this.table.displayTop();
			this.materialMetal.apply();
			this.table.displayLegs();
		this.popMatrix();

		// Second Table
		this.pushMatrix();
			this.translate(12, 0, 8);
			this.tableAppearance.apply();
			//this.materialWood.apply();
			this.table.displayTop();
			this.materialMetal.apply();
			this.table.displayLegs();
		this.popMatrix();
*/



		//Vehicle
		this.pushMatrix();
			this.glassAppearance.apply();
			this.vehicle.displayGlass();
			this.vehicleAppearance.apply();
			this.vehicle.displayBody();
			this.wheelAppearance.apply();
			this.vehicle.displayWheels();
		this.popMatrix();
/*
		// Paper Plane
		this.pushMatrix();
		this.translate(this.paper_plane.xPos, this.paper_plane.yPos, this.paper_plane.zPos);
		this.rotate(-Math.PI/2,0,1,0);
		this.paper_planeAppearance.apply();
		
		this.rotate(this.paper_plane.rot_z * degToRad,1,0,0);
		this.paper_plane.display();    
		this.popMatrix();
*/
		// ---- END Scene drawing section
	};

	doSomething(){
		
	}

	option1(){

	}


	option2(){
		
	}

	speed(){
		
	}
};
