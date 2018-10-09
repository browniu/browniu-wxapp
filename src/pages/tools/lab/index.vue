<template>
  <div>
    {{weatherData}}
  </div>
</template>

<script>

export default {
  data () {
    return {
      openID: null,
      json: {},
      weatherData: 'weather'
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
</style>