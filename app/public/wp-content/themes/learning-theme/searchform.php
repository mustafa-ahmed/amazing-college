<form class="search-form" action="<?php echo esc_url(site_url('/'));  ?>">
    <label class="headline headline--medium" for="s">Perform a new search</label>
    <div class="search-form-row">
        <input class="s" id="s" method="get" type="search" name="s" placeholder="what are you looking for ?">
        <button class="search-submit" type="submit">Search</button>
    </div>
</form>