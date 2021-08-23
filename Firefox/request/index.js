let ajaxTimes = 0
export const request = (params) => {
    ajaxTimes++
    wx.showLoading({
        title: '加载中',
        mask: true
    })
    //定义公告url
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: function (res) {

                resolve(res.data.message)

            },
            fail: function (err) {
                wx.showToast({
                    title: '数据加载失败',
                    icon: 'error'
                })
                reject("数据加载失败")
            },
            complete() {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    wx.hideLoading()
                }

            }
        })
    })
}