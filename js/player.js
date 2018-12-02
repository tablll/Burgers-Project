let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '405',
        width: '660',
        videoId: 'KeBR9hpbmAk',
        playerVars: {
            //отключаем все не нужное из плеера
            controls: 0,
            disablekb: 0,
            modestbranding: 0,
            rel: 0,
            autoplay: 0,
            showinfo: 0,
            iv_load_policy: 3
        },

        events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange 
        }
    });
}

//отслеживаем состояние: если 1(плэй) то показываем иконку паузы и убираем сплэш картинку, если 2(пауза) то убираем иконку паузы
function onPlayerStateChange(event) {

    switch(event.data) {
        case 1:
        $('.player__start').addClass('pause');
        $('.player__wrapper').addClass('player__wrapper-active');
        break;
        case 2:
        $('.player__start').removeClass('pause');
    }
}

//функция расчета положения ползунка. Каждую секунду получаем данные о дительности и меняем положение кнопки
function onPlayerReady () {
    const duration = player.getDuration(); 
    let interval; 
    updateTimer();
    clearInterval(interval);
    interval = setInterval(() => {
        const completed = player.getCurrentTime();
        const percent = (completed / duration) * 100;
        updateTimer();
        changeButtonPosition(percent); // отправялем полученное значение непосредственно в функцию перемещения ползунка

        }, 1000)
}

//апдейтим счетчик времени
function updateTimer() {
    $(".player__duration-completed").text(formatTime(player.getCurrentTime()));
    $(".player__duration-estimate").text(formatTime(player.getDuration()));
}

//округляем время в счетчике и приводим к минутам с секундами
function formatTime (time) {
    const roundTime = Math.round(time);

    const minutes = Math.floor(roundTime / 60);
    const seconds = roundTime - minutes * 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return minutes + " : " + formattedSeconds;
}


//нажатие по кнопке плэй
$('.player__start').on('click', e =>{

    // -1 – воспроизведение видео не началось
    // 0 – воспроизведение видео завершено
    // 1 – воспроизведение
    // 2 – пауза
    // 3 – буферизация
    // 5 – видео находится в очереди
    const playerStatus = player.getPlayerState()

    if (playerStatus !== 1) {
        player.playVideo();
        
    } else {
        player.pauseVideo();
        
    }
    
})

//Определяем клик по ползунку
$('.player__playback').on('click', e =>{
    const bar = $(e.currentTarget);
    const newButtonPosition = e.pageX - bar.offset().left;
    const clickedPercent = (newButtonPosition / bar.width()) * 100;
    changeButtonPosition(clickedPercent);
    const newPlayerTime = (player.getDuration() / 100) * clickedPercent;//получаем значение 1 процента
    player.seekTo(newPlayerTime); //перемотка видео на новое время
})

//по клику на сплэш картинку запускаем плеер, в 
$('.player__splash').on('click', e => {
    player.playVideo();
});

//перемещение полузнка на процент по аргументу 
function changeButtonPosition(percent) {
    $('.player__playback-button').css({
        left: `${percent}%`
    });
}

//Контрол звука
$('.volume__control').on('click', e =>{
    const bar = $(e.currentTarget);
    const newButtonPosition = e.pageX - bar.offset().left;
    const clickedPercent = (newButtonPosition / bar.width()) * 100;
    changeVolumePosition(clickedPercent);
    player.setVolume(clickedPercent);
})

function changeVolumePosition(percent) {
    $('.volume__btn').css({
        left: `${percent}%`
    });
}

//звук отключение / включение
$('.volume__icon').on('click', e =>{
    if (player.isMuted()) {
        player.unMute();
        $('.volume__icon').removeClass('volume__icon-muted');
    } else {
        player.mute();
        $('.volume__icon').addClass('volume__icon-muted');
    }
})