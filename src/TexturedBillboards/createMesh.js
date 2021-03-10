import { TexturedBillboardMesh } from "./TexturedBillboardMesh";

export default (capacity, options) => {
  return new TexturedBillboardMesh({
    capacity,
    dynamic: false,
    autotouch: false,
    ...options
  });
};
