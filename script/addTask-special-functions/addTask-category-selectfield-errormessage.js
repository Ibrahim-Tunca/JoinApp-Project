document.addEventListener("click", function (event){
    const categoryRef = document.getElementById("categoryID");
    const categoryValue = document.forms["addTaskForm"]["taskCategory"].value;
    const clickedInputfield = categoryRef.contains(event.target);
    if(clickedInputfield){
        categoryTouched = true;
        categoryErrorMessage();
        if(categoryValue !== ""){
            categoryErrorMessage();  
        }
        return;
    }
    if(!categoryTouched){
        return;
    }
        categoryErrorMessage();
    if (categoryValue === "") {
        removeCategoryErrorMessage();
    }
});