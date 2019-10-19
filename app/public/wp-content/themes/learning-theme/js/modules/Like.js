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
        if (currentLikeBox[0].attributes['data-exists'].value == 'yes') {
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
                currentLikeBox.attr('data-like', response);
                console.log(response);
            },
            'error': (err) => {
                alert(err);
            }
        });
    }

    deleteLike(currentLikeBox) {
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', globalObject.nonce);
            },
            'url': globalObject.root_url + '/wp-json/university/v1/manageLike',
            data: {
                'like': currentLikeBox[0].dataset['like']
            },
            'type': 'DELETE',
            'success': (response) => {
                currentLikeBox.attr('data-exists', 'no');
                var likeCount = parseInt(currentLikeBox.find(".like-count").html(), 10);
                likeCount--;
                currentLikeBox.find(".like-count").html(likeCount);
                currentLikeBox.attr('data-like', '');
                console.log(response);
            },
            'error': (err) => {
                alert(err);
            }
        });
    }
}

export default Like;