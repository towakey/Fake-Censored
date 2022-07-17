window.onload=function()
{
    console.log("run...");
    censoredImage();
    // censoredWord();
    console.log("...finish");
}

window.onmessage=function()
{
    console.log("run(onmessage)...");
    censoredImage();
    // censoredWord();
    console.log("...finish(onmessage)");
}

function censoredImage()
{
    var img=document.images;
    for(let i=0;i<img.length;i++)
    {
        w=img[i].naturalWidth;
        h=img[i].naturalHeight;

        if(w>0 && h>0){
            let e=img[i];
            // e.style.display='none';
            var cv=document.createElement("canvas");
            cv.width=w;
            cv.height=h;
            cv.style.backgroundColor="red";
            // document.body.append(cv);
            var ct=cv.getContext("2d");
            var imageData=ct.createImageData(w,h);
            for (var y = 0; y < imageData.height; y++) {
                for (var x = 0; x < imageData.width; x++) {
                    imageData.data[(y * imageData.width + x) * 4 + 0] = 220;
                    imageData.data[(y * imageData.width + x) * 4 + 1] = 220;
                    imageData.data[(y * imageData.width + x) * 4 + 2] = 220;
                    imageData.data[(y * imageData.width + x) * 4 + 3] = 255;
                }
            }
            ct.putImageData(imageData,0,0);
            ct.font="20pt Arial";
            ct.textAlign='center';
            ct.fillText("検閲済み", cv.width/2, 100);
            ct.stroke();
            var png=cv.toDataURL();
            img[i].src=png;
        }
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    censoredArray = String(request.word).split(',');
    let wordArray=["a", "p", "h1", "h2", "h3", "h4", "h5", "tr", "td"];

    for(var ca=0;ca<censoredArray.length;ca++){
        // alert(censoredArray[i]);
        // console.log("localstorage:"+localStorage.length);
        // for(let ls=0;ls<localStorage.length;ls++)
        // {
        //     console.log(localStorage.getItem(localStorage.key(ls)));
        // }
        wordArray.forEach(function(element){
            let elem
            console.log(element);
            elem=document.querySelectorAll(element);
            for(let i=0;i<elem.length;i++)
            {
                let e=elem[i];
                // console.log(elem[i]);
                // e.style.display='none';

                var rep_word="";
                for(let j=0;j<censoredArray[ca].length;j++){
                    rep_word+="■";
                }
                
                var text=e.innerText;
                console.log(censoredArray[ca]);
                console.log(text);
                text=text.split(censoredArray[ca]);
                text=text.join(rep_word);
                console.log(text);
                e.innerText=text;
            }
        });
    }

    sendResponse();
    return true;
});
