(function () {
    window.zhuge = window.zhuge || [];
    window.zhuge.methods =
        "_init identify track getDid getSid getKey setSuperProperty setUserProperties setWxProperties setPlatform".split(" ");
    window.zhuge.factory = function (b) {
        return function () {
            var a = Array.prototype.slice.call(arguments);
            a.unshift(b);
            window.zhuge.push(a);
            return window.zhuge;
        }
    };
    for (var i = 0; i < window.zhuge.methods.length; i++) {
        var key = window.zhuge.methods[i];
        window.zhuge[key] = window.zhuge.factory(key);
    }
    window.zhuge.load = function (b, x) {
        if (!document.getElementById("zhuge-js")) {
            var a = document.createElement("script");
            var verDate = new Date();
            var verStr = verDate.getFullYear().toString() + verDate.getMonth().toString() + verDate.getDate().toString();

            a.type = "text/javascript";
            a.id = "zhuge-js";
            a.async = !0;
            a.src = (location.protocol == 'http:' ? "http://sdk.zhugeio.com/zhuge.min.js?v=" :
                'https://zgsdk.zhugeio.com/zhuge.min.js?v=') + verStr;
            a.onerror = function () {
                window.zhuge.identify = window.zhuge.track = function (ename, props, callback) {
                    if (callback && Object.prototype.toString.call(callback) === '[object Function]') {
                        callback();
                    } else if (Object.prototype.toString.call(props) === '[object Function]') {
                        props();
                    }
                };
            };
            var c = document.getElementsByTagName("script")[0];
            c.parentNode.insertBefore(a, c);
            window.zhuge._init(b, x)
        }
    };
    window.zhuge.load('f375fe2f71e542a4b890d9a620f9fb32', {
        superProperty: { //鍏ㄥ眬鐨勪簨浠跺睘鎬�(閫夊～)
            '搴旂敤鍚嶇О': '璁㈠崟鏁版嵁缁熻',
            'platform': 'web',
        },
        adTrack: false, //骞垮憡鐩戞祴寮€鍏筹紝榛樿涓篺alse
        visualizer: true, //鍙鍖栧煁鐐瑰紑鍏�
        autoTrack: false,
        //鍚敤鍏ㄥ煁鐐归噰闆嗭紙閫夊～锛岄粯璁alse锛�
        singlePage: false //鏄惁鏄崟椤甸潰搴旂敤锛圫PA锛夛紝鍚敤autoTrack鍚庣敓鏁堬紙閫夊～锛岄粯璁alse锛�

    });
})();