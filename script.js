document.addEventListener('DOMContentLoaded', loadDonations);

function loadDonations() {
  const donations = JSON.parse(localStorage.getItem('donations')) || [];
  donations.forEach(addDonationToList);
}

function registerDonation() {
  const donorName = document.getElementById('donor-name').value;
  const donorEmail = document.getElementById('donor-email').value;
  const foodDescription = document.getElementById('food-description').value;
  const foodQuantity = document.getElementById('food-quantity').value;
  const expiryDate = document.getElementById('expiry-date').value;

  if (donorName && donorEmail && foodDescription && foodQuantity && expiryDate) {
    const donation = {
      id: Date.now(),
      donorName,
      donorEmail,
      foodDescription,
      foodQuantity,
      expiryDate
    };

    saveDonation(donation);
    addDonationToList(donation);

    document.getElementById('donor-name').value = '';
    document.getElementById('donor-email').value = '';
    document.getElementById('food-description').value = '';
    document.getElementById('food-quantity').value = '';
    document.getElementById('expiry-date').value = '';
  } else {
    alert('Por favor, preencha todos os campos.');
  }
}

function saveDonation(donation) {
  const donations = JSON.parse(localStorage.getItem('donations')) || [];
  donations.push(donation);
  localStorage.setItem('donations', JSON.stringify(donations));
}

function addDonationToList(donation) {
  const donationList = document.getElementById('donation-list');
  const li = document.createElement('li');
  li.setAttribute('data-id', donation.id);
  li.innerHTML = `
    <span>${donation.donorName} - ${donation.foodDescription} (${donation.foodQuantity}) - ${new Date(donation.expiryDate).toLocaleDateString()}</span>
    <button class="remove-btn" onclick="removeDonation(${donation.id})">Remover</button>
  `;
  donationList.appendChild(li);
}

function removeDonation(id) {
  const donations = JSON.parse(localStorage.getItem('donations')) || [];
  const updatedDonations = donations.filter(donation => donation.id !== id);
  localStorage.setItem('donations', JSON.stringify(updatedDonations));
  document.querySelector(`li[data-id="${id}"]`).remove();
}
