$(document).ready(function () {
  // Initialize an empty array to store Amenity IDs
  const selectedAmenities = {};

  // Listen for changes on input checkboxes
  $('input[type="checkbox"]').change(function () {
    // retrieve amenity id from data-amenity-id attribute
    const amenityId = $(this).data('id');
    // retrieve amenity name
    const amenityName = $(this).data('name');

    // Check if the checkbox is checked
    if ($(this).is(':checked')) {
      // Add the Amenity ID to the amenities array if it's not already there
      selectedAmenities[amenityId] = amenityName;
    } else {
      // Remove the Amenity ID from the amenities array
      delete selectedAmenities[amenityId];
    }

    /* Update the h4 tag inside the div Amenities with the list
     * of Amenities checked
     */

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
});
