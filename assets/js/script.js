//global elements
var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentE1 = document.querySelector("#page-content");
var taskinProgressE1 = document.querySelector("#tasks-in-progress");
var taskCompletedE1 = document.querySelector("#tasks-completed"); 


var taskFormHandler = function(event) {
    event.preventDefault();
    /*By adding the event argument to the createTaskHandler() function, we can use the data and functionality that object holds. We did that when we added event.preventDefault(); to the handler function's code. */
    var taskNameInput = document.querySelector("input[name = 'task-name']").value;
    console.log(taskNameInput);
    /*If we used another set of double quotes to wrap the attribute's value, the entire string would fail because it would assume that we ended the string at "[name="; anything after would break the query selector.*/
    var TaskTypeinput = document.querySelector("select[name = 'task-type']").value;
    
    var isEdit = formE1.hasAttribute("data-task-id");
    
    //has data attribute, so get task id and call function to complete edit process
    if(isEdit){
        var taskId = formE1.getAttribute("data-task-id");
        completeEditTask(taskNameInput, TaskTypeinput, taskId);
    }
    //no data attribute, so create object as normal and pass to createTaskE1 function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: TaskTypeinput
        };
       createTaskE1(taskDataObj); 
    }

    // //package up data as an object
    // var taskDataObject = {
    //     name: taskNameInput,
    //     type: TaskTypeinput
    // };

    //check if input values are empty strings
    if (!taskNameInput || !TaskTypeinput){
        alert("You need to fill out the task form!");
        return false;
    }
    formE1.reset();
    // createTaskE1(taskDataObject);
};

var completeEditTask = function(taskName, taskType, taskId){
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new values
    taskSelected = document.querySelector("h3.task-name").textContent = taskName;
    taskSelected = document.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");
    formE1.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

var createTaskE1 = function(taskDataObj){
    //create list item
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";

    //add task id as a custom attribute
    listItemE1.setAttribute("data-task-id", taskIdCounter);

    //create div to hold task info and add to list item
    var taskInfoE1 = document.createElement("div");
    //Give div created above a class name
    taskInfoE1.className = "task-info";
    
    //add HTML content to div
    taskInfoE1.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>"

    listItemE1.appendChild(taskInfoE1);

    var taskActionsE1 = createTaskActions(taskIdCounter);
    listItemE1.appendChild(taskActionsE1);
    //add entire list item to list
    tasksToDoE1.appendChild(listItemE1);

    //increase task counter for next unique id
    taskIdCounter++;

};

var createTaskActions = function(taskId) {
    var actionContainerE1 = document.createElement("div");
    actionContainerE1.className = "task-actions";

    //create edit button
    var editButtonE1 = document.createElement("button");
    editButtonE1.textContent = "Edit";
    editButtonE1.className = "btn edit-btn";
    editButtonE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(editButtonE1);

    //create delete button
    var deleteButtonE1 = document.createElement("button");
    deleteButtonE1.textContent = "Delete";
    deleteButtonE1.className = "btn delete-btn";
    deleteButtonE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(deleteButtonE1);

    //create change status dropdown
    var statusSelectE1 = document.createElement("select");
    statusSelectE1.setAttribute("name", "status-change");
    statusSelectE1.setAttribute("data-task-id", taskId);
    statusSelectE1.className = "select-status";
    actionContainerE1.appendChild(statusSelectE1);


    //create status options
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for(var i = 0; i < statusChoices.length; i++){
        //create option element
        var stautsOptionE1 = document.createElement("option");
        stautsOptionE1.setAttribute("value", statusChoices[i]);
        stautsOptionE1.textContent = statusChoices[i];

        //append to select
        statusSelectE1.appendChild(stautsOptionE1);
    }
    return actionContainerE1;
};

formE1.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event){
    //get target element from event
    var targetE1 = event.target;

    //edit button was clicked
    if(targetE1.matches(".edit-btn")) {
        var taskId = targetE1.getAttribute("data-task-id")
        editTask(taskId);
    }
    //delete button was clicked
    else if(event.target.matches(".delete-btn")){
        var taskId = targetE1.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

pageContentE1.addEventListener("click", taskButtonHandler);

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

var editTask = function(taskId){
    console.log("editing task #" + taskId);

    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formE1.setAttribute("data-task-id", taskId);
};

var taskStatusChangeHandler = function(event){
    console.log(event.target);
    console.log(event.target.getAttribute("data-task-id"));

    //get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    //get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if(statusValue === "to do"){
        tasksToDoE1.appendChild(taskSelected);
    }
    else if(statusValue === "in progress"){
        taskinProgressE1.appendChild(taskSelected);
    }
    else if(statusValue === "completed"){
        taskCompletedE1.appendChild(taskSelected);
    }
};

pageContentE1.addEventListener("change", taskStatusChangeHandler);
