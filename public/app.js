$.getJSON("/articles", data => {
    for (let i = 0; i < data.length; i++) {
        $("#articles").append("<div class='card' style='width: 18rem;'><div class='card-body'> <h5 class='card-title'>" + data[i].title + "<hr></h5> <p class='card-text'>" + "Review Score: "+ data[i].score + "</p> <a href='" + data[i].link + "' class='btn btn-secondary'>" + "Link to Review" + "</a>" + "<button id='note' class='btn btn-secondary' data-id=" + data[i]._id + ">" + "Leave a Note" + "</a></div></div>");
    };
});

$(document).on("click", "#note", function () {
    $("#notes").empty();
    let thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    }).then(data => {
        console.log(data);
        $("#notes").append("<h2>" + data.title + "</h2>");
        $("#notes").append("<input id='titleinput' name='title'>");
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea><br>");
        $("#notes").append("<button data-id='" + data._id + "'id='savenote'>Save Note</button>");

        if (data.note) {
            $("#titleinput").val(data.note.title);
            $("#bodyinput").val(data.note.body);
        };
    });
});

$(document).on("click", "#savenote", function() {
    let thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    }).then(data => {
        console.log(data);
        $("#notes").empty();
    });
    $("#titleinput").val("");
    $("#bodyinput").val("");
});