import { Display, ParallaxProjection, Plane, Stage2D } from "picimo";

export default () => {
  const display = new Display(document.querySelector("[picimo]"));

  display.stage = new Stage2D(
    new ParallaxProjection(Plane.XY, {
      width: 1000,
      height: 1000,
      distance: 2500,
      near: 1,
      far: 10000,
      fit: "contain"
    })
  );

  return display;
};
