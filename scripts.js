// Function to update the cart count in the header
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    $('#cart-count').text(itemCount);
}

let allPerfumes = []; // To store all perfumes data

$(document).ready(function () {
    // Call updateCartCount on document ready
    updateCartCount();

    // Fetch perfume data using AJAX
    $.getJSON('products.json', function (perfumes) {
        allPerfumes = perfumes; // Store the fetched data
        renderPerfumes(perfumes);
    }).fail(function () {
        $('#perfume-list').html('<p>Failed to load products. Please try again later.</p>');
    });

    // Function to render perfumes to the page
    function renderPerfumes(perfumes) {
        $('#perfume-list').empty(); // Clear existing items

        // Determine if a limit is set via data-limit attribute
        const limit = $('#perfume-list').data('limit') || perfumes.length;

        if (perfumes.length === 0) {
            $('#perfume-list').html('<p>No products found.</p>');
            return;
        }

        // Limit the number of perfumes to display
        const perfumesToDisplay = perfumes.slice(0, limit);

        perfumesToDisplay.forEach(function (perfume) {
            // Generate a random rating between 1 and 5
            let randomRating = Math.floor(Math.random() * 5) + 1;

            // Generate star rating HTML with yellow stars
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= randomRating) {
                    stars += '<i class="fas fa-star"></i>';
                } else {
                    stars += '<i class="far fa-star"></i>';
                }
            }

            $('#perfume-list').append(`
                <div class="perfume-item">
                    <img src="${perfume.image}" alt="${perfume.title}">
                    <h3>${perfume.title}</h3>
                    <div class="rating">${stars}</div>
                    <p class="description">${perfume.description}</p>
                    <p class="price">Price: $${perfume.price.toFixed(2)}</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `);
        });
    }

    // Function to show the modal with a specific message
    function showModal(message) {
        document.getElementById('modal-text').textContent = message;
        const modal = document.getElementById('custom-modal');
        modal.classList.add('show');
    }

    // Add to Cart functionality
    $(document).on('click', '.add-to-cart', function () {
        let parent = $(this).closest('.perfume-item');
        let perfumeName = parent.find('h3').text();
        let perfumeDescription = parent.find('.description').text();
        let perfumePriceText = parent.find('.price').text();
        let perfumePrice = parseFloat(perfumePriceText.replace('Price: $', ''));
        let perfumeImage = parent.find('img').attr('src');

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let existingItem = cart.find(item => item.name === perfumeName);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: perfumeName,
                description: perfumeDescription,
                price: perfumePrice,
                image: perfumeImage,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showModal(`${perfumeName} has been added to your cart.`);
    });

    // Search functionality
    $('#search-bar').on('input', function () {
        const query = $(this).val().toLowerCase();
        const filteredPerfumes = allPerfumes.filter(perfume => {
            return perfume.title.toLowerCase().includes(query) || perfume.description.toLowerCase().includes(query);
        });
        renderPerfumes(filteredPerfumes);
    });
});