<?php
function universityRegisterSearch()
{
    register_rest_route('university/v1', 'search', array(
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'universitySearchResults'
    ));
}

function universitySearchResults()
{
    return 'custom route';
}

add_action('rest_api_init', 'universityRegisterSearch');
