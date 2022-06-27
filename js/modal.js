$(document).ready(function (e) {
    $('#exampleModal').on('show.bs.modal', function(e) {    
       var id = $(e.relatedTarget).data().id;
        $(e.currentTarget).find('#mn-ch').val(id);
    });
});