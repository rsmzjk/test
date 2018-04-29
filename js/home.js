/*window.onload = function () {
    $(document).scrollTop(0);
};*/
$(function () {

    //首屏滑动显示
    ~function(){
        var $move = $('.h-main .h-move');
        $move.eq(0).animate({
            opacity : 1,
            marginLeft : 0
        },1800);
        $move.eq(1).animate({
            opacity : 1,
            marginRight : 0
        },1800);
        $move.eq(2).animate({
            opacity : 1,
            top : 79
        },1200);
        $move.eq(3).animate({
            opacity : 1,
            top : 620
        },1200);
    }();
    //视频弹窗
    ~function(){
        var $btn = $('.h-videoBtn'),
            $btnMask = $('.h-video'),
            $close = $('.close');
        //弹出视频窗口
        $btn.click(function(){
            $btnMask.show();
            $(document.body).css('overflow','hidden');
        });
        //关闭视频窗口
        $close.click(function(){
            $btnMask.hide();
            $(document.body).css('overflow','');
        });
    }();
    //新版本情报
    ~function(){
        var $btnLi = $('.c-info li'),
            $popMask = $('.c-popmask'),
            $popLi = $popMask.find('.c-cont li'),
            $poptxt = $popMask.find('.c-cont .c-txt'),
            $popClose = $popMask.find('.c-cont .close'),
            $popBtn = $popMask.find('.c-cont .btn'),
            poptxtH = $poptxt.height(),
            len = $popLi.length,
            num = 0;

        //自定义滚动条
        $poptxt.each(function(){
            var $popmainTxt = $(this).find('.mainTxt'),//获取 滚动内容盒子
                $popscroll = $(this).find('.scroll'),//获取 滚动盒子
                $popbar = $(this).find('.bar'),//获取 滚动条
                mainH = $popmainTxt.height(),//滚动内容高度
                barH = poptxtH*poptxtH/mainH,//滚动条高度
                topMax = poptxtH - barH,//最大滑动距离
                topMin = 0;//最小课滑动距离
            $popbar.height(barH);//初始化滚动条高度

            //点击滚动条拖动
            $popbar.mousedown(function(ev){
                var sY = ev.clientY,
                    sTop = $(this).position().top,
                    $that = $(this)
                    // ,
                    // $popmainTxt = $(this).parent().siblings()
                    ;

                $(document).mousemove(function(ev){
                    var eY = ev.clientY,
                        top = sTop+eY-sY;
                    top = Math.min(top,topMax);
                    top = Math.max(top,topMin);
                    $that.css('top',top);
                    $popmainTxt.css('top',-top*mainH/poptxtH);
                }).mouseup(function(){
                    $(this).off('mousemove').off('mouseup');
                });
                return false;
            });

            //鼠标滚轮事件
            $(this).mousewheel(function (e,d){
                var top = $popbar.position().top;
                if (d < 0) {
                    top += 10;
                } else {
                    top -= 10;
                }
                top = Math.min(top,topMax);
                top = Math.max(top,topMin);
                $popbar.css('top',top);
                $popmainTxt.css('top',-top*mainH/poptxtH);
                return false;
            });
            //点击滚轮事件
            $popscroll.click(function(ev){
                if ( ev.target === this ) {
                    var y = ev.clientY - ($(this).offset().top-$(document).scrollTop()),
                        top = $popbar.position().top;
                    top = y<top?top-100:top+100;
                    top = Math.min(top,topMax);
                    top = Math.max(top,topMin);
                    $popbar.stop().animate({'top':top},500);
                    $popmainTxt.stop().animate({'top':-top*mainH/poptxtH},500);
                }
            });
        });

        //初始化遮罩层
        $popMask.hide().css('opacity',1);
        $popLi.hide();

        //点击弹出窗口事件
        $btnLi.click(function(){
            num = $(this).index();
            $(document.body).css('overflow','hidden');
            $popMask.show();
            $popLi.eq(num).show().siblings().hide();
        });

        //关闭弹窗事件
        $popClose.click(function(){
            $(document.body).css('overflow','auto');
            $popMask.hide();
        });

        //弹窗按钮切换事件
        $popBtn.click(function(){
            if ($(this).index('.c-cont .btn')) {
                num++;
                num%=len;
            } else {
                num--;
                if (num<0)num = len-1;
            }
            $popLi.eq(num).show().siblings().hide();
        });
    }();
    //游戏特色
    ~function(){
        var $game = $('.game'),
            $slideLi = $game.find('.slide li'),
            $btn = $game.find('.g-box .btn'),
            length = $slideLi.length,
            num = 0;
        //点击图片切换事件
        $slideLi.click(function(){
            if ($(this).index()!==num) {
                num = $(this).index();
                change();
            }
        });
        //切换按钮事件
        $btn.click(function(){
            if ( $(this).index('.g-box .btn') ) {
                num++;
                num%=length;
            }else {
                num--;
                if (num<0)num=length-1;
            }
            change();
        });
        //same
        function change(){
            var numL = num-1,
                numR = num+1;
            if (numL<0)numL=length-1;
            if (numR>=length)numR=0;
            $slideLi.removeClass('left mid right');
            $slideLi.eq(numL).addClass('left');
            $slideLi.eq(num).addClass('mid');
            $slideLi.eq(numR).addClass('right');
        }
    }();
    //延迟显示
    ~function(){
        var $newinfo = $('.newinfo'),
            $title = $newinfo.find('.c-title'),
            $titleG = $('.g-main .c-title'),
            $infoLi = $newinfo.find('.c-info li'),
            arr = [];
        init($title,$titleG,$infoLi);
        $(window).scroll(function(){
            var scrollH = $(document).scrollTop()+$(window).height();
            for (var i = arr.length-1; i >=0; i--) {
                var obj = arr[i];
                if (scrollH>=obj.oddTop) {
                    ~function(){
                        var $That = $(obj);
                        setTimeout(function(){
                            $That.removeClass('hide');
                        },($That.index()%3)*200);
                        arr.slice(i,1);
                    }();
                }
            }
        });
        function init(){
            for (var i = 0; i < arguments.length; i++) {
                arguments[i].each(function(){
                    this.oddTop = $(this).offset().top;
                    arr.push(this);
                });
            }
        }
    }();
});













