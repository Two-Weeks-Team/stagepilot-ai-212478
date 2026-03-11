def _coerce_unstructured_payload(raw_text: str) -> dict[str, object]:
    compact = raw_text.strip()
    normalized = compact.replace("\n", ",")
    tags = [part.strip(" -•\t") for part in normalized.split(",") if part.strip(" -•\t")]
    return {
        "note": "Model returned plain text instead of JSON",
        "raw": compact,
        "text": compact,
        "summary": compact,
        "tags": tags[:6],
    }


APP_NAME = "StagePilot AI"
APP_TAGLINE = "AI\u2011driven cockpit that turns any live event into a flawless production, from script to check\u2011in to post\u2011show insights."
KEY_FEATURES = ["{'name': 'AI\u2011Assisted Run\u2011of\u2011Show Builder', 'description': 'Natural\u2011language prompt or spreadsheet import lets the AI generate a complete timeline, auto\u2011detects cue conflicts, suggests optimal speaker order, and proposes sponsor slot placements. producers can drag\u2011and\u2011drop to fine\u2011tune.'}", "{'name': 'Live Command Center Dashboard', 'description': 'A configurable widget grid showing real\u2011time timeline progress, QR check\u2011in counts, incident heat\u2011map, green\u2011room readiness badge, and a countdown clock. Updates push via WebSockets for millisecond latency.'}", "{'name': 'QR Check\u2011In & Badge Board', 'description': 'One\u2011click QR generation per ticket type, on\u2011device scanner mode, and a live badge board that turns green when a speaker is ready, amber for pending tasks, and red for issues. Volunteers can assign themselves to tasks from the same board.'}", "{'name': 'Incident Log & Playbook Library', 'description': 'Instant incident capture with categorization, auto\u2011assignment, escalation rules, and a searchable library of reusable playbooks (e.g., \u201cPower outage\u201d or \u201cSpeaker no\u2011show\u201d) that can be launched with one tap.'}"]
PROOF_POINTS = ["Pre\u2011populated demo event (agenda, speakers, sponsors) that can be explored without any setup.", "Open\u2011source GitHub repo with CI badge, documentation, and a live demo on Vercel.", "Service\u2011worker powered offline mode that keeps the dashboard functional even with internet loss.", "Performance Lighthouse score >\u202f90 for both desktop and tablet."]


def build_plan(query: str, preferences: str) -> dict:
    subject = (query or APP_TAGLINE).strip() or APP_NAME
    guidance = (preferences or "Prioritize a polished live demo with clear momentum.").strip()
    items = []
    for index, feature in enumerate(KEY_FEATURES[:3], start=1):
        items.append(
            {
                "title": f"Stage {index}: {feature}",
                "detail": f"Apply {feature.lower()} to '{subject}' while respecting: {guidance}.",
                "score": min(96, 72 + index * 6),
            }
        )
    return {
        "summary": f"{APP_NAME} shaped '{subject}' into a judge-ready working session.",
        "score": 88,
        "items": items,
    }


def build_insights(selection: str, context: str) -> dict:
    focus = (selection or APP_NAME).strip()
    base_context = (context or APP_TAGLINE).strip()
    return {
        "insights": [
            f"Lead with {focus} so the first screen proves value instantly.",
            f"Use {base_context} as the narrative thread across the workflow.",
        ],
        "next_actions": [
            f"Save the strongest {focus.lower()} output as the demo finale.",
            "Keep one guided CTA visible at every stage.",
        ],
        "highlights": PROOF_POINTS[:3],
    }
