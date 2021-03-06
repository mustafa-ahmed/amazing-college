<?php

function testing_files()
{
    wp_enqueue_script('main_js', get_theme_file_uri('/js/scripts-bundled.js'), null, microtime(), true);
    wp_enqueue_style('custom_font', 'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    wp_enqueue_style('font-awesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    wp_enqueue_style('testing_main_styles', get_stylesheet_uri(), null, microtime());
}


function university_features()
{
    register_nav_menu('headerMenuLocation', 'Header Menu Location');
    register_nav_menu('footerLocationOne', 'Footer Location One');
    register_nav_menu('footerLocationTwo', 'Footer Location Two');
    add_theme_support('title-tag');
}

function additional_active_item_classes($classes = array(), $menu_item = false)
{
   

    if (in_array('current-menu-item', $menu_item->classes)) {
        $classes[] = 'current-menu-item';
    }

    if ($menu_item->post_name == 'event' && is_post_type_archive('event')) {
        $classes[] = 'current-menu-item';
    }

    if ($menu_item->post_name == 'event' && is_singular('event')) {
        $classes[] = 'current-menu-item';
    }


    return $classes;
}
add_filter('nav_menu_css_class', 'additional_active_item_classes', 10, 2);

add_action('wp_enqueue_scripts', 'testing_files');
add_action('after_setup_theme', 'university_features');
