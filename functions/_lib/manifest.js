export function buildHeaders(extra = {}) {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Cache-Control": "public, max-age=120",
    ...extra,
  };
}

export function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: buildHeaders({
      "Content-Type": "application/json; charset=utf-8",
    }),
  });
}

export function emptyResponse(status = 204) {
  return new Response(null, { status, headers: buildHeaders() });
}

function toAbsoluteUrl(requestUrl, value, fallbackPath = "/") {
  const raw = String(value || "").trim();
  const base = new URL(requestUrl);
  if (!raw) {
    return new URL(fallbackPath, base).toString();
  }
  return new URL(raw, base).toString();
}

async function readManifestFromAssets(context) {
  const manifestUrl = new URL("/data/update.json", context.request.url);
  const response = await context.env.ASSETS.fetch(new Request(manifestUrl.toString()));
  if (!response.ok) {
    throw new Error(`Falha ao ler data/update.json (${response.status}).`);
  }
  return response.json();
}

export async function resolvePublishedUpdate(context) {
  const manifest = await readManifestFromAssets(context);
  const version = String(
    manifest.version || manifest.latest_version || "",
  ).trim();

  if (!version) {
    throw new Error("O arquivo data/update.json está sem versão.");
  }

  const releaseUrl = toAbsoluteUrl(context.request.url, manifest.release_url, "/#release");
  const downloadUrl = toAbsoluteUrl(context.request.url, manifest.download_url, "/");
  const assetName = String(manifest.asset_name || manifest.file_name || "Download disponível").trim();

  return {
    ok: true,
    source: "cloudflare_pages",
    repo: "Passador de Slides",
    version,
    latest_version: version,
    tag_name: version,
    title: String(manifest.title || `Versão ${version}`).trim(),
    release_url: releaseUrl,
    html_url: releaseUrl,
    published_at: manifest.published_at || null,
    checked_at: new Date().toISOString(),
    notes: String(manifest.notes || "").trim(),
    assets: [
      {
        id: 1,
        name: assetName,
        size: Number(manifest.file_size || 0),
        content_type: String(manifest.content_type || "application/octet-stream").trim(),
        download_count: Number(manifest.download_count || 0),
        download_url: downloadUrl,
        api_url: downloadUrl,
        updated_at: manifest.published_at || null,
      },
    ],
    primary_asset: {
      id: 1,
      name: assetName,
      download_url: downloadUrl,
    },
    download_url: downloadUrl,
  };
}
