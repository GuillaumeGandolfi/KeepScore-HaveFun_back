const quest = {
    selectQuests : document.getElementById('quest-choice'),
    formAdd : document.getElementById('quest-form-add'),
    formModify : document.getElementById('quest-form-modify'),
    buttonAdd : document.getElementById('add-button'),
    buttonModify : document.getElementById('modify-button'),

    init: function() {
        quest.buttonAdd.addEventListener('click', quest.handleAddForm);
        quest.buttonModify.addEventListener('click', quest.HandleSelectQuests);
        quest.selectQuests.addEventListener('change', quest.handleModifyForm);
        console.log('init function quest')
    },
    handleAddForm: function(event) {
        console.log('handleAddForm')
        quest.formAdd.classList.toggle("is-hidden");
        const addButton = document.getElementById('form-add-button');
        const formData = new FormData(quest.formAdd);
        quest.formAdd.addEventListener('submit', quest.addQuestInData)
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



    }

};
