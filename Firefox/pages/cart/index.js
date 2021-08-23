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
            cart: "",
            allCheked: false,
            totalPrice: 0,
            totalNum: 0

      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {
            const address = wx.getStorageSync("address")
            //获取缓存中的购物车数据
            const cart = wx.getStorageSync('cart') || [];
            this.setData({
                  address
            })
            this.setCart(cart);

      },

      //商品选择
      handeItemChange(e) {
            let id = e.currentTarget.dataset.id
            let newCarts = this.data.cart;
            let index = newCarts.findIndex(v => v.goods_id === id);
            newCarts[index].checked = !newCarts[index].checked
            this.setCart(newCarts)

      },




      //设置购物车状态同时重新计算数据
      setCart(newCarts) {
            wx.setStorageSync('cart', newCarts)
            // //获取缓存中的购物车数据
            // const cart = wx.getStorageSync('cart')||[];
            //计算全选
            let allChecked = true
            //总价格
            let totalPrice = 0;
            //总数量
            let totalNum = 0;
            //计算总数和总价
            newCarts.forEach(v => {
                  if (v.checked) {
                        totalPrice += v.num * v.goods_price;
                        totalNum += v.num;
                  } else {
                        allChecked = false
                  }
            })
            //如果cart是一个空数组，allChecked为false
            allChecked = newCarts.length != 0 ? allChecked : false
            this.setData({
                  cart: newCarts,
                  allChecked,
                  totalPrice,
                  totalNum
            })
      },

      //商品全选功能
      handleItemAllChecked() {
            let {
                  cart,
                  allChecked
            } = this.data;
            allChecked = !allChecked;
            cart.forEach(v => v.checked = allChecked);
            this.setCart(cart);
      },

      //商品数量编辑
      async handleItemNumEdit(e) {
            let that = this;
            const {
                  operation,
                  id
            } = e.currentTarget.dataset;
            let {
                  cart
            } = this.data;
            const index = cart.findIndex(v => v.goods_id === id);
            if (cart[index].num === 1 && operation === -1) {
                  const res = await showModal({
                        content: '是否删除商品?'
                  })
                  if (res.confirm) {
                        cart.splice(index, 1)
                        that.setCart(cart)
                  }
            } else {
                  cart[index].num += operation;
                  this.setCart(cart)
            }
      },

      /**
       * 
       * 点击结算功能
       */
      async handlePay() {
            const {
                  address,
                  totalNum
            } = this.data;
           
            if (totalNum === 0) {
                  await showToast({
                        title: "您还没选购商品",
                        icon: "error"
                  })
                  return
            }

            //筛选选中的商品
            let buyList = [];
            let cart = this.data.cart;
            buyList = cart.filter(v => v.checked)
            let buy = wx.getStorageSync('buy') || []
            if (buy.length === 0) {
                  wx.setStorageSync('buy', buyList)
            } else {
                  let newBuy = [...buy, ...buyList];
                  wx.setStorageSync('buy', newBuy)
            }

            let newCart = cart.filter(v => !v.checked)
            wx.setStorageSync('cart', newCart)
            wx.navigateTo({
                  url: '/pages/pay/index',
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