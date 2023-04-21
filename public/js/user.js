const user = {

    // Le select et sa div 
    divSelect : document.getElementById('select-user'), // la div ou y a le select
    select : document.getElementById('user-choice'),

    // les formulaires , de modification et d'ajout
    formModify : document.getElementById('user-form-modify'),
    formAdd : document.getElementById('user-form-add'),

    // bouton du fomulaire de modification
    modifyButton: document.querySelector('.form-button-modify'),
    cancelButton: document.querySelector('.form-button-cancel'),

    // bouton du formulaire d'ajout
    addButton: document.querySelector('.form-button-add'),

    // bouton du début
    buttonAdd : document.getElementById('add-button'), // le bouton pour faire afficher le fomulaire d'ajout
    buttonModify : document.getElementById('modify-button'), // le btn pour faire afficher le formulaire de modification

    userId: '',
    
    init: function() {
        if (document.body.classList.contains('user-page')) {
            console.log('init function user')
            user.buttonAdd.addEventListener('click', user.handleAddForm),
            user.buttonModify.addEventListener('click', user.handleSelect)
            user.select.addEventListener('change', user.handleModifyFormUser);
        }
    },
    handleSelect: function(event) {
        // Avant d 'afficher le formulaire, je vérifie que celui d'ajout
        // est bien caché
        if(!user.formAdd.classList.contains('is-hidden')){
            user.formAdd.classList.toggle('is-hidden')
        }
        user.divSelect.classList.toggle("is-hidden");
    },
    handleModifyFormUser: async function(event) {
        
        console.log('HandleFormUser')

        // on récupère les éléments du formulaire
        const lastNameInput = user.formModify.querySelector('input[name="lastname"]');
        const firstNameInput = user.formModify.querySelector('input[name="firstname"]');
        const levelInput = user.formModify.querySelector('input[name="level"]');
        const walletInput = user.formModify.querySelector('input[name="wallet"]');
        const familyInput = user.formModify.querySelector('input[name="family"]');
        const familyIdInput = user.formModify.querySelector('input[name="family_id"]')
      

        try {
            // on récupère l'id de l'utilisateur sélectionné
            userId = parseInt(event.target.value);
            user.userId = userId

            // on récupère la réponse de la route /users
            users = await fetch('/users');

            // ensuite on extrait tout les users de cette réponse
            const data = await users.json();

            // puis on extrait l'user selectionné
            selectedUser = data.find((user) => user.id === userId);



            // On récupère l'id de la famille de l'user , si il est dans une
            if(selectedUser.family_id) {
                // je récupère la réponse de la route /families
                families = await fetch ('/families');
                // j'extrait toutes les familles de cette réponse
                const familiesData = await families.json();
                // puis j'extrait la famille commune a l'user
                selectedFamily = familiesData.find((family) => family.id === selectedUser.family_id)
                // familyInput.setAttribute('value', '');
                // puis j'insère la donnée
                familyInput.value = selectedFamily.name;
                familyIdInput.value = selectedFamily.id;
            } else {
                familyInput.value = '';
            }

             // on pré-remplit chaque champ avec les informations de l'utilisateur sélectionné
            firstNameInput.value = selectedUser.lastname;
            lastNameInput.value = selectedUser.firstname;
            levelInput.value = selectedUser.level;
            walletInput.value = selectedUser.wallet;

            
            
            // Et enfin on ré-affiche le formulaire, remplis.
            user.formModify.classList.toggle("is-hidden")

            // console.log(user.modifyButton)
            
            user.cancelButton.addEventListener('click', user.hideForm )
            user.formModify.addEventListener('submit', user.changeUserInData)
            // user.modifyButton.addEventListener('click', user.changeUserInData);

        } catch (error) {
            console.trace(error);
        }
        
    },
    hideForm: function(event) {
        console.log('Annulez')
        event.preventDefault(); 
        user.formModify.classList.toggle('is-hidden'); 
        user.divSelect.classList.toggle('is-hidden');
    },
    changeUserInData: async function(event) {
        console.log('changeUserInData')

        event.preventDefault();
        // Je récupère les data du formulaire
        const formData = new FormData(event.target);
        // Je crée un objet vide qui acceuillera la donnée du formulaire
        const formObject = {};
        // Je crée un objet json dans mon objet vide crée au dessus
        formData.forEach((value, key) => formObject[key] = value);

        delete formObject.family;
        const json = JSON.stringify(formObject);
        console.log('json', json);

        // if(!confirm("Voulez-vous vraiment modifier cet utilisateur ?")) { return };
        if (confirm("Voulez vous vraiment modifier cet utilisateur ?")) {
            try {
                const response = await fetch(`http://localhost:3000/user/${user.userId}`, {
                    method: 'PUT',
                    body:json,
                    headers : { "Content-Type": "application/json"}
                });
                const jsonData = await response.json();
                console.log('jsonData', jsonData);
                if(!response.ok) {throw new Error("Impossible de modifier l'utlisateur !")}
                console.log('Utilisateur modifié')
                alert("Utilisateur modifié !")
                window.location.reload();
                user.formModify.style.display ='none'
                user.divSelect.classList.toggle("is-hidden");
            } catch (error) {
                console.trace(error);
            }
        } 
        
    },
    handleAddForm: function(event) {
        console.log('handleAddForm');

        // Avant d'afficher le formulaire d'ajout. Je vérifie que les elements
        // de modification sont bien caché
        if(!user.divSelect.classList.contains('is-hidden')){
            user.divSelect.classList.toggle('is-hidden')
        }
        if(!user.formModify.classList.contains('is-hidden')){
            user.formModify.classList.toggle('is-hidden');
        }

        // Vérifier que le bouton modifier est bien en is hidden
        user.formAdd.classList.toggle('is-hidden');
        user.formAdd.addEventListener('submit', user.addUserInData);
    },
    addUserInData: async function(event) {
        console.log('addUserInData')
        event.preventDefault();
        // Je récupère les data du formulaire
        const formData = new FormData(event.target);
        // Je crée un objet vide qui acceuillera la donnée du formulaire
        const formObject = {};
        // Je crée un objet json dans mon objet vide crée au dessus
        formData.forEach((value, key) => formObject[key] = value);
        delete formObject.family;
        const json = JSON.stringify(formObject);

        console.log(json)
        
        if(!confirm("Voulez-vous vraiment ajouter cet utlisateur ?")) { return };

        try {
            const response = await fetch(`http://localhost:3000/user`, {
            method: 'POST',
            body: json,
            headers : { "Content-Type": "application/json"}
            });
            // const jsonData = await response.json();
            if(!response.ok) {throw new Error("Impossible de créer l'utilisateur !")}
            console.log('Utilisateur ajouté')
            alert("Utilisateur ajouté !")
            user.formAdd.classList.toggle('is-hidden')
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

}