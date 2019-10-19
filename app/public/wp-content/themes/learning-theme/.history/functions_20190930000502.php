<?php

function pageBanner($args)
{ ?>
    <div class="page-banner">
        <div class="page-banner__bg-image" style="background-image: url( <?php $pageBannerImage = get_field('page_banner_background_image');
                                                                                echo $pageBannerImage['sizes']['pageBanner']; ?> );"></div>
        <div class="page-banner__content container container--narrow">
            <h1 class="page-banner__title"><?php the_title() ?></h1>
            <div class="page-banner__intro">
                <p><?php the_field('page_banner_subtitle') ?></p>
            </div>
        </div>
    </div>
<?php }

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
    add_theme_support('post-thumbnails');
    add_image_size('professorLandscape', 400, 260, true);
    add_image_size('professorPortrait', 480, 650, true);
    add_image_size('pageBanner', 1500, 300, true);
}

function university_adjust_query($query)
{
    if (!is_admin() and is_post_type_archive('program') and $query->is_main_query()) {

        // $query->set('meta_key', 'event_date');
        $query->set('orderby', 'title');
        $query->set('order', 'ASC');
        $query->set('posts_per_page', -1);
        // $query->set('meta_query', array(
        //     array(
        //         'key' => 'event_date',
        //         'compare' => '>=',
        //         'value' => $today,
        //         'type' => 'numeric'
        //     )
        // ));
    }
    if (!is_admin() and is_post_type_archive('event') and $query->is_main_query()) {
        $today = date('Ymd');

        $query->set('meta_key', 'event_date');
        $query->set('orderby', 'meta_value_num');
        $query->set('order', 'ASC');
        $query->set('meta_query', array(
            array(
                'key' => 'event_date',
                'compare' => '>=',
                'value' => $today,
                'type' => 'numeric'
            )
        ));
    }
}

add_action('pre_get_posts', 'university_adjust_query');
add_action('wp_enqueue_scripts', 'testing_files');
add_action('after_setup_theme', 'university_features');
