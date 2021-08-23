import {
  request
} from "../../request/index.js";

wx -
  Page({
    /**
     * 页面的初始数据
     */
    data: {
      //轮播图数组
      swiperList: [],
      CateList: [],
      FloorList: []
    },

    //轮播图数据获取
    getSwiperList() {
      let that = this;

      let data = request({
        url: "/home/swiperdata",
      });
      data.then((res) => {
        that.setData({
          swiperList: res,
        })
      })
    },

    //获取导航分类数据
    getCateList() {
      let that = this;
      let data = request({
        url: "/home/catitems",
      });
      data.then((res) => {

        that.setData({
          CateList: res,
        })
      })
    },

    //获取楼层数据
    getFloorList() {
      let that = this;
      let data = request({
        url: "/home/floordata",
      });
      data.then((res) => {
        that.setData({
          FloorList: res,
        })
      })
    },

    //领金币


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getSwiperList();
      this.getCateList();
      this.getFloorList()
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
  });