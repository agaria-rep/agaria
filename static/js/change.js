var currentDate = 0;
var endDate = 0;

var labels = [];
var points = [];

window.onload = function() {
    currentDate = document.querySelectorAll(".change").length;
    endDate = document.querySelectorAll(".change").length;
    document.querySelector(`.change:nth-child(${currentDate})`).style.display = "flex";

    document.querySelectorAll(".change").forEach(function(e) {
        let date = new Date(e.querySelector(".change-date").innerHTML).toUTCString().slice(5, 17);
        date = [date.slice(0, 2), date.slice(3, 6)];

        if (date[1] == "Jan") date[1] = "Января";
        else if (date[1] == "Feb") date[1] = "Февраля";
        else if (date[1] == "Mar") date[1] = "Марта";
        else if (date[1] == "Apr") date[1] = "Апреля";
        else if (date[1] == "May") date[1] = "Мая";
        else if (date[1] == "Jun") date[1] = "Июня";
        else if (date[1] == "Jul") date[1] = "Июля";
        else if (date[1] == "Aug") date[1] = "Августа";
        else if (date[1] == "Sep") date[1] = "Сентября";
        else if (date[1] == "Oct") date[1] = "октября";
        else if (date[1] == "Nov") date[1] = "Ноября";
        else if (date[1] == "Dec") date[1] = "Декабря";

        if (parseInt(date[0]) < 10) date[0] = date[0][1];

        date = date.join(' ');
        labels.push(date);
        points.push(e.querySelector(".change-current span").innerHTML);
    });
    const data = {
        labels: labels,
        datasets: [
            { 
                label: "Курс к Рублю "+new Date(document.querySelector(".change-date").innerHTML).toUTCString().slice(12, 16)+" года",
                data: points,
                borderColor: "#0000FF",
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.1
            }
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true
                    }
                },
                y: {
                    display: true,
                    suggestedMin: Math.floor(parseFloat(document.querySelector(`.change:nth-child(${endDate}) .change-current span`).innerHTML)),
                    suggestedMax: Math.ceil(parseFloat(document.querySelector(`.change:nth-child(${endDate}) .change-current span`).innerHTML)),
                    ticks: {
                        stepSize: 0.25
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return "";
                        }
                    }
                }
            }
        }
    };

    const ctx = document.getElementById('myChart');

    Chart.defaults.font.family = "Montserrat";

    const myChart = new Chart(ctx, config);
    ctx.style.height = "65vh";

    document.getElementById("myChart").onmousemove = function (e) {
        var activePoints = myChart.getElementsAtEventForMode(e, 'nearest', myChart.options);
        currentDate = activePoints[0].index+1;

        document.querySelectorAll(`.change`).forEach(function(e) {e.style.display = "none";})
        document.querySelector(`.change:nth-child(${currentDate})`).style.display = "flex";
        
        if (!(currentDate < endDate)) {
            document.querySelector("#to-left").setAttribute("disabled", "");
        } else {
            document.querySelector("#to-left").removeAttribute("disabled");
        }
        if (!(currentDate > 1)) {
            document.querySelector("#to-right").setAttribute("disabled", "");
        } else {
            document.querySelector("#to-right").removeAttribute("disabled");
        }
    };
}

document.querySelector("#to-left").addEventListener('click', function() {
    if (currentDate < endDate) {
        currentDate += 1;
        console.log("left");

        document.querySelectorAll(`.change`).forEach(function(e) {e.style.display = "none";})
        document.querySelector(`.change:nth-child(${currentDate})`).style.display = "flex";
    }
    if (!(currentDate < endDate)) {
        document.querySelector("#to-left").setAttribute("disabled", "");
    }
    document.querySelector("#to-right").removeAttribute("disabled");
});

document.querySelector("#to-right").addEventListener('click', function() {
    if (currentDate > 1) {
        currentDate -= 1;

        document.querySelectorAll(`.change`).forEach(function(e) {e.style.display = "none";})
        document.querySelector(`.change:nth-child(${currentDate})`).style.display = "flex";
    }
    if (!(currentDate > 1)) {
        document.querySelector("#to-right").setAttribute("disabled", "");
    }
    document.querySelector("#to-left").removeAttribute("disabled");
});