const Note = {
    idCount: 8,
    dragged: null,

    create(id = null, content = '') {
        const newNote = document.createElement('div');
        newNote.classList.add('note');
        newNote.setAttribute('draggable', true);
        newNote.textContent = content;

        if(id) {
            newNote.setAttribute('data-note-id', id);
        } else {
            newNote.setAttribute('data-note-id', Note.idCount);
            Note.idCount++;
        }
        
        Note.process(newNote);
        return newNote;

    },
    process(noteElement) {

        noteElement.addEventListener('dblclick', event => {
            noteElement.setAttribute('contenteditable', true);
            noteElement.removeAttribute('draggable');
            noteElement.closest('.column').removeAttribute('draggable');
            noteElement.focus();
        });

        noteElement.addEventListener('blur', event => {
            noteElement.removeAttribute('contenteditable');
            noteElement.setAttribute('draggable', true);
            noteElement.closest('.column').setAttribute('draggable', true);
            if (!noteElement.textContent.trim().length) {
                noteElement.remove();
            }
            Application.save();
        });

        noteElement.addEventListener('dragstart', Note.dragstart)
        noteElement.addEventListener('dragend',  Note.dragend)
        noteElement.addEventListener('dragenter', Note. dragenter)
        noteElement.addEventListener('dragover', Note.dragover)
        noteElement.addEventListener('dragleave', Note.dragleave)
        noteElement.addEventListener('drop', Note.drop)
    },

    dragstart(event) {
        event.stopPropagation();
        Note.dragged = this;
        this.classList.add('dragged')
    },

    dragend(event) {
        event.stopPropagation();
        Note.dragged = null;
        this.classList.remove('dragged');

        document
            .querySelectorAll('.note')
            .forEach( i => i.classList.remove('under'));

        Application.save();
    },

    dragenter (event) {
        event.stopPropagation();
        if(!Note.dragged || this === Note.dragged) {
            return;
        }
        this.classList.add('under')
                
    },

    dragover(event) {
        event.stopPropagation();
        event.preventDefault();
        
        if(!Note.dragged || this === Note.dragged) {
            return;
        }
        
    },

    dragleave(event) {
        event.stopPropagation();
        if(!Note.dragged || this === Note.dragged) {
            return;
        }
        this.classList.remove('under')
    },

    drop(event) {
    
        event.stopPropagation();
        
        if(!Note.dragged || this === Note.dragged) {
            return;
        }
        
        if( this.parentElement === Note.dragged.parentElement) {
            
            const note = Array.from(this.parentElement.querySelectorAll('.note'));
            const indexA = note.indexOf(this);
            const indexB = note.indexOf(Note.dragged);

            if(indexA < indexB) {
                this.parentElement.insertBefore(Note.dragged, this)
            } else {
                this.parentElement.insertBefore(Note.dragged, this.nextElementSibling)
            }
        } else {
            this.parentElement.insertBefore(Note.dragged, this)
        }
        
    }
}
