const shop = {
    current_page : 1,
    rows : 5,
    list_element : document.getElementById('list'),
    pagination_element : document.getElementById('pagination'),
    modal : document.getElementById('modal'),
    modifyForm : document.getElementById('modal-form'),
    elementId: '',
    init: function() {
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

        } catch(error) {
            console.trace(error);
        }
    },

    DisplayList: function(items, wrapper, rows_per_page, page) {
        console.log('DisplayList')
        wrapper.innerHTML = "";
        page--;

        let start = rows_per_page * page;
        let end = start + rows_per_page;
        let paginatedItems = items.slice(start, end);

        
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
            delete_button.addEventListener('click', async function(event) {
                console.log('Supprimer', item.id);
                if (confirm("Voulez vous vraiment supprimer cet élément ?")){
                    try {
                        const response = await fetch(`http://localhost:3000/collection/${item.id}`, {
                            method: 'DELETE',
                        });
                        if(!response.ok){throw new Error("Impossible de supprimer l'élément")};
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
            edit_button.addEventListener('click', shop.handleModifyForm);
            item_element.appendChild(edit_button);

            wrapper.appendChild(item_element);
        }

        
    },

    SetupPagination: function(items, wrapper, rows_per_page) {
        console.log('SetupPagination');
        wrapper.innerHTML='';

        let page_count = Math.ceil(items.length / rows_per_page);

        for (let i = 1; i < page_count + 1; i++) {
            let btn = shop.PaginationButton(i, items);
            wrapper.appendChild(btn);
        }

    },

    PaginationButton: function ( page, items) {
        console.log('PaginationButton');
        let button = document.createElement('button')
        button.innerText = page;
        if (shop.current_page == page)  button.classList.add('active'); 

        button.addEventListener('click', function() {
            shop.current_page = page;
            shop.DisplayList(items, shop.list_element, shop.rows, shop.current_page);

            let current_btn = document.querySelector('.pagenumbers button.active');
            current_btn.classList.remove('active');

            button.classList.add('active');
        })
        return button
    },
    handleModifyForm: async function(event){
        console.log("handleModifyForm")
        // on récupère les éléments du formulaire
        // const descriptionInput = shop.modifyForm.querySelector('input[name="description"]');
        // const categoryInput = shop.modifyForm.querySelector('input[name="category"]');
        // const require_levelInput = shop.modifyForm.querySelector('input[name="require_level"]');
        console.log('event',event)

        console.log('event.target.value',event.target)
        
    }
    






}