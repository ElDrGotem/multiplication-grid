window.onload = genGrid;
var WIDTH = 10;
var HEIGHT = 10;
function genGrid(DONTTOUCH = null, _width = WIDTH, _height = HEIGHT){
    //reset and generate new grid
    reset();
    let params = document.createAttribute("style");
    let auto = "";
    for (i=0;i<_width;i++){
        auto += "auto "
    }
    params.value = `grid-template-columns:${auto}`
    let mode = prompt("Easy or Hard?","Easy");
    let grid = document.getElementById('grid');
    grid.setAttributeNode(params);
    //generate list of questions
    let list = [];
    for (i = 0; i<_height;i++){
        for (j=0;j<_width;j++){
            list.push(`${i+1}x${j+1}`)
        }
    }
    let used = []
    for (row = 0; row < _height; row++){
        for (col = 0; col < _width; col ++){
            //assign question
            let question = ''
            if (mode.toLowerCase()   == "hard"){
                let test = Math.floor(Math.random()*100);
                while (used.includes(test)){
                    test = Math.floor(Math.random()*100);
                }
                used.push(test);
                question = list[test];
            }
            else{
                question = list.shift();
            }
            //generate divs and add to parent
            let base = document.createElement("div");
            let cell = document.createAttribute("class");
            let txt = document.createTextNode(question);
            let inp = document.createElement("input");
            let type = document.createAttribute("type");
            let id = document.createAttribute("id");
            id.value = question;
            type.value = "text";
            inp.setAttributeNode(type);
            inp.setAttributeNode(id);
            cell.value = "cell";
            base.setAttributeNode(cell);
            base.appendChild(txt);
            base.appendChild(inp);
            grid.appendChild(base);
        }
    }
}
function check(){
    let cells = document.getElementsByClassName("cell");
    let count = 0;
    let total = 0;
    //iterates through divs and compares input to question
    for (i = 0;  i < cells.length; i++){
        let question = cells[i].innerHTML.split("<")[0];
        let ans = question.split("x");
        let correctAns = ans[0]*ans[1];
        let inpBox = document.getElementById(question);
        let inp = inpBox.value;
        //sets up colors
        let red = document.createAttribute("style");
        red.value = "background-color:#ff0000";
        let green = document.createAttribute("style");
        green.value = "background-color:#00ff00";
        let yellow = document.createAttribute("style");
        yellow.value = "background-color:#ffff00"
        //the part where it checks and colors accordingly
        if (correctAns == inp){
            inpBox.setAttributeNode(green);
            count ++;
            total ++;
        }
        else if (inp != ""){
            total ++;
            inpBox.setAttributeNode(red);
        }
        else{
            inpBox.setAttributeNode(yellow);
        }
    }
    alert(`${count} out of ${total} correct`);
}

function reset(){
    //look at the function name
    let grid = document.getElementById("grid");
    grid.remove()
    let newGrid = document.createElement("div");
    let clas = document.createAttribute("class");
    clas.value = "grid";
    let id = document.createAttribute("id")
    id.value = "grid";
    newGrid.setAttributeNode(id);
    newGrid.setAttributeNode(clas);
    document.body.appendChild(newGrid);
}
