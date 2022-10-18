// footer data 
const d = new Date();
let year = d.getFullYear();
console.log(year);
document.querySelector('footer').innerHTML=`<div class="container-fluid text-center pt-3 pb-2" id="footer">&copy; ${year} All Rights Reserve</div>`;

// toastify note 
function toastNote(color,message){
    var bgColor;
    switch(color){
        case('error'):
        bgColor="background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);";
        break;
        case('success'):
        bgColor="background:linear-gradient(90deg, rgba(15,32,39,1) 0%, rgba(32,58,67,1) 35%, rgba(44,83,100,1) 100%);"
        break;
        default:
            bgColor="#000";
            break;
    }
    Toastify({
        text: message,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background:color,
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

// empty form form the input 
function emptyField(){
    document.querySelector('#title').value="";
    document.querySelector('#location').value="";
    document.querySelector("#discription").value="";
}

// show output 

function outputField(output){
    document.querySelector('#table').innerHTML=output;
}



// form handle 
let formHandle=()=>{
    event.preventDefault();
    const title=document.querySelector('#title').value;
    const location=document.querySelector('#location').value;
    const discription=document.querySelector("#discription").value;
    let titleTop=title.trim();
    let locationTop=location.trim();
 let discriptionTop=discription.trim();
    if(titleTop.length<3){
toastNote('error',"Please Enter your name correctly")
return
}else 
if(locationTop.length<3){
    toastNote('error',"Please Enter your Location correctly")
        return
    }else
    if(discriptionTop.length<10){
        toastNote('error',"Please Enter your Discrition correctly")
        return
    }
    // function randomId(){
        //         str =Math.floor(Math.random()*1000)
        //     return str;
        // }
        // randomId()
        function randstr()
        {
    return Math.random().toString(36).replace('0.','');
}
    let todo={titleTop,locationTop,discriptionTop}
    todo.id=randstr();
    todo.status="active";
    // console.log(todo);
    const todos=JSON.parse((localStorage.getItem('todos',todo)))||[];
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos))
    console.log(todos);
    toastNote('success',"Your Note is Successfully added to list")
    table();
    emptyField();
}
// table();
function table(){
    let todos=JSON.parse(localStorage.getItem("todos"))||[];
    console.log(todos.length);
    if(!todos.length){
        outputField("<h5>Hurray! You can add Note By pressing Button</h5>");
return;
 }
    let tableHead=`<table class="table table-responsive overflow-auto">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Location</th>
        <th scope="col">Discription</th>
        <th scope="col">ID</th>
        <th scope="col">Edit/Del</th>
      </tr>
    </thead>`
    let tableBody="";
    for(var i=0;i<todos.length;i++){
        let todo=todos[i];
        tableBody +=  `
        <tr>
          <th scope="row">${i+1}</th>
          <td>${todo.titleTop}</td>
          <td>${todo.locationTop}</td>
          <td>${todo.discriptionTop}</td>
          <td>${todo.id}</td>
          <td><button type="button" class="btn btn-sm  btn-info" data-value=${todo.id} onclick="EditTodo(event)">Edit</button><button type="button" class="btn btn-sm ms-3 btn-warning" data-value=${todo.id} onclick="DelTodo(event)">Delete</button></td>
          
        </tr>`
    }
    let tableEnding=` </table>`
    document.querySelector("#table").innerHTML=tableHead+"<tbody>"+tableBody+"</tbody>"+tableEnding;
    // outputField(OutputTable)

}
outputField()