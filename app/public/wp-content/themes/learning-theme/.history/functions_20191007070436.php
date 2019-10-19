<?php

require get_theme_file_path('/inc/search-route.php');

function pageBanner($args = NULL)
{
    if (!$args['title']) {
        $args['title'] = get_the_title();
    }
    if (!$args['subtitle']) {
        $args['subtitle'] = get_field('page_banner_subtitle');
    }
    if (!$args['photo']) {
        if (get_field('page_banner_background_image')) {
            $args['photo'] = get_field('page_banner_background_image')['sizes']['pageBanner'];
        } else {
            $args['photo'] = get_theme_file_uri('/images/ocean.jpg');
        }
    }
    ?>
    <div class="page-banner">
        <div class="page-banner__bg-image" style="background-image: url( <?php echo $args['photo']; ?> );"></div>
        <div class="page-banner__content container container--narrow">
            <h1 class="page-banner__title"><?php echo $args['title']; ?></h1>
            <div class="page-banner__intro">
                <p><?php echo $args['subtitle']; ?></p>
            </div>
        </div>
    </div>
<?php }

function testing_files()
{
    wp_enqueue_script('googleMap', '//maps.googleapis.com/maps/api/js', null, microtime(), true);
    wp_enqueue_script('main_js', get_theme_file_uri('/js/scripts-bundled.js'), null, microtime(), true);
    wp_enqueue_style('custom_font', 'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    wp_enqueue_style('font-awesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    wp_enqueue_style('testing_main_styles', get_stylesheet_uri(), null, microtime());
    wp_localize_script('main_js', 'globalObject', array(
        'root_url' => get_site_url()
    ));
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
        $query->set('orderby', 'title');
        $query->set('order', 'ASC');
        $query->set('posts_per_page', -1);
    }
    if (!is_admin() and is_post_type_archive('campus') and $query->is_main_query()) {
        $query->set('posts_per_page', -1);
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

function university_custom_rest()
{
    register_rest_field('post', 'authorName', array(
        'get_callback' => function () {
            return get_the_author();
        }
    ));
}

// redirect subscriber account out of admin page
function redirectSubsToFrontend()
{
    $ourCurrenUser = wp_get_current_user();
    if (count($ourCurrenUser->roles) == 1 and $ourCurrenUser->roles[0] == 'subscriber') {
        wp_redirect(site_url('/'));
        exit;
    }
}

// remove admin bar for subsribers
function noSubsAdminBar()
{
    $ourCurrenUser = wp_get_current_user();
    if (count($ourCurrenUser->roles) == 1 and $ourCurrenUser->roles[0] == 'subscriber') {
        show_admin_bar(false);
    }
}

// customize login screen logo redirection
function ourHeaderUrl()
{
    return esc_url(site_url('/'));
}

function ourLoginCss()
{
    wp_enqueue_style('testing_main_styles', get_stylesheet_uri(), null, microtime());
    wp_enqueue_style('custom_font', 'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    wp_enqueue_style('font-awesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
}


// function my_acf_google_map_api($api)
// {

//     $api['key'] = 'xxx';

//     return $api;
// }

// add_filter('acf/fields/google_map/api', 'my_acf_google_map_api');
add_filter('login_headertitle', 'sdfds');
add_action('login_enqueue_scripts', 'ourLoginCss');
add_filter('login_headerurl', 'ourHeaderUrl');
add_action('wp_loaded', 'noSubsAdminBar');
add_action('admin_init', 'redirectSubsToFrontend');
add_action('pre_get_posts', 'university_adjust_query');
add_action('wp_enqueue_scripts', 'testing_files');
add_action('after_setup_theme', 'university_features');
add_action('rest_api_init', 'university_custom_rest');
