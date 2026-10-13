(function($) {
	
	"use strict";

	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.loader-wrap').length){
			$('.loader-wrap').delay(1000).fadeOut(500);
		}
		TweenMax.to($(".loader-wrap .overlay"), 1.2, {
            force3D: true,
            left: "100%",
            ease: Expo.easeInOut,
        });
	}

	if ($(".preloader-close").length) {
        $(".preloader-close").on("click", function(){
            $('.loader-wrap').delay(200).fadeOut(500);
        })
    }

    function getCurrentPageName() {
        var path = window.location.pathname;
        var page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
        if (page.indexOf('?') !== -1) page = page.substring(0, page.indexOf('?'));
        if (page.indexOf('#') !== -1) page = page.substring(0, page.indexOf('#'));
        if (!page || page === '' || page === '/') page = 'index.html';
        return page;
    }

    var PAGE_TITLES = {
        'index.html': 'Home',
        'about.html': 'About Us',
        'products.html': 'Products',
        'product.html': 'Products',
        'services.html': 'Services',
        'service.html': 'Services',
        'blog.html': 'Blog',
        'contact.html': 'Contact Us',
        'login.html': 'Login',
        'register.html': 'Register',
        'dashboard.html': 'Dashboard'
    };

    function dynamicCurrentMenuClass(selector) {
        var fileName = getCurrentPageName();
        selector.find('li').removeClass('current');
        var matched = false;

        selector.find('li').each(function () {
            var anchor = $(this).children('a');
            var href = anchor.attr('href');
            if (href) {
                var cleanHref = href.split('/').reverse()[0];
                if (cleanHref === fileName || (fileName === 'index.html' && (cleanHref === '' || cleanHref === 'index.html'))) {
                    $(this).addClass('current');
                    matched = true;
                }
            }
        });

        if (!matched) {
            if (fileName === 'index.html') {
                selector.children('li').first().addClass('current');
            }
        }
    }

    // dynamic current class        
    let mainNavUL = $('.main-menu').find('.navigation');
    dynamicCurrentMenuClass(mainNavUL);
	
	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var scrollLink = $('.scroll-to-top');
			var sticky_header = $('.main-header .sticky-header');
			if (windowpos > 10) {
				siteHeader.addClass('is-scrolled');
			} else {
				siteHeader.removeClass('is-scrolled');
			}
			if (windowpos > 100) {
				siteHeader.addClass('fixed-header');
				sticky_header.addClass("animated slideInDown");
				scrollLink.fadeIn(300);
			} else {
				siteHeader.removeClass('fixed-header');
				sticky_header.removeClass("animated slideInDown");
				scrollLink.fadeOut(300);
			}
		}
	}
	
	headerStyle();

	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>');
	}

	//Hidden Sidebar
	if($('.hidden-sidebar').length){

		var animButton = $(".sidemenu-nav-toggler"),
	        hiddenBar = $(".hidden-sidebar"),
	        navOverlay = $(".nav-overlay"),
	        hiddenBarClose = $(".hidden-sidebar-close");

	    function showMenu() {
	        TweenMax.to(hiddenBar, 0.6, {
	            force3D: false,
	            right: "0",
	            ease: Expo.easeInOut
	        });
	        hiddenBar.removeClass("close-sidebar");
	    	navOverlay.fadeIn(500);
	    }

	    function hideMenu() {
	        TweenMax.to(hiddenBar, 0.6, {
	            force3D: false,
	            right: "-480px",
	            ease: Expo.easeInOut
	        });
	        hiddenBar.addClass("close-sidebar");
	        navOverlay.fadeOut(500);
	    }
	    animButton.on("click", function() {
	        if (hiddenBar.hasClass("close-sidebar")) showMenu();
	        else hideMenu();
	    });
	    navOverlay.on("click", function() {
	    	hideMenu();
	    });
	    hiddenBarClose.on("click", function() {
	    	hideMenu();
	    });
	}

	if ($('.nav-overlay').length) {
		// / cursor /
		var cursor = $(".nav-overlay .cursor"),
		follower = $(".nav-overlay .cursor-follower");

		var posX = 0,
		posY = 0;

		var mouseX = 0,
		mouseY = 0;

		TweenMax.to({}, 0.016, {
			repeat: -1,
			onRepeat: function() {
				posX += (mouseX - posX) / 9;
				posY += (mouseY - posY) / 9;

				TweenMax.set(follower, {
					css: { 
						left: posX - 22,
						top: posY - 22
					}
				});

				TweenMax.set(cursor, {
					css: { 
						left: mouseX,
						top: mouseY
					}
				});

			}
		});

		$(document).on("mousemove", function(e) {
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			mouseX = e.pageX;
			mouseY = e.pageY - scrollTop;
		});
		$("button, a").on("mouseenter", function() {
			cursor.addClass("active");
			follower.addClass("active");
		});
		$("button, a").on("mouseleave", function() {
			cursor.removeClass("active");
			follower.removeClass("active");
		});
		$(".nav-overlay").on("mouseenter", function() {
			cursor.addClass("close-cursor");
			follower.addClass("close-cursor");
		});
		$(".nav-overlay").on("mouseleave", function() {
			cursor.removeClass("close-cursor");
			follower.removeClass("close-cursor");
		});
	}

	//Mobile Nav Hide Show
	if($('.mobile-menu').length){
		
		$('.mobile-menu .menu-box').mCustomScrollbar();
		
		var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').empty().append(mobileMenuContent);
		$('.sticky-header .main-menu').append(mobileMenuContent);

		// Apply current active class to mobile drawer menu
		var mobileNavUL = $('.mobile-menu').find('.navigation');
		dynamicCurrentMenuClass(mobileNavUL);

		// Current Page Indicator & Title
		var currPage = getCurrentPageName();
		var currTitle = PAGE_TITLES[currPage] || 'Stackly';

		// Remove any active status card from mobile drawer as requested
		$('.mobile-drawer-status-card').remove();

		// Update Header Mobile Page Badge
		if ($('.mobile-page-badge').length) {
			$('.mobile-page-badge').html('<span class="badge-dot"></span> ' + currTitle);
		}

		// Ensure Mobile Nav Toggler is on Same Line as Logo in Header Upper
		if ($('.header-upper .inner-container').length && !$('.header-upper .inner-container .mobile-nav-toggler').length) {
			$('.header-upper .inner-container').append(
				'<div class="mobile-page-indicator">' +
					'<span class="mobile-page-badge"><span class="badge-dot"></span> ' + currTitle + '</span>' +
				'</div>' +
				'<div class="mobile-nav-toggler"><img src="images/icon-bar.webp" alt="Toggle Menu"></div>'
			);
		}
		
		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(500);
		});
		//Menu Toggle Btn (delegated so all togglers work reliably)
		$(document).on('click', '.mobile-nav-toggler', function() {
			$('body').addClass('mobile-menu-visible');
		});

		//Menu Close Btn
		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn,.scroll-nav li a').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});
	}

	//Sidemenu Nav Hide Show
	if($('.side-menu').length){
		
		$('.side-menu .menu-box').mCustomScrollbar();
		
		//Dropdown Button
		$('.side-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(500);
		});

		$('body').addClass('side-menu-visible');
		//Menu Toggle Btn
		$('.side-nav-toggler').on('click', function() {
			$('body').addClass('side-menu-visible');
		});

		//Menu Toggle Btn
		$('.side-menu .side-menu-resize').on('click', function() {
			$('body').toggleClass('side-menu-visible');
		});

		//Menu Toggle Btn
		$('.main-header .mobile-nav-toggler-two').on('click', function() {
			$('body').addClass('side-menu-visible-s2');
		});

		//Menu Overlay
		$('.main-header .side-menu-overlay').on('click', function() {
			$('body').removeClass('side-menu-visible-s2');
		});
	}
	
	//Search Popup
	if($('#search-popup').length){
		
		//Show Popup
		$('.search-toggler').on('click', function() {
			$('#search-popup').addClass('popup-visible');
		});
		$(document).keydown(function(e){
	        if(e.keyCode === 27) {
	            $('#search-popup').removeClass('popup-visible');
	        }
	    });
		//Hide Popup
		$('.close-search,.search-popup .overlay-layer').on('click', function() {
			$('#search-popup').removeClass('popup-visible');
		});
	}

	function bannerSlider() {
	    if ($(".banner-slider").length > 0) {

		    // Banner Slider
			var bannerSlider = new Swiper('.banner-slider', {
				preloadImages: false,
                loop: true,
                grabCursor: true,
                centeredSlides: false,
                resistance: true,
                resistanceRatio: 0.6,
                speed: 1400,
                spaceBetween: 0,
                parallax: false,
                effect: "slide",
				autoplay: {
				    delay: 4000000,
                    disableOnInteraction: false
				},
	            navigation: {
	                nextEl: '.banner-slider-button-next',
	                prevEl: '.banner-slider-button-prev',
	            },
			});
		}


	}

	//Price Range Slider
	if($('.price-range-slider').length){
		$( ".price-range-slider" ).slider({
			range: true,
			min: 10,
			max: 200,
			values: [ 10, 99 ],
			slide: function( event, ui ) {
			$( "input.property-amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
			}
		});
		
		$( "input.property-amount" ).val( $( ".price-range-slider" ).slider( "values", 0 ) + " - $" + $( ".price-range-slider" ).slider( "values", 1 ) );	
	}

	// Lazyload Images
	if($('.lazy-image').length){
		new LazyLoad({
			elements_selector: ".lazy-image",
			load_delay: 0,
			threshold: 300
		});
	}
	
	/////////////////////////////
		//Universal Code for All Owl Carousel Sliders
	/////////////////////////////
	
	if ($('.theme_carousel').length) {
			$(".theme_carousel").each(function (index) {
			var $owlAttr = {},
			$extraAttr = $(this).data("options");
			$.extend($owlAttr, $extraAttr);
			$(this).owlCarousel($owlAttr);
		});
	}
	
	// Donation Progress Bar
	if ($('.count-bar').length) {
		$('.count-bar').appear(function(){
			var el = $(this);
			var percent = el.data('percent');
			$(el).css('width',percent).addClass('counted');
		},{accY: -50});

	}

	//Jquery Spinner / Quantity Spinner
	if($('.quantity-spinner').length){
		$("input.quantity-spinner").TouchSpin({
		  verticalbuttons: true
		});
	}
	
	//Fact Counter + Text Count
	if($('.count-box').length){
		$('.count-box').appear(function(){
	
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
			
		},{accY: 0});
	}
	
	//Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(300);
				$(target).addClass('active-tab');
			}
		});
	}
	
	//Accordion Box
	if($('.accordion-box').length){
		$(".accordion-box").on('click', '.acc-btn', function() {
			
			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');
			
			if($(this).hasClass('active')!==true){
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
			}
			
			if ($(this).next('.acc-content').is(':visible')){
				return false;
			}else{
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);	
			}
		});	
	}
	

	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});
	}

	//Sortable Masonary with Filters
	function sortableMasonry() {
		if ($('.sortable-masonry').length) {
			var winDow = $(window);
			// Needed variables
			var $container = $('.sortable-masonry .items-container');
			var $filter = $('.filter-btns');
			$container.isotope({
				filter: '.all',
				animationOptions: {
					duration: 500,
					easing: 'linear'
				}
			});
			// Isotope Filter 
			$filter.find('li').on('click', function() {
				var selector = $(this).attr('data-filter');
				try {
					$container.isotope({
						filter: selector,
						animationOptions: {
							duration: 500,
							easing: 'linear',
							queue: false
						}
					});
				} catch (err) {}
				return false;
			});
			winDow.on('resize', function() {
				var selector = $filter.find('li.active').attr('data-filter');
				$container.isotope({
					filter: selector,
					animationOptions: {
						duration: 500,
						easing: 'linear',
						queue: false
					}
				});
				$container.isotope()
			});
			var filterItemA = $('.filter-btns li');
			filterItemA.on('click', function() {
				var $this = $(this);
				if (!$this.hasClass('active')) {
					filterItemA.removeClass('active');
					$this.addClass('active');
				}
			});
			$container.isotope("on", "layoutComplete", function(a, b) {
                var a = b.length,
                pcn = $(".filters .count");
                pcn.html(a);                
            }); 
		}
	}
	sortableMasonry();


	// Testimonial 
	if ($('.testimonial-carousel').length) {
		var testimonialThumb = new Swiper('.testimonial-thumbs', {
			preloadImages: false,
            loop: true,
            speed: 2400,
            slidesPerView: 3,
            centeredSlides: true,
            spaceBetween: 0,
            effect: "slide",
		});
		var totalSlides = $(".swiper-container").length;
		var testimonialContent = new Swiper('.testimonial-content', {
			preloadImages: false,
            loop: true,
            speed: 2400,
            spaceBetween: 0,
            effect: "slide",
            thumbs: {
                swiper: testimonialThumb
            }
			
		});
		
	}


	// Single Image Carousel 
	if ($('.single-image-carousel').length) {
		var productThumbs = new Swiper('.single-image-carousel', {
			preloadImages: false,
            loop: true,
            speed: 1400,
            spaceBetween: 0,
            effect: "fade",
            autoplay: {
			    delay: 5000,
                disableOnInteraction: false
			},

			navigation: {
	                nextEl: '.slider-button-next',
	                prevEl: '.slider-button-prev',
	            },
		});

	}

	//Projects Tabs
	if($('.project-tab').length){
		$('.project-tab .project-tab-btns .p-tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).hasClass('actve-tab')){
				return false;
			}else{
				$('.project-tab .project-tab-btns .p-tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				$('.project-tab .p-tabs-content .p-tab').removeClass('active-tab');
				$(target).addClass('active-tab');
			}
		});
	}

	// Isotop Layout
	function isotopeBlock() {
		if($(".isotope-block").length){
			var $grid = $('.isotope-block').isotope();
	
		}
	}

	isotopeBlock();

	//Progress Bar / Levels
	if ($('.progress-levels .progress-box .bar-fill').length) {
		$(".progress-box .bar-fill").each(function() {
			var progressWidth = $(this).attr('data-percent');
			$(this).css('width', progressWidth + '%');
			$(this).children('.percent').html(progressWidth + '%');
		});
	}

	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1500);
		});
	}

	

	
	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       true,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}

	//Add One Page nav
	if($('.scroll-nav').length) {
		$('.scroll-nav ul').onePageNav();
	}


