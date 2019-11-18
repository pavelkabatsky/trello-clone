const Column = {
    idCount : 4,
    dragged: null,
    
    process(columnElement) {
        const newNoteBtn = columnElement.querySelector('[data-action-addNote]');
        const headerElement = columnElement.querySelector('.column-header');

        newNoteBtn.addEventListener('click', function () {
            const newNote = Note.create();
            
            columnElement.querySelector('[data-notes]').append(newNote);
            newNote.setAttribute('contenteditable', true);
            newNote.focus();
            
        });

        headerElement.addEventListener('dblclick', function() {
            headerElement.setAttribute('contenteditable', true)
            headerElement.focus();
        });
        headerElement.addEventListener('blur', function() {
            headerElement.removeAttribute('contenteditable')
            Application.save();
        });


        columnElement.addEventListener('dragstart', Column.dragstart)
        columnElement.addEventListener('dragend',Column.dragend)
        columnElement.addEventListener('dragover', Column.dragover);
        columnElement.addEventListener('drop', Column.drop);

    },

    dragstart(event) {
       
        Column.dragged = this;
        Column.dragged.classList.add('dragged');
    },
    dragend(event) {
        
        Column.dragged.classList.remove('dragged');
        Column.dragged = null;

        document
            .querySelectorAll('.column')
            .forEach(column => column.classList.remove('under'));

        Application.save();
    },
    dragover(event) {
        
        event.preventDefault();
        event.stopPropagation();

        if(!Column.dragged || Column.dragged === this) {
            return
        }
        
        document
            .querySelectorAll('.column')
            .forEach(column => column.classList.remove('under'));

        this.classList.add('under');
    },

    drop(event) {
        
        if(Note.dragged) {
            return this.querySelector('[data-notes]').append(Note.dragged)
        }
        
        else if(Column.dragged) {
            
            const columns = Array.from(document.querySelectorAll('.column'));
            const indexA = columns.indexOf(this);
            const indexB = columns.indexOf(Column.dragged);
            
            if(indexA < indexB) {
                this.parentElement.insertBefore(Column.dragged, this);
            } else {
                this.parentElement.insertBefore(Column.dragged, this.nextElementSibling);
            }
        } 
    },
    
    createNew (id = null, title= 'Заголовок') {
        const newCol = document.createElement('div');
        newCol.classList.add('column');
        newCol.setAttribute('draggable', true);

        if(id) {
            newCol.setAttribute('data-column-id', id);
        } else {
            newCol.setAttribute('data-column-id', Column.idCount);
            Column.idCount++;
        }
        
        newCol.insertAdjacentHTML('afterbegin',
            `<p class="column-header" contenteditable="true">${title}</p>
            <div data-notes></div>
            <p class="column-footer">
                <span data-action-addNote class="action">+ Добавить карточку</span>
            </p>`
        );


        document.querySelector('.columns').append(newCol);
        Column.process(newCol);
        

        return newCol;
    },    
}