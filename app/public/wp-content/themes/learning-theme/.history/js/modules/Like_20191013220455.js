import $ from 'jquery';

class Like {
    constructor() {
        this.events();
    }


    events() {
        $('.like-box').on('click', this.ourClickDispatcher.bind(this));
    }


    ourClickDispatcher() {
        debugger;
        if ($('.like-box')[0].dataset['exists'] == 'yes') {
            this.deleteLike();
        } else {
            this.createLike();
        }

    }

    createLike() {
        alert('create');
    }

    deleteLike() {
        alert('delete');

    }
}

export default Like;