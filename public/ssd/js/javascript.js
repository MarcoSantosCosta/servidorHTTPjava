$(document).ready(function () {
    $('ul.tabs').tabs({
        swipeable: true
    });
});


function initMap() {
    var comp = {lat: -21.227783, lng: -44.978517};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: comp
    });
    var marker = new google.maps.Marker({
        position: comp,
        map: map
    });
}


$(document).ready(function () {
    $('.carousel').carousel();
});


$(document).ready(function () {
    $('select').material_select();
});

$('select').material_select('destroy');


function scrollto(target) {
    $(target).scroll();
}

$(document).ready(function () {
    $('.slider').slider();
    $('.slider').height = '900px';
});


Materialize.scrollFire({});

$('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
    }
);

$(function () {
        $(".button-collapse").sideNav();
    });
