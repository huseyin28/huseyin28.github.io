class Layout {
    constructor() {
        this.getSideBar()
    }

    getSideBar() {
        $.ajax('./public/layout/sideBar.html').then(html => {
            $('#accordionSidebar').html(html)
            $("#sidebarToggle, #sidebarToggleTop").off('click').on('click', function (e) {
                $("body").toggleClass("sidebar-toggled");
                $(".sidebar").toggleClass("toggled");
                if ($(".sidebar").hasClass("toggled")) {
                    $('.sidebar .collapse').collapse('hide');
                };
            });
        })
    }
}

new Layout()