/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
	});
	
/* ==========================================================================
   When document is loading, do
   ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
		bannerSlider();		
	});	

	// =========================================================================
	// Dynamic Auth & Dashboard Navigation State Handler
	// Shows Login & Register if logged out; Shows Dashboard if logged in
	// =========================================================================
	function syncNavbarAuthState() {
		var savedUser = localStorage.getItem('hancock_user');
		var isLoggedIn = false;
		if (savedUser) {
			try {
				var u = JSON.parse(savedUser);
				if (u && u.isLoggedIn) {
					isLoggedIn = true;
				}
			} catch (e) {
				isLoggedIn = false;
			}
		}

		if (isLoggedIn) {
			$('.nav-login-item, .nav-register-item').css('display', 'none');
			$('.nav-dashboard-item').css('display', 'block');
		} else {
			$('.nav-login-item, .nav-register-item').css('display', 'block');
			$('.nav-dashboard-item').css('display', 'none');
		}
	}

	$(document).ready(function() {
		syncNavbarAuthState();
	});

	// Also sync when mobile menu is cloned
	$(window).on('load', function() {
		syncNavbarAuthState();
	});

	// =========================================================================
	// Universal Button Redirection to 404 Page
	// =========================================================================
	// Universal Button Redirection to 404 Page
	// =========================================================================
	$(document).on('click', function(e) {
		// If already on 404 page or auth/dashboard, allow normal functions
		if (window.location.href.indexOf('404.html') !== -1 ||
		    window.location.href.indexOf('dashboard.html') !== -1 ||
		    window.location.href.indexOf('login.html') !== -1 ||
		    window.location.href.indexOf('register.html') !== -1) {
			return;
		}

		var $target = $(e.target);

		// 1. Social Media Icons & Newsletter Widget -> ALWAYS go to 404.html!
		if ($target.closest('.social-links a, .social-links li, .newsletter-widget button, .newsletter-widget form, .social-icon-one a, a:has(.fab), a:has(.fa-facebook-f), a:has(.fa-twitter), a:has(.fa-linkedin-in), a:has(.fa-google-plus-g)').length) {
			e.preventDefault();
			e.stopPropagation();
			window.location.href = '404.html';
			return false;
		}

		// 2. Useful Links in footer and main navigation links -> ALLOW normal navigation!
		if ($target.closest('.links-widget a, .navigation a, .main-menu a, .sticky-header a, .mobile-menu .navigation a, .logo a, a[href^="tel:"], a[href^="mailto:"]').length) {
			return;
		}

		// 3. Mobile view sidebar toggler & close buttons & backdrops
		if ($target.closest('.mobile-nav-toggler, .close-btn, .menu-backdrop').length) {
			return;
		}

		// 4. Page utilities & carousel slider controls
		if ($target.closest('.scroll-to-target, .scroll-to-top, .preloader-close, .owl-prev, .owl-next, .owl-dot, .owl-dots, .swiper-button-next, .swiper-button-prev, .swiper-pagination').length) {
			return;
		}

		// 5. Accordion question toggles (interactive FAQ expanders)
		if ($target.closest('.farm-faq-header, .accordion-btn').length) {
			return;
		}

		// 6. Interactive and functional forms (contact form, booking form, zip checker)
		if ($target.closest('.contact-form, .booking-form, #contactForm, #zipCheckerForm').length) {
			return;
		}

		// 7. Detect if the clicked element is a button, form submit, CTA or button-like anchor
		var $btn = $target.closest('button, input[type="submit"], input[type="button"], a.theme-btn, a.btn, a[class*="-btn"], a[class*="btn-"], a[role="button"], .theme-btn');

		if (!$btn.length) {
			var $anchor = $target.closest('a');
			if ($anchor.length) {
				var href = $anchor.attr('href');
				if (href === '#' || href === 'javascript:void(0)' || href === 'javascript:;' || href === '') {
					$btn = $anchor;
				}
			}
		}

		if ($btn.length) {
			e.preventDefault();
			e.stopPropagation();
			window.location.href = '404.html';
			return false;
		}
	});

	// Also catch form submits (Newsletter forms & search popups go to 404)
	$(document).on('submit', 'form', function(e) {
		var $form = $(this);
		if ($form.closest('.contact-form, .booking-form, #contactForm, #zipCheckerForm').length) {
			return;
		}
		if ($form.closest('.newsletter-widget, #search-popup, .search-form').length) {
			e.preventDefault();
			e.stopPropagation();
			window.location.href = '404.html';
			return false;
		}
		if ($form.closest('.main-header, header, nav, .mobile-menu, .side-menu').length) {
			return;
		}
		e.preventDefault();
		e.stopPropagation();
		window.location.href = '404.html';
		return false;
	});

	// =========================================================================
	// Global Form Input Restrictions:
	// - Name fields: NO NUMBERS allowed
	// - Phone / Number fields: NO ALPHABETS allowed
	// =========================================================================
	$(document).on('keydown', 'input[name="firstname"], input[name="lastname"], input[name*="name"], input[placeholder*="Name"], input#regName', function(e) {
		if (e.ctrlKey || e.altKey || e.metaKey) return;
		if (e.key && e.key.length === 1 && /[0-9]/.test(e.key)) {
			e.preventDefault();
			if (typeof showInputWarning === 'function') {
				showInputWarning(this, 'Numbers are not allowed in name field');
			}
		}
	});

	$(document).on('input', 'input[name="firstname"], input[name="lastname"], input[name*="name"], input[placeholder*="Name"], input#regName', function() {
		if (/[0-9]/.test(this.value)) {
			this.value = this.value.replace(/[0-9]/g, '');
			if (typeof showInputWarning === 'function') {
				showInputWarning(this, 'Numbers are not allowed in name field');
			}
		}
	});

	$(document).on('keydown', 'input[name="phone"], input[type="tel"], input[placeholder*="Phone"]', function(e) {
		if (e.ctrlKey || e.altKey || e.metaKey) return;
		if (e.key && e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
			e.preventDefault();
			if (typeof showInputWarning === 'function') {
				showInputWarning(this, 'Alphabets are not allowed in number field');
			}
		}
	});

	$(document).on('input', 'input[name="phone"], input[type="tel"], input[placeholder*="Phone"]', function() {
		if (/[a-zA-Z]/.test(this.value)) {
			this.value = this.value.replace(/[a-zA-Z]/g, '');
			if (typeof showInputWarning === 'function') {
				showInputWarning(this, 'Alphabets are not allowed in number field');
			}
		}
	});

})(window.jQuery);