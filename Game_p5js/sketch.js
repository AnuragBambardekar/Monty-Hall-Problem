const doors = [];
let state = "PICK";
let pickedDoor;
let revealedDoor;
let switchButton, stayButton, playAgainButton;

let outcomeP;
let resultsP;

// let totalSwitchPlays = 0;
// let totalStayPlays = 0;
// let totalSwitchWins = 0;
// let totalStayWins = 0;

// let switchRate = 0;
// let stayRate = 0;

let stats = {
    totalSwitchPlays: 0,
    totalStayPlays: 0,
    totalSwitchWins: 0,
    totalStayWins: 0,
};


function updateStats() {
    const switchWinRate =
      nf((100 * stats.totalSwitchWins) / stats.totalSwitchPlays || 0, 2, 1) + '%';

  
    const stayWinRate =
      nf((100 * stats.totalStayWins) / stats.totalStayPlays || 0, 2, 1) + '%';

    // console.log(switchWinRate);
    // console.log(stayWinRate);
  }

function startOver() {
    for(let door of doors) {
        door.prize = "🐐";
        door.html('');
        door.style('background-color', "#AAA");
    }

    const winner = random(doors);
    winner.prize = "💰";
    playAgainButton.hide();

    outcomeP.html('');
    state = "PICK";
}

function setup() {
    noCanvas();

    // retrieve data
    stats = getItem('montey-hall-stats') || stats;
    updateStats();

    console.log(stats);

    
    for(let i=0; i<3; i++){
        doors[i] = createDiv("");
        doors[i].parent('#doors');
        doors[i].class('door');
        doors[i].index = i;
        doors[i].mousePressed(pickDoor);
    }

    switchButton = createButton('switch');
    switchButton.mousePressed(playerSwitch);
    switchButton.hide();
    
    stayButton = createButton('stay');
    stayButton.mousePressed(playerStay);
    stayButton.hide();

    playAgainButton = createButton('play again');
    playAgainButton.mousePressed(startOver);
    playAgainButton.hide();

    outcomeP = createP('');
    resultsP = createP('');

    startOver();
}

function pickDoor() {
    if(state=="PICK"){
        state = "REVEAL";
        pickedDoor = this.style('background-color','#AAF');
        reveal();
    }
}

function reveal() {
    // console.log(this.prize);
    // console.log(this.index);

    const options = [];
    for(let i=0; i<doors.length; i++){
        const door = doors[i];
        if(i !== pickedDoor.index && door.prize !== "💰") {
            options.push(door);
        }
    }
    
    revealedDoor = random(options);
    revealedDoor.html(revealedDoor.prize);

    switchButton.show();
    stayButton.show();
}

function playerSwitch() {
    stats.totalSwitchPlays++;
    let newPick;

    for(let i=0; i<doors.length; i++){
        let door = doors[i];
        if(door !== pickedDoor && door !== revealedDoor) {
            newPick = door;
            break;
        }
    }
    pickedDoor = newPick;
    checkWin(true);
}

function playerStay() {
    stats.totalStayPlays++;
    checkWin(false);
}

function checkWin(playerSwitch) {
    switchButton.hide();
    stayButton.hide();

    for(let door of doors) {
        door.html(door.prize);
        door.style('background-color', "#AAA");
    }

    if (pickedDoor.prize == "💰") {
        outcomeP.html("You Win!");
        pickedDoor.style('background-color', "#AFA");

        if (playerSwitch) {
            stats.totalSwitchWins++;
        } else {
            stats.totalStayWins++;
        }
    } else {
        outcomeP.html("You Lose!");
        pickedDoor.style('background-color', "#FAA");
    }

    // Show the win rates
    switchRate = stats.totalSwitchWins/stats.totalSwitchPlays
    stayRate = stats.totalStayWins/stats.totalStayPlays


    resultsP.html(
        `Total Switches: ${stats.totalSwitchPlays} <br/>
        Switch Win Rate: ${nf((100 * stats.totalSwitchWins) / stats.totalSwitchPlays || 0, 2, 1) + '%'} <br/>
        Total Stays: ${stats.totalStayPlays} <br/>
        Stay Win Rate: ${nf((100 * stats.totalStayWins) / stats.totalStayPlays || 0, 2, 1) + '%'} <br/>`
    )

    //store stats in local storage
    updateStats();
    storeItem('montey-hall-stats', stats);
    // storeItem("totalSwitchPlays", totalSwitchPlays);
    // storeItem("totalStayPlays", totalStayPlays);
    // storeItem("SwitchWinRate", `${nf(100*switchRate,2,2)}`);
    // storeItem("StayWinRate", `${nf(100*stayRate,2,2)}`);

    playAgainButton.show();
}