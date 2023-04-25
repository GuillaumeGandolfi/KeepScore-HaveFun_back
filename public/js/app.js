const app = {
  init: function () {
    user.init();
    quest.init();
    // family.init();
  },
}

document.addEventListener('DOMContentLoaded', app.init);