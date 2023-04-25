const shop = {
    current_page : 1,
    rows : 5,
    list_element : document.getElementById('list'),
    pagination_element : document.getElementById('pagination'),
    
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
            // console.log(item)
            let item_element = document.createElement('div');
            item_element.classList.add('item');
            item_element.innerText = item.description; // Ici on choisi de renvoyer que le nom de l'item

            // Ajouter un écouteur d'evennement pour chaque element 
            item_element.addEventListener('click', function(event) {
            let id = item.id;
            console.log(id)
            });
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
    }
    






}