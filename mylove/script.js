let sayac = 0;
let meetings = [
    {
        date : "1. Buluşma <br>3 Temmuz 2020",
        dtObj : new Date(2020,6,3),
        fileName : "20200703.jpg"
    },
    {
        date : "2. Buluşma <br> 27 Mart 2021",
        dtObj : new Date(2021,2,27),
        fileName : "20210327.jpg"
    },
    {
        date : "3. Buluşma <br> 06 Kasım 2021",
        dtObj : new Date(2021,10,6),
        fileName : "20211106.jpg"
    }
]

$(document).ready(function(){
    runCounter();
    setInterval(changeBgImg, 5000)
})

function changeBgImg(){
    
    $('.info').html(meetings[sayac].date);
    $('body').css("background-image", "url('../mylove/images/"+meetings[sayac].fileName+"')");
    sayac++;
    if(sayac == meetings.length)
        sayac = 0

}

function runCounter(){
    counter()
    setInterval(counter, 1000)
}

function counter() {
    let dtnow = Date.now();
    let dthedef = new Date(2023, 00, 28, 08, 30, 0, 0);
    let fark = null;

    fark = dthedef - dtnow;
    let day = Math.floor(fark / (1000 * 60 * 60 * 24));

    fark -= day * (1000 * 60 * 60 * 24);
    let saat = Math.floor(fark / (1000 * 60 * 60));

    fark -= saat * (1000 * 60 * 60);
    let dakika = Math.floor(fark / (1000 * 60));

    fark -= dakika * (1000 * 60);
    let saniye = Math.floor(fark / (1000));

    $('.counter').html(`${day} gün  ${saat}:${dakika}.${saniye}`)
}