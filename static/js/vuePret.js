function updateStatut(selectElement) {
    const id = selectElement.getAttribute('data-id');
    const selectedValue = selectElement.value;
    const statutCell = selectElement.closest('tr').querySelector('td:nth-child(5)');

    if (selectedValue) {
        statutCell.textContent = selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1);
        statutCell.className = selectedValue;
    }
}
