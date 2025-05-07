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



// skeleton precieved perfomance
document.addEventListener('DOMContentLoaded', () => {
    // 1) Full-page skeleton tonen/verbergen
    const skeleton = document.getElementById('page-skeleton');
    const content  = document.getElementById('page-content');
  
    function showContent() {
      skeleton.classList.add('hidden');
      content.classList.remove('hidden');
    }
  
    // 2) Wachten tot de data word getoond daarna skeleton verbergen 
    fetch('https://fdnd-agency.directus.app/items/dropandheal_messages?&limit=-1')
      .then(response => response.json())
      .then(data => {
        showContent();
      })
      .catch(err => {
        console.error('Error loading data:', err);
        // Bij een fout de skeleton verwijderen zodat gebruiker niet vastloopt
        showContent();
      });
  });
  