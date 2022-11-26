// import {
//   ref,
//   effect,
// } from "./node_modules/@vue/reactivity/dist/reactivity.esm-browser.js";

// const a = ref(10);
// let b = 0;

// // 重点1：必须要在effect里面的参数fn执行 才会收集依赖
// // 参数为一个fn
// effect(() => {
//   // 触发get操作收集依赖
//   b = a.value + 10;
//   console.log(b);
// });

// // 触发的依赖
// a.value = 20;

import { Dep, effectWatch } from "./core/index.js";

const a = new Dep(10);
let b = 0;

effectWatch(() => {
  b = a.value + 10;
  console.log(b);
});

a.value = 20;
