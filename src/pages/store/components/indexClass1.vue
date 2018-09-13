<template>
  <div class="index-class">
    <moduleVertical :data="mvData"></moduleVertical>
    <moduleCrossLook :data="mcData"></moduleCrossLook>
    <moduleHorizon :data="mhData"></moduleHorizon>
    <moduleSelect :data="msData"></moduleSelect>
  </div>
</template>

<script>
import moduleVertical from '../components/moduleVertical.vue'
import moduleCrossLook from '../components/moduleCrossLook.vue'
import moduleHorizon from '../components/moduleHorizon.vue'
import moduleSelect from '../components/moduleSelect.vue'
export default {
  components: {
    moduleVertical,
    moduleCrossLook,
    moduleHorizon,
    moduleSelect
  },
  data () {
    return {
      mvData: {
        'title': '人气推荐',
        'list': [
          { 'id': 'g0001', 'title': '人很漂亮 包也很可爱', 'sub': '化妆品收纳袋', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA5MDdfMTQx/MDAxNTM2Mjc5NTE0NTM2.z3i-tOiPZrvTePunb-5s324otGKjM8viBWIWwqxQD0gg.1sI0fx6nEWVCEGCyJ--SWC_T3t9Mj8qzgDDekX3a6BQg.JPEG/image.jpg', 'label': true },
          { 'id': 'g0002', 'title': '让我帮你充个电吧', 'sub': '快速充电宝', 'img': 'https://vos.line-scdn.net/website/uploads/website_1/zh-tw/wpicon_img_430.png?_30104', 'label': true },
          { 'id': 'g0003', 'title': '粉扑扑来了', 'sub': '粉饼', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA5MDdfMTQx/MDAxNTM2MjgzNDIwNDEx.owhCGcT-j1wF99zP7SX-BA8-Z5EpRuSuHt84YCbOmbkg.ON4VfCsNYBZI-qjM6dblSEn8an0OT7XqrEiKuboIflsg.JPEG/image.jpg', 'label': true },
          { 'id': 'g0004', 'title': '带我回家呗', 'sub': '收纳袋', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA4MzFfMTk1/MDAxNTM1NjkwMjMwNzk5.52vnip5Iu4Qfwu3lT-yqPOrGzNJK0lfW4DrTcv5K-ZUg.SW9G_tbgCkhqKC-A5XbNm1CnqyZ86yYD5AI6DUQQkhAg.JPEG/image.jpg', 'label': false }
        ]
      },
      mhData: {
        'title': '专题精选',
        'list': [
          { 'title': '手握乘凉小风扇', 'sub': '如果世界没有风，那就让brown为你制造', 'img': 'https://vos.line-scdn.net/website/uploads/website_1/zh-tw/wpicon_img_391.png', 'price': 128 },
          { 'title': '主题收纳包', 'sub': '可爱美妆大集结！', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA5MDdfMTA2/MDAxNTM2Mjg0ODA2NjA0.hG1PBVS7_vx43AJdhf7D94ppRwwvSguOfzu4yHMsppwg.Ls-toMeJKTwgzdY0X9rymV7NgUw85jWsM-BXs4nAFpYg.PNG/image.png', 'price': 256 },
          { 'title': '真空恒温杯', 'sub': '一杯清凉饮料是夏天都小幸福', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA3MjBfMTAz/MDAxNTMyMDY0ODM5MjAy.8IB15C1ktWq_QPg8SQhBow8iAzp5Zt_8Ig0ijZ6dZ64g.pxB5tHnTyoOGbYGW0DC7lJwGgoBWy4gZoyuJCSD2wuAg.JPEG/image.jpg', 'price': 64 },
          { 'title': '圆形两段式饭盒', 'sub': '虽然小但超结实的组合式盒饭哦', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA5MDVfMzIg/MDAxNTM2MTE1OTk2OTEw.-zVIBIka_LLklrAI0U6Md4IEmcxodOlGP_Kn7XNo8Ssg.etycXuS41loYTfds3V8zX3qduZl2ERw2zmN0Johpsygg.JPEG/image.jpg', 'price': 99 }
        ]
      },
      msData: {
        'title': '服饰配件优选',
        'list': [
          { 'title': '小黄鸭T恤', 'sub': '低调是我的风格', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA4MzBfMTIx/MDAxNTM1NjI5NzMwMzIz.YRSUc6-ld6ZV37KeFJ7gP2LNkB3ZWYIBNtsMpRQ7LyEg.pIvI39KLbHev0zVaUJsKnIZVlceaAA7xVPGMElSL2OUg.JPEG/image.jpg', 'price': 128, 'label': true },
          { 'title': 'brown手机保护套', 'sub': '保护你心爱的手机', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA4MzBfMTUz/MDAxNTM1NjI5NDg0OTc1.aaMjyxBB2ai_Lw8ZcYk55YxUh6JpIInV46oP0DiaoPEg.w6mcCLh4DzVXIzbUDtksPJtlPuxidogcEzpWLYnHpNgg.JPEG/image.jpg', 'price': 256, 'label': false },
          { 'title': 'Ffiends 纯棉T恤', 'sub': '纯棉柔软舒适', 'img': 'https://vos.line-scdn.net/website/uploads/website_1/zh-tw/wpicon_img_13.png?_21042', 'price': 64, 'label': false },
          { 'title': '妮可兔耳朵拖鞋', 'sub': '萌萌的又很防滑喔', 'img': 'https://vos.line-scdn.net/website/uploads/website_1/zh-tw/wpicon_img_423.png?_33012', 'price': 99, 'label': false }
        ]
      },
      mcData: {
        'title': '新品首发会 不去瞧一瞧?',
        'sub': '',
        'button': '去看看',
        'color': '#fff',
        'position': 'center',
        'img': 'http://pb85uax7t.bkt.clouddn.com/sp_logo_login.png',
        'bgcolor': '#01d664',
        'bgimg': 'http://pb85uax7t.bkt.clouddn.com/vichy.png'
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
</style>