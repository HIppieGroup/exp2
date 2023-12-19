import Particles from "./particles/Particles";
import Webcam from "./lib/anonymous/components/webcam/Webcam";
import AModule from "./modules/AModule";
import * as THREE from 'three'


/**
 * Main
 * @constructor
 */
export default class Main extends AModule
{
	constructor()
	{
		super();

		this.init();
	}

	init()
	{
		super.init(this);

		//
		this._content = $("#particles");

		// particles
		this._particles = new Particles(this._content[0]);

		// webcam
		// this._webcam = new Webcam(
		// 	{
		// 		dom: document.querySelector(".video"),
		// 		video: true,
		// 		audio: false
		// 	});
		// this._webcam.$.on("success", this._onWebcamSuccess.bind(this));


		// const video = ;
		// const texture = new THREE.VideoTexture( video );


		this._particles.setTexture(document.querySelector( '#source canvas' ), true);
	}

	/**
	 * Drawing on requestAnimationFrame
	 */
	update()
	{
		this._particles.update();

		super.update();
	}

	/**
	 * Triggered on window resize
	 */
	_onResize()
	{
		super._onResize(this);

		this._particles.resize();
	}

	//-----------------------------------------------------o webcam handlers

	_onWebcamSuccess()
	{
		console.log('succ')
		// set input texture, could be video / image (will be drawn in a canvas)
		this._particles.setTexture(this._webcam.dom, true);
	}
}

/**
 * Let's roll
 */
const onDomContentLoaded = function()
{
	document.removeEventListener("DOMContentLoaded", onDomContentLoaded);


};
document.addEventListener("DOMContentLoaded", onDomContentLoaded);
