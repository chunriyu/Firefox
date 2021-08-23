import {
      request
} from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
// pages/search/index.js
Page({

      /**
       * 页面的初始数据
       */
      data: {
            goods:[],
            isFocus:false,
            inpValue:""
      },

      TimeId:-1,
      /**
       * 获取搜索栏信息
       */
      searchInput(e){
            clearTimeout(this.TimeId)
           
            let value = e.detail.value
            
            if(!value.trim()){
                  this.setData({
                        goods:[],
                        isFocus:false
                  })
                  return
            }
            this.setData({
                  isFocus:true
            })
            this.TimeId = setTimeout(()=>{
                  this.qsearch(value)
            },500)
           
      },

      /**
       * 
       */
      close(){
            this.setData({
                  goods:[],
                  inpValue:"",
                  isFocus:false
            })
      },

      /**
       * 发送关键字
       */
      async qsearch(query){
            const res = await request({url:"/goods/qsearch",data:{query}})
            console.log(res);
            this.setData({
                  goods:res
            })
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {

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