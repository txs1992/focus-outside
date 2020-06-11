// export default function Map() {
//   let maps = [] // maps = [[k,v],[k,v]]

//   function set(key, value) {
//     const result = find(key)
//     if (result) {
//       maps[result.index][1] = value
//     } else {
//       maps.push([key, value])
//       this.size++
//     }
//     return this
//   }

//   function get(key) {
//     const result = find(key)
//     return result && result.value
//   }

//   function has(key) {
//     if (find(key)) return true
//     return false
//   }

//   function remove(key) {
//     const result = find(key)
//     if (!result) return false
//     maps.splice(result.index, 1)
//     this.size--
//     return true
//   }

//   function clear() {
//     maps = []
//     this.size = 0
//   }

//   function find(key) {
//     for (let i = 0; i < maps.length; i++) {
//       if (maps[i][0] === key) return { index: i, value: maps[i][1], key }
//     }
//   }

//   function values() {
//     return maps.map((item) => item[1])
//   }

//   function entries() {
//     return maps
//   }

//   return {
//     get,
//     set,
//     has,
//     size: 0,
//     clear,
//     values,
//     entries,
//     delete: remove,
//   }
// }

interface IMap {
  maps: any[]
  size: number
  set(key: any, value: any): void
  get(key: any): any
  has(): boolean
  delete(): boolean
  clear(): void
  find(key: any): any
  values(): any
  entries(): any[]
}

export default class Map implements IMap {
  maps: any[] = []
  size: number = 0

  find(key: any) {
    for (let i = 0; i < this.maps.length; i++) {
      if (this.maps[i][0] === key) return { index: i, value: this.maps[i][1], key }
    }
  }

  set(key: any, value: any) {
    const result = this.find(key)
    if (result) {
      this.maps[result.index][1] = value
    } else {
      this.maps.push([key, value])
      this.size++
    }
    return this
  }

  get(key: any) {
    const result = this.find(key)
    return result && result.value
  }
}
