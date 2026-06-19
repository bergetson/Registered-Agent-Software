# Data Model — Berget Law Entity Manager

This document describes the planned Supabase/Postgres schema for the app.
**Status: planned.** No tables exist yet — they will be created starting in
Phase 1 (`firms`, `profiles`) and Phase 2 (everything else). This file will
be updated with actual migration file references once the schema is
implemented.

## Conventions used across all tables

- Every table has `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`.
- Every major table has `firm_id UUID REFERENCES firms(id)`, even though
  only one firm (Berget Law) exists today. This keeps the data model honest
  and avoids a future migration; it is not a step toward multi-tenant SaaS.
- Every table has `created_at TIMESTAMPTZ DEFAULT now()` and
  `updated_at TIMESTAMPTZ DEFAULT now()`, maintained by an `updated_at`
  trigger.
- Soft delete only: `entities` and `clients` use `status` /
  `is_archived` / `archived_at` / `archive_reason` fields. There is no hard
  delete path in the UI for these records by default.
- Row Level Security (RLS) is enabled on every table and scoped by
  `firm_id` matching the authenticated user's `profiles.firm_id`. See
  `SECURITY_NOTES.md` for the policy approach.
- Indexes are added on `firm_id`, `client_id`, `entity_id`, due-date
  columns, status columns, and `filing_number`.

## Entity-relationship overview

```
firms 1───* profiles
firms 1───* clients 1───* entities 1───* principals
firms 1───* state_rules
entities 1───* annual_reports
entities/clients/annual_reports 1───* tasks
entities/clients/annual_reports 1───* billing_records
entities/clients/annual_reports 1───* documents
entities/clients/annual_reports 1───* communications
firms 1───* templates
firms 1───* audit_logs
firms 1───* calendar_connections 1───* calendar_events
```

## Tables

### firms

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | PK |
| firm_name | text | e.g. "Berget Law" |
| firm_slug | text | unique, e.g. "berget-law" |
| default_registered_agent_fee | numeric | seed: 250 |
| default_state | text | seed: "MT" |
| created_at / updated_at | timestamptz | |

Seed: one row for Berget Law (`berget-law`, fee `250`, state `MT`).

### profiles

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | PK, FK to `auth.users.id` |
| full_name | text | |
| email | text | |
| role | text | one of: admin, attorney, staff, billing, read_only |
| firm_id | uuid | FK to `firms.id` |
| is_active | boolean | |
| created_at / updated_at | timestamptz | |

### clients

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | PK |
| firm_id | uuid | FK |
| client_name | text | |
| client_type | text | individual, business, trust, estate, other |
| primary_contact_name / _email / _phone | text | |
| mailing_address | text | |
| billing_address | text | |
| notes | text | |
| responsible_attorney_id | uuid | FK to `profiles.id` |
| responsible_staff_id | uuid | FK to `profiles.id` |
| status | text | active, inactive, archived |
| created_at / updated_at | timestamptz | |

### entities

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | PK |
| firm_id | uuid | FK |
| client_id | uuid | FK to `clients.id` |
| legal_name | text | |
| entity_type | text | LLC, corporation, nonprofit, partnership, LP, LLP, assumed_business_name, foreign_llc, foreign_corporation, other |
| domestic_or_foreign | text | domestic, foreign, unknown |
| state_of_formation | text | |
| state_tracked | text | which state's rules/deadlines apply |
| filing_number | text | indexed |
| formation_date | date | |
| current_status | text | active, inactive, dissolved, delinquent, revoked, pending_reinstatement, no_longer_represented, unknown |
| registered_agent_name | text | |
| registered_agent_type | text | firm, individual, third_party, unknown |
| registered_office_address | text | |
| principal_office_address | text | |
| mailing_address | text | |
| business_purpose | text | |
| annual_report_due_date | date | indexed |
| last_annual_report_filed_date | date | |
| next_action_date | date | indexed |
| assigned_user_id | uuid | FK to `profiles.id` |
| default_registered_agent_fee | numeric | overrides firm default when set |
| billing_notes | text | |
| internal_notes | text | |
| tags | text[] | |
| is_archived | boolean | |
| archived_at | timestamptz | |
| archive_reason | text | |
| created_at / updated_at | timestamptz | |

### principals

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | PK |
| firm_id | uuid | FK |
| entity_id | uuid | FK |
| name | text | |
| role | text | member, manager, officer, director, shareholder, partner, trustee, other |
| title | text | |
| email / phone / address | text | |
| start_date / end_date | date | |
| is_active | boolean | |
| notes | text | |
| created_at / updated_at | timestamptz | |

### state_rules

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | PK |
| firm_id | uuid | FK |
| state_code | text | e.g. "MT" |
| state_name | text | e.g. "Montana" |
| entity_type | text | |
| filing_type | text | annual_report, reinstatement, registered_agent_change, other |
| due_date_rule | text | human-readable rule, e.g. "April 15" |
| opening_date_rule | text | e.g. "January 1" |
| on_time_fee | numeric | |
| late_fee | numeric | |
| reinstatement_fee | numeric | |
| required_fields_json | jsonb | |
| source_url | text | |
| last_verified_date | date | shown on every state rules view |
| notes | text | should remind staff to verify current SOS rules |
| is_active | boolean | |
| created_at / updated_at | timestamptz | |

