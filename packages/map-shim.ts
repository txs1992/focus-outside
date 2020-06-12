interface IMap {
  set(key: any, value: any): void
  get(key: any): any
  has(key: any): boolean
  delete(key: any): boolean
  clear(): void
  find(key: any): any
  values(): any
  entries(): any[]
}

export default class Map implements IMap {
  private maps: any[] = []
  private size: number = 0

  find(key: any): any {
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

  has(key: any) {
    if (this.find(key)) return true
    return false
  }

  delete(key: any) {
    const result = this.find(key)
    if (!result) return false
    this.maps.splice(result.index, 1)
    this.size--
    return true
  }

  clear() {
    this.maps = []
    this.size = 0
  }

  values() {
    return this.maps.map((item) => item[1])
  }

  entries() {
    return this.maps
  }
}
