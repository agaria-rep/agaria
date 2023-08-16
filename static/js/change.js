var current_date = document.querySelectorAll(".change").length;
var max_date = document.querySelectorAll(".change").length;
var offset = 0;

var points = [];
var labels = [];

var mchart = null;

function loadChart() {
    var data, config, ctx;
    points = [];
    labels = [];

    let to_continue = 0;
    document.querySelectorAll(".change").forEach(function(e) {
        if (to_continue >= max_date-5-offset && to_continue <= max_date-offset) {
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
        }
        to_continue++;
    });

    data = {
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

    config = {
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
                    suggestedMin: Math.floor(parseFloat(document.querySelector(`.change:nth-child(1) .change-current span`).innerHTML)),
                    suggestedMax: Math.ceil(parseFloat(document.querySelector(`.change:nth-child(${max_date}) .change-current span`).innerHTML)),
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

    ctx = document.querySelector('#myChart');
    ctx.style.height = "65vh";

    try {
        mchart.clear();
        mchart.destroy();
    } catch {}
    mchart = new Chart(ctx, config);

    Chart.defaults.font.family = "Montserrat";
}

function loadEvents() {
    document.querySelector("#myChart").onmousemove = function (m) {
        current_date = (max_date-5-offset)+(mchart.getElementsAtEventForMode(m, 'nearest', mchart.options)[0].index+1);

        updateMenu();
    };

    document.querySelector("#to-minus").onclick = function () {
        offset += 5;
        if (offset >= max_date-5) offset = max_date-5;

        updateMenu();

        loadChart();
    };
    
    document.querySelector("#to-plus").onclick = function () {
        offset -= 5;
        if (offset <= 0) offset = 0;

        updateMenu();

        loadChart();
    };
    
}

function updateMenu() {
    document.querySelectorAll(`.change`).forEach(function(e) {e.style.display = "none";})
    document.querySelector(`.change:nth-child(${current_date})`).style.display = "flex";
    
    if (offset <= 0) {
        document.querySelector("#to-plus").setAttribute("disabled", "");
    } else {
        document.querySelector("#to-plus").removeAttribute("disabled");
    }
    if (offset >= max_date-5) {
        document.querySelector("#to-minus").setAttribute("disabled", "");
    } else {
        document.querySelector("#to-minus").removeAttribute("disabled");
    }
}

loadChart();
loadEvents();
updateMenu();