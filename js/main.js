var sitename = document.getElementById("sitename");
var siteURL = document.getElementById("siteURL");
var submitBtn = document.getElementById("submitBtn");
var close = document.getElementById("closeBtn");
var box = document.querySelector(".warning-box");

var siteList;

if(localStorage.getItem("siteList")== null){
    siteList=[];
}else{
    siteList = JSON.parse(localStorage.getItem("siteList"));
    displaySite(siteList);
}


function capitalize(str) {
    let strArr = str.split("");
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join("");
  }

// SUBMIT 
submitBtn.addEventListener("click", function(){
    if (sitename.classList.contains("is-valid") && siteURL.classList.contains("is-valid")){
   
        var site ={
            name: capitalize(sitename.value),
            URL: siteURL.value
        }
    
        clearForm();
        siteList.push(site);
        displaySite(siteList);
        localStorage.setItem("siteList",JSON.stringify(siteList));
        sitename.classList.remove("is-valid");
        siteURL.classList.remove("is-valid");
        }
        else{
            box.classList.remove("d-none");
    
        }
});



function clearForm(){
sitename.value="";
siteURL.value="";
    
}



    
    function displaySite(site){
        var cartona =``
        for(var i =0 ; i < site.length ; i++){
            cartona += `
            <div class="col-md-3 col-lg-3 mb-3 ">
            <div class="card text-center text-white">
                <div class="card-i text-start ">
                    <img src="images/4768290.png" alt="" class="w-25 position-relative ">
                    <p class="position-absolute paragraph">${i+1}</p>
                </div>
                <h4 class="mb-4 name">${site[i].name}</h4>
                <div class="btns d-flex justify-content-center align-items-center mb-3">
                    <button  onclick="VisitSite(${i})" class="btn btn-sm visitbtn mx-3 text-white"><i class="fa-solid fa-eye pe-2" ></i>visit</button>
                    <button onclick="deleteSite(${i})" class="btn btn-sm btn-danger me-3"> <i class="fa-solid fa-trash-can pe-2"></i>delete</button>
                </div>
            </div>
            
</div>`
        ;
        }
        document.getElementById("row").innerHTML=cartona;
    }



    function deleteSite(index){
        siteList.splice(index,1);
        localStorage.setItem("siteList",JSON.stringify(siteList));

displaySite(siteList);    

}

function VisitSite(index) {
    var siteURL = siteList[index].URL;

    if (siteURL.trim() !== "") {
        window.open(`https://${siteURL}`);
    }
}


    var urlRegex =/^[a-zA-Z]+\.com$/;
    var nameRegex = /^[a-zA-Z0-9]{3,}$/;

sitename.addEventListener("input" , function(){
    validate(sitename , nameRegex);
});

siteURL.addEventListener("input" , function(){
    validate(siteURL , urlRegex);
});


function validate(element , regex ){
    var reg = regex;
    if (reg.test(element.value)){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
      } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
      }
    }


function closebox() {
    box.classList.add("d-none");

  }
  close.addEventListener("click", closebox);
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("warning-box")) {
      closebox();
    }
  });
  