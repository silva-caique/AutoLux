# AutoLux — Website Premium de Automóveis

Website completo, moderno e responsivo para uma marca fictícia de automóveis premium chamada **AutoLux**.

Desenvolvido exclusivamente com **HTML5**, **CSS3** e **JavaScript puro (Vanilla JS)**. Sem frameworks, sem bibliotecas externas desnecessárias.

---

## 1. Descrição

A AutoLux é uma marca fictícia especializada na apresentação de automóveis premium, desportivos e de luxo. Este projeto simula o website de um stand de gama alta, com:

- Design elegante (modo escuro e modo claro)
- Catálogo interativo com 8 automóveis fictícios
- Pesquisa, filtros e ordenação em tempo real
- Sistema de favoritos com persistência
- Modal de detalhes
- Formulário de contacto com validação
- FAQ em acordeão
- Animações suaves e microinterações
- Layout totalmente responsivo

**Todos os dados (automóveis, preços, testemunhos, contactos) são demonstrativos.**

---

## 2. Objetivo do projeto

- Criar um resultado visual de qualidade profissional (portefólio)
- Manter o código simples, comentado e compreensível para quem está a aprender
- Demonstrar funcionalidades reais no navegador (sem backend)
- Facilitar a personalização de imagens, cores e conteúdos

---

## 3. Funcionalidades implementadas

| Funcionalidade              | Descrição                                              |
|----------------------------|--------------------------------------------------------|
| Dark / Light mode          | Alternância completa + preferência guardada            |
| Menu mobile                | Abertura/fecho com JavaScript                          |
| Catálogo de 8 automóveis   | Dados em `cars.js`                                     |
| Pesquisa por nome          | Filtragem em tempo real                                |
| Filtros combinados         | Categoria, motorização, preço mínimo/máximo            |
| Ordenação                  | Preço crescente/decrescente, mais recentes             |
| Favoritos                  | localStorage — persistem após atualizar a página       |
| Modal de detalhes          | Abre com Escape / clique fora / botão fechar           |
| FAQ acordeão               | Abre/fecha com animação CSS                            |
| Formulário de contacto     | Validação de campos + feedback de sucesso (demo)       |
| Contadores animados        | Estatísticas ao aparecer no ecrã                       |
| Reveal ao scroll           | IntersectionObserver                                   |
| Ano automático no rodapé   | JavaScript                                             |

---

## 4. Tecnologias utilizadas

- **HTML5** — estrutura semântica
- **CSS3** — variáveis CSS para temas, Grid, Flexbox, animações, media queries
- **JavaScript (Vanilla)** — interações, filtros, localStorage, IntersectionObserver

Nenhuma framework (React, Vue, Angular, Bootstrap, Tailwind, etc.).

---

## 5. Estrutura de pastas

```
AutoLux/
├── index.html                 # Página principal
├── README.md                  # Este ficheiro
└── assets/
    ├── css/
    │   └── style.css          # Todos os estilos e temas
    ├── js/
    │   ├── cars.js            # Dados dos automóveis (fácil de editar)
    │   └── script.js          # Lógica (tema, filtros, modal, etc.)
    └── images/
        ├── hero/
        │   └── hero-car.jpg   # Imagem da secção inicial
        ├── cars/
        │   ├── car1.jpg … car8.jpg
        ├── about/
        │   └── about-car.jpg
        └── services/          # (pasta preparada para futuras imagens)
```

---

## 6. Como executar o website

1. Extraia o ficheiro `AutoLux.zip`.
2. Abra a pasta `AutoLux`.
3. Faça duplo clique em `index.html` **ou** abra-o no browser (Chrome, Firefox, Edge, Safari).

Não é necessário instalar Node.js, npm nem qualquer ferramenta.  
Todas as funcionalidades funcionam diretamente no navegador.

> **Nota:** O formulário de contacto não envia emails (não existe backend). A mensagem de sucesso deixa isso claro.

---

## 7. Como alterar as fotografias

Todas as imagens estão organizadas em pastas e têm **comentários visíveis** no código.

### Hero (imagem de fundo da primeira secção)
- Ficheiro: `assets/images/hero/hero-car.jpg`
- No HTML (`index.html`):
  ```html
  <!-- 🖼️ IMAGEM PRINCIPAL DA HERO: altera o caminho no atributo src abaixo. -->
  <img src="assets/images/hero/hero-car.jpg" alt="...">
  ```

### Automóveis (cartões e modal)
- Coloque as novas fotografias em `assets/images/cars/`
- Edite o ficheiro `assets/js/cars.js`
- Em cada objeto existe um comentário:
  ```js
  // 🖼️ IMAGEM DO AUTOMÓVEL: altera o caminho no campo "imagem" deste objeto.
  imagem: "assets/images/cars/car1.jpg",
  ```

### Secção Sobre Nós
- Ficheiro: `assets/images/about/about-car.jpg`
- Comentário no HTML junto ao `<img>`.

**Dica:** Mantenha proporções semelhantes (paisagem) e use `object-fit: cover` (já aplicado no CSS).

---

## 8. Como adicionar um novo automóvel

