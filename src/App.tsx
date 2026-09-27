import "./App.css";
import { useForm, ValidationError } from "@formspree/react";

type SkillCard = { number: string; title: string; description: string; tags: string[] };
type ArchitectureCase = { number: string; eyebrow: string; title: string; accentTitle?: string; description: string; tags: string[]; nodes: string[] };

const expertise: SkillCard[] = [
  { number: "01", title: "Enterprise & Solution Architecture", description: "Translating business requirements into scalable solution architectures, technical designs and implementation roadmaps.", tags: ["Architecture", "Solution Design", "Technical Leadership"] },
  { number: "02", title: "SAP BTP & Clean Core", description: "Designing modern SAP landscapes using BTP, CAP, RAP and extension patterns aligned with Clean Core principles.", tags: ["SAP BTP", "CAP", "RAP", "Clean Core"] },
  { number: "03", title: "Integration & API Architecture", description: "Connecting SAP and enterprise applications through APIs, OData, integration platforms and event-driven patterns.", tags: ["APIs", "OData", "Integration"] },
  { number: "04", title: "Modernization & Automation", description: "Modernizing enterprise applications while introducing workflow automation, Fiori applications and scalable cloud services.", tags: ["S/4HANA", "Fiori", "Automation"] },
];

const architectureCases: ArchitectureCase[] = [
  { number: "01", eyebrow: "MODERNIZATION", title: "S/4HANA + BTP", accentTitle: "Modernization", description: "Designing an extension architecture that separates core business processes from cloud-based applications, services and integrations.", tags: ["S/4HANA", "SAP BTP", "CAP", "RAP", "Clean Core"], nodes: ["BUSINESS\nProcesses", "S/4HANA\nCore ERP", "SAP BTP\nExtensions · Services", "CAP", "RAP", "FIORI"] },
  { number: "02", eyebrow: "INTEGRATION", title: "Enterprise", accentTitle: "Integration Architecture", description: "Connecting SAP and third-party applications through API-driven integration patterns, OData services and integration platforms.", tags: ["APIs", "OData", "BTP Integration", "Enterprise Systems"], nodes: ["S/4HANA", "BTP", "External\nSystems", "APIs", "OData", "Integration Services"] },
  { number: "03", eyebrow: "AUTOMATION", title: "Enterprise Workflow", accentTitle: "& Automation", description: "Designing applications and automated approval flows that connect enterprise data, user interfaces and business processes.", tags: ["Fiori", "SAP Build", "Workflow", "Approvals"], nodes: ["01\nRequest", "02\nFiori App", "03\nWorkflow", "04\nApproval"] },
];

const experiences = [
  { number: "01", date: "NOV 2021 — PRESENT", company: "IBM CANADA", title: "Application Architect", current: true, summary: "Architecting and delivering enterprise SAP solutions across S/4HANA modernization, integration, application development and process automation.", capabilities: [["Architecture", "Translate business requirements into technical designs, solution architectures and implementation roadmaps."], ["Integration", "Design SAP and enterprise integrations using APIs, OData, SAP BTP and external platforms including Azure and Salesforce."], ["Applications", "Develop modern S/4HANA applications using RAP, CDS, OData V4, Fiori and Clean Core extension patterns."], ["Leadership", "Lead and mentor development teams while coordinating estimation, testing, deployment, customer workshops and technical delivery."]], tags: ["S/4HANA", "SAP BTP", "RAP", "CAP", "CDS", "OData", "Fiori", "Clean Core", "APIs", "Automation"] },
  { number: "02", date: "JUN 2020 — DEC 2021", company: "COFORGE · INDIA", title: "SAP Technical Lead", current: false, summary: "Led SAP technical design and delivery for enterprise OTC and pricing initiatives, including integration, modernization and SAP BTP solutions.", capabilities: [["SAP SD pricing automation", "Technical design and delivery for enterprise pricing processes."], ["API & enterprise integration", "Integration architecture across SAP and connected enterprise applications."], ["SAP BTP & HANA Cloud", "Cloud platform and modernization solutions."], ["Technical design & team leadership", "Technical reviews, planning and delivery coordination."]], tags: ["SAP SD", "OTC", "BTP", "HANA Cloud", "Integration"] },
  { number: "03", date: "APR 2019 — MAY 2020", company: "CAPGEMINI CONSULTING · INDIA", title: "Senior SAP ABAP Developer / Team Lead", current: false, summary: "Designed enterprise SAP applications and integration services using modern ABAP and HANA technologies for large-scale business processes.", capabilities: [["HANA CDS & data modeling", "Enterprise data models and application services."], ["Enterprise integration services", "Connected SAP applications and external systems."], ["Technical reviews", "Code, architecture and implementation reviews."], ["Development planning", "Team coordination and delivery planning."]], tags: ["ABAP", "HANA", "CDS", "Integration", "Team Lead"] },
  { number: "04", date: "FEB 2012 — APR 2019", company: "SECURITY WEAVER · INDIA", title: "Senior Product Consultant / Team Lead", current: false, summary: "Combined product consulting, customer engagement and technical delivery across SAP governance, compliance and enterprise application solutions.", capabilities: [["Customer requirements & solution design", "Translate customer needs into implementable product and solution designs."], ["SAP governance & compliance products", "Enterprise governance and compliance solution delivery."], ["OData, CDS & Fiori applications", "Application and service development for SAP landscapes."], ["Product roadmap & feature planning", "Customer feedback, roadmap inputs and product planning."]], tags: ["Product", "Consulting", "SAP Governance", "OData", "CDS", "Fiori"] },
];

