
export const px2vw = (size) => {
    const ui_width = 750
    return size / ui_width * 100 + 'vw'
}