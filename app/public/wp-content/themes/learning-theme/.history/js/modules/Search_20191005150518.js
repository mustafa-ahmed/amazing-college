import $ from 'jquery';
class Search {

    // vars
    constructor() {
        this.addSearchHtml();
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
            if (this.searchField.val()) {
                if (!this.isSpinnerVisible) {
                    this.resultsDiv.html('<div class="spinner-loader"></div>');
                    this.isSpinnerVisible = true;
                }
                this.typingTimer = setTimeout(this.getResults.bind(this), 500);
            } else {
                this.resultsDiv.html('');
                this.isSpinnerVisible = false;
            }

        }
        this.previousValue = this.searchField.val();
    }

    getResults() {
        $.getJSON(globalObject.root_url + '/wp-json/university/v1/search?term=' + this.searchField.val(), () => {
            this.resultsDiv.html(`
                <div class="row">
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">General Information</h2>
                        ${(results.generalInfo.length) ? `<ul class="link-list mi-list">
                        ${results.generalInfo.map(item => {
                return `
                                <li>
                                    <a href='${item.permaLink}'>${item.title}</a>
                                    ${(item.type == 'post') ? `by ${item.authorName}` : ''}
                                </li>
                        `;
            }).join('')}
                           
                        </ul>` : `<p>No general Information for this search</p>`}
                    </div>
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Programs</h2>
                        <h2 class="search-overlay__section-title">Professors</h2>
                    </div>
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Campuses</h2>
                        <h2 class="search-overlay__section-title">Events</h2>
                    </div>
                
                </div>
            `);
        });


    }

    openOverlay() {
        this.searchOverlay.addClass('search-overlay--active');
        setTimeout(() => {
            this.searchField.focus();
        }, 301);
        this.body.addClass('body-no-scroll');
        this.isOverlayOpen = true;
    }
    closeOverlay() {
        this.searchOverlay.removeClass('search-overlay--active');
        this.body.removeClass('body-no-scroll');
        this.isOverlayOpen = false;
        this.searchField.val('');
    }

    keyPressDispatcher(e) {
        if (e.keyCode == 83 && !this.isOverlayOpen && !$('input,textarea').is(':focus')) {
            this.openOverlay();
        }
        if (e.keyCode == 27 && this.isOverlayOpen) {
            this.closeOverlay();
        }
    }

    addSearchHtml() {
        $('body').append(`

            <div class="search-overlay">
                <div class="search-overlay__top">
                    <div class="container">
                        <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
                        <input type="text" class="search-term" placeholder="what you are looking for?" id="search-term">
                        <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
                    </div>
                </div>

                <div class="container">
                    <div id="search-overlay__results">
                    </div>
                </div>
            </div>`
        );
    }

}

export default Search