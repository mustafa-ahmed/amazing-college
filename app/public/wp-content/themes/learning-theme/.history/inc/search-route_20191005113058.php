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
    $proffessors = WP_Query(array(
        'post_type' => 'professor'
    ));
    $proffessorsResults = array();

    while ($proffessors->have_posts()) {
        $proffessors->the_post();
        array_push($proffessorsResults, array(
            'title' => the_title(),
            'permaLink' => the_permalink()
        ));
    }
    return $proffessorsResults;
}

add_action('rest_api_init', 'universityRegisterSearch');
