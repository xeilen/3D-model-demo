<template>
  <div ref="container" class="ssss">
    <div>
      <label>
        <span>Width: </span>
        <input type="number" placeholder="Width" v-model="width">
      </label>
      <label>
        <span>Height: </span>
        <input type="number" placeholder="Height" v-model="height">
      </label>
      <label>
        <span>InnerWidth: </span>
        <input type="number" placeholder="Angle" v-model="innerWidth">
      </label>
      <input type="button" value="generate" @click="generate(canvasEl2, width, height, innerWidth)">
    </div>
    <canvas style="position: fixed; left: 350px" ref="canvasEl"></canvas>
    <canvas style="position: fixed; left: 350px; top: 150px" ref="canvasEl2"></canvas>
  </div>

</template>
<script setup>
import * as BABYLON from 'babylonjs';
import "@babylonjs/inspector"
import 'babylonjs-loaders'
import {onMounted, ref} from "vue";

const width = ref(50);
const height = ref(100);
const innerWidth = ref(70);

const generate = (canvas, width, height, innerWidth) => {
  const defaultWidth = 50;
  const defaultHeight = 100;
  const defaultInnerWidth = 70;

  const computedWidth = width / defaultWidth;
  const computedHeight = height / defaultHeight;
  const computedInnerWidth = innerWidth / defaultInnerWidth;
  console.log(computedWidth, computedHeight)
  createTableTent(canvas, computedWidth, computedHeight, computedInnerWidth)
}

const canvasEl = ref(null);
const canvasEl2 = ref(null);
// const canvasEl2 = ref(null);

const createTableTent = (canvas, width, height, angle) => {
  const engine = new BABYLON.Engine(canvas);
  var scene = new BABYLON.Scene(engine);


  const camera = new BABYLON.ArcRotateCamera("camera", -0.1, 2, 10, new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);

  scene.debugLayer.show();

  //light
  new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene)
  // new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, -1, 0), scene)

  // material
  const alphabetMat = new BABYLON.PBRMaterial('alphabetMat', scene);
  alphabetMat.backFaceCulling = false;
  alphabetMat.metallic = 0;
  alphabetMat.roughness = 0.5;

  // texture
  const alphabetTexture = new BABYLON.Texture('/src/assets/14.jpg', scene);
  // alphabetTexture.vScale = -1.3;
  // alphabetTexture.uScale = -3.79;
  // alphabetTexture.uOffset = 3.81;
  // alphabetTexture.vOffset = 0.99;
  // alphabetTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
  // alphabetTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
  alphabetMat.albedoTexture = alphabetTexture;

  // load model
  BABYLON.SceneLoader.LoadAssetContainer('/models/TableTentBlender/', 'TableTentBlender.gltf', scene, (container) => {
    const meshes = container.meshes;
    meshes[0].scaling = new BABYLON.Vector3(angle, height, width)
    console.log(meshes[0])

    // meshes[0].scaling = new BABYLON.Vector3(0.14, 0.14, 0.14)

    meshes.forEach( m => {
      console.log(m)
      m.material = alphabetMat
      // m.rotation = new BABYLON.Vector3(0,0,0)
      // m.scaling = new BABYLON.Vector3(
      //     1,
      //     0,
      //     0,
      // );
    })

    // meshes[3].material = alphabetMat

    container.addAllToScene();

  })



  engine.runRenderLoop(() => {
    scene.render();
  })
}

const createCap = (canvas) => {
  const engine = new BABYLON.Engine(canvas);
  const scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera("camera", -0.1, 2, 10, new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);

  scene.debugLayer.show();

  // light
  new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene)
  // new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, -1, 0), scene)

  // material
  const capMat = new BABYLON.PBRMaterial('capMat', scene);
  capMat.metallic = 0;
  capMat.roughness = 0.5;

  // texture
  const capTexture = new BABYLON.Texture('J9sAWPD.jpg', scene);
  capTexture.vScale = -4.02;
  capTexture.uScale = -1.4;
  capTexture.uOffset = 1.04;
  capTexture.vOffset = 1.03;
  capTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
  capTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
  capMat.albedoTexture = capTexture;

  // load model
  BABYLON.SceneLoader.LoadAssetContainer("/models/mug/", 'caneca.gltf', scene, function (container) {
    const meshes = container.meshes;
    meshes[0].scaling = new BABYLON.Vector3(10, 10, 10);
    meshes.forEach( m => {
      m.scaling = new BABYLON.Vector3(
          10,
          10,
          10
      );
    })

    // meshes[0].scaling = new BABYLON.Vector3(10 * 1.5, 10, 10 * 1.5)
    // meshes[2].scaling = new BABYLON.Vector3(12, 10, 10)
    // meshes[3].scaling = new BABYLON.Vector3(12, 10, 10)
    // meshes[5].scaling = new BABYLON.Vector3(10, 6, 10)
    console.log(meshes)
    meshes[1].material = capMat

    container.addAllToScene();

  });


  engine.runRenderLoop(() => {
    scene.render();
  })
}

onMounted(() => {
  console.log(canvasEl.value)
  if (canvasEl.value) {
    canvasEl.value.style.width = '700px'
    canvasEl2.value.style.width = '700px'

    // createCap(canvasEl.value)
    // createTableTent(canvasEl2.value)

  }
})
</script>



<style scoped>
a {
  color: #42b983;
}
</style>
