window.onload = function(){
    var headerTwo = document.getElementsByClassName("header-two")[0];
    var list = document.getElementsByClassName("list")[0];
    // console.log(list)
    var pictureNum = document.getElementsByClassName("picture-num")[0];
    var ul = document.getElementsByClassName("ul-border")[0];
    var lis = ul.getElementsByTagName("li");
    var img = ul.getElementsByTagName("img");
    var count = lis.length;
    // console.log(count);
    var index = 1;
    var bannerWidth = list.offsetWidth;

    // img.style.width = bannerWidth;
    // console.log(bannerWidth);
    var timerId;


    // 分别绑定touch事件
    var startX = 0; // 手指落点
    var startTime = null; // 开始触摸时间
    var touchIndex = 0;

    ul.style.width=count*bannerWidth*2/100+"rem";
    for(var i=0; i < lis.length;i++){
        lis[i].style.width=bannerWidth*2/100+"rem";
    }
    ul.style.left=-index*bannerWidth*2/100+"rem";
    // console.log(ul.style.left);
    window.onresize=function(){
        bannerWidth=list.offsetWidth;
        console.log(bannerWidth);
        ul.style.width=count*bannerWidth*2/100 + "rem";

        for(var i = 0; i < lis.length;i++){
          lis[i].style.width=bannerWidth*2/100+"rem";
          
        }
        ul.style.left=-index*bannerWidth*2/100+"rem";
        // console.log(ul.style.left);
      }

    var strtime=function(){
        timerId=setInterval(function(){
        index++;
        //添加过度效果
        ul.style.transition="left 0.5s ease-in-out";
        ul.style.left=(-index*bannerWidth)*2/100 + "rem";
        if(index>3){
            pictureNum.innerHTML = "1/3";
        }else{
            pictureNum.innerHTML = index+"/3";
        }
        setTimeout(function(){
            //当走到最后一张时候,我就让他等于最后一张
            if(index===count-1){
            index=1;
            // 清除过度效果
            ul.style.transition="none";
            /*偏移到指定的位置*/
            //    ul.style.left=(-index*7.5)+"rem";
            ul.style.left=(-index*bannerWidth)*2/100 + "rem";
            }
        },500);
        },1500);
    };

    // 滑动开始
    function touchstartHandler(e) {
        // 清除定时器
        clearInterval(timerId);
        // 记录滑动开始的时间
        startTime = Date.now();
        // 记录手指最开始的落点
        startX = e.changedTouches[0].clientX;
    }
    // 滑动持续中
    function touchmoveHandler(e) {
        // 获取差值 自带正负
        var dx = e.changedTouches[0].clientX - startX;
        // 干掉过渡
        ul.style.transition="none";
        // 归位
        ul.style.left=(-index*bannerWidth + dx)*2/100 +  "rem";
    }
    //　滑动结束
    function touchendHandeler(e) {
        // 在手指松开的时候，要判断当前是否滑动成功
        var dx = e.changedTouches[0].clientX - startX;
        // 获取时间差
        var dTime = Date.now() - startTime;
        // 滑动成功的依据是滑动的距离（绝对值）超过屏幕的三分之一 或者滑动的时间小于300毫秒同时滑动的距离大于30
        if (Math.abs(dx) > bannerWidth / 3 || (dTime < 300 && Math.abs(dx) > 30)) {
            // 滑动成功了       
            // 判断用户是往哪个方向滑
            if (dx > 0) {
                // 往右滑 看到上一张
                if(index<2){
                    index = 3;
                    ul.style.transition="none";
                    ul.style.left=(-index*bannerWidth)*2/100 +  "rem";
                    pictureNum.innerHTML = index+"/3";
                }else{
                    ul.style.left=((-index+1)*bannerWidth)*2/100 +  "rem";
                    index = index-1;
                    pictureNum.innerHTML = index+"/3";
                }
                
            } else {
                if(index>2){
                index = 1;
                    ul.style.transition="none";
                    ul.style.left=(-index*bannerWidth)*2/100 +  "rem";
                    pictureNum.innerHTML = index+"/3";
                }else{
                    ul.style.left=((-index-1)*bannerWidth)*2/100 +  "rem";
                    index = index +1; 
                    pictureNum.innerHTML = index+"/3";
                }
            }
        } else {
        // 添加上过渡
        ul.style.transition="left 0.5s ease-in-out";
        ul.style.left=(-index*bannerWidth)*2/100 +  "rem";
        }
        // 重新启动定时器
        clearInterval(timerId);
        // 调用定时器
        strtime();
    }
    ul.addEventListener('touchstart', touchstartHandler); // 滑动开始绑定的函数 touchstartHandler
    ul.addEventListener('touchmove', touchmoveHandler);  // 持续滑动绑定的函数 touchmoveHandler
    ul.addEventListener('touchend', touchendHandeler);  // 滑动结束绑定的函数 touchendHandeler
    //自动播放调用
    strtime();


    //倒计时模块
    //活动开始时间
    var countdown=document.getElementsByClassName('countDown')[0];
    var countdownnum = document.getElementsByClassName('countDown-number')[0];
    var countdowntitle=document.getElementsByClassName('countDown-title')[0];
    var startdate=new Date("Mar 21 2019 14:00:00");
    var originTime =startdate.getTime();
    var showtime=""; 

    function zeroCompensation(time){
        if(time<10){
        return '0'+time;
        }
        else {
        return time;
        }
    };
   function starterCountDown (){
        setInterval(function(){
            showtitle='';
            showtime=''; 
            var remainTime=parseInt((originTime-new Date().getTime())/1000); 
            if(remainTime<=-10800){
                showtitle="活动已结束"; 
                countdownnum.innerHTML="00:00:00"; 
                countdowntitle.innerHTML=showtitle; 
            }
            //进行中
            else if((remainTime<=0)&&(remainTime>-10800)){ 
                showtitle="距离结束还剩"
                var duration=10800+remainTime;
                var dh=parseInt(duration/3600);
                var dm=parseInt((duration%3600)/60);
                var ds=parseInt((duration%3600)%60)
                showtime=zeroCompensation(dh)+':'+zeroCompensation(dm)+':'+zeroCompensation(ds);
                countdownnum.innerHTML=showtime; 
                countdowntitle.innerHTML=showtitle;
            }
            //未开始
            else{ 
                var dh=parseInt(remainTime/3600);
                var dm=parseInt((remainTime%3600)/60);
                var ds=parseInt((remainTime%3600)%60)
                showtime=zeroCompensation(dh)+':'+zeroCompensation(dm)+':'+zeroCompensation(ds); 
                showtitle="距离开始还剩"
                console.log(showtitle);
                countdownnum.innerHTML=showtime; 
                countdowntitle.innerHTML=showtitle;
            }
        },1000);
    } ;
    starterCountDown();
};