
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/index/index","pages/booking/booking","pages/bookingArrange/bookingArrange","pages/dispatchFarmer/dispatchFarmer","pages/dispatchMachine/dispatchMachine","pages/bookingList/bookingList","pages/dispatchService/dispatchService","pages/healthReport/healthReport","pages/statistics/statistics"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","rpxCalcMaxDeviceWidth":1200,"rpxCalcIncludeWidth":960,"rpxCalcBaseDeviceWidth":750},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":true},"appname":"农机预约调度服务","compilerVersion":"3.4.7","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/index/index","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/booking/booking","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/bookingArrange/bookingArrange","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/dispatchFarmer/dispatchFarmer","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/dispatchMachine/dispatchMachine","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/bookingList/bookingList","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/dispatchService/dispatchService","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/healthReport/healthReport","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/statistics/statistics","meta":{},"window":{"navigationStyle":"custom"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
