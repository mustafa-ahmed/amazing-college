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

    return 'thanks';
}

function deleteLike()
{

    return 'no thanks';
}

add_action('rest_api_init', 'universityLikeRoutes');
