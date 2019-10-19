<?php

function universityLikeRoutes()
{
    register_rest_route('university/v1', 'manageLike', array(
        'methods' => 'POST',
        'callback' => 'createLike',
    ));
    register_rest_route('university/v1', 'manageLike', array(
        'methods' => 'DELETE',
        'callback' => 'deleteLike',
    ));
}

function createLike()
{

    wp_insert_post(array(
        'post_type' => 'like',
        'post_status' => 'publish',
        'post_title' => 'Our PHP create post test',
        'post_content' => 'Our World 123!..',
    ));
}

function deleteLike()
{

    return 'no thanks';
}

add_action('rest_api_init', 'universityLikeRoutes');
