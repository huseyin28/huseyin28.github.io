$(document).ready(function () {
    let start = new Date(2020, 5, 3);
    let now = new Date(Date.now());

    let dyear = now.getFullYear() - start.getFullYear();

    let dmonth = now.getMonth() - start.getMonth();
    if (dmonth < 0) {
        dyear--;
        dmonth += 12;
    }

    let dday = now.getDate() - start.getDate();
    if (dday < 0) {
        dmonth--;
        dday += 31;
    }
    $('#neKadar').html(`${dyear} yıl, ${dmonth} ay, ${dday} gün`);
})