// 获取当前应用运行变量
const ENV = process.env.VUE_APP_BASE_ENV;
// 配置文件模块化
const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

module.exports = modules[ENV];
