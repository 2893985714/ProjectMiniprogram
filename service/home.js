import request from './network.js'


export function getMultiData(){
 return request({
    url: '/home/multidata'
  })
}

  //type, page 传入数据的类型
export function getGoodsData(type, page){ 
  return request({
    url:'/home/data',
    type,
    page
  })
}