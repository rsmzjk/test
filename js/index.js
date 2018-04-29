/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-04-22 19:58:42
 * @version $Id$
 */
$(function () {
    //导航隐藏
    ~function(){
        var $nav = $('.h-nav'),
            $haveHide = $nav.find('.menu .havehide'),
            $ulHide = $nav.find('.ulhide'),
            $allHide = $ulHide.find('.hide'),
            $logo = $nav.find('.logo'),
            $logo2 = $('.h-logo');

        //页面打开 logo滑入
        $logo2.delay(1000).queue(function(){
            $(this).css({
                left:60,
                opacity:1
            })
        });
        //滚动事件
        $(window).scroll(navScroll());
        function navScroll(){
            if ($(document).scrollTop()) {
                $nav.addClass('scroll');
                $logo.stop().fadeIn();
                $logo2.addClass('scale');
            } else {
                $nav.removeClass('scroll');
                $logo.stop().fadeOut();
                $logo2.removeClass('scale');
            }
            return navScroll;
        };
        //导航滑入事件
        $haveHide.hover(function(){
            $nav.addClass('hover');
            $ulHide.stop().slideDown();
            $allHide.eq($(this).index('.menu .havehide')).stop().fadeIn();
        },function(){
            $nav.removeClass('hover');
            $ulHide.stop().slideUp();
            $allHide.eq($(this).index('.menu .havehide')).stop().fadeOut();
        });
        //导航下拉滑入事件
        $allHide.hover(function(){
            $nav.addClass('hover');
            $ulHide.stop().slideDown();
            $allHide.eq($(this).index()).stop().fadeIn();
        },function(){
            $nav.removeClass('hover');
            $ulHide.stop().slideUp();
            $allHide.eq($(this).index()).stop().fadeOut();
        });
    }();
    //角色动画
    ~function(){
        var $role = $('.h-role'),
            $rol1 = $role.find('.rol1 .role'),
            $rol2 = $role.find('.rol2 .role'),
            $btn = $role.find('.btn'),
            bool = false,//false - 第一组显示     true - 第二组显示
            clickTime = 0;//记录上一次点击时间
        $rol1.removeClass('hide');
        $btn.click(function(){
            if ( new Date() - clickTime > 500) {
                bool?change($rol2,$rol1):change($rol1,$rol2);
                bool = !bool;
                clickTime = new Date();//更新上一次点击时间
            }
        });
        function change($a,$b){
            $a.stop();
            $b.stop();
            $a.addClass('hide').delay(500).queue(function(){
                    $b.removeClass('hide');
                })

        }
    }();
    //游戏日历
    ~function(){
        var $slide = $('.slide'),
            $download = $slide.find('.download'),
            $show = $download.find('.show'),
            $downloadMain = $download.find('.downloadMain'),
            $close = $downloadMain.find('.close'),
            $sideLi = $slide.find('.side-bar li');
        //横向伸缩事件
        $show.click(function(){
            $download.addClass('change');
            $(this).hide();
            $downloadMain.show();
        });
        $close.click(function(){
            $download.removeClass('change');
            $(this).stop().delay(200).queue(function(){
                $show.show();
                $downloadMain.hide();
            })
        });
        //游戏日历事件
        $sideLi.hover(function(){
            $(this).stop().addClass('pos');
        },function(){
            $(this).stop().delay(500).queue(function(){
                $(this).removeClass('pos');
            })
        });
    }();
    /*
        左右切换面向对象写法
        占用全局变量 Ban(不带自动) 和 Banauto(带自动)
        启动函数 .init()
    */
    //面向对象的写法
    ~function(){
        //左右切换(无自动)
        function Ban($ul,$li,$tab){
            this.$ul = $ul;
            this.$tab = $tab;
            this.num = 0;
            this.length = $li.length;
            this.width = $li.width();
            this.time = null;
        };
        Ban.prototype = {
            init : function(){
                this.start();
            },
            start : function(){
                var This = this;
                this.$tab.eq(this.num).addClass('on');
                this.$tab.mouseenter(function(){
                    clearTimeout(This.time);
                    var $this = $(this);
                    This.time = setTimeout(function(){
                        This.num = This.$tab.index($this);
                        $this.addClass('on').siblings().removeClass('on');
                        This.$ul.stop().animate({
                            left : -This.width*This.num
                        },300);
                    },300)
                });
            }
        };
        //继承Ban并添加自动
        function Banauto($ul,$li,$tab,$wrap){
            Ban.call(this,$ul,$li,$tab);
            this.$wrap = $wrap;
            this.timer = null;
        }
        function Fn(){};
        Fn.prototype = Ban.prototype;
        Banauto.prototype = new Fn();
        Banauto.prototype.temp = Banauto.prototype.init;
        Banauto.prototype.init = function () {
            this.temp();
            this.auto();
            this.clearTime();
        };
        Banauto.prototype.clearTime = function(){
            var This = this;
            this.$wrap.hover(function(){
                clearInterval(This.timer)
            },function(){
                This.auto();
            });
        };
        Banauto.prototype.auto = function(){
            var This = this;
            this.timer = setInterval(function(){
                This.num++;
                This.num%=This.length;
                This.$tab.eq(This.num).addClass('on').siblings().removeClass('on');
                This.$ul.stop().animate({
                    left : -This.width*This.num
                },300);
            },2000);
        };
        window.Ban = Ban;
        window.Banauto = Banauto;
    }();
    //banner事件
    ~function(){
        var $banner = $('.new').find('.banner'),
            $imgUl = $banner.find('.img'),
            $imgLi = $imgUl.find('li'),
            $tab = $banner.find('.tab span'),
            banner = new Banauto($imgUl , $imgLi , $tab , $banner);
        banner.init();
    }();
    //newinfo事件
    ~function(){
        var $newinfo = $('.newinfo'),
            $tabLi = $newinfo.find('.tab ul li'),
            $show = $newinfo.find('.show'),
            $showUl = $show.find('ul');
        $showUl.each(function(i){
            var num = 0;
            for(var j = 0, length = newData.length; j < length; j++){
                if (!i || newData[j].typeX === (i-1)) {
                    $(this).append("<li><a href='javascript:void(0)'>"+newData[j].title+"</a><span>"+newData[j].time+"</span></li>");
                    num ++;
                    if (num == 5)break;
                }
            };
        });
        var banner = new Ban($show,$showUl,$tabLi);
        banner.init();
    }();
    //式神+主角事件
    ~function(){
        var $role = $('.c-role'),
            $roleTab = $role.find('.title .tab'),
            $tabLi = $role.find('.showRole .list-bar'),
            $listbarTab = $role.find('.lead .tab li'),
            $listbarPic = $role.find('.lead .pic li'),
            $formula = $('.c-role .formula'),//生成所有的式神图标
            $formulaTab = $formula.find('.formula-tab a'),//式神title
            $formulaAll = $formula.find('.formula-all'),//式神
            $formulaSlide = $formula.find('.formula-slide'),
            // $formulaUL = $formula.find('.formula-slide ul'),
            // $formulaBtn = $formulaSlide.find('.btn'),
            width = $formulaSlide.width(),
            num = 0,
            count = [[0,null],[0,null],[0,null],[0,null],[0,null]];//每个对应的计数器
        $tabLi.eq(num).addClass('show');
        $formulaAll.eq(num).addClass('show');
        //式神主角切换事件
        $roleTab.click(function(){
            num = $(this).index('.title .tab');
            $(this).addClass('active').siblings().removeClass('active');
            $tabLi.eq(num).addClass('show').siblings().removeClass('show');
        });
        //主角切换事件
        $listbarTab.click(function(){
            num = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $listbarPic.eq(num).fadeIn().siblings().fadeOut();
        });
        //初始化全部式神
        for (var i = 0; i < roleData.length; i++) {
            var index = 0;
            switch ( roleData[i].level ){
                case "SSR":
                    index = 1;
                    break;
                case "SR":
                    index = 2;
                    break;
                case "R":
                    index = 3;
                    break;
                case "N":
                    index = 4;
                    break;
            }
            count[0][0]++;
            count[index][0] ++;
            if ( count[0][0] % 2 ){
                count[0][1] = $("<li class='ssList'></li>");
                $formulaSlide.children('ul').eq(0).append(count[0][1]);
            }
            if (count[index][0] % 2) {
                count[index][1] = $("<li class='formula-list'></li>");
                $formulaSlide.children('ul').eq(index).append(count[index][1]);
            }
            var str = roleData[i].isNew?'<i class="new"></i>':'';
            var $div = $("<div class='formula-box'>"+
                "<img src='img/index/content/shishen/"+roleData[i].id+".png'>"+
                "<p class='cover'><span>"+roleData[i].name+"</span></p>"+
                str+
                "</div>");
            var $clone = $div.clone();
            count[0][1].append($div);
            count[index][1].append($clone);
        };
        //式神切换事件
        $formulaTab.click(function(){
            num = $(this).index();
            $(this).addClass('on').siblings().removeClass('on');
            $formulaAll.eq(num).addClass('show').siblings().removeClass('show').each(function(){
                var $btn = $(this).children('.btn');
                num = 0;
                num !== length-1?$btn.eq(1).show():$btn.eq(1).hide();
                num !== 0?$btn.eq(0).show():$btn.eq(0).hide();
                $(this).children().children('ul').css('marginLeft',0);
            });
        });
        $formulaAll.each(function(){
            var $ul = $(this).children().children('ul'),
                $li = $ul.children('li'),
                $btn = $(this).children('.btn'),
                length = Math.ceil($li.length / 6);
            num !== length-1?$btn.eq(1).show():$btn.eq(1).hide();
            num !== 0?$btn.eq(0).show():$btn.eq(0).hide();
            $btn.click(function(){
                if ( $(this).index() === 2 ){
                    num ++;
                    num %= length;
                }else{
                    num --;
                    if (num<0)num = 0;
                }
                num !== length-1?$btn.eq(1).show():$btn.eq(1).hide();
                num !== 0?$btn.eq(0).show():$btn.eq(0).hide();
                $ul.stop().animate({
                    marginLeft : num * -(width+48)
                },300);
            });
        })
        //
    }();
    //攻略 strategy 事件
    ~function(){
        var $strategy = $('.c-strategy'),
            $banner = $strategy.find('.leftPart .banner'),
            $img = $banner.find('.img'),
            $imgLi = $img.find('li'),
            $tab = $banner.find('.tab span'),
            $right = $strategy.find('.rightPart'),
            $titleTab = $right.find('.title .tab'),
            $show = $right.find('.show'),
            $showUl = $show.find('ul');

        //左侧banner切换事件
        var banner = new Banauto($img ,$imgLi ,$tab ,$banner);
        banner.init();

        //右侧选项卡内容填充
        var typeArr = ['新手','式神','斗技','玩法','御魂','高阶'];
        $showUl.each(function(i){
            var num = 0;
            for (var j = 0; j < strateData.length; j++) {
                var data = strateData[j],
                    reg = new RegExp(i-1);
                if ( !i || reg.test(data.type) ) {
                    var index = !i?data.type.charAt(data.type.length-1):i-1;
                    $(this).append('<li>'+
                        '<a href='+data.href+'>'+
                            '<i></i>'+
                            '<p class="mTitle">【<span class="type">'+typeArr[index]+'</span>】&nbsp;'+data.title+'</p>'+
                            '<p class="author">作者：<span>'+data.author+'</span>'+
                            '</p>'+
                        '</a>'+
                    '</li>');
                    num ++;
                    if (num == 10)break;
                }
            }
        });
        //右侧选项卡切换
        var rightBanner = new Ban($show,$showUl,$titleTab);
        rightBanner.init();
    }();
    //同人专区事件
    ~function(){
        var $fan = $('.c-fan'),
            $tab = $fan.find('.tab .tabBar ul li'),
            $show = $fan.find('.show'),
            $showUl = $show.find('ul');
        //选项卡内容填充
        $showUl.each(function(i){
            var num = 0;
            for (var j = 0; j < fanData.length; j++) {
                var data = fanData[j];
                if ( data.typeX === i ) {
                    console.log(fanData[j].typeX)
                    $(this).append('<li>'+
                        '<a href='+data.href+'>'+
                            '<img src='+data.url+'>'+
                            '<span><label></label></span>'+
                        '</a>'+
                        '<p>'+data.title+'</p>'+
                    '</li>');
                    num ++;
                    if (num == 8)break;
                }
            };
        });
        //选项卡切换
        var banner = new Ban($show,$showUl,$tab);
        banner.init();
    }();
    //返回顶部事件
    ~function(){
        var $goTop = $('.goTop');
        $goTop.click(function(){
            $('body,html').animate({
                scrollTop : 0
            },1000);
        });
    }();
});
