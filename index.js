async function showCourses(){
    const fetchedData = await fetch('http://localhost:7000/api/courses');
    let courses = await fetchedData.json();
    let tableBody = document.querySelector('tbody');
    for(let i=0;i<courses.length;i++){
        let trElement = document.createElement('tr');
        tableBody.append(trElement);
         trElement.innerHTML = '<th>'+courses[i].subjectId+'</th> <th>'+courses[i].subjectName +'</th> <th>'+courses[i].courseName+'</th> <th>'+courses[i].dateCreated+'</th> <th>'+ courses[i].dateModified+'</th>'+'<button id="update-btn" class="btn btn-primary my-btn">Update</button>'+'<button id="delete-btn" class="btn btn-secondary my-btn">Delete</button>';
         let updateBtn = trElement.childNodes[9];
         let deleteBtn = trElement.childNodes[10];    

      updateBtn.addEventListener('click',()=>{
       let modal = document.querySelector('.modal-2');
        modal.style.display = 'block';
        let span = document.getElementById('close');
        let subjectInput = document.getElementById('input1');
        subjectInput.value = courses[i].subjectName;
        let courseInput = document.getElementById('input2');
        courseInput.value = courses[i].courseName;
        let submit = document.getElementById('submit-button');
        span.onclick = function() {
          modal.style.display = "none";
        }


       submit.addEventListener('click',()=>{
          modal.style.display = "none";
          update(subjectInput.value,courseInput.value,courses[i].subjectId);
       });
      });

      deleteBtn.addEventListener('click',function(e){
        let modal = document.querySelector('.modal');
        modal.style.display = 'block'; 
        let yesBtn = document.getElementById('yesBtn');
        let noBtn = document.getElementById('noBtn');  
        yesBtn.onclick = ()=>{
          deleteItem(courses[i].subjectId);
          modal.style.display = 'none';
        }
        noBtn.onclick = ()=>{ modal.style.display = 'none'}
      });
    }
    return courses;
};
let courses = showCourses();
addCourseBtn.onclick = async function(){
    const subject = document.getElementById('subjectName');
    const course = document.getElementById('courseName');
    const data = {
        courseName: course.value,
        subjectName: subject.value
    }
    await fetch('http://localhost:7000/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
     courses = showCourses();
};
async function update(subject,course,id){
   
    const data = {
        subjectName: subject,
        courseName: course,
    }
  
  await fetch(`http://localhost:7000/api/courses/${id}`, { 
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    }
    ,
    body: JSON.stringify(data)
  });
  let tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
  courses = showCourses();
}
async function deleteItem(itemId){
  await fetch(`http://localhost:7000/api/courses/${itemId}`, { method: 'DELETE' });
  let tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
  courses = showCourses();
}








