<template>
  <div>
    <txv-video vid="e0354z3cqjp" playerid="txv1" autoplay="true"></txv-video>
  </div>
</template>

<script>
export default {
  onLoad () {
    const TxvContext = requirePlugin('tencentvideo')
    // txvContext.play()
    var currPlayerId = TxvContext.getLastPlayId()
    // let txvContext = TxvContext.getTxvContext('txv1')
    console.log(currPlayerId)
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
._tx-video {
  height 400px
  width 400px
  display inline-block
  background #000f
}
</style>
