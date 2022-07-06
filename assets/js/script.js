var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
    event.preventDefault();
    /*By adding the event argument to the createTaskHandler() function, we can use the data and functionality that object holds. We did that when we added event.preventDefault(); to the handler function's code. */
    var taskNameInput = document.querySelector("input[name = 'task-name']").value;
    console.log(taskNameInput);
    /*If we used another set of double quotes to wrap the attribute's value, the entire string would fail because it would assume that we ended the string at "[name="; anything after would break the query selector.*/
    var TaskTypeinput = document.querySelector("select[name = 'task-type']").value;
    
    //package up data as an object
    var taskDataObject = {
        name: taskNameInput,
        type: TaskTypeinput
    };

    //check if input values are empty strings
    if (!taskNameInput || !TaskTypeinput){
        alert("You need to fill out the task form!");
        return false;
    }
    formE1.reset();
    createTaskE1(taskDataObject);

};

var createTaskE1 = function(taskDataObj){
    //create list item
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";

    //create div to hold task info and add to list item
    var taskInfoE1 = document.createElement("div");
    //Give div created above a class name
    taskInfoE1.className = "task-info";
    
    //add HTML content to div
    taskInfoE1.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>"

    listItemE1.appendChild(taskInfoE1);

    //add entire list item to list
    tasksToDoE1.appendChild(listItemE1);

};

formE1.addEventListener("submit", taskFormHandler);