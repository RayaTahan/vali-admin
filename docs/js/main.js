(function() {
    "use strict";

    var treeviewMenu = $('.app-menu');

    // Toggle Sidebar
    $('[data-toggle="sidebar"]').click(function(event) {
        event.preventDefault();
        $('.app').toggleClass('sidenav-toggled');
    });

    // Activate sidebar treeview toggle
    $("[data-toggle='treeview']").click(function(event) {
        event.preventDefault();
        if (!$(this).parent().hasClass('is-expanded')) {
            treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
        }
        $(this).parent().toggleClass('is-expanded');
    });

    // Set initial active toggle
    $("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');

    //Activate bootstrip tooltips
    $("[data-toggle='tooltip']").tooltip();

    $("a[href='" + document.location.pathname + "']").addClass('active').parents('li.treeview').addClass('is-expanded');

    $(".app-menu").find('a').each(function() {
        if (document.location.pathname.startsWith($(this).attr("href"))) {
            $(this).addClass('active').parents('li.treeview').addClass('is-expanded');
        }
    });

	$('table.datatable')
		.each(function() { $(this)
        	.DataTable({
           	 	language: {
					"sEmptyTable": "هیچ داده ای در جدول وجود ندارد",
					"sInfo": "نمایش _START_ تا _END_ از _TOTAL_ رکورد",
					"sInfoEmpty": "نمایش 0 تا 0 از 0 رکورد",
					"sInfoFiltered": "(فیلتر شده از _MAX_ رکورد)",
					"sInfoPostFix": "",
					"sInfoThousands": ",",
					"sLengthMenu": "نمایش _MENU_ رکورد",
					"sLoadingRecords": "در حال بارگزاری...",
					"sProcessing": "در حال پردازش...",
					"sSearch": "جستجو:",
					"sZeroRecords": "رکوردی با این مشخصات پیدا نشد",
					"oPaginate": {
						"sFirst": "ابتدا",
						"sLast": "انتها",
						"sNext": "بعدی",
						"sPrevious": "قبلی"
					},
					"oAria": {
						"sSortAscending": ": فعال سازی نمایش به صورت صعودی",
						"sSortDescending": ": فعال سازی نمایش به صورت نزولی"
					}
            	},
				columnDefs: [{
					orderable: false,
					targets: -1
				}],
           	 	order: [],
            	stateSave: true
			})
				.api().columns().every(function() {
					var that = this;
						$('input', this.footer()).on('keyup change', function() {
							that.search(this.value).draw();
						});

        		});
		});

		$.fn.dataTable.ext.errMode = 'console';
		$.fn.dataTableExt.sErrMode= "console";
})();
