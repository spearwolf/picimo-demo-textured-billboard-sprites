import {
  SpriteGroup,
  SpriteGroupInstancedBufferGeometry,
  SpriteGroupMesh,
  SpriteGroupTextured,
  VODescriptor,
  VOIndices
} from "picimo";

const createBaseVODescriptor = () =>
  new VODescriptor({
    vertexCount: 4,
    attributes: [
      {
        name: "position",
        size: 2
      },
      {
        name: "uv",
        scalars: ["s", "t"]
      }
    ],
    methods: {
      setSize(w, h) {
        // [0]-----[1]
        //  |       |
        //  |       |
        // [3]-----[2]
        this.setPosition(
          // --- 0
          -w / 2,
          h / 2,
          // --- 1
          w / 2,
          h / 2,
          // --- 2
          w / 2,
          -h / 2,
          // --- 3
          -w / 2,
          -h / 2
        );
      }
    }
  });

const createInstanceVODescriptor = () =>
  new VODescriptor({
    attributes: [
      {
        name: "centerPosition",
        scalars: ["centerX", "centerY", "centerZ"]
      },
      {
        name: "particleSize",
        scalars: ["width", "height"]
      },
      {
        name: "tex",
        scalars: ["originS", "originT", "maxS", "maxT"]
      }
    ],
    methods: {
      setTexCoordsByTexture({ minS, minT, maxS, maxT }) {
        this.setTex(minS, minT, maxS - minS, maxT - minT);
      },

      setSize(w, h) {
        this.width = w;
        this.height = h;
        return this;
      },

      translate(x, y, z) {
        this.centerX = x;
        this.centerY = y;
        this.centerZ = z;
        return this;
      }
    }
  });

const createBaseSpriteGroup = () => {
  const spriteGroup = new SpriteGroup(createBaseVODescriptor(), {
    indices: VOIndices.buildQuads,
    setSize: (sprite, w, h) => sprite.setSize(w, h),
    dynamic: false,
    capacity: 1
  });
  spriteGroup.createSprite(1, 1).setUv(0, 1, 1, 1, 1, 0, 0, 0);
  return spriteGroup;
};

const createInstanceSpriteGroup = (options) =>
  new SpriteGroupTextured(createInstanceVODescriptor(), {
    indices: VOIndices.buildQuads,
    dynamic: false,
    autotouch: false,
    setSize: (sprite, w, h) => sprite.setSize(w, h),
    setTexCoordsByTexture: (sprite, texture) =>
      sprite.setTexCoordsByTexture(texture),
    ...options
  });

export class TexturedBillboardMesh extends SpriteGroupMesh {
  constructor(options) {
    const sprites = createInstanceSpriteGroup(options);
    const geometry = new SpriteGroupInstancedBufferGeometry(
      createBaseSpriteGroup(),
      sprites
    );
    super(geometry, null);
    this.sprites = sprites;
    this.frustumCulled = false;
  }

  dispose() {
    super.dispose();
    this.sprites.voPool.freeAll();
  }
}
