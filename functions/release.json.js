import { emptyResponse, jsonResponse, resolvePublishedUpdate } from "./_lib/manifest.js";

export async function onRequestOptions() {
  return emptyResponse();
}

export async function onRequestGet(context) {
  try {
    const payload = await resolvePublishedUpdate(context);
    return jsonResponse(payload);
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        checked_at: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
      },
      502,
    );
  }
}
