var Images='{"imageInfo":[{"url":"http://dianeduane.com/outofambit/wp-content/uploads/2015/12/blue_macarons.jpg","name":"Blue Macaroons","info":"image","date":"13-06-2019"}] }';

function displayGallery(){
    var displayImages;
    if(localStorage.getItem("displayImages") == null){
        localStorage.setItem("displayImages", Images);
        displayImages = JSON.parse(Images);
    }
    else{
        displayImages = localStorage.getItem("displayImages");
        displayImages = JSON.parse(displayImages);
    }
    var htmlText ="";

    for(var i=0 ;i<displayImages.imageInfo.length ;i++){
        htmlText += "<h2>"+ displayImages.imageInfo[i].name+"</h2>";
        htmlText += "<img src =\"" + displayImages.imageInfo[i].url + "\"> <br><br><br>";
    }
    document.getElementById("ImageArea").innerHTML += htmlText;
}

function addImage(){
   var url = document.getElementById("addImageURL").value;
   var name = document.getElementById("addImgName").value;
   var info = document.getElementById("addInfo").value;
   var date = document.getElementById("addUploadedDate").value;
   console.log(url +"-----" + name);

   var displayImages = localStorage.getItem("displayImages");
   var addedImage= {"url":url, "name": name, "info":info};
   var picsObj = JSON.parse(displayImages);
   picsObj.imageInfo.push(addedImage);
   displayImages = JSON.stringify(picsObj);
   console.log(displayImages);
   localStorage.setItem("displayImages",displayImages);
   window.location = "Gallery.html";
}

function editImage(){
    var origImgName = document.getElementById("originalImageName").value;
    var url = document.getElementById("newImageURL").value;
    var name = document.getElementById("newImgName").value;
    var info = document.getElementById("newImgInfo").value;
    var date = document.getElementById("newImgUploadedDate").value;
    console.log("Orig " + origImgName);

    var displayImages = localStorage.getItem("displayImages");
    var newImage= {"url":url, "name": name, "info":info};
    var picsObj = JSON.parse(displayImages);
    var imageFound = false;
    for(var i=0; i<picsObj.imageInfo.length;i++){
        console.log(picsObj.imageInfo[i].name);
        if(picsObj.imageInfo[i].name == origImgName){
            picsObj.imageInfo.splice(i,1,newImage);
            imageFound = true;
            break;
        }
    }
    if(!imageFound){
        alert("No such image found..Please check for the spelling ");
    }
    displayImages = JSON.stringify(picsObj);
    localStorage.setItem("displayImages", displayImages);
    window.location = "Gallery.html";
}

function deleteImage(){
    var delImageName= document.getElementById("delImageName").value;
    var displayImages = localStorage.getItem("displayImages");
    var picsObj = JSON.parse(displayImages);
    var imageFound = false;
    for(var i=0; i<picsObj.imageInfo.length;i++){
        console.log(picsObj.imageInfo[i].name);
        if(picsObj.imageInfo[i].name == delImageName){
            picsObj.imageInfo.splice(i,1);
            imageFound = true;
            break;
        }
    }
    if(!imageFound){
        alert("No such image found..Please check for the spelling ");
    }
    displayImages = JSON.stringify(picsObj);
    localStorage.setItem("displayImages", displayImages);
    window.location = "Gallery.html";
}