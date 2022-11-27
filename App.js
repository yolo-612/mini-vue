import { reactive, h } from "./core/index.js";
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

    return h("div", { id: "yolo" }, [
      h("p", {}, "nihao"),
      h("p", {}, String(context.obj.count)),
    ]);
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
