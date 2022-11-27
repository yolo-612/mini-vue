import { reactive, h } from "./core/index.js";

window.h = h;

export const App = {
  render(context) {
    // ui
    // const element = document.createElement("div");
    // const text = document.createTextNode("hello Yolo");
    // const text1 = document.createTextNode(context.obj.count);
    // element.append(text);
    // element.append(text1);
    // return element;
    // 换成 createVNode的方式
    // return h("div", { id: "yolo" }, "hahah");
    // return h("div", { id: "yolo" }, [
    //   h("p", {}, "nihao"),
    //   h("p", {}, String(context.obj.count)),
    // ]);
    // 1:验证不同的tag
    // return h(context.obj.tag, {}, "1");
    // 2: 验证不同的props[add, remove]
    // return h("div", context.obj.props, "1");
    // 3: 验证children new 为 string old [string| array]
    return h("div", context.obj.props, context.obj.children);
  },
  setup() {
    // 1:验证不同的tag
    // const obj = reactive({
    //   count: 1,
    //   tag: "div",
    // });
    // 2: 验证不同的props[add, remove]
    // const obj = reactive({
    //   count: 1,
    //   tag: "div",
    //   props: { a: "a", b: "b" },
    // });
    // 3: 验证children new 为 string old [string| array]
    const obj = reactive({
      count: 1,
      tag: "div",
      props: { a: "a", b: "b" },
      // children: "hahdd",
      children: [h("p", {}, "1"), h("p", {}, "2")],
    });
    window.obj = obj;
    return {
      obj,
    };
  },
};
