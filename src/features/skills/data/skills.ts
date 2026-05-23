import { Code2, Braces } from 'lucide-react';
import { Skill } from '@/src/types';

export const skills: Skill[] = [
  {
    name: 'HTML, CSS & JavaScript',
    icon: Code2,
    description: 'Modern web fundamentals',
    code: '<div className="hero">\n  <h1>Hello World!</h1>\n  <p>Building the web</p>\n</div>',
    color: 'from-orange-400 to-rose-400',
    bgColor: 'bg-orange-50'
  },
  {
    name: 'React',
    icon: Braces,
    description: 'Component-based UI library',
    code: 'const App = () => {\n  const [count, setCount] = useState(0)\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Clicked {count} times\n    </button>\n  )\n}',
    color: 'from-cyan-400 to-blue-400',
    bgColor: 'bg-cyan-50'
  },
  {
    name: 'Node.js',
    icon: Code2,
    description: 'JavaScript runtime environment',
    code: 'const express = require("express")\nconst app = express()\n\napp.get("/api", (req, res) => {\n  res.json({ message: "Hello!" })\n})\n\napp.listen(3000)',
    color: 'from-green-400 to-emerald-400',
    bgColor: 'bg-green-50'
  },
  {
    name: 'TypeScript',
    icon: Code2,
    description: 'Typed JavaScript for scale',
    code: 'interface User {\n  id: number\n  name: string\n  email: string\n}\n\nfunction greetUser(user: User): string {\n  return `Hello, ${user.name}!`\n}',
    color: 'from-blue-400 to-cyan-400',
    bgColor: 'bg-blue-50'
  },
  {
    name: 'Tailwind CSS',
    icon: Code2,
    description: 'Utility-first CSS framework',
    code: '<div className="flex items-center justify-center">\n  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">\n    Click me\n  </button>\n</div>',
    color: 'from-teal-400 to-cyan-400',
    bgColor: 'bg-teal-50'
  },
  {
    name: 'Git & GitHub',
    icon: Code2,
    description: 'Version control & collaboration',
    code: 'git checkout -b feature/new-feature\ngit add .\ngit commit -m "feat: add new feature"\ngit push origin feature/new-feature\n# Create Pull Request',
    color: 'from-red-400 to-orange-400',
    bgColor: 'bg-red-50'
  },
];
