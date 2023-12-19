import GUI from "../lib/dat/dat.gui";

/**
 * Controller
 * @constructor
 */
export default class ParticlesModel
{
	constructor()
	{
		this.init();
	}

	init()
	{
		this.data = {
			// texture
			threshold: 0.9,
			smoothness: 0.1,
			strength: 0.32,

			// look & feel
			initialAttraction: 0,
			frictions: 0.0,
			resetStacked: false,
			stackSensibility: 0.80,

			// repulsion: false,
			// repulsionRadius: 3.0,
			// repulsionStrength: 0.0009,
			// repulsionSensibility: 0.80,

			velocityMax: 0.0013,
			// mapStrength: 0.005,
			mapStrength: 0.007,
			pointSize: 2,
			density: 1,
			// density: 1.5,
			alpha: 0.23,
			inverted: true,
			particlesColor: "#FFFFFF",
			bgColor: "#1e1e1e",
		};

		// var callback = $.proxy(this._onChange, this);

		// this._gui = new GUI();
		// this._gui.close();

		// this._gui.add(this.data, 'initialAttraction', 0, 0.3).step(0.0001).onChange(callback);
		// this._gui.add(this.data, 'frictions', 0, 0.5).step(0.001).onChange(callback);
		// this._gui.add(this.data, 'velocityMax', 0, 0.02).step(0.00001).onChange(callback);
		// this._gui.add(this.data, 'pointSize', 1, 15).step(1).onChange(callback);
		// this._gui.add(this.data, 'alpha', 0, 1).step(0.0001).onChange(callback);
		// this._gui.add(this.data, 'strength', 0, 1).step(0.0001).onChange(callback);
		// this._gui.add(this.data, 'density', 1, 10).step(0.001).onChange(callback);
		// this._gui.add(this.data, 'mapStrength', 0, 0.2).step(0.0001).onChange(callback);
		//
		// this._gui.add(this.data, 'resetStacked').onChange(callback);
		// this._gui.add(this.data, 'stackSensibility', 0, 1).step(0.00001).onChange(callback);
		//
		// this._gui.add(this.data, 'inverted').onChange(callback);
		// this._gui.addColor(this.data, 'particlesColor').onChange(callback);
		// this._gui.addColor(this.data, 'bgColor').onChange(callback);
		// this._gui.add(this.data, 'repulsion').onChange(callback);
		// this._gui.add(this.data, 'repulsionStrength', 0, 0.01).step(0.00001).onChange(callback);
		// this._gui.add(this.data, 'repulsionSensibility', 0, 3).step(0.00001).onChange(callback);
		// repulsion.add(this.data, 'repulsionRadius', 1.0, 3).step(1).onChange(callback);
	}

	_onChange()
	{
		$(this).trigger("change");
	}
}
