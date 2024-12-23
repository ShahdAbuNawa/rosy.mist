document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Form validation
    let isValid = true;
    let fields = ['firstName', 'lastName', 'mobile', 'address', 'age', 'country', 'message'];
    fields.forEach(function (field) {
        let input = document.getElementById(field);
        if (input && input.value.trim() === '') {
            showModal(field.charAt(0).toUpperCase() + field.slice(1) + ' is required.');
            isValid = false;
        }
    });

    if (isValid) {
        showModal('Thank you for your message!');
        this.reset();
    }
});

// Function to show the modal with a specific message
function showModal(message) {
    document.getElementById('modal-text').textContent = message;
    const modal = document.getElementById('custom-modal');
    modal.classList.add('show');
}

// Function to close the modal
document.getElementById('close-modal').addEventListener('click', function () {
    const modal = document.getElementById('custom-modal');
    modal.classList.remove('show');
});

// Optional: Close the modal when clicking outside the modal content
window.addEventListener('click', function (event) {
    const modal = document.getElementById('custom-modal');
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});