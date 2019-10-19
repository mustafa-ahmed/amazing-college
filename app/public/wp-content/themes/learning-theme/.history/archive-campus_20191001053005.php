<?php
get_header();
pageBanner(array(
    'title' => 'Our Campuses',
    'subtitle' => 'We have several locations for campuses :)'
));
?>

<div class="container container--narrow page-section">
    <ul class="link-list min-list">
        <?php

        while (have_posts()) {
            the_post(); ?>

            <div class="marker" data-lng="x" data-lat="x"></div>


        <?php }
        echo paginate_links();
        ?>
    </ul>
</div>

<?php
get_footer();
?>