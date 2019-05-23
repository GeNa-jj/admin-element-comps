# admin-element-comps

> 基于element的后台组件，使用时需要引进element-ui

## AxionsConfig axios配置
***如需要500、504、请求超时等错误提示，必须把main.js的vue实例挂住在window.app。如window.app = new Vue({el: '#app',components: { App },template: '\<App/>'})。***

> 用例说明：
```
import {AxionsConfig} from 'admin-element-comps'
Vue.use(AxionsConfig, axios)

axios/$ajax 默认配置
$ajaxForm 使用form表单方式提交
$ajaxFile 使用FormData的方式上传文件

使用时：
this.$ajaxForm.post(url, {params}).then(({data}) => { })
```

## Nav 侧边栏

> 用例说明：
```
import {Nav} from 'admin-element-comps'
<Nav :routes="navList"></Nav>
navList: [
  {
    title: '导航一',
    icon: 'el-icon-location',
    path: '/'
  },
  {
    title: '导航二',
    icon: 'el-icon-location',
    // path: '/',  有二级并且一级导航也能跳转
    children: [
      {path: '/a', title: '選項1'},
      {path: '/b', title: '選項2'}
    ]
  }
]

title：標題
icon：图标
path：跳转的路由
children：二级导航
```

## Pagination 分页

> 用例说明：
```
import {Pagination} from 'admin-element-comps'
<Pagination :pageData="pageData" @pageChange="pageChange"></Pagination>
pageData: {
  total: 0,
  pageNum: 1,
  pageSize: 10
}
pageChange (pageData) {
  this.pageData = pageData
  // doing something
}
  
total：总数 0
pageNum：第几页 1
pageSize：每页个数 10
pageSizes：每页个数种类 [10, 20, 30, 40, 50]
layout：需要出现的类型 total, sizes, prev, pager, next, jumper
```
