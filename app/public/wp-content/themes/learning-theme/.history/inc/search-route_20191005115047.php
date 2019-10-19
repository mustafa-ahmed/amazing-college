<?php
function universityRegisterSearch()
{
    register_rest_route('university/v1', 'search', array(
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'universitySearchResults'
    ));
}

function universitySearchResults($data)
{
    $proffessors = new WP_Query(array(
        'post_type' => 'professor',
        's' => sanitize_text_field($data['term'])
    ));
    $proffessorsResults = array();

    while ($proffessors->have_posts()) {
        $proffessors->the_post();
        array_push($proffessorsResults, array(
            'title' => get_the_title(),
            'permaLink' => get_the_permalink()
        ));
    }
    return $proffessorsResults;
}

add_action('rest_api_init', 'universityRegisterSearch');
