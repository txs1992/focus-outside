<template>
  <div class="page-simple">
    <el-button type="mini" ref="btn-one">按钮1</el-button>
    <el-button type="mini" ref="btn-two">按钮2</el-button>
    <iframe src="https://txs1992.github.io/fast-amap/"></iframe>
  </div>
</template>

<script>
import {
  bind as focusBind,
  unbind as focusUnbind,
} from '../../packages/index.js'

export default {
  data() {
    return {}
  },

  mounted() {
    const btnOne = this.$refs['btn-one']
    const btnTwo = this.$refs['btn-two']

    if (btnOne && btnTwo) {
      focusBind(btnOne, this.outsideOne, 'out-one')
       focusBind(btnTwo, this.outsideTwo, 'out-two')
    }
  },

  outsideOne() {
     console.log('outsideOne')
     const btnOne = this.$refs['btn-one']
     if (btnOne) {
 focusBind(btnOne, this.outsideOne, 'out-one')
     }
  },

  outsideTwo() {
    console.log('outsideTwo')
    const btnOne = this.$refs['btn-one']
     if (btnOne) {
 focusBind(btnOne, this.outsideOne, 'out-one')
     }
  },
}
</script>

<style lang="scss">
.page-simple {
  iframe {
    width: 100%;
    height: 500px;
  }
}
</style>
