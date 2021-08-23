import {
      request
} from "../../request/index.js";
import {
      openSetting,
      chooseAddress,
      getSetting,
      showModal,
      showToast,
      signIn
} from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
// pages/goos_detail/index.js
Page({

      /**
       * 页面的初始数据
       */
      data: {
            goodsObj: {},
            isCollect: false
      },
      //商品对象
      GoodsInfo: "",
      GoodsId: null,

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            this.GoodsId = options.goods_id;
            this.getGoodsDetail(this.GoodsId)
      },

      //获取商品详情数据
      async getGoodsDetail(goodsId) {
            const goodsObj = await request({
                  url: '/goods/detail',
                  data: {
                        goods_id: goodsId
                  }
            })

            this.GoodsInfo = goodsObj
            this.setData({
                  goodsObj: {
                        goods_name: goodsObj.goods_name,
                        goods_price: goodsObj.goods_price,
                        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, ".jpg"),
                        pics: goodsObj.pics
                  }
            })
      },

      //轮播图点击预览
      handlepPreviewImage(e) {
            const urls = this.GoodsInfo.pics.map(v => v.pics_mid)

            const current = e.currentTarget.dataset.url

            wx.previewImage({
                  urls: urls,
                  current
            })
      },

      //点击加入购物车
      handleCartAdd() {
            if (signIn()) {
                  let cart = wx.getStorageSync("cart") || [];
                  let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
                  if (index === -1) {
                        this.GoodsInfo.num = 1;
                        this.GoodsInfo.checked = true;
                        cart.push(this.GoodsInfo);
                  } else {
                        cart[index].num++
                  }
                  wx.setStorageSync("cart", cart);

                  wx.showToast({
                        title: '加入成功',
                        icon: "success",
                        mask: true
                  })
            }

      },

      /**
       * 前往购物车
       */
      goCart(){
            if (signIn()){
                  wx.switchTab({
                    url: '/pages/cart/index',
                  })
            }
      },

      /**
       * 设置收藏
       */
      setCollect() {
            if (signIn()) {
                  //获得收藏列表数组，可能为空
                  let collect = wx.getStorageSync("collect") || [];
                  let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);

                  let collectData = {
                        goods_name: this.GoodsInfo.goods_name,
                        goods_id: this.GoodsInfo.goods_id,
                        goods_price: this.GoodsInfo.goods_price,
                        goods_small_logo: this.GoodsInfo.goods_small_logo,

                  }
                  if (index === -1) {
                        this.GoodsInfo.isCollect = true;
                        collect.push(collectData);
                  } else {
                        collect.splice(index, 1)
                  }
                  wx.setStorageSync("collect", collect);

                  this.setData({
                        isCollect: !this.data.isCollect
                  })
            }


      },

      /**
       * 立即购买
       */
      buyNow() {
            if (signIn()) {
                  let buy = wx.getStorageSync('buy') || []
                  let GoodsInfo = this.GoodsInfo
                  GoodsInfo.num = 1
                  buy.push(GoodsInfo)
                  wx.setStorageSync('buy', buy)
                  wx.navigateTo({
                        url: '/pages/pay/index',
                  })
            }

      },

      /**
       * 验证登录
       */


      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function () {

      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {

            let Collect = wx.getStorageSync('collect') || [];
            let index = Collect.findIndex(v => v.goods_id == this.GoodsId);
            if (index !== -1) {
                  this.setData({
                        isCollect: true
                  })
            }


      },

      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: function () {

      },

      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload: function () {

      },

      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function () {

      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function () {

      },

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function () {

      }
})