let movies = [];
let currentId = 0;


$(function() {
    $("#movie-form").on("submit", function(e){
        e.preventDefault();
        let title = $('#title').val();
        let rating = $('#rating').val();

        let movieData = {title, rating, currentId};
        const tableData = createTableData(movieData);

        currentId++
        movies.push(movieData);

        $("#movie-table-body").append(tableData);
        $('#movie-form').trigger('reset');
    });

    $('tbody').on("click", ".delete-button", function(e) {
        let removeIdx = movies.findIndex(movie => movie.currentId === +$(e.target).data("deleteId"))

        movies.splice(removeIdx, 1);
        $(e.target).closest("tr").remove();
    });

    $(".table-header").on("click", function(e) {
        let directionOfSort = $(e.target).hasClass("sort-down") ? "down" : "up";
        let sortingBy = $(e.target).attr("id");
        let sortMovies = sortBy(movies, sortingBy, directionOfSort);

        $("#movie-table-body").empty();

        for (let movie of sortMovies) {
            const tableData = createTableData(movie);
            $("#movie-table-body").append(tableData);
        }

        $(e.target).toggleClass("sort-down");
        $(e.target).toggleClass("sort-up");
    });
});

function sortBy(movies, sortingBy, directionOfSort) {
    return movies.sort(function(i,j) {
        if (sortingBy === "rating") { //convert string to digits
            i[sortingBy] = +i[sortingBy];
            j[sortingBy] = +j[sortingBy];
        }
        if (i[sortingBy] > j[sortingBy]) {
            return directionOfSort === "up" ? 1 : -1;
        } else if (j[sortingBy] > i[sortingBy]) {
            return directionOfSort === "up" ? -1 : 1;
        }
        return 0;
    });
}

function createTableData(movieData) {
    return `
        <tr>
            <td>${movieData.title}</td>
            <td>${movieData.rating}</td>
            <td>
            <button class="delete-button" data-delete-id=${movieData.currentId}>
                Delete
            </button>
        </td>
        <tr>
    `;
}