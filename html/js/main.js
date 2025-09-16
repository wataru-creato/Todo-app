
const text = document.getElementById("text");
const confirm = document.getElementById("confirm");
let text_area = document.getElementById("text_area");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


//ページを表示した時の処理・テキスト内容を保存する
window.addEventListener("DOMContentLoaded", function () {
    tasks.forEach(task => {
        const taskElm = DOMcreate(task);
        text_area.appendChild(taskElm);
    })
})

//「追加する」ボタンを押したときの処理
confirm.addEventListener("click", function () {

    //テキストに追加した内容を取得できるようにする
    const dayValue = document.getElementById("day").value;
    const getStartTimeValue = document.getElementById("start-time").value;
    const getEndTimeValue = document.getElementById("end-time").value;
    const textValue = text.value.trim();

    if (textValue === "") {
        alert("何も記載されていません");
        return;
    }

    //テキスト内容を保存するオブジェクト
    const task = {
        id: Date.now(),
        text: textValue,
        day: dayValue,
        start: getStartTimeValue,
        end: getEndTimeValue,
        priority: "normal",
        color: "",
        sline: "false",
        reset:"false"
    };

    tasks.push(task);
    tasqSave();

    const taskElm = DOMcreate(task);
    text_area.appendChild(taskElm);
    console.log("記録を保存します");
    console.log(tasks.id);

    text.value = "";

});


//保存するときの関数
function tasqSave() {

    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("保存しました");

}

