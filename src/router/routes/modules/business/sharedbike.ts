import {AppRouteModule} from "@/router/types";
import { LAYOUT } from '/@/router/constant';

const sharedbike: AppRouteModule = {
  path: '/sharedbike',
  name: '共享单车管理',
  component: LAYOUT,
  redirect: '/sharedbike/userManager',
  businessMeta: {
    isMapLayout: false,
    noMenu: false,
    noHead: false,
  },
  meta: {
    title: '共享单车管理',
  },
  children: [
    {
      path: 'userManager',
      name: '用户管理',
      businessMeta: {
        isMapLayout: false,
        noMenu: false,
        noHead: false,
      },
      component: () => import('/@/views/business/sharedbike/manage/user/UserList.vue'),
      meta: {
        title: '用户管理',
      },
    },
    {
      path: 'taskManage',
      name: '任务管理',
      businessMeta: {
        isMapLayout: false,
        noMenu: false,
        noHead: false,
      },
      component: () => import('/@/views/business/sharedbike/manage/task/TaskList.vue'),
      meta: {
        title: '任务管理',
      },
    },
    {
      path: 'historyTask',
      name: '历史任务',
      businessMeta: {
        isMapLayout: false,
        noMenu: false,
        noHead: false,
      },
      component: () => import('/@/views/business/sharedbike/manage/task/HistoryTask.vue'),
      meta: {
        title: '历史任务',
      },
    }
  ]
};

export default sharedbike;
