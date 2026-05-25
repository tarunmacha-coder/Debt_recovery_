import React from 'react';
import { BookOpen, TrendChart, Sparkles, Shield, ArrowRight } from './Icons.jsx';

const POSTS = [
  {
    category: 'Compliance',
    Icon: Shield,
    title: 'RBI fair-practice in 2026: what collections teams need to know',
    excerpt:
      'A practical breakdown of the latest fair-practice circulars and how to embed them into your recovery workflow without slowing the team down.',
    date: 'May 12, 2026',
    read: '6 min read',
  },
  {
    category: 'AI & Voice',
    Icon: Sparkles,
    title: 'Why AI voice agents resolved 70% of our reminder calls',
    excerpt:
      'How a mid-sized NBFC redesigned its first-touch strategy with AI voice, and what they learned about tone, language coverage and handoff design.',
    date: 'Apr 28, 2026',
    read: '8 min read',
  },
  {
    category: 'Recovery',
    Icon: TrendChart,
    title: 'The blended model: where bots win and where humans still close',
    excerpt:
      'A field-tested playbook for splitting work between automation and trained agents to maximise recovery without burning out the team.',
    date: 'Apr 14, 2026',
    read: '5 min read',
  },
];

export default function Blog() {
  return (
    <section className="section section--cream gold-hairline" id="blog">
      <div className="wrap">

        <div className="section-head">
          <span className="badge reveal"><span className="spark" />Insights</span>
          <h2 className="reveal" data-d="1">
            From the <span className="gold">Debt Recovery</span> blog
          </h2>
          <span className="underline reveal" data-d="2" />
          <p className="reveal" data-d="2">
            Field notes from the recovery teams, compliance officers and AI engineers shipping
            the platform every day.
          </p>
        </div>

        <div className="blog-grid">
          {POSTS.map(({ category, Icon, title, excerpt, date, read }, i) => (
            <article className="blog-card reveal" data-d={i + 1} key={title}>
              <div className="blog-cover">
                <span className="blog-category">{category}</span>
                <div className="cover-glyph">
                  <Icon />
                </div>
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span><BookOpen width={13} height={13} />{read}</span>
                  <span className="dot" />
                  <span>{date}</span>
                </div>
                <h3>{title}</h3>
                <p>{excerpt}</p>
                <a href="#blog" className="blog-readmore">
                  Read article
                  <ArrowRight width={13} height={13} />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
