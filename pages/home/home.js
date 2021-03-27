import {
  getMultiData,
  getGoodsData
} from '../../service/home.js'

const types = ['pop','new','sell']

Page({
  data: {
    banners:[],
    recommends:[],
    titles:['流行','新款','精选'],
    goods:{
      pop: {page:0, list:[]},
      new: {page:0, list:[]},
      sell: {page:0, list:[]}
    }
  },

  onLoad: function (options) { 
    //1.请求轮播图以及推荐数据 
   this._getMultidata()
   //2.请求商品数据
   this._getGoodsData('pop')
   this._getGoodsData('new')
   this._getGoodsData('sell')

  },

  //-------------------------网络请求函数---------------------------------
  _getMultidata(){
    getMultiData().then(res =>{
      //取出轮播图和推荐数据
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      
      //将banners和recommends放到data中
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type){
    //1.获取页码
    const page = this.data.goods[type].page +  1;

    //2.发送网络请求
    getGoodsData(type, page).then(res => {
      //2.1取出数据
     const list = res.data.data.list;

     //2.2将数据设置到对应的type中的list中
     const oldList = this.data.goods[type].list;
     oldList.push(...list)

     //2.3将数据设置到data中的goods中
     const typeKey =`goods.${type}.list`;
     const pageKey =`goods.${page}.page`;
     this.setData({
       [typeKey]:oldList,
       [pageKey]:page
     })
     

     console.log(res)
    })
  },

  //-------------------------监听事件函数---------------------------------
  tabControl(event){
    //取出index
    const index = event.detail.index;
    //设置currentType
    const type =type[index]
    this.setData({
      currentType:type
    })
  }

})