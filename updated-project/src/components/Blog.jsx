import React, { useState } from 'react';
import { BookOpen, ArrowRight } from './Icons.jsx';

const POSTS = [
  {
    category: 'Compliance',
    image: '/blog/dpdp.jpg',
    title: 'DPDP Compliance: Why Data Privacy is Becoming a Business Priority',
    excerpt:
      'With the introduction of the Digital Personal Data Protection Act, 2023, organizations are now expected to handle personal data with greater responsibility, transparency, and security.',
    date: 'May 14, 2026',
    read: '7 min read',
    article: {
      intro:
        "In today's digital economy, businesses collect and process large amounts of personal data every day — from customer phone numbers and email addresses to payment information and employee records. With the introduction of the Digital Personal Data Protection Act, 2023, organizations are now expected to handle personal data with greater responsibility, transparency, and security. DPDP compliance is no longer just a legal requirement. It is becoming an important part of building customer trust, reducing business risks, and strengthening long-term credibility.",
      sections: [
        {
          heading: 'What is DPDP Compliance?',
          body: 'DPDP Compliance refers to following the guidelines of the Digital Personal Data Protection Act, 2023 while collecting, storing, processing, and protecting personal data. The law focuses on:',
          bullets: ['User consent', 'Data security', 'Transparent data usage', 'Responsible handling of personal information'],
          closing: 'Businesses must clearly explain why they collect data and how it will be used.',
        },
        {
          heading: 'Why DPDP Compliance Matters',
          subsections: [
            {
              title: 'a) Builds Customer Trust',
              body: 'Customers today are more aware of data privacy and how companies use their information. Businesses that follow transparent privacy practices often build stronger customer confidence and long-term relationships.',
            },
            {
              title: 'b) Reduces Business Risks',
              body: 'Weak data protection practices can lead to:',
              bullets: ['Data breaches', 'Financial penalties', 'Legal complications', 'Reputational damage'],
              closing: 'Strong compliance frameworks help organizations reduce operational and security risks.',
            },
            {
              title: 'c) Improves Data Security',
              body: 'DPDP compliance encourages businesses to strengthen:',
              bullets: ['Access controls', 'Secure data storage', 'Cybersecurity practices', 'Internal monitoring systems'],
              closing: 'Compliance and cybersecurity now work together to create safer digital operations.',
            },
          ],
        },
        {
          heading: 'Key Components of DPDP Compliance',
          subsections: [
            { title: 'a) Consent Management', body: 'Businesses must obtain clear and informed consent before collecting personal data. Consent should be transparent, specific, easy to understand, and freely given. Users must also have the ability to withdraw consent whenever they choose.' },
            { title: 'b) Data Minimization', body: 'Organizations should collect only the information that is necessary for a specific purpose. Excessive data collection increases both security risks and compliance challenges.' },
            { title: 'c) Purpose Limitation', body: 'Personal data should only be used for the purpose communicated to the user during collection. Using customer information beyond the stated purpose without permission may lead to compliance concerns.' },
            { title: 'd) Data Security', body: 'Strong security measures including access controls, encryption, secure storage systems, monitoring mechanisms, and incident response procedures are essential.' },
          ],
        },
        {
          heading: 'Common Challenges Businesses Face',
          body: 'Many organizations still struggle with:',
          bullets: ['Scattered customer data', 'Manual consent tracking', 'Poor documentation practices', 'Limited employee awareness', 'Weak internal security controls'],
          closing: 'As businesses grow digitally, managing data responsibly becomes more challenging.',
        },
        {
          heading: 'Conclusion',
          body: 'DPDP compliance is not just about following regulations — it is about building a responsible and trustworthy digital business environment. Organizations that prioritize data privacy today will be better positioned to protect customer trust, strengthen security, and achieve sustainable growth in the future. As digital ecosystems continue to evolve, compliance, cybersecurity, and transparency will become essential pillars of modern business operations.',
        },
      ],
    },
  },
  {
    category: 'CRM & Operations',
    image: '/blog/crm.jpg',
    title: 'Role of CRM in Debt Recovery: Improving Efficiency, Tracking & Results',
    excerpt:
      'In today\'s fast-paced financial environment, debt recovery is no longer just about follow-ups. CRM brings structure, visibility, and efficiency to collection operations.',
    date: 'May 14, 2026',
    read: '6 min read',
    article: {
      intro:
        "While factors like NPAs highlight the challenges in the financial system and AI showcases the future of debt recovery, the real efficiency in day-to-day operations comes from structured systems like CRM. In today's fast-paced financial environment, debt recovery is no longer just about follow-ups and reminders. With increasing volumes of accounts and rising borrower expectations, collection processes must be organized, data-driven, and efficient. This is where a Customer Relationship Management (CRM) system becomes a critical tool in modern debt recovery.",
      sections: [
        {
          heading: 'What is CRM in Debt Recovery?',
          body: 'A CRM in debt recovery is a centralized system that helps organizations:',
          bullets: ['Manage borrower data', 'Track collection activities', 'Automate follow-ups', 'Monitor agent performance'],
          closing: 'Instead of scattered spreadsheets and manual tracking, CRM provides a structured and transparent approach to collections.',
        },
        {
          heading: 'Why CRM is Important in Debt Recovery',
          body: 'Without a proper system, recovery teams often face challenges like:',
          bullets: ['Missed follow-ups', 'Poor communication tracking', 'Lack of visibility on accounts', 'Inefficient team coordination'],
          closing: 'A CRM solves these issues by bringing everything into one unified platform. The result: better control, faster recovery, and improved efficiency.',
        },
        {
          heading: 'Key Benefits of CRM in Debt Recovery',
          subsections: [
            { title: '1. Centralized Data Management', body: 'All borrower information is stored in one place — contact details, loan status, payment history, and interaction records. Ensures easy access and no data loss.' },
            { title: '2. Automated Follow-Ups & Reminders', body: 'CRM systems can automate SMS reminders, email notifications, and IVR calls. This reduces manual effort and ensures timely communication.' },
            { title: '3. Real-Time Tracking & Monitoring', body: 'Managers can track collection progress, agent activity, and recovery performance — helping in better decision-making and accountability.' },
            { title: '4. Improved Team Productivity', body: 'With structured workflows, agents know their tasks clearly, follow-ups are consistent, and work duplication is reduced — leading to higher efficiency and faster recovery.' },
            { title: '5. Better Customer Communication', body: 'CRM keeps a record of all interactions, helping teams avoid repeated calls, maintain professionalism, and provide accurate information — improving borrower experience and cooperation.' },
            { title: '6. Data-Driven Insights', body: 'CRM systems provide analytics such as recovery rates, delinquency trends, and performance metrics — enabling smarter strategies and improved outcomes.' },
          ],
        },
        {
          heading: 'Conclusion',
          body: 'In a technology-driven financial landscape, relying on manual recovery processes is no longer sustainable. A CRM system brings structure, visibility, and efficiency to debt recovery operations. Organizations that adopt CRM not only improve recovery rates but also build a more professional and scalable collection system.',
        },
      ],
    },
  },
  {
    category: 'Automation & AI',
    image: '/blog/ivr.jpg',
    title: 'IVR & Bot-Based Debt Recovery: How Automation is Transforming Collections',
    excerpt:
      'IVR systems and automated bots bring speed, consistency, and scalability to modern collections — working 24/7 to ensure every account gets timely attention.',
    date: 'May 14, 2026',
    read: '5 min read',
    article: {
      intro:
        'In the world of debt recovery, timing and consistency are everything. A missed follow-up can delay recovery, while inconsistent communication can reduce borrower responsiveness. Traditional methods, heavily dependent on manual calls, often struggle to keep up with the scale and speed required today. This is where IVR systems and automated bots step in — bringing speed, consistency, and scalability to modern collections.',
      sections: [
        {
          heading: 'What is IVR & Bot-Based Debt Recovery?',
          body: 'IVR (Interactive Voice Response) and bots are automated communication systems designed to interact with borrowers without continuous human involvement. Instead of relying solely on agents, these systems can:',
          bullets: ['Reach thousands of borrowers simultaneously', 'Deliver consistent payment reminders', 'Offer interactive repayment options', 'Capture borrower responses in real time'],
          closing: 'Think of them as a smart communication engine that works 24/7.',
        },
        {
          heading: 'How IVR & Bots Actually Work in Collections',
          subsections: [
            { title: '1. Intelligent Automated Reminders', body: 'IVR systems automatically call borrowers with personalized payment reminders, due date alerts, and outstanding balance details. Unlike manual calls, these happen on schedule, without fail.' },
            { title: '2. Interactive Borrower Engagement', body: 'Modern IVR and bots are not just one-way communication tools. Borrowers can confirm payments, request a callback, choose repayment timelines, and receive payment links instantly — creating a two-way, frictionless experience.' },
            { title: '3. Multi-Channel Automation', body: 'Automation goes beyond calls: Voice (IVR calls), SMS reminders, WhatsApp/chatbots, and email notifications. Multiple touchpoints increase the chances of response and repayment.' },
            { title: '4. Smart Escalation to Human Agents', body: 'Automation doesn\'t replace humans — it supports them. Non-responsive accounts are flagged, high-risk cases are escalated, and agents focus on complex negotiations. This ensures better use of time and expertise.' },
            { title: '5. Seamless Integration with CRM', body: 'Every interaction is tracked and recorded inside the CRM — call responses, payment confirmations, and follow-up status — creating a complete, data-driven recovery cycle.' },
          ],
        },
        {
          heading: 'Key Benefits of IVR & Bot-Based Recovery',
          subsections: [
            { title: 'Consistency at Scale', body: 'Every borrower receives timely communication — no missed follow-ups.' },
            { title: 'Increased Productivity', body: 'Teams handle more accounts without increasing manpower.' },
            { title: 'Cost Efficiency', body: 'Reduces dependency on large call center operations.' },
            { title: 'Faster Recovery Cycles', body: 'Quick reminders lead to faster borrower action.' },
            { title: 'Improved Borrower Experience', body: 'Less intrusive than repeated manual calls, with clear structured communication and easy payment options.' },
          ],
        },
        {
          heading: 'Conclusion',
          body: 'IVR and bot-based automation are redefining how debt recovery operates — making it faster, smarter, and more scalable. When integrated with CRM systems and supported by skilled teams, they create a powerful ecosystem that drives consistent and efficient recovery outcomes. For organizations handling large volumes, adopting automation is no longer an option — it\'s a necessity.',
        },
      ],
    },
  },
];

