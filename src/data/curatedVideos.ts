export interface CuratedVideo {
  id: string;
  title: string;
  institution: string;
  professor: string;
  category: string;
  thumbnail: string;
  link: string;
  description: string;
}

export const CURATED_VIDEOS: CuratedVideo[] = [
  {
    id: "stanford-quantum-physics",
    title: "Quantum & Theoretical Physics",
    institution: "Stanford University",
    professor: "Prof. Leonard Susskind",
    category: "Science",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
    link: "https://www.youtube.com/playlist?list=PL84C10A9AC1D1DDC8",
    description: "The theoretical foundations of quantum mechanics, entanglement, and cosmological architecture."
  },
  {
    id: "advanced-sec-research",
    title: "Advanced Security Research",
    institution: "USENIX Security / Black Hat",
    professor: "Security Research Labs",
    category: "Cybersecurity",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    link: "https://www.youtube.com/watch?v=680wB2_K_t8",
    description: "Deep-dive vulnerability research, post-quantum cryptography, and AI autonomous defense vectors."
  },
  {
    id: "bh-usa-24",
    title: "Black Hat USA: Keynote",
    institution: "Black Hat USA",
    professor: "Strategic Defense",
    category: "Cybersecurity",
    thumbnail: "https://img.youtube.com/vi/680wB2_K_t8/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=680wB2_K_t8",
    description: "The premier cybersecurity keynote focusing on critical infrastructure and global AI defense."
  },
  {
    id: "google-pz",
    title: "Project Zero Documentary",
    institution: "Google",
    professor: "Project Zero Team",
    category: "Cybersecurity",
    thumbnail: "https://img.youtube.com/vi/R2_fL0zH5h4/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=R2_fL0zH5h4",
    description: "Inside the most elite security research team hunting for zero-day vulnerabilities."
  },
  {
    id: "google-beyondcorp",
    title: "BeyondCorp: Zero Trust",
    institution: "Google Cloud",
    professor: "Security Engineering",
    category: "Architecture",
    thumbnail: "https://img.youtube.com/vi/XhYl6PAnG_M/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=XhYl6PAnG_M",
    description: "Architecting the original Zero Trust model for a perimeterless enterprise."
  },
  {
    id: "mit-quantum",
    title: "Quantum Physics I",
    institution: "MIT",
    professor: "Prof. Allan Adams",
    category: "Science",
    thumbnail: "https://img.youtube.com/vi/u9u9-2HPaGg/hqdefault.jpg",
    link: "https://www.youtube.com/playlist?list=PLUl4u3cNGP61-9PEhRognwCP38d7G27ge",
    description: "The definitive exploration of quantum reality and the fundamental laws of nature."
  },
  {
    id: "mit-ai",
    title: "Artificial Intelligence",
    institution: "MIT",
    professor: "Prof. Patrick Winston",
    category: "Technology",
    thumbnail: "https://img.youtube.com/vi/TjZBTDzGeGg/hqdefault.jpg",
    link: "https://www.youtube.com/playlist?list=PLUl4u3cNGP63gFHB6xb-kVBiQHYe_4hSi",
    description: "The foundational MIT course on how we represent knowledge and build intelligent systems."
  },
  {
    id: "mit-sicp",
    title: "SICP: The Art of Programming",
    institution: "MIT",
    professor: "Abelson & Sussman",
    category: "Invention",
    thumbnail: "https://img.youtube.com/vi/2Op3QLzMgSY/hqdefault.jpg",
    link: "https://www.youtube.com/playlist?list=PLE188W7MUIuG67EBvyY0y2P-0I8l8uH2O",
    description: "Managing complexity through functional abstraction – the 'Bible' of computer science."
  },
  {
    id: "harvard-justice",
    title: "Justice: The Right Thing To Do",
    institution: "Harvard",
    professor: "Prof. Michael Sandel",
    category: "Behaviour",
    thumbnail: "https://img.youtube.com/vi/kBdfcNV60L8/hqdefault.jpg",
    link: "https://www.youtube.com/playlist?list=PL30CFeMCI1l9S49Wz9iL79fKLSigInYWG",
    description: "The most famous course in Harvard's history, exploring the architecture of human morality."
  },
  {
    id: "harvard-cs50",
    title: "CS50: Intro to Computer Science",
    institution: "Harvard",
    professor: "Prof. David J. Malan",
    category: "Technology",
    thumbnail: "https://img.youtube.com/vi/y62zj9ozUXM/hqdefault.jpg",
    link: "https://www.youtube.com/user/cs50tv",
    description: "An intellectual enterprise in the art of programming and technological innovation."
  },
  {
    id: "harvard-pinker",
    title: "The Science of Human Nature",
    institution: "Harvard",
    professor: "Prof. Steven Pinker",
    category: "Behaviour",
    thumbnail: "https://img.youtube.com/vi/fXf8V-u906I/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=fXf8V-u906I",
    description: "Exploring the biological roots of human linguistics, behaviour, and perception."
  },
  {
    id: "oxford-penrose",
    title: "Consciousness & Universe",
    institution: "Oxford",
    professor: "Sir Roger Penrose",
    category: "Reality",
    thumbnail: "https://img.youtube.com/vi/3WXTX0IUaOg/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=3WXTX0IUaOg",
    description: "Nobel laureate Roger Penrose on the intersection of physics and human consciousness."
  },
  {
    id: "oxford-dawkins",
    title: "The Poetry of Science",
    institution: "Oxford",
    professor: "Prof. Richard Dawkins",
    category: "Science",
    thumbnail: "https://img.youtube.com/vi/jHoxZF3ZgTo/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=jHoxZF3ZgTo",
    description: "A masterclass in scientific communication and the majesty of the observable universe."
  },
  {
    id: "oxford-math",
    title: "The Secret Mathematicians",
    institution: "Oxford",
    professor: "Prof. Marcus du Sautoy",
    category: "Invention",
    thumbnail: "https://img.youtube.com/vi/48NOf94p_uA/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=48NOf94p_uA",
    description: "How mathematical symmetry and patterns define the architecture of our world."
  },
  {
    id: "stanford-behavior",
    title: "Human Behavioral Biology",
    institution: "Stanford",
    professor: "Prof. Robert Sapolsky",
    category: "Behaviour",
    thumbnail: "https://img.youtube.com/vi/NNnIGh9g6fA/hqdefault.jpg",
    link: "https://www.youtube.com/playlist?list=PL848F619DA6B96451",
    description: "The global gold standard for understanding the biological architecture of human behaviour."
  },
  {
    id: "stanford-ml",
    title: "Machine Learning",
    institution: "Stanford",
    professor: "Prof. Andrew Ng",
    category: "Technology",
    thumbnail: "https://img.youtube.com/vi/jGwO_UgTS7I/hqdefault.jpg",
    link: "https://www.youtube.com/playlist?list=PLLssT5z_DsK-h9vYZkQkYNWcItqhlRJLN",
    description: "The most influential technical course in history, defining the future of AI."
  },
  {
    id: "stanford-knuth",
    title: "The Art of Computer Programming",
    institution: "Stanford",
    professor: "Prof. Donald Knuth",
    category: "Invention",
    thumbnail: "https://img.youtube.com/vi/zJOS0sV2a24/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=zJOS0sV2a24",
    description: "The pinnacle of algorithmic aesthetics and the mathematical foundations of code."
  }
];
