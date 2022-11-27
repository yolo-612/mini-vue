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

function remove(el, parent) {
  parent.removeChild(el);
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
    // 3. children
    // new -> string array
    // old -> string array
    // 1 new string  | old string
    // 2 new string  | old array
    // 1 new array  | old string
    // 1 new array  | old array

    const newChildren = n2.children;
    const oldChildren = n1.children;
    if (typeof newChildren === "string") {
      if (typeof oldChildren === "string") {
        if (newChildren !== oldChildren) {
          el.innerText = newChildren;
        }
      } else if (Array.isArray(oldChildren)) {
        el.innerText = newChildren;
      }
    } else if (Array.isArray(newChildren)) {
      if (typeof oldChildren === "string") {
        el.innerText = "";
        newChildren.forEach((v) => {
          mountElement(v, el);
        });
      } else if (Array.isArray(oldChildren)) {
        // TODO: 顺序没有 改变的情况下
        // 1. 依次对比
        // new ->  [a,b,c]
        // old ->  [a,b,c]
        // 2. new > old  add
        // new ->  [a,b,c]
        // old ->  [a,b]
        // 3. new < old  remove
        // new ->  [a,b]
        // old ->  [a,b, c]

        // 先找出公共长
        const length = Math.min(newChildren.length, oldChildren.length);
        // 依次对比
        for (let i = 0; i < length; i++) {
          const newVnode = newChildren[i];
          const oldVnode = oldChildren[i];
          diff(oldVnode, newVnode);
        }
        // 2. new > old  add
        if (newChildren.length > length) {
          for (let i = length; i < newChildren.length; i++) {
            const vnode = newChildren[i];
            mountElement(vnode, el);
          }
        }

        // 3. new < old  remove
        if (oldChildren.length > length) {
          for (let i = length; i < oldChildren.length; i++) {
            const vnode = oldChildren[i];
            remove(vnode.el, el);
          }
        }
      }
    }
  }
}
