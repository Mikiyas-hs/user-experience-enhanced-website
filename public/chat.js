document.getElementById("showFormButton").addEventListener("click", function() {
    document.getElementById("overlay").style.display = "flex";  
});

document.getElementById("closeFormButton").addEventListener("click", function() {
    document.getElementById("overlay").style.display = "none";  
});


// Delete button logic
document.querySelectorAll(".deleteBtn").forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.preventDefault();  

        // Haal het formulier en de knop op
        const form = button.closest('form');
        button.disabled = true;  
        button.classList.add("loading"); 
        button.innerText = "Verwijderen...";  
        
        setTimeout(function() {
            button.classList.remove("loading");
            button.classList.add("success");  
            button.innerText = "Verwijderd!";  

            setTimeout(function() {
                button.classList.remove("success");
                button.innerText = "Verwijder Bericht";
                button.disabled = false;

                form.submit();
            }, 2000); 
        }, 2000);  
    });
});
