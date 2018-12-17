let now = new Date();
let sstart = new Date(now.getFullYear() + 1, 0, 1);
let sfinish = new Date(now.getFullYear() + 2, 0, 1);
let mounths = ["OCAK", "ŞUBAT", "MART", "NİSAN", "MAYIS", "HAZİRAN", "TEMMUZ", "AĞUSTOS", "EYLÜL", "EKİM", "KASIM", "ARALIK"];

$(document).ready(function(){
    document.getElementById('dateStart').value = `${sstart.getFullYear()}-01-01`;
    document.getElementById('dateFinish').value = `${sfinish.getFullYear()}-01-01`;
});

function create() {
    let start = new Date(document.getElementById('dateStart').value);
    let finish = new Date(document.getElementById('dateFinish').value);

    var startCopy = new Date(document.getElementById('dateStart').value);
    console.warn(start.getDate());
    console.warn(startCopy.getDate());
    console.warn(finish.getDate());

    $('table').append('<tr><td>' + mounths[start.getMonth()] + '</td></tr>');
    let lastMounth = start.getMonth();
    if (start.getDay() != 1) {
        while (startCopy.getDay() != 1) {
            $('table tbody tr:last-child').append('<td></td>');
            startCopy.setDate(startCopy.getDate() - 1);
        }
    }
    while (finish.toString() !== start.toString()) {
        if ($('table tbody tr:last-child td').length == 15) {
            if (lastMounth != start.getMonth()) {
                $('table').append('<tr><td>' + mounths[start.getMonth()] + '</td></tr>');
                lastMounth = start.getMonth();
            } else
                $('table').append('<tr><td></td></tr>');
        }
        $('table tbody tr:last-child').append('<td>' + start.getDate() + '</td>');
        start.setDate(start.getDate() + 1);
    }
    while ($('table tbody tr:last-child td').length != 15) {
        $('table tbody tr:last-child').append('<td></td>');
    }
    $('#input').remove();
    $('#takvim').show();
}