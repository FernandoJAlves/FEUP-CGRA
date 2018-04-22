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

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		// Scene elements
		this.table = new MyTable(this);
		this.wall = new MyQuad(this,-0.5,1.5,-0.5,1.5);
		this.plane = new Plane(this,4);
		this.floor = new MyQuad(this,0,12,0,12);
		this.prism = new MyPrism(this,N_SLICES,N_STACKS);
		this.clock = new MyClock(this);
		
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
		this.tableAppearance.loadTexture("../resources/images/table.png");
		this.floorAppearance.loadTexture("../resources/images/floor.png");
		this.windowAppearance.loadTexture("../resources/images/window.png");
		this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
		this.slidesAppearance.loadTexture("../resources/images/slides.png");
		this.slidesAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
		this.boardAppearance.loadTexture("../resources/images/board.png");
		this.boardAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
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

		this.first_ite = 1;
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
		
		//Clock pointers

		if(this.first_ite == 1){
			this.last_time = currTime;
			this.first_ite = 0;
		}
		if(this.first_ite == 0){
			this.interval = currTime - this.last_time;
			this.last_time = currTime;
			this.clock.update(this.interval);
		}

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
			this.floorAppearance.apply();
			//this.materialFloor.apply();
			this.floor.display();
		this.popMatrix();

		// Left Wall
		this.pushMatrix();
			this.translate(0, 4, 7.5);
			this.rotate(90 * degToRad, 0, 1, 0);
			this.scale(15, 8, 0.2);
			this.materialWood.apply();
			this.windowAppearance.apply();
			this.wall.display();
			
		this.popMatrix();

		// Plane Wall
		this.pushMatrix();
			this.translate(7.5, 4, 0);
			this.scale(15, 8, 0.2);
			this.materialWood.apply();
			this.plane.display();
		this.popMatrix();

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

		// Board A
		this.pushMatrix();
			this.translate(4, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			
			//this.materialA.apply();
			this.slidesAppearance.apply();
			this.boardA.display();
		this.popMatrix();

		// Board B
		this.pushMatrix();
			this.translate(10.5, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			
			//this.materialB.apply();
			this.boardAppearance.apply();
			this.boardB.display();
		this.popMatrix();

		// Clock
		this.pushMatrix();
			this.translate(7.5, 7.2, 0);
			this.scale(0.7,0.7,0.2);
			this.clockAppearance.apply();
			this.clock.display();
		this.popMatrix();


		/*
		// Prism
		this.pushMatrix();
		    this.prism.display();
		this.popMatrix();
		*/

		// ---- END Scene drawing section
	};
};
