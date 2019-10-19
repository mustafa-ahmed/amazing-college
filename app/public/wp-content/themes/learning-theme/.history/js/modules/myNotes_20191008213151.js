import $ from 'jquery';
class MyNotes {
    constructor() {

        this.events();
    }

    events() {
        $('.delete-note').on('click', this.deleteNote);
        $('.edit-note').on('click', this.editNote);
    }

    // methods
    editNote(e) {
        var thisNote = $(e.target).parents('li');
        thisNote.find('.note-title-field,.note-body-field')
            .removeAttr('readonly')
            .addClass('note-active-field');

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