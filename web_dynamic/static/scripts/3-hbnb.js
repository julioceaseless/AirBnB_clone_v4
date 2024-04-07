$(document).ready(function () {
  // Initialize an empty array to store Amenity IDs
  const selectedAmenities = {};

  // Listen for changes on input checkboxes
  $('input[type="checkbox"]').change(function () {
    // retrieve amenity id from data-amenity-id attribute
    const amenityId = $(this).data('id');

    // Check if the checkbox is checked
    if ($(this).is(':checked')) {
      // Add the Amenity ID to the amenities array if it's not already there
      selectedAmenities[amenityId] = true;
    } else {
      // Remove the Amenity ID from the amenities array
      delete selectedAmenities[amenityId];
    }

    // Update the h4 tag inside the div Amenities with the list
    // of Amenities checked

    // create an empty list
    let amenitiesList = '';

    // loop through the selected amenities in the dictionary
    for (const id in selectedAmenities) {
      if (amenitiesList === '') {
        amenitiesList += id;
      } else {
        amenitiesList += ', ' + id;
      }
      $('DIV.amenities h4').text(amenitiesList);
    }
  });

  /* Check if API service is available */
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status',
    method: 'GET',
    datatype: 'json',
    success: function (data) {
      // show if API is available using a button signal
      console.log(data.status);
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });

  /* Fetch Places */
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    method: 'POST',
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: function (response) {
      $('SECTION.places').empty();
      for (const r of response) {
        const article = ['<article>',
          '<div class="title_box">',
        `<h2>${r.name}</h2>`,
        `<div class="price_by_night">$${r.price_by_night}</div>`,
        '</div>',
        '<div class="information">',
        `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
        `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
        `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
        '</div>',
        '<div class="description">',
        `${r.description}`,
        '</div>',
        '</article>'];
        $('SECTION.places').append(article.join(''));
      }
    },
    error: function (error) {
      console.error('Error:', error);
    }
  });
});
