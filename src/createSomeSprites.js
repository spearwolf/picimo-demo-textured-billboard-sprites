import { Vector3 } from "three";

export default (sprites, tileset) => {
  const frames = tileset.randomFrames(sprites.capacity);
  return frames.map((frame) => {
    const billboard = sprites.createSprite(32, 32);
    billboard.setTexCoordsByTexture(frame);
    const pos = new Vector3(
      Math.random() * 1000 - 500,
      Math.random() * 1000 - 500,
      Math.random() * 1000 - 500
    );
    pos.normalize();
    pos.multiplyScalar(300 + Math.random() * 50);
    billboard.translate(pos.x, pos.y, pos.z);
    return billboard;
  });
};
