/* ============================================
   AUTOLUX - JavaScript Principal
   Código organizado por funcionalidades
   ============================================ */

// ----------------------------------------
// 1. TEMA (Dark / Light Mode)
// ----------------------------------------
// Preferência guardada em localStorage com a chave "autolux-theme"
// Na primeira visita, respeita a preferência do sistema operativo

function initTheme() {
  const savedTheme = localStorage.getItem('autolux-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  let theme = 'dark'; // padrão
  if (savedTheme) {
    theme = savedTheme;
  } else if (!systemPrefersDark) {
    theme = 'light';
  }

  document.documentElement.setAttribute('data-theme', theme);
  updateThemeButton(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('autolux-theme', next);
  updateThemeButton(next);
}

function updateThemeButton(theme) {
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.setAttribute('aria-label', theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro');
  }
}

// ----------------------------------------
// 2. MENU MOBILE
// ----------------------------------------
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  const links = nav ? nav.querySelectorAll('.nav-link') : [];

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
    const isOpen = nav.classList.contains('active');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Fechar menu ao clicar num link
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ----------------------------------------
// 3. FAVORITOS (localStorage)
// ----------------------------------------
// Guarda os IDs dos favoritos em localStorage com a chave "autolux-favorites"
// Formato: array de números, ex: [1, 5, 3]

function getFavorites() {
  const data = localStorage.getItem('autolux-favorites');
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem('autolux-favorites', JSON.stringify(favorites));
  updateFavoritesCount();
}

function toggleFavorite(carId) {
  let favorites = getFavorites();
  const index = favorites.indexOf(carId);

  if (index === -1) {
    favorites.push(carId);
  } else {
    favorites.splice(index, 1);
  }

  saveFavorites(favorites);
  return favorites.includes(carId);
}

function isFavorite(carId) {
  return getFavorites().includes(carId);
}

function updateFavoritesCount() {
  const countEl = document.getElementById('favorites-count');
  if (countEl) {
    const count = getFavorites().length;
    countEl.textContent = count;
    countEl.parentElement.style.display = count > 0 ? 'inline-flex' : 'none';
  }
}

// ----------------------------------------
// 4. RENDERIZAÇÃO DOS CARTÕES DE AUTOMÓVEIS
// ----------------------------------------
function formatPrice(price) {
  return price.toLocaleString('pt-PT') + ' €';
}

function formatKm(km) {
  return km.toLocaleString('pt-PT') + ' km';
}

function createCarCard(car) {
  const isFav = isFavorite(car.id);
  const badgeClass = car.etiqueta === 'Elétrico' ? 'electric' : (car.etiqueta === 'Novo' ? 'new' : '');
  const badgeHtml = car.etiqueta
    ? '<span class="car-badge ' + badgeClass + '">' + car.etiqueta + '</span>'
    : '';

  return `
    <article class="car-card" data-id="${car.id}">
      <div class="car-card-image">
        <!-- 🖼️ IMAGEM DO AUTOMÓVEL: o caminho vem do campo "imagem" em cars.js -->
        <img src="${car.imagem}" alt="${car.nome} - ${car.categoria}" loading="lazy">
        ${badgeHtml}
        <button class="fav-btn ${isFav ? 'active' : ''}" 
                data-id="${car.id}" 
                aria-label="${isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="car-card-body">
        <p class="car-category">${car.categoria}</p>
        <h3 class="car-name">${car.nome}</h3>
        <div class="car-specs">
          <span>${car.ano}</span>
          <span>${formatKm(car.quilometragem)}</span>
          <span>${car.combustivel}</span>
          <span>${car.potencia}</span>
        </div>
        <p class="car-price">${formatPrice(car.preco)}</p>
        <div class="car-actions">
          <button class="btn btn-primary btn-sm btn-details" data-id="${car.id}">Ver detalhes</button>
        </div>
      </div>
    </article>
  `;
}

function renderCars(carsList) {
  const grid = document.getElementById('cars-grid');
  if (!grid) return;

  if (carsList.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <h3>Nenhum automóvel encontrado</h3>
        <p>Tente ajustar os filtros ou limpar a pesquisa.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = carsList.map(createCarCard).join('');

  // Eventos dos botões de favorito
  grid.querySelectorAll('.fav-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute('data-id'), 10);
      const nowFav = toggleFavorite(id);
      btn.classList.toggle('active', nowFav);
      btn.setAttribute('aria-label', nowFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
    });
  });

  // Eventos dos botões de detalhes
  grid.querySelectorAll('.btn-details').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      openModal(id);
    });
  });
}

