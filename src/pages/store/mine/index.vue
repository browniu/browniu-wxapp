<template>
  <div>
    store mine
    <div class="backHome" @click="backHome">
      back home
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    backHome () {
      wx.redirectTo({
        url: '../../index/main'
      })
    }
  },
  onShow () {
    this.backHome()
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
</style>