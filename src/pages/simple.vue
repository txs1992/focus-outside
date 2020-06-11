<template>
  <div class="page-simple">
    <el-button type="mini" ref="btn-one">相同 key 的 按钮 1</el-button>
    <el-button type="mini" ref="btn-two">相同 Key 的 按钮 2</el-button>
    <el-button type="mini" ref="btn-three">不同 key 的 按钮 1</el-button>
    <el-button type="mini" ref="btn-four">不同 Key 的 按钮 2</el-button>
    <iframe src="https://segmentfault.com/blogs/hottest/monthly"></iframe>
  </div>
</template>

<script>
import { bind as focusBind, unbind as focusUnbind } from '../../packages/index.js'

export default {
  data() {
    return {}
  },

  mounted() {
    const btnOne = this.$refs['btn-one'].$el
    const btnTwo = this.$refs['btn-two'].$el
    const btnThree = this.$refs['btn-three'].$el
    const btnFour = this.$refs['btn-four'].$el

    if (btnOne && btnTwo && btnThree && btnFour) {
      focusBind(btnOne, this.outsideOne, 'btn', 'out-one')
      focusBind(btnTwo, this.outsideTwo, 'btn', 'out-two')
      focusBind(btnThree, this.outsideThree, 'key-one', 'out-three')
      focusBind(btnFour, this.outsideFour, 'key-two', 'out-four')
    }
  },

  beforeDestroy() {
    const btnOne = this.$refs['btn-one'].$el
    const btnTwo = this.$refs['btn-two'].$el
    const btnThree = this.$refs['btn-three'].$el
    const btnFour = this.$refs['btn-four'].$el

    if (btnOne && btnTwo && btnThree && btnFour) {
      focusUnbind(btnOne)
      focusUnbind(btnTwo)
      focusUnbind(btnThree)
      focusUnbind(btnFour)
    }
  },

  methods: {
    outsideOne() {
      console.log('outsideOne')
    },

    outsideTwo() {
      console.log('outsideTwo')
    },

    outsideThree() {
      console.log('outsideThree')
    },

    outsideFour() {
      console.log('outsideFour')
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
