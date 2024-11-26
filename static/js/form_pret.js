document.addEventListener("DOMContentLoaded", function () {
    const typeDePret = document.getElementById('type_de_pret');
    const duree = document.getElementById('duree');
    const montant = document.getElementById('montant');
    let PretEnCours = false;

    const periodes = {
        "speciale_PI": { debut: 0, fin: 5 }, 
        "speciale_13e_mois": { debut: 0, fin: 11 } 
    };

    // Mise à jour automatique de la durée en fonction du type de prêt sélectionné
    typeDePret.addEventListener('change', () => {
        const selectedType = typeDePret.value;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();

        if (selectedType === "ordinaire") { 
            duree.setAttribute('max', 12);
            duree.setAttribute('min', 0);
            duree.value = 12;
            alert("Pour le prêt ordinaire, les intérêts et une mensualité sont prélevés chaque mois sur 12 mois. Vous pouvez choisir la durée souhaitée pour le remboursement.");
        } else if (selectedType === "speciale_PI") {
            if (currentMonth < periodes.speciale_PI.debut || currentMonth > periodes.speciale_PI.fin) {
                alert("Le prêt spécial sur la PI ne peut être soumis qu’entre janvier et juin.");
                typeDePret.value = "";
                duree.value = "";
            } else {
                const remainingMonths = periodes.speciale_PI.fin - currentMonth;
                duree.setAttribute('max', remainingMonths);
                duree.setAttribute('min', 0);
                duree.value = remainingMonths;
                alert(`Pour le prêt spécial sur la PI, vous serez prélevé des intérêts chaque mois et, en juin, le montant total sera prélevé avec l'intérêt. Il vous reste ${remainingMonths} mois.`);
            }
        } else if (selectedType === "speciale_13e_mois") {
            const remainingMonths = periodes.speciale_13e_mois.fin - currentMonth;
            duree.setAttribute('max', remainingMonths);
            duree.setAttribute('min', 0);
            duree.value = remainingMonths;
            alert(`Pour le prêt spécial sur le 13ème mois, vous serez prélevé des intérêts chaque mois, et en décembre, le montant total du prêt sera prélevé avec intérêt. Il vous reste ${remainingMonths} mois.`);
        }
    });

    // Vérification du montant
    montant.addEventListener('change', () => {
        if (montant.value < 0) {
            alert("Le montant ne peut pas être inférieur à zéro.");
            montant.value = "";
        }
    });

    // Gestion du formulaire
    document.querySelector('form').addEventListener('submit', (e) => {
        if (PretEnCours) {
            e.preventDefault();
            alert("Vous avez déjà un prêt en cours, vous ne pouvez pas en faire un autre.");
        } else {
            PretEnCours = true;
        }

        const selectedType = typeDePret.value;

        if (selectedType === 'speciale_PI') {
            const currentMonth = new Date().getMonth();
            if (currentMonth < periodes.speciale_PI.debut || currentMonth > periodes.speciale_PI.fin) {
                alert('Demande impossible. Le prêt spécial sur la PI ne peut être soumis que de janvier à juin.');
                e.preventDefault(); 
            }
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.querySelector(".close");

    closeButton.addEventListener("click", () => {
        window.location.href = "demande_pret.html"; 
    });
});

