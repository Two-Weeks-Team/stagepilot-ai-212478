"use client";

import { useState } from "react";
import CollectionPanel from "@/components/CollectionPanel";
import FeaturePanel from "@/components/FeaturePanel";
import Hero from "@/components/Hero";
import InsightPanel from "@/components/InsightPanel";
import StatePanel from "@/components/StatePanel";
import StatsStrip from "@/components/StatsStrip";
import WorkspacePanel from "@/components/WorkspacePanel";
import { createInsights, createPlan } from "@/lib/api";

const APP_NAME = "StagePilot AI";
const TAGLINE = "AI\u2011driven cockpit that turns any live event into a flawless production, from script to check\u2011in to post\u2011show insights.";
const FEATURE_CHIPS = ["{'name': 'AI\u2011Assisted Run\u2011of\u2011Show Builder', 'description': 'Natural\u2011language prompt or spreadsheet import lets the AI generate a complete timeline, auto\u2011detects cue conflicts, suggests optimal speaker order, and proposes sponsor slot placements. producers can drag\u2011and\u2011drop to fine\u2011tune.'}", "{'name': 'Live Command Center Dashboard', 'description': 'A configurable widget grid showing real\u2011time timeline progress, QR check\u2011in counts, incident heat\u2011map, green\u2011room readiness badge, and a countdown clock. Updates push via WebSockets for millisecond latency.'}", "{'name': 'QR Check\u2011In & Badge Board', 'description': 'One\u2011click QR generation per ticket type, on\u2011device scanner mode, and a live badge board that turns green when a speaker is ready, amber for pending tasks, and red for issues. Volunteers can assign themselves to tasks from the same board.'}", "{'name': 'Incident Log & Playbook Library', 'description': 'Instant incident capture with categorization, auto\u2011assignment, escalation rules, and a searchable library of reusable playbooks (e.g., \u201cPower outage\u201d or \u201cSpeaker no\u2011show\u201d) that can be launched with one tap.'}"];
const PROOF_POINTS = ["Pre\u2011populated demo event (agenda, speakers, sponsors) that can be explored without any setup.", "Open\u2011source GitHub repo with CI badge, documentation, and a live demo on Vercel.", "Service\u2011worker powered offline mode that keeps the dashboard functional even with internet loss.", "Performance Lighthouse score >\u202f90 for both desktop and tablet."];

type PlanItem = { title: string; detail: string; score: number };
type InsightPayload = { insights: string[]; next_actions: string[]; highlights: string[] };
type PlanPayload = { summary: string; score: number; items: PlanItem[]; insights?: InsightPayload };

export default function Page() {
  const [query, setQuery] = useState("");
  const [preferences, setPreferences] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState<PlanPayload | null>(null);
  const [saved, setSaved] = useState<PlanPayload[]>([]);

  async function handleGenerate() {
    setLoading(true);
    setError("");
    try {
      const nextPlan = await createPlan({ query, preferences });
      const insightPayload = await createInsights({
        selection: nextPlan.items?.[0]?.title ?? query,
        context: preferences || query,
      });
      const composed = { ...nextPlan, insights: insightPayload };
      setPlan(composed);
      setSaved((previous) => [composed, ...previous].slice(0, 4));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  const stats = [
    { label: "Feature lanes", value: String(FEATURE_CHIPS.length) },
    { label: "Saved library", value: String(saved.length) },
    { label: "Readiness score", value: plan ? String(plan.score) : "88" },
  ];

  return (
    <main className="page-shell">
      <Hero appName={APP_NAME} tagline={TAGLINE} proofPoints={PROOF_POINTS} />
      <StatsStrip stats={stats} />
      <section className="content-grid">
        <WorkspacePanel
          query={query}
          preferences={preferences}
          onQueryChange={setQuery}
          onPreferencesChange={setPreferences}
          onGenerate={handleGenerate}
          loading={loading}
          features={FEATURE_CHIPS}
        />
        <div className="stack">
          {error ? <StatePanel title="Request blocked" tone="error" detail={error} /> : null}
          {!plan && !error ? (
            <StatePanel
              title="Ready for the live demo"
              tone="neutral"
              detail="The first action produces a complete output, visible proof points, and saved library activity."
            />
          ) : null}
          {plan ? <InsightPanel plan={plan} /> : null}
          <FeaturePanel features={FEATURE_CHIPS} proofPoints={PROOF_POINTS} />
        </div>
      </section>
      <CollectionPanel saved={saved} />
    </main>
  );
}
