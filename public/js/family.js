// Sélection des éléments du DOM
const showFamilyInfoBtn = document.querySelector('#show-family-info-btn');
const createButton = document.querySelector('#create-button');

const selectWrapper = document.querySelector('.select-wrapper');
const familySelect = document.querySelector('#family');
const familyInfos = document.querySelector('.family-info');
const familyName = document.querySelector('.family-name');

const createForm = document.querySelector('.create-family');
const familyLevelInput = document.querySelector('#family-level');
const familyNameInput = document.querySelector('#family-name');

const familySelectDelete = document.querySelector('#family-select');
const deleteFamilyBtn = document.querySelector('.delete-family-select-btn');


showFamilyInfoBtn.addEventListener('click', () => {
    if (selectWrapper.style.display === 'flex') {
        // Si selectWrapper est déjà affiché, on le cache à nouveau et on réinitialise les éléments d'affichage des infos
        selectWrapper.style.display = 'none';
        familyInfos.style.display = 'none';
        familyName.textContent = '';
        familySelect.selectedIndex = 0;
    } else {
        // Sinon on affiche selectWrapper
        selectWrapper.style.display = 'flex';
        createForm.style.display = 'none';
        familyLevelInput.value = 1;
        familyNameInput.value = '';
    }
});

// On ajoute un événement à la sélection de la famille 
familySelect.addEventListener('change', async (event) => {

    try {
        // On récupère l'id de la famille sélectionnée
        const familyId = parseInt(event.target.value);
        const families = await fetch('/families');
        const data = await families.json();
        const selectedFamily = data.find((family) => family.id === familyId);

        // On met à jour les valeurs des variables dans le fichier EJS avec ceux de la famille sélectionnée
        familyName.textContent = `Nom de la famille: ${selectedFamily.name}`;
        document.querySelector('.family-members').innerHTML='';
        selectedFamily.members.forEach(member => {
            const li = document.createElement('li');
            li.textContent = `${member.lastname} ${member.firstname}`;
            document.querySelector('.family-members').appendChild(li);
        });
        document.querySelector('.family-level').textContent = `Niveau de la famille: ${selectedFamily.level}`;
        // Et enfin on affiche la div qui était cachée
        familyInfos.style.display = 'block';
    } catch (error) {
        console.error(error);
    }
});

/* ----- CREER UNE FAMILLE ----- */

createButton.addEventListener('click', () => {
    if (createForm.style.display === 'flex') {
        createForm.style.display = 'none';
        familyLevelInput.value = 1;
        familyNameInput.value = '';
    } else {
        createForm.style.display = 'flex';
        selectWrapper.style.display = 'none';
        familyName.textContent = '';
        familySelect.selectedIndex = 0;
        familyInfos.style.display = 'none';
    }
});

// Maintenant que le formulaire s'affiche au click, il faut créer la famille

createForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (parseInt(familyLevelInput.value) > 20) {
        familyLevelInput.value = 20;
    }
    if (parseInt(familyLevelInput.value) < 1) {
        familyLevelInput.value = 1;
    }

    const data = {
        name: familyNameInput.value,
        level: parseInt(familyLevelInput.value),
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
            createForm.style.display = 'none';
            // On actualise la page pour que la nouvelle famille soit prise en compte dans la liste des familles
            window.location.reload();
        } else {
            console.error('Error creating family');
        }
    } catch (error) {
        console.error(error);
    }
});

/* ----- SUPPRIMER UNE FAMILLE ----- */

// EventListener sur le bouton "supprimer"
familySelectDelete.addEventListener('change', (event) => {
    const familyId = parseInt(event.target.value);
    console.log(event.target.value);
    console.log(familyId);
    confirmDelete(familyId);
});


// Fonction pour confirmer la suppression
const confirmDelete = async (familyId) => {
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
};