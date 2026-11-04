const COPY = {
  login: {
    title: 'Pick up where you left off.',
    body: 'Your boards, notes and deadlines are right where you left them.',
  },
  signup: {
    title: 'Start your first board in a minute.',
    body: 'Invite your team, drop in a few tasks, and see the whole week at a glance.',
  },
};

export default function BrandPanel({ mode }) {
  const copy = COPY[mode];

  return (
    <aside className="brand" data-mode={mode}>
      <div className="brand-top">
        <span className="logo" aria-hidden="true" />
        <span className="wordmark">Kor_</span>
      </div>

      <svg className="orbits" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
        <g className="orbit-group">
          <circle cx="300" cy="300" r="120" className="ring ring-a" />
          <circle cx="300" cy="300" r="200" className="ring ring-b" />
          <circle cx="300" cy="300" r="280" className="ring ring-c" />
          <circle cx="580" cy="300" r="11" className="dot" />
          <circle cx="300" cy="100" r="6" className="dot dot-soft" />
        </g>
      </svg>

      <div className="brand-copy" key={mode}>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
      </div>

      <p className="brand-foot">© 2026 Kora Labs</p>
    </aside>
  );
}
