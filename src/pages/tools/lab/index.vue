<template>
  <div>
    <img src="../../../../static/images/test.svg" alt="">
  </div>
</template>

<script>
export default {
  data () {
    return {
      openID: null,
      json: {}
    }
  },
  methods: {
    apitest () {
      wx.vibrateLong()
      const db = wx.cloud.database()
      db.collection('realView').get({
        success: res => {
          console.log('[数据库] [查询记录] 成功: ', res)
          this.json = res.data[0].viewInfo
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    }
  },
  mounted () {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        this.openID = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    wx.setNavigationBarTitle({
      title: '实验室'
    })
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
</style>