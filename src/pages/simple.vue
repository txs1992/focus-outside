<template>
  <div class="page-simple">
    <el-button type="mini" ref="btn-one">相同 key 的 按钮 1</el-button>
    <el-button type="mini" ref="btn-two">相同 Key 的 按钮 2</el-button>
    <el-button type="mini" ref="btn-three">不同 key 的 按钮 1</el-button>
    <el-button type="mini" ref="btn-four">不同 Key 的 按钮 2</el-button>
    <iframe src="https://segmentfault.com/blogs/hottest/monthly"></iframe>
  </div>
</template>

<script lang="ts" src="./simple.ts"></script>

<style lang="scss">
.page-simple {
  iframe {
    width: 100%;
    height: 500px;
  }
}
</style>
