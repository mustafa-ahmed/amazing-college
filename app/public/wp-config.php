<?php

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
if (file_exists(dirname(__FILE__)  . '/local.php')) {
	// configure local database
	/** The name of the database for WordPress */
	define('DB_NAME', 'local');

	/** MySQL database username */
	define('DB_USER', 'root');

	/** MySQL database password */
	define('DB_PASSWORD', 'root');

	/** MySQL hostname */
	define('DB_HOST', 'localhost');
} else {
	// configure Live database
	/** The name of the database for WordPress */
	define('DB_NAME', 'mustafa4_universitydata');

	/** MySQL database username */
	define('DB_USER', 'mustafa4_xaimus');

	/** MySQL database password */
	define('DB_PASSWORD', 'Cometome1432@');

	/** MySQL hostname */
	define('DB_HOST', 'localhost');
}

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         ');0_QBj_P;#)!i,ox/(AF3YhejcxmsCyLbEn-k7rk#f+xV(gg])l0|$Eqab?qi<<');
define('SECURE_AUTH_KEY',  'QWhjkd-2&{U$! qbl~7B+v+yPp,--UYOe83?zl>x7lz!.>J-7cq;jD}>^5wEh{|P');
define('LOGGED_IN_KEY',    'bJSEq}|ZBe+*CodhL]^ZYJ[#,a52-^oIsHlE:yj2|GFD{k~<!`c|hJ9vd9g:d2si');
define('NONCE_KEY',        'hKX];?l.d[Rav5GYkYJ94ixqX#,+a0^,%q3Vb_u}^s3}Sp]-@`Q K)M$sPN69R#S');
define('AUTH_SALT',        '&Fw`?$?.6#,!5carT< 2ZT=*H^2xdxd|{J&9IOWX9fjo?]dL[biOG6MWK!@Xog@z');
define('SECURE_AUTH_SALT', '_dXP@%0bJ-xU::b:0QPC*{YmeIf#sqD#0& -TGBWrn2?vFr65yJu{+3-?~>ogN;D');
define('LOGGED_IN_SALT',   'XBM36vYqSU<:#cXS3J8a4q7YA`h~gXI]h .m!+`$@6!|>rN%r)|Bz=9w18%xyO82');
define('NONCE_SALT',       'su` oWNV[M0|/#sgk! w-G*x>8f1!|mMDOh~fuvCu|(wi$o4cJ?=hq@=h^Zsh`vk');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';




/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if (!defined('ABSPATH')) {
	define('ABSPATH', dirname(__FILE__) . '/');
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
