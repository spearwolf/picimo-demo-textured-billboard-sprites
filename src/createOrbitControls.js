import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function createOrbitControls(display, options = { autoRotate: false }) {
  display.on("init", ({ stage: { camera } }) => {
    const orbiter = new OrbitControls(camera, display.renderer.domElement);

    orbiter.screenSpacePanning = true;
    Object.assign(orbiter, options);

    display.on("frame", () => {
      orbiter.update();
    });
  });
}
