let ui_controller = {
    show_search: () => {
        document.getElementById("search_container").style.display = "flex";
    },
    hide_search: () => {
        document.getElementById("search_container").style.display = "none";
    }
}

let back_to_search_btn = document.getElementById("back_to_search"),
    back_to_results_btn = document.getElementById("back");
search_btn = document.getElementById("submit_btn");
//назначаем кнопочки чтоб прятали-показывали окошко поиска
search_btn.addEventListener("click", ui_controller.hide_search);
back_to_search_btn.addEventListener("click", ui_controller.show_search);
back_to_results_btn.addEventListener("click", ui_controller.hide_search);
//навзяываем на нажатие enter поиск
document.getElementById("search_input").onkeydown = event => {
    if (event.code == "Enter") {
        if (search_inp.value != "") {
            controller.get_obj(search_inp.value)
            ui_controller.hide_search();
        } else {
            alert("пусто")
        }
    }
};