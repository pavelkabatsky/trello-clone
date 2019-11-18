document.addEventListener('DOMContentLoaded', () => {

    Application.load();
    
    document
        .querySelector('[data-action-addcolumn]')
        .addEventListener('click', function() {
            Column.createNew();
            Application.save();
        });
    
    document
        .querySelectorAll('.column')
        .forEach(columnElement => {
            Column.process(columnElement)
        })

    Delete.process();
})



