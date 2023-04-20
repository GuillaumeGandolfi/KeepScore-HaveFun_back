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
        console.log(formData)

        quest.formAdd.addEventListener('submit', quest.addQuestInData)
        // addButton.addEventListener('submit', quest.addQuestInData )
    },

    addQuestInData: async function(event) {
        // quest.formAdd.classList.toggle("is-hidden");
        event.preventDefault();
        // console.log(event.target)
        const formData = new FormData(event.target);
        console.log(formData.get('description'))
        console.log(formData.get('reward_coin'))
        console.log(formData.get('reward_exp'))
        console.log(formData.get('reward_item'))
        console.log(formData.get('difficulty'))
        const formObject = {};
        formData.forEach((value, key) => formObject[key] = value);
        const json = JSON.stringify(formObject);
        // const jsonParse = json.parse()
        console.log(json)
        // console.log(jsonParse)

        try {
            const response = await fetch(`http://localhost:3000/quest`, {
                method: 'POST',
                body: {"description":"fzef", "reward_coin":500, "reward_exp":500, "difficulty":1},
                headers : { "Content-Type": "application/json"}
            });
            const jsonData = await response.json();
            console.log('jsonData',jsonData)
            if(!response.ok) {throw new Error("Impossible de créer la quête !")}
        } catch (error) {
            console.log(error);
        }



    }

};
