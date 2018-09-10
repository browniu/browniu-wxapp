<template>
  <div class="store-category">
    <main>
      <scroll-view class="tab-left" scroll-y="true">
        <li @click="exchange(index)" :class="[categorySelect===index?'act':'']" v-for="(item, index) in category" :key="index">
          <i :style="{backgroundImage:'url('+item.icon+')'}"></i>
          <span>{{item.title}}</span>
        </li>
      </scroll-view>
      <scroll-view class="container" @scrolltolower="gotoBottom" enable-back-to-top="true" scroll-with-animation="true" :scroll-into-view="'cate_'+categorySelect" scroll-y="true" @scrolltoupper="gotoTop">
        <moduleCategory v-for="(item, index) in category" :key="index" :data="item"></moduleCategory>
      </scroll-view>
    </main>
  </div>
</template>

<script>
import moduleCategory from '../components/modueCategory.vue'
export default {
  components: {
    moduleCategory
  },
  data () {
    return {
      categorySelect: 0,
      category: [
        {
          'index': '0',
          'title': '布朗',
          'icon': 'https://lfstore-phinf.pstatic.net/MjAxODA3MThfMjkz/MDAxNTMxODgwOTY1ODAz.vDRx9BtJdP8venKviAvmyQvTsh0d-FN3LulWIDSVNwkg.-YQvKAQaJos-r-v0I5RpiknNi2U9szQZMVnz2flurwcg.PNG/image.png',
          'list': [
            { 'title': '抱抱玩偶', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA5MDZfNjcg/MDAxNTM2MjA0NDM2NzMw.62akbxhyOGPtVeLH29-IOznst1iTFV24yJ-6AnBkpHMg.4XVa8mVD4seDtN9VchoXUD4kvTv5BOgsy421YV9Aovwg.JPEG/image.jpg?type=u560_560' },
            { 'title': '便利贴', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA5MDdfMjYz/MDAxNTM2Mjg4NzkzNDU3.Iik8evYxhAxpg83QdxOfVfPBqStemved01QQyStbI9Ag.Jx6dClVWCFnPgzrTmN-jX2z8-a5Z3x3qUCW8HJlUe98g.JPEG/image.jpg?type=u560_560' },
            { 'title': '布朗熊棉棒', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA5MDZfMjcw/MDAxNTM2MjIzNzU1Mzgy.yh1DSLUwv-pmE7fQdB0_bLzyBByQ0DfEU1c7qgSicZUg.7ggnsQZb-uLoLWRtAiYex05yR1Hhu0MthgNocwBMWNYg.JPEG/image.jpg?type=u560_560' },
            { 'title': '护手霜', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA5MDZfODIg/MDAxNTM2MjIyMTg5OTcz.2xt-zdWdtVJhQpIdc_rDtjxvz0ilBTaMCmplLnwaOscg.TuM_DeQHHgycQDWgrRXsK-NS76VSl4SJA_WMSuJIcPYg.JPEG/image.jpg?type=u560_560' },
            { 'title': '熊头钥匙扣', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA5MDZfMjkw/MDAxNTM2MjAzODYyMzQ3.ZLUDCVjx1OmARUm1do2WlfSyGcifJeDUbF0lVis9Yd0g.HmWGsGtxLvNJeWMeU5c-9yYI4SG23yNVYAHHpUSzZEsg.JPEG/image.jpg?type=u560_560' },
            { 'title': '手袋', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA4MjRfMjI2/MDAxNTM1MTAxNjEyMTYx.AWbiFY_Q6z2MNEG1XApL9vj-Wmlx1RLYeEnCra4hg1kg.D0KwfaGv_Lhv6xp8lET1kTq_1BPgLa0FNO2V-pGsJUEg.JPEG/image.jpg?type=u560_560' },
            { 'title': '单肩袋', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA4MTZfMTIw/MDAxNTM0NDE3NzAwMDEz.0wjMCWY1rzvxMCjX159MgvIy7zAeR-O-vkAn7AAOWZAg.7zlcsuU8gpvKtfDy2uF2tLasOCkUN1itVqy9RIgXjiwg.JPEG/image.jpg?type=u560_560' },
            { 'title': '笔记本', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA4MTdfMTU1/MDAxNTM0NDcyNzcxODgy.MfBxlELNOCI-7Skx_ZPL_CsOPIrgho-2LJKxrDWA7f8g.VZoLU1Gs4Quj4KqwWUTb3kYGmtC6dP4U6dMj2Av-h64g.JPEG/image.jpg?type=u560_560' },
            { 'title': '遮光眼罩', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA4MDlfMTUz/MDAxNTMzODA1NTA1ODk0.nHXwhmOr3rXvWeWS01xFthaQKxMS049CAJnkKybfpeog.DztbV1UgmBMgqo2afNBYtm75wqp2xmT-nmGGhwRSUUAg.JPEG/image.jpg?type=u560_560' },
            { 'title': '手机保护壳', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA4MDhfMjcx/MDAxNTMzNzE5MjAxOTMy.uW5RlfQKn9DdKmlSpdRtywUuf9QAHnts2FtiCLmPLoUg.XzbqajNkcuz3c5krc1RivVUj92_JtYk1L8VjrJf-rGwg.JPEG/image.jpg?type=u560_560' },
            { 'title': '手账贴纸', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA4MDJfMTEg/MDAxNTMzMjEzNTE1NDk2.UWccpZ7dJeh9dBKJJkGVAg69broaeY_LV6WvEJLrzM0g.YqPkKisliygfkuaN-j1QwbmIq84mLZiTJCwHln27kV0g.JPEG/image.jpg?type=u560_560' }
          ]
        },
        {
          'index': '1',
          'title': '可妮',
          'icon': 'https://lfstore-phinf.pstatic.net/MjAxODA3MThfMjk2/MDAxNTMxODg3MzYxOTY0.CvsG2BgXg-fn25GX5rE_1Q3xkCsEwgr1l74gIjtf0P4g.bK2HDLm3YjZS1kk03HF3LxAri9lcMh4bEWwSKzuJxnkg.PNG/image.png',
          'list': [
            { 'title': '可妮兔钥匙扣', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA5MDZfOTYg/MDAxNTM2MjAzNTU4NjU2.n0o02_19maOcPsaRbFoGdKO32ZWm73QyatMSbqm80YUg.LbElxrD0U0Myi_SK5XqD7E-QhZcSJSIKlL9-pstwKCEg.JPEG/image.jpg?type=u560_560' },
            { 'title': 'U型枕头', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA4MjhfMjc2/MDAxNTM1NDY1MzUyMDc3.Gf6Kniazm-_7wnlx0gRcapOUKJOAdc4NVWjcU8GUprsg.-6r8EKhg1bzrs-HdO97trr0Y2Kd9Oqh7BE6msN37XPIg.JPEG/image.jpg?type=u560_560' },
            { 'title': '伴手袋', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA4MjRfMjMw/MDAxNTM1MTAxNTA5MjU3.zRYj5ME7OIUS5n_BU8nURji4adxswfoV05ySVIYcsEIg.2kU-O3wBx_yc47BUOVby94tx6lTy-WfdaXujWkJbZ_kg.JPEG/image.jpg?type=u560_560' },
            { 'title': '便利贴', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA4MDJfMTcz/MDAxNTMzMjEyMjM3NzQ5.Pw9ihsmHj2LMXOVazwnBbDtUYigk9vDexsVfeEc_GEYg.dN64tWJBx5SRJlCYFCmzNqe7j0lWNsSENvDg2mm9EGAg.JPEG/image.jpg?type=u560_560' },
            { 'title': '记事本', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA4MDJfMjQy/MDAxNTMzMTk4NzE5MzMw.BpAm2pZQfUn4g8__yMfzRg8jmLnXwIcuk6VUEs7jZfog.xZoqDq3TyE4syUbPcY2xnGPWqVhqgh_tQrkwyOyvSzgg.JPEG/image.jpg?type=u560_560' }
          ]
        },
        {
          'index': '2',
          'title': '莎莉',
          'icon': 'https://lfstore-phinf.pstatic.net/MjAxODA3MThfMjEg/MDAxNTMxODg3Mjc5NTg4.xzoXGEJ0yKOFWBPVIJIleeaqTRJpcnGF7N-50PIbbwUg.zaY1mqK0l9BmgViD88sKYHt5WG-01o-C3d9bMn1oZogg.PNG/image.png',
          'list': [
            { 'title': '纪念胸章', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA5MDdfMTU5/MDAxNTM2MjgzMDEwNzM0.BfiKQ2-of0gh-1KkaUgI-UKcA58gBe7xpXxHNGtDe_gg.X0wmFPUWk-xHXELQ77nfgALd9FdoIzNPbiZLNVVA7gAg.JPEG/image.jpg?type=u560_560' },
            { 'title': '伴手袋', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA4MjRfNTIg/MDAxNTM1MTAxMjIyOTYy.1YDpUobwlxKGqjJJbayBv8HIZ23CUiAo3lLzBBFgTL8g.dCgwK0e83P2Ytl-_OvBR4rRMEtD3HkRbRy-XQRynOKAg.JPEG/image.jpg?type=u560_560' },
            { 'title': '小鸭钥匙扣', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA5MDZfMjc4/MDAxNTM2MjAzNDU3MzQ3.4zjKJBojSGtnVITSkMU7O0L6eNYzgOvqUzISkts_Xw0g.mY-nGeFtJFB3WdLmnZBLxEQTWFJLsB22Bo7RC7nNC4Eg.JPEG/image.jpg?type=u560_560' },
            { 'title': '阿黄手机壳', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA4MDhfMTM1/MDAxNTMzNzE2NDA0MDE0.ZPRO56mO5dpR_Qlc5qwemjWhRllRlyKqII0F1vOSb0Eg.J_sWgdhoalfE_hd5fjJFDfsoH4uJ_4LekeCGIR8Yzyog.JPEG/image.jpg?type=u560_560' },
            { 'title': '台历', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA4MDJfMTQ1/MDAxNTMzMjEzMDA0MDAx.cUrDmv3SiCXpDEE2P_r-km5a-XMOOcIQOsnmzsNIuRAg.MvIGJjkOXNu8l3TE9EazCWKABVgcGucR29hoLHFgdrgg.JPEG/image.jpg?type=u560_560' },
            { 'title': '便利贴', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA4MDJfMTQx/MDAxNTMzMjExNzc5NTg1.KPuAXcFXCa5t68mfEYghSH9BEh2WWywB4q9cDeSpwDEg.DeGcn0nl7O8xaKu9qyC7PXKCDSsmtVKzMtcWkBOHOO4g.JPEG/image.jpg?type=u560_560' }
          ]
        },
        {
          'index': '3',
          'title': '穆恩',
          'icon': 'https://lfstore-phinf.pstatic.net/MjAxODA3MThfMTg0/MDAxNTMxODg2OTg1MDE3.NvDEohj2kjj2KSVY02wtp3NApgvfeAB3ZFPNlCTyGoMg.Kt1vg48r_l53-_2LeiY5SrKuHgLXpVKlRn42sZbY8CYg.PNG/image.png',
          'list': [
            { 'title': '记事本', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA3MTJfNDQg/MDAxNTMxMzczMzMwNzg0.RTKUP7qrJH81XwLRDEq1vqNg0_RQRsZNzXIIzHTPr44g.kzd2lbcbqadB2fnXarwA6frKBQx9DifJLmEwmUKsdikg.JPEG/170525-spring-moon-1.jpg?type=u560_560' },
            { 'title': '可爱贴纸', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA3MTJfMjg3/MDAxNTMxMzczMDEyNDA3.yUsxiXNjgLnu606LfYwpHS5SBmFyQeNoTyhmHtNA5C4g.IUzhyawekAlQtjWTHOEv-FuDM5y_WqHYoSAu1uWzr5Ug.JPEG/2-44.jpg?type=u560_560' },
            { 'title': '小海报', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA3MTJfMzEg/MDAxNTMxMzcyOTk2NjU2.rGxZhMwU_7-WaUDL5eMLiWNbNthq_1u1ww1lwBIDH4gg.16qPFSW3hkcCdooW-mTPcGqMYJjxKqQLUctlNbMV4zcg.JPEG/1-1.jpg?type=u560_560' },
            { 'title': '小白钥匙扣', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA3MTJfMjgy/MDAxNTMxMzcyMjQzOTc5.N5Ub7Zc519Ur8nvQAK5vabX_D8lLssImuCWRlGJFa7kg.Y0A3JzYdjok52N_d2wy7SvKoetZj-c7QZFvtum9BTn0g.JPEG/%EB%AC%B8-%EB%B0%94%EB%94%94%ED%82%A4%EB%A7%8112cm.jpg?type=u560_560' },
            { 'title': '半岛铁盒', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA3MTJfMjk3/MDAxNTMxMzcyNjE3MDUz._HeXPxgyfrXn852IaKVZjTgUjJstUPM_o3I_Y9-ayXEg.aM-m1zoLNU-baNToK6jR3Srg8ukfuAdYLn3ek-e7XF4g.JPEG/1-33.jpg?type=u560_560' }
          ]
        },
        {
          'index': '4',
          'title': '奥德',
          'icon': 'https://lfstore-phinf.pstatic.net/MjAxODA3MThfMTky/MDAxNTMxODg3MTA5NDc1.C6kBFE4cGDkNQfAPL7CKntXAox3SfTIS0BJHCJBQdsIg.ye4SbHK4CeNhOovk33duPTMHje5Kf2eCL9kgzTdFWhcg.PNG/image.png',
          'list': [
            { 'title': '组合船袜', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA3MTJfNDYg/MDAxNTMxMzczNzU1NDE1.qopyXHePCyFmklKLAq1twh1W95QhmvYNXQmj4vC0KEwg.xtvWr-EqxO5NfN3DfbVe-eBBSmB4LkPnkKlaRRlV4W4g.JPEG/1200_MENS-FAKE-SOCKS-SET_3P_8809611514041-01.jpg?type=u560_560' },
            { 'title': '奥德抱枕', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA3MTJfMTgw/MDAxNTMxMzczNzA4Njcz.98NRQc-77yLyJ2KHre5iEM6kVrhJHYVk0YDlk85OTxIg.NpXErmfvLYIpC7fNPt0mYgcYwADLw2zmiMtybGyw0FYg.JPEG/leonardwink_8809573078582-1.jpg?type=u560_560' },
            { 'title': '奥德茶杯', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA3MTJfMjMz/MDAxNTMxMzczMzY5MTg0.Oquy35WcGZD1nMvlxJlKALXEls7MqcK-0aH2Gp9Jg1cg.80VrnyelKwMmNbh-FTUULuC_rU-rhXh8DV5dGa5eufIg.JPEG/170627-10020029-1.jpg?type=u560_560' },
            { 'title': '签字笔', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA3MTJfMjEw/MDAxNTMxMzczMjMzNDQ0.eXXObIWWeu8wfudAawK_6M-TIMDxCfSuW6AbpE6rNF8g.iZhqF3vPowLir4WXYE3BZI27l3csySFOA68-biqlapMg.JPEG/action-pen-leonard.jpg?type=u560_560' },
            { 'title': '耳机收纳袋', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA3MTJfMjcx/MDAxNTMxMzcyNzQ5NDE2.X4Aa0jNir1CiGNzCq4sDZLJXodKaV1MzQyHsoJB3TIcg.jNrDyrWmtMuEacM5We8fAnFbGbGcVOILH3KvP81PHz0g.JPEG/170328-coinS-leonard-1.jpg?type=u560_560' },
            { 'title': '日记本', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA3MTJfMjE1/MDAxNTMxMzcyNTc3ODY2.dhaTRHNRxQOOAd1Zzn_me1J0RzawzJO5e5LiHn_FKoIg.MEDKujuFgRvJzkv73xKRjO-dJF91p17gf5MWeA9cuNgg.JPEG/1-199.jpg?type=u560_560' },
            { 'title': '组合指套', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA3MTJfMjcy/MDAxNTMxMzcyMjI3NDg4.QSZ5x7mqeBS23SZeX8o4gJW3j1W5_9auuCBFKmYXbL4g.NSoiSFL6y0mZ9FJ9A4A01OO0baysML6hol5h1vgpX8Ag.JPEG/%EC%95%B5%EA%B7%B8%EB%A6%AC-%ED%8E%98%EC%9D%B4%EC%A7%80%EB%A7%88%EC%BB%A4.jpg?type=u560_560' },
            { 'title': '画纸', 'img': 'https://lfstore-phinf.pstatic.net/MjAxODA3MTJfMjEw/MDAxNTMxMzczMTI1MjIy.ZEkdDqDizXWeFy7F2GF0vDRasSB2zyvOJjAQeJ-5ZxMg.041KHZvMU6DyhK-oMe8Rrks2veOOJq6OkhUKqiuktbYg.JPEG/170324-SPIRALRINGNOTE-leonard-1.jpg?type=u560_560' }
          ]
        },
        {
          'index': '5',
          'title': '芮可',
          'icon': 'https://lfstore-phinf.pstatic.net/MjAxODA3MThfMjg4/MDAxNTMxODg3MjAyMzY5.DiUps950Ginf1rNXNLlIDFV_LtMNARUKIqvqlVdOnJsg.Ohsy2_AaXzFjmjGqnUInhaZvw7MF6xW641Szl1IN3acg.PNG/image.png'
        },
        {
          'index': '6',
          'title': '詹姆',
          'icon': 'https://lfstore-phinf.pstatic.net/MjAxODA3MThfMjU0/MDAxNTMxODgwNzk0MDMx.FVLBUsIwq63IxnCgurqr_eJQ2ZV4BNuCdm8uJmR_h64g.gLS8w7wmFjo6HEl0lUvEe1sDzv4OqNVVdgS6Vx9WMBsg.PNG/image.png'
        },
        {
          'index': '7',
          'title': '安琪',
          'icon': 'https://lfstore-phinf.pstatic.net/MjAxODA3MThfNDgg/MDAxNTMxODg2NjI1MjI5.dI9pVHwhupNokW1L8lwaU7fbmJpSqVEQnwYWaPBwGQgg.owNlGxLE6T1P6UKLL3jmKoDmEUk7kh9lCjZ3LS_A6nAg.PNG/image.png'
        }
      ]
    }
  },
  methods: {
    exchange (index) {
      this.categorySelect = index
    },
    gotoTop () {
      this.categorySelect = 0
    },
    gotoBottom () {
      this.categorySelect = 4
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '货架'
    })
  }
}
</script>
<style lang='stylus'>
@import '../../../assets/styles/index.styl'
body {
  height 100vh
}
.store-category {
  overflow hidden
  height 100%
  main {
    border-top 1px solid co_10
    height 100%
    display flex
    flex-direction row
    & .tab-left {
      border-right 1px solid co_10
      width 85px
      height 100%
      text-align left
      padding-left 15px
      box-sizing border-box
      & li {
        font-size 12px
        color co_7
        height 45px
        line-height 45px
        & i {
          display inline-block
          height 12px
          width 12px
          background-size contain
          background-position center center
          position relative
          top 1px
          margin-right 5px
        }
        &.act {
          color co_1
          font-weight bold
        }
      }
    }
    & .container {
      height 100%
      width 100%
      box-sizing border-box
      // padding 15px
    }
  }
}
</style>