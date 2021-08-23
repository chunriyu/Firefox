/**
 * 
 * promise形式的 getSetting
 */
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: function (result) {
                resolve(result)
            },
            fail: function (err) {
                reject(err)
            }
        })
    })
}

/**
 * 
 * promise形式的 chooseAddress
 */
export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: function (result) {
                resolve(result)
            },
            fail: function (err) {
                reject(err)
            }
        })
    })
}

/**
 * 
 * promise形式的 openSetting
 */
export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: function (result) {
                resolve(result)
            },
            fail: function (err) {
                reject(err)
            }
        })
    })
}

/**
 * 
 * promise形式的 showModal
 */
export const showModal = ({
    content,
    confirmText
}, ) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: content,
            confirmText: confirmText || "确认",
            success(res) {
                resolve(res)
            },
            fail(res) {
                reject(res)
            }
        })
    })
}

/**
 * 
 * promise形式的 showToast
 */
export const showToast = ({
    title,
    icon
}) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: icon,
            success(res) {
                resolve(res)
            },
            fail(res) {
                reject(res)
            }
        })
    })
}

/**
 * 
 * promise形式的 login
 */
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 1000,
            success(result) {
                resolve(result)
            },
            fail(err) {
                rreject(err)
            }
        })
    })
}

/**
 * 登录
 */
export const signIn = () => {
    const user = wx.getStorageSync('user') || ""
    if (user.name !== undefined) {
        return true
    } else {
        wx.showModal({
            content: '请登录',
            success(res) {
                if (res.confirm) {
                    wx.setStorageSync('user', {
                        name: "机器人1号",
                        imgSrc: 'https://img1.baidu.com/it/u=3449564328,1553740094&fm=26&fmt=auto&gp=0.jpg'
                    })
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success',

                    })
                    return true
                } else {
                    return false
                }
            }
        })

    }
}