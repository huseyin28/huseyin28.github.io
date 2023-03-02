$(document).ready(function () {
    neKadar();
    getBulusmalar();

    

})

function getBulusmalar(){
    $.ajax({
        url : "/mylove/meetings.json",
        success : response => {
            $('#bulusmalar').html('')
            response.forEach((element, index) => {
                $('#bulusmalar').append(`<div class="col-lg-4 col-sm-6">
                    <a class="portfolio-box" href="#" title="${index + 1}. Buluşma">
                        <img class="img-fluid" src="images/${index + 1}.png" alt="..." />
                        <div class="portfolio-box-caption">
                            <div class="project-name">${index + 1}. Buluşma</div>
                        </div>
                    </a>
                </div>`)
            });
        }
    })
}

function neKadar() {
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
}