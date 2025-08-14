document.addEventListener('DOMContentLoaded', function() {
    // Get wallpaper data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const wallpaperUrl = urlParams.get('image');
    const category = urlParams.get('category');
    const title = decodeURIComponent(urlParams.get('title') || 'Wallpaper';
    
    // Set page title
    document.title = `${title} | LumeScope`;
    
    // Set wallpaper info
    document.getElementById('wallpaperTitle').textContent = title;
    document.getElementById('downloadFull').href = wallpaperUrl;
    document.getElementById('downloadFull').download = title.toLowerCase().replace(/\s+/g, '-') + '.jpg';
    
    // Set resolution based on category
    const resolution = category === 'desktop' ? '3840 × 2160 • 4K Ultra HD' : '1440 × 2560 • HD';
    document.getElementById('wallpaperResolution').textContent = resolution;
    
    // Generate device previews
    const previewContainer = document.getElementById('devicePreview');
    
    if (category === 'desktop') {
        // Show laptop frame for desktop wallpapers
        previewContainer.innerHTML = `
            <div class="device-frame">
                <div class="laptop-frame">
                    <img src="${wallpaperUrl}" alt="${title}" class="device-image">
                </div>
                <div class="device-name">MacBook Pro Preview</div>
            </div>
        `;
    } else {
        // Show both phone frames for mobile wallpapers
        previewContainer.innerHTML = `
            <div class="device-frame">
                <div class="iphone-frame">
                    <img src="${wallpaperUrl}" alt="${title}" class="device-image">
                </div>
                <div class="device-name">iPhone 15 Preview</div>
            </div>
            <div class="device-frame">
                <div class="android-frame">
                    <img src="${wallpaperUrl}" alt="${title}" class="device-image">
                </div>
                <div class="device-name">Samsung Galaxy Preview</div>
            </div>
        `;
    }
    
    // Load related wallpapers (from same category)
    loadRelatedWallpapers(category, wallpaperUrl);
});

function loadRelatedWallpapers(category, currentUrl) {
    // In a real app, you would fetch these from your database/API
    // For this demo, we'll use a mock list
    
    const mockWallpapers = {
        desktop: [
            { url: 'wallpapers/desktop/nature1.jpg', title: 'Nature Landscape' },
            { url: 'wallpapers/desktop/city1.jpg', title: 'City Skyline' },
            { url: 'wallpapers/desktop/space1.jpg', title: 'Cosmic Nebula' },
            { url: 'wallpapers/desktop/abstract1.jpg', title: 'Colorful Abstract' }
        ],
        mobile: [
            { url: 'wallpapers/mobile/nature2.jpg', title: 'Forest Pathway' },
            { url: 'wallpapers/mobile/city2.jpg', title: 'Metropolis' },
            { url: 'wallpapers/mobile/space2.jpg', title: 'Galaxy Core' },
            { url: 'wallpapers/mobile/abstract2.jpg', title: 'Geometric Art' }
        ]
    };
    
    // Filter out the current wallpaper
    const related = mockWallpapers[category].filter(w => w.url !== currentUrl);
    const relatedContainer = document.getElementById('relatedWallpapers');
    
    if (related.length === 0) {
        relatedContainer.innerHTML = '<p>No related wallpapers found</p>';
        return;
    }
    
    // Display up to 4 related wallpapers
    related.slice(0, 4).forEach(wallpaper => {
        const item = document.createElement('div');
        item.className = 'related-item';
        item.innerHTML = `
            <a href="preview.html?image=${encodeURIComponent(wallpaper.url)}&category=${category}&title=${encodeURIComponent(wallpaper.title)}">
                <img src="${wallpaper.url}" alt="${wallpaper.title}">
            </a>
        `;
        relatedContainer.appendChild(item);
    });
}