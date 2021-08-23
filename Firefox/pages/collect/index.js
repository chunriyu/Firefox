import {
      openSetting,
      chooseAddress,
      getSetting,
      showModal,
      showToast
} from "../../utils/asyncWx.js";
// pages/collect/index.js
Page({
      /**
       * 页面的初始数据
       */
      data: {
            isUser: false,
            collectList: []

      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            let isUser = wx.getStorageSync('user')
            //用户没有登录

            if (isUser.name !== undefined) {
                  //登录了
                  this.setData({
                        isUser: true
                  })
            } else {
                  //没登陆
                  this.Sign()
            }
      },

      //提醒用户登录
      async Sign() {
            let Modal = await showModal({
                  content: "亲,您还没登录,请登录一下吧",
                  confirmText: '登录！'
            })

            if (Modal.confirm) {
                  wx.setStorageSync('user', {
                        name: "机器人1号",
                        imgSrc: 'https://img1.baidu.com/it/u=3449564328,1553740094&fm=26&fmt=auto&gp=0.jpg'
                  })
                  this.setData({
                        isUser: true
                  })
            }
      },

      //跳转至商品详情页
      navigateTo(e) {

            let id = e.currentTarget.dataset.id;

            wx.navigateTo({
                  url: '/pages/goos_detail/index?goods_id=' + id
            })
      },

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function () {

      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {
            let collectList = wx.getStorageSync("collect") || [];
            this.setData({
                  collectList
            })
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