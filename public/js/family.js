document.addEventListener("DOMContentLoaded", function () {

    const Family = {

        /* ---------- Propriétés ---------- */
        // Boutons
        showFamilyInfoBtn: document.querySelector('#show-family-info-btn'),
        createButton: document.querySelector('#create-button'),
        deleteButton: document.querySelector('#delete-button'),

        // Infos des familles
        selectWrapper: document.querySelector('.select-wrapper'),
        familySelect: document.querySelector('#family'),
        familyInfos: document.querySelector('.family-info'),
        familyName: document.querySelector('.family-name'),

        // Création d'une famille 
        createForm: document.querySelector('.create-family'),
        familyLevelInput: document.querySelector('#family-level'),
        familyNameInput: document.querySelector('#family-name'),

        // Supprimer une famille
        familySelectDelete: document.querySelector('#family-select'),
        deleteFamilyBtn: document.querySelector('.delete-family-btn'),
        showFamilyDeleteBtn: document.querySelector('.select-wrapper-delete'),

        /* ---------- CSS & HTML ---------- */
        resetFamilyInfos: function () {
            this.selectWrapper.style.display = 'none';
            this.familyInfos.style.display = 'none';
            this.familyName.textContent = '';
            this.familySelect.selectedIndex = 0; 
        },

        resetCreateFamily: function () {
            this.createForm.style.display = 'none';
            this.familyLevelInput.value = 1;
            this.familyNameInput.value = '';
        },

        resetDeleteFamily: function () {
            this.showFamilyDeleteBtn.style.display = 'none';
            this.familySelectDelete.selectedIndex = 0;
        },

        /* ---------- Méthodes ---------- */
        init: function () {
            // Informations des familles
            this.showFamilyInfoBtn.addEventListener('click', this.showFamilyWrapper.bind(this));
            this.familySelect.addEventListener('change', this.handleSelectFamily.bind(this));

            // Création d'une famille
            this.createButton.addEventListener('click', this.showFormCreateFamily.bind(this));
            this.createForm.addEventListener('submit', this.handleCreateFamily.bind(this));

            // Suppression d'une famille
            this.deleteButton.addEventListener('click', this.showDeleteFamily.bind(this));
            this.familySelectDelete.addEventListener('change', this.handleDeleteFamily.bind(this));
        },

        showFamilyWrapper: function () {
            if (this.selectWrapper.style.display === 'flex') {
                this.resetFamilyInfos();
            } else {
                this.resetCreateFamily();
                this.resetDeleteFamily();
                this.selectWrapper.style.display = 'flex';
            }
        },

        handleSelectFamily: async function (event) {
            try {
                // Récupération de l'id de la famille 
                const familyId = parseInt(event.target.value);
                // On va chercher la liste des familles gràce à une des routes de notre API
                const families = await fetch('/families');
                // On extrait les données JSON de la réponse
                const data = await families.json();
                // Puis on utilise find() pour rechercher la famille sélectionnée
                const selectedFamily = data.find((family) => family.id === familyId);

                // On met à jour les valeurs des variables dans le fichier EJS avec ceux de la famille sélectionnée
                this.familyName.textContent = `Nom de la famille: ${selectedFamily.name}`;
                document.querySelector('.family-members').innerHTML = '';
                selectedFamily.members.forEach(member => {
                    const li = document.createElement('li');
                    li.textContent = `${member.lastname} ${member.firstname}`;
                    document.querySelector('.family-members').appendChild(li);
                });
                document.querySelector('.family-level').textContent = `Niveau de la famille: ${selectedFamily.level}`;
                // Et enfin on affiche la div qui était cachée
                this.familyInfos.style.display = 'block';
            } catch (error) {
                console.error(error);
            }
        },

        showFormCreateFamily: function () {
            if (this.createForm.style.display === 'flex') {
                this.resetCreateFamily();
            } else {
                this.resetFamilyInfos();
                this.resetDeleteFamily();
                this.createForm.style.display = 'flex';

            }
        },

        handleCreateFamily: async function (event) {
            event.preventDefault();

            // Valeurs possible (ici j'ai fait en sorte qu'un niveau de famille soit compris entre 1 et 20)
            if (parseInt(this.familyLevelInput.value) > 20) {
                this.familyLevelInput.value = 20;
            }
            if (parseInt(this.familyLevelInput.value) < 1) {
                this.familyLevelInput.value = 1;
            }

            const data = {
                name: this.familyNameInput.value,
                level: parseInt(this.familyLevelInput.value),
                members: []
            };

            try  {
                const response = await fetch('/family', {
                    method: "POST",
                    headers: {
                        'Content-Type':  'application/json'
                    },
                    body: JSON.stringify(data)
                });
        
                if (response.ok) {
                    console.log('Successfully created family');
                    // On remasque le form après la création
                    this.createForm.style.display = 'none';
                    // On actualise la page pour que la nouvelle famille soit prise en compte dans la liste des familles
                    window.location.reload();
                } else {
                    console.error('Error creating family');
                }
            } catch (error) {
                console.error(error);
            }
        },

        showDeleteFamily: function () {
            if (this.showFamilyDeleteBtn.style.display === 'flex') {
                this.resetDeleteFamily();
            } else {
                this.resetFamilyInfos();
                this.resetCreateFamily();
                this.showFamilyDeleteBtn.style.display = 'flex';
            }
        },

        handleDeleteFamily: function (event) {
            const familyId = parseInt(event.target.value);
            this.deleteFamilyBtn.addEventListener('click', () => {
                this.confirmDelete(familyId);
            });
        },

        confirmDelete: async function (familyId) {
            const confirmed = confirm("Do you confirm the deletion of the family?");
            if (confirmed) {
                try {
                    const response = await fetch(`/family/${familyId}`, { method: 'DELETE'});
                    if (response.ok) {
                        console.log('Deleted family');
                        // Rechargement de la page pour mettre à jour la liste des familles
                        window.location.reload();
                    } else {
                        console.error('Error deleting family')
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        },

    };
    Family.init();
});