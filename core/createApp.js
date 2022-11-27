import { effectWatch } from "./reactivity.js";
import { mountElement, diff } from "./render.js";

export function createApp(rootComponent) {
  // app
  return {
    // mount(rootContainer) {
    //   // mini-vue-3中的这步就是挂载
    //   // App.render(App.setup());
    //   const setupResult = rootComponent.setup();
    //   let prevSubTree;

    //   // render -> effectWatch(之前)
    //   // effectWatch -> render(现在)
    //   effectWatch(() => {
    //     rootContainer.textContent = ``;
    //     // 这个就相当于是书写的一个vue组件[只关心这个组件的视图],后续挂在载#app下面
    //     const subTree = rootComponent.render(setupResult);
    //     console.log("old", prevSubTree);
    //     console.log("new", subTree);
    //     prevSubTree = subTree;
    //     mountElement(subTree, rootContainer);
    //   });
    // },
    mount(rootContainer) {
      // mini-vue-3中的这步就是挂载
      // App.render(App.setup());
      const setupResult = rootComponent.setup();
      let prevSubTree;
      let isMounted = false; // 是否初始化 挂载

      // render -> effectWatch(之前)
      // effectWatch -> render(现在)
      effectWatch(() => {
        if (!isMounted) {
          isMounted = true;
          // 这个就相当于是书写的一个vue组件[只关心这个组件的视图],后续挂在载#app下面
          const subTree = rootComponent.render(setupResult);
          prevSubTree = subTree;
          mountElement(subTree, rootContainer);
        } else {
          // 这个就相当于是书写的一个vue组件[只关心这个组件的视图],后续挂在载#app下面
          const subTree = rootComponent.render(setupResult);
          console.log("old", prevSubTree);
          console.log("new", subTree);
          // diff算法
          diff(prevSubTree, subTree);
          prevSubTree = subTree;
        }
      });
    },
  };
}
