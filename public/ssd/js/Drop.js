var isDrop = false;
var drop = function () {
    if (isDrop) {
        $('.drop').removeClass('drop-show');
    } else {
        $('.drop').addClass('drop-show');
    }
    isDrop = !isDrop;
    return false;
};