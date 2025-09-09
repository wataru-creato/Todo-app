
const text=document.getElementById("text");
const confirm=document.getElementById("confirm");
var text_area=document.getElementById("text_area");

var tasqCount = 0;


confirm.addEventListener("click",function(){
    if(text.value.trim() !=""){
    console.log(text.value);
    tasqCount++;
    // var listAdd=document.createElement("li");
    const createDateDay=document.getElementById("day");
    const createDateDayAdd=document.createElement("div");
    createDateDayAdd.textContent=createDateDay.value;
    createDateDayAdd.classList.add("positionFirst");

    const getStartTime=document.getElementById("start-time");
    const getEndTime=document.getElementById("end-time");
    const getStartTimeAdd=document.createElement("div");
    const getEndTimeAdd=document.createElement("div");
    getStartTimeAdd.textContent=getStartTime.value;
    getEndTimeAdd.textContent=getEndTime.value;
    getStartTimeAdd.classList.add("positionFirst");
    getEndTimeAdd.classList.add("positionFirst");


    const span=document.createElement("span");
    span.id="span"+tasqCount;
    span.textContent=text.value;
    span.style.fontSize="20px";
    span.classList.add("positionCenter");
    text.value="";

    
    console.log(createDateDay.value);

    var buttonAddFinish=document.createElement("input");
    buttonAddFinish.type="button";
    buttonAddFinish.value="✔";
    buttonAddFinish.id="finish"+tasqCount;
    buttonAddFinish.classList.add("btn","btn-primary","positionFirst");
    
    var buttonAddPriority=document.createElement("input");
    buttonAddPriority.type="button";
    buttonAddPriority.value="☆";
    buttonAddPriority.id="priority"+tasqCount;
    buttonAddPriority.classList.add("btn","btn-primary","positionEnd");

    var changeColorRed=document.createElement("input");
    changeColorRed.type="button";
    changeColorRed.value="赤色";
    changeColorRed.id="red";
    changeColorRed.classList.add("btn","btn-danger");

    var changeColorBlue=document.createElement("input");
    changeColorBlue.type="button";
    changeColorBlue.value="青色";
    changeColorBlue.id="blue";
    changeColorBlue.classList.add("btn","btn-primary");

    var changeColorGreen=document.createElement("input");
    changeColorGreen.type="button";
    changeColorGreen.value="緑色";
    changeColorGreen.id="green";
    changeColorGreen.classList.add("btn","btn-success");
    
    const blockMake=document.createElement("div");
    blockMake.classList="blockMake";

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
    // text_area.appendChild(listAdd);

    // listAdd.appendChild(span);
    // text_area.appendChild(buttonAddFinish);
    // text_area.appendChild(buttonAddPriority);
    

    span.addEventListener("click",function(){
        var cancelLine=document.createElement("s");
        
        cancelLine.textContent = span.textContent;

        span.textContent="";
        span.appendChild(cancelLine);
        
       
});

//予定を削除する
    buttonAddFinish.addEventListener("click",function(){
        // e.stopPropagation="";
        
        var result=window.confirm("削除しますか？");

        if(result){
            blockMake.remove();
            console.log("削除します");
        }else{
            console.log("削除しません");
        }


        console.log(span.id+"を消します");
        
    });
    var PriorityCount=0;
    var originalText=span.textContent;
    buttonAddPriority.addEventListener("click",function(){

        if(PriorityCount%2==0){
             blockMake.className="blockMakeStrong";
             const emphasis=document.createElement("strong");
                emphasis.textContent=span.textContent;
                span.textContent="";
                emphasis.style.fontSize="24px";
                emphasis.style.color="red";

                span.innerHTML="";
                span.appendChild(emphasis);
        }else{
             blockMake.className="blockMake";
             span.innerHTML=originalText;
        }
        PriorityCount++;
    });

    
    
   var RedCount=0;
    changeColorRed.addEventListener("click",function(){
         if(RedCount%2==0){
        const changeColorRedText=document.createElement("div");
        changeColorRedText.textContent=span.textContent;
        span.textContent="";
        changeColorRedText.style.color="red";
        span.appendChild(changeColorRedText);
        console.log("赤色に変えます");
        }else{
            span.innerHTML=originalText;
        }
        RedCount++;
    });
    var BlueCount=0;
    changeColorBlue.addEventListener("click",function(){
        if(BlueCount%2==0){
        const changeColorBlueText=document.createElement("div");
        changeColorBlueText.textContent=span.textContent;
        span.textContent="";
        changeColorBlueText.style.color="blue";
        span.appendChild(changeColorBlueText);
         console.log("青色に変えます");
        }else{
            span.innerHTML=originalText;
        }
            BlueCount++;
    });

    var GreenCount=0;
    changeColorGreen.addEventListener("click",function(){
        if(GreenCount%2==0){
        const changeColorGreenText=document.createElement("div");
        changeColorGreenText.textContent=span.textContent;
        span.textContent="";
        changeColorGreenText.style.color="green";
        span.appendChild(changeColorGreenText);
        console.log("緑色に変えます");
        }else{
            span.innerHTML=originalText;
        }
        GreenCount++;
    });



    }else{
        alert("何も記載されていません");
        console.log("何も記載されていません");
    }
});


reset.addEventListener("click",function(){
    text.value="";
    console.log("リセットしました");
});


