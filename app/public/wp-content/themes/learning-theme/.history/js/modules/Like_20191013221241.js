import $ from 'jquery';

class Like {
    constructor() {
        this.events();
    }


    events() {
        $('.like-box').on('click', this.ourClickDispatcher.bind(this));
    }


    ourClickDispatcher(e) {
        var currentLikeBox = $(e.target).closest('.like-box');
        debugger;
        if (currentLikeBox.dataset['exists'] == 'yes') {
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