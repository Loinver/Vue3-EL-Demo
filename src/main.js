/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-03-31 10:22:38
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-13 14:08:58
 */
import { createApp } from 'vue';
import 'normalize.css';
// 完整引入element-plus
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'assets/styles/index.scss';
import App from './App.vue';
import router from './router';
import store from './store/index';
// import api from '@/api/index.js'; // 暂时用不上接口请求

const app = createApp(App);
// app.config.globalProperties.$api = api; // 暂时用不上
// 挂载组件
app.use(ElementPlus, { size: 'small' });
// 挂载路由及状态存储
app.use(router).use(store).mount('#app');
