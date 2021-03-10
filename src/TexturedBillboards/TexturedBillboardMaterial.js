import { ShaderMaterial, DoubleSide } from "three";
import vertexShader from "./billboard.vert";
import fragmentShader from "./billboard.frag";

export class TexturedBillboardMaterial extends ShaderMaterial {
  constructor(texture) {
    super({
      vertexShader,
      fragmentShader,

      uniforms: {
        texMap: {
          value: texture
        },
        fogColor: {
          value: [0.2, 0.4, 0.7]
        },
        fogNearFar: {
          value: [100, 10000]
        }
      },

      side: DoubleSide,
      transparent: true,
      depthWrite: true
    });
  }
}