// ----------------------------------------
// 5. FILTROS, PESQUISA E ORDENAÇÃO
// ----------------------------------------
function getFilteredCars() {
  const search = document.getElementById('search-input')?.value.toLowerCase().trim() || '';
  const category = document.getElementById('filter-category')?.value || '';
  const fuel = document.getElementById('filter-fuel')?.value || '';
  const minPrice = parseInt(document.getElementById('price-min')?.value, 10) || 0;
  const maxPrice = parseInt(document.getElementById('price-max')?.value, 10) || Infinity;
  const sort = document.getElementById('sort-select')?.value || 'default';
  const onlyFavorites = document.getElementById('show-favorites')?.checked || false;

  let result = automoveis.slice();

  // Pesquisa por nome
  if (search) {
    result = result.filter(function (car) {
      return car.nome.toLowerCase().includes(search);
    });
  }

  // Filtro por categoria
  if (category) {
    result = result.filter(function (car) {
      return car.categoria === category;
    });
  }

  // Filtro por combustível
  if (fuel) {
    result = result.filter(function (car) {
      return car.combustivel === fuel;
    });
  }

  // Filtro por preço
  result = result.filter(function (car) {
    return car.preco >= minPrice && car.preco <= maxPrice;
  });

  // Apenas favoritos
  if (onlyFavorites) {
    const favs = getFavorites();
    result = result.filter(function (car) {
      return favs.includes(car.id);
    });
  }

  // Ordenação
  if (sort === 'price-asc') {
    result.sort(function (a, b) { return a.preco - b.preco; });
  } else if (sort === 'price-desc') {
    result.sort(function (a, b) { return b.preco - a.preco; });
  } else if (sort === 'newest') {
    result.sort(function (a, b) { return b.ano - a.ano; });
  }

  return result;
}

function applyFilters() {
  const filtered = getFilteredCars();
  renderCars(filtered);
}

function clearFilters() {
  document.getElementById('search-input').value = '';
  document.getElementById('filter-category').value = '';
  document.getElementById('filter-fuel').value = '';
  document.getElementById('price-min').value = '';
  document.getElementById('price-max').value = '';
  document.getElementById('sort-select').value = 'default';
  document.getElementById('show-favorites').checked = false;
  applyFilters();
}

function initFilters() {
  const inputs = [
    'search-input',
    'filter-category',
    'filter-fuel',
    'price-min',
    'price-max',
    'sort-select',
    'show-favorites'
  ];

  inputs.forEach(function (id) {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', applyFilters);
      el.addEventListener('change', applyFilters);
    }
  });

  const clearBtn = document.getElementById('clear-filters');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearFilters);
  }
}

