import{r as x,o as h,a as _,c as v,b as m,d as e,e as w,f as y}from"./vendor.c936df95.js";const L=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function c(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=c(t);fetch(t.href,r)}};L();var S=(u,n)=>{const c=u.__vccOpts||u;for(const[i,t]of n)c[i]=t;return c};const A={ref:"container",class:"ssss"},E={setup(u){const n=x(null),c=x(null),i=r=>{const a=new e.exports.Engine(r);var o=new e.exports.Scene(a);new e.exports.ArcRotateCamera("camera",-.1,2,10,new e.exports.Vector3(0,0,0),o).attachControl(r,!0),o.debugLayer.show(),new e.exports.HemisphericLight("light",new e.exports.Vector3(0,1,0),o);const l=new e.exports.PBRMaterial("alphabetMat",o);l.metallic=0,l.roughness=.5;const s=new e.exports.Texture("14-3.jpg",o);s.vScale=-1.3,s.uScale=-3.79,s.uOffset=3.81,s.vOffset=.99,s.wrapU=e.exports.Texture.CLAMP_ADDRESSMODE,s.wrapV=e.exports.Texture.CLAMP_ADDRESSMODE,l.albedoTexture=s,e.exports.SceneLoader.LoadAssetContainer("/models/tableTent/","TableTentConverted2.gltf",o,d=>{const p=d.meshes;p.forEach(f=>{f.scaling=new e.exports.Vector3(.14,.14,.14)}),p[1].material=l,d.addAllToScene()}),a.runRenderLoop(()=>{o.render()})},t=r=>{const a=new e.exports.Engine(r),o=new e.exports.Scene(a);new e.exports.ArcRotateCamera("camera",-.1,2,10,new e.exports.Vector3(0,0,0),o).attachControl(r,!0),o.debugLayer.show(),new e.exports.HemisphericLight("light",new e.exports.Vector3(0,1,0),o);const l=new e.exports.PBRMaterial("capMat",o);l.metallic=0,l.roughness=.5;const s=new e.exports.Texture("/src/assets/J9sAWPD.jpg",o);s.vScale=-4.02,s.uScale=-1.4,s.uOffset=1.04,s.vOffset=1.03,s.wrapU=e.exports.Texture.CLAMP_ADDRESSMODE,s.wrapV=e.exports.Texture.CLAMP_ADDRESSMODE,l.albedoTexture=s,e.exports.SceneLoader.LoadAssetContainer("/models/mug/","caneca.gltf",o,function(d){const p=d.meshes;p[0].scaling=new e.exports.Vector3(10,10,10),p.forEach(f=>{f.scaling=new e.exports.Vector3(10,10,10)}),console.log(p),p[1].material=l,d.addAllToScene()}),a.runRenderLoop(()=>{o.render()})};return h(()=>{console.log(n.value),n.value&&(n.value.style.width="700px",c.value.style.width="700px",t(n.value),i(c.value))}),(r,a)=>(_(),v("div",A,[m("canvas",{style:{position:"fixed",left:"350px"},ref_key:"canvasEl",ref:n},null,512),m("canvas",{style:{position:"fixed",left:"350px",top:"450px"},ref_key:"canvasEl2",ref:c},null,512)],512))}};var T=S(E,[["__scopeId","data-v-3232f8f1"]]);const b={setup(u){return(n,c)=>(_(),w(T))}};y(b).mount("#app");
