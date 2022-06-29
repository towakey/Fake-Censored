console.log("run...");

window.onload=function()
{
    censoredImage();
}

function censoredImage()
{
    var img=document.images;
    for(let i=0;i<img.length;i++)
    {
        w=img[i].naturalWidth;
        h=img[i].naturalHeight;
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
console.log("...finish");
