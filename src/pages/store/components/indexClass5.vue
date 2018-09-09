<template>
  <div>
    index class 5
  </div>
</template>

<script>
export default {
  methods: {
    backHome () {
      wx.navigateTo({
        url: '../../index/main'
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
</style>