1. Abra `assets/js/cars.js`.
2. Copie um objeto existente (por exemplo o último).
3. Altere os campos:
   - `id` → número único
   - `nome`, `categoria`, `ano`, `quilometragem`, `combustivel`, `potencia`, `preco`
   - `imagem` → caminho da nova fotografia
   - `etiqueta` → `"Destaque"`, `"Novo"`, `"Elétrico"` ou `null`
   - `descricao` e `equipamentos`
4. Guarde o ficheiro e atualize a página.

Exemplo mínimo:

```js
{
  id: 9,
  nome: "Novo Modelo",
  categoria: "Desportivo",
  ano: 2025,
  quilometragem: 1000,
  combustivel: "Elétrico",
  potencia: "480 CV",
  preco: 92000,
  // 🖼️ IMAGEM DO AUTOMÓVEL: altera o caminho no campo "imagem" deste objeto.
  imagem: "assets/images/cars/car9.jpg",
  etiqueta: "Novo",
  descricao: "Descrição do novo modelo...",
  equipamentos: ["Item 1", "Item 2", "Item 3"]
}
```

---

## 9. Como alterar preços e características

Tudo está centralizado em `assets/js/cars.js`.  
Basta editar os valores numéricos e textos dos objetos. Não é necessário tocar no HTML nem no CSS.

---

## 10. Como personalizar as cores

Abra `assets/css/style.css` e localize a secção **VARIÁVEIS CSS** no início do ficheiro.

```css
:root {
  --accent: #c9a227;          /* Cor de destaque (dourado) */
  --accent-hover: #dbb42c;
  /* ... */
}

[data-theme="dark"] {
  --bg-body: #0d0d0f;
  --bg-surface: #16161a;
  --text-primary: #f5f5f7;
  /* ... */
}

[data-theme="light"] {
  --bg-body: #f5f5f7;
  --bg-surface: #ffffff;
  /* ... */
}
```

Altere apenas estas variáveis. O resto do CSS usa-as automaticamente.

---

## 11. Como funciona o Dark Mode / Light Mode

1. O botão no cabeçalho chama a função `toggleTheme()`.
2. O tema atual é guardado em `localStorage` com a chave `autolux-theme`.
3. Na primeira visita, o website consulta `prefers-color-scheme` do sistema operativo.
4. O atributo `data-theme="dark"` ou `data-theme="light"` no elemento `<html>` ativa as variáveis CSS correspondentes.
5. Transições suaves são aplicadas via CSS.

---

## 12. Sistema de favoritos

- Cada cartão tem um botão de coração.
- Os IDs dos automóveis favoritos são guardados em `localStorage` (`autolux-favorites`).
- Ao atualizar a página, os favoritos permanecem.
- Existe um filtro “Só favoritos” e um contador no painel de filtros.
- Código comentado em `script.js` (secção 3).

---

## 13. Limitações da versão de demonstração

- **Não existe backend** — o formulário de contacto apenas valida e mostra uma mensagem de sucesso no navegador.
- Os automóveis, preços, quilometragens e testemunhos são **fictícios**.
- Os contactos (email, telefone, morada) são **demonstrativos**.
- Não há integração real de financiamento, retomas ou agendamento de visitas.
- As imagens são de fontes públicas (Unsplash) e incluídas localmente no ZIP.

---

## 14. Fontes das imagens

Todas as fotografias de automóveis foram obtidas de **Unsplash** (https://unsplash.com), sob a [Unsplash License](https://unsplash.com/license):

- Uso gratuito (incluindo comercial)
- Não é obrigatória atribuição (mas é apreciada)
- Sem necessidade de pedir permissão

As imagens foram descarregadas e incluídas localmente na pasta `assets/images/` para o website funcionar offline.

---

## 15. Funcionalidades que exigiriam um backend real

Para transformar este projeto num website de produção seriam necessários:

- Servidor / API para receber e guardar mensagens do formulário
- Base de dados para o catálogo de automóveis e disponibilidade em tempo real
- Sistema de autenticação (se existissem áreas de cliente)
- Integração com serviços de email (SendGrid, Mailgun, etc.)
- Gestão de conteúdo (CMS) para atualizar o catálogo sem editar código
- Proteção CSRF e validação server-side

---

## 16. Aviso importante

> **Todos os automóveis, preços, contactos, testemunhos e dados apresentados neste website são exclusivamente demonstrativos.**  
> A AutoLux é uma marca fictícia criada para este projeto de aprendizagem e portefólio.  
> Não existe qualquer associação com fabricantes reais, stands ou empresas existentes.

---

## 17. Como continuar a aprender com este projeto

Ideias para evoluir:

1. Adicionar mais automóveis e fotografias próprias.
2. Implementar um “comparador” de dois modelos.
3. Criar uma página de detalhes separada (em vez de modal).
4. Adicionar um mapa (Leaflet ou similar) na secção de contactos.
5. Ligar o formulário a um serviço gratuito de formulários (Formspree, etc.).
6. Explorar CSS avançado (container queries, scroll-driven animations).

---

**Desenvolvido com atenção ao design, à organização e à clareza do código.**  
Bom trabalho e boa aprendizagem!
