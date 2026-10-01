<?php
/**
 * Editorial home for the Interactive Store portfolio.
 *
 * Images come from the Home featured image, WooCommerce category thumbnails,
 * and WooCommerce product featured images. Empty slots stay intentional.
 *
 * @package Interactive_Store_Child
 */

defined( 'ABSPATH' ) || exit;

$home_id  = get_queried_object_id();
$shop_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' );
$hero_id  = get_post_thumbnail_id( $home_id );

$categories = array(
	array( 'slug' => 'computers', 'name' => 'Computers', 'number' => '01' ),
	array( 'slug' => 'electronics', 'name' => 'Electronics', 'number' => '02' ),
	array( 'slug' => 'accessories', 'name' => 'Accessories', 'number' => '03' ),
	array( 'slug' => 'home-tech', 'name' => 'Home Tech', 'number' => '04' ),
);

$showcase = array(
	array( 'sku' => 'IS-ARC14-DEMO', 'name' => 'Arc 14', 'kind' => 'Laptop concept', 'shape' => 'laptop' ),
	array( 'sku' => 'IS-PULSE-DEMO', 'name' => 'Pulse', 'kind' => 'Wireless headphones concept', 'shape' => 'headphones' ),
	array( 'sku' => 'IS-LINK-DEMO', 'name' => 'Link', 'kind' => 'USB-C dock concept', 'shape' => 'dock' ),
	array( 'sku' => 'IS-HAVEN-DEMO', 'name' => 'Haven', 'kind' => 'Smart speaker concept', 'shape' => 'speaker' ),
);

get_header();
?>

