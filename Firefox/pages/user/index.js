// pages/user/index.js
Page({

      /**
       * 页面的初始数据
       */
      data: {
            isLogin: false,
            user: "",
            collect: {},
            date: ""
      },

      /**
       * 登录用户
       */
      login() {
            let that = this
            if (this.data.isLogin) {
                  return
            }
            wx.setStorageSync('user', {
                  name: "机器人1号",
                  imgSrc: 'https://img1.baidu.com/it/u=3449564328,1553740094&fm=26&fmt=auto&gp=0.jpg'
            })
            wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  success() {
                        that.getUserStorage("user")
                  }
            })
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            this.getUserStorage("user")

      },

      //查看余额
      showMoney() {
            const user = wx.getStorageSync("user")
            if (user.name) {
                  let money = wx.getStorageSync('money')
                  money = money === "" ? "￥0.00" : "￥" + money
                  wx.showModal({
                        content: "您的余额为" + money
                  })
            } else {
                  wx.showToast({
                        title: '您还没登录',
                        icon: "error"
                  })
            }

      },

      /*
      登录 */
      getUserStorage(data) {
            const user = wx.getStorageSync(data)
            if (user.name) {
                  this.setData({
                        isLogin: true,
                        user
                  })
            }
      },

      //领金币
      getMoney() {
            let newDate = Date.now()
            //第一次领取
            if (!this.data.date) {
                  this.setData({
                        date: newDate
                  })
                  wx.setStorageSync('money', 100000);
                  wx.showToast({
                        title: '1百万领取成功',
                        icon: "success",

                  })

            } else {
                  //之前领取过
                  if (newDate - this.data.date > 1000) {
                        console.log("第二次");
                        let Money = wx.getStorageSync('money');
                        Money += 100000
                        wx.setStorageSync('money', Money)
                        wx.showToast({
                              title: '1百万领取成功',
                              icon: "success"
                        })
                        this.setData({
                              date: newDate
                        })
                  } else {
                        //距上次领取时间不够
                        wx.showToast({
                              title: '今天已经领取啦',
                              icon: "error"
                        })
                  }
            }
            // console.log(newDate);
            // let Money = wx.getStorageSync('money') || "";
            // if (Money != "") {
            //       console.log(12);
            // } else {
            //       //   wx.setStorageSync('key', data)
            // }
      },
      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function () {

      },

      //收藏类型获取数量
      getCollectNum(type) {
            let length = 0
            if (wx.getStorageSync(type)) {
                  length = wx.getStorageSync(type).length
            }
            this.setData({
                  collect: {
                        ...this.data.collect,
                        commodity: length
                  }
            })

      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {
            this.getCollectNum("collect")
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