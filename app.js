//accessing the box i.e. Each button
let boxes = document.querySelectorAll(".box");
//console.log(boxes);

//accessing the reset button
let resetBtn = document.querySelector("#reset-btn");
//console.log(resetBtn);

//accessing the new game button
let newbtn = document.querySelector("#new-btn");

//access the msg box
let msg = document.querySelector("#win");
//console.log(msg);

//let we have two players and they have alternative turns as player1=turn0 and player2=turnX
let turn0 = true;

//to store all the winning patterns let declare one 2D array
let winPat = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//adding event listner to each button so whenever the button get clicked it will generate some output.

//count var to store the clicks of the user.
let count = 0
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Button was clicked")
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;

        //Each time user clicks the button the click must be increased by 1.
        count++;
        checkWinner();
    })
});

const resetWin = () => {
    turn0 = true;
    enableBtns();
    msg.classList.add("hide");
    newbtn.classList.add("hide");

    //when user clicks the reset button then counter must set to 0.
    count = 0;
}

//function to be used when user click the new game btn
const disableBtns = () => {
    for (let btns of boxes) {
        btns.disabled = true;
    }
}

const enableBtns = () => {
    for (let btns of boxes) {
        btns.disabled = false;
        btns.innerText = "";
    }
}

let displayWin = (winner) => {
    msg.innerText = `Congratulations ${winner}!! You Won.`
    msg.classList.remove("hide");
    newbtn.classList.remove("hide");
    disableBtns();
}

let checkWinner = () => {
    for (let patt of winPat) {
        let pos1 = boxes[patt[0]].innerText;
        let pos2 = boxes[patt[1]].innerText
        let pos3 = boxes[patt[2]].innerText

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 == pos3) {
                displayWin(pos1);
                console.clear();
                return;
            }
        }
    }

    //in the case if there is no winner or game is tied.
    if (count === 9) {
        msg.innerText = "Well played! The game is tied.";
        msg.classList.remove("hide");
        newbtn.classList.remove("hide");
        console.clear();
    }
};

newbtn.addEventListener("click", resetWin);
resetBtn.addEventListener("click", resetWin);