//Todoリスト内の機能を作成
function DOMcreate(task) {

    console.log(text.value);

    const createDateDay = document.getElementById("day");
    const createDateDayAdd = document.createElement("div");
    createDateDayAdd.textContent = task.day;
    createDateDayAdd.classList.add("positionFirst");


    const getStartTimeAdd = document.createElement("div");
    const getEndTimeAdd = document.createElement("div");
    getStartTimeAdd.textContent = task.start;
    getEndTimeAdd.textContent = task.end;
    getStartTimeAdd.classList.add("positionFirst");
    getEndTimeAdd.classList.add("positionFirst");

    //追加したリストのテキストが配置される場所を作成
    const span = document.createElement("span");
    span.id = "span" + Date.now();
    span.textContent = task.text;
    span.style.fontSize = "25px";
   


    console.log(createDateDay.value);


    //各ボタンの作成
    //チェックボタン
    let buttonAddFinish = document.createElement("input");
    buttonAddFinish.type = "button";
    buttonAddFinish.value = "✔";
    buttonAddFinish.id = "finish" + Date.now();
    buttonAddFinish.classList.add("btn", "btn-primary", "positionFirst");
    //☆ボタン
    let buttonAddPriority = document.createElement("input");
    buttonAddPriority.type = "button";
    buttonAddPriority.value = "☆";
    buttonAddPriority.id = "priority" + Date.now();
    buttonAddPriority.classList.add("btn","btn-warning", "positionEnd");

    //赤色に変えるボタン
    let changeColorRed = document.createElement("input");
    changeColorRed.type = "button";
    changeColorRed.value = "赤色";
    changeColorRed.id = "red";
    changeColorRed.classList.add("btn", "btn-danger");
    //青色に変えるボタン
    let changeColorBlue = document.createElement("input");
    changeColorBlue.type = "button";
    changeColorBlue.value = "青色";
    changeColorBlue.id = "blue";
    changeColorBlue.classList.add("btn", "btn-primary");
    //緑色に変えるボタン
    let changeColorGreen = document.createElement("input");
    changeColorGreen.type = "button";
    changeColorGreen.value = "緑色";
    changeColorGreen.id = "green";
    changeColorGreen.classList.add("btn", "btn-success");

    const blockMake = document.createElement("div");
    blockMake.classList = "blockMake";


    //取り消し線を追加する機能
    let slineCount = 0;
    span.addEventListener("click", function () {
        if (slineCount % 2 == 0) {
            span.classList.add("sline");
            task.sline = "true";
            console.log("取り消し線を追加する");
        } else {
            span.classList.remove("sline");
            task.sline = "false";
            console.log("取り消し線を外す");
        }
        tasqSave();
        slineCount++;

    });

    //✔の処理内容
    buttonAddFinish.addEventListener("click", function () {

        let result = window.confirm("削除しますか？");

        if (result) {
            blockMake.remove();
            let newTasks = [];
            for (let i = 0; i < tasks.length; i++) {
                let currentTask = tasks[i];
                if (currentTask.id !== task.id) {
                    newTasks.push(currentTask);
                }
            }
            tasks = newTasks;
            tasqSave();
            console.log("削除します");
        } else {
            console.log("削除しません");
            tasqSave();
        }
        console.log(span.id + "を消します");

    });

    //☆ボタンの処理内容
    let PriorityCount = 0;
    buttonAddPriority.addEventListener("click", function () {

        if (PriorityCount % 2 == 0) {
            blockMake.className = "blockMakeStrong";
            const emphasis = document.createElement("strong");
            emphasis.textContent = span.textContent;
            span.textContent = "";
            emphasis.style.fontWeight = "bold";
            blockMake.style.color = "#CC0000";
            emphasis.style.fontSize="30px";

            span.innerHTML = "";
            span.appendChild(emphasis);
            task.priority = "strong";

            changeColorRed.disabled=true;
            changeColorBlue.disabled=true;
            changeColorGreen.disabled=true;

        } else {
            blockMake.className = "blockMake";
            span.innerHTML = task.text;
            blockMake.style.color = "";
            task.priority = "normal";

            changeColorRed.disabled=false;
            changeColorBlue.disabled=false;
            changeColorGreen.disabled=false;
        }
        PriorityCount++;
        tasqSave();
    });

    //赤色ボタンの処理内容
    let RedCount = 0;
    changeColorRed.addEventListener("click", function () {
        if (RedCount % 2 == 0) {
            const changeColorRedText = document.createElement("div");
            changeColorRedText.textContent = span.textContent;
            span.textContent = "";
            blockMake.style.backgroundColor= "#ffcccc" ;
            // blockMake.style.color = "#FFE6E6";
            span.appendChild(changeColorRedText);
            console.log("赤色に変えます");
            task.color = "red";

            buttonAddPriority.disabled=true;
            changeColorBlue.disabled=true;
            changeColorGreen.disabled=true;
        } else {
            span.innerHTML = task.text;
            blockMake.style.backgroundColor= "" ;
            blockMake.style.color = "";
            task.color = "";

             buttonAddPriority.disabled=false;
             changeColorBlue.disabled=false;
             changeColorGreen.disabled=false;
        }

        RedCount++;
        tasqSave();
    });

    //青色ボタンの処理内容
    let BlueCount = 0;
    changeColorBlue.addEventListener("click", function () {
        if (BlueCount % 2 == 0) {
            const changeColorBlueText = document.createElement("div");
            changeColorBlueText.textContent = span.textContent;
            span.textContent = "";
            blockMake.style.backgroundColor = "#cce5ff";
            // blockMake.style.color = "#E6F3FF";
            span.appendChild(changeColorBlueText);
            console.log("青色に変えます");
            task.color = "blue";

            buttonAddPriority.disabled=true;
            changeColorRed.disabled=true;
            changeColorGreen.disabled=true;
        } else {
            span.innerHTML = task.text;
            blockMake.style.backgroundColor = "";
            blockMake.style.color = "";
            task.color = "";

            buttonAddPriority.disabled=false;
            changeColorGreen.disabled=false;
            changeColorRed.disabled=false;
        }
        BlueCount++;
        tasqSave();
    });

    //緑色ボタンの処理内容
    let GreenCount = 0;
    changeColorGreen.addEventListener("click", function () {
        if (GreenCount % 2 == 0) {
            const changeColorGreenText = document.createElement("div");
            changeColorGreenText.textContent = span.textContent;
            span.textContent = "";
            blockMake.style.backgroundColor = "#ccffe5";
            // blockMake.style.color = "#E6FFE6";
            span.appendChild(changeColorGreenText);
            console.log("緑色に変えます");
            task.color = "green";

            buttonAddPriority.disabled=true;
            changeColorRed.disabled=true;
            changeColorBlue.disabled=true;
        } else {
            span.innerHTML = task.text;
            blockMake.style.backgroundColor = "";
            blockMake.style.color = "";
            task.color = "";

            buttonAddPriority.disabled=false;
            changeColorBlue.disabled=false;
            changeColorRed.disabled=false;
        }
        GreenCount++;
        tasqSave();
    });

    //リセットボタンの処理
    reset.addEventListener("click", function () {

        let result2= window.confirm("本当にすべての予定を削除しますか？");

        if(result2){
            text_area.innerHTML="";
            task.reset="true";
            tasks=[];
            tasqSave();
            console.log("すべてのテキストを削除しました");
        }else{
            console.log("削除しません");
        }
        
        
    });

    //リロードしてもテキストの状態を復元する処理
    if (task.priority === "strong") {
        blockMake.className = "blockMakeStrong";
        const emphasis = document.createElement("strong");
        emphasis.textContent = task.text;
        emphasis.style.fontWeight = "bold";
        emphasis.style.color = "red";
        emphasis.style.fontSize="30px";
        span.textContent = "";
        span.appendChild(emphasis);
    }

    if(task.sline === "true"){
        span.classList.add("sline");
    }

    if (task.color === "red") {
       blockMake.style.backgroundColor= "#ffcccc" ;
    } else if (task.color === "blue") {
        blockMake.style.backgroundColor = "#cce5ff";
    } else if (task.color === "green") {
        blockMake.style.backgroundColor = "#ccffe5";
    }

    
    //それぞれの親子ノードの設定
    blockMake.appendChild(buttonAddFinish);
    //ブロックが全体を囲むようにCSSのクラスがあるものを先頭に置く
    blockMake.appendChild(createDateDayAdd);
    blockMake.appendChild(getStartTimeAdd);
    blockMake.appendChild(getEndTimeAdd);
    blockMake.appendChild(span);
    //ここの順番を変えることでボタンの位置を変えれる？
    blockMake.appendChild(buttonAddPriority);
    blockMake.appendChild(changeColorRed);
    blockMake.appendChild(changeColorBlue);
    blockMake.appendChild(changeColorGreen);

    text_area.appendChild(blockMake);

    return blockMake;


}
