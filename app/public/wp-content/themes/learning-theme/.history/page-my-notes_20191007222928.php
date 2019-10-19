<?php
get_header();
while (have_posts()) {
    the_post();
    pageBanner(array(
        'title' => '',
        'subtitle' => ''
    ));
    ?>


    <div class="container container--narrow page-section">
asdasd

    </div>

<?php
}
get_footer();
?>