/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-03-31 10:27:05
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-06 09:33:53
 */
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/index.html',
  },
  {
    path: '/table.html',
    name: 'tableDemo',
    component: () => import(/* webpackChunkName: "table" */ '@/views/table/index.vue'),
    meta: {
      auth: false,
      title: '首页',
      keepAlive: true,
    },
  },
  {
    // 匹配所有路径  vue2使用*   vue3使用/:pathMatch(.*)*或/:pathMatch(.*)或/:catchAll(.*)
    path: '/:pathMatch(.*)*',
    name: '404',
    redirect: '/index.html',
  },
];
const modulesFiles = require.context('./modules', true, /\.js$/);
// 自动引入module包
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleRouter = modulesFiles(modulePath);
  modules = modules.concat(moduleRouter.default);
  return modules;
}, []);
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes.concat(modules),
});

export default router;
