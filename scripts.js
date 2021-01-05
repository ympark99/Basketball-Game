var comScore = 0;
var userScore = 0;
var isComputerTurn = true; // 컴퓨터 턴 체크 변수
var shotsLeft = 15;

function onComputerShoot(){ // 컴퓨터 이벤트
    if(!isComputerTurn) return;

    var shootType = Math.random() < 0.5? 2: 3;

    if(shootType === 2){ // 2점슛 50%로 성공
        if(Math.random() < 0.5){
        showText('컴퓨터가 2점슛을 성공하였습니다!');
        updateComputerScore(2);
        }
        else showText('컴퓨터가 2점슛을 실패하였습니다.');
    }

    else if(shootType === 3){ // 3점슛 33%로 성공
        if(Math.random() < 0.33){
        showText('컴퓨터가 3점슛을 성공하였습니다!!');
        updateComputerScore(3);
        }
        else showText('컴퓨터가 3점슛을 실패하였습니다.');
    }
    isComputerTurn = false;

    disableComputerButtons(true);
    disableUserButtons(false);

    calShotsLeft()
}

function onUserShoot(shootType){ // 사용자 이벤트
    if(isComputerTurn) return;

    if(shootType === 2){
        showText('2점슛이 성공했습니다!');
        updateUserScore(2);
    }
    else if(shootType === 3){
        showText('3점슛이 성공했습니다!');
        updateUserScore(2);
    }   

    isComputerTurn = true;
    disableComputerButtons(false);
    disableUserButtons(true);

    calShotsLeft();
}

function showText(s){
    var textElem = document.getElementById('text');
    textElem.innerHTML = s;
}

function updateComputerScore(score){
    comScore += score;
    var comScoreElem = document.getElementById('computer-score');   
    comScoreElem.innerHTML = comScore; 
}

function updateUserScore(score){
    userScore += score;
    var userScoreElem = document.getElementById('user-score'); 
    userScoreElem.innerHTML = userScore; 
}

function disableComputerButtons(flag){
    var computerButtons = document.getElementsByClassName('btn-computer');
    
    for(var i=0;i<computerButtons.length; i++){
        computerButtons[i].disabled = flag;
    }    
}

function disableUserButtons(flag){
    var userButtons = document.getElementsByClassName('btn-user');
    
    for(var i=0;i<userButtons.length; i++){
        userButtons[i].disabled = flag;
    }    
}

function calShotsLeft(){
    var shotsLeftElem = document.getElementById('shots-left');

    shotsLeft--;
    shotsLeftElem.innerHTML = shotsLeft;

    if(shotsLeft === 0){
        if(userScore > comScore) showText('승리!!');
        else if(userScore < comScore) showText('패배..');
        else showText('동점');
    
        disableComputerButtons(true);
        disableUserButtons(true);
    }
}