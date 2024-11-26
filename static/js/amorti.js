//Récupération des éléments HTML
const formulaire = document.getElementById("formulaire");
const tableau = document.getElementById("tableau");
const bouton = document.getElementById("simuler-amortissement");

//Récupération des champs du formulaire
const donneesFormulaire = {
    typeDePret: document.getElementById("type_de_pret"),
    duree: document.getElementById("duree"),
    motif: document.getElementById("motif_du_pret"),
    montant: document.getElementById("montant")
};

//Calcul (formule d'amortissement avec taux d'intérêt fixe)
const calculerMensualite = (montant, duree, tauxAnnuel) => {
    const tauxMensuel = tauxAnnuel / 12 / 100;
    return (montant * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -duree));
};

//Fonction pour générer le tableau d'amortissement
const genererTableauAmortissement = (montant, duree, tauxAnnuel) => {
    const corpsTableau = tableau.querySelector("tbody");
    corpsTableau.innerHTML = "";  

    let montantDu = montant;
    const tauxMensuel = tauxAnnuel / 12 / 100;
    const mensualite = calculerMensualite(montant, duree, tauxAnnuel);
    let totalInterets = 0;
    const dateDebut = new Date();

    for (let numero = 1; numero <= duree; numero++) {
        const interet = montantDu * tauxMensuel;
        const remboursementNominal = mensualite - interet;
        montantDu -= remboursementNominal;
        totalInterets += interet;

        const date = new Date(dateDebut);
        date.setMonth(dateDebut.getMonth() + numero - 1);

        //Création de la nouvelle ligne du tableau
        const ligne = `
            <tr>
                <td>${numero}</td>
                <td>${date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}</td>
                <td>${Math.round(montantDu)}</td>
                <td>${Math.round(remboursementNominal)}</td>
                <td>${Math.round(interet)}</td>
                <td>${Math.round(mensualite)}</td>
            </tr>   
        `;
        corpsTableau.innerHTML += ligne;
    }

    //Mise à jour des informations du tableau
    document.querySelector("#tableau .info-table").innerHTML = `
        <tr><td>MONTANT DU PRÊT</td><td>${montant.toLocaleString('fr-FR')}</td></tr>
        <tr><td>TAUX D'INTÉRÊT ANNUEL</td><td>${tauxAnnuel} %</td><td>MENSUALITÉ</td><td>${mensualite.toLocaleString('fr-FR')}</td></tr>
        <tr><td>DURÉE DE REMBOURSEMENT (mois)</td><td>${duree}</td><td>TOTAL DES INTÉRÊTS</td><td>${Math.round(totalInterets)}</td></tr>
        <tr><td>DATE DU 1er REMBOURSEMENT</td><td>${dateDebut.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}</td></tr>
        <tr><td>NOM DU PRÊTEUR</td><td>${firstName} ${lastName}</td></tr>
    `;
};

//Le clic Simuler
const gererClic = () => {
    const montant = parseFloat(donneesFormulaire.montant.value);
    const duree = parseInt(donneesFormulaire.duree.value);
    const typeDePret = donneesFormulaire.typeDePret.value;

    let tauxAnnuel;
    if (typeDePret === "ordinaire") {
        tauxAnnuel = 5;  
    } else if (typeDePret === "speciale_PI") {
        tauxAnnuel = 5;  
    } else if (typeDePret === "speciale_13e_mois") {
        tauxAnnuel = 5;  
    }

    //Vérification des champs 
    if (isNaN(montant) || isNaN(duree) || !tauxAnnuel) {
        alert("Veuillez remplir tous les champs du formulaire.");
        return;
    }

    //Masquer le formulaire et afficher le tableau d'amortissement
    formulaire.style.display = "none";
    tableau.style.display = "block";

    //
    genererTableauAmortissement(montant, duree, tauxAnnuel);
};

bouton.addEventListener("click", gererClic);
