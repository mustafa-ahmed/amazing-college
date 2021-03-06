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
        $.getJSON(globalObject.root_url + '/wp-json/university/v1/search?term=' + this.searchField.val(), (results) => {
            this.resultsDiv.html(`
                <div class="row">
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">General Information</h2>
                        ${(results.generalInfo.length) ? `<ul class="link-list min-list">
                        ${results.generalInfo.map(item => {
                return `
                                <li>
                                    <a href='${item.permaLink}'>${item.title}</a>
                                    ${(item.postType == 'post') ? `by ${item.authorName}` : ''}
                                </li>
                        `;
            }).join('')}
                           
                        </ul>` : `<p>No general Information for this search</p>`}
                    </div>
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Programs</h2>
                        
                        ${(results.programs.length) ? `<ul class="link-list min-list">
                        ${results.programs.map(item => {
                return `
                                <li>
                                    <a href='${item.permaLink}'>${item.title}</a>
                                </li>
                        `;
            }).join('')}
                           
                        </ul>` : `<p>No programs for this search</p><a href="${globalObject.root_url}/programs"> View All Programs</a>`}
                        <h2 class="search-overlay__section-title">Professors</h2>

                        
                        ${(results.professors.length) ? `<ul class="professor-cards">
                        ${results.professors.map(item => {
                return `
                               
                            <li class="professor-card__list-item">
                                <a class="professor-card" href="${item.permaLink}">
                                    <img class="professor-card__image" src="${item.image}" alt="">
                                    <span class="professor-card__name"> ${item.title}</span>
                                </a>
                            </li>
                        `;
            }).join('')}
                           
                        </ul>` : `<p>No Professors for this search</p>`}
                    </div>
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Campuses</h2>
                        ${(results.campuses.length) ? `<ul class="link-list min-list">
                        ${results.campuses.map(item => {
                return `
                                <li>
                                    <a href='${item.permaLink}'>${item.title}</a>
                                </li>
                        `;
            }).join('')}
                           
                        </ul>` : `<p>No Campuses for this search</p><a href="${globalObject.root_url}/campuses"> View All Campuses</a>`}
                        <h2 class="search-overlay__section-title">Events</h2>
                          
                        ${(results.events.length) ? `<ul class="professor-cards">
                        ${results.events.map(item => {
                return `
                        <div class="event-summary">
                            <a class="event-summary__date t-center" href="${item.permaLink}">
                                <span class="event-summary__month">
                                   ${item.month}
                                </span>
                                <span class="event-summary__day">
                                ${item.day}
                                </span>
                            </a>
                            <div class="event-summary__content">
                                <h5 class="event-summary__title headline headline--tiny"><a href="${item.permaLink}">${item.title}</a></h5>
                        <p>${item.description}<a href="${item.permaLink}" class="nu gray">Learn more</a></p>
                            </div>
                        </div>
                        `;
            }).join('')}
                           
                        </ul>` : `<p>No Events for this search</p><a href="${globalObject.root_url}/events"> View All events</a>`}
                    </div>
                
                </div>
            `);
            this.isSpinnerVisible = false;
        });


    }

    openOverlay() {
        this.searchOverlay.addClass('search-overlay--active');
        setTimeout(() => {
            this.searchField.focus();
        }, 301);
        this.body.addClass('body-no-scroll');
        this.isOverlayOpen = true;
        return false;
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