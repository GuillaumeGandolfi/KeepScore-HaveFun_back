const user = {
    select : document.getElementById('choix'),
    form : document.getElementById('user-form'),
    init: function() {
        user.select.addEventListener('click', user.handleFormUser);
        console.log('coucou')
    },
    handleFormUser: function(event) {
        
        user.form.style.display = "block"
        
    }

}