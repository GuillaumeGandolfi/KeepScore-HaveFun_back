const app = {
    init() {
    // Récupérer l'élément select et le div utilisateur-info
    const selectUtilisateur = document.getElementById('utilisateur');
    const utilisateurInfo = document.getElementById('utilisateur-info');

    // Ajouter un écouteur d'événements sur le select
    selectUtilisateur.addEventListener('change', () => {
    // Vérifier si une option est sélectionnée
    if (selectUtilisateur.value !== '') {
        // Ajouter la classe "show" à l'élément utilisateur-info pour l'afficher
        utilisateurInfo.classList.add('show');
    } else {
        // Sinon, retirer la classe "show" pour masquer l'élément utilisateur-info
        utilisateurInfo.classList.remove('show');
    }
    });

        }
}

document.addEventListener("DOMContentLoaded",app.init);
