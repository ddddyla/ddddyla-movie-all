// pages/query/index.js
Page({
  data: {
    searchValue: '',    // 搜索框的文字
    showClearBtn: false,   // 清除按钮
    searchMoives: [],      // 搜索到的结果
    num: 0,
    info: null,              // 可供点击的查询出来的单个影片名
    isShowQueryMoives: false,    // 默认不显示查询出来的影片信息
    isShowDetailInfo: false,    // 默认不现实单个影片的详细信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  focusSearch() {
    if (this.data.searchValue) {
      this.setData({
        showClearBtn: true
      })
    }
  },

  //对输入框输入的字符进行查询
  searchActiveChangeinput(e) {
    let thisPage = this;
    const val = e.detail.value;
    this.setData({
      // showClearBtn: val != '' ? true : false,
      searchValue: val,
      num: (this.data.num)++
    })
    if (this.data.num > 35) {
      return;
    }
    wx.request({
      url: 'http://t.yushu.im/v2/movie/search?q={text}',
      data: {
        q: thisPage.data.searchValue,
      },
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res.data.subjects)
        thisPage.setData({
          searchMovies: res.data.subjects,
          isShowQueryMoives: true,    // 显示查询出来的影片信息
        })
      }
    })
  },

  // 点击查询出来的影片名，显示影片的具体信息
  showDetailInfo(e) {
    this.setData({
      info: e.currentTarget.dataset.info,
      isShowQueryMoives: false,
      isShowDetailInfo: true,
    })
  }
})
