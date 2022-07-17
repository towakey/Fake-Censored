window.onload=function()
{
    let saveBtn=document.getElementById("save_btn");
    saveBtn.onclick=saveBtnProcess;
    // localStorage.clear();
    showCensoredList();
}

document.getElementById("censoredButton").addEventListener('click', () => {
    console.log("検閲");
    chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
        var word = [];
        for(var i=0;i<=localStorage.length;i++)
        {
            var key="censored_"+i;
            if(localStorage.getItem(key)!=null)
            {
                word.push(localStorage.getItem(key));
            }
        }
        chrome.tabs.sendMessage(tabs[0].id, {word: word},(response)=>{
            if(response)
            {
                console.log(response);
                alert(response);
                return ;
            }
        });
    });
});

function saveBtnProcess()
{
    console.log("sabe");
    const word=document.getElementById("censored_word");
    if(word.value!="")
    {
        console.log(word.value);
        console.log(localStorage.length);
        for(var i=0;i<=localStorage.length;i++)
        {
            var key="censored_"+i;
            console.log("key:"+key);
            console.log(localStorage.getItem(key));
            // localStorage.setItem("censored_"+(localStorage.length+1).toString(), word.value);
            if(localStorage.getItem(key)==null)
            {
                console.log("setItem");
                localStorage.setItem(key, word.value);
                break;
            }
        }
        word.value="";
    }
    showCensoredList();
}
function showCensoredList()
{
    let regexp=RegExp('^censored_[0-9]+$');
    let list=document.getElementById("list");
    // console.log("length:"+list.children.length);
    list.innerHTML="";
    console.log('localstorage:'+localStorage.length);
    for(let i=0;i<=localStorage.length;i++)
    {
        // list.append("<p>"+localStorage.getItem(localStorage.key(i))+'</p>');

        if(regexp.test(localStorage.key(i)))
        {
            // console.log(regexp.test(localStorage.key(i)));
            // list.insertAdjacentHTML("afterend", "<li>"+localStorage.key(i)+" : "+localStorage.getItem(localStorage.key(i))+'<button onclick="deleteListWord('+localStorage.key(i)+')">削除</button></li>')
            var li=document.createElement("li");
            li.appendChild(document.createTextNode(localStorage.getItem(localStorage.key(i))));
            // li.appendChild(document.createTextNode(localStorage.key(i)+":"+localStorage.getItem(localStorage.key(i))));

            var deleteButton=document.createElement("button");
            deleteButton.innerText="削除";
            deleteButton.onclick=function()
            {
                deleteListWord(localStorage.key(i));
            }
            li.appendChild(deleteButton);
            list.appendChild(li);
        }
    }
    // console.log("length:"+list.children.length);
}
function deleteListWord(id)
{
    console.log(id);
    localStorage.removeItem(id);
    showCensoredList();
}
