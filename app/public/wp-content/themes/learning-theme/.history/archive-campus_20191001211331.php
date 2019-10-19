<?php
get_header();
pageBanner(array(
    'title' => 'Our Campuses',
    'subtitle' => 'We have several locations for campuses :)'
));
?>

<div class="container container--narrow page-section">
    <div class="acf-map">
        <?php

        while (have_posts()) {
            the_post();
            $mapLocation = get_field('map_location');
            ?>

            <div class="marker" data-lng="<?php echo $mapLocation['lng']; ?>" data-lat="<?php echo $mapLocation['lat']; ?>">
                <h3><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h3>
                <p>
                    <?php
                        if ($mapLocation['address']) {
                            echo  $mapLocation['address'];
                        } else {
                            echo 'not supported';
                        }
                        ?>
                </p>
            </div>


        <?php }
        echo paginate_links();
        ?>
    </div>
</div>

<?php
get_footer();
?>