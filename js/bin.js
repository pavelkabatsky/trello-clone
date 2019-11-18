const Delete = {
    bin : document.querySelector('.bin'),
    process() {
        Delete.bin.addEventListener('dragend', Delete.dragend );  
        Delete.bin.addEventListener('dragenter', Delete.dragenter );
        Delete.bin.addEventListener('dragover', Delete.dragover );
        Delete.bin.addEventListener('dragleave', Delete.dragleave );
        Delete.bin.addEventListener('drop', Delete.drop );
    },
    dragend(event) {
        this.style.transform = '';
    },
    dragenter(event) {
        event.preventDefault();
        event.stopPropagation();
        Delete.bin.style.transform  = 'scale(1.2)';
    },
    dragover(event) {
        event.preventDefault();
        event.stopPropagation();
    },
    dragleave(event) {
        event.stopPropagation();
        Delete.bin.style.transform = '';
    },
    drop(event) {
        event.stopPropagation();
        if(Column.dragged) {
            Column.dragged.remove();
            Application.save();
        }
        else if (Note.dragged) {
            Note.dragged.remove();
            Application.save();
        }
        this.style.transform = '';
        
    }
}