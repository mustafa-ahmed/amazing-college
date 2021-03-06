<?php


function university_post_types()
{
    register_post_type('campus', array(
        'capability_type' => 'campus', // this for plugin users permissions plugin (members) could be any name
        'map_meta_cap' => true, // this for plugin users permissions plugin (members)
        'supports' => array('title', 'editor', 'excerpt', 'page-attributes'),
        'rewrite' => array(
            'slug' => 'campuses'
        ),
        'has_archive' => true,
        'public' => true,
        'labels' => array(
            'name' => 'Campuses',
            'add_new_item' => 'Add New Campus',
            'edit_item' => 'Edit Campus',
            'all_items' => 'All Campuses',
            'singular_name' => 'Campus',
            'archives' => 'Campuses'
        ),
        'menu_icon' => 'dashicons-location-alt'
    ));

    register_post_type('event', array(
        'capability_type' => 'event', // this for plugin users permissions plugin (members) could be any name
        'map_meta_cap' => true, // this for plugin users permissions plugin (members)
        'supports' => array('title', 'editor', 'excerpt', 'page-attributes'),
        'rewrite' => array(
            'slug' => 'events'
        ),
        'has_archive' => true,
        'public' => true,
        'labels' => array(
            'name' => 'Events',
            'add_new_item' => 'Add New Event',
            'edit_item' => 'Edit Event',
            'all_items' => 'All Events',
            'singular_name' => 'Event',
            'archives' => 'Events'
        ),
        'menu_icon' => 'dashicons-calendar-alt'
    ));

    register_post_type('program', array(
        'supports' => array('title'),
        'rewrite' => array(
            'slug' => 'programs'
        ),
        'has_archive' => true,
        'public' => true,
        'labels' => array(
            'name' => 'Programs',
            'add_new_item' => 'Add New Program',
            'edit_item' => 'Edit Program',
            'all_items' => 'All Programs',
            'singular_name' => 'Program',
            'archives' => 'Programs'
        ),
        'menu_icon' => 'dashicons-awards'
    ));

    register_post_type('professor', array(
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'public' => true,
        'labels' => array(
            'name' => 'Professors',
            'add_new_item' => 'Add New Professor',
            'edit_item' => 'Edit Professor',
            'all_items' => 'All Professors',
            'singular_name' => 'Professor',
            'archives' => 'Professors'
        ),
        'menu_icon' => 'dashicons-welcome-learn-more'
    ));



    // Note Post Type
    register_post_type('note', array(
        'show_in_rest' => true,
        'supports' => array('title', 'editor'),
        'public' => false,
        'show_ui' => true,
        'labels' => array(
            'name' => 'Notes',
            'add_new_item' => 'Add New Note',
            'edit_item' => 'Edit Note',
            'all_items' => 'All Notes',
            'singular_name' => 'Note'
        ),
        'menu_icon' => 'dashicons-welcome-write-blog'
    ));
}

add_action('init', 'university_post_types');
