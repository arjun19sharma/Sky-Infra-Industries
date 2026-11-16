
/* =========================================================
   SKY INFRA INDUSTRIES
   Website Functionality
   Version: 1.0
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       01. ELEMENT SELECTORS
    ===================================================== */

    const header = document.querySelector(".site-header");

    const menuToggle = document.querySelector(".mobile-menu-toggle");

    const navigation = document.querySelector(".main-navigation");

    const backToTop = document.querySelector(".back-to-top");

    const navLinks = document.querySelectorAll(".nav-link");


    /* =====================================================
       02. MOBILE NAVIGATION
    ===================================================== */

    if (menuToggle && navigation) {

        // Set initial accessibility attributes
        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-controls", "main-navigation");

        menuToggle.setAttribute("aria-label", "Open navigation menu");

navigation.id = "primary-navigation";

        // Open / close mobile menu
        const closeMenu = () => {

            menuToggle.classList.remove("active");

            navigation.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Open navigation menu");

        };


        const openMenu = () => {

            menuToggle.classList.add("active");

            navigation.classList.add("active");

            menuToggle.setAttribute("aria-expanded", "true");

            menuToggle.setAttribute("aria-label", "Close navigation menu");

        };


        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });


        // Close after clicking any navigation link
        navLinks.forEach(link => {

            link.addEventListener("click", closeMenu);

        });


        // Close when pressing Escape
        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                closeMenu();

            }

        });


        // Close when clicking outside navigation
        document.addEventListener("click", event => {

            const clickedInside =
                navigation.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInside) {

                closeMenu();

            }

        });


        // Close menu when switching to desktop layout
        window.addEventListener("resize", () => {

            if (window.innerWidth > 800) {

                closeMenu();

            }

        });

    }


    /* =====================================================
       03. HEADER SCROLL EFFECT
    ===================================================== */

    let scrollScheduled = false;


    const updateHeader = () => {

        if (header) {

            if (window.scrollY > 30) {

                header.style.boxShadow =
                    "0 5px 22px rgba(7, 29, 59, 0.09)";

            } else {

                header.style.boxShadow = "none";

            }

        }


        // Back-to-top visibility
        if (backToTop) {

            if (window.scrollY > 450) {

                backToTop.classList.add("visible");

            } else {

                backToTop.classList.remove("visible");

            }

        }

        scrollScheduled = false;

    };


    window.addEventListener("scroll", () => {

        if (!scrollScheduled) {

            window.requestAnimationFrame(updateHeader);

            scrollScheduled = true;

        }

    }, { passive: true });


    // Initial state
    updateHeader();


    /* =====================================================
       04. BACK TO TOP
    ===================================================== */

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            const reducedMotion =
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;

            window.scrollTo({

                top: 0,

                behavior: reducedMotion ? "instant" : "smooth"

            });

        });

    }


    /* =====================================================
       05. AUTOMATIC COPYRIGHT YEAR
    ===================================================== */

    const currentYear = new Date().getFullYear();

    document.querySelectorAll(
        "#current-year, [data-current-year]"
    ).forEach(element => {

        element.textContent = currentYear;

    });


    /* =====================================================
       06. ACTIVE NAVIGATION LINK
    ===================================================== */

    const currentPage = window.location.pathname
        .split("/")
        .filter(Boolean)
        .pop() || "index.html";


    navLinks.forEach(link => {

        const linkPage = new URL(
            link.href,
            window.location.origin
        ).pathname.split("/").filter(Boolean).pop() || "index.html";


        if (linkPage === currentPage) {

            link.classList.add("active");

            link.setAttribute("aria-current", "page");

        } else {

            link.classList.remove("active");

            link.removeAttribute("aria-current");

        }

    });


    /* =====================================================
       07. LIGHTWEIGHT SCROLL REVEAL ANIMATIONS
    ===================================================== */

    const revealElements = document.querySelectorAll("[data-reveal]");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    if (revealElements.length > 0 && !reducedMotion) {

        if ("IntersectionObserver" in window) {

            const revealObserver = new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            const element = entry.target;

                            element.animate(
                                [
                                    {
                                        opacity: 0,
                                        transform: "translateY(20px)"
                                    },
                                    {
                                        opacity: 1,
                                        transform: "translateY(0)"
                                    }
                                ],
                                {
                                    duration: 650,
                                    easing: "ease-out",
                                    fill: "both"
                                }
                            );

                            observer.unobserve(element);

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


            revealElements.forEach(element => {

                revealObserver.observe(element);

            });

        }

    }


    /* =====================================================
       08. CURRENT YEAR IN FOOTER
       (Fallback for alternative markup)
    ===================================================== */

    const footerYear = document.querySelector(".footer-year");

    if (footerYear) {

        footerYear.textContent = currentYear;

    }


    /* =====================================================
       09. EXTERNAL LINKS SECURITY
    ===================================================== */

    document.querySelectorAll('a[target="_blank"]').forEach(link => {

        link.setAttribute("rel", "noopener noreferrer");

    });


    /* =====================================================
       10. INITIALISATION COMPLETE
    ===================================================== */

    document.documentElement.classList.add("js-ready");

});