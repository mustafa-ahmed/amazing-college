import $ from 'jquery';
class Search {

    // vars
    constructor() {
        this.document = $(document);
        this.body = $('body');
        this.openButton = $('.js-search-trigger');
        this.closeButton = $('.search-overlay__close');
        this.searchOverlay = $('.search-overlay');
        this.isOverlayOpen = false;
        this.events();
    }

    // events
    events() {
        this.openButton.on('click', this.openOverlay.bind(this));
        this.closeButton.on('click', this.closeOverlay.bind(this));
        this.document.on('keyup', this.keyPressDispatcher.bind(this));
    }

    // methods
    openOverlay() {
        this.searchOverlay.addClass('search-overlay--active');
        this.body.addClass('body-no-scroll');
        this.openOverlay = true;
    }
    closeOverlay() {
        this.searchOverlay.removeClass('search-overlay--active');
        this.body.removeClass('body-no-scroll');
        this.openOverlay = false;
    }

    keyPressDispatcher(e) {
        if (e.keyCode == 83 && !this.openOverlay) {
            this.openOverlay();
        }
        if (e.keyCode == 27 && this.openOverlay) {
            this.closeOverlay();
        }
    }

}

export default Search