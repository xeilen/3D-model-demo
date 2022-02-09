<template>
  <div class="container">
    <div class="configuration">
      <form>
        <div class="select-model">
          <select
              class="form-select"
              v-model="selectedModel"
              aria-label="Default select example"
          >
            <option disabled value="" selected>Select model...</option>
            <option value="Mug">Mug</option>
            <option value="tableTent">Table Tent</option>
          </select>
        </div>

        <div class="specs" v-if="selectedModel">
          <div v-for="spec in specs[selectedModel]" class="spec-item mt-3">
            <label>
              <span class="form-label">{{ spec.label }}: </span>
              <input
                  class="form-control"
                  type="number"
                  v-model="spec.value"
              >
            </label>
          </div>

          <div class="mt-3">
            <label>
              <span class="form-label">Image: </span>
              <input
                  type="file"
                  class="form-control"
                  @change="handleImage"
                  accept="image/jpeg/*"
              >
            </label>
          </div>
        </div>

        <button
            class="mt-3 btn btn-primary"
            :disabled="!selectedModel"
            @click.prevent="generate()"
        >
          Generate
        </button>
      </form>
    </div>

    <div id="canvas-container"></div>
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

const image = ref('null');

const handleImage = (e) => {
  const selectedImage = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    image.value = reader.result;
  }

  reader.readAsDataURL(selectedImage);
}

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

const generate = () => {
  const canvasContainer = document.getElementById('canvas-container');
  let canvas = document.getElementById('canvas');

  if (canvas) {
    canvas.remove();
  }

  canvas = document.createElement('canvas');
  canvas.id = 'canvas';

  canvasContainer.append(canvas);

  canvas.style.width = '700px';

  if (selectedModel.value === 'Mug') {
    createCap(canvas, image.value)
  }

  if (selectedModel.value === 'tableTent') {
    createTableTent(canvas, image.value)
  }

}

const createTableTent = (canvas, image) => {
  const defaultWidth = 50;
  const defaultHeight = 100;
  const defaultInnerWidth = 70;

  const computedWidth = width.value / defaultWidth;
  const computedHeight = height.value / defaultHeight;
  const computedInnerWidth = innerWidth.value / defaultInnerWidth;

  const engine = new BABYLON.Engine(canvas);
  const scene = new BABYLON.Scene(engine);


  const camera = new BABYLON.ArcRotateCamera("camera", -0.2, 1.5, 10, new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);

  // scene.debugLayer.show();

  //light
  new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene)
  // new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, -1, 0), scene)

  // material
  const outsideMat = new BABYLON.PBRMaterial('outsideMat', scene);
  outsideMat.backFaceCulling = false;
  outsideMat.metallic = 0;
  outsideMat.roughness = 0.5;

  const insideMat = new BABYLON.PBRMaterial('insideMat', scene);
  insideMat.metallic = 0;
  insideMat.roughness = 0.5;

  // texture
  const outsideTexture = new BABYLON.Texture(image, scene);
  outsideMat.albedoTexture = outsideTexture;

  const insideTexture = new BABYLON.Texture('paper.jpg', scene);
  insideMat.albedoTexture = insideTexture;

  // load model
  BABYLON.SceneLoader.LoadAssetContainer('/models/DownloadedTableTent/', 'DonwloadedTableTent2.gltf', scene, (container) => {
    const meshes = container.meshes;
    meshes[0].scaling = new BABYLON.Vector3(25 * computedWidth,25 * computedHeight,25 * computedInnerWidth)
    meshes[0].position.y = -2;

    meshes[1].material = insideMat;
    meshes[2].material = outsideMat;


    container.addAllToScene();
  })

  engine.runRenderLoop(() => {
    scene.render();
  })
}

const createCap = (canvas, image) => {
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
  const capTexture = new BABYLON.Texture(image, scene);
  capTexture.vScale = -4.02;
  capTexture.uScale = -1.4;
  capTexture.uOffset = 1.04;
  capTexture.vOffset = 1.03;
  capTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
  capTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
  capMat.albedoTexture = capTexture;
  // console.log(computedHeight, computedRadius)

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
    meshes[0].material = capMat

    container.addAllToScene();

  });

  engine.runRenderLoop(() => {
    scene.render();
  })
}
</script>



<style scoped>
.container {
  display: flex;
}

.configuration {
  flex-basis: 400px;
}

#canvas-container {
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
