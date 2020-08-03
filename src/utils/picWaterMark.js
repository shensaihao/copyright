export const picWaterMark = ({
    url = '',
    textAlign = 'center',
    textBaseline = 'middle',
    font = "20px Microsoft Yahei",
    fillStyle = 'rgba(0, 0, 0)',
    content = '请勿外传',
    cb = null,
    textX = 500,
    textY = 500,
} = {}) => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = 'anonymous';
    img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(img, 0, 0);
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.font = font;
        ctx.fillStyle = fillStyle;
        ctx.fillText(content, img.width - textX, img.height - textY);


        const base64Url = canvas.toDataURL();
        cb && cb(base64Url);
    }
}