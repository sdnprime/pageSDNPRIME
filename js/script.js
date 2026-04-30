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

function adicionarCabecalho(ul, titulo) {
  const liHeader = document.createElement("li");
  liHeader.classList.add("menu-header");

  if (titulo !== "Produtos") {
    const btnVoltar = document.createElement("div");
    btnVoltar.classList.add("btn-voltar");
    btnVoltar.innerHTML = `<i class="fas fa-chevron-left"></i> Voltar`;
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
  adicionarCabecalho(ul, titulo);

  for (let chave in obj) {
    const li = document.createElement("li");
    const conteudo = obj[chave];
    const eObjeto = typeof conteudo === "object" && !Array.isArray(conteudo);
    const eArray = Array.isArray(conteudo);

    li.innerHTML = `<a href="#">${chave} ${eObjeto || eArray ? '<i class="fas fa-chevron-right"></i>' : ""}</a>`;

    if (eObjeto || eArray) {
      li.classList.add("has-children");
      li.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const nextUl = li.querySelector(".menu-drilldown");
        if (nextUl) nextUl.classList.add("active");
      });

      if (eObjeto) {
        criarMenuDrilldown(conteudo, li, chave);
      } else if (eArray) {
        const ulFinal = document.createElement("ul");
        ulFinal.classList.add("menu-drilldown");
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

// --- INICIALIZAÇÃO E POSICIONAMENTO ---
const menuDinamico = document.getElementById("menu-dinamico");
const liProdutos = document.createElement("li");
liProdutos.classList.add("dropdown");
liProdutos.innerHTML = `<a href="#" class="nav-link" id="btn-produtos">Produtos <i class="fas fa-chevron-down"></i></a>`;

criarMenuDrilldown(dadosMenu.Produtos, liProdutos, "Produtos");

// Insere entre Início (0) e Contato (1)
const itensIniciais = menuDinamico.querySelectorAll("li");
if (itensIniciais.length >= 2) {
  menuDinamico.insertBefore(liProdutos, itensIniciais[1]);
} else {
  menuDinamico.appendChild(liProdutos);
}

// Evento de Clique Principal
const btnProdutos = document.getElementById("btn-produtos");
btnProdutos.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  liProdutos.classList.toggle("open");
});

// Fechar ao clicar fora
document.addEventListener("click", (e) => {
  if (!liProdutos.contains(e.target)) {
    liProdutos.classList.remove("open");
    liProdutos
      .querySelectorAll(".menu-drilldown.active")
      .forEach((m) => m.classList.remove("active"));
  }
});
