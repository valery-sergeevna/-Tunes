import { addZero } from './supScripts.js';

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio'),
    audioImg = document.querySelector('.audio-img'),
    audioHeader = document.querySelector('.audio-header'),
    audioPlayer = document.querySelector('.audio-player'),
    audioNavigation = document.querySelector('.audio-navigation'),
    audioButtonPlay = document.querySelector('.audio-button__play'),
    audioProgress = document.querySelector('.audio-progress'),
    audioProgressTiming = document.querySelector('.audio-progress__timing'),
    audioTimePassed = document.querySelector('.audio-time__passed'),
    audioTimeTotal = document.querySelector('.audio-time__total');

    const playList = ['hello','flow', 'speed'];

    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playList[trackIndex];

        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if(isPlayed){
            audioPlayer.pause();
        }else{
            audioPlayer.play();
        }

        setTimeout(updateTime, 300);
    };
    const prevTrack = () => {
        if(trackIndex !== 0){
            trackIndex--;
        }else{
            trackIndex = playList.length - 1;
        }
        loadTrack();
    };

    const nextTrack = () => {
        if(trackIndex === playList.length - 1){
            trackIndex = 0;
        }else{
            trackIndex++;
        }
        loadTrack();
    };

    const updateTime = () => {
        const currentTime = audioPlayer.currentTime,
            duration = audioPlayer.duration,
            progress = (currentTime / duration) * 100;

            audioProgressTiming.style.width = progress + '%';


        let minutePassed = Math.floor(currentTime / 60)  || '0';
        let secondsPassed = Math.floor(currentTime % 60) || '0';

        let minuteTotal= Math.floor(duration / 60) || '0';
        let secondsTotal = Math.floor(duration % 60) || '0';

        //изменить текст ползунков инпута
        audioTimePassed.textContent = addZero(minutePassed)  + ":" + addZero(secondsPassed);
        audioTimeTotal.textContent = addZero(minuteTotal) + ":" + addZero(secondsTotal);
    };
    

    updateTime();

    audioNavigation.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('audio-button__play')){
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if(audioPlayer.paused){
                audioPlayer.play();
            }else{
                audioPlayer.pause();
            }
            audioHeader.textContent = playList[trackIndex].toUpperCase();
        }

        if (target.classList.contains('audio-button__prev')){
           prevTrack();
        }

        if (target.classList.contains('audio-button__next')){
            nextTrack();
        }
    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', updateTime);

    audioProgress.addEventListener('click', e => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;

        audioPlayer.currentTime = progress;
    });


    musicPlayerInit.stop = () => {
        if(!audioPlayer.paused){
            audioPlayer.pause();
            audio.classList.remove('play');
            audioButtonPlay.classList.remove('fa-pause');
            audioButtonPlay.classList.add('fa-play');
        }
    };
};