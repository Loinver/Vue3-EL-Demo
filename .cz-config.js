/*
 * @Author: your name
 * @Date: 2021-08-11 14:40:49
 * @LastEditTime: 2021-08-11 15:09:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-el-template/.cz-config.js
 */
module.exports = {
  types: [
    {
      value: 'init',
      name: '✨  init:     项目初始化',
    },
    {
      value: 'feat',
      name: '✨  feat:     新增功能',
    },
    {
      value: 'fix',
      name: '✨  fix:      bug修复',
    },
    {
      value: 'docs',
      name: '✨  docs:     文档更新',
    },
    {
      value: 'test',
      name: '✨  test:     添加、修改测试用例',
    },
    {
      value: 'chore',
      name: '✨  chore:    对构建过程或辅助工具和库的更改(不影响源文件、测试用例)',
    },
    {
      value: 'style',
      name: '✨  style:    代码格式(不影响功能，例如空格、分号等格式修正)',
    },
    {
      value: 'other',
      name: '✨  other:    其他',
    },
  ],

  scopes: [
    ['pages', '新增页面'],
    ['api', '新增接口'],
    ['components', '组件相关'],
    ['utils', 'utils 相关'],
    ['styles', '样式相关'],
    ['store', 'store修改'],
    ['deps', '项目依赖'],
    ['README', 'README修改'],
    ['other', '其他修改'],
    ['custom', '以上都不是？我要自定义'],
  ].map(([value, description]) => {
    return {
      value,
      name: `${value.padEnd(30)} (${description})`,
    };
  }),
  messages: {
    type: '确保本次提交遵循规范！\n选择你要提交的类型：',
    customScope: '请输入自定义的 scope:',
    subject: '填写本次提交描述* ( 一句话概括 ):\n',
    body: '填写更加详细的变更描述 ( 不填可以直接回车,话多使用 "|" 换行 ):\n',
    breaking: '列举非兼容性重大的变更 ( 不填可以直接回车,话多使用 "|" 换行 ):\n',
    footer: '列举出所有变更的 ISSUES CLOSED 例如: #31, #34 ( 不填可以直接回车,话多使用 "|" 换行 ):\n',
    confirmCommit: '确认提交？( 这步完了 需要在控制台输入 "git push origin <你需要提交远程分支名>" )',
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
};
