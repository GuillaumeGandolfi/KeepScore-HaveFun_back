document.addEventListener("DOMContentLoaded", function () {

    const Family = {

        /* ---------- Propriétés ---------- */
        // Boutons
        showFamilyInfoBtn: document.querySelector('#show-family-info-btn'),

        // Liste des familles
        familyInfos: document.querySelector('.family-info'),
        familyName: document.querySelector('.family-name'),


        // Information des familles
        familyBlock: document.querySelector('.family-block'),
        familyBlockName: document.querySelector('.family-block-name'),
        familyBloCkMembers: document.querySelector('.family-members'),
        familyBlockLevel: document.querySelector('.family-level'),

        // Paramètres de pagination
        limit: 5, // Nombre d'éléments par page
        currentPage: 1, // Page actuelle
        offset: 0, // Offset de la requête

        /* ---------- Méthodes ---------- */
        init: function () {
            // Liste des familles
            this.showFamilyInfoBtn.addEventListener('click', () => {
                // Afficher la pagination pour la première page
                this.displayFamiliesPage(1);
                // Et enfin on affiche la div qui était cachée
                this.familyInfos.style.display = 'flex';
            });

            // Infos des familles
            this.familyName.addEventListener('click', this.showFamilyInfos.bind(this));
        },

        getFamiliesPage: async function() {
            try {
                // Récupératon de toutes les familles
                const families = await fetch('/families');
                const allData = await families.json();

                return allData;
            } catch (error) {
                console.error(error);
            }
        },

        displayFamiliesPage: async function(page) {
            try  {
                const allData = await this.getFamiliesPage();
                const totalPages = Math.ceil(allData.length / this.limit);

                // Filtrage des familles pour n'en récupérer que celles de la page demandée
                const families = allData.slice((page-1)*this.limit, page*this.limit);

                // Mettre à jour l'affichage des familles
                this.familyName.textContent = '';
                families.forEach(family => {
                    const li = document.createElement('li');
                    li.textContent = family.name;
                    li.value = family.id;
                    this.familyName.appendChild(li);
                    });

                const pagination = document.querySelector('.pagination');
                pagination.textContent = '';
                for (let i = 1; i <= totalPages; i++) {
                    const button = document.createElement('button');
                    button.textContent = i;
                    if (i === page) {
                        button.disabled = true;
                    } else {
                        button.addEventListener('click', () => this.displayFamiliesPage(i));
                    }
                    pagination.appendChild(button);
                }
            } catch (error) {
                console.error(error);
            }
        },

        showFamilyInfos: async function(event) {
            try {

                if (event.target.matches('.family-name > li')) {
                    const familyId = parseInt(event.target.value);

                    const families = await fetch('/families');
        
                    const data = await families.json();
        
                    const selectedFamily = data.find((family) => family.id === familyId);
        
                    this.familyBlockName.textContent = `Nom: ${selectedFamily.name}`;
        
                    this.familyBloCkMembers.textContent = '';
                    selectedFamily.members.forEach(member => {
                        const li = document.createElement('li');
                        li.textContent = `${member.lastname} ${member.firstname} ${member.level}`;
                        this.familyBloCkMembers.appendChild(li);
                    });
    
                    this.familyBlockLevel.textContent = `Niveau: ${selectedFamily.level}`;
    
                    // Et on affiche la div
                    this.familyBlock.style.display = 'flex';
                }

            } catch (error) {
                console.error(error);
            }
        }

    };
    Family.init();
});