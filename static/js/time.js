const loop = setInterval(newTime, 500);
var times = document.querySelectorAll(".time");

function newTime() {
    let now = new Date();
    
    times.forEach(function(e) {
        let timeH = now.getUTCHours();
        let timeM = now.getUTCMinutes();
        let timeS = now.getUTCSeconds();

        timeH += parseInt(e.getAttribute("utc"));

        timeH = timeH.toString();
        timeM = timeM.toString();
        timeS = timeS.toString();
    
        if (timeH.length < 2) timeH = "0" + timeH;
        if (timeM.length < 2) timeM = "0" + timeM;
        if (timeS.length < 2) timeS = "0" + timeS;
    
        e.querySelector(".time-time").innerHTML = timeH + ":" + timeM + ":" + timeS;
    });
}