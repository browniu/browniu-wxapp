<template>
  <div>
    <div class="click" @click="apitest">
      vibrateLong
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    apitest () {
      wx.vibrateLong()
      wx.showToast({
        title: '禁制に入る',
        icon: 'none',
        duration: 2000
      })
    }

  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
</style>