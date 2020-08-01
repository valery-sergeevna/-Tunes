import { radioPlayerInit } from "./radioPlayer.js";
import { videoPlayerInit } from "./videoPlayer.js";
import { musicPlayerInit } from "./musicPlayer.js";

//объявление переменных
const playerBtn = document.querySelectorAll('.player-btn'),
    playerBlock = document.querySelectorAll('.player-block'),
    temp = document.querySelector('.temp');

//деактивация кнопки и плеера
const deactivationPlayer = () => {
    temp.style.display = 'none';
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active'));

    musicPlayerInit.stop();
    radioPlayerInit.stop();
    videoPlayerInit.stop();
};
//открыть блок при нажатии на кнопку
playerBtn.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        deactivationPlayer();
        btn.classList.add('active');
        playerBlock[i].classList.add('active');

    });
});


radioPlayerInit();
videoPlayerInit();
musicPlayerInit();