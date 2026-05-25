import React, { useState } from 'react';
import { TIMELINE_STEPS } from '../data/timelineSteps.js';
import {
  Bell, Mic, UsersGroup, Dollar, CheckSquare,
  ChevronRight, Check,
} from './Icons.jsx';

/*
 * PDF requirement #8 / Primary objective:
 * Integrates the interactive luxury timeline from recovery-process-luxury-v5.html.
 * Same structure, same interaction (click step → detail card swaps),
 * same primary-stage pulsing glow, same gold fill on the progress line.
 */

const STEP_ICONS = [Bell, Mic, UsersGroup, Dollar, CheckSquare];

export default function HowItWorks() {
  const [activeIdx, setActiveIdx] = useState(1); // Stage 02 active by default

  const ratio = activeIdx / (TIMELINE_STEPS.length - 1);
  const timelineStyle = {
    '--fill': `${ratio * 80}%`,
    '--fill-v': `${ratio * 100}%`,
  };

  return (
    <section className="recovery" id="how">
      <div className="wrap">

        <div className="rec-head">
          <span className="badge reveal"><span className="spark" />How It Works</span>
          <h2 className="reveal" data-d="1">
            End-to-End <span className="gold">Recovery Process</span>
          </h2>
          <span className="underline reveal" data-d="2" />
          <p className="reveal" data-d="2">
            A structured, technology-driven approach from pre-due to closure.
          </p>
        </div>

        <div className="timeline reveal" data-d="2" style={timelineStyle}>
          {TIMELINE_STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i];
            const isActive = i === activeIdx;
            const isDone = i < activeIdx;
            const isLast = i === TIMELINE_STEPS.length - 1;
            const classes = [
              'step',
              isActive && 'active',
              isDone && 'done',
              isActive && step.primary && 'is-primary',
            ].filter(Boolean).join(' ');

            return (
              <button
                key={step.id}
                className={classes}
                aria-label={`${step.title} stage`}
                onClick={() => setActiveIdx(i)}
                type="button"
              >
                {step.primary && <span className="primary-tag">Primary Stage</span>}
                <span className="num-badge">{step.badge}</span>
                <span className="ico-ring">
                  <Icon style={{ width: 32, height: 32 }} />
                </span>
                <span className="step-text-wrap">
                  <span className="step-title">{step.title}</span>
                  <ul className="step-bullets">
                    {step.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </span>
                {!isLast && (
                  <ChevronRight className="arrow" width={14} height={14} />
                )}
              </button>
            );
          })}
        </div>

        <DetailCard step={TIMELINE_STEPS[activeIdx]} />

      </div>
    </section>
  );
}

function DetailCard({ step }) {
  return (
    <div className="detail reveal" data-d="3">
      <div className="detail-inner">
        {/* `key` forces a re-mount on step change so the swap-in keyframe fires every click */}
        <div className="detail-aside swap" key={`aside-${step.id}`}>
          <div>
            <span className="a-step">{step.label}</span>
            <h3>{step.fullTitle}</h3>
            <p>{step.desc}</p>
          </div>
          <div className="a-meta">
            <div className="m"><b>{step.m1[0]}</b><span>{step.m1[1]}</span></div>
            <div className="m"><b>{step.m2[0]}</b><span>{step.m2[1]}</span></div>
          </div>
        </div>
        <div className="detail-body swap" key={`body-${step.id}`}>
          <div className="body-label">What happens in this stage</div>
          <div className="detail-grid">
            {step.items.map((it) => (
              <div className="d-item" key={it.title}>
                <span className="d-ico">
                  <Check style={{ width: 16, height: 16, stroke: 'var(--gold-bright)' }} />
                </span>
                <span className="d-text">
                  <b>{it.title}</b>
                  <span>{it.body}</span>
                  {it.optional && (
                    <span className="note">Optional &middot; Client Requirement</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
