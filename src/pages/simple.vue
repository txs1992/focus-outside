<template>
  <div class="page-simple">
    <el-button type="mini" ref="btn-one">按钮1</el-button>
    <el-button type="mini" ref="btn-two">按钮2</el-button>
    <iframe src="https://segmentfault.com/blogs/hottest/monthly"></iframe>
    <!-- <iframe src="https://txs1992.github.io/fast-amap/"></iframe> -->
  </div>
</template>

<script>
import { bind as focusBind } from '../../packages/index.js'

export default {
  data() {
    return {}
  },

  mounted() {
    const btnOne = this.$refs['btn-one'].$el
    const btnTwo = this.$refs['btn-two'].$el

    if (btnOne && btnTwo) {
      focusBind(btnOne, this.outsideOne, 'out-one')
      focusBind(btnTwo, this.outsideTwo, 'out-two')
    }
  },

  methods: {
    outsideOne() {
      console.log('outsideOne')
    },

    outsideTwo() {
      console.log('outsideTwo')
    },
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
