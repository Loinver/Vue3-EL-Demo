/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-03-31 10:22:38
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-05 11:12:55
 */
import { createApp } from 'vue';
// 完整引入element-plus
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'assets/styles/index.scss';
import App from './App.vue';
import router from './router';
import store from './store/index';

const app = createApp(App);
// 挂载组件
app.use(ElementPlus, { size: 'small' });
// 挂载路由及状态存储
app.use(router).use(store).mount('#app');
