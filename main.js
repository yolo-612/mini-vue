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

// ref测试代码
import { Dep, effectWatch, reactive } from "./core/index.js";

// const a = new Dep(10);
// let b = 0;

// effectWatch(() => {
//   b = a.value + 10;
//   console.log(b);
// });

// a.value = 20;

// reactive测试代码
// {} -> reactive
// 诉求
// const user = reactive({
//   age: 10,
// });

// let nextAge = 0;
// effectWatch(() => {
//   nextAge = user.age + 1;
//   console.log(nextAge);
// });

// user.age++;

// mini-vue：以前是代码，现在改成视图(UI)
// 测试一：
// const context = reactive({
//   count: 0,
// });

// window.context = context;
// effectWatch(() => {
//   // ui
//   document.querySelector("#app").textContent = ``;
//   const element = document.createElement("div");
//   const text = document.createTextNode("hello Yolo");
//   const text1 = document.createTextNode(context.count);
//   element.append(text);
//   element.append(text1);
//   document.querySelector("#app").append(element);
// });

// 测试二：常见的组件形式
const App = {
  // **template -> render**
  render(context) {
    effectWatch(() => {
      // ui
      document.querySelector("#app").textContent = ``;
      const element = document.createElement("div");
      const text = document.createTextNode("hello Yolo");
      const text1 = document.createTextNode(context.obj.count);
      element.append(text);
      element.append(text1);
      document.querySelector("#app").append(element);
    });
  },
  setup() {
    const obj = reactive({
      count: 1,
    });
    window.obj = obj;
    return {
      obj,
    };
  },
};

App.render(App.setup());

// 暂存在缺点：
// 1. dom是写死的，无法跨平台;
// 2. 目前UI这套 是整体切换【document.querySelector("#app").textContent = ``; 再append】; 花销大