function ArticleModal({ post, onClose }) {
  if (!post) return null;
  const { article } = post;

  return (
    <div className="article-overlay" role="dialog" aria-modal="true" aria-label={post.title}>
      <div className="article-modal">
        <button className="article-close" onClick={onClose} aria-label="Close article">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="article-hero-img">
          <img src={post.image} alt={post.title} />
          <div className="article-img-overlay" />
          <span className="article-category">{post.category}</span>
        </div>

        <div className="article-content">
          <div className="article-meta">
            <span><BookOpen width={13} height={13} />{post.read}</span>
            <span className="dot" />
            <span>{post.date}</span>
          </div>
          <h1>{post.title}</h1>
          <p className="article-intro">{article.intro}</p>

          {article.sections.map((sec, i) => (
            <div key={i} className="article-section">
              {sec.heading && <h2>{sec.heading}</h2>}
              {sec.body && <p>{sec.body}</p>}
              {sec.bullets && (
                <ul>
                  {sec.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
              {sec.closing && <p>{sec.closing}</p>}
              {sec.subsections && sec.subsections.map((sub, k) => (
                <div key={k} className="article-subsection">
                  <h3>{sub.title}</h3>
                  <p>{sub.body}</p>
                  {sub.bullets && (
                    <ul>
                      {sub.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  )}
                  {sub.closing && <p>{sub.closing}</p>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [openPost, setOpenPost] = useState(null);

  return (
    <>
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
            {POSTS.map((post, i) => (
              <article
                className="blog-card reveal"
                data-d={i + 1}
                key={post.title}
                onClick={() => setOpenPost(post)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setOpenPost(post)}
                aria-label={`Read: ${post.title}`}
              >
                <div className="blog-cover">
                  <img src={post.image} alt={post.title} className="blog-cover-img" />
                  <div className="blog-cover-overlay" />
                  <span className="blog-category">{post.category}</span>
                </div>
                <div className="blog-body">
                  <div className="blog-meta">
                    <span><BookOpen width={13} height={13} />{post.read}</span>
                    <span className="dot" />
                    <span>{post.date}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="blog-readmore">
                    Read article
                    <ArrowRight width={13} height={13} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ArticleModal post={openPost} onClose={() => setOpenPost(null)} />
    </>
  );
}
