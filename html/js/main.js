
const text = document.getElementById("text");
const confirm = document.getElementById("confirm");
let text_area = document.getElementById("text_area");
const reset=document.getElementById("reset");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


//ページを表示した時の処理・テキスト内容を保存する
window.addEventListener("DOMContentLoaded", function () {
    tasks.forEach(task => {
        const taskElm = DOMcreate(task);
        text_area.appendChild(taskElm);
    })
})


function putaddTask(){
    //テキストに追加した内容を取得できるようにする
    const dayValue = document.getElementById("day").value;
    const getStartTimeValue = document.getElementById("start-time").value;
    const getEndTimeValue = document.getElementById("end-time").value;
    const textValue = text.value.trim();

    if (textValue === "") {
        alert("何も記載されていません");
        return;
    }

    const task=createTask(textValue,dayValue,getStartTimeValue,getEndTimeValue);
    addTask(task);
}

    

//テキスト内容をオブジェクト化するための関数
function createTask(textValue,dayValue,getStartTimeValue,getEndTimeValue){
    return{
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
}


//タスクを追加する関数
function addTask(task){
    tasks.push(task);
    tasqSave();

    const taskElm = DOMcreate(task);
    text_area.appendChild(taskElm);

}


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
    // createDateDayAdd.classList.add("positionFirst");


    const getStartTimeAdd = document.createElement("div");
    const getEndTimeAdd = document.createElement("div");
    getStartTimeAdd.textContent = task.start;
    getEndTimeAdd.textContent = task.end;
    // getStartTimeAdd.classList.add("positionFirst");
    // getEndTimeAdd.classList.add("positionFirst");

    //追加したリストのテキストが配置される場所を作成
    const span = document.createElement("span");
    span.id = "span" + Date.now();
    span.textContent = task.text;
    span.style.fontSize = "25px";


    //各ボタンの作成
    //チェックボタン
    let buttonAddFinish = document.createElement("input");
    buttonAddFinish.type = "button";
    buttonAddFinish.value = "✔";
    buttonAddFinish.id = "finish" + Date.now();
    buttonAddFinish.classList.add("btn", "btn-primary");
    buttonAddFinish.setAttribute("data-bs-toggle", "tooltip");
    buttonAddFinish.setAttribute("data-bs-placement", "top");
    buttonAddFinish.setAttribute("data-bs-custom-class", "custom-tooltip");
    buttonAddFinish.setAttribute("data-bs-title", "完了したタスクが消えます．");
    //☆ボタン
    let buttonAddPriority = document.createElement("input");
    buttonAddPriority.type = "button";
    buttonAddPriority.value = "☆";
    buttonAddPriority.id = "priority" + Date.now();
    buttonAddPriority.classList.add("btn","btn-warning");
    buttonAddPriority.setAttribute("data-bs-toggle", "tooltip");
    buttonAddPriority.setAttribute("data-bs-placement", "top");
    buttonAddPriority.setAttribute("data-bs-custom-class", "custom-tooltip");
    buttonAddPriority.setAttribute("data-bs-title", "タスクを強調します");

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

    document.body.appendChild(buttonAddFinish);
    new bootstrap.Tooltip(buttonAddFinish);

    document.body.appendChild(buttonAddPriority);
    new bootstrap.Tooltip(buttonAddPriority);

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
    function SetbuttonAddFinish(){
        let result = window.confirm("このタスクを完了しますか？");

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
    }
    //✔の処理を定義
    buttonAddFinish.addEventListener("click", SetbuttonAddFinish);



    let PriorityCount = 0;
    //☆ボタンの処理内容
    function SetbuttonAddPriority(){
        if (task.priority!=="strong") {
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
    }
    
    //☆の処理を定義
    buttonAddPriority.addEventListener("click", SetbuttonAddPriority);

    let RedCount = 0;
    //赤色ボタンの処理内容
    function SetchangeColorRed(){
        if (task.color !== "red") {
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
    }
    
    //赤色ボタンの処理を定義
    changeColorRed.addEventListener("click", SetchangeColorRed);

    let BlueCount = 0;
    //青色ボタンの処理内容
    function SetchangeColorBlue(){
        if (task.color !== "blue") {
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
    }
    //青色ボタンの処理を定義
    changeColorBlue.addEventListener("click", SetchangeColorBlue);

    let GreenCount = 0;
    //緑色ボタンの処理内容
    function SetchangeColorGreen(){
        if (task.color !== "green") {
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
    }
    
    changeColorGreen.addEventListener("click", SetchangeColorGreen);

    

    //リロードしてもテキストの状態を復元する処理
    if (task.priority === "strong") {
        blockMake.className = "blockMakeStrong";
        const emphasis = document.createElement("strong");
        emphasis.textContent = task.text;
        emphasis.style.fontWeight = "bold";
        blockMake.style.color = "red";
        emphasis.style.fontSize="30px";
        span.textContent = "";
        span.appendChild(emphasis);
        changeColorRed.disabled=true;
        changeColorBlue.disabled=true;
        changeColorGreen.disabled=true;
    }

    if(task.sline === "true"){
        span.classList.add("sline");
    }

    if (task.color === "red") {
       blockMake.style.backgroundColor= "#ffcccc" ;
            buttonAddPriority.disabled=true;
            changeColorBlue.disabled=true;
            changeColorGreen.disabled=true;
    } else if (task.color === "blue") {
        blockMake.style.backgroundColor = "#cce5ff";
            buttonAddPriority.disabled=true;
            changeColorRed.disabled=true;
            changeColorGreen.disabled=true;
    } else if (task.color === "green") {
        blockMake.style.backgroundColor = "#ccffe5";
            buttonAddPriority.disabled=true;
            changeColorRed.disabled=true;
            changeColorBlue.disabled=true;
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

    blockMake.dataset.color = task.color; 
    // textValue =""; 追加するボタンを押した後テキストボックスを空にしたい
    return blockMake;


}
//「追加する」ボタンを押したときの処理
    confirm.addEventListener("click", putaddTask);
    confirm.addEventListener("click", textReset);

    //リセットボタンの処理
    reset.addEventListener("click", function () {

        let result2= window.confirm("本当にすべての予定を削除しますか？");

        if(result2){
            text_area.innerHTML="";
            tasks=[];
            localStorage.removeItem("tasks");
            console.log("すべてのテキストを削除しました");
        }else{
            console.log("削除しません");
        }
        
        
    });

    //フィルターをつくる関数
    function colorFilter(event){
        let filterValue=event.target.value;//targetはユーザが直接選んだ値である
       let starfilter=document.querySelectorAll(".blockMake, .blockMakeStrong");//NodeList（配列のようなもの）を返すため，classListでは参照できない
       let found=false;//最初にフラグを作ることでフィルターの条件があるかどうかをしらべる
       for(let i=0;i<starfilter.length;i++){
           let kepptask=starfilter[i];//それぞれのDOM情報を取り出す，こっちならクラスを参照できる
            kepptask.style.display="none";//最初は隠しておく


             if(filterValue==="star"){//☆のフィルターを選んだ時
                if (kepptask.classList.contains("blockMakeStrong")) {
                kepptask.style.display="";//全表示//display=noneにしてしまうと見た目がずれてしまう
                 found=true;//フィルターの条件に一致するものがあればtrueにする
                console.log("☆あります");
                }else{
                    kepptask.style.display="none";
                }       
            }else if(filterValue===kepptask.dataset.color){ //フィルターの色と表示の色が同じ時 
                    kepptask.style.display="";//全表示
                    found=true;//フィルターの条件に一致するものがあればtrueにする
                }else if(filterValue=="all"){
                kepptask.style.display="";//全表示
                found=true;//フィルターの条件に一致するものがあればtrueにする
                console.log("すべてを表示します");
            }
            
            
    }
     if(!found){//foundのtrueが見つからなければ条件に一致するものが存在しないものとする
                alert("条件に一致したものは存在しません");
            }
}
    

function textReset(){
    text.value="";
}
   filter.addEventListener("change",colorFilter);
   console.log("テスト");
   console.log(localStorage.getItem("tasks"));
   