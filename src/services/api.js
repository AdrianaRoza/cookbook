export async function criarReceita(dados) {
  const response = await fetch("http://127.0.0.1:8000/receitas/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })

  if (!response.ok) {
    throw new Error("Erro ao criar receita")
  }

  return await response.json()
}
