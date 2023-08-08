const loop = setInterval(newTime, 500);
var times = document.querySelectorAll(".time");

function newTime() {
    let now = new Date();
    
    times.forEach(function(e) {
        let time = new Date(now.toUTCString());

        time.setUTCHours(time.getUTCHours()+parseInt(e.getAttribute("utc")));

        let output = "<span class=\"time-date-span\">";

        let output_date = parseInt(time.getUTCDate());
        if (output_date.toString().length < 2) output += "0"; 
        output += output_date.toString() + ".";

        let output_mounth = parseInt(time.getUTCMonth())+1;
        if (output_mounth.toString().length < 2) output += "0"; 
        output += output_mounth.toString() + ".";

        output += time.getUTCFullYear().toString() + "</span> ";

        let output_hour = parseInt(time.getUTCHours());
        if (output_hour.toString().length < 2) output += "0"; 
        output += output_hour.toString() + ":";

        let output_minute = parseInt(time.getUTCMinutes());
        if (output_minute.toString().length < 2) output += "0"; 
        output += output_minute.toString() + ":";

        let output_second = parseInt(time.getUTCSeconds());
        if (output_second.toString().length < 2) output += "0"; 
        output += output_second.toString();

        e.querySelector(".time-time").innerHTML = output;
    });
}