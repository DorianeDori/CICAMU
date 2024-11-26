// Initialiser l'éditeur Quill
var quill = new Quill('#contenu', {
    theme: 'snow', // Thème léger de Quill
    placeholder: 'Écrivez votre annonce ici...',
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],  // Options de formatage du texte
            ['blockquote', 'code-block'],              // Bloc de citation et de code
            [{ 'header': 1 }, { 'header': 2 }],        // Titres H1 et H2
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],  // Listes ordonnées et non ordonnées
            [{ 'align': [] }],                         // Alignement du texte
            ['link', 'image']                          // Lien et image
        ]
    }
});

// Soumettre le formulaire avec le contenu de l'éditeur
function submitForm() {
    // Copier le contenu HTML de l'éditeur dans le champ caché
    document.getElementById('contenu_html').value = quill.root.innerHTML;
}