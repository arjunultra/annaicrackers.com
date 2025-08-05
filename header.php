<section class="fireworks-header">
    <!-- Marquee Topbar -->
    <div id="headerTop" class="fireworks-header-topbar py-2 text-center marquee-left">
        <i class="bi bi-stars"></i>Diwali sale is open now. Buy early for the best discounts! Happy Diwali...!!!!
        &nbsp; <i class="bi bi-whatsapp text-success"></i> +91 9344811268
        &nbsp; <i class="bi bi-telephone text-primary"></i> +91 7418198019, +91 9344811268
    </div>

    <!-- Navigation with Animated Rocket -->
    <nav class="navbar navbar-expand-lg fireworks-header-navbar">
        <div class="container position-relative">
            <a class="navbar-brand fireworks-header-brand d-flex align-items-center" href="index.php">
                <div class="fireworks-header-triangle-container">
                    <img src="images/annai-logo.webp" alt="Annai Crackers Logo"
                        title="Annai Crackers - Premium Fireworks" class="img-fluid fireworks-header-triangle-logo">
                </div>
                <!-- <span class="fireworks-header-brand-text">Annai Crackers</span> -->
            </a>
            <button class="navbar-toggler fireworks-header-toggler" type="button" data-toggle="collapse"
                data-target="#fireworksHeaderNav" aria-controls="fireworksHeaderNav" aria-expanded="false"
                aria-label="Toggle navigation">
                <i class="bi bi-list fireworks-header-toggler-icon"></i>
            </button>
            <div class="collapse navbar-collapse" id="fireworksHeaderNav">
                <ul class="navbar-nav ml-auto fireworks-header-nav">
                    <li class="nav-item fireworks-header-nav-item">
                        <a class="nav-link fireworks-header-nav-link <?php if ($page == 'home')
                            echo 'active'; ?>" href="index.php">
                            <i class="bi bi-house-door-fill mr-1"></i>Home
                        </a>
                    </li>
                    <li class="nav-item fireworks-header-nav-item">
                        <a class="nav-link fireworks-header-nav-link <?php if ($page == 'about')
                            echo 'active'; ?>" href="about.php">
                            <i class="bi bi-info-circle-fill mr-1"></i>About Us
                        </a>
                    </li>
                    <li class="nav-item fireworks-header-nav-item">
                        <a class="nav-link fireworks-header-nav-link <?php if ($page == 'products')
                            echo 'active'; ?>" href="products.php">
                            <i class="bi bi-bag-fill mr-1"></i>Products
                        </a>
                    </li>
                    <li class="nav-item fireworks-header-nav-item">
                        <a class="nav-link fireworks-header-nav-link <?php if ($page == 'safetytips')
                            echo 'active'; ?>" href="safetytips.php">
                            <i class="bi bi-shield-lock-fill mr-1"></i>Safety Tips
                        </a>
                    </li>
                    <li class="nav-item fireworks-header-nav-item">
                        <a class="nav-link fireworks-header-nav-link <?php if ($page == 'contact')
                            echo 'active'; ?>" href="contact.php">
                            <i class="bi bi-envelope-open-fill mr-1"></i>Contact Us
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</section>
<script src="js/marquee.js"></script>
<script>
    $('.marquee-left').marquee({
        duration: 16000,
        gap: 150,
        delayBeforeStart: 0,
        direction: 'left',
        duplicated: false,
        pauseOnHover: true
    });
</script>