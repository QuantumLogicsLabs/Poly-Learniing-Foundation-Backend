// Seed data for the projects collection. Also served directly when MongoDB is unavailable.
module.exports = [
  {
    slug: 'polycode',
    name: 'PolyCode',
    tagline: 'Learn to code with an AI mentor at your side.',
    summary:
      'A learn-to-code platform with 100+ interactive courses, an in-browser code playground, daily challenges, certificates, an AI coding mentor and an AI security scanner.',
    description:
      'PolyCode takes people from their first line of code to job-ready projects. Learners follow structured paths across more than fifteen languages, practise in a live Monaco-powered playground, keep a streak with daily challenges and earn certificates. PolyMentor, our AI tutor, explains concepts and reviews code, while PolyGuard scans what learners write for security problems — so good habits are built in from day one.',
    accent: '#FACC15',
    url: 'https://poly-code-frontend-tau.vercel.app',
    image: '/images/projects/polycode.jpg',
    status: 'live',
    highlights: ['100+ courses', '15+ languages', 'AI mentor', 'Security scanner'],
    stack: ['React 19', 'Monaco Editor', 'Node.js', 'Express', 'MongoDB', 'Python', 'FastAPI', 'PyTorch'],
    features: [
      { title: '100+ interactive courses', text: 'Structured paths across 15+ languages — C, C++, C#, Python, JavaScript, Java, Go, Rust, SQL, Q# and more.' },
      { title: 'Live code playground', text: 'Write and run real code in the browser and switch languages instantly — no installs required.' },
      { title: 'Daily challenges & certificates', text: 'Keep a learning streak with a new challenge every day and earn certificates as you finish courses.' },
      { title: 'PolyMentor AI tutor', text: 'An AI coding mentor that explains concepts, answers questions and reviews code around the clock.' },
      { title: 'PolyGuard security analysis', text: 'Machine learning plus static analysis flags insecure code patterns while learners write.' },
    ],
    components: [
      { name: 'PolyMentor', text: 'AI coding-tutor API (FastAPI) with an MLOps pipeline for prompt export, LoRA fine-tuning and evaluation.' },
      { name: 'PolyGuard', text: 'AI code-security analyser that combines a PyTorch model with static analysis, hosted on Hugging Face Spaces.' },
    ],
    order: 1,
  },
  {
    slug: 'digital-logics-studio',
    name: 'Digital Logics Studio',
    tagline: 'Master digital logic interactively — no setup required.',
    summary:
      'An interactive digital-logic playground: build circuits visually, simplify Boolean expressions with K-maps, convert number systems and solve logic problems in the browser.',
    description:
      'Digital Logics Studio (home of the Boolforge playground) turns an abstract subject into something you can touch. Learners drag gates onto a canvas and watch truth tables update, simplify expressions with an interactive K-map studio, and work through topic paths from Boolean algebra to sequential circuits. An AI assistant grounded in digital-logic textbooks answers questions in context, and CircuitMind generates, explains and diagnoses circuits from plain-English prompts.',
    accent: '#8B7CF6',
    url: 'https://circuits.quantumlogicslimited.com',
    image: '/images/projects/digital-logics-studio.jpg',
    status: 'live',
    highlights: ['Circuit Forge', 'K-Map Studio', '200+ problems', 'AI assistant'],
    stack: ['React 18', 'React Router', 'Node.js', 'Express', 'MongoDB', 'Python', 'FastAPI', 'Groq', 'Pinecone'],
    features: [
      { title: 'Circuit Forge', text: 'Drag-and-drop logic gates, connect wires and instantly see truth tables and outputs.' },
      { title: 'K-Map Studio', text: 'Generate and simplify Boolean expressions visually with SOP/POS minimisation.' },
      { title: '200+ practice problems', text: 'Boolean algebra, K-maps, number systems, flip-flops and sequential circuits — with progress tracking.' },
      { title: 'Topic learning paths', text: 'Guided modules for Boolean algebra, number systems, arithmetic, memory and timing diagrams.' },
      { title: 'Curriculum-grounded AI assistant', text: 'A chatbot that retrieves real textbook content before answering, so explanations stay accurate.' },
    ],
    components: [
      { name: 'Boolforge', text: 'The React learning app: Circuit Forge, K-Map Studio, topic pages and practice problems.' },
      { name: 'CircuitMind', text: 'FastAPI service that turns plain-English prompts into circuits, explains and diagnoses them, and exports SPICE or SVG.' },
      { name: 'DLS AI Chatbot', text: 'Context-aware assistant backed by a Pinecone index of digital-logic textbooks.' },
    ],
    order: 2,
  },
  {
    slug: 'calculus-runtime',
    name: 'Calculus Runtime',
    tagline: 'University mathematics, made interactive.',
    summary:
      'An interactive learning platform, visualisation suite and AI-powered workspace for multivariable calculus, linear algebra and probability & statistics.',
    description:
      'Calculus Runtime helps students master the mathematics behind engineering, data science and AI. Step-by-step guides with built-in quizzes cover multivariable calculus, linear algebra and statistics; sandboxes let learners transform vectors, explore eigenvalues and trace tangents on live graphs; and an AI tutor with a symbolic solver walks through derivations one step at a time. Progress tracking, leaderboards and verifiable certificates keep learners moving.',
    accent: '#38BDF8',
    url: 'https://calculus-runtime-frontend-ten.vercel.app',
    image: '/images/projects/calculus-runtime.jpg',
    status: 'live',
    highlights: ['Multivariable calculus', 'Linear algebra', 'Statistics labs', 'AI math tutor'],
    stack: ['React 18', 'KaTeX', 'HTML5 Canvas', 'Python', 'FastAPI', 'Symbolic solver'],
    features: [
      { title: 'Multivariable calculus guides', text: "Partial derivatives, multiple integrals, divergence, curl, line integrals and Stokes' theorem — with quizzes." },
      { title: 'Linear algebra suite', text: 'Matrix sandbox, 2D vector transformations, an eigenvalue visualiser and least-squares solvers.' },
      { title: 'Probability & statistics labs', text: 'Interactive labs for Bayes, random variables, hypothesis testing and regression.' },
      { title: 'AI tutor & step-by-step solver', text: 'Ask questions in plain language or LaTeX and get full derivations rendered with KaTeX.' },
      { title: 'Certificates & leaderboards', text: 'Track progress, compete on quiz leaderboards and earn verifiable certificates.' },
    ],
    components: [
      { name: 'Calculus AI Chatbot', text: 'FastAPI chatbot backend with a LaTeX symbol picker and problem tracking.' },
      { name: 'Calculus Solver', text: 'Symbolic computation engine that powers step-by-step solutions.' },
    ],
    order: 3,
  },
];
