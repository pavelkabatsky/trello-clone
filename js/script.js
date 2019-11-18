document.addEventListener('DOMContentLoaded', () => {

    Application.load();
    
    document
        .querySelector('[data-action-addcolumn]')
        .addEventListener('click', function() {
            Column.createNew();
            Application.save();
        });
    
    Delete.process();
})



