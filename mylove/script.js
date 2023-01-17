$(document).ready(function () {
    neKadar();
    getBulusmalar();

    

})

function getBulusmalar(){
    $.ajax({
        url : "./meetings.json",
        success : response => {
            $('#bulusmalar').html('')
            response.forEach(element => {
                $('#bulusmalar').append(`<div class="col-lg-4 col-sm-6">
                    <a class="portfolio-box" href="assets/img/portfolio/fullsize/1.jpg" title="Project Name">
                        <img class="img-fluid" src="images/${element.fileName}" alt="..." />
                        <div class="portfolio-box-caption">
                            <div class="project-category text-white-50">Category</div>
                            <div class="project-name">Project Name</div>
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