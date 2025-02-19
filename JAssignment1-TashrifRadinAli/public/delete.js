document.addEventListener("DOMContentLoaded", function() {
    // Attach click event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            const itemType = this.closest('tr').id.startsWith('game') ? 'game' : 'player';
    
            // Confirm deletion
            const confirmed = confirm(`Are you sure you want to delete this ${itemType}?`);
            if (confirmed) {
                // Perform the deletion
                deleteItem(itemId, itemType);
            }
        });
    });
});

// Function to handle item deletion
function deleteItem(id, type) {
    const url = type === 'game' ? `/api/games/${id}` : `/api/players/${id}`;
    
    fetch(url, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            // Remove the row from the table if deletion is successful
            const row = document.getElementById(`${type}-${id}`);
            if (row) {
                row.remove();
            }
        } else {
            // If deletion failed, show an alert
            alert(`Failed to delete ${type}. Please try again.`);
        }
    })
    .catch(error => {
        console.error('Error deleting item:', error);
        // Show a user-friendly error message
        alert('An error occurred while deleting the item. Please try again later.');
    });
}
