//1. we want to show pop up of creating a blog by clicking event on  create a blog btn









let blogArr = [];
const createBlogBtn = document.getElementById('blog-btn');
const popup = document.querySelector(".btn-popUp");
const editPopup = document.querySelector('.btn-edit-popUp');
const cancelBtn = document.getElementById('cancel-blog-post');
const  closebtn = document.getElementById('close-btn');
const closeEditBtn = document.getElementById('close-edit-btn');
const form = document.getElementById('create-blog-form');
const publishBlogPost = document.getElementById('publish-blog-post');
const createBlogTitleEle = document.getElementById('create-blog-title');
const createBlogDescriptionEle = document.getElementById('create-blog-description');
const mainBloggingDiv  = document.querySelector('.main-div');
const createBlogTitleEditEle = document.getElementById('create-blog-title-edit');
const createBlogDescriptionEditEle = document.getElementById('create-blog-description-edit')
const savePostBtn =  document.getElementById('publish-blog-edit-post');
const deleteEditBtn = document.getElementById('cancel-blog-edit-post')





// this function is to show the new blog create popup
function showBlogPopUpForm(event){
    event.preventDefault();
    popup.classList.add('show-btn-popup');
}


// function to closet the new blog create popup
function closeCreateBlogPopUp(event){
    event.preventDefault();
    popup.classList.remove('show-btn-popup'); // to referesh the page so we again click on the create blog it should works as before
}



// this function is to edit the exixsting blog
//  show the exsiting popup
function editPopupBlog(event){
    event.preventDefault();
    let editbtn = event.target;
    let id = editbtn.id;
    editPopup.classList.add('show-btn-popup');  // to show the popup
    createBlogTitleEditEle.value = blogArr[id-1].blogTitle;
    createBlogDescriptionEditEle.value = blogArr[id-1].blogDescription;
    console.log(saveEditBlog);
    savePostBtn.setAttribute('id' , id);
    deleteEditBtn.setAttribute('id' , id);
    console.log(deleteEditBtn);
    
}

// close the edit popup with x sign
function closeEditPopupBtn(event){
    event.preventDefault();
    editPopup.classList.remove('show-btn-popup');
}

function saveEditBlog(event){
    event.preventDefault();
    let savePostBtn = event.target;
    let id = event.target.id;
    blogArr[id-1].blogTitle = createBlogTitleEditEle.value;
    blogArr[id-1].blogDescription = createBlogDescriptionEditEle.value;
    editPopup.classList.remove('show-btn-popup');
    acessArrray();
}
// edit the existing blog end

// this function to delete the existing blog
function deleteBlog(event){
    event.preventDefault();
    let id = event.target.id;
    console.log("delete");
    blogArr.splice(id-1 , 1);
    editPopup.classList.remove('show-btn-popup');
    acessArrray(); 
}


// deteing blog direct
// function deleteBlogDirect(event){
//     alert("heuefhe");
//     let id = event.target.id;
//     console.log(id);
// }


// This function will access the blog details posted by the user and push into the array
function getblogUserDetails(event){
    event.preventDefault();
    // event.preventDefault();
    let id = blogArr.length + 1;
    let createBlogTitle = createBlogTitleEle.value;
    let createBlogDescription = createBlogDescriptionEle.value;
    let createdDate = Date();
    let subString = createdDate.substring(8,24);
    let month = subString.substring(0,7);
    let time = subString.substring(7);
    console.log(month,time);
    console.log(subString);
    subString =  "Created At : " + month + " at" + time;
    let blogObj = {id: id, blogTitle: createBlogTitle, blogDescription: createBlogDescription, time: subString};
    blogArr.push(blogObj);
    createBlogTitleEle.value = "";
    createBlogDescriptionEle.value = "";
    popup.classList.remove('show-btn-popup');
    acessArrray();

}



