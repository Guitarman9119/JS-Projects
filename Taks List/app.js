/////////// Define UI Variables//////////////////////////////////////

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//---------------------------------------------------------------------------------------------//
////////////Function for all the event listeners for project //////////////////////////////////

loadEventListeners();

//Load all event listeners//////////////////////////////////////////////////////////////////////

function loadEventListeners(){
    //DOM load EVENT

    document,addEventListener('DOMContentLoaded', getTasks);

    //add task event
    form.addEventListener('submit', addTask);

    //Remove task event
    taskList.addEventListener('click', removeTask);

    //Clear task events
    clearBtn.addEventListener('click', clearTasks);

    //Filter tasks event
    filter.addEventListener('keyup', filterTasks);


}
//////////////////////////////////////////////////////////////////////////////////////////////////
//-------------------------------------------------------------------------------------------------//


//---------------------------------------FUNCTIONS--------------------------------------------------

//-------------------------------Get Tasks from LocalStorage

function getTasks(){

    let tasks;

    if(localStorage.getItem('tasks') === null){

        tasks = [];

    } else {

        tasks = JSON.parse(localStorage.getItem('tasks'));

    } 

    tasks.forEach(function(task){

// Create LI element 

const li = document.createElement('li');
//Add class
li.className = 'collection-item';
//Create text node and append to Li
li.appendChild(document.createTextNode(task));
// Create new link Element
const link = document.createElement('a');
//ADD class name:
link.className = 'delete-item secondary-content';
// add icon html
link.innerHTML = '<i class="fa fa-remove"></i>'
//Appemd the link to li
li.appendChild(link);

//append li to ul 

taskList.appendChild(li);
    

    });

}


//-----------------------------------------Add Task-------------------------------------------------

function addTask(e){

    if(taskInput.value === ''){

        alert('Add a Project');
    }

    // Create LI element 

    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create text node and append to Li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link Element
    const link = document.createElement('a');
    //ADD class name:
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //Appemd the link to li
    li.appendChild(link);

    //append li to ul 

    taskList.appendChild(li);

    
    /////////////////////////////////////////////////////////DATABASIS////////////////////////////////////////////////
    storeTaskInLocalStorage(taskInput.value);



//-------------------------------------------------Local Storage Implementation --------------------------------------

    //Clear Input
    taskInput.value = '';
    e.preventDefault();
}



//------------------------------------------------------Storage function------------------------------------------------
function storeTaskInLocalStorage(task){

    let tasks;
    if(localStorage.getItem('tasks') === null){

        tasks = [];

    } else {

        tasks = JSON.parse(localStorage.getItem('tasks'));

    } 

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}




//------------------------------------------------------ Remove Task----------------------------------------------------------
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
      if(confirm('Are You Sure?')) {
        e.target.parentElement.parentElement.remove();
  
        // Remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }
    }
  }

//------------------------------------------------- Remove from LS---------------------------------------------------------------
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
//----------------------------------------------------------------------------------------------------------------------------------
function clearTasks(){

while(taskList.firstChild){

    taskList.removeChild(taskList.firstChild);
}

//-------------------------------------------------- Clear from LS----------------------------------------------------------------------
clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
  } 

//------------------------------------------------------filter function-------------------------------------------------------------------
function filterTasks(e){

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task){

            const item = task.firstChild.textContent;

            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else{

                task.style.display = 'none';
            }
        }
    );
}