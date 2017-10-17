const routers = [
  {
    path: '/',
    name: 'home',
    redirect: '/index/house/edit'
  },
  {
    path: '/index/house/:type',
    name: 'house',
    component (resolve) {
      require.ensure(['./article/house.vue'], () => {
        resolve(require('./article/house.vue'))
      })
    }
  }, {
    // 报告维护
    path: '/index/report/:type',
    name: 'report',
    component (resolve) {
      require.ensure(['./article/report.vue'], () => {
        resolve(require('./article/report.vue'))
      })
    }
  }
  // ,
  // {
  //   // 任务列表
  //   path: '/notice/detail/:id',
  //   name: 'notice',
  //   component (resolve) {
  //     require.ensure(['./notice/detail.vue'], () => {
  //       resolve(require('./notice/detail.vue'))
  //     })
  //   }
  // }
]

export default routers
