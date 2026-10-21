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
	array( 'slug' => 'fashion', 'name' => 'Fashion', 'number' => '05' ),
);

$showcase = array(
	array( 'sku' => 'IS-ARC14-DEMO', 'name' => 'Arc 14', 'kind' => 'Laptop concept', 'shape' => 'laptop' ),
	array( 'sku' => 'IS-PULSE-DEMO', 'name' => 'Pulse', 'kind' => 'Wireless headphones concept', 'shape' => 'headphones' ),
	array( 'sku' => 'IS-LINK-DEMO', 'name' => 'Link', 'kind' => 'USB-C dock concept', 'shape' => 'dock' ),
	array( 'sku' => 'IS-HAVEN-DEMO', 'name' => 'Haven', 'kind' => 'Smart speaker concept', 'shape' => 'speaker' ),
);

$new_showcase = array(
	array( 'sku' => 'IS-VISTA-DEMO', 'name' => 'Vista', 'kind' => 'Desktop monitor concept', 'shape' => 'monitor' ),
	array( 'sku' => 'IS-FRAME-DEMO', 'name' => 'Frame', 'kind' => 'Digital camera concept', 'shape' => 'camera' ),
	array( 'sku' => 'IS-FORM-DEMO', 'name' => 'Form', 'kind' => 'Wireless keyboard concept', 'shape' => 'keyboard' ),
	array( 'sku' => 'IS-GLOW-DEMO', 'name' => 'Glow', 'kind' => 'Desk lamp concept', 'shape' => 'lamp' ),
);
$fashion_skus = array( 'IS-DRIFT-DEMO', 'IS-STUDIO-DEMO', 'IS-NIGHTFALL-DEMO', 'IS-SOFTLINE-DEMO' );
$carousel_copy = array(
	'IS-ARC14-DEMO' => 'A refined graphite laptop concept for focused work and everyday creativity.',
	'IS-PULSE-DEMO' => 'Minimalist over-ear headphones for an immersive everyday listening concept.',
	'IS-LINK-DEMO' => 'A compact desktop dock concept for a tidy, connected workspace.',
	'IS-HAVEN-DEMO' => 'A woven smart speaker concept designed to sit comfortably at home.',
	'IS-VISTA-DEMO' => 'A slim monitor concept with an expansive screen for creative work.',
	'IS-FRAME-DEMO' => 'A compact camera concept made for moments worth keeping.',
	'IS-FORM-DEMO' => 'A graphite keyboard concept for a focused, uncluttered desk.',
	'IS-GLOW-DEMO' => 'A slender lamp concept with a warm glow for late projects.',
	'IS-DRIFT-DEMO' => 'A relaxed forest green hoodie concept for easy everyday layering.',
	'IS-STUDIO-DEMO' => 'A sand-colored overshirt concept with a relaxed cut and considered pockets.',
	'IS-NIGHTFALL-DEMO' => 'A charcoal bomber concept with understated details.',
	'IS-SOFTLINE-DEMO' => 'A soft mauve T-shirt concept with a timeless shape.',
);
$carousel_names = array(
	'IS-ARC14-DEMO' => 'Arc 14', 'IS-PULSE-DEMO' => 'Pulse', 'IS-LINK-DEMO' => 'Link',
	'IS-HAVEN-DEMO' => 'Haven', 'IS-VISTA-DEMO' => 'Vista', 'IS-FRAME-DEMO' => 'Frame',
	'IS-FORM-DEMO' => 'Form', 'IS-GLOW-DEMO' => 'Glow', 'IS-DRIFT-DEMO' => 'Drift Hoodie',
	'IS-STUDIO-DEMO' => 'Studio Overshirt', 'IS-NIGHTFALL-DEMO' => 'Nightfall Bomber',
	'IS-SOFTLINE-DEMO' => 'Softline Tee',
);
$carousel_products = array();
foreach ( array_keys( $carousel_copy ) as $carousel_sku ) {
	$carousel_id = function_exists( 'wc_get_product_id_by_sku' ) ? wc_get_product_id_by_sku( $carousel_sku ) : 0;
	$carousel_product = $carousel_id && function_exists( 'wc_get_product' ) ? wc_get_product( $carousel_id ) : false;
	if ( $carousel_product && 'publish' === $carousel_product->get_status() && $carousel_product->is_visible() ) {
		$carousel_products[] = array( 'product' => $carousel_product, 'copy' => $carousel_copy[ $carousel_sku ] );
	}
}
$fashion_items = array();
foreach ( $fashion_skus as $fashion_sku ) {
	$fashion_product_id = function_exists( 'wc_get_product_id_by_sku' ) ? wc_get_product_id_by_sku( $fashion_sku ) : 0;
	$fashion_product = $fashion_product_id && function_exists( 'wc_get_product' ) ? wc_get_product( $fashion_product_id ) : false;
	if ( $fashion_product && 'publish' === $fashion_product->get_status() && $fashion_product->is_visible() ) {
		$fashion_items[] = $fashion_product;
	}
}
$fashion_term = taxonomy_exists( 'product_cat' ) ? get_term_by( 'slug', 'fashion', 'product_cat' ) : false;
$fashion_url = $fashion_term ? get_term_link( $fashion_term ) : $shop_url;
$fashion_url = is_wp_error( $fashion_url ) ? $shop_url : $fashion_url;
$computers_term = taxonomy_exists( 'product_cat' ) ? get_term_by( 'slug', 'computers', 'product_cat' ) : false;
$computers_image_id = $computers_term ? (int) get_term_meta( $computers_term->term_id, 'thumbnail_id', true ) : 0;
$computers_url = $computers_term ? get_term_link( $computers_term ) : $shop_url;
$computers_url = is_wp_error( $computers_url ) ? $shop_url : $computers_url;
$accessories_term = taxonomy_exists( 'product_cat' ) ? get_term_by( 'slug', 'accessories', 'product_cat' ) : false;
$accessories_url = $accessories_term ? get_term_link( $accessories_term ) : $shop_url;
$accessories_url = is_wp_error( $accessories_url ) ? $shop_url : $accessories_url;
$home_tech_term = taxonomy_exists( 'product_cat' ) ? get_term_by( 'slug', 'home-tech', 'product_cat' ) : false;
$home_tech_url = $home_tech_term ? get_term_link( $home_tech_term ) : $shop_url;
$home_tech_url = is_wp_error( $home_tech_url ) ? $shop_url : $home_tech_url;

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
	<div class="is-home-promise is-home-container" aria-label="Explore the store">
		<div><span>01</span><strong>Discover your fit</strong><p>Browse technology and fashion across five categories.</p></div>
		<div><span>02</span><strong>Find your favorites</strong><p>Build a shortlist while exploring the collection.</p></div>
		<div><span>03</span><strong>Try the journey</strong><p>See a real WooCommerce catalog and demo orders.</p></div>
	</div>

	<?php if ( $carousel_products ) : $first_slide = $carousel_products[0]['product']; ?>
	<section id="moments" class="home-carousel is-home-section" aria-labelledby="moments-title">
		<div class="is-home-container">
			<div class="home-carousel__heading"><p class="is-home-eyebrow">The concept collection</p><h2 id="moments-title">Take a closer look.</h2><p>Explore the collection. Hover to turn a card, or tap it on your phone.</p></div>
			<div class="home-carousel__experience" id="home-carousel" aria-roledescription="carousel" aria-label="Interactive product carousel">
				<button class="home-carousel__arrow home-carousel__arrow--prev" id="carousel-prev" type="button" aria-label="Previous product">←</button>
				<div class="home-carousel__viewport" id="carousel-viewport"><div class="home-carousel__track" id="carousel-track">
					<?php foreach ( $carousel_products as $slide ) : $slide_product = $slide['product']; $slide_terms = get_the_terms( $slide_product->get_id(), 'product_cat' ); $slide_category = $slide_terms && ! is_wp_error( $slide_terms ) ? $slide_terms[0]->name : 'Collection'; $slide_name = $carousel_names[ $slide_product->get_sku() ] ?? $slide_product->get_name(); ?>
					<button class="home-carousel__slide" type="button" data-product-id="<?php echo esc_attr( $slide_product->get_id() ); ?>" data-name="<?php echo esc_attr( $slide_name ); ?>" data-category="<?php echo esc_attr( $slide_category ); ?>" data-description="<?php echo esc_attr( $slide['copy'] ); ?>" data-price="<?php echo esc_attr( $slide_product->get_price() ); ?>" data-regular="<?php echo esc_attr( $slide_product->get_regular_price() ); ?>" data-sale="<?php echo $slide_product->is_on_sale() ? 'true' : 'false'; ?>" data-url="<?php echo esc_url( get_permalink( $slide_product->get_id() ) ); ?>" data-cart-url="<?php echo esc_url( $slide_product->add_to_cart_url() ); ?>" data-rating="<?php echo esc_attr( (string) $slide_product->get_average_rating() ); ?>" data-review-count="<?php echo esc_attr( $slide_product->get_review_count() ); ?>">
						<span class="home-carousel__flip"><span class="home-carousel__face home-carousel__face--front" aria-hidden="true"><?php if ( $slide_product->is_on_sale() && (float) $slide_product->get_regular_price() > 0 ) : ?><span class="home-carousel__sale">−<?php echo esc_html( (string) round( ( (float) $slide_product->get_regular_price() - (float) $slide_product->get_price() ) / (float) $slide_product->get_regular_price() * 100 ) ); ?>%</span><?php endif; ?><?php echo wp_get_attachment_image( $slide_product->get_image_id(), 'medium_large', false, array( 'loading' => 'lazy', 'alt' => '' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><span><strong><?php echo esc_html( $slide_name ); ?></strong><small><?php echo esc_html( $slide_category ); ?></small></span></span><span class="home-carousel__face home-carousel__face--back" aria-hidden="true"><small><?php echo esc_html( $slide_category ); ?> · Concept</small><strong><?php echo esc_html( $slide_name ); ?></strong><span><?php echo esc_html( $slide['copy'] ); ?></span><b><?php echo wp_kses_post( $slide_product->get_price_html() ); ?></b></span></span>
					</button>
					<?php endforeach; ?>
				</div></div>
				<button class="home-carousel__arrow home-carousel__arrow--next" id="carousel-next" type="button" aria-label="Next product">→</button>
				<p class="home-carousel__count"><span id="carousel-current">01</span> / <span id="carousel-total"><?php echo esc_html( count( $carousel_products ) ); ?></span></p>
			</div>
			<div class="home-carousel__details" aria-live="polite"><div class="home-carousel__summary"><span id="carousel-category" class="home-carousel__category"></span><h3 id="carousel-name"></h3><p id="carousel-description"></p><div id="carousel-rating"></div></div><div class="home-carousel__purchase"><div id="carousel-price" class="home-carousel__price"></div><div class="home-carousel__actions"><a id="carousel-link" href="<?php echo esc_url( get_permalink( $first_slide->get_id() ) ); ?>">View details ↗</a><a id="carousel-add" class="home-carousel__cart" href="<?php echo esc_url( $first_slide->add_to_cart_url() ); ?>">Add to cart</a><button id="carousel-save" class="home-carousel__save is-wishlist-button" data-product-id="<?php echo esc_attr( $first_slide->get_id() ); ?>" type="button" aria-label="Save product to wishlist">♡</button></div></div></div>
			<div id="carousel-dots" class="home-carousel__dots" role="group" aria-label="Choose a product"></div>
			<p class="home-carousel__note">Fictional products · Illustrative prices and reviews · WooCommerce demo checkout</p>
		</div>
	</section>
	<?php endif; ?>

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

	<?php if ( $fashion_items ) : $first_fashion = $fashion_items[0]; ?>
	<section id="fashion" class="fashion-rail is-home-section" aria-labelledby="fashion-title">
		<div class="is-home-container">
			<div class="fashion-rail__heading"><p class="is-home-eyebrow">New category · The everyday edit</p><h2 id="fashion-title">Style, on your terms.</h2><p>Move across the rail to discover each piece. Tap a garment on mobile.</p></div>
			<div class="fashion-rail__display"><div class="fashion-rail__items" role="group" aria-label="Explore fashion concepts">
				<?php foreach ( $fashion_items as $index => $fashion_product ) : ?>
				<button class="fashion-rail__item<?php echo 0 === $index ? ' is-active' : ''; ?>" type="button" data-fashion-name="<?php echo esc_attr( $fashion_product->get_name() ); ?>" data-fashion-description="<?php echo esc_attr( wp_strip_all_tags( $fashion_product->get_short_description() ) ); ?>" data-fashion-price="<?php echo esc_attr( $fashion_product->get_price() ); ?>" data-fashion-regular="<?php echo esc_attr( $fashion_product->get_regular_price() ); ?>" data-fashion-sale="<?php echo $fashion_product->is_on_sale() ? 'true' : 'false'; ?>" data-fashion-url="<?php echo esc_url( get_permalink( $fashion_product->get_id() ) ); ?>" data-fashion-cart-url="<?php echo esc_url( $fashion_product->add_to_cart_url() ); ?>" aria-label="Show <?php echo esc_attr( $fashion_product->get_name() ); ?>" aria-pressed="<?php echo 0 === $index ? 'true' : 'false'; ?>">
					<?php echo wp_get_attachment_image( $fashion_product->get_image_id(), 'medium_large', false, array( 'loading' => 'lazy', 'alt' => '' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<span><?php echo esc_html( sprintf( '%02d / %s', $index + 1, $fashion_product->get_name() ) ); ?></span>
				</button>
				<?php endforeach; ?>
			</div></div>
			<div class="fashion-rail__details"><div><span class="fashion-rail__eyebrow">Fashion / concept collection</span><h3 id="fashion-name"><?php echo esc_html( $first_fashion->get_name() ); ?></h3><p id="fashion-description"><?php echo esc_html( wp_strip_all_tags( $first_fashion->get_short_description() ) ); ?></p></div><div class="fashion-rail__purchase"><div id="fashion-price"><?php echo wp_kses_post( $first_fashion->get_price_html() ); ?></div><div class="fashion-rail__actions"><a id="fashion-link" href="<?php echo esc_url( get_permalink( $first_fashion->get_id() ) ); ?>">View product ↗</a><a id="fashion-add" class="fashion-rail__cart" href="<?php echo esc_url( $first_fashion->add_to_cart_url() ); ?>">Add to cart</a></div></div></div>
			<div class="fashion-rail__footer"><p>Fictional garments and illustrative prices for this portfolio store.</p><a href="<?php echo esc_url( $fashion_url ); ?>">Shop the fashion collection ↗</a></div>
		</div>
	</section>
	<?php endif; ?>

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
								<?php if ( $published && $product->is_on_sale() && (float) $product->get_regular_price() > 0 ) : ?><span class="is-home-product__sale">−<?php echo esc_html( (string) round( ( (float) $product->get_regular_price() - (float) $product->get_price() ) / (float) $product->get_regular_price() * 100 ) ); ?>% <small>demo offer</small></span><?php endif; ?>
								<?php if ( $image_id ) : ?>
									<?php echo wp_get_attachment_image( $image_id, 'woocommerce_thumbnail', false, array( 'loading' => 'lazy', 'sizes' => '(max-width: 600px) 46vw, 23vw' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
								<?php else : ?>
									<span class="is-home-placeholder is-home-placeholder--product" aria-hidden="true"><span class="is-home-placeholder__glyph"></span><span>Product image</span></span>
								<?php endif; ?>
							</span>
							<span class="is-home-product__body">
								<span class="is-home-product__title"><?php echo esc_html( $item['name'] ); ?></span>
								<span class="is-home-product__kind"><?php echo esc_html( $item['kind'] ); ?></span>
								<?php if ( $published && $product->get_review_count() ) : ?><span class="is-home-product__rating">★ <?php echo esc_html( number_format( (float) $product->get_average_rating(), 1 ) ); ?> <small>(<?php echo esc_html( $product->get_review_count() ); ?> demo reviews)</small></span><?php endif; ?>
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

	<section class="is-home-section is-home-editorial" aria-labelledby="is-home-editorial-title">
		<div class="is-home-container is-home-editorial__inner">
			<div class="is-home-editorial__copy"><p class="is-home-eyebrow">The focused workspace</p><h2 id="is-home-editorial-title">Make room for better ideas.</h2><p>Build a setup around the pieces you use every day. Discover computers and accessories in one calm collection.</p><a class="is-home-button is-home-button--primary" href="<?php echo esc_url( $computers_url ); ?>">Explore computers <span aria-hidden="true">↗</span></a></div>
			<?php if ( $computers_image_id ) : ?><?php echo wp_get_attachment_image( $computers_image_id, 'large', false, array( 'loading' => 'lazy', 'alt' => 'Graphite laptop concept on a bright desk' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php endif; ?>
		</div>
	</section>

	<section class="is-home-section is-home-products is-home-new" aria-labelledby="is-home-new-title">
		<div class="is-home-container">
			<div class="is-home-section__heading"><div><p class="is-home-eyebrow">Fresh ideas</p><h2 id="is-home-new-title">More to explore</h2></div><a class="is-home-text-link" href="<?php echo esc_url( $shop_url ); ?>">Shop the collection <span aria-hidden="true">↗</span></a></div>
			<div class="is-home-products__grid">
				<?php foreach ( $new_showcase as $item ) :
					$product_id = function_exists( 'wc_get_product_id_by_sku' ) ? wc_get_product_id_by_sku( $item['sku'] ) : 0;
					$product = $product_id && function_exists( 'wc_get_product' ) ? wc_get_product( $product_id ) : false;
					$published = $product && 'publish' === $product->get_status() && $product->is_visible();
					$image_id = $published ? $product->get_image_id() : 0;
					?>
					<article class="is-home-product<?php echo $published ? '' : ' is-home-product--pending'; ?>">
						<?php if ( $published ) : ?><a class="is-home-product__link" href="<?php echo esc_url( get_permalink( $product_id ) ); ?>" aria-label="<?php echo esc_attr( 'View ' . $product->get_name() ); ?>"><?php endif; ?>
						<span class="is-home-product__media is-home-product__media--<?php echo esc_attr( $item['shape'] ); ?>">
							<?php if ( $published && $product->is_on_sale() && (float) $product->get_regular_price() > 0 ) : ?><span class="is-home-product__sale">−<?php echo esc_html( (string) round( ( (float) $product->get_regular_price() - (float) $product->get_price() ) / (float) $product->get_regular_price() * 100 ) ); ?>% <small>demo offer</small></span><?php endif; ?>
							<?php if ( $image_id ) : ?><?php echo wp_get_attachment_image( $image_id, 'woocommerce_thumbnail', false, array( 'loading' => 'lazy', 'sizes' => '(max-width: 600px) 46vw, 23vw' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php else : ?><span class="is-home-placeholder is-home-placeholder--product" aria-hidden="true"><span class="is-home-placeholder__glyph"></span><span>Product image</span></span><?php endif; ?>
						</span>
						<span class="is-home-product__body"><span class="is-home-product__title"><?php echo esc_html( $item['name'] ); ?></span><span class="is-home-product__kind"><?php echo esc_html( $item['kind'] ); ?></span><?php if ( $published && $product->get_review_count() ) : ?><span class="is-home-product__rating">★ <?php echo esc_html( number_format( (float) $product->get_average_rating(), 1 ) ); ?> <small>(<?php echo esc_html( $product->get_review_count() ); ?> demo reviews)</small></span><?php endif; ?><span class="is-home-product__bottom"><?php if ( $published ) : ?><span class="is-home-product__price"><?php echo wp_kses_post( $product->get_price_html() ); ?></span><span class="is-home-product__arrow" aria-hidden="true">↗</span><?php else : ?><span class="is-home-product__soon">Coming soon</span><?php endif; ?></span></span>
						<?php if ( $published ) : ?></a><?php endif; ?>
					</article>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<section class="is-home-section is-home-collections" aria-labelledby="is-home-collections-title"><div class="is-home-container"><div class="is-home-section__heading"><div><p class="is-home-eyebrow">Find a starting point</p><h2 id="is-home-collections-title">Curated by mood</h2></div></div><div class="is-home-collections__grid"><a href="<?php echo esc_url( $accessories_url ); ?>"><span>01 / The focused desk</span><strong>Details that make the day flow.</strong><span>Explore accessories ↗</span></a><a href="<?php echo esc_url( $home_tech_url ); ?>"><span>02 / The comfortable home</span><strong>Technology that feels at home.</strong><span>Explore home tech ↗</span></a></div></div></section>

	<section class="is-home-section is-home-three-d" aria-label="Explore in 3D">
		<div class="is-home-container">
			<div class="is-home-section__heading"><div><p class="is-home-eyebrow">Interact with the idea</p><h2>Explore in 3D</h2><p class="is-home-three-d__intro">A separate laptop viewer demonstration; it is not connected to the WooCommerce products above.</p></div></div>
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
