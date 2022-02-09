import{r as g,a as k,o as b,c as S,b as s,w as E,v as W,F as P,d as F,u as N,e as U,f as j,p as $,g as q,t as G,h as K,i as e,j as z,k as J}from"./vendor.b9343521.js";const Q=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))v(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const _ of a.addedNodes)_.tagName==="LINK"&&_.rel==="modulepreload"&&v(_)}).observe(document,{childList:!0,subtree:!0});function d(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerpolicy&&(a.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?a.credentials="include":o.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function v(o){if(o.ep)return;o.ep=!0;const a=d(o);fetch(o.href,a)}};Q();var X=(c,i)=>{const d=c.__vccOpts||c;for(const[v,o]of i)d[v]=o;return d};const w=c=>($("data-v-7b469658"),c=c(),q(),c),Y={class:"container"},Z={class:"configuration"},ee={class:"select-model"},te=w(()=>s("option",{disabled:"",value:"",selected:""},"Select model...",-1)),oe=w(()=>s("option",{value:"Mug"},"Mug",-1)),se=w(()=>s("option",{value:"tableTent"},"Table Tent",-1)),ae=[te,oe,se],ne={key:0,class:"specs"},re={class:"spec-item mt-3"},le={class:"form-label"},ce=["onUpdate:modelValue"],ie={class:"mt-3"},de=w(()=>s("span",{class:"form-label"},"Image: ",-1)),ue=["disabled"],pe=w(()=>s("div",{id:"canvas-container"},null,-1)),me={setup(c){const i=g(50),d=g(100),v=g(70),o=g(45),a=g(120),_=g("null"),D=l=>{const t=l.target.files[0],n=new FileReader;n.onloadend=()=>{_.value=n.result},n.readAsDataURL(t)},f=g(""),I=k({Mug:[{label:"Height",value:a},{label:"Radius",value:o}],tableTent:[{label:"Width",value:i},{label:"Height",value:d},{label:"Bottom",value:v}]}),V=()=>{const l=document.getElementById("canvas-container");let t=document.getElementById("canvas");t?(t.remove(),t=document.createElement("canvas"),t.id="canvas",l.append(t)):(t=document.createElement("canvas"),t.id="canvas",l.append(t)),t.style.width="700px",f.value==="Mug"&&B(t,_.value),f.value==="tableTent"&&H(t,_.value)},H=(l,t)=>{const n=50,x=100,y=70,L=i.value/n,T=d.value/x,u=v.value/y,A=new e.exports.Engine(l),r=new e.exports.Scene(A);new e.exports.ArcRotateCamera("camera",-.1,2,10,new e.exports.Vector3(0,0,0),r).attachControl(l,!0),new e.exports.HemisphericLight("light",new e.exports.Vector3(0,1,0),r);const m=new e.exports.PBRMaterial("outsideMat",r);m.backFaceCulling=!1,m.metallic=0,m.roughness=.5;const h=new e.exports.PBRMaterial("insideMat",r);h.metallic=0,h.roughness=.5;const C=new e.exports.Texture(t,r);m.albedoTexture=C;const O=new e.exports.Texture("paper.jpg",r);h.albedoTexture=O,e.exports.SceneLoader.LoadAssetContainer("/models/DownloadedTableTent/","DonwloadedTableTent2.gltf",r,R=>{const M=R.meshes;M[0].scaling=new e.exports.Vector3(25*L,25*T,25*u),M[0].position.y=-2,M[1].material=h,M[2].material=m,R.addAllToScene()}),A.runRenderLoop(()=>{r.render()})},B=(l,t)=>{const n=45,x=120,y=o.value/n,L=a.value/x,T=new e.exports.Engine(l),u=new e.exports.Scene(T);new e.exports.ArcRotateCamera("camera",-.1,2,10,new e.exports.Vector3(0,0,0),u).attachControl(l,!0),new e.exports.HemisphericLight("light",new e.exports.Vector3(0,1,0),u);const r=new e.exports.PBRMaterial("capMat",u);r.metallic=0,r.roughness=.5;const p=new e.exports.Texture(t,u);p.vScale=-4.02,p.uScale=-1.4,p.uOffset=1.04,p.vOffset=1.03,p.wrapU=e.exports.Texture.CLAMP_ADDRESSMODE,p.wrapV=e.exports.Texture.CLAMP_ADDRESSMODE,r.albedoTexture=p,e.exports.SceneLoader.LoadAssetContainer("/models/mug/","caneca.gltf",u,function(m){const h=m.meshes;h.forEach(C=>{C.scaling=new e.exports.Vector3(10*y,10*L,10*y)}),h[1].material=r,m.addAllToScene()}),T.runRenderLoop(()=>{u.render()})};return(l,t)=>(b(),S("div",Y,[s("div",Z,[s("form",null,[s("div",ee,[E(s("select",{class:"form-select","onUpdate:modelValue":t[0]||(t[0]=n=>f.value=n),"aria-label":"Default select example"},ae,512),[[W,f.value]])]),f.value?(b(),S("div",ne,[(b(!0),S(P,null,F(N(I)[f.value],n=>(b(),S("div",re,[s("label",null,[s("span",le,G(n.label)+": ",1),E(s("input",{class:"form-control",type:"number","onUpdate:modelValue":x=>n.value=x},null,8,ce),[[K,n.value]])])]))),256)),s("div",ie,[s("label",null,[de,s("input",{type:"file",class:"form-control",onChange:D,accept:"image/jpeg/*"},null,32)])])])):U("",!0),s("button",{class:"mt-3 btn btn-primary",disabled:!f.value,onClick:t[1]||(t[1]=j(n=>V(),["prevent"]))}," Generate ",8,ue)])]),pe]))}};var ve=X(me,[["__scopeId","data-v-7b469658"]]);const _e={setup(c){return(i,d)=>(b(),z(ve))}};J(_e).mount("#app");