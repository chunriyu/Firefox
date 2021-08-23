import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
// pages/category/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //左侧的菜单数据
    leftMenuList: [],
    //右边商品数据
    rightContent: [],
    //被点击的左侧菜单
    currentIndex: 0,
    scrollTop: 0,
  },

  Cates: [],

  //数据获取
  async getCates() {
    let that = this;
    this.Cates = await request({
      url: "/categories",
    });
    wx.setStorageSync("cates", {
      time: Date.now(),
      data: that.Cates,
    });
    //左侧数据
    let leftMenuList = this.Cates.map((v) => v.cat_name)
    //右侧数据
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent,
    });

  },

  //左侧菜单点击事件
  handleItemTap(e) {
    let index = e.target.dataset.index;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      this.getCates();
    } else {
      if (Date.now() - Cates.time > 1000 * 60) {
        this.getCates();
      } else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map((v) => v.cat_name);
        //右侧数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent,
        });
      }
    }
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
