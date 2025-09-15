
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
        sline: "false"
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
    buttonAddPriority.classList.add("btn", "btn-primary", "positionEnd");
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

            span.innerHTML = "";
            span.appendChild(emphasis);
            task.priority = "strong";

        } else {
            blockMake.className = "blockMake";
            span.innerHTML = task.text;
            blockMake.style.color = "";
            task.priority = "normal";
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
            // changeColorRedText.style.color = "red";
            blockMake.style.backgroundColor= "#FF4D4D" ;
            blockMake.style.color = "#FFE6E6";
            span.appendChild(changeColorRedText);
            console.log("赤色に変えます");
            task.color = "red";
        } else {
            span.innerHTML = task.text;
            blockMake.style.backgroundColor= "" ;
            blockMake.style.color = "";
            task.color = "";
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
            blockMake.style.backgroundColor = "#4DA6FF";
            blockMake.style.color = "#E6F3FF";
            span.appendChild(changeColorBlueText);
            console.log("青色に変えます");
            task.color = "blue";
        } else {
            span.innerHTML = task.text;
            blockMake.style.backgroundColor = "";
            blockMake.style.color = "";
            task.color = "";
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
            blockMake.style.backgroundColor = "#00B300";
            blockMake.style.color = "#E6FFE6";
            span.appendChild(changeColorGreenText);
            console.log("緑色に変えます");
            task.color = "green";
        } else {
            span.innerHTML = task.text;
            blockMake.style.backgroundColor = "";
            blockMake.style.color = "";
            task.color = "";
        }
        GreenCount++;
        tasqSave();
    });

    reset.addEventListener("click", function () {
        text.value = "";
        console.log("リセットしました");
    });

    //リロードしてもテキストの状態を復元する処理
    if (task.priority === "strong") {
        blockMake.className = "blockMakeStrong";
        const emphasis = document.createElement("strong");
        emphasis.textContent = task.text;
        emphasis.style.fontWeight = "bold";
        emphasis.style.color = "red";
        span.textContent = "";
        span.appendChild(emphasis);
    }

    if(task.sline === "true"){
        span.classList.add("sline");
    }

    if (task.color === "red") {
        blockMake.style.backgroundColor= "#FF4D4D" ;
        blockMake.style.color = "#FFE6E6";
    } else if (task.color === "blue") {
        blockMake.style.backgroundColor = "#4DA6FF";
        blockMake.style.color = "#E6F3FF";
    } else if (task.color === "green") {
        blockMake.style.backgroundColor = "#00B300";
        blockMake.style.color = "#E6FFE6";
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
