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

// Função auxiliar para criar o cabeçalho (Título + Voltar) de cada nível
function adicionarCabecalho(ul, titulo) {
  const liHeader = document.createElement("li");
  liHeader.classList.add("menu-header");

  // Se não for a raiz "Produtos", adicionamos o botão de voltar
  if (titulo !== "Produtos") {
    const btnVoltar = document.createElement("div");
    btnVoltar.classList.add("btn-voltar");
    btnVoltar.innerHTML = `<i class="fas fa-chevron-left"></i> Voltar`;

    // IMPORTANTE: Remove a classe 'active' especificamente desta UL
    btnVoltar.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      ul.classList.remove("active");
    });
    liHeader.appendChild(btnVoltar);
  }

  const spanTitulo = document.createElement("span");
  spanTitulo.classList.add("menu-titulo-texto");
  spanTitulo.innerText = titulo;
  liHeader.appendChild(spanTitulo);

  ul.appendChild(liHeader);
}

function criarMenuDrilldown(obj, container, titulo = "Produtos") {
  const ul = document.createElement("ul");
  ul.classList.add("menu-drilldown");

  // Adiciona o cabeçalho com a lógica do botão voltar
  adicionarCabecalho(ul, titulo);

  for (let chave in obj) {
    const li = document.createElement("li");
    const conteudo = obj[chave];
    const eObjeto = typeof conteudo === "object" && !Array.isArray(conteudo);
    const eArray = Array.isArray(conteudo);

    li.innerHTML = `<a href="#">${chave} ${eObjeto || eArray ? '<i class="fas fa-chevron-right"></i>' : ""}</a>`;

    if (eObjeto || eArray) {
      li.classList.add("has-children");

      // Evento para abrir o próximo nível ao clicar no item
      li.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const nextUl = li.querySelector(".menu-drilldown");
        if (nextUl) nextUl.classList.add("active");
      });

      if (eObjeto) {
        // Se for um objeto, continua a recursão
        criarMenuDrilldown(conteudo, li, chave);
      } else if (eArray) {
        // Se for um array, cria a lista final de itens
        const ulFinal = document.createElement("ul");
        ulFinal.classList.add("menu-drilldown");

        // Adiciona o cabeçalho (com botão voltar) também na lista final do array
        adicionarCabecalho(ulFinal, chave);

        conteudo.forEach((item) => {
          const liItem = document.createElement("li");
          liItem.innerHTML = `<a href="#">${item}</a>`;
          ulFinal.appendChild(liItem);
        });
        li.appendChild(ulFinal);
      }
    }
    ul.appendChild(li);
  }
  container.appendChild(ul);
}

// Inicialização
const menuDinamico = document.getElementById("menu-dinamico");
const liProdutos = document.createElement("li");
liProdutos.classList.add("dropdown");
liProdutos.innerHTML = `<a href="#" class="nav-link">Produtos <i class="fas fa-chevron-down"></i></a>`;

// Constrói o menu a partir de "Produtos"
criarMenuDrilldown(dadosMenu.Produtos, liProdutos, "Produtos");
menuDinamico.appendChild(liProdutos);