const technologyGroups = [
  { number: "01", title: "SAP PLATFORM", label: "CORE", items: [["S/4HANA", "Enterprise Core"], ["SAP BTP", "Cloud Platform"], ["ABAP", "Application Runtime"], ["CAP", "Cloud Application"], ["RAP", "RESTful ABAP"], ["CDS", "Data Modeling"]] },
  { number: "02", title: "INTEGRATION", label: "CONNECT", items: [["APIs", "REST / Services"], ["OData", "Enterprise Services"], ["BTP Integration", "Integration Platform"], ["Events", "Event-driven Systems"], ["Azure", "Cloud Integration"], ["External Systems", "Enterprise Connectivity"]] },
  { number: "03", title: "APPLICATION", label: "EXPERIENCE", items: [["Fiori", "Enterprise UX"], ["React", "Web Applications"], ["Node.js", "Backend Services"], ["Express", "API Services"], ["Workflow", "Process Automation"], ["Automation", "Business Processes"]] },
  { number: "04", title: "DATA & ENGINEERING", label: "FOUNDATION", items: [["HANA", "Enterprise Data"], ["PostgreSQL", "Relational Data"], ["MongoDB", "Document Data"], ["SQL", "Data Querying"], ["Git", "Source Control"], ["CI/CD", "Delivery"]] },
];

