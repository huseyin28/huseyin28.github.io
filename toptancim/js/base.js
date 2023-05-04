$(document).ready(init)

function init() {
    SetEvents();
    getChatList();
}

function getChatList(){
    $.ajax({
        url: 'http://210135.site/api/v2.php/[getChatList]',
        type: 'POST',
        data: {
            'token': localStorage.getItem("token")
        },
        dataType : "JSON",
        success : response => {
            if(response.success){
                $('#messages').html(`<h6 class="dropdown-header">Mesajlar</h6>`);
                $('#messageCount').html(response.data.chatlist.length);
                response.data.chatlist.forEach(element => {
                    $('#messages').append(getChatListItemHTML(element))
                });
            }else{
                alert(response.message)
            }
        }
    });
} 

function getChatListItemHTML(item){
    return `<a class="dropdown-item d-flex align-items-center" href="#">
                <div class="dropdown-list-image mr-3">
                    <img class="rounded-circle" src="img/undraw_profile_2.svg" alt="...">
                    <div class="status-indicator"></div>
                </div>
                <div>
                    <div class="text-truncate">${item.text}</div>
                    <div class="small text-gray-500">J${item.username}</div>
                </div>
            </a>`;
}

function SetEvents() {
    $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
        if ($(".sidebar").hasClass("toggled")) {
            $('.sidebar .collapse').collapse('hide');
        };
    });

    $(window).resize(function () {
        if ($(window).width() < 768) {
            $('.sidebar .collapse').collapse('hide');
        };

        if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
            $("body").addClass("sidebar-toggled");
            $(".sidebar").addClass("toggled");
            $('.sidebar .collapse').collapse('hide');
        };
    });

    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
        if ($(window).width() > 768) {
            var e0 = e.originalEvent,
                delta = e0.wheelDelta || -e0.detail;
            this.scrollTop += (delta < 0 ? 1 : -1) * 30;
            e.preventDefault();
        }
    });

    $(document).on('scroll', function () {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    $(document).on('click', 'a.scroll-to-top', function (e) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1000, 'easeInOutExpo');
        e.preventDefault();
    });
}

