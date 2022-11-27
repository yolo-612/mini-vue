# mini-vue

source code train

## ref[响应式]

依赖于@vue/reactivity 模块

1. 首先 npm init -y 初始话项目
2. 创建 main.js index.html 并引入
3. npm i @vue/reactivity
4. 引入 npm 理解 reactivity 的收集依赖触发依赖过程
5. 使用 core 实现 reactivity 的响应式

## reactive[响应式] 针对对象

问题：由于是对象，是有多个属性 如何在对象其中一个属性.age 的时候 就知道
答：使用 proxy 解决 get 的时候就知道访问的 key

问题 2：get 收集依赖使用的 Dep 实例应该和 set 触发依赖 使用的实例是同一个实例 才对 ===》 如何取存储 Dep 实例
即表现为 age ===》 Dep(A) | name ===> Dep(B) ===> 体现为有两层

## mini-vue-3[响应式]

视图上体现响应式【分别以组件的形式以及 webapi 的方法体现】
其中：vue 的 template 会被渲染成 render 函数

## mini-vue-4

vue3 实际使用中的是：
初始化：createApp(App).mount("#app")
将 effectWatch 提取到 render 的外层
const element = rootComponent.render(setupResult)===> 只关心这个组件的视图

## mini-vue-5

优化点 1: 对比前后,只更新值变化的那一部分节点,不需要全局更新 diff

虚拟 dom: 因为操作[get,set]dom 对于浏览器来说比较慢, 采用一个对象表示

// div -> tag
const element = document.createElement("div")

// { id: test }
element.setAttribute("id", "test")

// children [string | []]
element.append(document.createTextNode("nihao"))
element.append(document.createTextNode("nihao"))

后续需要将虚拟 dom 转化成真实的 dom 节点=== render.js[mountElement]

## diff 算法
