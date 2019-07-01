//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    moves: [],   // 当前热映相关数据
  },
  showInfo: function (e) {
    //接收页面传递过来的参数：电影的ID
    let movieId = e.currentTarget.dataset.id;
    //跳转到页面详情页页面
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + movieId
    })
  },
  onLoad: function () {
    this.moveList();
  },

  // 加载口碑榜电影目录
  moveList() {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 5000
    })
    let thisPage = this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250',
      //url:'http://t.yushu.im/v2/movie/top250',
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        thisPage.setData({
          moves: res.data.subjects,
        })
        console.log(res.data.subjects)
        wx.hideLoading();
      },
    })
  },

})