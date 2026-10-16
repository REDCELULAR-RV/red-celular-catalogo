# Red Celular — Catálogo inicial

## Arquivos
- `index.html`: página pública do catálogo.
- `admin.html`: painel de cadastro/edição/exclusão.
- `styles.css` e `admin.css`: visual responsivo preto e vermelho.
- `app.js` e `admin.js`: funcionalidades do catálogo e painel.
- `config.js`: configure aqui o WhatsApp da loja.

## Antes de publicar
1. Abra `config.js` e o WhatsApp comercial já está configurado como `5564992251153` (Brasil + DDD 64 + número informado). Confira se está correto antes de divulgar.
2. Os produtos exibidos inicialmente são exemplos para demonstração, não confirmação de estoque ou preço atual. Edite nomes, preços, descrições, imagens e disponibilidade no painel. As categorias incluem celulares, acessórios, eletrônicos, games, informática, utilidades, presentes e brinquedos.
3. Teste `index.html` e `admin.html` em um navegador moderno.

## Publicação gratuita
Uma opção é usar o GitHub Pages:
1. Crie/entre em uma conta no GitHub.
2. Crie um repositório público chamado, por exemplo, `red-celular-catalogo`.
3. Envie os arquivos desta pasta para a raiz do repositório.
4. Em **Settings → Pages**, escolha publicar a partir da branch `main` e pasta `/ (root)`.
5. Aguarde o endereço do site aparecer na página do GitHub Pages.

Alternativas de hospedagem estática gratuita incluem Cloudflare Pages e Netlify. Os nomes e passos da interface podem mudar.

## Limitação importante da primeira versão
Este painel guarda os produtos no `localStorage` do navegador usado para cadastrar. Isso significa:
- o catálogo público só vê as alterações feitas no mesmo navegador/aparelho em que o painel foi usado;
- limpar os dados do navegador pode apagar o catálogo local;
- os produtos não ficam sincronizados automaticamente entre vários celulares ou computadores;
- imagens são guardadas localmente e aumentam o espaço utilizado.

O backup JSON permite exportar/importar a lista entre navegadores, mas **não substitui um banco de dados online**. Para uma loja usar o painel de vários aparelhos com sincronização real, a próxima etapa é conectar um banco de dados e autenticação (por exemplo, Supabase/Firebase) e proteger o painel com login. Não publique dados pessoais de clientes nesta versão.

## Dica
Antes de divulgar o endereço aos clientes, configure o WhatsApp, troque os exemplos pelos produtos reais e teste os links de pedido.
