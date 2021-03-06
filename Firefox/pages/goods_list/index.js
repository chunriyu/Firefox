import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
// pages/goods_list/index.js
Page({

      /**
       * 页面的初始数据
       */
      data: {
            tabs:[
                  {
                        id:0,
                        value:"综合",
                        isActive:true
                  },
                  {
                        id:1,
                        value:"销量",
                        isActive:false
                  },
                  {
                        id:2,
                        value:"价格",
                        isActive:false
                  }
            ],
            GoodsList:[]

      },

      //接口要的参数
      QueryParams:{
            query:"",
            cid:"",
            pagenum:1,
            pagesize:10
      },

      totalPage : 1,

      //标题点击事件 从子组件传递过来
      handleTabsItemChange(e){
            
            const index = e.detail.index;
            let tabs = this.data.tabs;
             tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
            this.setData({
                  tabs
            })
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            this.QueryParams.cid = options.cid;
            this.getGoodsList()

      },

      //获取商品列表数据
     async getGoodsList(){
            const res = await request({
                  url:"/goods/search",
                  data:this.QueryParams
            })
            const total = res.total;
            this.totalPage = Math.ceil(total/this.QueryParams.pagesize)
            
            this.setData({
                  GoodsList:[...this.data.GoodsList,...res.goods]
            })
            wx.stopPullDownRefresh()
      },

      //触底事件
      onReachBottom: function () {
            if(this.QueryParams.pagenum >= this.totalPage){
                  wx.showToast({
                        title:"没有下一页数据了",
                        icon:"none"
                  })
            } else{
                  this.QueryParams.pagenum++;
                        this.getGoodsList()
                   
            }
      },

      //下拉刷新事件
      onPullDownRefresh: function () {
            this.setData({
                  GoodsList:[]
            })
            this.QueryParams.pagenum = 1
            this.getGoodsList()
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
      

      

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function () {

      }
})