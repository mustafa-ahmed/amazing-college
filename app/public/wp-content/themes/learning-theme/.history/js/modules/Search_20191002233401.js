import $ from 'jquery';
class Search {

    // vars
    constructor() {
        this.document = $(document);
        this.resultsDiv = $('#search-overlay__results');
        this.body = $('body');
        this.openButton = $('.js-search-trigger');
        this.closeButton = $('.search-overlay__close');
        this.searchOverlay = $('.search-overlay');
        this.searchField = $('#search-term');
        this.isOverlayOpen = false;
        this.typingTimer;
        this.isSpinnerVisible = false;
        this.previousValue;
        this.events();
    }

    // events
    events() {
        this.openButton.on('click', this.openOverlay.bind(this));
        this.closeButton.on('click', this.closeOverlay.bind(this));
        this.document.on('keydown', this.keyPressDispatcher.bind(this));
        this.searchField.on('keyup', this.typingLogic.bind(this));
    }

    // methods
    typingLogic() {
        if (this.searchField.val() != this.previousValue) {
            clearTimeout(this.typingTimer);
            if (!this.isSpinnerVisible) {
                this.resultsDiv.html('<div class="spinner-loader"></div>');
                this.isSpinnerVisible = true;
            }
            this.typingTimer = setTimeout(this.getResults.bind(this), 2000);
        }
        this.previousValue = this.searchField.val();
    }

    getResults() {
        this.resultsDiv.html('image real');
        this.isSpinnerVisible = false;
    }

    openOverlay() {
        this.searchOverlay.addClass('search-overlay--active');
        this.body.addClass('body-no-scroll');
        this.isOverlayOpen = true;
    }
    closeOverlay() {
        this.searchOverlay.removeClass('search-overlay--active');
        this.body.removeClass('body-no-scroll');
        this.isOverlayOpen = false;
    }

    keyPressDispatcher(e) {
        if (e.keyCode == 83 && !this.isOverlayOpen) {
            this.openOverlay();
        }
        if (e.keyCode == 27 && this.isOverlayOpen) {
            this.closeOverlay();
        }
    }

}

export default Search