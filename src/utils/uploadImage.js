import EXIF from 'exif-js';

const uploadImage = function (obj) {
  const file = obj.files;
  if (file.size && file.size > obj.maxSize) {
    const max = obj.mixsize / 1024 / 1024;
    let errorTxT;
    if (max < 1) {
      errorTxT = '上传失败，照片大小超出限制' + obj.maxSize / 1024 + 'K';
    } else {
      errorTxT = '上传失败，照片大小超出限制' + obj.maxSize / 1024 / 1024 + 'M';
    }
    obj.error(errorTxT);
  } else if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
    obj.error('上传失败，请检查您的照片格式');
  } else {
    const ready = new FileReader();
    /**
     * 开始读取File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.
     */
    ready.readAsDataURL(file);
    ready.onload = function () {
      const path = this.result;
      const img = new Image();
      img.src = path;
      img.onload = function () {
        const _self = this;
        // 默认按比例压缩
        let w = _self.width;
        let h = _self.height;
        let scale = w / h;
        w = w > obj.width ? obj.width : w;
        h = h > obj.height ? obj.height : w / scale;
        // 生成canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = w;
        canvas.height = h;
        if (navigator.userAgent.match(/iphone/i)) {
          let orient = getOrient(_self);
          console.log(orient, w, h);
          if (orient === 6) {
            ctx.drawImage(_self, 0, 0, w, h);
            const imgData1 = ctx.getImageData(0, 0, w, h);
            const canvas2 = document.createElement('canvas');
            const ctx2 = canvas2.getContext('2d');
            canvas2.width = h;
            canvas2.height = w;
            ctx2.drawImage(_self, 0, 0, h, w);
            const imgData2 = ctx2.getImageData(0, 0, h, w);
            for (let i = 0; i < w; ++i) {
              for (let j = 0; j < h; ++j) {
                let index1 = (i * h + j) * 4;
                let index2 = ((h - j) * w + i) * 4;
                imgData2.data[index1 + 0] = imgData1.data[index2 + 0];
                imgData2.data[index1 + 1] = imgData1.data[index2 + 1];
                imgData2.data[index1 + 2] = imgData1.data[index2 + 2];
                imgData2.data[index1 + 3] = imgData1.data[index2 + 3];
              }
            }
            ctx2.putImageData(imgData2, 0, 0);
            let base64 = canvas2.toDataURL(file.type, obj.quality || 0.8);
            obj.success(base64);
          } else {
            ctx.drawImage(_self, 0, 0, w, h);
            let base64 = canvas.toDataURL(file.type, obj.quality || 0.8);
            obj.success(base64);
          }
        } else {
          ctx.drawImage(_self, 0, 0, w, h);
          let quality = obj.quality || 0.8; // 默认图片质量为0.8
          // quality值越小，所绘制出的图像越模糊
          obj.success(canvas.toDataURL(file.type, quality));
        }
      };
    };
  }

  function getOrient(file) {
    let orient;
    EXIF.getData(file, function () {
      EXIF.getAllTags(this);
      orient = EXIF.getTag(this, 'Orientation');
    });
    return orient;
  }
};
export default uploadImage;
