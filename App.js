import { reactive, effectWatch } from "./core/index.js";
export const App = {
  render(context) {
    // ui
    const element = document.createElement("div");
    const text = document.createTextNode("hello Yolo");
    const text1 = document.createTextNode(context.obj.count);
    element.append(text);
    element.append(text1);
    return element;
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
