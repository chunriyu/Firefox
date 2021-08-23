import {
      openSetting,
      chooseAddress,
      getSetting,
      showModal,
      showToast
} from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
// pages/cart/index.js
Page({
      /**
       * 页面的初始数据
       */
      data: {
            address: {},
            buyList: [],
            totalNum: 0,
            totalPrice: 0

      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {
            this.setCommodityData()
            this.setPrderPay(this.data.buyList)
      },

      /**
       * 获取商品信息
       */
      setCommodityData() {
            //获取地址信息
            const address = wx.getStorageSync("address")
            //获取准备购买的商品列表
            const buyList = wx.getStorageSync('buy')
            //筛选相同的商品
            let newBuyList = buyList
            for (let i = 0; i < buyList.length; i++) {
                  var id = buyList[i].goods_id
                  for (let j = 0; j < buyList.length; j++) {
                        if (id === buyList[j].goods_id && j !== i) {
                              newBuyList[i].num++;
                              newBuyList.splice(j, 1)
                              j++
                        }
                  }
            }
            this.setData({
                  address,
                  buyList: newBuyList
            })
            wx.setStorageSync('buy', newBuyList)
      },



      //点击收货地址
      async handleChooseAddress() {
            try {
                  //获取 权限状态
                  const res1 = await getSetting();
                  const scopeAddress = res1.authSetting["scope.address"];
                  //判断 权限状态
                  if (scopeAddress === false) {
                        await openSetting();
                  }
                  //获取收货地址
                  let address = await chooseAddress();
                  address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo

                  //存入缓存
                  wx.setStorageSync('address', address)

            } catch (err) {
                  console.log(err);
            }
      },

      //编辑
      async handleItemNumEdit(e) {
            let that = this;
            const {
                  operation,
                  id
            } = e.currentTarget.dataset;
            let {
                  buyList
            } = this.data;
            const index = buyList.findIndex(v => v.goods_id === id);
            if (buyList[index].num === 1 && operation === -1) {
                  let res = await showModal({
                        content: '是否删除商品?'
                  })
                  if (res.confirm) {
                        buyList.splice(index, 1)

                        that.setPrderPay(buyList)
                  }
            } else {
                  buyList[index].num += operation;
                  that.setPrderPay(buyList)
            }
            wx.setStorageSync('buy', buyList)

      },

      /**
       * 点击支付功能
       */
     async handlePrderPay() {
           let address = wx.getStorageSync('address')
            if (!address.userName) {
                  await showToast({
                        title: "您还没选择收货地址信息",
                        icon: "error"
                  })
                  return
            }
           let money = wx.getStorageSync('money');
           let totalPrice = this.data.totalPrice;
           
           if(totalPrice>money){
                 wx.showToast({
                   title: '余额不足',
                   icon:"error"
                 })
                 return
           }
           let purchased = wx.getStorageSync('purchased')||[];
           let buyList = this.data.buyList;
           let newMoney = money - totalPrice;
           purchased = [...purchased,...buyList];
           wx.setStorageSync('purchased', purchased);
           wx.setStorageSync('money', newMoney);
           wx.setStorageSync('buy', []);
           this.setData({
            buyList:[]
           })
           wx.navigateTo({
             url: '/pages/feedback/index',
           })
           

      },

      /**
       * 计算价格跟数量
       */
      setPrderPay(buyList) {

            let totalPrice = 0;
            //总数量
            let totalNum = 0;
            //计算总数和总价
            buyList.forEach(v => {
                  totalPrice += v.num * v.goods_price;
                  totalNum += v.num;
            })
            this.setData({
                  totalPrice,
                  totalNum,
                  buyList
            })
      },


      /**
       * 
       * 点击结算功能
       */


      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {

      },

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function () {},



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