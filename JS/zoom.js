
export default function zoom(){
    Match();
    // 监听浏览器大小的变化
    window.onresize = function () {
        Match();
    }
    // 匹配浏览器窗口的宽度
    function Match() {
        // 浏览器窗口宽度
        var w_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var scale = 100 * (w_width / 640);
        var html_fs = document.querySelector('html');
        console.log(w_width);
        if (w_width >= 640) {
            html_fs.style.fontSize = "100px";
        } else {
            html_fs.style.fontSize = scale + "px";
        }
    }
}