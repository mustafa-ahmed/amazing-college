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
    $mainQuery = new WP_Query(array(
        'post_type' => array('page', 'post', 'professor', 'event', 'campus', 'program'),
        's' => sanitize_text_field($data['term'])
    ));

    $results = array(
        'generalInfo' => array(),
        'professors' => array(),
        'events' => array(),
        'campuses' => array(),
        'programs' => array()
    );

    while ($mainQuery->have_posts()) {
        $mainQuery->the_post();
        if (get_post_type() == 'page' or get_post_type() == 'post') {
            array_push($results['generalInfo'], array(
                'title' => get_the_title(),
                'permaLink' => get_the_permalink()
            ));
        }
        if (get_post_type() == 'event') {
            array_push($results['events'], array(
                'title' => get_the_title(),
                'permaLink' => get_the_permalink()
            ));
        }
        if (get_post_type() == 'professor') {
            array_push($results['professors'], array(
                'title' => get_the_title(),
                'permaLink' => get_the_permalink()
            ));
        }
        if (get_post_type() == 'program') {
            array_push($results['programs'], array(
                'title' => get_the_title(),
                'permaLink' => get_the_permalink()
            ));
        }
        if (get_post_type() == 'campus') {
            array_push($results['campuses'], array(
                'title' => get_the_title(),
                'permaLink' => get_the_permalink()
            ));
        }
    }
    return $results;
}

add_action('rest_api_init', 'universityRegisterSearch');
