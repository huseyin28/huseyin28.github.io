let bulusmaNo = null;
$(document).ready(start);

function start(){
    let params = new URL(document.location).searchParams;
    bulusmaNo = params.get('bulusma');
    $('#bulusmaNo').html(bulusmaNo)
    getText()
}

function getText(){
    $.ajax({
        url : '/mylove/texts/'+bulusmaNo+'.html',
        success : data =>  $('#txt').html(data)
    })
}