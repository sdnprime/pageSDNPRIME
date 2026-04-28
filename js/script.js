const dadosMenu = {
  Produtos: {
    Máquinas: {
      Snack: ["6", "AMS"],
      Colibri: ["C5", "C4", "C3", "C2"],
    },
    Peças: {
      Colibri: ["Motor", "Chicote"],
    },
  },
};

function criarMenu(obj, container, nivel = 1) {
  const ul = document.createElement("ul");

  // Se for nível 1, é o submenu que desce. Se for > 1, é o que abre pro lado.
  ul.classList.add(nivel === 1 ? "submenu" : "grandchild-menu");

  for (let chave in obj) {
    const li = document.createElement("li");
    const conteudo = obj[chave];
    const eObjeto = typeof conteudo === "object" && !Array.isArray(conteudo);
    const eArray = Array.isArray(conteudo);

    // No primeiro nível da lista interna, usamos seta para a direita
    const icone =
      eObjeto || eArray ? `<i class="fas fa-chevron-right"></i>` : "";

    li.innerHTML = `<a href="#">${chave} ${icone}</a>`;

    if (eObjeto) {
      li.classList.add("submenu-item");
      // Incrementa o nível na chamada recursiva
      criarMenu(conteudo, li, nivel + 1);
    } else if (eArray) {
      li.classList.add("submenu-item");
      const ulFinal = document.createElement("ul");
      ulFinal.classList.add("grandchild-menu");

      conteudo.forEach((item) => {
        const liItem = document.createElement("li");
        liItem.innerHTML = `<a href="#">${item}</a>`;
        ulFinal.appendChild(liItem);
      });
      li.appendChild(ulFinal);
    }
    ul.appendChild(li);
  }
  container.appendChild(ul);
}

// Inicialização
const menuDinamico = document.getElementById("menu-dinamico");

// Criamos o item principal "Produtos"
const liProdutos = document.createElement("li");
liProdutos.classList.add("dropdown");
// Note que aqui não colocamos a seta fixa, deixamos a função criarMenu gerenciar os filhos
liProdutos.innerHTML = `<a href="#" class="nav-link">Produtos <i class="fas fa-chevron-down"></i></a>`;

// Iniciamos a criação a partir do objeto 'Produtos'
// O container inicial é o liProdutos, então a primeira UL será a '.submenu'
criarMenu(dadosMenu.Produtos, liProdutos, 1);

// Finalmente adicionamos o bloco de Produtos ao menu principal
menuDinamico.appendChild(liProdutos);
