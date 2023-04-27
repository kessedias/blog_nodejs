/**
 * Confirma o delete de categoria
 * @param {evento do JS} event 
 * @param {Estrutura do form} form 
 */
function confirmarDelete(event, form) {
    event.preventDefault();

    var decision = confirm('Deseja deletar a categoria ' + '"' + form.title.value + '"' + '?');

    decision ? form.submit() : false;
}

var articlebody = $('#articlebody');
if(articlebody.length != 0){

    tinymce.init({
        language: 'pt_BR',
        selector: "#articlebody",
        plugins: 'lists advlist autolink link image preview searchreplace wordcount fullscreen insertdatetime save table emoticons'
    });
}