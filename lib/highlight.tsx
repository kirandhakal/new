const KEYWORDS = /^(const|let|return|import|from|export|require|FROM|WORKDIR|COPY|RUN|EXPOSE|CMD|git|on|jobs|name|steps|uses|run)$/;

/* Tiny highlighter: strings → accent, comments → muted, a few keywords → blue. */
export const highlight = (line: string) => {
  if (/^\s*(#|\/\*|\/\/)/.test(line)) return <span className="italic text-muted-foreground/70">{line}</span>;
  return line.split(/("[^"]*"|\b[A-Za-z_]+\b)/g).map((part, i) => {
    if (part.startsWith('"')) return <span key={i} className="text-accent">{part}</span>;
    if (KEYWORDS.test(part)) return <span key={i} className="text-led-blue">{part}</span>;
    return <span key={i}>{part}</span>;
  });
};

export const codeFileName = (name: string) => {
  if (name.includes('HTML')) return 'index.html';
  if (name.includes('React')) return 'App.jsx';
  if (name.includes('Node')) return 'server.js';
  if (name.includes('Docker')) return 'Dockerfile';
  if (name.includes('GitHub')) return 'deploy.yml';
  if (name.includes('Git')) return 'branch.sh';
  return 'tokens.css';
};
