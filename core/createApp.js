import { effectWatch } from "./reactivity.js";

export function createApp(rootComponent) {
  // app
  return {
    mount(rootContainer) {
      // mini-vue-3中的这步就是挂载
      // App.render(App.setup());
      const setupResult = rootComponent.setup();

      // render -> effectWatch(之前)
      // effectWatch -> render(现在)
      effectWatch(() => {
        rootContainer.textContent = ``;
        // 这个就相当于是书写的一个vue组件[只关心这个组件的视图],后续挂在载#app下面
        const element = rootComponent.render(setupResult);
        rootContainer.append(element);
      });
    },
  };
}
