// 自定义创建[渲染器/渲染动作--不同平台不同处理] 可以实现跨平台
function createElement(tag) {
  return document.createElement(tag);
}

function patchProps(el, key, preValue, nextValue) {
  if (nextValue === null) {
    el.removeAttribute(key);
  } else {
    el.setAttribute(key, nextValue);
  }
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
  const el = (vnode.el = createElement(tag));

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

// n1 -> oldNode
// n2 -> newNode
// 需要对比
export function diff(n1, n2) {
  // 1. tag
  if (n1.tag !== n2.tag) {
    n1.el.replaceWith(createElement(n2.tag));
  } else {
    // 2. props
    // 情况分类:
    // 2.1
    // new {a,b}
    // old {a}
    // r -> add b
    // 2.2
    // new {a}
    // old {a,b}
    // r -> remove b
    const newProps = n2.props;
    const oldProps = n1.props;

    const el = (n2.el = n1.el);
    if (newProps) {
      for (const key in newProps) {
        if (newProps[key] !== oldProps[key]) {
          patchProps(el, key, oldProps[key], newProps[key]);
        }
      }
    }

    if (oldProps) {
      for (const key in oldProps) {
        if (!(key in newProps)) {
          patchProps(el, key, oldProps[key], null);
        }
      }
    }
  }
  // 2. props

  // 3. children
}
