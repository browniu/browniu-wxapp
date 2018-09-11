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
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log('[云函数] [login] user openid: ', res.result.openid)
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
        }
      })
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '实验室'
    })
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
</style>