<template>
  <div class="container">
    <div class="configuration">
      <form>
        <div class="select-model">
          <select class="form-select" v-model="selectedModel" aria-label="Default select example">
            <option disabled value="" selected>Select model...</option>
            <option value="Mug">Mug</option>
            <option value="tableTent">Table Tent</option>
          </select>
        </div>

        <div class="specs" v-if="selectedModel">
          <div v-for="spec in specs[selectedModel]" class="spec-item mt-3">
            <label>
              <span class="form-label">{{ spec.label }}: </span>
              <input class="form-control" type="number" v-model="spec.value">
            </label>
          </div>
        </div>

        <button class="mt-3 btn btn-primary" :disabled="!selectedModel" @click.prevent="generate(canvasEl)">Generate</button>
      </form>

<!--      {{ selectedModel }}-->

    </div>

    <div class="canvas">
      <canvas ref="canvasEl"></canvas>
    </div>
<!-- ed; left: 350px; top: 150px" ref="canvasEl2"></canvas>-->
  </div>

</template>
<script setup>
import * as BABYLON from 'babylonjs';
// import "@babylonjs/inspector"
import 'babylonjs-loaders'
import {onMounted, reactive, ref} from "vue";

const width = ref(50);
const height = ref(100);
const innerWidth = ref(70);
const radius = ref(45)
const mugHeight = ref(120);

const selectedModel = ref('');

const specs = reactive({
      Mug: [
        {
          label: 'Height',
          value: mugHeight,
        },
        {
          label: "Radius",
          value: radius
        }

      ],
      tableTent: [
        {
          label: 'Width',
          value: width,
        },
        {
          label: 'Height',
          value: height
        },
        {
          label: 'Bottom',
          value: innerWidth
        }
      ]

    }
)



const generate = (canvas) => {

  canvas.style.width = '700px';

  let modelPath = '';
  let modelFileName = '';

  if (selectedModel.value === 'Mug') {
    modelPath = '/models/mug/';
    modelFileName = 'caneca.gltf';
    createCap(canvas)
  }

  if (selectedModel.value === 'tableTent') {
    modelPath = '/models/TableTentBlender/';
    modelFileName = 'TableTentBlender.gltf';
    createTableTent(canvas)
  }

  // if (selectedModel)
  // createTableTent(canvas, computedWidth, computedHeight, computedInnerWidth)
}

const canvasEl = ref(null);
const canvasEl2 = ref(null);
// const canvasEl2 = ref(null);

const createTableTent = (canvas) => {
  const defaultWidth = 50;
  const defaultHeight = 100;
  const defaultInnerWidth = 70;

  const computedWidth = width.value / defaultWidth;
  const computedHeight = height.value / defaultHeight;
  const computedInnerWidth = innerWidth.value / defaultInnerWidth;

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
  const alphabetTexture = new BABYLON.Texture('/src/assets/flamingo.jpg', scene);
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
    console.log(meshes)
    meshes[0].scaling = new BABYLON.Vector3(computedInnerWidth, computedHeight, computedWidth)
    meshes[0].position.y = -2
    // console.log(meshes[0])

    // meshes[0].scaling = new BABYLON.Vector3(0.14, 0.14, 0.14)

    meshes.forEach( m => {
      // console.log(m)
      m.material = alphabetMat
      m.subMeshes = [];
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
  const defaultRadius = 45;
  const defaultHeight = 120;

  const computedRadius = radius.value / defaultRadius;
  const computedHeight = mugHeight.value / defaultHeight;

  const engine = new BABYLON.Engine(canvas);
  const scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera("camera", -0.1, 2, 10, new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);

  // scene.debugLayer.show();

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
  console.log(computedHeight, computedRadius)

  // load model
  BABYLON.SceneLoader.LoadAssetContainer("/models/mug/", 'caneca.gltf', scene, function (container) {
    const meshes = container.meshes;
    // meshes[0].scaling = new BABYLON.Vector3(10, 10, 10);
    meshes.forEach( m => {
      m.scaling = new BABYLON.Vector3(
          10 * computedRadius,
          10 * computedHeight,
          10 * computedRadius
      );
    })

    // meshes[0].scaling = new BABYLON.Vector3(10 * 1.5, 10, 10 * 1.5)
    // meshes[2].scaling = new BABYLON.Vector3(12, 10, 10)
    // meshes[3].scaling = new BABYLON.Vector3(12, 10, 10)
    // meshes[5].scaling = new BABYLON.Vector3(10, 6, 10)
    // console.log(meshes)
    meshes[1].material = capMat

    container.addAllToScene();

  });


  engine.runRenderLoop(() => {
    scene.render();
  })
}

onMounted(() => {
  // console.log(canvasEl.value)
  // if (canvasEl.value) {
    // canvasEl.value.style.width = '700px'
    // canvasEl2.value.style.width = '700px'

    // createCap(canvasEl.value)
    // createTableTent(canvasEl2.value)

  // }
})
</script>



<style scoped>
.container {
  display: flex;
}

.configuration {
  flex-basis: 400px;
}

.canvas {
  flex-basis: 100%;
}

@media (max-width: 992px){
  .container {
    flex-direction: column;
  }

  .configuration,
  .canvas {
    flex-basis: 100%;
  }

  canvas {
    margin-top: 40px;
    width: 500px !important;
  }
}
</style>
