import $ from 'jquery';

class Like {
    constructor() {
    }


    events() {
        $('.like-box').on('click', this.ourClickDispatcher.bind(this));
    }


    ourClickDispatcher() {
        if ($('.like-box').dataset['exists'] == 'yes') {
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