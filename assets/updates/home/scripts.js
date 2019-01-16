/**
 * Custom scripts to load when DOM is ready
 *
 * @param  jQuery $
 * @return void
 */
(function ($, ScrollMagic) {

	// Cache window element
	var $window = $(window);

	// Clone main content to blur it
	var $clone = $('.js-content').clone();
	$('.js-clone-content').append($clone);

	if ($window.width() >= 646) {
		// Wait a couple seconds to play
		// all videos at the same time
		setTimeout(function() {
			$('.js-video').each(function() {
				this.play();
			});
		}, 2000);
	}

	setTimeout(function() {
		$('.js-count').countTo('start');
	}, 100);

	$('.js-overlay').addClass('is-fading');

	// Scroll blurred content with the window
	$window.on('scroll', function() {
		if ($window.width() >= 945) {
			$('.js-header-content')
				.css('transform', 'translate3d(0, -' + $window.scrollTop() + 'px, 0)');
		}
	});

	// Custom slider
	$('.js-slider').each(function(index, element) {
		$(element).slick({
			arrows: false,
			fade: true,
			accessibility: false,
			draggable: false,
			autoplay: true,
			speed: 1500,
			autoplaySpeed: $(element).data('autoplay-speed'),
			pauseOnHover: false
		});
	});

	// Home blog articles slider
	$('.js-articles').slick({
		arrows: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		accessibility: false,
		draggable: false,
		infinite: false,
		cssEase: 'ease-in-out',
		prevArrow: '<button type="button" class="slick-prev"><svg class="slider-arrow"><use xlink:href="#arrow"></use></svg></button>',
		nextArrow: '<button type="button" class="slick-next"><svg class="slider-arrow"><use xlink:href="#arrow"></use></svg></button>',
		responsive: [
			{
				breakpoint: 945,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 645,
				settings: "unslick"
			}
		]
	});

	// Portfolio slider
	$('.js-portfolio-slider').slick({
		speed: 0,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: false,
		draggable: false,
		infinite: false,
		adaptiveHeight: true,
		asNavFor: '.js-portfolio-slider',
		cssEase: 'ease-in-out',
		prevArrow: '<button type="button" class="slick-prev js-portfolio-arrow"><svg class="slider-arrow"><use xlink:href="#arrow"></use></svg></button>',
		nextArrow: '<button type="button" class="slick-next js-portfolio-arrow"><svg class="slider-arrow"><use xlink:href="#arrow"></use></svg></button>'
	});

	// Case studies slider
	$('.js-cases-slider').slick({
		speed: 400,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: false,
		draggable: false,
		infinite: true,
		asNavFor: '.js-cases-slider',
		cssEase: 'ease-in-out',
		prevArrow: '.slick-prev',
		nextArrow: '.slick-next'
	});

	// Single case study slider
	$('.js-case-slider').slick({
		speed: 1000,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: false,
		draggable: false,
		infinite: true,
		vertical: true,
		swipe: false,
		asNavFor: '.js-case-slider',
		cssEase: 'ease-in-out',
		prevArrow: '.slick-next',
		nextArrow: '.slick-prev'
	});

	// Single case study content slider
	$('.js-case-content-slider').slick({
		speed: 1000,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: false,
		draggable: false,
		infinite: true,
		vertical: true,
		swipe: false,
		asNavFor: '.js-case-content-slider',
		cssEase: 'ease-in-out',
		prevArrow: '.slick-prev',
		nextArrow: '.slick-next'
	});

	// Set class to slide going out of view for styling
	$('.js-case-content-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		if (currentSlide !== nextSlide) {
			$(slick.$slides).removeClass('slick-out-slide');
			$(slick.$slides.get(currentSlide)).addClass('slick-out-slide');

			$('.js-slick-dots li').addClass('slick-active');
		}
	});

	// Title text slider
	$('.js-title-slider').slick({
		speed: 500,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: false,
		draggable: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
		cssEase: 'ease-out'
	});

	// Reposition blurred content in block area on load and on resize
	var positionBlurredContent = (function () {
		var sliderHeight = $('.js-home-blocks').height(),
			blockHeight  = $('.js-blocks-content').height();

		$('.js-block-content')
			.css('transform', 'translate3d(0, -' + (sliderHeight - blockHeight) + 'px, 0)');

		return arguments.callee;
	})();

	// Position blurred background in case studies titles
	var positionCaseBackground = function () {
		if ($('.js-case-background').length > 0) {
			var position = $('.js-case-title').position();
			$('.js-case-background').css({ left: position.left ? (position.left + 20) * -1 : '-20px', top: position.top * -1 });
		}

		return arguments.callee;
	};

	setTimeout(positionCaseBackground, 100);

	// Position case study content with the same left offset as the logo
	var positionCaseContent = (function () {
		var leftOffset = $('.js-logo').offset().left;
		$('.js-case-content').css('padding-left', leftOffset + 'px');

		return arguments.callee;
	})();

	// Position blurred content in single case study page
	var positionBlurreCaseStudy = (function() {
		if ($('.js-case-content').length > 0) {
			$('.js-clone-arrow').css('top', $('.js-case-content').offset().top * -1);
		}
		return arguments.callee;
	})();

	$window.on('resize', toggleTopSubMenu);
	$window.on('resize', positionCaseContent);
	$window.on('resize', positionBlurredContent);
	$window.on('resize', positionCaseBackground);
	$window.on('resize', positionBlurreCaseStudy);

	$window.on('resize', function() {
		$('.js-portfolio-arrow').css('top', $('.slick-current .js-slider').height() + 55);
	});

	$('.js-portfolio-arrow').css('top', $('.slick-current .js-slider').height() + 55);

	$('.js-portfolio-slider').on('beforeChange', function() {
		$('.js-portfolio-arrow').css('top', $('.slick-current .js-slider').height() + 55);
	});

	// Focus on portfolio when accessing single portfolio page
	if ($('#post-name').length > 0) {
		var pageIndex = $('[data-slug="' + $('#post-name').val() + '"]').index();
		$('.js-portfolio-slider').slick('slickGoTo', pageIndex, true);
		$('.js-portfolio-slider').slick('slickSetOption', 'speed', 400);
	}

	// Toggle search box in header
	$('.js-search').on('click', function() {
		var $button = $(this);

		$button.closest('li').toggleClass('is-active');
		$button.next('input').focus();
	});

	// Hide other menu items on search field focus
	$('.js-search').next('input').on('focus', function () {
		if ($window.width() <= 945) {
			if (!(navigator.userAgent.match(/iPhone/i)) && !(navigator.userAgent.match(/iPod/i))) {
				$('.js-top-menu > li').removeAttr('style').not(':last-child').addClass('is-faded');
				$(this).closest('li').css('transform', 'translateY(-' + ($('.js-top-menu > li').length - 1) * 46 + 'px)');
			}
		}
	});

	// Show other menu items back on search field focus out
	$('.js-search').next('input').on('blur', function () {
		$(this).val('');
		$(this).closest('li').removeClass('is-active');

		// Hide keyboard on iOS
		document.activeElement.blur();

		if ($window.width() <= 945) {
			$('.js-top-menu > li').removeClass('is-faded');
			$(this).closest('li').css('transform', 'translateY(0)');
		}
	});

	// Remove autocomplete list when search form is submitted
	$('.js-search-field').on('keyup', function(e) {
		if (e.which === 13) {
			$('.ui-autocomplete').remove();
		}
	});

	// Hide mobile menu when clicking outside it
	$(document).click(function(event) {
		if (!$(event.target).closest('.js-menu-container').length && !$(event.target).closest('.js-menu-toggle').length) {
			$('html').removeClass('is-menu-open');
		}
	});

	// Display cookie notice until user agrees
	$('.js-cookie-button').on('click', function() {
		Cookies.set('wp_visited', 1, 365);
		$('.js-cookie-header').slideUp();
	});

	// Add scroll animation effects
	var controller = new ScrollMagic.Controller();

	if ($window.width() >= 945) {
		// Add parallax effect to homepage slider
		new ScrollMagic.Scene({
			triggerElement: 'body > .js-content',
			duration: '120%',
			triggerHook: 0
		})
		.setTween('.js-home-slider .slick-track', { y: '50%', ease: Linear.easeNone })
		.addTo(controller);
	}

	if ($('.js-blocks-content').length > 0) {
		// Add fade-in effect to homepage tagline
		new ScrollMagic.Scene({
			triggerElement: '.js-blocks-content',
			duration: 300,
			triggerHook: '.5'
		})
		.setTween('.js-header-wrapper', { opacity: 1 })
		.addTo(controller);

		// Make tagline text fade-in after background
		new ScrollMagic.Scene({
			triggerElement: '.js-blocks-content',
			duration: 400,
			triggerHook: '.3'
		})
		.setTween('.js-tagline', { opacity: 1 })
		.addTo(controller);
	}

	if ($('.js-page-header').length > 0) {
		// Add parallax effect to inner pages header
		new ScrollMagic.Scene({
			triggerElement: '.js-page-header',
			duration: '45%',
			triggerHook: 0
		})
		.setTween('.js-header-bg', { y: '15%', ease: Linear.easeNone })
		.addTo(controller);
	}

	if ($('.js-page-separator').length > 0) {
		// Add parallax effect to about page image separators
		$('.js-page-separator').each(function(index, item) {
			new ScrollMagic.Scene({
				triggerElement: item,
				duration: '100%',
				triggerHook: 1
			})
			.setTween(item, { backgroundPositionY: '0%', ease: Linear.easeNone })
			.addTo(controller);
		});
	}

	// Open recruitment popup
	$('.js-popup').magnificPopup({
		type: 'inline',
		midClick: true,
		removalDelay: 300,
		mainClass: 'mfp-fade',
		callbacks: {
			beforeOpen: function() {
				$('.js-blur').addClass('site-block-clone');
				$('body').addClass('is-blurred');
			},
			open: function() {
				$('.js-header').css({ width: 'calc(100% - ' + $('html').css('marginRight') + ')' });
			},
			beforeClose: function() {
				$('.js-blur').removeClass('site-block-clone');
			},
			afterClose: function() {
				$('body').removeClass('is-blurred');
				$('.js-header').removeAttr('style');
			}
		}
	});

	// Open recruitment popup if URL contains #recruitment hash
	if (window.location.hash) {
		var hash = window.location.hash.substring(1);

		if (hash === 'recruitment') {
			if ($('#recruitment').length > 0) {
				$.magnificPopup.open({
					items: {
						src: '#recruitment'
					},
					type: 'inline',
					midClick: true,
					removalDelay: 300,
					mainClass: 'mfp-fade',
					callbacks: {
						beforeOpen: function() {
							$('.js-blur').addClass('site-block-clone');
							$('body').addClass('is-blurred');
						},
						open: function() {
							$('.js-header').css({ width: 'calc(100% - ' + $('html').css('marginRight') + ')' });
						},
						beforeClose: function() {
							$('.js-blur').removeClass('site-block-clone');
						},
						afterClose: function() {
							$('body').removeClass('is-blurred');
							$('.js-header').removeAttr('style');
						}
					}
				});
			}
		}
	}

	// Custom select inputs
	var selectBoxes = $('.js-select');

	selectBoxes.each(function() {
		$(this).selectBoxIt({
			defaultText: $(this).data('text') ? $(this).data('text') : '',
			autoWidth: false,
			copyClasses: 'container'
		});
	});

	$('.js-select-blog').on('change', function() {

		var $parent = $(this).parent(),
			data = {
				action: 'filter_posts',
				security: site.ajax_nonce,
				date: $('#filter-date', $parent).val(),
				category: $('#filter-category', $parent).val()
			};

		$.get(site.ajax_url, data, function(response) {
			$('.js-article-wrapper').fadeOut(function() {
				$(this).html(response).fadeIn(function() {
					infiniteScroll();
					selectBoxes.selectBoxIt('enable');
				});
			});
		});

	});

	$('.js-select-portfolio').on('change', function() {

		var $parent = $(this).parent(),
			data = {
				action: 'filter_portfolio',
				security: site.ajax_nonce,
				season: $('#filter-season', $parent).val(),
				events: $('#filter-event', $parent).val(),
				client: $('#filter-clients', $parent).val()
			};

		$.get(site.ajax_url, data, function(response) {
			$('.js-article-wrapper').fadeOut(function() {
				$(this).html(response).fadeIn(function() {
					infiniteScroll();
					selectBoxes.selectBoxIt('enable');
				});
			});
		});

	});

	// Auto-select client option in portfolio if coming from clients page
	var clientId = location.search.split('client_id=')[1];

	if (clientId) {
		var clientIndex = $('#filter-clients').find('option[value="' + clientId + '"]').index(),
			$parent     = $('body > .js-content');
		$('#filter-clients', $parent).selectBoxIt('selectOption', clientIndex);
	}

	// Infinite scrolling
	var infiniteScroll = (function() {
		$('.js-articles-list').infinitescroll({
			navSelector: '.js-articles-nav',
			nextSelector: '.js-nav-next a',
			itemSelector: '.js-article',
			maxPage: $('.js-max-num').val(),
			loading: {
				img: 'data:image/gif;base64,R0lGODlhQABAAKUAAAQCBISChMTCxERCRKSipOTi5GRmZCQiJJSSlNTS1LSytPTy9DQyNFRSVHR2dIyKjMzKzExKTKyqrOzq7GxubCwqLJyanNza3Ly6vPz6/Dw6PBwaHFxeXHx+fISGhMTGxERGRKSmpOTm5GxqbCQmJJSWlNTW1LS2tPT29DQ2NFRWVHx6fIyOjMzOzExOTKyurOzu7HRydCwuLJyenNze3Ly+vPz+/Dw+PBweHP///wAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJBgA5ACwAAAAAQABAAAAG/sCccEgsGo9CjGEkQDqf0Kjz44q4XAmpdstlVasWrnh8fHwjJbK6eOlQLAun2Yp2wmIaTnZ9RFEMgAhyZ2lIBgwyDCAZfEYmgJB7Rg90LoVGNQyaiCaNRTAjHAaiAYxGHoRHGRGImikwnkUEkKMYZalGFpsyKQ+xnyO0MXFFc1WXQxMavJoDsL9EJ5CiBJO4RCuavDIv0EUZK6KQBcWVyDkJiCmaKjbeRRC0Br5ElF/nHLspH++T8hD1zBFRoG2dg0YZChBDUgCQuBWmctizcmkBiE0MUpBzIgICCic0PHQIoOAjklnTbAmR4MFCiQcKhiBQx0sQEhEUNmyQIalI/okAHYJ6+ODOyIJg4ko9QeECIwiT3xAc0KkTBJIAK4ICDYDgwhElBlZAiOgkw4kIvLoZOaGBKlUSJ7VmzdohxIRvKySQjYLiAQcjF1S4dfv3yIIZWEfKDXCC7N4tC3PAWDF4AwCdKp4hMcFCbtCRDyAU9ZTBAonBAHBsSFFDSgYBQBV/7mAB6hoYNyrrJFFitJQFEhZnPfFrhNvLGyhoFlPAAt0OCGzzgSHDrYtOjRI8GAkQ2gyd3KBlwIDAtycUKTxIj/WYdL/38OOTKfBBgP37+O1j78dCnn8DMbRmQgkuEViCgQha0MR7HADg4IMQQjhDCC5VaKCFLnXXzwgR/nb4oAwUXiiihRq+Y4CHHvI04ooKwtcgihHOkEMB+dWoH3z9/UcLBSrJ5+OPQOZgHnv9ZGBCDUPykUENFySpRgEYKKDARr/QIGUNIngCgwAKvHCCAjW0R8Z4L0ipwAfLcYFCC2ZKWeZ+jbTwZZdzJrDeEzZcMKeXXkopgJNcLElnl3SeQIMWIkTZppmGQmMDDYrOaWYNd5X1gZl8nuClCY6pQRYKCWhKZ5lSeoTEpYOa+cF6NZgAqCotLEgEDB9IOmgLSNjqJZZHWAkmlXhCKeWhRohQQ6ov9FjEsYUSa4RZbSL5hKCkYtBeBnoOKusnX56QgJjouCmlV0LQAIEJ2Qm04KwJmJ4AZxFrdpsmERnAcOcQMKQqrRBsmikJmXOeEJkRKMDwqhSo0pnlEGyW+QKcNOypQInvidAuP0T0+2VPOQjQp5SVvmdDpFKm2W+ZHOc76r79XCDuw0ZorADHOfRrprPeoBCwAo3FTCjM8H7ZZ8/vnNwlzgzzLCXNOZgg9MbvoMAomEic7O0RI7cLLhkTjHrCwkYk8DHTOVj88bxKSkpxxuKSnQOqyR48xgQ1nNDCvTVLqem7RKAAwQloBumzv4KTkcCofBceRQFthqz4FjTUwOs7QQAAIfkECQYAOgAsAAAAAEAAQACFBAIEhIKExMLEREJE5OLkpKKkZGJkJCIk1NLUVFJU9PL0tLK0FBIUlJKUdHJ0NDI0zMrMTEpM7OrsrKqs3NrcXFpc/Pr8vLq8HBocnJqcfHp8DA4MjIqMbGpsPD48BAYEhIaExMbEREZE5ObkpKakZGZkLCos1NbUVFZU9Pb0tLa0FBYUlJaUdHZ0NDY0zM7MTE5M7O7srK6s3N7cXF5c/P78vL68HB4cnJ6cfH58////AAAAAAAAAAAAAAAAAAAABv5AnXBILBqPwpAmB0E6n9CoE2EoWSnSrHaLK1UNk614fMR9SwWyukhggSYpZ8brJTljAZQDuz6mQDmBdkhzX4NHGhGKNBZ9RjM5ARoBOXxGhXVIAhEwMIqWjkJ4S4ENNUeYBodEFgaenDAKoUULgZI5IWVnaUYknLAss0UKlLYgskVmdLxEMQmenhUxwkUCkaQql3SqRhy/ntnUrBy2kSNFqas6J98RHafiRCfFgcxC6UUO7S/xRjiSt04QUVbF3gVonAI4sjAijpMRtyJxgKcDn5AUFRAmIPBkBAKHR0YUyJBBAEgjtSIKGHKBBYmRNoYUaIfDiYQcLh6IEHhkAv6LnxlwIKBIRAGgSDlYNHKSosQ3GieHWMDh4YHVBzQIkWSRgSsJjkZCSGqAYOmTGhcMcLpwxAaMq1c9IFHBtW7XDCqQSW2gwqyUFCwcPCoBF24LJCno3rWbIYTfqFpOGs1Z2KqDaU5mkFi8uACohROqVn4AI1eUGi9wcK4rw6+aGChGP/BAAvITBTZWlxSmobKLHJjHSJCxmITrNQpEwC3Bsw+FAlw/OyJhFUa4WRYgkCAaKgUMHLYdccfer7z582QkIFjPvj37GeYztHAwvz79+zlWzlggQ4UM/v4B+N8CCJjXwQoYIKhgggwiOIENC0S4gAoSUiihDM3Fo0GDHP4uuIIIFwgoYn/9qZChOBp42CGDA8xgoYURwhhhgeUduKKKdoxwAgIv8HhCjy/8yCNY/chHn31IamAaekw26aQO44VynJQn2BDlGikcEEB4ZBAQ4gJEztIAAADcEIYjMQgA4AI2TEmGAjeQSaYHNI6RwgsSRvjfiWuUIOefJUiwRQ0UWEiihQJcuYUEJvz55wYNuFnECF/mGSN8wljAAQOOynnAdUdYEMKF/pV6gl+SQuHXCB10KicMwRUx6poShgCZDScoGuoLKxXxwgCuAoDCXHn2Z8M5j0RoQ5hO1OBlhJgWIUOcjjKABIQAqhBtERbIaOUTFkA44AVT/rHBn+EuIBEDhSqUNYWeEVoyAwQ7vhDtCaTyOcQINJC5QhNIWBADlzrEQOu3QuApYZ0WXNBfjHodQYANBEsxK4DIJswffxm6CC/A541A6pIaT0hgNQ9HKKh5aMUYYaw6KPxfnaLo6R/C/VAAL4ZGKEwhzSVLuC01ibncV88b81xE0Q8fHY/M/A2tsYVAC3EChQ9X7UgKFbKJhMztHtGyzakKJ6AKGReBQMpa6yByyjAvBCPISG/ctg6zynCBrunZoMILXPqstB8QqBBC3E8qPOOTaiAgoL6MR0FAnitHLsYMNhzbTxAAIfkECQYAPwAsAAAAAEAAQACFBAIEhIKExMLEREJEJCIkpKKk5OLkZGJkFBIUlJKU1NLUNDI0tLK09PL0dHJ0VFJUDAoMjIqMzMrMLCosrKqs7OrsbGpsHBocnJqc3NrcPDo8vLq8/Pr8fHp8XFpcTEpMBAYEhIaExMbEJCYkpKak5ObkZGZkFBYUlJaU1NbUNDY0tLa09Pb0dHZ0VFZUDA4MjI6MzM7MLC4srK6s7O7sbG5sHB4cnJ6c3N7cPD48vL68/P78fH58XF5cTE5M////Bv7An3BILBqPwlgCpUA6n9CoM8Or8nDSrHY74wU6gdV2TD5SrDxGeV0szTAblnP2/aqRjUQtYGAjOTcYKBhiSGdVAXdHESYHJg4cfkYGg5V9R11faUgSjZ5YkkQNgqQkO2aIHYpELC2ejg2hRTqkg01GdB1Vq0MMJp4mJLJFLBi1N3JFh3ZGNDWOjg6xw0QxtRgCuDy6m0UYrwc61EU7JNc0ygFe3UM40L88p+NEONe8h7q8IeAp80YMlQSBEpLJyyoBr0ygkMSBRjIkNK6ZGoKPHQsHryyUeFIhRSSIKxisUPDQiIBrMYYIoBCSgoghM94dmOGERgIfH3pkQKKDgf5PkTjkEQtUiYLQIxw6vHNQcggHCi4+4PThAElIBjOu6qhwRMEgEjuj7BDRwlE2IyJMTJX6wQOnGT/jimj6VMTHLBwKhJjUYe3aCEhYiPCZFa7PkXd/JN5SsgEKv2x9BJiGpERPwisMr7gkawcDF5BxWpAgZUeGFVev+hRwdE0DtaFdzFgMhUUMrFgzr0gpC0boBJTH0BistTWbBj0idxjIxkDIGRupMcB54KwsDil0GPfD4QCFpp390fZHvrx5KRUUqF/Pfj3zcSRCBJBPf759GKRx5IZbeL/PW/50sMCABBZYIAOXHfaTalj1Q14EMqggwwIRTlghhSq4sIF//f4VhpqD/kRAoAojlriABzikFheDDAA4TwcXxighhmqUkIICMeCYQo4x7IgjZ/PEF8KQ9BE5ZASknafkkkwKsR1D4mX35BosaADDeGsYsCEDQIZywwUnqMBLGTQIkBuCWJLRwAInXADmAyCOYVtcuMXpRwttnpDnBS2go4VpV3m42pRa0DDAnnuOgEGaRJSwJZ1AUcMBBiOAaWmeOYjjBAeDYeahR0Qw+kRwNHTgJqJgHuAnWpjJBZ4OKRBqxGsqtJaCC5deaoFVcWWlQ3RF6Idgl3/cYAMAANxwBAMq5HrCBDxhtsJ7TjGo3RMsEIAssicENwQLKBCw5wcgiaRAmuMKEOZTWD/gIMGNMQzUwbbItuBEBTW4OQFvSDn0BA1nIijUbT8BSMMJ9ILA7hEGzCVJp7kB+8Nt/MV5A70APKBkCT9l9VI1CrrIgQoYb2DeDltetWoS6rr4gwgYTyAqGxmoO4OdE4dshAsYL+QPCyquQBvFDU4CAb0IrDwMwfxRm/NVLgvBA8a7jsPCgggiwfRIR7Bw7LYgcEVNBfutIDERCmT1HxIzYJzkMByo9rYRTLfoRA7bngCeJBXosNveLIt0sxMlfACCCnM3GfjaipORbmE4Nx6FAXGJLfkWOOjwqz9BAAAh+QQJBgA5ACwAAAAAQABAAIUEAgSEgoTEwsREQkTk4uRkYmSkoqQkIiSUkpTU0tRUUlT08vR0cnS0srQ0MjSMiozMysxMSkzs6uxsamycmpzc2txcWlz8+vx8eny8urw8OjwcGhysqqwsKiyEhoTExsRERkTk5uRkZmSkpqSUlpTU1tRUVlT09vR0dnS0trQ0NjSMjozMzsxMTkzs7uxsbmycnpzc3txcXlz8/vx8fny8vrw8PjwcHhwsLiz///8AAAAAAAAAAAAAAAAAAAAAAAAG/sCccEgsGo/CyogTQzqf0KgzRiFVQ9KsdlurUiiCrXh8rFlJpDB5TXQJGqyLM+MFOxejAIXARl5SDYEQc2dpTjA0iQ9yfUUSgZBYZV6GRyU0AYk0ko1DJ5CBNUhmXmpFFyuamSedRSygDU1GdGemRDWZARg0Da1FJ4ANHCkpjEQZZ3ZFLh6aNA8LvkUVgcEsRl21RhyYGLqD0kQzxKAuRaRWtjkEzjQIM+FFIYHDDR/nlOoUibkV8UYfyAXilANZKSIsnGEY0eiCC1ZOXMCqYSxbFVMnUuUKIOGJiwrGjLgAlCIBxCMJhAUrMSRBhg8CMrAUkkHTrgwRYYgQwUAW/jZQKWLAMwIM0LAaQ/1o9PbgJJE/LwqIkOoBSTBQNToaodagBkEnF1ikonHNCAsMUtPyRAIBFqQPToXUKBEXyoUGFIyEeKA2bYG8R058cFstQci6WQ4b2Nl3JwLEQ0IIhJWCj68ZNRg0loohgZQZJYxeDSQgKZsFNDbzzBAyygkWoiGV7aSz7wQD5si4qBGMA1JfC1BMnfrAJ5sYNRoEDVdjKgZwrU6U+C3tAoYGrVuZ9pX9n/fv4KVISEC+vPnyxsM1IIGAvfv28Clci0GYsGfvD1pE0M9/v/8WLdSQXH2wzPQPCf0l+F8EL2RAYIHfIbiggvq9QB89KQyjYYaA/swWzwoUThiBKCGUwEIJKJ6YooklpCdNA/C9JyMF94Vn44045rBdK901NN2OfVzQAgU9kkGAgw1Y5ssIDjjQAk6NuIFVkWKcEIEDODQpgj9kvEaYgY14gKUKTeKggge5ZTFDBaNhBaQYCyjQ5Jhz2jAClZEhCYtvLrIxwwg2zEmnAwrcA9ZghKVAlzhrRDOECw+QaWaZTTKQZhGI7gkXNiW8iURwERhRwgSSkjkmBla5VcOlQ1xYg5JPXMCBChtswNAsLZRp6gCjANVnDsC4+cQJtNa6AQ6IXQBDoGPKgMRIyrEAWQ4lQCjEChZM8IIFJAzhgbG10hARDWSCUKMR0g5Nm4NEGFI0hAUAxAuACEMsgAO4G/wqRAjSNoJoMASZIO+8RIxQKwC1OhvePBgaOoTA8tJLBAj4ivLdDEiSw6oMA0s8BAv42oAnG1zRA6YQEMfr8RAiHHzDBjB4FywkKdTFccR6vfzyBh2w2sorkDBxRMoEG7ECvijE8wnNFhtxs8qB3bsBADfc4HMfjwR9dQ5Er0xECrXu7GEnf1TjsNMdO9GCsR2oS4YEvPWLBLw4IxGCDDeAMHaOOdANNd9jPA3AC4CPwcHAUBa+BQlZxhxPEAAh+QQJBgA8ACwAAAAAQABAAIUEAgSEgoTEwsREQkSkoqTk4uRkYmQkIiSUkpTU0tS0srT08vR0cnQ0MjRUVlQUEhSMiozMysxMSkysqqzs6uxsamwsKiycmpzc2ty8urz8+vx8enw8OjwMCgxcXlyEhoTExsRERkSkpqTk5uRkZmQkJiSUlpTU1tS0trT09vR0dnQ0NjRcWlwcGhyMjozMzsxMTkysrqzs7uxsbmwsLiycnpzc3ty8vrz8/vx8fnw8PjwMDgz///8AAAAAAAAAAAAG/kCecEgsGo/Cwu02Qjqf0KhzpKgqZNKsdpuIVWOnrXh8fH1RCbK6KBMoXhqnWYFSpJGpzCVGWSM1dV4RcgpeYE4KJhcmBDh+RhRWVU1ldFV3RjaKm32PRCkxKKEKN0hmhmFGGgSLizUpnkVzhSgYlXVoRxGbiyCxRSl1Vihxsl92Rik1vK+/RRi0l0ZzdZhDGbwmqc5DODe0XgvGqEUjrYoijtxEVJK+RGbC1jwx5xcF60Yg4CiUQqeFtvE4YQ/FIw0yYDlZIIlUMR7x6GBaxesCloUFHhqRgSuBwiNdRFWxJcRGhAQvXtgYAsLeuyMLYuTIAcFfkW/DbKgrAshS/owbO49oEHGOgMYhGgR8yBFg5gUkwkaR6lTERiEmUnBgIKBI4JATLmaKDfABSQQvDRWA+DjkxomgUZLGgFSjqd0NOTZMwLMP3LAEGo9q0RhM7Ey8ATaIYGtkBE6/dPD9wgECAlOmG5puQEASilYUwoRVEQCXTAoEhg1DIL0lBcBQoV78kpm4dgAF4sjI2CcM6K8UlsVesKmmQCDijyIwhTDPj4YTvp1pcCFAsKfSnqzn2869exQKCcKLHy9+5fYMBNKrX59ehC2rsP3GR7a9hgES9/Pj348fxGNLVYgWEHci7KffgfgFkIF8IsEGmlfOiIDghCQEYENokghIXz72/hnooX6+jHACSiid8EKJJ74gWT7opVeDCATUEKOLE0Do3Y04eofdQfk8F90vGhgggnZkFLCgAivGogAMMBjw0hptRHMDkWKk4AEMEkgAwwbmjeFaQ17YSIYJWDKZJQwm5JbFZ2dIxdojC1Sg5ZxYSuCAAlQOMcKRaaHQ5XUKOFCmlmVWMIgTGvTFTygnaKRmlUQsQCadZ0rwwaNE9CVVFWvxZIEKjEEBnAeZbEDnoBBAJUkoWBnhAgAAHJBOFDgoIEEDDcylDwmUwsACEjiF4icSMjwAK6wWUJkCDLjSsEIIofKgwQQO0MkAsR0RScKxsJYlhAkVbLABCQQMgQCu9Ogi4IQMCGDpQWeqJPREAtzG+lEFD7SgrwpDpBBCA87SwMGfkJwQ7RYD1LvXEBXomy+/QyjgLLoQdxdDvQMUQYK+LTxQsRAeNLtCA0+uo8EB9cpGxAwd71tEAhM760Cea3xQLwlGNJyvx0bk0MDIuC68zggdcLvDRURs3PLHQoygA8AAh4BpLAbU68IROrtsxAU/o+utMzbUW4J1Sj98xLIAj7wC0rHcUK9BWLfcAtNtidyAmGossMOxEjhR9tx+ozvAwWvcQEMHDlCVs9x0DyHDDDqwgPeNSnecQ45rsJxvC5djToYCDrdQiudk1BBCCLpyEwQAIfkECQYAPAAsAAAAAEAAQACFBAIEhIKExMLEREJEpKKk5OLkZGJkJCIklJKU1NLUVFJUtLK09PL0dHJ0FBIUNDI0jIqMzMrMTEpMrKqs7OrsbGpsnJqc3NrcXFpcvLq8/Pr8fHp8DA4MLCosHBocPDo8BAYEhIaExMbEREZEpKak5ObkZGZkJCYklJaU1NbUVFZUtLa09Pb0dHZ0FBYUjI6MzM7MTE5MrK6s7O7sbG5snJ6c3N7cXF5cvL68/P78fH58PD48////AAAAAAAAAAAABv5AnnBILBqPwgIOV0I6n9Cos7SoLmbSrHabkFVlqa14fIR9VwmyujgTLGAap3mxWqSRrMhKgF0fNXVeEXILXmBOIlYZOX5GFFZVTWV0VXdGVIV1fY1DLDIrnws4SGaGYUYaOJlVLJxFc5kXk3VoRymQh65ELHVWK3GvX3ZGvKu/ukUXq8PBlJZDsJ82yEU5qp9eDMGmbGeijNREmFYiwb3PPAKhVRThRonYK5JCpYWnQjaUn+V+GjOtThhAEgWMhxlaljRkMKbNCQsKBY3MQAjwSBdQVWThi5AABoxpQm4Ju0cMhwUUBNodUeXLBrgigPTheHkkx8JQGSIOyQHDwv7JkzKQ9FqHQ2WRfDKYSMlR4CbIoyR+ojhJAEkELwMXiKg4BEcKmlE0wOBHZKJUqaOOsEiUCSudBBF1aom41ufUuydXcL3Esm2VFQWQ5UhAAC9eEoGj5LiwolevKgLAkmExwfDPGgkkP2FRLx4MXTgsW8CxV8uMRL1m6tJQ+KeMTWsKBJrnKsVJEhpdaUihGpkGEhE0NxLez53x48jJUEjAvLnz5k/Dsc0KacU0pBix+WXmToaO7+DDh0/Ql9JfXCSprQjwnb0O9+zjI7iZvf6nFemRLXi/gb///v2hYINj1Q2EDjIy9KeDggrG995nJaTQUUcpwEChhTAk5s501P5lEl1yIIYYolyckNgIAxucYKIaLGxwjC4EeAAAADVQg4MJBmwwSCMRPDDjjAeUxuIGBuBoAgS0bVHCDT822QKMBhQppQkkNJQFCyFw0GSTDwgpBgM6GDmlATTgsCIRMhyw5Y8uoECcGKnQIKaYOuRHBAUDrDkjCDRYyYOXUXDFAAEmzCklCn4SIYGeAEiQngY7BACoWig0cAkEhuJoARIgrHnCCkdY4IIHH8jwphA2GSBBDBmUQeSclh7RQZMcvEDiDB2MOuoOZ2pgQAyrSnCDkIBUIGYISAigJQAmGGXEBrp60OYQBGwAQQgbTDBEDcB2WxUSMxBqQAMaSiRAktxFJCDtuh9UtMED8D6ArBAs3BCsBAqUK9EFk0qhQrQugDrEu/HOK0QG3QJr8HErrDuqCkUQDO/CPDTQ7aqfHafBAw57kJ7E8haRwsUxVHDqGggAvIERLcDbQchFQHCxBAKHU8IBDncAmxA6xAtzWQokjMHOrjQAcI3P+kyxECSQjEI4BXTM6xEtF6zWr8EqQLQfAgDc6hE9W32ECMECm5srM5yw7g1OgLz0EC10i8GZZIgwwgEGbC3Euy//LFEACtBwtohwK024GmHD+8LhZGTgM1mMbyGDCjfUjEwQACH5BAkGADgALAAAAABAAEAAhQQCBISChMTCxERCRKSipOTi5GRmZCQiJJSSlNTS1LSytPTy9FRSVHR2dDQyNIyKjMzKzKyqrOzq7GxubJyanNza3Ly6vPz6/FxaXDw6PBwaHExOTCwqLHx+fISGhMTGxERGRKSmpOTm5GxqbJSWlNTW1LS2tPT29FRWVHx6fDQ2NIyOjMzOzKyurOzu7HRydJyenNze3Ly+vPz+/FxeXDw+PBweHCwuLP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+QJxwSCwaj8KCTCZCOp/QqFOkqCpc0qx2m2hVW6WteHxkfU0JsrroEihYF6dZYVKkkSeISYBdHy91XhByCl5gTh9WFjN+RhJWVU1ldFV3RlSFdX2NQyctJp8KMkhmhmFGFzKZVSecRXOZFZN1aEclkIeuRCd1ViZxr192Rryrv7pFFavDwZSWQ7CfMchFM6qfXgvBpmxnoozURJhWH8G9zzgCoVUS4UaJ2CaSQqWFp0IxlJ/lfhcurU4WQBIFDIcZWpYuWDCmzckJFwWNuEAI8EgXUFVk4YOQgAWLaUJuCbtHbI6FTUVU+YoBrgggfTJaHpmxMJSFiENmVOj1SQD+Ep69ZLQzkq8FEykzCtQEWUSESkgmkEDwMlDBh4pDZJSQGeUCC35EFiTKFG/QkRNjsflKEBGnlognEvSq+sGtuKdq6RRANiPGQrKgTByNotNEr7kKBHAlc0LluiommGY5US8eC11zMH6Co8ZFoqCL1Shc9wGlmgKB5rnKJ2qvrgslYlKjWSF0I9t+cLvbzbv3ExMTDAgfTlw4Cd4JBChfzlz5hyYIAEifTp36CN4ySJCgoJ379u7bSxyoTn56Ct4CuKv/vp57i/HlyZ/f/YG9/fYRosevfn23hfsAUhCGCSMUZ6ABx+2WXHMMPufbgxBGOIRdt7lzwgMZUCjaCgL+aDhGCzdooEEI1HzQQQcrkKQGCxuIKKIKHm5xwgoBdFAjDEONIcEILvbYgS4KnNhBCicGoABWXSFgQ4891oAkYwjUKCWRHXjwgW5DmKACkxoAoMEBMGCpxQwfPECljTamgIBGSEiAApci2tABVk9OFpYCNQ4p5Ikh1IkDBlx6iYJkOJyAAgJ+InEBAR44AsOUUnYQARI9eqlBDaMYEYIDNzBggphkNiCcT0aUgACVRAbQ6BE19HgACaG5UIMKDtSKgm4XpEDcC3VeIIAHaXZAARIfHCBiA6YR4YEKN9TqAAxDtPAAdw9EJUQEwtEg3KRILNBCjQ+4doRnqpVKa63jN2xQ0AMbtLtBgoW+QNwI5RaxQAwxRmEAs7SqkKkQ7LqLABECDKftsL7J4GyzBhTBLgjtDkzEA9oOpyI1F2zAab9sAtwuxAgPUUFxKYipBgzOcrrqxO5uIDERFAiHwai7SVDDxg4MkGzAIDtS4HAvNERNBwurQKIRAUd8hALE0cAtMiLQegOtKNjlwQYQu/yHvMONILQrEKR8A6lIt/xyERDILFzHnCxw89QTOJG01kg8AHS+YrCAQQYNfO0w1kp3i8AIAbAtIQ5zn324FisAvkHIi2shQMtmRb6FBSOMYIE7QQAAIfkECQYAPQAsAAAAAEAAQACFBAIEhIKExMLEREJEpKKk5OLkZGJkJCIklJKU1NLUVFJUtLK09PL0dHJ0NDI0FBIUjIqMzMrMTEpMrKqs7OrsbGpsnJqc3NrcXFpcvLq8/Pr8fHp8PDo8DA4MLCosHBocBAYEhIaExMbEREZEpKak5ObkZGZkJCYklJaU1NbUVFZUtLa09Pb0dHZ0NDY0FBYUjI6MzM7MTE5MrK6s7O7sbG5snJ6c3N7cXF5cvL68/P78fH58PD48////AAAAAAAABv7AnnBILBqPwkIuV0I6n9Cos7SoLmjSrHabmFVnqa14fIx9VwmyukgTLGIap3mxWqSRrMhKgF0fNXVeEXILXmBOIlYZOn5GFFZVTWV0VXdGVIV1fY1DLDMrnws5SGaGYUYaOZlVLJxFc5kXk3VoRymQh65ELHVWK3GvX3ZGvKu/ukUXq8PBlJZDsJ83yEU6qp9eDMGmbGeijNREmFYiwb3PPQKhVRThRonYK5JCpYWnQjeUn+V+DCIFTxhQqpIDWA8ztCxpyGBMmxMWNAwaEfAAAAAT7Ugtk4UvQoIYMaYJuSXsHrE5GTYV8WDRYgcEEjutCPTtSapVGWIK0XGh1/4nAUhAtGzpYcWRfKLm2SzAcIbIIiVUQaKDRMLQoRI4EsmRQqfNGPyI+DsTb9CREgOutgTRwqEQr1IkskjQa+oCEXCFTPig1uILG3nF6LjRNBO2HBmhsAjRoS8AB60asXDjhVaVFU+zFMDQ14SuCGQLJYg8RoSLoQdINwJUV4TbNQReWLRBDSkTZAxaeAg8xloKcNRU6wLurrjx41ty7GjQgrnz5tAJGL+RoLr169VTtLPx4UX3797Dd99gvBQow6u8FHABvr34FyGMJ4BU12edHOzfu//wIX7xLqCch81UOVig34EvkFccLJdZEc8CAOWwwXMURjfdRynEkCGG1v6loBRyIIYYIm9kEKcLCwgoYOJqJMCBzAoSOODAAtSkgIIFJGSmRgoGyCijDCRmwQIJFtyIwhVqULCDj0zCoIsIRhZpgQUCCAeFBjZwwCSTKlg5hgYTRBmlDQmseEQOMW7pgQs8zGBmiQnYIKWYEwDkBA0VbOmjCzCo5mVcuwgw56DHHJGnmi7UoKMOFQC2BS8WOLKCmEaOcoQLTK6pQlhEzCCDBCYI8CYRGsSAwA47xHBEAQQMioJ0R6iwJw8keEmDCjJ8KkMFo/agwamoBgCBlzrEMKWRM5DCgwMuhKBSESjkKsGnEwyxAo5EWtpDBsFusEMGDxX4amInfVjEDeTSfmqCQTaYYIC7JAyhAQQ7eLtDAM8WwUAJQT6xg67TAjWEDe++Cys99967QbzIiSDBtNMqOIQF7sJbhAX2oqojNRoYkK4MOlJcMMNDFNBtADAZNwHAMkR6ccEmHDzEBKjWbFY4NCgAMAb5ElyxzEIwEIDCO0Dwmi4wsJysESJbPFHGOxhFDQXpSlCBVz4b/AcMQwewQQBHNxIDyzcXkXXMSKRQb83m+sGCChAH4MTZQBNhQ9cQ9KtFChUoEELYA8Nc9xAMEBAACnaKaLbgiqvRbsHVNj5GDDCbJLkWAgQQAKe6BAEAIfkECQYAPQAsAAAAAEAAQACFBAIEhIKExMLEREZEpKKk5OLkZGZkJCIklJKU1NLUVFZUtLK09PL0NDI0dHZ0FBIUjIqMzMrMTE5MrKqs7OrsbG5sLCosnJqc3NrcXF5cvLq8/Pr8PDo8DAoMfH58HBochIaExMbETEpMpKak5ObkbGpsJCYklJaU1NbUXFpctLa09Pb0NDY0fHp8jI6MzM7MVFJUrK6s7O7sdHJ0LC4snJ6c3N7cZGJkvL68/P78PD48DA4MHB4c////AAAAAAAABv7AnnBILBqPwgIOR0I6n9Cok7SoLmTSrHabiFVjqK14fHx9VQmyuiigdRQUp1lVTSNXEZUAuz4ydgCBInILMSoxdkchVho5fUY4gZILSGZWiUVUhXR8j0M2koEWG2WbYEcbOJtVK55FGaEALqV0C5hDKFaFYa5EJB2hO51Dloa3PSt0hgsqpL1EILEGRpZ11MybNs9FGzyxL0Vdh7ZFMmcLOI7bRDGxA0XVp0QCy1Vx60UDsRNE1WhENqwYCvEITxM5sQ60EmLGEKIhGzSsUsHgyQoZzo5EMPHhg4NhRQzEAvHpRYIEL7QJyYVN3pEVljSAHKLjw4OOJi5kJCIDkP6kUU9ySPSCbueQHBhqFSJ4pKNNpzpwHHER6MAIdUGVGFKZSeI5FUhS3Ox482YGrkI2WJixMMuGFwKMMFh0rgq4IyQUPHVqk0eAikNmZsHaY0OCWvUGGi2igoXNsjw6Wrjaa4MNZVWUqcBxD8oKFxwf8CjbcUDbNamsYGaGVgqJCpFFP3XQq+EhZQlOb3kh4ekDHYA9RdQVQrCYESxEj9hmwxCOAs9WgNCxuE8OHBiqP9Lehzu+7+DDPwkBAUQA8+jPq48B3sbJ9/Dfo4gzoQGNBvjz68dP8nuxcQ4VYkUBIuRHAwv3HZggCw2cAF4CumCT2Rk4SGAfg/hh2ACGNP44+J04AYZYCw4jGIjghQs20B8+1UzooiHQkQfCjDTWeB4/37mHEgomvcDjjvOJJ+SQREKED2G9rEBACd6NIRQGSPaBQwYSiCDVMwGhc1AfGMxQZZUGNKlFREQtUJwaMrggwZcirFlDbS1dohsUG0ygQJt4fsmWcKqssowKrTkRwg1sspmBBmK6dZlS9XD2hAwe5JknDBcEV5gaO61wWGJWRDCnEAFI+mUA0BGRgwcxJAoRDuwVMdcqq9xlxJqSlhDBERrcYEALEURpxAYojHDBCRjgpUpiGiBRApsppPpSBQboekMA3m0g7AnDElAdUpotENcRKKTQ5gmWFkFAtPzogiVECBOooMIETPUQAbb03nrHC3SoYFwPDKCwbw8FoKtrCxlN4MHBHlCSFgH0XnDBvxf5ugUEAhtgrxAxeBCAxgqvNOzHyYr3grTRzkKEwR60kHARMXyMbanfbdBCxTBjrPHBHQtBgssnTCCxJypUvFwRBrcQQAs5C4HDx8Pysg4DJQhcwZwGH72yqy5fUMOnj9RQccgsI3w1PFnH24sMBgjsga9VG520ECuM0PAFXKuBAsk3HGMzwm8LYUPWnbmywgzSenhE22MbsQC92q6DgQclVOpExkYnXkQyF8QQeJFCIN4351HEYLUH6oLOxcEbF2u6GPNeIOszQQAAIfkECQYAOAAsAAAAAEAAQACFBAIEhIKExMLEREJEpKKk5OLkZGJkJCIklJKU1NLUVFJUtLK09PL0dHJ0NDI0jIqMzMrMTEpMrKqs7OrsbGpsnJqc3NrcXFpcvLq8/Pr8fHp8PDo8HBochIaExMbEREZEpKak5ObkZGZkLCoslJaU1NbUVFZUtLa09Pb0dHZ0NDY0jI6MzM7MTE5MrK6s7O7sbG5snJ6c3N7cXF5cvL68/P78fH58PD48////AAAAAAAAAAAAAAAAAAAAAAAAAAAABv5AnHBILBqPwthoBEI6n9CocwGoAmjSrHY7swJg27D4ePGKxugiZHAQvZxl6xmZgZwE7/TxNeL4Z3BmTh4LhRg1ekYCfownSHFVc0YhhS4nLnmJQwWMfiqIRpAAkkQ1GIWFJxmaRTB+AH4kZIJGFpWXCaxFIZ0cI5lDoqRCKCeoC6q6RSS9KUYmtEQJCy7UJzLKRSgqr34lRcJFL6jGNKDZQye9JkXQckUC1NYT6M+9LkRd75vkCxCJKBLQc8KilwoUwaJlwGCp2gkGT1C8WIWExYARKjoAK5KiG4cVQ1aYEEHBhCwhJY65+IYEBQtDG4cocKDCgYMBBM4ReXGg0/4NikhMWVtAA2gpC8asCUBS06ZTEx6OMOOgwoXOoAVoVMM26dQxZEhgOB3rAEaBIjVu2ECoJeDSIgwI3bK0gAWSCSLIOlWxgq2QmFl0ZmCRlG4lCH6P0PhQE+PYDwuM6qkhw6thSzQGQkER44ZemyYSo8lAQx4ya9fChLDRuKmDDrpeWqPLQrIWFjNctxCdZuExD4DDnPhgE58yGZjP6kJBosXVRDVoWHiuybYm6vWya98ehUUFBCTAiw9P3lF2GQnSq1+fvgS9BRFaxJ8vv378k/WmVWs4u9KCAiLQJ6B9LRCgnWxJnYYKXTQESOCA8RmYnX79NZRgaQ9mGAF+6P68lKCCt/yHAwskkDfeiebVg14CLJTQIgsslpCAjCFwZ+ONOA6BnR7WAeSCDTuOQdp0yniQggEiRHVcITTUmIgMHYiApAEa9CiGb6gAhwYDMVAwpZQiSBCbPNUUkgBvT2RwgpdfTtmBlW3Fc5qFqUnBggZIgjllAwLAuUUGMhjzIZOaHcHACm2CSYEEifnphFEBXUJmUoghsYKeeiLgpI4IYOAoEYO9tZMHgvpXFxJeYmoDS0V4YIMNCCQQpBAZFHCCMVztUtplGCBhg54wHGJoBwFo8CoJcAqFiqdHZIDUUKIWYQEMIogAAkRILPCqDQHYIGoCGHggAA25oNQfq+BGuCRocDigYAG2SITQbbGwAoUBCRXgK+pCCT4U0QuzRhHDq8auSgQN+eYbrQz9/cNdCfNyK+EQ9yYcLQ5yolIoOhkgULAGAWwqBAYJk3DxCxa6YI52ArxK7wJG0ICvvkbIhkqu2TDQwbYBdADvEAjPfHG7xtCVDDo/0muDkkWQLPQRJXxYrjIvdOsyAtbJbPERQln4qRYycGusBhYgUTHNR1CSILtjoPCAsQE0YXbJQw/hwX7CZiNDBXGjKUTQCjuBgh145GjE2RXUbXgUgJPA9OJgl6wc5Fsk4IIEZaMTBAAh+QQJBgA7ACwAAAAAQABAAIUEAgSEgoTEwsREQkSkoqTk4uRkYmQkIiSUkpTU0tS0srT08vR0cnQUEhRUUlQ0MjQMCgyMiozMysysqqzs6uxsamycmpzc2ty8urz8+vx8enxcWlw8OjwcGhwEBgSEhoTExsRMTkykpqTk5uRkZmQsKiyUlpTU1tS0trT09vR0dnRUVlQ0NjQMDgyMjozMzsysrqzs7uxsbmycnpzc3ty8vrz8/vx8fnxcXlw8PjwcHhz///8AAAAAAAAAAAAAAAAG/sCdcEgsGo9CUS6nQDqf0KgT0+g0dCCpdsuVdb6NG3dMPlasX1V5XXxtOKqFk/RNO0chCEvCRi5yD4EyTjJVVWpIAwCLDSl9RhKBkgJIZ1Y6iEYwi5x8j0QjkoErGUd0aJlEKTqcAB4jn0U3og8iZpcdqUMfrQAVsUUUgJI5ckWnh0YFLa0tMcBFM4ElLA8fRmdXDbo7OL0m0EUpISzVDywXx2CYRSC9JaXhRDW0JEVeV7lENiy9KPJGSEyrVoMIMn1DZvQK8SjFiWdOLgQyF8KRkGw6tg1J0aCVh3ROUsSId+TEhhAhTBg78mHggxlDTJBQoYIETCEaenHb+EKB/gIMELGhRLkBho0jMXKYe7DiaMgDrRodyXABhU8YKCgdQTlgaIgKnoqICBQChdMnKWawAnCzyIgaPuMq+HckwNCuQwPAIpIhhAuLWhaQYHFWyAIQVxVgxRq2SAwNXgc46OpgBuAdl7ms3JEhwVWrc32CIHlEgAGvXjdgIN3HBg2rWD/DqEFBSoYJDkJIxotSRuYyGeDKjY2CxhgKCHJzRWkBmATFikG/YL3lBAOvBn6vyYAhtAIQQdlgOBkCQzgaimvsjZWBQAXqfYJfKAwM/iP7APPr3w8lgQgCAAYoIIAF5UdDAggmqCCCJ9RWgwEkQChhhBRCaEt+PUUHg4bQ/vlUgAYThlghCTDo55lcoHmHVQ01iehiifklsBgKGy4WnU81PDiiiyQQoF+GcaUIGlYF7OBfgDP8NwMBSzKpFUAHJvDCCS9ISaWVDfKn5ZZcDkEfewBxh8CX8dUwHzQvuHDDDS+ch+N6bIxgwQ0BaHADAviNwV2HIGymGQxrrhnAmubFAmSHCWjnRAYCfCConYFakKcWKdRAo1WwoVCcFicgEGiddGoQgQSTbuEaBjWmqABtaBHwKaQBBIACaaUiQZpDQyamgASKuhrqowTUxtcEIJC56AtPDhEDYpnG1eYRgdpZJwIgFZGACRaIYFwUNhTQnQLbugVXpjAUaoQJ/nUO+sFoR6RlAbYmTGCsEHvGttpUVQWZLBEFDBqAAn4SIQC87z67Aw0SnCBluCfEhdUJIfVUbnhFZEBDwETE8O7GIpx1aAJDcBfbXBhvFMO8WihAsAlFDiGxYhAP8VpijRm4MbZNEJGhVSALPLICwuZngwg3W0DxyzDErKxsNaDcxwtF77tDT6D1rLNc4OaXggU3W2ZEhlhZvVGzswI08MYWiO2yXGoLcYKqbT+ywM3xwicxjXHbANeMtW4xwsotf802EiNgTfF9M2xM1xFgoxC3ECAshoHTZIwwwQwYKDq1TzxHnNXhXSKtdJdjnGjV6KRvUUCHQafOBQ0C1BA4AzRBAAAh+QQJBgA+ACwAAAAAQABAAIUEAgSEgoTEwsREQkSkoqTk4uRkYmQkIiSUkpTU0tRUUlS0srT08vR0cnQ0MjQUEhSMiozMysxMSkysqqzs6uxsamwsKiycmpzc2txcWly8urz8+vx8enw8OjwMDgwcGhwEBgSEhoTExsRERkSkpqTk5uRkZmQkJiSUlpTU1tRUVlS0trT09vR0dnQ0NjSMjozMzsxMTkysrqzs7uxsbmwsLiycnpzc3txcXly8vrz8/vx8fnw8PjwcHhz///8AAAAG/kCfcEgsGo/ChUK1Qjqf0KhTUHM4XBGpdsvduRzVF3dMPnLA31B5XUxVVBCGs/UFq5EU3GEEYyNZGRKCAU5nNWlOCh8PHzUsfkYwMRIxk1lHdFYOd0YrjB+LfZBEFJWUEhUbZmibRywuoIw9M6NFCKeVMqtfNZxECJ+gLbVFFCq4GbRFHFVXvkIlB4uLNcrEQxOTkxIoRhwuh61FFcEPNtdFGya4MTfLmr1FMKDTPDroRSK4EhzL4eJDJHx60CMHPm/aKAkgYgjREBKxFpmAxOKGHCc3EsYwoErINyvxhLBwMPBEiiclRDxCgqGBARMkLh5BsW/CEBstQoTgYFNI/oBYPR48I1LCAAAAD0QZ2fHyJY0cHYswUJGQRlRXsD45chXCw9GjLpBUaGri5Y6TRmRQMiDgKpINJLKSOCLjwNevD5C8KMvXwEsEFNJVuLBSC4sWMSKNuHtXBRIGEPqa4FthQmEfl7nI9DGjAgjGXyVYOwKDA1m/LxuIcMtmAwKvoAGcaBJlwwIaLyeTDcCazAwLsQF4eNHbyQwbZU/PrZUhtonAZW5AIMshM5sZPe7yUMpGRIOyItAhONqjZy0WMnbcu8biwA7ro4r7kX+wvv37TzCsWMC/v3/+lxx0QwIEFmgggSkEFsEODDbooIO0HQQDfzKsIMMCFV54IX8F/rywQwAMgvhhiCFqYF8CFfa3H38rVpjDCwFwwCAHMX4oY40m1pfAfhliaKGP/OUQwY0yPthgAAvYN6F/Ky7Q4goF+KDff1QuECA+A8KQgpYwJMBlCgkkiN+YZJY5xHro0LfGBhGQgGYtG+SAwZuQYEAAChegRcwNQZYwCgUy4Imnm8RsoIF/IozGBQs5CHqBoFf6MaGG/SUAnxM6wHDBo5wKKoOaUjDqpJMZrrCCO1LcQEKnnRKg5yg63KDBhv/lAN0fK2zqKJ4XrEYEqG8RwcKOPqYI4KW5orDrBSso6kMOKdAJxQYwLFTEDCI0qeEKkQ7BaacTRGkEBkGKC4UO/gUcugCqRZSQA5AsIjHBo3jakEBvLDS5QA7S/vruhhr0tsGUPlprRAk2bCrApT4kQOF+GAxxQwRgwsBuCv1V+GoRLMCwX7NObFDCZkYwAK8GaC7JXwJDGGrsCiRzPEO/XIiQ8Qp+DjEphq/e0KKVY5bw8ALhEbHkfiwTIYCxC9x6kA7qWggyEQ5ruPEMD8vAr33kGpu00Swu8LXO/7GLTr4UOsnazjJsjBmPHwM7xtEYmk32qGMPkYK+eY/CQtorGERa2n37AHWxK8itBQU352wEiisW7oPQTTo7n9RAI7FkhZL7IIKGKONDgQDcMqxy206wEMEKAlheJt2dmwlFEtU8y15GAaM2bXt0OeTg+DVBAAA7',
				speed: 0,
				msgText: '',
				finishedMsg: ''
			}
		}, function(newElements) {
			var $newElements = $(newElements);

			$newElements.css('opacity', 0);

			for (var i = $newElements.length - 1; i >= 0; i--) {
				$($newElements[i]).addClass('is-fading-' + (i + 1));
			}
		});

		return arguments.callee;
	})();

	// Count to numbers
	$('.js-count').countTo('stop');

	// Fade in portfolio images when they become in view on the screen
	$('.js-inview').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
		if (isInView) {
			if (visiblePartY === 'top' || visiblePartY === 'both' || visiblePartY === 'bottom') {
				$(this).addClass('is-inview');
			}
		}
	});

	// Control video player in about page
	$('.js-video-player').on('click', function() {
		if (this.paused) {
			this.play();
			$(this).prop('controls', true);
			$('.js-video-play').addClass('is-playing');
		} else {
			this.pause();
			$(this).prop('controls', false);
			$('.js-video-play').removeClass('is-playing');
		}
	});

	$('.js-video-player').on('ended', function() {
		$(this).prop('controls', false);
		$('.js-video-play').removeClass('is-playing');
	});

	// Enable gallery on member page
	$('.js-member-gallery').slick({
		arrows: false,
		accessibility: false,
		draggable: false,
		autoplay: false,
		speed: 0,
		autoplaySpeed: 500,
		pauseOnHover: false
	});

	var $teamMembers = $('.js-team-member'),
		$membersDescription = $('.js-member-description');

	// Start gallery when hovering over member picture
	$teamMembers.on('mouseover', function() {
		$(this).find('.js-member-gallery').slick('slickPlay');
	});

	// Pause gallery when hovering out of member picture
	$teamMembers.on('mouseout', function() {
		$(this).find('.js-member-gallery').slick('slickPause');
	});

	var lastClickedMember;

	// Display member description below the clicked member row
	$teamMembers.on('click', function() {

		var $teamMembers = $(this).parent().find('.js-team-member'),
			$memberDescription = $(this).parent().find('.js-team-description');

		// Toggle class for styling
		$(this).toggleClass('is-active');

		// Calculate how many boxes will be in a row"
		var windowWidth = $window.width(),
			boxWidth    = $teamMembers.outerWidth(true),
			boxesPerRow = Math.round(windowWidth / boxWidth);

		// Get the index and column of the clicked element
		var index = $(this).index(),
			col = (index % boxesPerRow) + 1;

		// Check if description box exists after clicked member
		if ($(this).prevAll('.js-team-description').length > 0) {
			index--;
		}

		// Calculate the last element of that row
		var $endOfRowMember = $teamMembers.eq(index + boxesPerRow - col);

		if (!$endOfRowMember.length) {
			$endOfRowMember = $teamMembers.last();
		}

		var that = this;

		// Hide main description box and display the description for the clicked member
		$memberDescription.slideUp('fast', function() {
			// Close member description if you click the same person twice
			if (that !== lastClickedMember) {
				$memberDescription.slideDown();
				$membersDescription.addClass('mfp-hide');
				$memberDescription
					.find('.js-member-description[data-member-id="' + $(that).data('member-id') + '"]')
					.removeClass('mfp-hide');

				// Insert main description box after the final member of the clicked row
				$memberDescription.insertAfter($endOfRowMember);

				lastClickedMember = that;
			} else {
				lastClickedMember = undefined;
			}
		});

	});

	// Animate service boxes
	var $servicesContainer = $('.js-services-list'),
		$serviceBoxes = $('.js-service'),
		lastClickedService;

	$servicesContainer.isotope({
		itemSelector: '.js-service-box',
		masonry: {
			columnWidth: 1,
			gutter: '.js-gutter-sizer'
		},
		filter: '.js-service-box:not(.js-service-box-hide)'
	});

	// Toggle service boxes on click
	$serviceBoxes.not('.js-service-related').on('click', function() {
		$serviceBoxes.removeClass('is-faded is-active');

		// Refocus all service boxes when clicking the same box twice
		if (lastClickedService !== this) {
			$(this).addClass('is-active');

			$serviceBoxes
				.not('[data-service-name="' + $(this).data('service-name') + '"]')
				.addClass('is-faded');

			$servicesContainer.isotope({
				filter: '.js-service-box:not(.js-service-box-hide), .js-service-box-hide[data-service-related="' + $(this).data('service-name') + '"]'
			});

			lastClickedService = this;
		} else {
			$servicesContainer.isotope({
				filter: '.js-service-box:not(.js-service-box-hide)'
			});

			lastClickedService = undefined;
		}
	});

	// Toggle footer menu links on mobile
	$('.js-footer-toggle > li > a, .js-footer-toggle h5').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('is-active').next().slideToggle(300);
	});

	// Toggle top menu on mobile
	$('.js-menu-toggle').on('click', function() {
		$('html').toggleClass('is-menu-open');
	});

	// Send recruitment form via AJAX
	$('#recruitment-form').on('submit', function(e) {
		e.preventDefault();

		$.post($(this).attr('action'), $(this).serialize(), function(response) {
			if (response.success) {
				$('.js-form-wrapper').html('<p>Your enquiry has been sent successfully.</p>');
			}
		});
	});

	var delay = 0;

	// Add transition delay for top menu items
	if ($window.width() <= 945) {
		$('.js-top-menu > li').each(function() {
			$(this).css('transition-delay', delay + 's');
			delay += 0.1;
		});
	}

	// Toggle top submenus on mobile
	var toggleTopSubMenu = (function() {
		$('.js-top-menu').on('click', '.menu-item-has-children > a', function(e) {
			if ($window.width() <= 945) {
				e.preventDefault();
				$(this).next().slideToggle();
				$(this).parent().toggleClass('is-active');
			}
		});
	})();

	window.recaptchaCallback = function () {
		$('#rc_hidden').remove();
	};

	// Disable transitions until page loads
	window.addEventListener('load', function load() {
		window.removeEventListener('load', load, false);
		document.body.classList.remove('load');
	}, false);

	var map = [], markersLondon = [], markersYorkshire = [], $maps = $('.js-map');

	// Render google maps in contact page
	window.initMap = function initMap() {
		// Base configuration option, center on london office by default
		var mapConfig = {
			zoom: 15,
			center: { lat: 51.499864, lng: -0.080793 },
			scrollwheel: false,
			streetViewControl: false,
			scaleControl: false,
			panControl: false,
			rotateControl: false,
			zoomControl: false,
			mapTypeControl: false,
			styles: [{
				stylers: [
					{ hue: "#c1e6f3" },
					{ saturation: -40 }
				]
			}]
		};

		// Render custom SVG marker
		var icon = {
			path: "M19.667,0.008c0,0-19.667-1-19.667,19.5s19.667,45.667,19.667,45.667s19.666-25.167,19.666-45.667S19.667,0.008,19.667,0.008z M19.666,30.841C13.775,30.841,9,26.065,9,20.174c0-5.891,4.776-10.667,10.666-10.667c5.892,0,10.667,4.775,10.667,10.667C30.333,26.065,25.557,30.841,19.666,30.841z",
			fillColor: '#393939',
			fillOpacity: 1,
			anchor: new google.maps.Point(19.667, 65.175)
		};

		// Render map and markers in each DOM location
		for (var i = $maps.length - 1; i >= 0; i--) {
			map[i] = new google.maps.Map($maps[i], mapConfig);

			markersLondon.push(new google.maps.Marker({
				position: { lat: 51.499864, lng: -0.080793 },
				map: map[i],
				animation: google.maps.Animation.DROP,
				icon: icon
			}));

			markersYorkshire.push(new google.maps.Marker({
				position: { lat: 53.6792343, lng: -1.5485181 },
				map: map[i],
				animation: google.maps.Animation.DROP,
				icon: icon
			}));
		}

		/**
		 * Change between the Yorkshire and London addresses
		 *
		 * @param int index 0 = Yorkshire | 1 = London
		 */
		function setAddress(index) {
			var coords;

			if (index === 0) {
				coords = { lat: 53.6792343, lng: -1.5485181 };
			} else {
				coords = { lat: 51.499864, lng: -0.080793 };
			}

			map[3].panTo(coords);

			// Reset the markers on each map so they animate
			// everytime you toggle between addresses
			$maps.each(function(index, item) {
				markersLondon[index].setMap(null);
				markersLondon[index].setAnimation(null);
				markersLondon[index].setMap(map[index]);
				markersLondon[index].setAnimation(google.maps.Animation.DROP);

				markersYorkshire[index].setMap(null);
				markersYorkshire[index].setAnimation(null);
				markersYorkshire[index].setMap(map[index]);
				markersYorkshire[index].setAnimation(google.maps.Animation.DROP);
			});

			// Push top maps a bit lower to make them seem
			// as part of the main map below
			coords.lat = coords.lat + 0.0186;

			map[0].panTo(coords);
			map[1].panTo(coords);
			map[2].panTo(coords);
		}

		if (map.length > 0) {

			// Set the center of the top maps a bit lower so it looks
			// like it's part of the map on the lower side of the screen
			map[0].setCenter({ lat: 51.499864, lng: -0.080793 });
			map[2].setCenter({ lat: 51.499864, lng: -0.080793 });

			// When the user drags the main map move the other ones around
			// at the same time so they look like they're the same one
			map[3].addListener('center_changed', function() {
				var center = this.getCenter();

				// Push top maps a bit lower to make them seem
				// as part of the main map below
				map[0].panTo({ lat: center.lat() + 0.0186, lng: center.lng() });
				map[1].panTo({ lat: center.lat() + 0.0186, lng: center.lng() });
				map[2].panTo({ lat: center.lat() + 0.0186, lng: center.lng() });
			});


			// Set the London address as selected by default
			$('.js-address:last-child').addClass('is-selected');

			// Change the center of the map to the selected address
			$('.js-address').on('click', function(e) {
				e.preventDefault();
				$('.js-address').removeClass('is-selected');
				$(this).addClass('is-selected');

				setAddress($(this).index());
			});

			var paramAddress = location.search.split('address=')[1];

			if (paramAddress !== undefined) {
				$('.js-address').removeClass('is-selected');
				$('.js-address-' + paramAddress).addClass('is-selected');

				setAddress(parseInt(paramAddress));
			}

		}

	};

})(jQuery, ScrollMagic);
