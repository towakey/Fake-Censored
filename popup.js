window.onload=function()
{
    let saveBtn=document.getElementById("save_btn");
    saveBtn.onclick=saveBtnProcess;
    showCensoredList();
}
function saveBtnProcess()
{
    console.log("sabe");
    const word=document.getElementById("censored_word");
    if(word.value!="")
    {
        console.log(word.value);
        console.log(localStorage.length);
        localStorage.setItem("censored_"+(localStorage.length+1).toString(), word.value);
        console.log(localStorage.length);
        word.value="";
    }
    showCensoredList();
}
function showCensoredList()
{
    let regexp=RegExp('^censored_[0-9]+$');
    let list=document.getElementById("list");
    console.log("length:"+list.children.length);
    list.innerHTML="";
    console.log('localstorage:'+localStorage.length);
    for(let i=0;i<localStorage.length;i++)
    {
        // list.append("<p>"+localStorage.getItem(localStorage.key(i))+'</p>');
        if(regexp.test(localStorage.key(i)))
        {
            console.log(regexp.test(localStorage.key(i)));
            // list.insertAdjacentHTML("afterend", "<li>"+localStorage.key(i)+" : "+localStorage.getItem(localStorage.key(i))+'<button onclick="deleteListWord('+localStorage.key(i)+')">削除</button></li>')
            var li=document.createElement("li");
            li.appendChild(document.createTextNode(localStorage.key(i)+" : "+localStorage.getItem(localStorage.key(i))));

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
    console.log("length:"+list.children.length);
}
function deleteListWord(id)
{
    console.log(id);
    localStorage.removeItem(id);
    showCensoredList();
}
