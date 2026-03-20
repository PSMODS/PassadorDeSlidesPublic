import { buildHeaders, emptyResponse, resolvePublishedUpdate } from "./_lib/manifest.js";

export async function onRequestOptions() {
  return emptyResponse();
}

export async function onRequestGet(context) {
  try {
    const payload = await resolvePublishedUpdate(context);
    const targetUrl = payload.download_url || payload.release_url;
    return Response.redirect(targetUrl, 302);
  } catch (error) {
    return new Response(
      error instanceof Error ? error.message : String(error),
      {
        status: 502,
        headers: buildHeaders({
          "Content-Type": "text/plain; charset=utf-8",
        }),
      },
    );
  }
}
