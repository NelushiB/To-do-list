class ToDoList {
   constructor() {
      this.tasks = [];
      this.id = 0
      console.log("Lista Tasks: ", this.tasks );
   }

   addTask(task) {
      const newTask = {
         id: this.id,
         name: task,
         status: 'Not started'
      }
      this.tasks.push(newTask);
      this.createNewTask(newTask.id, newTask.name, newTask.status);   
      this.id++
   }

   createNewTask(id, task, status) {
      // Create a new task 
      let listTasks = document.querySelector('tbody');
      let lineTask = document.createElement('tr');
      lineTask.dataset.id = id;
      lineTask.innerHTML =
         `<td><input type="checkbox" name="" id=""> ${task}</td>
         <td class="status"><span>${status}</span></td>
         <td>
            <div class="button-group">
               <button class="edit"><i class="fa-regular fa-pen-to-square"></i></button>
               <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
            </div>
         </td>`;
      
      listTasks.appendChild(lineTask);
   }

   deleteTask(id) {
      const index = this.tasks.findIndex(task => task.id == id);
      if(index != -1) {
         this.tasks.splice(index, 1);
      }
   }

   editTask(id, editTask, editStatus) {
      const index = this.tasks.findIndex(task => task.id == id);
      console.log("edit-index", index);
      if(index != -1) {
         this.tasks[index] = {
            name: editTask,
            status: editStatus
         }
      }
      
   }
}

document.addEventListener("DOMContentLoaded", () => {

   let listTasks = document.querySelector('tbody');
   let inputText = document.querySelector('#task');
   let addButton = document.querySelector('.add');
   let editWindow = document.querySelector('.edit-window');
   let close = editWindow.querySelector('span');
   let confirmButton = editWindow.querySelector ('button.confirm');
   let inputEdit = editWindow.querySelector('input');
   let status = editWindow.querySelector('option').textContent;
   let selectStatus = editWindow.querySelector('#status').options;

   const singleTask = new ToDoList();

   addButton.addEventListener("click", (e) => {
      let taskName = inputText.value;
      e.preventDefault();
      if (taskName.trim() != '') {
         singleTask.addTask(taskName);
         //saveData();
         inputText.value = '';
      } else {
         alert('The field is empty!')
      }
   });

   listTasks.addEventListener("click", (e) => {
      const target = e.target;

      // Delete the selected task
      if(target.className == "delete" || target.className == "fa-regular fa-trash-can") {
         let trTask = target.closest('tr');
         let id = trTask.dataset.id;
         console.log(id);
         trTask.remove();
         singleTask.deleteTask(id);

      // Edit the selected task
      } else if (target.className == "edit" || target.className == "fa-regular fa-pen-to-square") {
         addRemoveClass();

         let tdTasks = document.querySelectorAll('tr td:first-child')
         console.log(tdTasks)
         
         tdTasks.forEach(tdTask => {
            // Getting the task name
            inputEdit.value = tdTask.textContent;

            // Getting the value of the status
            for (let i = 0; i < selectStatus.length; i++) {
               if (selectStatus[i].textContent === status) {
                  selectStatus[i].selected = true;
                  break; 
               }
            }

            confirmButton.addEventListener("click", (e) => {
               e.preventDefault();
               
               let idInput = tdTask.cellIndex;
               let editTask = inputEdit.value;
               let selectedStatus = status.value;
         
               singleTask.editTask(idInput, editTask, selectedStatus);

               inputEdit.textContent = editTask;
         
               addRemoveClass();
               /*switch(singleTask.status.value) {
                  case "not-started":
                     singleTask.status.style.color = '#9c392a'
                     break;
                  case "in-progress":
                     singleTask.status.style.color = 'yellow'
                     break;
                  default:
                     singleTask.status.style.color = 'green'
               } */
               })

         })
         

         
      } 
   });

   close.addEventListener("click", () => {
      addRemoveClass();
   });

   

      function addRemoveClass() {
         if(editWindow.classList.contains('show')) {
            editWindow.classList.remove('show');
            editWindow.classList.add('hidden');
         } else {
            editWindow.classList.remove('hidden');
            editWindow.classList.add('show');
         }
      }
   }); 





   // Status

   // Local Storage
   /* function saveData() {
      localStorage.setItem("task", listTasks.innerHTML);
   }

   function getData() {
      listTasks.innerHTML = localStorage.getItem("task");
   }

   getData();*/


   // LightMode & DarkMode
