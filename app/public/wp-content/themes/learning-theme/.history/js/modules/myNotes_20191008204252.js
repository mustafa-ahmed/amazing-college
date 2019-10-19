import $ from 'jquery';
class MyNotes {
    constructor() {

        this.events();
    }

    events() {
        $('.delete').on('click', this.deleteNote);
    }

    // methods
    deleteNote() {
        alert('delete');
    }
}

export default MyNotes;