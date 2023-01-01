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
    },
    {
        date : "4. Buluşma <br> 25 Aralık 2021",
        dtObj : new Date(2021,11,25),
        fileName : "20211225.jpg"
    },
    {
        date : "5. Buluşma <br> 05 Mayıs 2022",
        dtObj : new Date(2022,4,5),
        fileName : "20220505.jpg"
    },
    {
        date : "6. Buluşma <br> 21 Mayıs 2022",
        dtObj : new Date(2022,4,21),
        fileName : "20220521.jpg"
    },
    {
        date : "7. Buluşma <br> 18 Haziran 2022",
        dtObj : new Date(2022,5,18),
        fileName : "20220618.jpg"
    },
    {
        date : "8. Buluşma <br> 13 Ağustos 2022",
        dtObj : new Date(2022,7,13),
        fileName : "20220813.jpg"
    },
    {
        date : "9. Buluşma <br> 09 Ekim 2022",
        dtObj : new Date(2022,9,9),
        fileName : "20221009.jpg"
    },
    {
        date : "10. Buluşma <br> 10 Aralık 2022",
        dtObj : new Date(2022,11,10),
        fileName : "20221210.jpg"
    }
]

$(document).ready(function(){
    runCounter();
    setInterval(changeBgImg, 5000)
    $('#nekadar').on('click',function(){
        let start = new Date(2020, 5,3);
        let now = Date.now();
        let fark = now - start;
        
        let day = Math.floor(fark / (1000 * 60 * 60 * 24));

        let yil = Math.floor(day / 365);
        let ay = Math.floor((day - (yil * 365)) / 31)
        let gun = Math.floor(((fark / (1000 * 60 * 60 * 24)) - ((yil * 365) + (ay * 31))) )

        alert(`${yil} yıl, ${ay} ay, ${gun} gündür beraberiz`)
    })
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