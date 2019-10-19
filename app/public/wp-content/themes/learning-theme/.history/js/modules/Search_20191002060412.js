import $ from 'jquery';
class Search {

    // vars
    constructor() {
        this.document = $(this.document);
        this.body = $('body');
        this.openButton = $('.js-search-trigger');
        this.closeButton = $('.search-overlay__close');
        this.searchOverlay = $('.search-overlay');
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
    }
    closeOverlay() {
        this.searchOverlay.removeClass('search-overlay--active');
        this.body.removeClass('body-no-scroll');
    }

    keyPressDispatcher() { }

}

export default Search