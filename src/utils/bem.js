//


const ELEMENT = '__'
const MODS = '--'

/**
 * (loading,text,__) => loading__text
 * @param name
 * @param el
 * @param symbol
 */
const join = (name, el, symbol) => el ? name + symbol + el : name

/**
 *
 * @param name
 * @param mods 传入需要添加的文本(modify=>需要修改的文本)
 */
const prefix = (name, mods) => {
  // 如果是string的话
  if(typeof mods === 'string') {
    return join(name, mods, MODS)
  }
  // modes是数组的话 递归
  if(Array.isArray(mods)) {
    return mods.map(mod=> {
      prefix(name,mod)
    })
  }
  // 处理对象类型
  let ret = {}
  Object.keys(mods).forEach((key)=> {
    ret[name + MODS + key] = mods[key]
  })
  return ret
}

/**
 * 作为mixin传入组件,methods里面的的方法会被拷贝进组件的methods
 */
export const bMixin = {
  methods: {
    b(el, mods){
      // es6的数组结构=> 从options中取出键为name的值 this.$options是vue数组的初始化参数
      const {name} = this.$options

      //  b({a:b}) 对象或者数组, 参数后移动
      if(el && typeof el !== 'string') {
        mods = el
        el = ''
      }

      // 先把拼接name和下划线赋值给 el ex. => button 因为el是空 所以直接返回name
      el = join(name, el, ELEMENT)

      // 处理mods 如果有传入mods文本参数的话 返回数组
      return mods ? [el,prefix(el, mods)] : el
    }
  }
}






