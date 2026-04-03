# Plane.so REST API – Endpoint reference

Base URL (Plane Cloud): `https://api.plane.so`  
Self-hosted: set your instance API root (same path prefix `/api/v1/...`).  
Auth: `X-API-Key: <token>` or `Authorization: Bearer <oauth>` ([API introduction](https://developers.plane.so/api-reference/introduction)).

Path parameters:

- `{workspace_slug}` – workspace slug from the URL (e.g. `my-team` in `https://app.plane.so/my-team/...`)
- `{project_id}`, `{resource_id}`, etc. – UUIDs unless noted

---

## User

| Method | Path |
|--------|------|
| GET | `/api/v1/users/me/` |

## Workspace – features

| Method | Path |
|--------|------|
| GET | `/api/v1/workspaces/{workspace_slug}/features/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/features/` |

## Workspace – invitations

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/invitations/` |
| GET | `/api/v1/workspaces/{workspace_slug}/invitations/` |
| GET | `/api/v1/workspaces/{workspace_slug}/invitations/{resource_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/invitations/{resource_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/invitations/{resource_id}/` |

## Workspace – members

| Method | Path |
|--------|------|
| GET | `/api/v1/workspaces/{workspace_slug}/members/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/members/{member_id}/` |

## Workspace – project labels (workspace-level)

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/project-labels/` |
| GET | `/api/v1/workspaces/{workspace_slug}/project-labels/` |
| GET | `/api/v1/workspaces/{workspace_slug}/project-labels/{resource_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/project-labels/{resource_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/project-labels/{resource_id}/` |

## Projects (under workspace)

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/projects/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/` |
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/archive/` |
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/unarchive/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/` |

## Project – features

| Method | Path |
|--------|------|
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/features/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/features/` |

## Work items (issues)

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{resource_id}/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/by-identifier/{identifier}/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/search/` |
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/search/advanced/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{resource_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{resource_id}/` |

## Work item – states

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/states/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/states/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/states/{resource_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/states/{resource_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/states/{resource_id}/` |

## Work item – labels (project)

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/labels/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/labels/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/labels/{resource_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/labels/{resource_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/labels/{resource_id}/` |

## Work item – types

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{resource_id}/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{resource_id}/schema/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{resource_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{resource_id}/` |

## Custom properties (issue types)

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{type_id}/properties/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{type_id}/properties/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{type_id}/properties/{property_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{type_id}/properties/{property_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{type_id}/properties/{property_id}/` |

## Custom property values

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{type_id}/properties/{property_id}/values/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{type_id}/properties/{property_id}/values/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{type_id}/properties/{property_id}/values/{value_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{type_id}/properties/{property_id}/values/{value_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{type_id}/properties/{property_id}/values/{value_id}/` |

## Custom property options (dropdown)

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{type_id}/properties/{property_id}/options/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{type_id}/properties/{property_id}/options/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{type_id}/properties/{property_id}/options/{option_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{type_id}/properties/{property_id}/options/{option_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/types/{type_id}/properties/{property_id}/options/{option_id}/` |

## Work item – links

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/links/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/links/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/links/{resource_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/links/{resource_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/links/{resource_id}/` |

## Work item – activity

| Method | Path |
|--------|------|
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/activity/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/activity/{resource_id}/` |

## Work item – comments

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/comments/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/comments/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/comments/{resource_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/comments/{resource_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/comments/{resource_id}/` |

## Work item – attachments

| Method | Path |
|--------|------|
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/attachments/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/attachments/{resource_id}/` |
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/attachments/upload-credentials/` |
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/attachments/sync/` (complete upload – confirm in your Plane version) |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/attachments/{resource_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/attachments/{resource_id}/` |

_Note:_ Binary upload uses the presigned URL from upload-credentials ([upload file](https://developers.plane.so/api-reference/issue-attachments/upload-file)).

## Work item – page links

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/pages/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/pages/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/pages/{resource_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/pages/{resource_id}/` |

## Cycles

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/cycles/` |
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/cycles/{cycle_id}/work-items/` |
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/cycles/{cycle_id}/transfer-work-items/` |
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/cycles/{cycle_id}/archive/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/cycles/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/cycles/{cycle_id}/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/cycles/{cycle_id}/work-items/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/cycles/archived/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/cycles/{cycle_id}/` |
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/cycles/{cycle_id}/unarchive/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/cycles/{cycle_id}/work-items/{work_item_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/cycles/{cycle_id}/` |

## Modules

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/modules/` |
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/modules/{module_id}/work-items/` |
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/modules/{module_id}/archive/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/modules/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/modules/{module_id}/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/modules/{module_id}/work-items/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/modules/archived/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/modules/{module_id}/` |
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/modules/{module_id}/unarchive/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/modules/{module_id}/work-items/{work_item_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/modules/{module_id}/` |

## Pages

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/pages/` |
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/pages/` |
| GET | `/api/v1/workspaces/{workspace_slug}/pages/{page_id}/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/pages/{page_id}/` |

## Intake issues

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/intakes/{intake_id}/issues/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/intakes/{intake_id}/issues/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/intakes/{intake_id}/issues/{resource_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/intakes/{intake_id}/issues/{resource_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/intakes/{intake_id}/issues/{resource_id}/` |

_Path may vary by Plane version; confirm against [Intake API](https://developers.plane.so/api-reference/intake-issue/overview)._

## Assets

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/users/` … (user asset upload – see [Assets](https://developers.plane.so/api-reference/assets/overview)) |
| PATCH | `/api/v1/workspaces/{workspace_slug}/users/` … |
| DELETE | `/api/v1/workspaces/{workspace_slug}/users/` … |
| POST | `/api/v1/workspaces/{workspace_slug}/assets/` … |
| GET | `/api/v1/workspaces/{workspace_slug}/assets/{resource_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/assets/{resource_id}/` |

_Use the official Assets docs for exact paths._

## Milestones

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/milestones/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/milestones/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/milestones/{milestone_id}/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/milestones/{milestone_id}/work-items/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/milestones/{milestone_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/milestones/{milestone_id}/` |

## Estimates

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/estimates/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/estimates/{estimate_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/estimates/{estimate_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/estimates/{estimate_id}/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/estimates/{estimate_id}/points/` |
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/estimates/{estimate_id}/points/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/estimates/{estimate_id}/points/{point_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/estimates/{estimate_id}/points/{point_id}/` |

## Time tracking (worklogs)

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/worklogs/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/worklogs/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/total-time/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/worklogs/{worklog_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/worklogs/{worklog_id}/` |

## Epics

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/epics/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/epics/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/epics/{epic_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/epics/{epic_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/epics/{epic_id}/` |
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/epics/{epic_id}/work-items/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/epics/{epic_id}/work-items/` |

## Initiatives

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/initiatives/` |
| GET | `/api/v1/workspaces/{workspace_slug}/initiatives/` |
| GET | `/api/v1/workspaces/{workspace_slug}/initiatives/{initiative_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/initiatives/{initiative_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/initiatives/{initiative_id}/` |
| POST | `/api/v1/workspaces/{workspace_slug}/initiatives/labels/` |
| POST | `/api/v1/workspaces/{workspace_slug}/initiatives/{initiative_id}/labels/` |
| GET | `/api/v1/workspaces/{workspace_slug}/initiatives/labels/` |
| GET | `/api/v1/workspaces/{workspace_slug}/initiatives/labels/{label_id}/` |
| GET | `/api/v1/workspaces/{workspace_slug}/initiatives/{initiative_id}/labels/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/initiatives/labels/{label_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/initiatives/{initiative_id}/labels/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/initiatives/labels/{label_id}/` |
| POST | `/api/v1/workspaces/{workspace_slug}/initiatives/{initiative_id}/projects/` |
| GET | `/api/v1/workspaces/{workspace_slug}/initiatives/{initiative_id}/projects/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/initiatives/{initiative_id}/projects/` |
| POST | `/api/v1/workspaces/{workspace_slug}/initiatives/{initiative_id}/epics/` |
| GET | `/api/v1/workspaces/{workspace_slug}/initiatives/{initiative_id}/epics/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/initiatives/{initiative_id}/epics/` |

_Some initiative label/project/epic paths may differ slightly; verify in [Initiative API](https://developers.plane.so/api-reference/initiative/overview)._

## Customers

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/customers/` |
| POST | `/api/v1/workspaces/{workspace_slug}/customers/{customer_id}/work-items/` |
| GET | `/api/v1/workspaces/{workspace_slug}/customers/` |
| GET | `/api/v1/workspaces/{workspace_slug}/customers/{customer_id}/` |
| GET | `/api/v1/workspaces/{workspace_slug}/customers/{customer_id}/work-items/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/customers/{customer_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/customers/{customer_id}/work-items/{work_item_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/customers/{customer_id}/` |
| POST | `/api/v1/workspaces/{workspace_slug}/customer-properties/` |
| GET | `/api/v1/workspaces/{workspace_slug}/customer-properties/` |
| GET | `/api/v1/workspaces/{workspace_slug}/customer-properties/{property_id}/` |
| GET | `/api/v1/workspaces/{workspace_slug}/customer-properties/{property_id}/values/` |
| GET | `/api/v1/workspaces/{workspace_slug}/customer-properties/{property_id}/values/{value_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/customer-properties/{property_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/customer-properties/{property_id}/values/{value_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/customer-properties/{property_id}/` |
| POST | `/api/v1/workspaces/{workspace_slug}/customers/{customer_id}/requests/` |
| GET | `/api/v1/workspaces/{workspace_slug}/customers/{customer_id}/requests/` |
| GET | `/api/v1/workspaces/{workspace_slug}/customers/{customer_id}/requests/{request_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/customers/{customer_id}/requests/{request_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/customers/{customer_id}/requests/{request_id}/` |

## Teamspaces

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/teamspaces/` |
| GET | `/api/v1/workspaces/{workspace_slug}/teamspaces/` |
| GET | `/api/v1/workspaces/{workspace_slug}/teamspaces/{teamspace_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/teamspaces/{teamspace_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/teamspaces/{teamspace_id}/` |
| GET | `/api/v1/workspaces/{workspace_slug}/teamspaces/{teamspace_id}/members/` |
| POST | `/api/v1/workspaces/{workspace_slug}/teamspaces/{teamspace_id}/members/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/teamspaces/{teamspace_id}/members/` |
| GET | `/api/v1/workspaces/{workspace_slug}/teamspaces/{teamspace_id}/projects/` |
| POST | `/api/v1/workspaces/{workspace_slug}/teamspaces/{teamspace_id}/projects/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/teamspaces/{teamspace_id}/projects/` |

## Stickies

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/{workspace_slug}/stickies/` |
| GET | `/api/v1/workspaces/{workspace_slug}/stickies/` |
| GET | `/api/v1/workspaces/{workspace_slug}/stickies/{sticky_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/stickies/{sticky_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/stickies/{sticky_id}/` |

## Project – members

| Method | Path |
|--------|------|
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/members/` |
| POST | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/members/` |
| GET | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/members/{member_id}/` |
| PATCH | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/members/{member_id}/` |
| DELETE | `/api/v1/workspaces/{workspace_slug}/projects/{project_id}/members/{member_id}/` |

---

## Query & pagination (common)

Many list endpoints support `cursor`, `per_page`, `expand`, `fields`, `order_by` ([Introduction – Pagination](https://developers.plane.so/api-reference/introduction)).

---

_This document mirrors the node coverage goal; always validate paths against [Plane API Reference](https://developers.plane.so/api-reference/introduction) for your Plane Cloud or self-hosted version._
