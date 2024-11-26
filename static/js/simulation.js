document.getElementById('simuler-amortissement').addEventListener('click', function() {
    const pretId = document.getElementById('pret_id').value;
    const duree = document.getElementById('duree_remb').value;
    const montant = document.getElementById('montant_pret').value;
});

    
    fetch(`/calcul_amorti/${pretId}/`)
        .then(response => response.json())
        .then(data => {
            afficherTableauAmortissement(data);
        })
        .catch(error => console.error('Erreur:', error));



function afficherTableauAmortissement(data) {
    const tableau = document.getElementById("tableau-amortissement");
    tableau.innerHTML = "";

    data.amortissement.forEach(item => {
        const row = tableau.insertRow();
        row.insertCell(0).innerText = item.mois;
        row.insertCell(1).innerText = item.Interets;
    });
}
