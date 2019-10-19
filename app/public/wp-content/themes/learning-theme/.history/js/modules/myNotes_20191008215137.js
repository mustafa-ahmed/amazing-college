import $ from 'jquery';
class MyNotes {
    constructor() {

        this.events();
    }

    events() {
        $('.delete-note').on('click', this.deleteNote);
        $('.edit-note').on('click', this.editNote.bind(this));
    }

    // methods
    editNote(e) {
        //
        var thisNote = $(e.target).parents('li');
        debugger;
        if (thisNote['0'].dataset['state'] == 'editable') {
            this.makeNoteReadonly();
        } else {
            this.makeNoteEditable();
        }

    }

    makeNoteReadonly(thisNote) {
        thisNote.find('.edit-note').html('<i class="fa fa-pencil" aria-hidden="true"></i> Edit');
        thisNote.find('.note-title-field,.note-body-field').attr('readonly', 'readonly').removeClass('note-active-field');
        thisNote.find('.update-note').removeClass('update-note--visible');
        thisNote['0'].dataset['state'] = 'cancel';
    }
    makeNoteEditable() {
        thisNote.find('.edit-note').html('<i class="fa fa-times" aria-hidden="true"></i> Cancel');
        thisNote.find('.note-title-field,.note-body-field').removeAttr('readonly').addClass('note-active-field');
        thisNote.find('.update-note').addClass('update-note--visible');
        thisNote['0'].dataset['state'] = 'editable';
    }

    deleteNote(e) {
        var thisNote = $(e.target).parents('li');
        var thisNoteId = thisNote['0'].dataset['id'];
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', globalObject.nonce);
            },
            url: globalObject.root_url + '/wp-json/wp/v2/note/' + thisNoteId,
            method: 'DELETE',
            success: (response) => {
                alert('congrats');
                thisNote.slideUp();
                console.log(response);
            },
            error: (err) => {
                alert('sorry');
                console.log(err);
            }
        });
    }
}

export default MyNotes;