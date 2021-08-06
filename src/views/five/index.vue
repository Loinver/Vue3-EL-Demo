<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-07-26 13:37:27
 * @LastEditors: Linyer
 * @LastEditTime: 2021-07-26 13:47:18
-->
<template>
  <div><canvas id="canvas" width="600" height="600"></canvas></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.play();
  },
  methods: {
    play() {
      const _self = this;
      const canvas = document.getElementById('canvas');

      const ctx = canvas.getContext('2d');

      // 绘制棋盘

      // 水平，总共15条线
      for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        ctx.moveTo(20, 20 + i * 40);
        ctx.lineTo(580, 20 + i * 40);
        ctx.stroke();
        ctx.closePath();
      }

      // 垂直，总共15条线
      for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        ctx.moveTo(20 + i * 40, 20);
        ctx.lineTo(20 + i * 40, 580);
        ctx.stroke();
        ctx.closePath();
      }

      // 是否下黑棋
      // 黑棋先走
      let isBlack = true;

      // 棋盘二维数组
      let cheeks = [];

      for (let i = 0; i < 15; i++) {
        cheeks[i] = new Array(15).fill(0);
      }

      canvas.onclick = function (e) {
        const clientX = e.clientX;
        const clientY = e.clientY;
        // 对40进行取整，确保棋子落在交叉处
        const x = Math.round((clientX - 20) / 40) * 40 + 20;
        const y = Math.round((clientY - 20) / 40) * 40 + 20;
        // cheeks二维数组的索引
        // 这么写有点冗余，这么写你们好理解一点
        const cheeksX = (x - 20) / 40;
        const cheeksY = (y - 20) / 40;
        // 对应元素不为0说明此地方已有棋，返回
        if (cheeks[cheeksY][cheeksX]) return;
        // 黑棋为1，白棋为2
        cheeks[cheeksY][cheeksX] = isBlack ? 1 : 2;
        ctx.beginPath();
        // 画圆
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        // 判断走黑还是白
        ctx.fillStyle = isBlack ? 'black' : 'white';
        ctx.fill();
        ctx.closePath();

        // canvas画图是异步的，保证画出来再去检测输赢
        setTimeout(() => {
          if (isWin(cheeksX, cheeksY)) {
            const con = confirm(`${isBlack ? '黑棋' : '白棋'}赢了！是否重新开局？`);
            // 重新开局
            ctx.clearRect(0, 0, 600, 600);
            con && _self.play();
          }
          // 切换黑白
          isBlack = !isBlack;
        }, 0);
      };
      // 判断是否五连子
      function isWin(x, y) {
        const flag = isBlack ? 1 : 2;
        // 上和下
        if (up_down(x, y, flag)) {
          return true;
        }

        // 左和右
        if (left_right(x, y, flag)) {
          return true;
        }
        // 左上和右下
        if (lu_rd(x, y, flag)) {
          return true;
        }

        // 右上和左下
        if (ru_ld(x, y, flag)) {
          return true;
        }

        return false;
      }

      function up_down(x, y, flag) {
        let num = 1;
        // 向上找
        for (let i = 1; i < 5; i++) {
          let tempY = y - i;
          console.log(x, tempY);
          if (tempY < 0 || cheeks[tempY][x] !== flag) break;
          if (cheeks[tempY][x] === flag) num += 1;
        }
        // 向下找
        for (let i = 1; i < 5; i++) {
          let tempY = y + i;
          console.log(x, tempY);
          if (tempY > 14 || cheeks[tempY][x] !== flag) break;
          if (cheeks[tempY][x] === flag) num += 1;
        }
        return num >= 5;
      }

      function left_right(x, y, flag) {
        let num = 1;
        // 向左找
        for (let i = 1; i < 5; i++) {
          let tempX = x - i;
          if (tempX < 0 || cheeks[y][tempX] !== flag) break;
          if (cheeks[y][tempX] === flag) num += 1;
        }
        // 向右找
        for (let i = 1; i < 5; i++) {
          let tempX = x + i;
          if (tempX > 14 || cheeks[y][tempX] !== flag) break;
          if (cheeks[y][tempX] === flag) num += 1;
        }
        return num >= 5;
      }

      function lu_rd(x, y, flag) {
        let num = 1;
        // 向左上找
        for (let i = 1; i < 5; i++) {
          let tempX = x - i;
          let tempY = y - i;
          if (tempX < 0 || tempY < 0 || cheeks[tempY][tempX] !== flag) break;
          if (cheeks[tempY][tempX] === flag) num += 1;
        }
        // 向右下找
        for (let i = 1; i < 5; i++) {
          let tempX = x + i;
          let tempY = y + i;
          if (tempX > 14 || tempY > 14 || cheeks[tempY][tempX] !== flag) break;
          if (cheeks[tempY][tempX] === flag) num += 1;
        }

        return num >= 5;
      }

      function ru_ld(x, y, flag) {
        let num = 1;
        // 向右上找
        for (let i = 1; i < 5; i++) {
          let tempX = x - i;
          let tempY = y + i;
          if (tempX < 0 || tempY > 14 || cheeks[tempY][tempX] !== flag) break;
          if (cheeks[tempY][tempX] === flag) num += 1;
        }
        // 向左下找
        for (let i = 1; i < 5; i++) {
          let tempX = x + i;
          let tempY = y - i;
          if (tempX > 14 || tempY < 0 || cheeks[tempY][tempX] !== flag) break;
          if (cheeks[tempY][tempX] === flag) num += 1;
        }

        return num >= 5;
      }
    },
  },
};
</script>
