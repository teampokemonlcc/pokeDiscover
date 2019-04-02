$(function () {
    var $topNavButton, $topnavDropDown;

    $topNavButton = $('.nav-icon');
    $topnavDropDown = $('.nav-drop-down');
    
    // SETUP ON-CLICK FOR NAV HAMBURGER
    $topNavButton.show();
    $topnavDropDown.hide();
    $('nav-top').on('click', function () {
        $topNavButton.hide();
        $topnavDropDown.show();
    });

});
