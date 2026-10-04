# Portfólio — Julio Eduardo

Portfólio pessoal de **Julio Eduardo**, Desenvolvedor Full Stack em Goiânia (GO).

🔗 **https://julio25ed.github.io/Portfolio-Julio/**

Página única, estática, em HTML + CSS + JavaScript puro. Sem build, sem dependências
de pacote: o que está no repositório é exatamente o que vai para o ar.

---

## Como rodar

Qualquer servidor estático na raiz do projeto:

```bash
npx serve .
# ou
python -m http.server 8000
```

Um servidor é necessário porque o download do currículo e os caminhos relativos
não funcionam bem ao abrir o arquivo direto pelo `file://`.

---

## Estrutura

```
index.html          página inteira, em HTML semântico

css/
  base.css          tokens, temas, reset, tipografia, fundo fixo e primitivos
                    compartilhados (.container, .eyebrow, .btn, .win, footer)
  navbar.css        cápsula flutuante de navegação
  hero.css          primeira dobra e cenário 3D
  about.css         seção Sobre e card julio.config.ts
  skills.css        grid de skills por categoria
  experience.css    timeline profissional
  projects.css      cards de projeto e janelas de código
  contact.css       contato e card de download do currículo

js/
  motion.js         decide se a página pode animar e roda os laços decorativos
  theme.js          alterna o tema e persiste em localStorage
  hero.js           tilt 3D, terminal e pipeline
  spotlight.js      glows que seguem o cursor
  scroll.js         barra de progresso, nav ativa e scroll reveal

assets/
  img/              avatar (WebP + JPG) e a foto original, usada no Open Graph
  icons/            favicon
  cv/               currículo em PDF
```

Cada arquivo de CSS cuida de uma seção e só estiliza dentro da própria classe raiz.
O `base.css` é o único que toca em `:root`, `html` e `body`.

---

## Como alterar o conteúdo

| O que mudar | Onde |
|---|---|
| Currículo | substituir `assets/cv/Julio_Eduardo-Cv.pdf`, mantendo o nome |
| Textos, projetos, timeline, skills | direto no `index.html` |
| Cor de destaque | `--accHue` no `css/base.css`: `285` violeta, `250` azul, `160` esmeralda |
| Tema padrão | os tokens de `:root` são o tema escuro; `[data-theme="light"]` é o claro |

---

## Decisões que valem saber

**Tema sem piscar.** Um script inline no `<head>` lê o `localStorage` e aplica o tema
antes da primeira pintura. Se ele saísse dali, a página carregaria escura e só então
mudaria para o claro.

**Animação é opcional.** Tudo passa por `window.JD.motion`, que respeita
`prefers-reduced-motion`. Com a preferência ativa, nada se move: o terminal já aparece
com o build concluído, o pipeline fica parado no último estágio e o conteúdo carrega
todo visível.

**As imagens dos projetos são HTML.** Cada card mostra uma janela de código com as
rotas, o payload ou a saída daquele projeto, em vez de um screenshot genérico. São
trocáveis por capturas reais quando existirem.

**O avatar não é a foto original.** `eu2.jpg` tem 828 KB e permanece no repositório
apenas como imagem de Open Graph. O avatar exibido é um recorte de 128px servido em
WebP com alternativa em JPG.

---

## Contato

- **E-mail:** julio25.dev@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/juliodev25/
- **GitHub:** https://github.com/Julio25ED
