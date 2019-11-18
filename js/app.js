const Application = {
    save() {
        const object = {
            columns : {
                idCounter : Column.idCount,
                items : []
            },
            notes : {
                idCounter : Note.idCount,
                items: []   
            }
        }

        document
            .querySelectorAll('.column')
            .forEach(columnElement => {
                const columnItem = {
                    title: columnElement.querySelector('.column-header').textContent,
                    id : columnElement.getAttribute('data-column-id'),
                    notesIds : []
                }
                
                columnElement
                    .querySelectorAll('.note')
                    .forEach(noteItem => {
                        columnItem.notesIds.push(parseInt(noteItem.getAttribute('data-note-id')))
                    })

                object.columns.items.push(columnItem);
            })

        document
            .querySelectorAll('.note')
            .forEach(noteElement => {
                const noteItem = {
                    id : parseInt(noteElement.getAttribute('data-note-id')),
                    content : noteElement.textContent
                }

                object.notes.items.push(noteItem);
            })

        
        
        let json = JSON.stringify(object);
        
        localStorage.setItem('trello', json)

    },

    load() {
        if(!localStorage.getItem('trello')) {
            return
        }
        const mountPoint = document.querySelector('.columns');
        mountPoint.innerHTML = '';

        const object = JSON.parse(localStorage.getItem('trello'));
        
        
        const getNoteById = id => object.notes.items.find(note => note.id === id);
        
        for(const column of object.columns.items) {
            const columnElement = Column.createNew(column.idCounter, column.title);
            mountPoint.append(columnElement);

            for(const noteId of column.notesIds) {
                const note = getNoteById(noteId)
                
                const noteElement = Note.create(note.id , note.content);
                columnElement.querySelector('[data-notes]').append(noteElement);
            }

        }
    }
}