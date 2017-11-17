const routers = [
  {
    path: '/',
    name: 'home',
    redirect: '/index/house'
  },
  {
    path: '/index/house',
    name: 'house',
    component (resolve) {
      require.ensure(['./article/house.vue'], () => {
        resolve(require('./article/house.vue'))
      })
    }
  }, {
    path: '/index/mall',
    name: 'mall',
    component (resolve) {
      require.ensure(['./article/mall.vue'], () => {
        resolve(require('./article/mall.vue'))
      })
    }
  }, {
    path: '/index/apartment',
    name: 'apartment',
    component (resolve) {
      require.ensure(['./article/apartment.vue'], () => {
        resolve(require('./article/apartment.vue'))
      })
    }
  }, {
    path: '/index/park',
    name: 'park',
    component (resolve) {
      require.ensure(['./article/park.vue'], () => {
        resolve(require('./article/park.vue'))
      })
    }
  }, {
    // 报告维护
    path: '/index/report',
    name: 'report',
    component (resolve) {
      require.ensure(['./article/report.vue'], () => {
        resolve(require('./article/report.vue'))
      })
    }
  }, {
    // 投资机构
    path: '/index/invest',
    name: 'invest',
    component (resolve) {
      require.ensure(['./article/invest.vue'], () => {
        resolve(require('./article/invest.vue'))
      })
    }
  }, {
    // 证券产品
    path: '/index/security',
    name: 'security',
    component (resolve) {
      require.ensure(['./article/security.vue'], () => {
        resolve(require('./article/security.vue'))
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
  }, {
    // 置空率历史
    path: '/index/rates',
    name: 'rates',
    component (resolve) {
      require.ensure(['./article/rates.vue'], () => {
        resolve(require('./article/rates.vue'))
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
