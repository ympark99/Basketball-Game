var computer = {
    score : 0,
    percent2 : 0.5,
    percent3 : 0.33
};

var user = {
    score : 0,
    percent2 : 0.5,
    percent3 : 0.33
};

var game = {
    isComputerTurn : true,
    shotsLeft : 15
};

function onComputerShoot(){ // 컴퓨터 이벤트
    if(!game.isComputerTurn) return;

    updateAI();

    var shootType = Math.random() < 0.5? 2: 3;

    if(Math.random() < computer['percent'+shootType]){
        showText('컴퓨터가 ' + shootType + '점슛을 성공하였습니다!');
        updateComputerScore(shootType);        
    }else{
        showText('컴퓨터가 ' + shootType + '점슛을 실패하였습니다.');
    }
    game.isComputerTurn = false;

    disableComputerButtons(true);
    disableUserButtons(false);

    calShotsLeft()
}

function onUserShoot(shootType){ // 사용자 이벤트
    if(game.isComputerTurn) return;

    if(Math.random() < user['percent'+shootType]){
        showText(shootType + '점슛을 성공하였습니다!');
        updateUserScore(shootType);        
    }else{
        showText(shootType + '점슛이 실패했습니다.');
    }
    game.isComputerTurn = true;
    disableComputerButtons(false);
    disableUserButtons(true);

    calShotsLeft();
}

function updateAI(){
    var diff = user.score - computer.score;

    if (diff >= 10){
        computer.percent2 = 0.7;
        computer.percent3 = 0.43;
    } else if(diff >= 6){
        computer.percent2 = 0.6;
        computer.percent3 = 0.38;
    } else if(diff <= -10){
        computer.percent2 = 0.3;
        computer.percent3 = 0.23;
    } else if (diff <= -6){
        computer.percent2 = 0.4;
        computer.percent3 = 0.28;
    }
}

function showText(s){
    var $textElem = $('#text');
    $textElem.fadeOut(300, function(){
        $textElem.html(s);
        $textElem.fadeIn(100);
    });
}

function updateComputerScore(score){
    computer.score += score; 
    var $comScoreElem = $('#computer-score');
    $comScoreElem.animateNumber({number: computer.score});
}

function updateUserScore(score){
    user.score += score;
    var $userScoreElem = $('#user-score');
    $userScoreElem.animateNumber({number: user.score});
}

function disableComputerButtons(flag){
    $('.btn-computer').prop('disabled',flag);   
}

function disableUserButtons(flag){  
    $('.btn-user').prop('disabled',flag);
}

function calShotsLeft(){
    game.shotsLeft--;
    var $shotsLeftElem = $('#shots-left');
    $shotsLeftElem.html(game.shotsLeft);

    if(game.shotsLeft === 0){
        if(user.score > computer.score) showText('승리!!');
        else if(user.score < computer.score) showText('패배..');
        else showText('동점');

        disableComputerButtons(true);
        disableUserButtons(true);
    }
}

$(function(){
    showText(3);

    setTimeout(function(){
        showText(2);
    
        setTimeout(function(){
            showText(1);

            setTimeout(function(){
                showText('컴퓨터부터 시작합니다!');
                disableComputerButtons(false);
            },1000);
        },1000);
    },1000);
});