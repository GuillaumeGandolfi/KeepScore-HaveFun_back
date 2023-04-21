const quest = {
    divSelect : document.getElementById('select-quest'), // la div ou y a le select
    selectQuests : document.getElementById('quest-choice'), // le select
    formAdd : document.getElementById('quest-form-add'), // le formulaire d'ajout
    formModify : document.getElementById('quest-form-modify'), //le formulaire de modification
    buttonAdd : document.getElementById('add-button'), // le bouton pour faire afficher le fomulaire d'ajout
    buttonModify : document.getElementById('modify-button'), // le btn pour faire afficher le formulaire de modification

    init: function() {
        if (document.body.classList.contains('quest-page')) {

            console.log('init function quest')
            quest.buttonAdd.addEventListener('click', quest.handleAddForm);
            quest.buttonModify.addEventListener('click', quest.handleSelect);
            quest.selectQuests.addEventListener('change', quest.handleModifyForm);
        }
    },
    handleAddForm: function(event) {
        console.log('handleAddForm')
        quest.formAdd.classList.toggle("is-hidden");
        const addButton = document.getElementById('form-add-button');
        const formData = new FormData(quest.formAdd);
        quest.formAdd.addEventListener('submit', quest.addQuestInData);
        // addButton.addEventListener('submit', quest.addQuestInData )
    },

    addQuestInData: async function(event) {
        // quest.formAdd.classList.toggle("is-hidden");
        event.preventDefault();
        // Je récupère les data du formulaire
        const formData = new FormData(event.target);
        // Je crée un objet vide qui acceuillera la donnée du formulaire
        const formObject = {};
        // Je crée un objet json dans mon objet vide crée au dessus
        formData.forEach((value, key) => formObject[key] = value);
        const json = JSON.stringify(formObject);
        
        if(!confirm("Voulez-vous vraiment ajouter cette quête ?")) { return };

        try {
            const response = await fetch(`http://localhost:3000/quest`, {
            method: 'POST',
            body: json,
            headers : { "Content-Type": "application/json"}
            });
            const jsonData = await response.json();
            if(!response.ok) {throw new Error("Impossible de créer la quête !")}
            console.log('Quête ajoutée')
        } catch (error) {
            console.log(error);
            alert(error);
        }
    },

    handleSelect: function(event) {
        quest.divSelect.classList.toggle("is-hidden")
    },

    handleModifyForm: async function(event) {
        console.log(event.target.value)
        const descriptionInput = quest.formModify.querySelector('input[name="description"]')
        const difficultyInput = quest.formModify.querySelector('input[name="difficulty"]')
        const reward_expInput = quest.formModify.querySelector('input[name="reward_exp"]')
        const reward_coinInput = quest.formModify.querySelector('input[name="reward_coin"]')
        const reward_itemInput = quest.formModify.querySelector('input[name="reward_item"]')

        // console.log( descriptionInput, difficultyInput, reward_coinInput, reward_expInput)
        try {
            // on récupère l'id de la quête sélectionné
            questId = parseInt(event.target.value);

            // on récupère la donnée de la quête voulue 
            const selectedQuest = await fetch(`/quest/${questId}`);

            // on rend la donnée exploitable en json
            const quest = await selectedQuest.json();

            // ensuite on attribue a notre formulaire les valeurs de la quête sélectionné
            descriptionInput.value = quest.description;
            difficultyInput.value = quest.difficulty;
            reward_expInput.value = quest.reward_exp;
            reward_coinInput.value = quest.reward_coin;

            // Et enfin on ré-affiche le formulaire, remplis
            console.log(document.getElementById('quest-form-modify'))
            // quest.formModify.classList.toggle("is-hidden")
            
            document.getElementById('quest-form-modify').classList.toggle("is-hidden")

            // !TODO La méthode affiche bien le formulaire et les données dedans
            // !TODO mais il y a un soucis lorsqu'on veut changer de quête
            // !TODO pourquoi pas retirer le select et afficher un bouton exit
            // !TODO il faut aussi débogger user.js 


        } catch(error) {
            console.trace(error);
        }
    },
};
