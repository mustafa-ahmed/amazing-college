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

add_filter('nav_menu_css_class', 'nav_parent_class', 10, 2);

function nav_parent_class($classes, $item)
{
    $cpt_name = 'service';
    $parent_slug = 'services';

    if ($cpt_name == get_post_type() && !is_admin()) {
        global $wpdb;

        // remove any active classes from nav (blog is usually gets the currept_page_parent class on cpt single pages/posts)
        $classes = array_filter($classes, ($class == 'current_page_item' || $class == 'current_page_parent' || $class == 'current_page_ancestor'  || $class == 'current-menu-item' ? false : true));

        // get page info
        // - we really just want the post_name so it cane be compared to the post type slug
        $page = get_page_by_title($item->title, OBJECT, 'page');

        // check if slug matches post_name
        if ($page->post_name == $parent_slug) {
            $classes[] = 'current_page_parent';
        }
    }

    return $classes;
}

add_action('wp_enqueue_scripts', 'testing_files');
add_action('after_setup_theme', 'university_features');