function SectionLabel({ number, text }: { number: string; text: string }) { return <div className="section-label"><span>{number}</span><span>{text}</span></div>; }
function ArrowIcon() { return <span className="arrow-icon" aria-hidden="true">↗</span>; }
function ArchitectureDiagram({ nodes }: { nodes: string[] }) { return <div className="architecture-diagram"><div className="diagram-grid" aria-hidden="true" /><div className="diagram-lines" aria-hidden="true"><span /><span /><span /></div><div className="diagram-nodes">{nodes.map((node, index) => <div className={`diagram-node node-${index + 1}`} key={`${node}-${index}`}>{node.split("\n").map((line, i) => <span key={i}>{line}</span>)}</div>)}</div></div>; }
function ContactForm() {
  const [state, handleSubmit, reset] = useForm("xrpbojaw");

  if (state.succeeded) {
    return (
      <div className="contact-success">
        <div className="contact-success-mark">✓</div>

        <h3>Message sent.</h3>

        <p>
          Thanks for reaching out. I'll get back to you as soon as possible.
        </p>

        <button
          type="button"
          className="contact-submit"
          onClick={reset}
        >
          <span>Send another message</span>
          <span>↗</span>
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="website">
          Website
          <input
            id="website"
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
      <div className="form-row">

        <label>
          <span>NAME</span>

          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
          />

          <ValidationError
            prefix="Name"
            field="name"
            errors={state.errors}
          />
        </label>


        <label>
          <span>EMAIL</span>

          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
          />

          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
          />
        </label>

      </div>


      <label>
        <span>COMPANY / ORGANIZATION</span>

        <input
          type="text"
          name="company"
          placeholder="Company name"
        />

        <ValidationError
          prefix="Company"
          field="company"
          errors={state.errors}
        />
      </label>


      <label>
        <span>WHAT CAN I HELP WITH?</span>

        <select
          name="topic"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select a topic
          </option>

          <option value="Solution Architecture">
            Solution Architecture
          </option>

          <option value="SAP Architecture">
            SAP Architecture
          </option>

          <option value="SAP BTP">
            SAP BTP
          </option>

          <option value="Enterprise Integration">
            Enterprise Integration
          </option>

          <option value="Application Modernization">
            Application Modernization
          </option>

          <option value="Technical Leadership">
            Technical Leadership
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        <ValidationError
          prefix="Topic"
          field="topic"
          errors={state.errors}
        />
      </label>


      <label>
        <span>MESSAGE</span>

        <textarea
          name="message"
          rows={6}
          placeholder="Tell me a little about your project or what you'd like to discuss..."
          required
        />

        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </label>


      <button
        type="submit"
        className="contact-submit"
        disabled={state.submitting}
      >
        <span>
          {state.submitting ? "Sending..." : "Send message"}
        </span>

        <span>
          {state.submitting ? "…" : "↗"}
        </span>
      </button>


      {state.errors && (
        <div className="form-error">
          Something went wrong while sending your message.
          Please check the fields above and try again.
        </div>
      )}


      <p className="form-note">
        Your message will be securely delivered to my email.
      </p>

    </form>
  );
}
function App() {
  return <div className="site">
    <header className="site-header"><a className="brand" href="#top">HS<span>.</span></a><nav className="main-nav" aria-label="Primary navigation"><a href="#expertise">Expertise</a><a href="#architecture">Architecture</a><a href="#experience">Experience</a><a href="#technology">Technology</a><a href="#contact">Contact</a></nav><a className="header-cta" href="#contact">Let's connect</a></header>
    <main id="top">
      <section className="hero section-light"><div className="hero-copy"><p className="eyebrow">SOLUTIONS ARCHITECT · ENTERPRISE TECHNOLOGY</p><h1>Building systems<br />that connect<br /><span>business, cloud</span><br /><span>and AI.</span></h1><p className="hero-description">Designing enterprise solutions that connect business requirements, SAP platforms, integrations and modern applications into practical, scalable systems.</p><div className="hero-actions"><a className="button button-dark" href="#architecture">Explore my work</a><a className="button button-outline" href="#contact">Get in touch</a></div></div><div className="hero-visual" aria-hidden="true"><div className="hero-visual-label">ENTERPRISE ARCHITECTURE</div><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-core"><small>ARCHITECT</small><strong>HS</strong></div><div className="hero-card hero-card-business"><small>01</small><strong>BUSINESS</strong><span>Requirements</span></div><div className="hero-card hero-card-integration"><small>02</small><strong>INTEGRATION</strong><span>APIs · Events</span></div><div className="hero-card hero-card-cloud"><small>03</small><strong>CLOUD</strong><span>Data · Platforms</span></div><div className="hero-card hero-card-ai"><small>04</small><strong>AI / AGENTS</strong><span>Intelligence</span></div></div></section>

      <section id="expertise" className="section-dark expertise-section"><div className="section-intro section-intro-dark"><SectionLabel number="01" text="CORE EXPERTISE" /><h2>Designing enterprise<br /><span>systems that work</span><br /><span>together.</span></h2></div><div className="expertise-grid">{expertise.map(item => <article className="expertise-card" key={item.number}><div className="card-topline"><span>{item.number}</span><ArrowIcon /></div><div className="card-symbol" aria-hidden="true">{item.number === "01" ? "◇" : item.number === "02" ? "⬡" : item.number === "03" ? "↔" : "✦"}</div><h3>{item.title}</h3><p>{item.description}</p><div className="tag-row">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="card-rule" /></article>)}</div><div className="section-footer-line"><span>SYSTEMS THINKING</span><i /><span>BUSINESS → TECHNOLOGY → OUTCOME</span></div></section>

      <section id="architecture" className="section-light architecture-section"><div className="section-intro section-intro-light"><SectionLabel number="02" text="SELECTED ARCHITECTURE" /><h2>From business problem<br /><span>to technical architecture.</span></h2><p>Selected examples of enterprise architecture, integration and modernization patterns.</p></div><div className="architecture-cases">{architectureCases.map((item, index) => <article className={`architecture-case ${index % 2 === 1 ? "reverse" : ""}`} key={item.number}><div className="case-meta"><span>{item.number} / {item.eyebrow}</span><span>{item.tags.slice(0, 3).join(" · ")}</span></div><div className="case-content"><div className="case-copy"><h3>{item.title}<span>{item.accentTitle}</span></h3><p>{item.description}</p><div className="tag-row tag-row-light">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><ArchitectureDiagram nodes={item.nodes} /></div></article>)}</div></section>

      <section id="experience" className="section-dark experience-section"><div className="section-intro section-intro-dark experience-intro"><SectionLabel number="03" text="EXPERIENCE" /><h2>15+ years of building<br /><span>enterprise technology.</span></h2><p>From SAP development and product consulting to enterprise architecture, integration and technical leadership.</p></div><div className="experience-timeline">{experiences.map(role => <article className="experience-item" key={`${role.number}-${role.title}`}><div className="experience-marker"><span>{role.number}</span></div><div className="experience-date"><strong>{role.date}</strong><span>{role.company}</span></div><div className="experience-content"><div className="experience-title-row"><div><h3>{role.title}</h3><small>{role.tags.slice(0, 3).join(" · ")}</small></div>{role.current && <span className="current-badge">CURRENT</span>}</div><p className="experience-summary">{role.summary}</p><div className="capability-grid">{role.capabilities.map(([title, description], index) => <div className="capability" key={`${title}-${index}`}><small>0{index + 1}</small><h4>{title}</h4><p>{description}</p></div>)}</div><div className="tag-row experience-tags">{role.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></section>

      <section id="technology" className="section-light technology-section"><div className="technology-heading"><SectionLabel number="05" text="TECHNOLOGY LANDSCAPE" /><h2>Technology supports the architecture.</h2><p>The technologies I use to design, integrate, modernize and deliver enterprise systems.</p><div className="technology-kicker">ENTERPRISE TECHNOLOGY STACK<span>ARCHITECTURE · INTEGRATION · ENGINEERING</span></div></div><div className="technology-stack">{technologyGroups.map((group, groupIndex) => <div className="technology-group" key={group.number}><div className="technology-group-title"><small>{group.number}</small><strong>{group.title}</strong><span>{group.label}</span></div><div className="technology-items">{group.items.map(([name, description], itemIndex) => <div className={`technology-item ${itemIndex === 0 ? "featured" : ""}`} key={name}><strong>{name}</strong><span>{description}</span></div>)}</div>{groupIndex < technologyGroups.length - 1 && <div className="technology-divider">↓</div>}</div>)}</div></section>

      {/* SECTION 05 — CONTACT */}
      <section id="contact" className="section-dark contact-section">

        <div className="contact-top">
          <SectionLabel number="05" text="CONTACT" />
          <span className="contact-top-note">
            OPEN TO CONVERSATIONS
          </span>
        </div>

        <div className="contact-main">

          <div className="contact-copy">

            <h2>
              Let's build
              <br />
              <span>something that works.</span>
            </h2>

            <p>
              Open to conversations around enterprise architecture,
              SAP modernization, integration, application architecture
              and technical leadership.
            </p>

            <div className="contact-focus">

              <span>ARCHITECTURE</span>
              <span>SAP BTP</span>
              <span>INTEGRATION</span>
              <span>MODERNIZATION</span>
              <span>TECHNICAL LEADERSHIP</span>

            </div>

          </div>


          <ContactForm />

        </div>


        <footer className="site-footer">

          <div>
            <strong>
              HS<span>.</span>
            </strong>

            <p>
              SOLUTIONS ARCHITECT · ENTERPRISE TECHNOLOGY
            </p>
          </div>

          <p>
            © 2026 Himanshu Sharma
          </p>

        </footer>

      </section>
    </main>
  </div>;
}

export default App;
