import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three'
import {gsap} from 'gsap';


import s from './Home.module.scss';
import {EffectComposer, RenderPass, ShaderPass} from "three/addons";
import {MagicShader} from './MagicShader'
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";

const getInitPositionsTexture = (particlesCount, { width, height }) => {
  const entries = 4;
  const a = new Float32Array(particlesCount * entries);

  for (let i = 0, l = a.length; i < l; i += entries) {
    const x = (Math.random() * width) / width;
    const y = (Math.random() * height) / height;

    const ratio = 0.001;
    const vx = (Math.random() - 0.5) * ratio;
    const vy = (Math.random() - 0.5) * ratio;

    a[i + 0] = x;
    a[i + 1] = y;
    a[i + 2] = vx;
    a[i + 3] = vy;
  }

  const texture = new THREE.DataTexture(
      a,
      Math.sqrt(particlesCount),
      Math.sqrt(particlesCount),
      THREE.RGBAFormat,
      THREE.FloatType
  );
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  texture.flipY = false;

  return texture;
};


const createObj = (geometryType, geometryProps) => {
  const geometry = new THREE[geometryType](...geometryProps);

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 1,
  });

  return new THREE.Mesh(geometry, material);
};

const MyRotatingBox = () => {
	const myMesh = React.useRef();

	useFrame(({ clock }) => {
		const a = clock.getElapsedTime();
		myMesh.current.rotation.x = a;
		myMesh.current.rotation.z = a;
	});

	return (
			<mesh ref={myMesh} position={[-1, 0, 0]} rotation={[0.8, .7, 0]} scale={1.3}>
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial
						color="white"
						metalness={0.5}
						roughness={0.35}
				/>
			</mesh>
	);
}

const Light = () => {
	const dirLight = useRef();

	// useHelper(dirLight, DirectionalLightHelper);
	// useHelper(dirLight, PointLightHelper);
	return (<>
		<directionalLight ref={dirLight} color="white" position={[-5, -1.4, 4]} intensity={4} />
		<pointLight ref={dirLight} color="white" position={[-0.8, 0.1, 1.4]} intensity={4} />
	</>)
}

class Experemeny {
  constructor(parent) {
    this.wWidth = window.innerWidth;
    this.wHeight = window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
        30,
        this.wWidth / this.wHeight,
        0.1,
        1000 // 400
    );
    this.camera.position.z = 10;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(1);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    this.renderer.setSize(this.wWidth, this.wHeight);
    this.composer.setSize(this.wWidth, this.wHeight);

    this.addObjects();
    this.addShader();

    parent.appendChild(this.renderer.domElement);
  }

  addObjects = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 1;

    const dirLight = new THREE.DirectionalLight(0xffffff, 4);
    dirLight.position.set(-5, -1.4, 4);

    this.sphere = createObj('SphereGeometry', [1, 32, 32]);
    this.cube = createObj('BoxGeometry', [1.8, 1.8, 1.8]);

    this.sphere.position.x = -1;
    this.cube.position.x = 1;

    this.scene.add(ambientLight);
    this.scene.add(dirLight);
    this.scene.add(this.sphere);
    this.scene.add(this.cube);
  }

  addShader = () => {
    const defaultPositionParticles = getInitPositionsTexture(512, {width: this.wWidth, height: this.wHeight})
    MagicShader.uniforms.uTexturePositionInit.value = defaultPositionParticles;
    MagicShader.uniforms.uResolutionInput.value = new THREE.Vector2(window.innerWidth, window.innerHeight);
    MagicShader.uniforms.uResolutionOutput.value = new THREE.Vector2(window.innerWidth, window.innerHeight);


    this.effect = new ShaderPass(MagicShader);
    this.composer.addPass(this.effect);

    console.log(this.effect)
  }

  render = () => {
    this.composer.render();
  }
}



const Home = ({className}) => {
  const ref = useRef();

  // useEffect(() => {
  //   const experement = new Experemeny(ref.current)
  //
  //   gsap.ticker.add(experement.render);
  //   return () => {
  //     gsap.ticker.remove(experement.render);
  //   };
  // }, []);

  useEffect(() => {
    (async () => {

        await import('./webgl-gpgpu-particles/js/Main').then((res) => {
          const main = new res.default();

          (function tick() {
            main.update();
            window.requestAnimationFrame(tick);
          })();
        });

    })();
  }, [])


  return (
      <div className={s.root}>
        <div id="particles" ref={ref}></div>

        <div className={s.source}>
        	<video  className={s.video} src="/movie.mp4" autoPlay muted></video>
        </div>

        <Canvas id="source" >
        <color
            attach="background"
            args={[0, 0, 0]}
        />

        	<ambientLight intensity={1} />
        	{/*<pointLight position={[0, -2, -4]} intensity={10} />*/}

        	<Light />

        	{/*<spotLight color="white" position={[-2, 4, 4]} intensity={1} />*/}
        	<MyRotatingBox />
        	<mesh position={[1, 0, 0]} scale={0.8}>
        		<sphereGeometry radius={0.1}  />
        		<meshStandardMaterial
        				color="white"
        				metalness={0.5}
        				roughness={0.35}
        		/>
        	</mesh>
        	<OrbitControls />

        </Canvas>

      </div>
  )
}

Home.propTypes = {
  className: PropTypes.string,
}

Home.defaultProps = {}

export default React.memo(Home);


//





