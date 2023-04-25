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
