const user = {
    select : document.getElementById('choix'),
    form : document.getElementById('user-form'),
    init: function() {
        user.select.addEventListener('change', user.handleFormUser);
        console.log('init function')
    },
    handleFormUser: async function(event) {
        console.log('HandleFormUser')
        const form = document.getElementById('user-form');
        // on récupère les éléments du formulaire
        const lastNameInput = form.querySelector('input[name="lastname"]');
        const firstNameInput = form.querySelector('input[name="firstname"]');
        const levelInput = form.querySelector('input[name="level"]');
        const walletInput = form.querySelector('input[name="wallet"]');
        const familyInput = form.querySelector('input[name="family"]');
        // console.log(lastNameInput);
        // lastNameInput.setAttribute('value', '');
        // console.log(lastNameInput);

        try {
            // on récupère l'id de l'utilisateur sélectionné
            userId = parseInt(event.target.value);

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
                familyInput.setAttribute('value', '');
                // puis j'insère la donnée
                familyInput.value = selectedFamily.name;
            }

            // on récupère les éléments du formulaire
            const lastNameInput = form.querySelector('input[name="lastname"]');
            const firstNameInput = form.querySelector('input[name="firstname"]');
            const levelInput = form.querySelector('input[name="level"]');
            const walletInput = form.querySelector('input[name="wallet"]');

             // on pré-remplit chaque champ avec les informations de l'utilisateur sélectionné
            firstNameInput.value = selectedUser.lastname;
            lastNameInput.value = selectedUser.firstname;
            levelInput.value = selectedUser.level;
            walletInput.value = selectedUser.wallet;
            
            user.form.style.display = "block"
            console.log(lastNameInput);



        } catch (error) {
            console.trace(error);
        }
        
    }

}