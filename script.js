document.addEventListener("DOMContentLoaded", () => {

   // Task Model
   let tasks = [];
   console.log("Lista Tasks: ", tasks);

   // Dom Elements
   let listTasks = document.querySelector("tbody");
   let form = document.querySelector(".form");
   let task = document.querySelector("#task");

   function createNewTask(task) {
      // Create a new task
      let lineTask = document.createElement("tr");

      lineTask.innerHTML = `
         <td>
            <input type="checkbox" name="" id="">
            <input type="text" name="task" value="${task}" class="task" readonly>
         </td>
         <td class="status"><span>Not started</span></td>
         <td>
            <div class="button-group">
               <button class="edit"><i class="fa-regular fa-pen-to-square"></i></button>
               <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
            </div>
         </td>`;

      listTasks.appendChild(lineTask);
   }

   tasks.forEach(el => createNewTask(el.name));

   form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (task.value.trim()) {
         createNewTask(task.value.trim());

         tasks.push({
            name: task.value.trim(),
            status: "Not started"
         });

         task.value = "";
      } else {
         alert("The field is empty!");
      }
   });

   listTasks.addEventListener("click", (e) => {
      let target = e.target;
      let trTask = target.closest("tr");
      let index = [...listTasks.children].findIndex(el => el === trTask);
      let editButton = trTask.querySelector("button.edit");
      let editTask = trTask.querySelector(".task");
      let editStatus = trTask.querySelector(".status span");

      // Create a select input 
      let selectInput = document.createElement("select");
      let options = ["Not started", "In progress", "Completed"];

      // Delete the selected task
      if (target.classList.contains("delete") || target.classList.contains("fa-trash-can")) {

         // Delete element from array
         tasks.splice(index, 1);

         // Delete element from DOM
         trTask.remove();

      } else if (target.classList.contains("edit") || target.classList.contains("fa-pen-to-square")) {

         // Change the edit button in save button
         editButton.innerHTML = `<i class="fa-regular fa-floppy-disk"></i>`;
         editButton.classList.remove("edit");
         editButton.classList.add("save");

         editTask.removeAttribute('readonly');
         editTask.style.border = "solid #a780d3 1px";

         options.forEach(option => {
            let optionElement = document.createElement("option");
            optionElement.textContent = option;
            optionElement.value = option;
   
            if (option === editStatus.textContent) {
               optionElement.selected = true;
            }
            selectInput.appendChild(optionElement);
         });

         editStatus.innerHTML = "";
         editStatus.appendChild(selectInput);
         editStatus.style.background = "transparent";


      } else if(target.classList.contains("save") || target.classList.contains("fa-floppy-disk")) {

         let saveButton = trTask.querySelector("button.save");
         let selectValue = trTask.querySelector("select").value;

         // Change status
         editStatus.innerHTML = selectValue;
         tasks[index].status = editStatus.textContent;
         
         switch (editStatus.textContent) {
            case "Not started":
               editStatus.style.background = '#dd6969'
               break;
            case "In progress":
               editStatus.style.background = '#f0b067'
               break;
            default:
               editStatus.style.background = '#359752'
         }

         // Change task name
         tasks[index].name = editTask.value;
         editTask.style.border = "none";
         editTask.readOnly = true;

         // Change button from save to edit
         saveButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
         saveButton.classList.remove("save");
         saveButton.classList.add("edit")

         console.log(tasks)
      } 
   });
});

