$(document).ready(function () {

    // When a service card is clicked
    $(".service-card").click(function () {
        // Remove 'active' class from all service cards
        $(".service-card").removeClass("active");

        // Add the 'active' class to the clicked card
        $(this).addClass("active");

        // Get the image URLs and other content
        var imageUrls = $(this).data("images");  // Get an array of image URLs (data-images)
        var title = $(this).data("title");       // Get the custom title from the data-title attribute
        var customDesc = $(this).data("custom-desc"); // Get the custom description from the data-custom-desc attribute

        // Set the title and description (for card info)
        $("#service-title").text(title);
        $("#service-custom-description").text(customDesc);

        // Empty the previous carousel content
        $("#carousel-inner").empty();

        // Add images to the carousel dynamically
        imageUrls.forEach(function (url, index) {
            var activeClass = index === 0 ? 'active' : '';  // Set the first image as active
            var carouselItem = `<div class="carousel-item ${activeClass}">
                                    <img src="${url}" class="d-block w-100" alt="Service Image">
                                </div>`;
            $("#carousel-inner").append(carouselItem);
        });

        // Show the service details section
        $("#service-details").fadeIn();

        // Show the close button
        $("#close-service-details").fadeIn();

        // Scroll to the service details section with an offset for the sticky navbar
        $('html, body').animate({
            scrollTop: $("#service-details").offset().top - $("nav").outerHeight() // Subtract the navbar height
        }, 100); // Adjust the scrolling speed as necessary (800ms)
    });

    // Close button functionality
    $("#close-service-details").click(function () {
        // Hide the service details section
        $("#service-details").fadeOut();

        // Hide the close button
        $(this).fadeOut();

        // Remove the active class from the currently active service card
        $(".service-card").removeClass("active");
    });
});
