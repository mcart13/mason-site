export type PostSummary = {
  id: string;
  title: string;
  date: string;
  href: string;
};

const loadingDelayMs = 800;

const posts: PostSummary[] = [
  {
    id: "ai-as-religion-a-short-thought-experiment",
    title: "AI as Religion — a Short Thought Experiment",
    date: "2025-09-20",
    href: "/writing/ai-as-religion-a-short-thought-experiment/",
  },
  {
    id: "the-world-after-3-5-10-25-50-and-100-years ft.AI",
    title: "The World After 3, 5, 10, 25, 50, and 100 Years Ft. AI",
    date: "2025-09-06",
    href: "/writing/the-world-after-3-5-10-25-50-and-100-years ft.AI",
  },
  {
    id: "the-blue-wall-a-thought-experiment-on-belief-and-reality",
    title: "The Blue Wall: A Thought Experiment on Belief and Reality",
    date: "2025-09-05",
    href: "/writing/the-blue-wall-a-thought-experiment-on-belief-and-reality/",
  },
  {
    id: "how-to-run-stable-diffusion-locally",
    title: "How to Run Stable Diffusion Locally",
    date: "2025-08-29",
    href: "/writing/how-to-run-stable-diffusion-locally/",
  },
];

function wait(delayMs: number) {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export async function getBlogPosts() {
  await wait(loadingDelayMs);
  return posts;
}

export async function getBlogPost() {
  await wait(loadingDelayMs);
  return null;
}
