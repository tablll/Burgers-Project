let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '405',
        width: '660',
        videoId: 'M7lc1UVf-VE',
        playerVars: {
            controls: 0,
            disablekb: 0,
            modestbranding: 0,
            rel: 0,
            autoplay: 0,
            showinfo: 0,
            iv_load_policy: 3
        },

        events: {
        'onReady': onPlayerReady,
        // 'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady () {
    const duration = player.getDuration();
    let interval;
    clearInterval(interval);
    interval = setInterval(() => {
        const completed = player.getCurrentTime();
        const percent = (completed / duration) * 100;

        changeButtonPosition(percent);

        }, 1000)
   
}

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
        $('.player__start').addClass('pause');
        
        
    } else {
        player.pauseVideo();
        $('.player__start').removeClass('pause');
    }
    
})
//Определяем клик по ползунку
$('.player__playback').on('click', e =>{
    const bar = $(e.currentTarget);
    const newButtonPosition = e.pageX - bar.offset().left;
    const clickedPercent = (newButtonPosition / bar.width()) * 100;
    changeButtonPosition(clickedPercent);
    const newPlayerTime = (player.getDuration() / 100) * clickedPercent;//получаем значение 1 процента
    player.seekTo(newPlayerTime);
})


function changeButtonPosition(percent) {
    $('.player__playback-button').css({
        left: `${percent}%`
    });
}