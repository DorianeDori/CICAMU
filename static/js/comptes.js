// Variables pour stocker les soldes
let soldeCaisse = 0;
let soldeBanque = 0;

// Désactive le bouton de définition des soldes initiaux après le premier clic
document.getElementById('setSoldes').addEventListener('click', function() {
    const soldeInitialCaisse = parseFloat(document.getElementById('soldeInitialCaisse').value);
    const soldeInitialBanque = parseFloat(document.getElementById('soldeInitialBanque').value);
    soldeCaisse = soldeInitialCaisse;
    soldeBanque = soldeInitialBanque;
    document.getElementById('soldeCaisse').textContent = soldeCaisse.toFixed(2);
    document.getElementById('soldeBanque').textContent = soldeBanque.toFixed(2);
    alert("Soldes initiaux définis !");
    
    // Désactive le bouton et les champs après définition des soldes initiaux
    document.getElementById('setSoldes').disabled = true;
    document.getElementById('soldeInitialCaisse').disabled = true;
    document.getElementById('soldeInitialBanque').disabled = true;
});

// Affichage/Masquage des champs Numéro de chèque et Numéro de virement
document.getElementById('source').addEventListener('change', function() {
    const source = this.value;
    const banqueDetails = document.getElementById('banqueDetails');
    if (source === 'banque') {
        banqueDetails.style.display = 'block';
    } else {
        banqueDetails.style.display = 'none';
    }
});

// Événement pour ajouter une transaction
document.getElementById('transactionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const libelle = document.getElementById('libelle').value;
    const source = document.getElementById('source').value;
    const montant = parseFloat(document.getElementById('montant').value);
    let numeroCheque = "-";
    let numeroVirement = "-";

    // Si la source est "Banque", récupérer les valeurs des numéros de chèque et de virement
    if (source === 'banque') {
        numeroCheque = document.getElementById('numeroCheque').value || "-";
        numeroVirement = document.getElementById('numeroVirement').value || "-";
    }

    // Ajouter la transaction au tableau
    const tbody = document.getElementById('transactionTable').querySelector('tbody');
    const newRow = tbody.insertRow();
    newRow.innerHTML = `
        <td>${date}</td>
        <td>${libelle}</td>
        <td>${montant.toFixed(2)}</td>
        <td>${source}</td>
        <td>${numeroCheque}</td>
        <td>${numeroVirement}</td>
    `;

    // Mise à jour des soldes
    if (source === 'caisse') {
        soldeCaisse -= montant;
    } else {
        soldeBanque -= montant;
    }

    // Mise à jour de l'affichage des soldes
    document.getElementById('soldeCaisse').textContent = soldeCaisse.toFixed(2);
    document.getElementById('soldeBanque').textContent = soldeBanque.toFixed(2);

    // Réinitialiser le formulaire après l'ajout
    document.getElementById('transactionForm').reset();
    document.getElementById('banqueDetails').style.display = 'none'; // Cacher les champs de banque après ajout
});
