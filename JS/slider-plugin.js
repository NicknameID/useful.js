//Slider插件滑动组件切换的使用方法：参1,底部小角标元素的数组；参2,滑动组件inner的元素；参3,inner单步要移动的距离;
//jStyleNew / jStyleOld 切换底部小角标元素的样式
(function(){
  var sliderPlugin = {
    Slider:function (aImgs,slider,step){
      if( typeof aImgs.length !== 'number' && length<0 ){ //保证输入的是一个类数组格式参数
        console.error('first parameter is not a array');
        return;
      }
      if( !$ ){ //因为插件依赖jQuery，防止没有依赖引起的报错问题
        console.error('No jQuery dependency');
        return;
      }
      this.aImgs = aImgs;
      this.slider = slider;
      this.step = step;
      this.now = 0;
      this.imgsLength = this.aImgs.length;
    },
  };
  //添加
  sliderPlugin.Slider.prototype.pre = function(jStyleNew,jStyleOld){
    if( !$(this.slider).is(':animated') ){
      this.now--;
      if(this.now<0) this.now = this.imgsLength - 1;
      $(this.aImgs).eq(this.now).css(jStyleNew)
      .siblings().css(jStyleOld);
      $(this.slider).animate({'left':-this.now*this.step+'px'},500);
    }
  };
  sliderPlugin.Slider.prototype.next = function(jStyleNew,jStyleOld){
    if( !$(this.slider).is(':animated') ){
      this.now++;
      if(this.now>this.imgsLength - 1) this.now = 0;
      $(this.aImgs).css(jStyleNew)
      .siblings().css(jStyleOld);
      $(this.aImgs).eq(this.now).css(jStyleNew);
      $(this.slider).animate({'left':-this.now*this.step+'px'},500);
    }
  };
  sliderPlugin.Slider.prototype.point = function(ev,jStyleNew,jStyleOld){
    // var ev = ev || window.event;
    if( !$(this.slider).is(':animated') ){
      var which = $(ev.target).index();
      $(ev.target).css(jStyleNew).siblings().css(jStyleOld);
      $(this.slider).animate({'left':-which*this.step+'px'},500);
    }
  };
  //绑定对象到window上;
  window.sliderPlugin = sliderPlugin;
})();
