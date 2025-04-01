const filterBtns = document.querySelectorAll('.filter-btn');
const galleryGrid = document.querySelector('.gallery-grid');

let galleryItems = []; // To store the fetched gallery data

// Fetch the JSON data
fetch('gallery.json')
    .then(response => response.json())
    .then(data => {
        galleryItems = data;
        displayGalleryItems('all');
    })
    .catch(error => console.error('Error fetching gallery data:', error));

// Display gallery items based on the selected filter
function displayGalleryItems(filter) {
    galleryGrid.innerHTML = '';

    const filteredItems = galleryItems.filter(item => filter === 'all' || item.category === filter);

    filteredItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item', item.category, 'hidden'); // Start as hidden for animation
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="gallery-overlay">
                <div class="gallery-info">
                    <h3>${item.title}</h3>
                    <p>${item.date}</p>
                </div>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);

        // Trigger fade-in animation
        setTimeout(() => {
            galleryItem.classList.remove('hidden');
            galleryItem.classList.add('visible');
        }, 100);
    });
}

// Event listeners for filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');
        displayGalleryItems(filterValue);
    });
});
