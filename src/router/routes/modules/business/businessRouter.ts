// import { LAYOUT } from '/@/router/constant';
//
// const routerData = [
//   {
//     path: '/sharedbike',
//     name: '0',
//     component: LAYOUT,
//     meta: {
//       'title': '',
//     },
//     businessMeta: {
//       isMapLayout: true,
//       noMenu: true,
//       noHead: true,
//       notInMenu: true
//     }
//   },
//   {
//     path: '/sharedbike',
//     name: '共享单车管理',
//     meta: {
//       isMapLayout: false,
//       noMenu: false,
//       noHead: false,
//     },
//     children: [
//       {
//         path: 'userManager',
//         name: '用户管理',
//         meta: {
//           isMapLayout: false,
//           noMenu: false,
//           noHead: false,
//         },
//         component: () => import('../views/sharedbike/manage/user/UserList.vue'),
//       },
//       {
//         path: 'taskManage',
//         name: '任务管理',
//         meta: {
//           isMapLayout: false,
//           noMenu: false,
//           noHead: false,
//         },
//         component: () => import('../views/sharedbike/manage/task/TaskList.vue'),
//       },
//       {
//         path: 'historyTask',
//         name: '历史任务',
//         meta: {
//           isMapLayout: false,
//           noMenu: false,
//           noHead: false,
//         },
//         component: () => import('../views/sharedbike/manage/task/HistoryTask.vue'),
//       }
//     ]
//   },
//   {
//     path: '/trafficMonitor',
//     name: '交通监测',
//     meta: {
//       isMapLayout: true,
//       noMenu: false,
//       noHead: false,
//     },
//     children: [
//       {
//         path: 'freightTransport',
//         name: '共享出行监测',
//         meta: {
//           isMapLayout: true,
//           noMenu: false,
//           noHead: false,
//         },
//         component: () => import('../views/trafficMonitor/sharedMobility/SharedMobility.vue'),
//       },
//       {
//         path: 'passengerTransport',
//         name: '网约车监测',
//         meta: {
//           isMapLayout: true,
//           noMenu: false,
//           noHead: false,
//         },
//         component: () => import('../views/trafficMonitor/carHailing/CarHailing.vue'),
//       },
//       {
//         path: 'overload',
//         name: '出租车监测',
//         meta: {
//           isMapLayout: true,
//           noMenu: false,
//           noHead: false,
//         },
//         component: () => import('../views/trafficMonitor/taxi/TaxiMonitor.vue'),
//       },
//       {
//         path: 'dangerousGoods',
//         name: '公交监测',
//         meta: {
//           isMapLayout: true,
//           noMenu: false,
//           noHead: false,
//         },
//         component: () => import('../views/trafficMonitor/bus/BusMonitor.vue'),
//       }
//     ]
//   },
//   {
//     path: '/transportMonitor',
//     name: '运输监测',
//     meta: {
//       isMapLayout: true,
//       noMenu: false,
//       noHead: false,
//     },
//     children: [
//       {
//         path: 'passengerTransport',
//         name: '客运信息',
//         meta: {
//           isMapLayout: true,
//           noMenu: false,
//           noHead: false,
//         },
//         component: () => import('../views/transportMonitor/passengerTransport/PassengerTransport.vue'),
//       },
//       {
//         path: 'freightTransport',
//         name: '货运信息',
//         meta: {
//           isMapLayout: true,
//           noMenu: false,
//           noHead: false,
//         },
//         component: () => import('../views/transportMonitor/freightTransport/FreightTransport.vue'),
//       },
//       {
//         path: 'overload',
//         name: '超载超限',
//         meta: {
//           isMapLayout: true,
//           noMenu: false,
//           noHead: false,
//         },
//         component: () => import('../views/transportMonitor/overload/Overload.vue'),
//       },
//       {
//         path: 'dangerousGoods',
//         name: '危险品运输',
//         meta: {
//           isMapLayout: true,
//           noMenu: false,
//           noHead: false,
//         },
//         component: () => import('../views/transportMonitor/dangerousGoods/DangerousGoods.vue'),
//       }
//     ]
//   },
//   {
//     path: '/envMonitor',
//     name: '环境监测',
//     meta: {
//       isMapLayout: true,
//       noMenu: false,
//       noHead: false,
//     },
//     children: [
//       {
//         path: 'weather',
//         name: '气象信息',
//         meta: {
//           isMapLayout: true,
//           noMenu: false,
//           noHead: false,
//         },
//         component: () => import('../views/envMonitor/weather/Weather.vue'),
//       },
//       {
//         path: 'earthquake',
//         name: '地震信息',
//         meta: {
//           isMapLayout: true,
//           noMenu: false,
//           noHead: false,
//         },
//         component: () => import('../views/envMonitor/earthquake/Earthquake.vue'),
//       }
//     ]
//   },
// ]
//
// export default routerData
