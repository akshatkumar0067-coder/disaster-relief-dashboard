document.addEventListener('DOMContentLoaded', () => {
    
    // Element References
    const presetBtns = document.querySelectorAll('.preset-btn');
    const customInput = document.getElementById('custom-amount');
    const donationForm = document.getElementById('donation-form');
    
    const modal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalAmountText = document.getElementById('modal-amount');

    let selectedAmount = null;

    // Handle Preset Button Clicks
    presetBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            presetBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Set selected amount and clear custom input
            selectedAmount = e.target.getAttribute('data-amount');
            customInput.value = ''; 
        });
    });

    // Handle Custom Amount Input
    customInput.addEventListener('input', (e) => {
        // If user types in custom amount, clear preset selections
        if(e.target.value) {
            presetBtns.forEach(b => b.classList.remove('active'));
            selectedAmount = e.target.value;
        } else {
            selectedAmount = null;
        }
    });

    // Handle Form Submission
    donationForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload

        if(!selectedAmount || selectedAmount <= 0) {
            alert("Please select or enter a valid donation amount.");
            return;
        }

        // Format amount for display
        const formattedAmount = `$${parseFloat(selectedAmount).toLocaleString()}`;
        
        // Show Success Modal
        modalAmountText.textContent = formattedAmount;
        modal.classList.remove('hidden');

        // Optional: Reset form after donation
        presetBtns.forEach(b => b.classList.remove('active'));
        customInput.value = '';
        selectedAmount = null;
    });

    // Handle Modal Close
    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close modal if user clicks outside of the modal content
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});