<div class="is-home">
	<section class="is-home-hero" aria-labelledby="is-home-title">
		<div class="is-home-hero__inner is-home-container">
			<div class="is-home-hero__copy">
				<p class="is-home-eyebrow">Smarter tech. Brighter days.</p>
				<h1 id="is-home-title">Technology<br>that comes to life.</h1>
				<p class="is-home-hero__lead">Premium technology for a more connected, creative and comfortable you.</p>
				<a class="is-home-button is-home-button--primary" href="<?php echo esc_url( $shop_url ); ?>">Explore the shop <span aria-hidden="true">↗</span></a>
			</div>
			<div class="is-home-hero__visual<?php echo $hero_id ? ' has-image' : ''; ?>">
				<?php if ( $hero_id ) : ?>
					<?php echo wp_get_attachment_image( $hero_id, 'full', false, array( 'class' => 'is-home-hero__image', 'fetchpriority' => 'high', 'sizes' => '(max-width: 760px) 100vw, 75vw' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php else : ?>
					<span class="is-home-placeholder is-home-placeholder--hero" aria-label="Hero image to be added"><span class="is-home-placeholder__glyph" aria-hidden="true"></span><span>Hero image</span></span>
				<?php endif; ?>
				<p class="is-home-hero__note">Devices for<br>a brighter everyday.</p>
			</div>
		</div>
	</section>

	<section class="is-home-section is-home-categories" aria-labelledby="is-home-categories-title">
		<div class="is-home-container">
			<div class="is-home-section__heading is-home-section__heading--compact">
				<div><p class="is-home-eyebrow">Find your fit</p><h2 id="is-home-categories-title">Shop by category</h2></div>
			</div>
			<div class="is-home-categories__grid">
				<?php foreach ( $categories as $category ) :
					$term = taxonomy_exists( 'product_cat' ) ? get_term_by( 'slug', $category['slug'], 'product_cat' ) : false;
				$url  = $term ? get_term_link( $term ) : $shop_url;
					$url  = is_wp_error( $url ) ? $shop_url : $url;
					$image_id = $term ? (int) get_term_meta( $term->term_id, 'thumbnail_id', true ) : 0;
				?>
					<a class="is-home-category" href="<?php echo esc_url( $url ); ?>">
						<span class="is-home-category__media is-home-category__media--<?php echo esc_attr( $category['slug'] ); ?>">
							<?php if ( $image_id ) : ?>
								<?php echo wp_get_attachment_image( $image_id, 'medium_large', false, array( 'loading' => 'lazy', 'alt' => '' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							<?php else : ?>
								<span class="is-home-placeholder is-home-placeholder--category" aria-hidden="true"><span class="is-home-placeholder__glyph"></span><span>Image <?php echo esc_html( $category['number'] ); ?></span></span>
							<?php endif; ?>
						</span>
						<span class="is-home-category__footer"><strong><?php echo esc_html( $category['name'] ); ?></strong><span aria-hidden="true">↗</span></span>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<section class="is-home-section is-home-products" aria-labelledby="is-home-products-title">
		<div class="is-home-container">
			<div class="is-home-section__heading">
				<div><p class="is-home-eyebrow">Our picks</p><h2 id="is-home-products-title">Featured products</h2></div>
				<a class="is-home-text-link" href="<?php echo esc_url( $shop_url ); ?>">View all products <span aria-hidden="true">↗</span></a>
			</div>
			<div class="is-home-products__grid">
				<?php foreach ( $showcase as $item ) :
					$product_id = function_exists( 'wc_get_product_id_by_sku' ) ? wc_get_product_id_by_sku( $item['sku'] ) : 0;
					$product = $product_id && function_exists( 'wc_get_product' ) ? wc_get_product( $product_id ) : false;
					$published = $product && 'publish' === $product->get_status() && $product->is_visible();
					$image_id = $published ? $product->get_image_id() : 0;
				?>
					<article class="is-home-product<?php echo $published ? '' : ' is-home-product--pending'; ?>">
						<?php if ( $published ) : ?><a class="is-home-product__link" href="<?php echo esc_url( get_permalink( $product_id ) ); ?>" aria-label="<?php echo esc_attr( 'View ' . $product->get_name() ); ?>"><?php endif; ?>
							<span class="is-home-product__media is-home-product__media--<?php echo esc_attr( $item['shape'] ); ?>">
								<?php if ( $image_id ) : ?>
									<?php echo wp_get_attachment_image( $image_id, 'woocommerce_thumbnail', false, array( 'loading' => 'lazy', 'sizes' => '(max-width: 600px) 46vw, 23vw' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
								<?php else : ?>
									<span class="is-home-placeholder is-home-placeholder--product" aria-hidden="true"><span class="is-home-placeholder__glyph"></span><span>Product image</span></span>
								<?php endif; ?>
							</span>
							<span class="is-home-product__body">
								<span class="is-home-product__title"><?php echo esc_html( $item['name'] ); ?></span>
								<span class="is-home-product__kind"><?php echo esc_html( $item['kind'] ); ?></span>
								<span class="is-home-product__bottom">
									<?php if ( $published ) : ?><span class="is-home-product__price"><?php echo wp_kses_post( $product->get_price_html() ); ?></span><span class="is-home-product__arrow" aria-hidden="true">↗</span>
									<?php else : ?><span class="is-home-product__soon">Coming soon</span><?php endif; ?>
								</span>
							</span>
						<?php if ( $published ) : ?></a><?php endif; ?>
					</article>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<section class="is-home-section is-home-three-d" aria-label="Explore in 3D">
		<div class="is-home-container">
			<iframe class="is-home-three-d__frame" src="https://docs.cecomsa.com/laptop-3d/index.html" title="Explore in 3D — Laptop" loading="lazy" allow="fullscreen; xr-spatial-tracking" allowfullscreen></iframe>
			<script>
			(function () {
				var frame = document.currentScript.previousElementSibling;
				window.addEventListener('message', function (event) {
					if (event.origin !== 'https://docs.cecomsa.com' || event.source !== frame.contentWindow || !event.data || event.data.type !== 'laptop-viewer-height') return;
					var height = Number(event.data.height);
					if (Number.isFinite(height) && height >= 300 && height <= 1600) frame.style.height = Math.ceil(height) + 'px';
				});
			})();
			</script>
		</div>
	</section>
</div>

<?php get_footer(); ?>
