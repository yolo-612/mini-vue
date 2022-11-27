// 自定义创建[渲染器/渲染动作--不同平台不同处理] 可以实现跨平台
function createElement(tag) {
  return document.createElement(tag);
}

function patchProps(el, key, preValue, nextValue) {
  el.setAttribute(key, nextValue);
}

function insert(el, parent) {
  parent.append(el);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

export function mountElement(vnode, container) {
  // tag
  const { tag, props, children } = vnode;

  // 创建的动作
  const el = createElement(tag);

  // props = {}
  for (const key in props) {
    const val = props[key];
    patchProps(el, key, null, val);
  }

  // children[string, [] ]
  if (typeof children === "string") {
    insert(createTextNode(children), el);
  } else if (Array.isArray(children)) {
    // 数组里面都是一个独立的虚拟节点
    children.forEach((v) => {
      mountElement(v, el);
    });
  }

  // insert
  insert(el, container);
}
