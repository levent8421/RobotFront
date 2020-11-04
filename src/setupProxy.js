const {createProxyMiddleware} = require("http-proxy-middleware");
console.log(createProxyMiddleware, typeof (createProxyMiddleware));
module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api/", {
            target: "http://192.168.2.102:9001/",
            changeOrigin: true
        })
    );
};
