$(function(){
	var arrayAudio=function(arr){
		return arr.map(function(v){
				var audio=new Audio();
				audio.src=v;
				audio.addEventListener("canplaythrough", soundLoaded);
				return audio
			}
		)
	};

	var snd_cnt = 0;

	function soundLoaded(e){
		snd_cnt++;
		if(snd_cnt == audio.length){
			$(document).on('load', function(){
				if(isMobile){
					try{
						for(var i=0;i<audio.length;i++){
							audio[i].pause();
							audio[i].currentTime = 0;
							audio[i].play();
							audio[i].pause();
						}
					}catch(e){
						console.log("mobile exception!");
					}
				}
				audioFunction(3);
				$(this).fadeOut();
			})
		}
	}

	var audio = arrayAudio([
		'audio/click.mp3',
		'audio/slide.mp3',
		'audio/closeBtn.mp3',
		'audio/correct.mp3',
		'audio/wrong.mp3',
	]);

	$('.answerToggle').on('click', function(){
		audio[0].pause();
		audio[0].currentTime = 0;
		audio[0].play();
	})
})