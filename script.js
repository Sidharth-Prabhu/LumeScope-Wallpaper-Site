document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Load local wallpapers
    loadLocalWallpapers();

    // Animation on Scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.wallpaper-card, .featured-card, .section-title');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.wallpaper-card, .featured-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});

// Function to load wallpapers from local directories
function loadLocalWallpapers() {
    // =============================================
    // IMPORTANT: UPDATE THESE ARRAYS WITH YOUR ACTUAL WALLPAPER FILENAMES
    // =============================================
    const desktopWallpapers = [
        'Stack 63.png',
        'Stack 64.png',
        'Stack 65.png',
    'Stack 66.png',
    'Stack 67.png',
    'Stack 68.png',
    'Stack 69.png',
    'Stack 70.png',
    'Stack 71.png',
    'Stack 72.png',
    'Stack 73.png',
    'Stack 74.png',
    'Stack 75.png',
    'Stack 76.png',
    'Stack 77.png',
    'Stack 78.png',
    'Stack 79.png',
    'Stack 80.png',
    'Stack 81.png',
    'Stack 82.png',
    'Stack 83.png',
    'Stack 84.png',
    'Stack 85.png',
    'Stack 86.png',
    'Stack 87.png',
    'Stack 88.png',
    'Stack 89.png',
    'Stack 90.png',
    'Stack 91.png',
    'Stack 92.png',
    'Stack 93.png',
    'Stack 94.png',
    'Stack 95.png',
    'Stack 96.png',
    'Stack 97.png',
    'Stack 98.png',
    'Stack 99.png',
    'Stack 100.png',
    'Stack 101.png',
    'Stack 102.png',
    'Stack 103.png',
    'Stack 104.png',
    'Stack 105.png',
    'Stack 106.png',
    'Stack 107.png',
    'Stack 108.png',
    'Stack 109.png',
    'Stack 110.png',
    'Stack 111.png',
    'Stack 112.png'
        // Add all your desktop wallpaper filenames here
        // Example: 'my-wallpaper.jpg', 'another-wallpaper.png'
    ];
    
    const mobileWallpapers = [
        'Stack 123.png',
    'Stack 124.png',
    'Stack 125.png',
    'Stack 126.png',
    'Stack 127.png',
    'Stack 128.png',
    'Stack 129.png',
    'Stack 130.png',
    'Stack 131.png',
    'Stack 132.png',
    'Stack 133.png',
    'Stack 134.png',
    'Stack 135.png',
    'Stack 136.png',
    'Stack 137.png',
    'Stack 138.png',
    'Stack 139.png',
    'Stack 140.png',
    'Stack 141.png',
    'Stack 142.png',
    'Stack 143.png',
    'Stack 144.png',
    'Stack 145.png',
    'Stack 146.png',
    'Stack 147.png',
    'Stack 148.png',
    'Stack 149.png',
    'Stack 150.png',
    'Stack 151.png',
    'Stack 152.png',
    'Stack 153.png',
    'Stack 154.png',
    'Stack 155.png',
    'Stack 156.png',
    'Stack 157.png',
    'Stack 158.png',
    'Stack 159.png',
    'Stack 160.png',
    'Stack 161.png',
    'Stack 162.png',
    'Stack 163.png',
    'Stack 164.png',
    'Stack 165.png',
    'Stack 166.png',
    'Stack 167.png',
    'Stack 168.png',
    'Stack 169.png',
    'Stack 170.png',
    'Stack 171.png',
    'Stack 172.png'
        // Add all your mobile wallpaper filenames here
        // Example: 'mobile-wallpaper1.jpg', 'phone-bg.png'
    ];
    // =============================================
    // END OF USER CONFIGURATION
    // =============================================

    // Load desktop wallpapers
    const desktopContainer = document.getElementById('desktop-wallpapers');
    desktopContainer.innerHTML = '';
    
    if (desktopWallpapers.length === 0) {
        desktopContainer.innerHTML = '<div class="no-wallpapers">No desktop wallpapers found in /wallpapers/desktop/</div>';
    } else {
        desktopWallpapers.forEach((filename, index) => {
            const name = formatWallpaperName(filename);
            const card = createWallpaperCard(`wallpapers/desktop/${filename}`, name, '3840 × 2160 • 4K Ultra HD');
            desktopContainer.appendChild(card);
            
            // Set first wallpaper as featured
            if (index === 0) {
                setFeaturedWallpaper(`wallpapers/desktop/${filename}`, name);
            }
        });
    }
    
    // Load mobile wallpapers
    const mobileContainer = document.getElementById('mobile-wallpapers');
    mobileContainer.innerHTML = '';
    
    if (mobileWallpapers.length === 0) {
        mobileContainer.innerHTML = '<div class="no-wallpapers">No mobile wallpapers found in /wallpapers/mobile/</div>';
    } else {
        mobileWallpapers.forEach((filename, index) => {
            const name = formatWallpaperName(filename);
            const card = createWallpaperCard(`wallpapers/mobile/${filename}`, name, '1440 × 2560 • HD');
            mobileContainer.appendChild(card);
            
            // If no desktop wallpapers, use first mobile as featured
            if (desktopWallpapers.length === 0 && index === 0) {
                setFeaturedWallpaper(`wallpapers/mobile/${filename}`, name);
            }
        });
    }
}

// Helper function to format wallpaper names
function formatWallpaperName(filename) {
    // Remove file extension
    let name = filename.replace(/\.[^/.]+$/, "");
    // Replace underscores and dashes with spaces
    name = name.replace(/[-_]/g, " ");
    // Capitalize first letter of each word
    return name.replace(/\b\w/g, l => l.toUpperCase());
}

// Function to create a wallpaper card element
function createWallpaperCard(imagePath, title, resolution) {
    const card = document.createElement('div');
    card.className = 'wallpaper-card';
    
    const img = document.createElement('img');
    img.className = 'wallpaper-img';
    img.src = imagePath;
    img.alt = title;
    img.loading = 'lazy'; // Add lazy loading
    
    const overlay = document.createElement('div');
    overlay.className = 'wallpaper-overlay';
    
    const info = document.createElement('div');
    info.className = 'wallpaper-info';
    
    const h3 = document.createElement('h3');
    h3.textContent = title;
    
    const p = document.createElement('p');
    p.textContent = resolution;
    
    const downloadBtn = document.createElement('a');
    downloadBtn.href = imagePath;
    downloadBtn.className = 'download-btn';
    downloadBtn.download = title.toLowerCase().replace(/\s+/g, '-') + '.jpg';
    downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';
    
    info.appendChild(h3);
    info.appendChild(p);
    info.appendChild(downloadBtn);
    overlay.appendChild(info);
    card.appendChild(img);
    card.appendChild(overlay);
    
    return card;
}

// Function to set featured wallpaper
function setFeaturedWallpaper(imagePath, title) {
    const featuredImg = document.getElementById('featured-image');
    const featuredTitle = document.getElementById('featured-title');
    const featuredDesc = document.getElementById('featured-desc');
    const featuredDownload = document.getElementById('featured-download');
    
    featuredImg.src = imagePath;
    featuredImg.alt = title;
    featuredTitle.textContent = title;
    featuredDesc.textContent = `Featured: ${title} - A beautiful wallpaper from your collection`;
    featuredDownload.href = imagePath;
    featuredDownload.download = title.toLowerCase().replace(/\s+/g, '-') + '.jpg';
}