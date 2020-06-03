const buttonSearch = document.querySelector("#page-home main a")

const close = document.querySelector("div#modal div.header a")

const modal = document.querySelector("div#modal")


buttonSearch.addEventListener("click", () => {
  modal.classList.remove("hide")
})

close.addEventListener("click", () => {
  modal.classList.add("hide")
})