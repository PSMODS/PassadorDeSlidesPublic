# Downloads

Esta pasta recebe o instalador real que será baixado pelo público.

No fluxo atual, o script abaixo copia automaticamente a release mais nova para cá:

```powershell
.\release_public.ps1
```

Arquivo atual esperado:

```text
cloudflare-pages/downloads/PassadorDeSlides-Setup-v0.2.0.exe
```

Depois, ajuste o arquivo:

```text
cloudflare-pages/data/update.json
```

Campos principais:

- `version`
- `download_url`
- `asset_name`
- `published_at`
- `notes`
