class MyInterface extends CGFinterface {


	/**
	 * MyInterface
	 * @constructor
	 */
 	constructor () {
 		super();
 	}
	
	/**
	 * init
	 * @param {CGFapplication} application
	 */
	init(application) {
		// call CGFinterface init
		super.init(application);

		// init GUI. For more information on the methods, check:
		//  http://workshop.chromeexperiments.com/examples/gui

		this.gui = new dat.GUI();

		

		// add a group of controls (and open/expand by defult)

		var group=this.gui.addFolder("Options");
		group.open();

		// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
		// e.g. this.option1=true; this.option2=false;

		group.add(this.scene, 'drawAxis');

		var luzes = this.gui.addFolder("Luzes");
		luzes.open();

		luzes.add(this.scene,'luz1');
		luzes.add(this.scene,'luz2');
		luzes.add(this.scene,'luz3');
		luzes.add(this.scene,'luz4');
		luzes.add(this.scene,'luz5');

		// add a slider
		// must be a numeric variable of the scene, initialized in scene.init e.g.
		// this.speed=3;
		// min and max values can be specified as parameters

		this.gui.add(this.scene, 'acceleration', 0, 10);

		this.gui.add(this.scene, 'CraneSpeed',0.1,1);	

		this.gui.add(this.scene, 'Textura', ["Black","Militar","Timber"] );

		this.initKeys();

		return true;
	};



	initKeys() {
		this.scene.gui=this;
		this.processKeyboard=function(){};
		this.activeKeys={};
	}

	processKeyDown(event) {
		this.activeKeys[event.code]=true;
	};

	processKeyUp(event) {
		this.activeKeys[event.code]=false;
	};

	isKeyPressed(keyCode) {
		return this.activeKeys[keyCode] || false;
	}

};
