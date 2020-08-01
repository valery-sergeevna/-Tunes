import { addZero } from './supScripts.js';

export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player'),
    videoButtonPlay = document.querySelector('.video-button__play'),   
    videoButtonStop = document.querySelector('.video-button__stop'),   
    videoTimePassed = document.querySelector('.video-time__passed'),  
    videoProgress  = document.querySelector('.video-progress'), 
    videoTimeTotal = document.querySelector('.video-time__total'),
    videoFullScreen = document.querySelector('.video-fullscreen'),
    videoVolume = document.querySelector('.video-volume'),
    videoIconDown = document.querySelector('.video-icon__down');
    
    //изменить значение иконок паузы/плэя
    const toggleIcon = () => {
        if (videoPlayer.paused){
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        }else{
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };

    const toggleVolumePlay = () => {
        if(videoPlayer.muted){
            videoPlayer.muted = false;
            videoVolume.value = videoPlayer.volume * 100;
        } else {
            videoPlayer.muted = true;
            videoVolume.value = 0;
        }
    };
    //изменить иконки звук/отключить звук
    const toggleVolumeIcon = () =>{
        if (videoVolume.value == 0){
            videoIconDown.classList.add('fa-volume-off');
            videoIconDown.classList.remove('fa-volume-down');
        } else{
            videoIconDown.classList.remove('fa-volume-off');
            videoIconDown.classList.add('fa-volume-down');
        }
    };

    //запустить/ остановить видео
    const togglePlay = () => {
        if (videoPlayer.paused){
            videoPlayer.play();
        }else{
            videoPlayer.pause();
        }
    };
    //остановить видео
    const stopPlay = () =>{
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        
    };
    
    //остановить/запустить видео
    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);
    
    //смена иконок
    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    //обновить текущее время и определить длину видео
    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime,
            duration = videoPlayer.duration;
        
        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal= Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        //изменить текст ползунков инпута
        videoTimePassed.textContent = addZero(minutePassed)  + ":" + addZero(secondsPassed);
        videoTimeTotal.textContent = addZero(minuteTotal) + ":" + addZero(secondsTotal);
    });
    
    // изменять текущее время при передвижении ползунка
    videoProgress.addEventListener('change' , () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    //остановить видео
    videoButtonStop.addEventListener('click', stopPlay);
    videoFullScreen.addEventListener('click', () => {
        videoPlayer.webkitEnterFullScreen();
    });

    //регулировать звук видео
    videoVolume.addEventListener("input", () => {
        videoPlayer.volume = videoVolume.value / 100;
        toggleVolumeIcon();
    });

    //начально положение ползунка звука
    videoVolume.value = videoPlayer.volume * 100;
    
    //изменить иконку звука
    videoIconDown.addEventListener('click', () => {
        toggleVolumePlay();
        toggleVolumeIcon();
    });

    videoPlayerInit.stop = () => {
        if(!videoPlayer.paused){
            stopPlay();
        }
    };

};