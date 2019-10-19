import $ from 'jquery';
class MyNotes {
    constructor() {

        this.events();
    }

    events() {
        $('.delete-note').on('click', this.deleteNote);
        $('.edit-note').on('click', this.editNote.bind(this));
        $('.update-note').on('click', this.updateNote.bind(this));
    }

    // methods

    updateNote(e) {

        var thisNote = $(e.target).parents('li');
        var thisNoteId = thisNote['0'].dataset['id'];
        var ourUpdatedPost = {
            'title': thisNote.find('.note-title-field').val(),
            'content': thisNote.find('.note-body-field').val()
        };
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', globalObject.nonce);
            },
            url: globalObject.root_url + '/wp-json/wp/v2/note/' + thisNoteId,
            method: 'POST',
            data: ourUpdatedPost,
            success: (response) => {
                alert('congrats');
                this.makeNoteReadonly(thisNote);
                console.log(response);
            },
            error: (err) => {
                alert('sorry');
                console.log(err);
            }
        });

    }

    editNote(e) {
        //
        var thisNote = $(e.target).parents('li');
        debugger;
        if (thisNote['0'].dataset['state'] == 'editable') {
            this.makeNoteReadonly(thisNote);
        } else {
            this.makeNoteEditable(thisNote);
        }

    }

    makeNoteReadonly(thisNote) {
        thisNote.find('.edit-note').html('<i class="fa fa-pencil" aria-hidden="true"></i> Edit');
        thisNote.find('.note-title-field,.note-body-field').attr('readonly', 'readonly').removeClass('note-active-field');
        thisNote.find('.update-note').removeClass('update-note--visible');
        thisNote['0'].dataset['state'] = 'cancel';
    }
    makeNoteEditable(thisNote) {
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