### annual_reports

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | PK |
| firm_id | uuid | FK |
| entity_id | uuid | FK |
| report_year | int | |
| due_date | date | indexed |
| status | text | not_started, client_contacted, waiting_on_client, info_received, ready_for_review, ready_to_file, filed, late, no_filing_needed, cancelled |
| client_confirmation_status | text | not_requested, requested, confirmed_no_changes, changes_submitted, incomplete_response |
| billing_status | text | not_billed, invoice_sent, paid, waived, overdue |
| filing_status | text | not_started, ready_to_file, filed, rejected, late |
| invoice_number | text | |
| amount_billed / amount_paid | numeric | |
| payment_date | date | |
| filed_date | date | |
| filed_by_user_id | uuid | FK to `profiles.id` |
| confirmation_number | text | |
| proof_document_id | uuid | FK to `documents.id` |
| notes | text | |
| created_at / updated_at | timestamptz | |

One row per entity per report year; campaigns must not create duplicates
for an entity/year pair that already has a row.

### tasks

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | PK |
| firm_id | uuid | FK |
| entity_id / client_id / annual_report_id | uuid | nullable FKs |
| title | text | |
| description | text | |
| task_type | text | annual_report, billing, client_follow_up, filing, document, reinstatement, internal_review, calendar, other |
| priority | text | low, normal, high, urgent |
| status | text | open, in_progress, waiting, completed, cancelled, snoozed |
| due_date | date | indexed |
| assigned_to_user_id | uuid | FK |
| completed_at | timestamptz | |
| completed_by_user_id | uuid | FK |
| snoozed_until | date | |
| created_at / updated_at | timestamptz | |

### billing_records

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | PK |
| firm_id | uuid | FK |
| client_id / entity_id / annual_report_id | uuid | nullable FKs |
| invoice_number | text | |
| description | text | |
| amount | numeric | |
| invoice_date / due_date | date | |
| status | text | not_sent, sent, paid, overdue, waived, written_off |
| payment_date | date | |
| payment_method | text | |
| notes | text | |
| created_at / updated_at | timestamptz | |

### documents

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | PK |
| firm_id | uuid | FK |
| client_id / entity_id / annual_report_id | uuid | nullable FKs |
| document_type | text | articles, operating_agreement, annual_report, filing_confirmation, invoice, client_authorization, registered_agent_consent, reinstatement, correspondence, other |
| title / description | text | |
| file_path | text | Supabase Storage path, private bucket |
| file_name / mime_type | text | |
| uploaded_by_user_id | uuid | FK |
| created_at / updated_at | timestamptz | |

### communications

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | PK |
| firm_id | uuid | FK |
| client_id / entity_id / annual_report_id | uuid | nullable FKs |
| direction | text | inbound, outbound, internal |
| communication_type | text | email, phone, letter, meeting, note, other |
| subject / body / summary | text | |
| communication_date | timestamptz | |
| user_id | uuid | FK |
| created_at / updated_at | timestamptz | |

### templates

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | PK |
| firm_id | uuid | FK |
| template_name | text | |
| template_type | text | email, letter, internal_memo, checklist |
| subject / body | text | supports merge fields, see `USER_GUIDE.md` |
| is_active | boolean | |
| created_at / updated_at | timestamptz | |

### audit_logs

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | PK |
| firm_id | uuid | FK |
| user_id | uuid | FK |
| action | text | e.g. "entity.created", "annual_report.status_changed" |
| record_type | text | |
| record_id | uuid | |
| old_value_json / new_value_json | jsonb | |
| ip_address | text | |
| created_at | timestamptz | |

### calendar_connections

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | PK |
| firm_id | uuid | FK |
| user_id | uuid | FK |
| provider | text | google, outlook (outlook unused until a future phase) |
| provider_account_email | text | |
| access_token_encrypted / refresh_token_encrypted | text | encrypted at rest, never exposed to the client |
| expires_at | timestamptz | |
| is_active | boolean | |
| created_at / updated_at | timestamptz | |

### calendar_events

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | PK |
| firm_id | uuid | FK |
| task_id / annual_report_id / entity_id | uuid | nullable FKs |
| provider | text | google, outlook, internal |
| provider_event_id | text | |
| title / description | text | |
| start_time / end_time | timestamptz | |
| status | text | |
| created_by_user_id | uuid | FK |
| created_at / updated_at | timestamptz | |

## Open questions / decisions deferred to implementation

- Exact Postgres `CHECK` constraints vs. application-level enums for status
  fields will be finalized when Phase 2 migrations are written.
- Whether `required_fields_json` on `state_rules` gets a typed shape will
  depend on what Phase 5/6 forms actually need.
