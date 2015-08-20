(function(){
    var oneDay = 24 * 60 * 60 * 1000,
        now = new Date,
        then = new Date(2015, 03, 24);

    var diffDays = Math.round(Math.abs((now.getTime() - then.getTime()) / (oneDay)));

    document.getElementById('day-counter').innerHTML = '- ' + diffDays + ' -';
})();