// Stockage des commentaires par annonce
// Stockage des commentaires par annonce
let commentaires = {};

// Fonction pour afficher le contenu de l'annonce avec les commentaires
function afficherContenu(titre, contenu, id) {
    const contenuAnnonce = document.getElementById('contenu-annonce');

    // Récupère les commentaires existants ou une chaîne vide si aucun commentaire
    const commentairesListe = commentaires[id] 
        ? commentaires[id].map(c => `<p>${c}</p>`).join('') 
        : '<p>Aucun commentaire pour cette annonce.</p>';

    // Contenu HTML de l'annonce avec la zone de commentaires
    contenuAnnonce.innerHTML = `
        <button onclick="fermerContenu()" 
            style="float: right; background-color: #dc3545; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer;">
            Fermer
        </button>
        <h4>${titre}</h4>
        <div>${contenu}</div>
        <div id="commentaires-${id}">${commentairesListe}</div>
        <textarea id="commentaire-${id}" rows="4" placeholder="Ajouter un commentaire..."></textarea>
        <button type="button" onclick="ajouterCommentaire(${id})">Soumettre</button>
    `;

    // Affiche le contenu de l'annonce et fait défiler jusqu'à celle-ci
    contenuAnnonce.style.display = 'block';
    contenuAnnonce.scrollIntoView({ behavior: 'smooth' });
}

// Fonction pour ajouter un commentaire à une annonce
function ajouterCommentaire(id) {
    const textarea = document.getElementById(`commentaire-${id}`);
    const commentaireTexte = textarea.value.trim();

    if (commentaireTexte) {
        // Initialise la liste des commentaires si nécessaire
        if (!commentaires[id]) {
            commentaires[id] = [];
        }
        // Ajoute le commentaire et réinitialise le champ de texte
        commentaires[id].push(commentaireTexte);
        textarea.value = '';

        // Met à jour l'affichage des commentaires
        document.getElementById(`commentaires-${id}`).innerHTML = 
            commentaires[id].map(c => `<p>${c}</p>`).join('');
    } else {
        alert("Veuillez entrer un commentaire.");
    }
}

// Fonction pour fermer le contenu de l'annonce
function fermerContenu() {
    const contenuAnnonce = document.getElementById('contenu-annonce');
    contenuAnnonce.style.display = 'none'; // Cache le contenu
}

function confirmerSuppression(id) {
            if (confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
                window.location.href = `/supprimer/${id}/`;
            }
        }