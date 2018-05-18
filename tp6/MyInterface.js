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


		// add a button:
		// the first parameter is the object that is being controlled (in this case the scene)
		// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
		// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

		this.gui.add(this.scene, 'doSomething');	

		// add a group of controls (and open/expand by defult)

		var group=this.gui.addFolder("Options");
		group.open();

		// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
		// e.g. this.option1=true; this.option2=false;

		group.add(this.scene, 'option1');
		group.add(this.scene, 'option2');

		// add a slider
		// must be a numeric variable of the scene, initialized in scene.init e.g.
		// this.speed=3;
		// min and max values can be specified as parameters

		this.gui.add(this.scene, 'speed', -5, 5);

		return true;
	};

	/**
	 * processKeyboard
	 * @param event {Event}
	 */
	processKeyboard(event) {
		// call CGFinterface default code (omit if you want to override)
		super.processKeyboard(event);

		// Check key codes e.g. here: http://www.asciitable.com/
		// or use String.fromCharCode(event.keyCode) to compare chars
		var key = event.which || event.keyCode; 
		// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp

		if (key == 65 || key == 97){
			//Turn Left
			this.scene.vehicle.rotate(0.03);
		}
	
		else if (key == 68 ||key == 100)	{
			//Turn Right
			this.scene.vehicle.rotate(-0.03);
		}
		
		if (key == 87 || key == 119){
			//Move forward
			this.scene.vehicle.move(-0.1);
		}
		
		else if (key == 83 || key == 115)	{
			//move backwards
			this.scene.vehicle.move(0.1);
		}

	};

};
