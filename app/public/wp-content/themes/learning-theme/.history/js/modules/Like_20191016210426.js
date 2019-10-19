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
            this.deleteLike(currentLikeBox);
        } else {
            this.createLike(currentLikeBox);
        }

    }

    createLike(currentLikeBox) {
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', globalObject.nonce);
            },
            'url': globalObject.root_url + '/wp-json/university/v1/manageLike',
            'type': 'POST',
            'data': {
                'professorId': currentLikeBox[0].dataset['professor']
            },
            'success': (response) => {
                currentLikeBox.attr('data-exists', 'yes');
                var likeCount = parseInt(currentLikeBox.find(".like-count").html(), 10);
                likeCount++;
                currentLikeBox.find(".like-count").html(likeCount);
                console.log(response);
            },
            'error': (err) => {
                alert(err);
            }
        });
    }

    deleteLike() {
        $.ajax({
            'url': globalObject.root_url + '/wp-json/university/v1/manageLike',
            data: {
                'like':
            },
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