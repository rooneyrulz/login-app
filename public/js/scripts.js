$(document).ready(() => {
   let button = $('.btn-close');
   button.on('click', (e) => {
      $(e.target).parent().fadeOut(1000);
   });
});
