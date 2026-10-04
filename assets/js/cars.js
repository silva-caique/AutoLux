/* ============================================
   AUTOLUX - Catálogo de Automóveis (Dados)
   ============================================
   Para adicionar um novo automóvel:
   1. Copia um objeto existente
   2. Altera os campos (id único, nome, preço, etc.)
   3. Coloca a fotografia na pasta assets/images/cars/
   4. Atualiza o campo "imagem" com o caminho correto
   ============================================ */

const automoveis = [
  {
    id: 1,
    nome: "Aurora GT",
    categoria: "Desportivo",
    ano: 2024,
    quilometragem: 8500,
    combustivel: "Gasolina",
    potencia: "450 CV",
    preco: 89500,
    // 🖼️ IMAGEM DO AUTOMÓVEL: altera o caminho no campo "imagem" deste objeto.
    imagem: "assets/images/cars/car1.jpg",
    etiqueta: "Destaque",
    descricao: "O Aurora GT combina elegância e desempenho numa carroçaria desportiva. Ideal para quem procura emoção ao volante sem comprometer o conforto diário. Demonstração fictícia para o projeto AutoLux.",
    equipamentos: ["Interior em pele premium", "Sistema de som surround", "Suspensão adaptativa", "Faróis LED Matrix", "Ecrã tátil 12\"", "Assistente de condução"]
  },
  {
    id: 2,
    nome: "Vespera Coupé",
    categoria: "Coupé",
    ano: 2023,
    quilometragem: 14200,
    combustivel: "Híbrido",
    potencia: "380 CV",
    preco: 72900,
    // 🖼️ IMAGEM DO AUTOMÓVEL: altera o caminho no campo "imagem" deste objeto.
    imagem: "assets/images/cars/car2.jpg",
    etiqueta: null,
    descricao: "Linhas fluidas e tecnologia híbrida eficiente. O Vespera Coupé oferece uma experiência de condução refinada com consumo otimizado. Dados ilustrativos do catálogo de demonstração.",
    equipamentos: ["Teto panorâmico", "Bancos desportivos", "Carregamento wireless", "Câmara 360°", "Navegação avançada", "Modo de condução Eco"]
  },
  {
    id: 3,
    nome: "Atlas Elite",
    categoria: "SUV Premium",
    ano: 2024,
    quilometragem: 3200,
    combustivel: "Diesel",
    potencia: "340 CV",
    preco: 78500,
    // 🖼️ IMAGEM DO AUTOMÓVEL: altera o caminho no campo "imagem" deste objeto.
    imagem: "assets/images/cars/car3.jpg",
    etiqueta: "Novo",
    descricao: "Espaço, presença e tecnologia. O Atlas Elite é o SUV premium pensado para famílias exigentes e viagens longas com máximo conforto. Modelo fictício para demonstração.",
    equipamentos: ["7 lugares", "Tração integral", "Assistente de estacionamento", "Head-up display", "Ar condicionado 4 zonas", "Porta traseira elétrica"]
  },
  {
    id: 4,
    nome: "Sovereign L",
    categoria: "Berlina de Luxo",
    ano: 2023,
    quilometragem: 18700,
    combustivel: "Híbrido",
    potencia: "410 CV",
    preco: 95200,
    // 🖼️ IMAGEM DO AUTOMÓVEL: altera o caminho no campo "imagem" deste objeto.
    imagem: "assets/images/cars/car4.jpg",
    etiqueta: null,
    descricao: "A berlina executiva por excelência. Silêncio, suavidade e acabamentos de alto nível para quem valoriza a viagem tanto quanto o destino. Conteúdo demonstrativo.",
    equipamentos: ["Bancos massagem", "Cortinas traseiras", "Sistema de áudio premium", "Suspensão pneumática", "Iluminação ambiente", "Assistente de faixa"]
  },
  {
    id: 5,
    nome: "Voltara EV",
    categoria: "Elétrico",
    ano: 2024,
    quilometragem: 5100,
    combustivel: "Elétrico",
    potencia: "520 CV",
    preco: 82900,
    // 🖼️ IMAGEM DO AUTOMÓVEL: altera o caminho no campo "imagem" deste objeto.
    imagem: "assets/images/cars/car5.jpg",
    etiqueta: "Elétrico",
    descricao: "Desempenho elétrico de alto nível com autonomia generosa. O Voltara EV representa o futuro da mobilidade premium sem compromissos. Dados fictícios para o projeto.",
    equipamentos: ["Autonomia até 550 km", "Carregamento rápido", "Modo One-Pedal", "Ecrã panorâmico", "Atualizações over-the-air", "Aquecimento de bancos"]
  },
  {
    id: 6,
    nome: "Thunder RS",
    categoria: "Desportivo Alto Desempenho",
    ano: 2022,
    quilometragem: 9800,
    combustivel: "Gasolina",
    potencia: "620 CV",
    preco: 118500,
    // 🖼️ IMAGEM DO AUTOMÓVEL: altera o caminho no campo "imagem" deste objeto.
    imagem: "assets/images/cars/car6.jpg",
    etiqueta: "Destaque",
    descricao: "Potência bruta e precisão. O Thunder RS é para entusiastas que exigem o máximo em pista e estrada aberta. Modelo de demonstração AutoLux.",
    equipamentos: ["Modo Track", "Travões carbono-cerâmica", "Escape desportivo", "Bancos bucket", "Telemetria", "Diferencial ativo"]
  },
  {
    id: 7,
    nome: "Solara Cabrio",
    categoria: "Cabrio",
    ano: 2023,
    quilometragem: 11200,
    combustivel: "Gasolina",
    potencia: "360 CV",
    preco: 76400,
    // 🖼️ IMAGEM DO AUTOMÓVEL: altera o caminho no campo "imagem" deste objeto.
    imagem: "assets/images/cars/car7.jpg",
    etiqueta: null,
    descricao: "Liberdade sob o céu aberto. O Solara Cabrio oferece o prazer de conduzir com a capota aberta e o conforto de um conversível moderno. Conteúdo ilustrativo.",
    equipamentos: ["Capota elétrica", "Proteção anti-vento", "Áudio otimizado para open-top", "Aquecimento de pescoço", "Sistema de navegação", "Sensores de estacionamento"]
  },
  {
    id: 8,
    nome: "Executive X",
    categoria: "Executivo",
    ano: 2024,
    quilometragem: 2800,
    combustivel: "Híbrido",
    potencia: "300 CV",
    preco: 68900,
    // 🖼️ IMAGEM DO AUTOMÓVEL: altera o caminho no campo "imagem" deste objeto.
    imagem: "assets/images/cars/car8.jpg",
    etiqueta: "Novo",
    descricao: "Discrição e eficiência para o dia a dia profissional. O Executive X combina presença elegante com tecnologia híbrida e baixo consumo. Dados de demonstração.",
    equipamentos: ["Assistente de estacionamento", "Carregador wireless", "Ecrãs traseiros", "Climatização automática", "Cruise control adaptativo", "Alerta de ângulo morto"]
  }
];
