import $ from 'jquery';
class MyNotes {
    constructor() {

        this.events();
    }

    events() {
        $('#my-notes').on('click', '.delete-note', this.deleteNote);
        $('#my-notes').on('click', '.edit-note', this.editNote.bind(this));
        $('#my-notes').on('click', '.update-note', this.updateNote.bind(this));
        $('.submit-note').on('click', this.createNote.bind(this));
    }

    // methods

    createNote() {
        var ourNewPost = {
            'title': $('.new-note-title').val(),
            'content': $('.new-note-body').val(),
            'status': 'private'
        };
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', globalObject.nonce);
            },
            url: globalObject.root_url + '/wp-json/wp/v2/note/',
            method: 'POST',
            data: ourNewPost,
            success: (response) => {
                $('.new-note-title,.new-note-body').val('');
                $(`
                <li data-id="${response.id}">
                    <input readonly class="note-title-field" value="${response.title.raw}">
                    <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
                    <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>
                    <textarea readonly class="note-body-field">${response.content.raw}</textarea>
                    <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>
                </li>
                `).prependTo('#my-notes').hide().slideDown();
                $('.note-limit-message').removeClass('active');
                console.log(response);
            },
            error: (err) => {
                alert('sorry');
                if (err.responseText == 'You have Reached Max numbers Of notes') {
                    $('.note-limit-message').addClass('active');
                }
                console.log(err);
            }
        });
    }

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
                if (response.responseText.userNoteCount < 4) {
                    $('.note-limit-message').removeClass('active');
                }
            },
            error: (err) => {
                alert('sorry');
                console.log(err);
            }
        });
    }
}

export default MyNotes;