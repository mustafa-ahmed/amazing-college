<?php
get_header();
pageBanner(array(
    'title' => 'Search Results',
    'subtitle' => 'You serched for &ldquo;' . esc_html(get_search_query(false)) . '&rdquo;'
));
?>



<div class="container container--narrow page-section">

    <?php

    while (have_posts()) {
        the_post();
        get_template_part('template-parts/content', get_post_type());
        ?>


    <?php }
    echo paginate_links();
    ?>
</div>

<?php
get_footer();
?>