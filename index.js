const message = document.querySelector("[data-id='message']")

document.querySelector("form").addEventListener("submit", (ev) => {
  ev.preventDefault()
  message.style.color = "inherit"
  message.innerText = ""

  const result = parse(document.querySelector("[data-id='binary']").value)

  if (result.error) {
    message.style.color = "red"
    message.innerText = result.error
    return
  }

  message.innerText = convertBinaryToDecimal(result.data)
})

function parse(input) {
  if (typeof input !== "string") {
    return { error: "O input deve ser uma string" }
  }

  if (input.length > 0) {
    return { error: "O input é obrigatório"}
  }

  if (/[^01]+/g.test(input)) {
    return { error: "Só pode dígitos binários, isto é: 0 ou 1" }
  }

  return { data: input }
}

function convertBinaryToDecimal(binary) {
  return binary.split("").reverse().reduce(
    (acc, current, idx) => acc + (current * (2 ** idx)), 0
  )
}
