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
  }, {
    // 租金历史
    path: '/index/rents',
    name: 'rents',
    component (resolve) {
      require.ensure(['./article/rents.vue'], () => {
        resolve(require('./article/rents.vue'))
      })
    }
  }, {
    // 租金历史
    path: '/index/changes',
    name: 'changes',
    component (resolve) {
      require.ensure(['./article/changes.vue'], () => {
        resolve(require('./article/changes.vue'))
      })
    }
  }, {
    // 估值历史
    path: '/index/evalues',
    name: 'evalues',
    component (resolve) {
      require.ensure(['./article/evalues.vue'], () => {
        resolve(require('./article/evalues.vue'))
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
