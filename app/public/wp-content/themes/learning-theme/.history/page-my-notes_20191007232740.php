<?php

if (!is_user_logged_in()) {
    wp_redirect(esc_url(site_url('/')));
    exit;
}

get_header();

while (have_posts()) {
    the_post();
    pageBanner();
    ?>



    <div class="container container--narrow page-section">
        <ul class="min-list link-list" id="my-notes">
            <?php
                $userNotes = new WP_Query(array(
                    'paged' => get_query_var('paged', 1),
                    'post_type' => 'event',
                    'meta_key' => 'event_date',
                    'orderby' => 'meta_value_num',
                    'order' => 'ASC',
                    'meta_query' => array(
                        array(
                            'key' => 'event_date',
                            'compare' => '<=',
                            'value' => $today,
                            'type' => 'numeric'
                        )
                    )
                ));

                while ($userNotes->have_posts()) {
                    $userNotes->the_post(); ?>
                <li>
                    <input class="note-title-field" value="<?php echo esc_attr(get_the_title()); ?>">
                    <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
                    <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>
                    <textarea class="note-body-field"><?php echo esc_attr(get_the_content()); ?></textarea>
                </li>
            <?php }

                ?>
        </ul>
    </div>

<?php }

get_footer();

?>