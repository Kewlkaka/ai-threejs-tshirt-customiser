import { proxy } from "valtio";

const state = proxy({
  intro: true, //are we currently on the homepage?
  color: "#EFBD48", //default color
  isLogoTexture: true, //are we currently displaying logo on the shirt
  isFullTexture: false,
  logoDecal: "./threejs.png", //initial decal logo
  fullDecal: "./threejs.png",
});

export default state;
