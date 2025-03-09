let controller = {
    clear_results_container: () => {
        document.getElementById("found_info").innerHTML = "";
    },

    add_to_document: results_array => {
        results_array.forEach(function (book) { //
            let new_result = `<div class="result">
                <div class="img_container">
                    <img src="${book.volumeInfo.imageLinks?.thumbnail ? book.volumeInfo.imageLinks.thumbnail : ""}">
                </div>
                <div class="info_container">
                    <div class="book_title">
                        ${book.volumeInfo.title}
                    </div>
                    <div>
                        ${book.volumeInfo.authors ? book.volumeInfo.authors : "Автор неизвестен"}
                    </div>
                    <div class="book_description">
                        ${book.volumeInfo.description ? book.volumeInfo.description : book.volumeInfo.subtitle ? book.volumeInfo.subtitle : "Нет описания"}
                    </div>
                </div>
                <div class="control_container">
                    <a${` href="${book.volumeInfo.previewLink}"`}>
                    <button class="preview_btn">Предпросмотр</button>
                    </a>
                    <a${` href="${book.volumeInfo.infoLink}"`}>
                    <button class="buy_btn">Купить в Google Play</button>
                    </a>
                </div>
            </div>`;

            let results_container_element = document.getElementById("found_info");
            results_container_element.innerHTML += new_result;
        });
    },

    show_loading: () => {
        document.getElementById("found_info").innerHTML = "LOADING";
    },

    show_error: () => {
        document.getElementById("found_info").innerHTML = "ERROR";
    },

    get_obj: function(query, how_to="by_text_q") {
        this.clear_results_container();
        this.show_loading();
        let xhr = new XMLHttpRequest(); //объявляем запрос к API
        let apiRoute = `https://www.googleapis.com/books/v1/volumes?q=${query}`; //url к api
        xhr.onreadystatechange = function() {
            let results;
            if (xhr.readyState === 4) {
                if (xhr.status != 200) {
                    console.error(`Sorry. Error occured`);
                    this.show_error();
                    return
                }
                this.clear_results_container();
                this.add_to_document(JSON.parse(xhr.responseText).items);
            }
        }.bind(this);
        xhr.open("get", apiRoute, true);
        xhr.send();
    }
}

let search_btn = document.getElementById("submit_btn");
let search_inp = document.getElementById("search_input");
search_btn.addEventListener("click", () => {if (search_inp.value != "") {controller.get_obj(search_inp.value)} else {alert("пусто")}});