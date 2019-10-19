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
        if (currentLikeBox[0].dataset['exists'] == 'yes') {
            this.deleteLike();
        } else {
            this.createLike();
        }

    }

    createLike() {
        $.ajax({
            'url': globalObject.root_url + '/wp-json/university/v1/manageLike',
            'type': 'POST',
            'success': (response) => {
                alert(response);
            },
            'error': (err) => {
                alert(err);
            }
        });
    }

    deleteLike() {
        $.ajax({
            'url': globalObject.root_url + '/wp-json/university/v1/manageLike',
            'type': 'DELETE',
            'success': (response) => {
                alert(response);
            },
            'error': (err) => {
                alert(err);
            }
        });
    }
}

export default Like;