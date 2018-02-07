var final = new Date('02/06/2018- 16:30');

var returnStringDate = function(now, final){
    steep = final-now;
    var h = Math.floor(steep/3600000);
    steep = steep - (h*3600000);
    var m = Math.floor(steep/60000);
    steep = steep - (m*60000);
    var s = Math.floor(steep/1000);
    if(h < 10){
        h = "0"+h;
    }
    if(m < 10){
        m = "0"+m;
    }
    if(s < 10){
        s = "0"+s;
    }

    return h+":"+m+":"+s;
};


var loop = function () {
    setTimeout(function () {
        var time = returnStringDate(new Date(),final);
        console.log(steep);
        if(time.indexOf('-') > -1){

            $("#countdown").html("<p class='font-primaria'>Rolou a Bola!!!</p>");
            return;
        }else{
            $("#countdown").html(time);
            loop();
        }
    }, 1000);
}

loop();