function printBlogsByArray(blogObj, index){
    //1. create a div with class name blog-div
    let blogDiv = document.createElement('div');
    blogDiv.setAttribute('class' , 'blog-div');
    mainBloggingDiv.appendChild(blogDiv);
    //2. now create 3 div which is a child of blogDiv
    //1.  first div
    let blogTitle = document.createElement('div');
    blogTitle.setAttribute('class' , 'blog-title');
    // creating h3 child of blogTitle
    let blogTitleh3 = document.createElement('h3');
    blogTitleh3.innerText = '' + blogObj.blogTitle;
    // append h3 to first div
    blogTitle.appendChild(blogTitleh3);
    
    //2.   second div 
    let blogDescription = document.createElement('div');
    blogDescription.setAttribute('class', 'blog-description' )
    // creating p child of blogDescription
    let blogDescriptionP = document.createElement('p');
    blogDescriptionP.textContent = "" + blogObj.blogDescription;
    blogDescription.appendChild(blogDescriptionP);

    // 3. third div
    let blogDetails = document.createElement('div');
    blogDetails.setAttribute('class', 'blog-details' )
    // creating two more div as a chilf of blog Details div
    // ---> first child
    let blogBtns = document.createElement('div');
    blogBtns.setAttribute('class', 'blog-btns');
       // creating 2 more child of blogBtns
          // first child of blogbtns
       let editDiv = document.createElement('div');
       editDiv.setAttribute('class' , 'edit-post-div');
         // creating button child of editDiv
       const editbtn = document.createElement('button');
       editbtn.setAttribute('class', 'edit-btn' );
       editbtn.textContent = 'Edit Post';
       editDiv.appendChild(editbtn);
       editbtn.setAttribute('id', blogObj.id);

       // second child of blogbtns
       let deleteDiv = document.createElement('div');
       deleteDiv.setAttribute('class' , 'delete-post-div');
          // creating child of deleteDiv
       let deletebtn = document.createElement('button');
       deletebtn.setAttribute('class' , 'delete-btn');
       deletebtn.textContent = 'Delete Post';
       deletebtn.setAttribute('id', blogObj.id);
       deleteDiv.appendChild(deletebtn);

       // now appending both child of blogBtns div
       blogBtns.appendChild(editDiv);
       blogBtns.appendChild(deleteDiv)


    //--> second child
    let blogTime = document.createElement('div');
    blogTime.setAttribute('class' , 'blog-time');
    blogTime.textContent = blogObj.time;

    // appending the childs
    blogDetails.appendChild(blogBtns);
    blogDetails.appendChild(blogTime);
    

    // now append them into blogDiv
    blogDiv.appendChild(blogTitle);
    blogDiv.appendChild(blogDescription);
    blogDiv.appendChild(blogDetails);
  

    // adding event listerner on all the dynamically edit post button
    let allEditEle = document.querySelectorAll('.edit-btn');
    let allEditEleCopy = [...allEditEle];
    allEditEleCopy.forEach((editEle) =>{
        editEle.addEventListener('click' , editPopupBlog);
    })
  
    // adding event listerner on all the dynamically delete post button
    let allDeleteEle = document.querySelectorAll('.delete-btn');
    let allDeleteEleCopy = [...allDeleteEle];
    allDeleteEleCopy.forEach((deleteEle) =>{
        deleteEle.addEventListener('click' , deleteBlog);
    })


 
}

// printing the array
function acessArrray(){

    while(mainBloggingDiv.firstChild){
        mainBloggingDiv.removeChild(mainBloggingDiv.firstChild);
    }

blogArr.map(function (blogObj, index){
    printBlogsByArray(blogObj, index);
});

}




createBlogBtn.addEventListener('click' , showBlogPopUpForm);
closebtn.addEventListener('click' , closeCreateBlogPopUp);
cancelBtn.addEventListener('click' , closeCreateBlogPopUp )
closeEditBtn.addEventListener('click' , closeEditPopupBtn);
publishBlogPost.addEventListener('click' , getblogUserDetails);
form.addEventListener('submit' , getblogUserDetails);
savePostBtn.addEventListener('click' , saveEditBlog);
deleteEditBtn.addEventListener('click' , deleteBlog);