// ----------------------------------------
// 6. MODAL DE DETALHES
// ----------------------------------------
function openModal(carId) {
  const car = automoveis.find(function (c) { return c.id === carId; });
  if (!car) return;

  const overlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-content');

  if (!overlay || !modalBody) return;

  const featuresHtml = car.equipamentos
    .map(function (item) { return '<li>' + item + '</li>'; })
    .join('');

  modalBody.innerHTML = `
    <!-- 🖼️ IMAGEM DO AUTOMÓVEL NO MODAL: caminho vem de cars.js -->
    <img class="modal-image" src="${car.imagem}" alt="${car.nome}">
    <div class="modal-body">
      <div class="modal-header">
        <div>
          <p class="car-category">${car.categoria}</p>
          <h2 class="modal-name">${car.nome}</h2>
        </div>
        <p class="modal-price">${formatPrice(car.preco)}</p>
      </div>
      <div class="modal-specs">
        <div class="modal-spec">
          <p class="modal-spec-label">Ano</p>
          <p class="modal-spec-value">${car.ano}</p>
        </div>
        <div class="modal-spec">
          <p class="modal-spec-label">Quilometragem</p>
          <p class="modal-spec-value">${formatKm(car.quilometragem)}</p>
        </div>
        <div class="modal-spec">
          <p class="modal-spec-label">Motorização</p>
          <p class="modal-spec-value">${car.combustivel}</p>
        </div>
        <div class="modal-spec">
          <p class="modal-spec-label">Potência</p>
          <p class="modal-spec-value">${car.potencia}</p>
        </div>
      </div>
      <p class="modal-description">${car.descricao}</p>
      <div class="modal-features">
        <h4>Equipamentos de destaque</h4>
        <ul>${featuresHtml}</ul>
      </div>
      <button class="btn btn-primary" id="modal-interest-btn">Demonstrar interesse</button>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Foco no botão de fechar para acessibilidade
  document.getElementById('modal-close')?.focus();

  // Botão de interesse (demonstração)
  document.getElementById('modal-interest-btn')?.addEventListener('click', function () {
    alert('Obrigado pelo interesse no ' + car.nome + '!\n\nEsta é uma demonstração. Num website real, este botão enviaria o pedido para a equipa AutoLux.');
  });
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initModal() {
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closeModal();
      }
    });
  }

  // Fechar com tecla Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

// ----------------------------------------
// 7. FAQ (Acordeão)
// ----------------------------------------
function initFaq() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function () {
      const isActive = item.classList.contains('active');

      // Fecha todos os outros
      items.forEach(function (other) {
        other.classList.remove('active');
        other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      // Abre ou fecha o atual
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ----------------------------------------
// 8. FORMULÁRIO DE CONTACTO
// ----------------------------------------
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successBox = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Limpar erros anteriores
    form.querySelectorAll('.form-group').forEach(function (group) {
      group.classList.remove('has-error');
    });

    let isValid = true;

    // Validação do nome
    const name = document.getElementById('contact-name');
    if (!name.value.trim()) {
      name.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validação do email
    const email = document.getElementById('contact-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      email.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validação da mensagem
    const message = document.getElementById('contact-message');
    if (!message.value.trim()) {
      message.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    if (!isValid) return;

    // Sucesso (demonstração - não envia nada)
    form.style.display = 'none';
    if (successBox) {
      successBox.classList.add('active');
    }
  });

  // Botão para repor o formulário
  const resetBtn = document.getElementById('form-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      form.reset();
      form.style.display = 'block';
      if (successBox) {
        successBox.classList.remove('active');
      }
      form.querySelectorAll('.form-group').forEach(function (group) {
        group.classList.remove('has-error');
      });
    });
  }
}

// ----------------------------------------
// 9. ANIMAÇÃO DE CONTAGEM DAS ESTATÍSTICAS
// ----------------------------------------
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');

  counters.forEach(function (counter) {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      counter.textContent = current.toLocaleString('pt-PT') + (counter.getAttribute('data-suffix') || '');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  });
}

// ----------------------------------------
// 10. REVEAL AO SCROLL (IntersectionObserver)
// ----------------------------------------
function initReveal() {
  const elements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Animar contadores quando a secção de stats aparecer
          if (entry.target.classList.contains('stats-grid')) {
            animateCounters();
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
}

// ----------------------------------------
// 11. ATUALIZAR ANO NO RODAPÉ
// ----------------------------------------
function updateYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ----------------------------------------
// INICIALIZAÇÃO
// ----------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  initMobileMenu();
  initFilters();
  initModal();
  initFaq();
  initContactForm();
  initReveal();
  updateYear();
  updateFavoritesCount();

  // Renderizar todos os automóveis no início
  renderCars(automoveis);

  // Botão de tema
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }
});
