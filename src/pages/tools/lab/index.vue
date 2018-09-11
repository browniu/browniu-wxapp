<template>
  <div>
    <div class="click" @click="apitest">
      vibrateLong
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      openID: null
    }
  },
  methods: {
    apitest () {
      wx.vibrateLong()

      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      db.collection('realView').get({
        success: res => {
          console.log(res.data)
          this.setData({
            queryResult: JSON.stringify(res.data, null, 2)
          })
          console.log('[数据库] [查询记录] 成功: ', res)
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