async function fetchArtwork(artworkId) {
    const apiURL = `https://api.artic.edu/api/v1/artworks/${artworkId}`;
    const retrieveArt = 'id,title,date_display,place_of_origin,description,medium_display';

    try {
        const response = await fetch(`${apiURL}?fields=${retrieveArt}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return null; // Return null or handle the error as needed
    }
}

function displayArtDetails(artwork) {
    const modalTitle = document.getElementById('artDetailsModalTitle');
    const modalBody = document.getElementById('artDetailsModalBody');

    modalTitle.textContent = artwork.title;
    modalBody.innerHTML = `
        <img src="images/${artwork.id}.jpg" alt="${artwork.title}" class="artwork img-fluid shadow-lg col-lg-8 col-md-6">
        <p>Date Display: ${artwork.date_display}</p>
        <p>Place of Origin: ${artwork.place_of_origin}</p>
        <p>Description: ${artwork.medium_display}</p>
    `;

    $('#artDetailsModal').modal('show');
}

function displayArtwork(artworkId) {
    fetchArtwork(artworkId).then(artworkData => {
        const artwork = artworkData.data;

        const galleryContainer = document.getElementById('gallery');

        const imageElement = document.createElement('img');
        const imageURL = `images/${artwork.id}.jpg`;
        imageElement.src = imageURL;
        imageElement.alt = artwork.title;

        // Add a click event listener to display details
        imageElement.addEventListener('click', () => {
            displayArtDetails(artwork);
        });

        galleryContainer.appendChild(imageElement);
    });
}

const artworkIds = [5554, 9400, 20620, 22588, 28952, 28955, 88781, 88783, 88785, 88789, 150737, 150738, 150739, 150960, 150961, 159416]; // Add more artwork IDs as needed

// Display all artworks in the gallery
artworkIds.forEach(artworkId => {
    displayArtwork(artworkId);
});