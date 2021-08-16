/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-08-16 14:58:27
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-16 16:06:02
 */
const DRAWING_ITEMS = 'drawingItems';
const DRAWING_ITEMS_VERSION = '1.0';
const DRAWING_ITEMS_VERSION_KEY = 'DRAWING_ITEMS_VERSION';
const DRAWING_ID = 'idGlobal';
const TREE_NODE_ID = 'treeNodeId';
const CONTAINER_CONF = 'containerConf';

export function getDrawingList() {
  // 加入缓存版本的概念，保证缓存数据与程序匹配
  const version = localStorage.getItem(DRAWING_ITEMS_VERSION_KEY);
  if (version !== DRAWING_ITEMS_VERSION) {
    localStorage.setItem(DRAWING_ITEMS_VERSION_KEY, DRAWING_ITEMS_VERSION);
    saveDrawingList([]);
    return null;
  }

  const str = localStorage.getItem(DRAWING_ITEMS);
  if (str) return JSON.parse(str);
  return null;
}

export function saveDrawingList(list) {
  localStorage.setItem(DRAWING_ITEMS, JSON.stringify(list));
}

export function getIdGlobal() {
  const str = localStorage.getItem(DRAWING_ID);
  if (str) return parseInt(str, 10);
  return 100;
}

export function saveIdGlobal(id) {
  localStorage.setItem(DRAWING_ID, `${id}`);
}

export function getTreeNodeId() {
  const str = localStorage.getItem(TREE_NODE_ID);
  if (str) return parseInt(str, 10);
  return 100;
}

export function saveTreeNodeId(id) {
  localStorage.setItem(TREE_NODE_ID, `${id}`);
}

export function getContainerConf() {
  const str = localStorage.getItem(CONTAINER_CONF);
  if (str) return JSON.parse(str);
  return null;
}

export function saveContainerConf(obj) {
  localStorage.setItem(CONTAINER_CONF, JSON.stringify(obj));
}
