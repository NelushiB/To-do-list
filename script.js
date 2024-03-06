document.addEventListener("DOMContentLoaded", () => {

   let inputText = document.querySelector('#task');
   let addButton = document.querySelector('.add');
   let listTasks = document.querySelector('tbody');
   let editButtons = document.querySelectorAll('button.edit');
   let deleteButtons = document.querySelectorAll('button.delete')


   addButton.addEventListener("click", (e) => {
      e.preventDefault();
      let taskName = inputText.value;

      if (taskName.trim() != '') {
         let lineTask = document.createElement('tr');

         lineTask.innerHTML =
         `<td><input type="checkbox" name="" id=""> ${taskName}</td>
         <td class="status"><span>Not started</span></td>
         <td>
            <div class="button-group">
               <button class="edit"><i class="fa-regular fa-pen-to-square"></i></button>
               <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
            </div>
         </td>`;
         listTasks.appendChild(lineTask);

         //saveData();
         inputText.value = '';
      } else {
         alert('The field is empty!')
      }

   });

   // Edit Button con prompt
   editButtons.forEach(editButton => {
      editButton.addEventListener("click", (e) => {
         let target = e.target;

         if (target.localName == "button" || target.localName == "i") {
            let editTask = prompt();
         }
      });
   });

   // Delete Button
   deleteButtons.forEach(deleteButton => {
      deleteButton.addEventListener("click", (e) => {
         let target = e.target;

         if (target.localName == "button" || target.localName == "i") {
            let lineTR = e.target.closest("tr");
            lineTR.remove();
            //saveData();
         }
      });
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
});
