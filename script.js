document.addEventListener("DOMContentLoaded", () => {

   // Task Model
   let tasks = [];
   console.log("Lista Tasks: ", tasks);

   // Dom Elements
   let listTasks = document.querySelector("tbody");
   let form = document.querySelector(".form");
   let task = document.querySelector("#task");


   tasks.forEach(el => createNewTask(el.name));

   // Add a new task
   form.addEventListener("submit", (e) => {
      e.preventDefault();

      let taskValue = task.value.trim();

      if (taskValue) {
         createNewTask(taskValue);

         tasks.push({
            name: taskValue,
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
      let editSaveButton = trTask.querySelector("button:first-child");
      let editTask = trTask.querySelector(".task");
      let editStatus = trTask.querySelector(".status span");

      // Delete the selected task
      if (target.classList.contains("delete") || target.classList.contains("fa-trash-can")) {
         // Delete element from array
         tasks.splice(index, 1);

         // Delete element from DOM
         trTask.remove();

      } else if (target.classList.contains("edit") || target.classList.contains("fa-pen-to-square")) {

         // Change the edit button in save button
         changeButton(editSaveButton);

         editTask.removeAttribute('readonly');
         editTask.style.border = "solid #a780d3 1px";

         createSelect(editStatus);

      } else if(target.classList.contains("save") || target.classList.contains("fa-floppy-disk")) {

         if(editTask.value.trim()) {
            let selectValue = trTask.querySelector("select").value;

            // Change status
            editStatus.innerHTML = selectValue;
            tasks[index].status = editStatus.textContent;
            
            switch (editStatus.textContent) {
               case "Not started":
                  editStatus.style.background = '#dd6969'
                  editTask.classList.remove("checked");
                  break;
               case "In progress":
                  editStatus.style.background = '#f0b067'
                  editTask.classList.remove("checked")
                  break;
               default:
                  editStatus.style.background = '#359752'
                  editTask.classList.add("checked")
            }
   
            // Change task name
            tasks[index].name = editTask.value;
            editTask.style.border = "none";
            editTask.readOnly = true;
   
            // Change button from save to edit
            changeButton(editSaveButton);
         } else {
            alert("The field is empty!");
         }

      } 
   });

   function createNewTask(task) {
      // Create a new task
      let lineTask = document.createElement("tr");

      lineTask.innerHTML = `
         <td>
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

   function changeButton(button) {
      if(button.classList.contains("edit")) {
         button.innerHTML = `<i class="fa-regular fa-floppy-disk"></i>`;
         button.classList.remove("edit");
         button.classList.add("save");
      } else {
         button.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
         button.classList.remove("save");
         button.classList.add("edit")
      }
   }

   function createSelect(status) {
      let selectInput = document.createElement("select");
      let options = ["Not started", "In progress", "Completed"];
      
      options.forEach(option => {
         let optionElement = document.createElement("option");
         optionElement.textContent = option;
         optionElement.value = option;

         if (option === status.textContent) {
            optionElement.selected = true;
         }
         selectInput.appendChild(optionElement);
      });

      status.innerHTML = "";
      status.appendChild(selectInput);
      status.style.background = "transparent";
   }
});

