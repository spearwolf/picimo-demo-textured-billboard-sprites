import { PowerOf2Image, Texture, TileSet } from "picimo";
import { TexturedBillboardMaterial } from "./TexturedBillboardMaterial";

export default async function (
  url,
  { texture: textureOptions, ...tilesetOptions },
  display
) {
  const image = await new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      resolve(img);
    };
  });

  const tileset = new TileSet(
    new Texture(await new PowerOf2Image(image).loaded),
    tilesetOptions
  );

  const material = new TexturedBillboardMaterial(
    display.textureFactory.create(tileset, textureOptions)
  );

  return [tileset, material];
}
