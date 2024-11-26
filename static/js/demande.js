function filterResources(category) {
    const cards = document.querySelectorAll('.resource-card');

    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

    // Obtenir la modale
    var modal = document.getElementById("loanModal");

    // Obtenir le bouton "En savoir plus" et le texte de description
    var buttons = document.querySelectorAll(".btn");
    var loanDescription = document.getElementById("loan-description");

    // Ajouter un événement pour chaque bouton
    buttons.forEach(function(button) {
        button.onclick = function() {
            // Modifier le contenu de la modale selon le prêt
            var description = this.parentNode.getAttribute("data-description");
            loanDescription.innerText = description; // Met à jour la description
            modal.style.display = "block"; // Ouvrir la modale
        };
    });


// Ajouter un événement pour chaque bouton
buttons.forEach(function(button) {
    button.onclick = function() {
        // Modifier le contenu de la modale selon le prêt
        var description = this.parentNode.getAttribute("data-description");
        var loanName = this.parentNode.querySelector("h3").innerText; // Récupérer le nom du prêt

        document.querySelector("#loanModal h2").innerText = loanName; // Met à jour le titre
        loanDescription.innerText = description; // Met à jour la description
        modal.style.display = "block"; // Ouvrir la modale
    };
});



    // Obtenir l'élément <span> qui ferme la modale
    var span = document.getElementsByClassName("close")[0];

    // Quand l'utilisateur clique sur <span> (x), fermer la modale
    span.onclick = function() {
        modal.style.display = "none";
    };

    // Quand l'utilisateur clique n'importe où en dehors de la modale, la fermer
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    

