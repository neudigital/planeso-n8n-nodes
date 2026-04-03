# n8n-nodes-plane

[n8n](https://n8n.io) community nodes for **[Plane](https://plane.so)** — projects, work items, cycles, modules, epics, and the rest of the public REST API.

## Features

- **Single Plane node** with a **Resource** dropdown (projects, work items, labels, cycles, custom properties, teamspaces, etc.) and **Operation** per resource.
- **Declarative HTTP** (`routing.request`) — no custom `execute()` boilerplate.
- **`Plane API` credential**: API key (`X-API-Key`) plus **configurable base URL** for **Plane Cloud** or **self-hosted** instances.
- **Endpoint reference**: see [`PLANE_API_ENDPOINTS.md`](./PLANE_API_ENDPOINTS.md).

## Installation

### Community nodes (self-hosted n8n)

In **Settings → Community nodes**, install:

```text
n8n-nodes-plane
```

Or from this repository after build:

```bash
npm install /path/to/planeso-n8n-nodes
```

### Development

```bash
git clone https://github.com/planeso/planeso-n8n-nodes.git
cd planeso-n8n-nodes
npm install
npm run dev
```

## Credentials

1. Create a credential **Plane API**.
2. **Base URL**: `https://api.plane.so` (cloud) or your self-hosted API origin (e.g. `https://plane.example.com`).
3. **API key**: your Plane API key (sent as `X-API-Key`).

The credential test calls `GET /api/v1/users/me/`.

## Using the node

1. Add the **Plane** node to a workflow.
2. Select **Credential** → **Plane API**.
3. Choose **Resource** (e.g. *Work Item*, *Cycle*).
4. Choose **Operation** (e.g. *Create*, *List*).
5. Fill **Workspace Slug**, **Project ID**, and other IDs as prompted.
6. For create/update operations, use the **Request Body** JSON field with the payload expected by the Plane API.

Workspace slug is the segment in your Plane URL: `https://app.plane.so/<workspace>/...`.

## Scripts

| Script | Description |
| ------ | ----------- |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run lint` | Run n8n node linter |
| `npm run lint:fix` | Auto-fix lint issues where possible |
| `npm run dev` | Develop with hot reload (`n8n-node dev`) |
| `npm run release` | Version bump and release (see publish workflow) |

## Publishing

Releases are intended to be published via the included GitHub Action (see `.github/workflows/publish.yml`). Configure **Trusted Publishers** on npm for your fork/org as described in that workflow.

## License

[MIT](./LICENSE.md)
