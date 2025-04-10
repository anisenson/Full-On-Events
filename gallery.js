const filterBtns = document.querySelectorAll('.filter-btn');
const galleryGrid = document.querySelector('.gallery-grid');

let galleryItems = []; // To store the fetched gallery data

// Fetch the JSON data
fetch('gallery.json')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the fetched data
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
        galleryItem.classList.add('gallery-item', item.category, 'hidden');
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="img-fluid">
            <div class="col-sm-12">
                <div class="gallery-overlay">
                    <div class="gallery-info">
                        <h3>${item.title}</h3>
                        <p>${item.date}</p>
                        <button class="btn btn-primary modal-btn" data-id="${item.title}">More Info</button>
                    </div>
                </div>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);

        console.log('Button created for:', item.title);  // Confirm button creation

        // Trigger fade-in animation
        setTimeout(() => {
            galleryItem.classList.remove('hidden');
            galleryItem.classList.add('visible');
        }, 100);
    });
}

// Event listeners for filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');
        displayGalleryItems(filterValue);
    });
});

// Modal setup
const modal = document.getElementById('galleryModal');
const closeBtn = document.querySelector('.close-btn');

// Use event delegation on galleryGrid for modal button clicks
galleryGrid.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('modal-btn')) {
        const itemId = e.target.getAttribute('data-id'); // Get the id of the item (could be title)
        
        const item = galleryItems.find(galleryItem => galleryItem.title === itemId);

        document.getElementById('modalTitle').textContent = item.title;

        // Get the modal elements
        const carouselIndicators = document.getElementById('carouselIndicators');
        const carouselItems = document.getElementById('carouselItems');

        // Reset carousel
        carouselIndicators.innerHTML = '';
        carouselItems.innerHTML = '';

        // Add carousel items and indicators based on the images
        item.images.forEach((image, index) => {
            // Create carousel indicators
            const indicator = document.createElement('button');
            indicator.setAttribute('type', 'button');
            indicator.setAttribute('data-bs-target', '#carouselExample');
            indicator.setAttribute('data-bs-slide-to', index);
            indicator.classList.add('indicator-btn');
            if (index === 0) {
                indicator.classList.add('active');
            }
            carouselIndicators.appendChild(indicator);

            // Create carousel items
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) {
                carouselItem.classList.add('active');
            }

            const img = document.createElement('img');
            img.src = image; // Use the image URL
            img.classList.add('d-block', 'w-100', 'modal-img');
            img.alt = `${item.title} Image ${index + 1}`;

            carouselItem.appendChild(img);
            carouselItems.appendChild(carouselItem);
        });

        // Show the modal
        modal.style.display = 'flex'; 
    }
});

// Close modal when clicking the close button
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    console.log('Modal closed');
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
