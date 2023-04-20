// Je veux d'abord récupérer les élements HTML dont j'ai besoin
const familyName = document.querySelector('.family-name');

// Je sélectionne la balise select de family 
const familySelect = document.querySelector('#family');

// On sélectionne la div family-info (caché par défaut)
const familyInfos = document.querySelector('.family-info');

// On ajoute un événement à la sélection de la famille 
familySelect.addEventListener('change', async (event) => {

    try {
        // On récupère l'id de la famille sélectionnée
        const familyId = parseInt(event.target.value);
        const families = await fetch('/families');
        const data = await families.json();
        console.log(data);
        const selectedFamily = data.find((family) => family.id === familyId);
        console.log(selectedFamily);

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