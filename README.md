# Cloudflare Pages

Esta pasta publica uma landing page mais profissional e colorida, com download direto do seu próprio Cloudflare Pages e uma seção pronta para prints do app.

## O que ela entrega

- `index.html`: página principal de download
- `functions/version.json.js`: JSON enxuto para o app verificar atualizações
- `functions/release.json.js`: JSON completo da versão publicada
- `functions/download.js`: redireciona para o arquivo definido em `data/update.json`
- `assets/screenshots/*.svg`: placeholders para prints da landing page
- `data/update.json`: manifesto público da versão atual
- `downloads/`: pasta do arquivo que será baixado

## Publicação no Cloudflare Pages

1. Abra `Workers & Pages`.
2. Clique em `Create application`.
3. Escolha `Pages`.
4. Conecte este repositório.
5. Em `Root directory`, use:

```text
cloudflare-pages
```

6. Deixe `Build command` vazio.
7. Deixe `Build output directory` vazio.
8. Clique em `Save and Deploy`.

## Endpoints finais

- Página: `https://SEU-PROJETO.pages.dev/`
- Atualizações do app: `https://SEU-PROJETO.pages.dev/version.json`
- Dados completos da release: `https://SEU-PROJETO.pages.dev/release.json`
- Download direto: `https://SEU-PROJETO.pages.dev/download`

## Área de prints

Os prints da landing page ficam em:

```text
cloudflare-pages/assets/screenshots/
```

Você pode substituir os arquivos `.svg` por capturas reais do app, mantendo os mesmos nomes ou ajustando os caminhos no `index.html`.

## Como publicar uma nova versão

1. Coloque o arquivo novo em:

```text
cloudflare-pages/downloads/
```

2. Edite:

```text
cloudflare-pages/data/update.json
```

3. Atualize os campos:

- `version`
- `download_url`
- `asset_name`
- `published_at`
- `notes`

## App desktop

No `.env` do app, use:

```text
UPDATE_MANIFEST_URL=https://SEU-PROJETO.pages.dev/version.json
```

## Repositório público separado

Se você quiser manter o projeto principal privado, use esta pasta como base de um segundo repositório público.

O guia está em:

```text
docs/public-update-repo.md
```

E o script de exportação está em:

```powershell
.\export_public_update_repo.ps1
```
