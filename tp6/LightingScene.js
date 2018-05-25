var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var N_SLICES = 6;
var N_STACKS = 6;

var FPS = 1000/60;

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

		//GUI elements
		this.drawAxis = true;
		this.option2 = false;
		this.luz1 = true;
		this.luz2 = true;
		this.luz3 = true;
		this.luz4 = true;
		this.luz5 = true;
		this.CraneSpeed = 0.1;
		this.acceleration = 5;
		this.Textura = "Black";

		// Scene elements

		  //example for nrDivs = 8 -> grid of 9x9 vertices
		  this.altimetry= [
		  	[ 2.0 , 3.0 , 2.0, 4.0, 2.5, 2.4, 2.3, 1.3, 0.0 ],
			[ 2.0 , 3.0 , 2.0, 4.0, 7.5, 6.4, 4.3, 1.3, 0.0 ],
			[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
			[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
			[ 0.0 , 0.0 , 2.0, 4.0, 2.5, 2.4, 0.0, 0.0, 0.0 ],
			[ 0.0 , 0.0 , 2.0, 4.0, 3.5, 2.4, 0.0, 0.0, 0.0 ],
			[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
			[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
			[ 2.0 , 3.0 , 2.0, 1.0, 2.5, 2.4, 2.3, 1.3, 0.0 ]
		];


		this.terrain = new MyTerrain(this,8,this.altimetry);

		this.vehicle = new MyVehicle(this,20,15);

		this.crane = new MyCrane(this);

		this.lastTime = 0;

		// Materials
		this.materialDefault = new CGFappearance(this);



		// Texture Objects Declaration

		this.terrainAppearance = new CGFappearance(this);


		this.terrainAppearance.loadTexture("../resources/images/terrain.png");



		//Vehicle
		this.vehicleAppearances = new Array();
		this.vehicleAppearanceList = {};
		this.vehicleAppearanceList["Black"] = 0;
		this.vehicleAppearanceList["Militar"] = 1;
		this.vehicleAppearanceList["Timber"] = 2;
		this.currVehicleAppearance = 0;

		this.vehicleAppearances[0] = new CGFappearance(this);
		this.vehicleAppearances[0].loadTexture("../resources/images/black.png");

		this.vehicleAppearances[1] = new CGFappearance(this);
		this.vehicleAppearances[1].loadTexture("../resources/images/military.png");

		this.vehicleAppearances[2] = new CGFappearance(this);
		this.vehicleAppearances[2].loadTexture("../resources/images/floor.png");


		this.glassAppearance = new CGFappearance(this);
		this.glassAppearance.loadTexture("../resources/images/glass.png");

		this.wheelSideAppearance = new CGFappearance(this);
		this.wheelSideAppearance.loadTexture("../resources/images/car_wheel_side.png");
		this.wheelSideAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");

		this.wheelTrackAppearance = new CGFappearance(this);
		this.wheelTrackAppearance.loadTexture("../resources/images/car_wheel_tracks.png");

		//Crane

		this.metalAppearance = new CGFappearance(this);

		this.metalAppearance.loadTexture("../resources/images/metal.png");
		
		this.setUpdatePeriod(FPS);
		
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(60, 60, 60), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
		this.setGlobalAmbientLight(0,0,0, 0);


		// Positions for four lights
		this.lights[0].setPosition(25, 5, 25, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)
		
		this.lights[1].setPosition(25, 5, -25, 1.0);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setPosition(-25,5,-25,1.0);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)
		
		this.lights[3].setPosition(-25,5,25, 1.0);
		this.lights[3].setVisible(true); // show marker on light position (different from enabled)

        this.lights[4].setPosition(0,10,0,1.0);
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
		if(this.luz1){
			this.lights[0].enable();
		}
		else{
			this.lights[0].disable();
		}

		if(this.luz2){
			this.lights[1].enable();
		}
		else{
			this.lights[1].disable();
		}

		if(this.luz3){
			this.lights[2].enable();
		}
		else{
			this.lights[2].disable();
		}

		if(this.luz4){
			this.lights[3].enable();
		}
		else{
			this.lights[3].disable();
		}

		if(this.luz5){
			this.lights[4].enable();
		}
		else{
			this.lights[4].disable();
		}

		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}


	update(currTime){
		this.checkKeys();
		var newTime = currTime;
		var deltaTime = newTime - this.lastTime;
		this.vehicle.update(deltaTime,this.terrain);
		this.crane.catchVehicle(this.vehicle);
		this.crane.update(deltaTime);
		this.lastTime = newTime;
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
		if(this.drawAxis){
		this.axis.display();
		}

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup
	
		// ---- BEGIN Scene drawing section


		// terrain
		this.pushMatrix();
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(50, 50, 10);
			this.terrainAppearance.apply();
			this.terrain.display();
		this.popMatrix();


		//Vehicle
		if(this.crane.state == animationState.FINDING || this.crane.state == animationState.RETURNING){
		this.pushMatrix();
			this.currVehicleAppearance = this.vehicleAppearanceList[this.Textura];
			this.translate(this.vehicle.x,this.vehicle.y,this.vehicle.z);
			//console.log("x: " + this.vehicle.x + " z: " + this.vehicle.z);
			this.rotate(this.vehicle.ang,0,1,0);
			this.glassAppearance.apply();
			this.vehicle.displayGlass();
			this.vehicleAppearances[this.currVehicleAppearance].apply();
			this.vehicle.displayBody();
			this.vehicle.displayWheels();
		this.popMatrix();
		}

		
		//Crane
		
		this.pushMatrix();
			this.translate(this.crane.x,this.crane.y,this.crane.z);
			this.metalAppearance.apply();
			
			this.crane.display();
		this.popMatrix();

		// ---- END Scene drawing section
	};

	checkKeys(){
		var text="Keys pressed: ";
		var keysPressed=false;
		var isRotating = false;
		var angVel = -this.vehicle.speed/100.0;
		let angVel2 = 0.03;
		if (this.gui.isKeyPressed("KeyW")){
			this.vehicle.move(-this.acceleration);
			keysPressed=true;
		}

		if (this.gui.isKeyPressed("KeyS")){
			this.vehicle.move(this.acceleration);
			keysPressed=true;
		}

		if (this.gui.isKeyPressed("KeyD")){
			
			this.vehicle.rotateWheelsRight(angVel2);
			this.vehicle.rotate(-angVel);
			isRotating = true;
		}
		else{
			this.vehicle.rotateRightToCenter(angVel2);
		}

		if (this.gui.isKeyPressed("KeyA")){
			
			this.vehicle.rotateWheelsLeft(angVel2);
			this.vehicle.rotate(angVel);
			
			isRotating = true;
		}
		else{
			this.vehicle.rotateLeftToCenter(angVel2);
		}

		if (this.gui.isKeyPressed("Space")){
			this.vehicle.stop();
		}
		
		if (!keysPressed){
			this.vehicle.move(0);
		}
	}

};
