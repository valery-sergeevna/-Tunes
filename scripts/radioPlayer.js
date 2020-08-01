export const radioPlayerInit = () => {

    const radio = document.querySelector('.radio'),
        radioCoverImg = document.querySelector('.radio-cover__img'),
        radioNavigation = document.querySelector('.radio-navigation'),
        radioHeaderBig = document.querySelector('.radio-header__big'),
        radioItem = document.querySelectorAll('.radio-item'),
        radioStop = document.querySelector('.radio-stop'),
        radioVolume = document.querySelector('.radio-volume'),
        radioIconDown = document.querySelector('.radio-icon__down');

    //создать функцию-конструктор
    const audio = new Audio();
    audio.type = "audio/aac";

    //деактивация кнопки
    radioStop.disabled = true;

    //сменить иконки при воспроизведении/паузе видео
    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-pause');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-pause');
            radioStop.classList.remove('fa-play');
        }
    };

    //стилизовать выбранную радиостанцию
    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    };

    const toggleVolumePlay = () => {
        if (audio.muted){
            audio.muted = false;
            radioVolume.value = audio.volume * 100;
        } else{
            audio.muted = true;
            radioVolume.value = 0;
        }
    };
    //изменить иконки звук/отключить звук
    const toggleVolumeIcon = () =>{
        if(radioVolume.value == 0){
            radioIconDown.classList.add('fa-volume-off');
            radioIconDown.classList.remove('fa-volume-down');
        }else{
            radioIconDown.classList.remove('fa-volume-off');
            radioIconDown.classList.add('fa-volume-down');
        } 
    };

    //выбрать радиостанцию и заменить ее данными основной блок
    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parent = target.closest('.radio-item');
        selectItem(parent);

        const title = parent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        const urlImg = parent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;

        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();

    });

    //запустить/остановить радио
    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        //изменить иконки плэй/пауза
        changeIconPlay();
    });

    //регулировать звук радио
    radioVolume.addEventListener("input", () => {
        audio.volume = radioVolume.value / 100;
        toggleVolumeIcon();  
    });

    //начально положение ползунка звука
    radioVolume.value = audio.volume * 100;

    //изменить иконку звука
    radioIconDown.addEventListener('click', () => {
        toggleVolumePlay();
        toggleVolumeIcon();
    });

    //сделать звук максимальным при нажатии кнопки(иконки)
	radioPlayerInit.stop = () => {
        audio.pause();
        changeIconPlay();
    };

};






