const shop = {
    current_page: 1,
    rows: 10,
    list_element: document.getElementById('list'),
    pagination_element: document.getElementById('pagination'),
    modal: document.getElementById('modal'),
    modifyForm: document.getElementById('modal-form'),
    submitButton: document.getElementById('submit-button'),
    cancelButton: document.getElementById('cancel-button'),
    elementId: '',
    init: function () {
        if (document.body.classList.contains('shop-page')) {
            console.log('Init shop !')
            shop.getCollectionFromData();
        }
    },
    getCollectionFromData: async function () {
        try {
            console.log('getCollectionFromData')
            // Je récupère toute la donnée 
            collections = await fetch('/collections');
            // Je la rend exploitable
            const data = await collections.json();
            // console.log(data);
            // Ensuite j'affiche la donnée grace a displayList 
            shop.DisplayList(data, shop.list_element, shop.rows, shop.current_page);
            shop.SetupPagination(data, shop.pagination_element, shop.rows)

        } catch (error) {
            console.trace(error);
        }
    },

    DisplayList: function (items, wrapper, rows_per_page, page) {
        console.log('DisplayList')
        wrapper.innerHTML = "";
        page--;

        let start = rows_per_page * page;
        let end = start + rows_per_page;
        let paginatedItems = items.slice(start, end);

        // Création de la ligne de titre
        let title_row = document.createElement('div');
        title_row.classList.add('title-row');
        let title_cell1 = document.createElement('div');
        title_cell1.classList.add('title-cell');
        title_cell1.innerText = "Description";
        let title_cell2 = document.createElement('div');
        title_cell2.classList.add('title-cell');
        title_cell2.innerText = "Catégorie";
        let title_cell3 = document.createElement('div');
        title_cell3.classList.add('title-cell');
        title_cell3.innerText = "Niveau requis";
        let title_cell4 = document.createElement('div');
        title_cell4.classList.add('title-cell');
        title_cell4.innerText = "";
        let title_cell5 = document.createElement('div');
        title_cell5.classList.add('title-cell');
        title_cell5.innerText = "";
        title_row.appendChild(title_cell1);
        title_row.appendChild(title_cell2);
        title_row.appendChild(title_cell3);
        title_row.appendChild(title_cell4);
        title_row.appendChild(title_cell5);
        wrapper.appendChild(title_row);

        for (let i = 0; i < paginatedItems.length; i++) {
            let item = paginatedItems[i];
            let item_element = document.createElement('div');
            item_element.classList.add('item');

            // Ajoute la description
            let description = document.createElement('div');
            description.classList.add('description');
            description.innerText = item.description;
            item_element.appendChild(description);

            // Ajoute la catégorie
            let category = document.createElement('div');
            category.classList.add('category');
            category.innerText = item.category;
            item_element.appendChild(category);

            // Ajoute le niveau requis
            let level = document.createElement('div');
            level.classList.add('level');
            level.innerText = `Niveau requis : ${item.level}`;
            item_element.appendChild(level);

            // Ajoute le bouton Supprimer
            let delete_button = document.createElement('button');
            delete_button.classList.add('delete-button');
            delete_button.innerText = 'Supprimer';
            delete_button.addEventListener('click', async function (event) {
                console.log('Supprimer', item.id);
                if (confirm("Voulez vous vraiment supprimer cet élément ?")) {
                    try {
                        const response = await fetch(`http://localhost:3000/collection/${item.id}`, {
                            method: 'DELETE',
                        });
                        if (!response.ok) {
                            throw new Error("Impossible de supprimer l'élément")
                        };
                        alert("Element supprimé !")
                        window.location.reload();

                    } catch (error) {

                    }
                };
            });
            item_element.appendChild(delete_button);

            // Ajoute le bouton Modifier
            let edit_button = document.createElement('button');
            edit_button.classList.add('edit-button');
            edit_button.innerText = 'Modifier';
            edit_button.value = item.id;
            edit_button.addEventListener('click', shop.displayModal);
            item_element.appendChild(edit_button);

            wrapper.appendChild(item_element);
        }


    },

    SetupPagination: function (items, wrapper, rows_per_page) {
        console.log('SetupPagination');
        wrapper.innerHTML = '';

        let page_count = Math.ceil(items.length / rows_per_page);

        for (let i = 1; i < page_count + 1; i++) {
            let btn = shop.PaginationButton(i, items);
            wrapper.appendChild(btn);
        }

    },

    PaginationButton: function (page, items) {
        console.log('PaginationButton');
        let button = document.createElement('button')
        button.innerText = page;
        if (shop.current_page == page) button.classList.add('active');

        button.addEventListener('click', function () {
            shop.current_page = page;
            shop.DisplayList(items, shop.list_element, shop.rows, shop.current_page);

            let current_btn = document.querySelector('.pagenumbers button.active');
            current_btn.classList.remove('active');

            button.classList.add('active');
        })
        return button
    },
    displayModal: async function (event) {
        console.log("displayModal")

        // on récupère les éléments du formulaire
        const descriptionInput = shop.modifyForm.querySelector('input[name="description"]');
        const categoryInput = shop.modifyForm.querySelector('input[name="category"]');
        const require_levelInput = shop.modifyForm.querySelector('input[name="require_level"]');


        try {
            item = await fetch(`/collection/${event.target.value}`)
            const data = await item.json();
            descriptionInput.value = data.description;
            categoryInput.value = data.category;
            require_levelInput.value = data.require_level;


            shop.elementId = event.target.value
            shop.modal.classList.toggle('is-hidden');
            shop.modifyForm.addEventListener('submit', shop.changeItemInData);
            shop.cancelButton.addEventListener('click', shop.hideModal);

        } catch (error) {
            console.trace(error);
        }

    },
    hideModal: function () {
        shop.modal.classList.toggle('is-hidden');
    },
    changeItemInData: async function (event) {
        console.log('changeItemInData');

        event.preventDefault();
        // Je récupère les data du formulaire
        const formData = new FormData(event.target);
        // Je crée un objet vide qui acceuillera la donnée du formulaire
        const formObject = {};
        // Je crée un objet json dans mon objet vide crée au dessus
        formData.forEach((value, key) => formObject[key] = value);
        const json = JSON.stringify(formObject);


        if (confirm("Voulez vous vraiment modifier cet élément ?")) {
            try {
                const response = await fetch(`http://localhost:3000/collection/${shop.elementId}`, {
                    method: 'PUT',
                    body: json,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error("Impossible de modifier cet élément !")
                } else {
                    alert("Elément modifié !")
                }
                window.location.reload();
            } catch (error) {
                console.trace(error);
            }
        }

    },







}