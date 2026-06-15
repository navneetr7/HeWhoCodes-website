export type StackItem = {
  name: string;
  detail?: string;
  icon?: string;
  invertIcon?: boolean;
};

export type StackCategory = {
  title: string;
  items: StackItem[];
};

export const stackIntro = {
  eyebrow: "Stack",
  title: "Tools behind the products.",
  description: "From prototype to production. Built to survive real-world usage.",
};

export const stackCategories: StackCategory[] = [
  {
    title: "Languages",
    items: [
      { name: "Python", icon: "/python-svgrepo-com.svg" },
      { name: "TypeScript", icon: "/typescript-official-svgrepo-com.svg" },
      { name: "JavaScript", icon: "/javascript-svgrepo-com.svg" },
      { name: "Swift", icon: "/swift-svgrepo-com.svg" },
      { name: "C#", icon: "/csharp-svgrepo-com.svg" },
      { name: "Bash", icon: "/bash-icon-svgrepo-com.svg", invertIcon: true },
    ],
  },
  {
    title: "Frontend & Applications",
    items: [
      { name: "React", icon: "/react-svgrepo-com.svg" },
      { name: "Next.js", icon: "/next-js-svgrepo-com.svg", invertIcon: true },
      { name: "Flutter", icon: "/flutter-svgrepo-com.svg" },
      { name: "Tauri", icon: "/Tauri.svg", invertIcon: true },
      { name: "SwiftUI", icon: "/swift-svgrepo-com.svg" },
    ],
  },
  {
    title: "Backend & Systems",
    items: [
      { name: "FastAPI", icon: "/FastAPI.svg" },
      { name: "WebSockets", icon: "/websocket-svgrepo-com.svg", invertIcon: true },
      { name: "Async & Concurrent Systems", icon: "/irregular.png" },
      { name: "Event-Driven Architectures", icon: "/icons8-event-management-48.png" },
      { name: "RabbitMQ", icon: "/stack/rabbitmq.svg" },
      { name: "Celery", icon: "/stack/celery.svg" },
      { name: "Rate Limiting", icon: "/stack/rate-limiting.svg" },
    ],
  },
  {
    title: "AI & LLM Systems",
    items: [
      { name: "RAG Pipelines", icon: "/Rag--Streamline-Carbon.svg", invertIcon: true },
      { name: "AI Agents", icon: "/software-agent.png" },
      { name: "Tool Calling", icon: "/stack/tool-calling.svg" },
      { name: "Data Ingestion", icon: "/stack/data-ingestion.svg" },
      { name: "Embeddings", icon: "/stack/embeddings.svg" },
      { name: "LLM Deployment", icon: "/stack/llm-deployment.svg" },
      { name: "Fine-Tuning", icon: "/Fine-Tune--Streamline-Mynaui.svg", invertIcon: true },
    ],
  },
  {
    title: "Models & Frameworks",
    items: [
      { name: "LangChain", icon: "/langchain-color.svg" },
      { name: "LangGraph", icon: "/langgraph-color.svg" },
      { name: "Hugging Face", icon: "/stack/huggingface.svg" },
      { name: "Ollama", icon: "/stack/ollama.svg", invertIcon: true },
      { name: "Transformers", icon: "/stack/huggingface.svg" },
      { name: "Sentence Transformers", icon: "/stack/huggingface.svg" },
      { name: "PEFT", icon: "/stack/huggingface.svg" },
    ],
  },
  {
    title: "Databases & Vector Search",
    items: [
      { name: "SQL", icon: "/sql-database-generic-svgrepo-com.svg", invertIcon: true },
      { name: "PostgreSQL", icon: "/postgresql-logo-svgrepo-com.svg" },
      { name: "SQLite", icon: "/stack/sqlite.svg" },
      { name: "Redis", icon: "/stack/redis.svg" },
      { name: "pgvector", icon: "/postgresql-logo-svgrepo-com.svg" },
      { name: "FAISS", icon: "/meta-color.svg" },
      { name: "Chroma", icon: "/Chroma--Streamline-Svg-Logos.svg" },
      { name: "Pinecone", icon: "/Pinecone-Icon--Streamline-Svg-Logos.svg", invertIcon: true },
    ],
  },
  {
    title: "Infrastructure & DevOps",
    items: [
      { name: "Docker", icon: "/stack/docker.svg" },
      { name: "Kubernetes", icon: "/stack/kubernetes.svg" },
      { name: "Linux", icon: "/linux-svgrepo-com.svg" },
      { name: "Nginx", icon: "/stack/nginx.svg", invertIcon: true },
      { name: "GitHub Actions", icon: "/ci-cd-svgrepo-com.svg", invertIcon: true },
      { name: "Self-Hosting", icon: "/icons8-self-service-48.png" },
      { name: "Authentication", detail: "JWT · OAuth", icon: "/stack/jwt.svg", invertIcon: true },
      { name: "SSL/TLS", icon: "/stack/ssl.svg", invertIcon: true },
    ],
  },
];

export const stackPreview = [
  "Python",
  "FastAPI",
  "LangChain",
  "LangGraph",
  "pgvector",
  "Redis",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "React",
  "Swift",
  "Tauri",
] as const;
