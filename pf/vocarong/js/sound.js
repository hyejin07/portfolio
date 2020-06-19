if(localStorage.getItem("bgmVolume") == null)localStorage.setItem("bgmVolume", 0.3);
if(localStorage.getItem("effVolume") == null)localStorage.setItem("effVolume", 0.3);

var eff_audio = arrayAudio([
    "audio/정답.mp3",     // 0 정답 효과음
    "audio/오답.mp3",     // 1 오답 효과음 
    "audio/start.mp3",    // 2 스타트 효과음 
    "audio/click.mp3",    // 3 클릭 효과음 
    "audio/ready.mp3",    // 4 게임 준비 
    "audio/go.mp3",       // 5 게임 시작 
    "audio/gameover.mp3", // 6 게임 종료
    "audio/purchase.mp3", // 7 상품 구매
]);
var bgm_audio = arrayAudio([
    "audio/start_bgm.mp3",  // index 페이지 배경음
    "audio/study_bgm.mp3",  // 1~5 페이지 배경음 
    "audio/game_bgm.mp3",   // game 페이지 배경음 
]);


var cnt = 0;
function arrayAudio(arr){
    return arr.map(function(v){
            var audio=new Audio();
            audio.src=v;
            audio.addEventListener("canplaythrough", function(e){
                cnt++;
                if(cnt==7)bgmPlay(cntPage);
            });
            return audio;
        }
    )
}

function effectPlay (path){
    try{
        for(var i = 0;i<eff_audio.length;i++){
            eff_audio[i].volume = localStorage.getItem("effVolume");
            eff_audio[i].pause();
            eff_audio[i].currentTime = 0;
        }
        switch(path){
            case "right_eff":
                eff_audio[0].play();
            break;
            case "wrong_eff":
                eff_audio[1].play();
            break;
            case "start_eff":
                eff_audio[2].play();
                eff_audio[2].addEventListener('ended', mainCall);
            break;
            case "click_eff":
                eff_audio[3].play();
            break;
            case "ready_eff":
                eff_audio[4].play();
            break;
            case "go_eff":
                eff_audio[5].play();
            break;
            case "over_eff":
                eff_audio[6].play();
            break;
            case "purchase_eff":
                eff_audio[7].play();
            break;
            default:
                eff_audio[path].play();
            break;
        }
    }catch(e){
        console.log("effect null!");
        //window.project_control.callLog("effect null!");
    }       
}
function bgmPlay(path){
    try{
        for(var i = 0;i<bgm_audio.length;i++){
            bgm_audio[i].volume = localStorage.getItem("bgmVolume");
            bgm_audio[i].pause();
            bgm_audio[i].currentTime = 0;
        }
        switch(path){
            case -1:
                break;
            case 0:
                //window.project_control.callLog("bgm play");
                bgm_audio[0].play();
                bgm_audio[0].addEventListener('ended', loopPlay);
            break;
            case 1: case 2: case 3: case 4: case 5:
                bgm_audio[1].play();
                bgm_audio[1].addEventListener('ended', loopPlay);
            break;
            case "game":
                bgm_audio[2].play();
                bgm_audio[2].addEventListener('ended', loopPlay);
            break;
            default:
                bgm_audio[path].play();
                bgm_audio[path].addEventListener('ended', loopPlay);
            break;
        }
    }catch(e){
        console.log("bgm null!");
        //window.project_control.callLog("bgm null!");
    }       
}
function narr2Play(path){
    try{
        for(var i = 0;i<narr_audio2.length;i++){
            narr_audio2[i].volume = localStorage.getItem("effVolume");
            narr_audio2[i].pause();
            narr_audio2[i].currentTime = 0;
        }
        if(path!=-1)narr_audio2[path].play();
    }catch(e){
        console.log("narr2 null!");
        //window.project_control.callLog("narr2 null!");
    }       
}
function narr4Play(path){
    try{
        console.log("narr4Play");
        for(var i = 0;i<narr_audio4.length;i++){
            narr_audio4[i].volume = localStorage.getItem("effVolume");
            narr_audio4[i].pause();
            narr_audio4[i].currentTime = 0;
        }
        if(path!=-1){
            narr_audio4[path].play();
            narr_audio4[path].addEventListener('ended', returnNarr);
        }
    }catch(e){
        console.log("narr4 null!");
        //window.project_control.callLog("narr4 null!");
    }       
}
function returnNarr(e){
    console.log("returnNarr");
    if(cntPage==4){
        $('.iframe').get(0).contentWindow.page4();
    }else if(cntPage==5){
        $('.iframe').get(0).contentWindow.page5();
    }
}
function loopPlay(e){bgmPlay(cntPage);}
