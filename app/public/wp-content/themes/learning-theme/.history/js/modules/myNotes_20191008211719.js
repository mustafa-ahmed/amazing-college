import $ from 'jquery';
class MyNotes {
    constructor() {

        this.events();
    }

    events() {
        $('.delete-note').on('click', this.deleteNote);
    }

    // methods
    deleteNote(e) {
        var thisNote = $(e.target).closest('li');
        debugger;
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', globalObject.nonce);
            },
            url: globalObject.root_url + '/wp-json/wp/v2/note/' + thisNote.data['id'],
            method: 'DELETE',
            success: (response) => {
                alert('congrats');
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