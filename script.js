document.addEventListener("DOMContentLoaded", () => {

   let inputText = document.querySelector('#task');
   let addButton = document.querySelector('.add');
   let listTasks = document.querySelector('tbody');
   let editButton = document.querySelector('button.edit');
   let deleteButton = document.querySelector('button.delete')


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
         inputText.value = '';
      } else {
         alert('The field is empty!')
      }

   });

   // Edit Button con prompt


   // Delete Button
   deleteButton.addEventListener("click", (e) => {
      let target = e.target;
      if (target.localname == "button" || target.localname == "i") {
         let lineTR = e.target.closest("tr");
         lineTR.remove();
      }
   });

   // Status

   // Local Storage
   


   // LightMode & DarkMode
});
