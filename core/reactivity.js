export class Dep {
  constructor(value) {
    this._val = value;
    this.effects = new Set();
  }

  get value() {
    this.depend();
    return this._val;
  }

  set value(val) {
    this._val = val;
    this.notice();
  }
  // 收集依赖
  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect);
      console.log(this.effects);
    }
  }

  // 触发依赖
  notice() {
    this.effects.forEach((effect) => {
      effect();
    });
  }
}

let currentEffect = null;

// 重点1：必须要在effect里面的参数fn执行 才会收集依赖
export function effectWatch(fn) {
  currentEffect = fn;
  fn();
  currentEffect = null;
}

// 实现的第一个问题：由于是对象，是有多个属性==》 如何在对象其中一个属性.age的时候 就知道 ==》 使用proxy解决 get的时候就知道访问的key
// 第二个问题：get收集依赖使用的Dep实例应该和set触发依赖 使用的实例是同一个实例 才对  ===》 如何取存储Dep实例
// 即表现为 age ===》 Dep(A) | name ===> Dep(B)  ===> 体现为有两层
// 第三个问题：proxy中的get需要返回对应的一个值   return Reflect.get(target, key);
const targetsMap = new Map(); // 所有的reactive过的对象
export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      console.log(target, key);
      // 取到对象对应key的Dep
      let dep = getDep(target, key);

      dep.depend();
      return Reflect.get(target, key); // 更标准化
      // return target.key;
    },
    set(target, key, value) {
      // 取到对象对应key的Dep
      let dep = getDep(target, key);
      const result = Reflect.set(target, key, value);
      dep.notice();
      return result;
    },
  });
}

function getDep(raw, key) {
  let depsMap = targetsMap.get(raw); // 具体reactive的那个对象
  if (!depsMap) {
    depsMap = new Map();
    targetsMap.set(raw, depsMap);
  }
  let dep = depsMap.get(key); // 具体reactive的那个对象的key值
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }
  return dep;
}
