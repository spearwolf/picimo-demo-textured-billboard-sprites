import createDisplay from "./createDisplay";
import createMesh from "./TexturedBillboards/createMesh";
import loadTilesetAndMaterial from "./TexturedBillboards/loadTilesetAndMaterial";
import createSomeSprites from "./createSomeSprites";
import { createOrbitControls } from "./createOrbitControls";

import tilesetImageUrl from "../amigaballs.png";

import "./styles.css";

const display = createDisplay();

display.on("init", async () => {
  const spritesMesh = createMesh(666);

  const [tileset, material] = await loadTilesetAndMaterial(
    tilesetImageUrl,
    {
      tileWidth: 16,
      tileHeight: 16,
      margin: 2,
      spacing: 2,
      tileCount: 8,
      texture: ["nearest"]
    },
    display
  );

  createSomeSprites(spritesMesh.sprites, tileset);

  spritesMesh.material = material;
  display.stage.add(spritesMesh);
});

createOrbitControls(display);

display.start();
