export interface PollOption {
  id: number
  text: string
  votes: number
}

export interface Poll {
  id: string
  question: string
  options: PollOption[]
  allowMultipleVotes: boolean
  showResultsBeforeVote: boolean
  expiresAt: string | null
  isActive: boolean
  totalVotes: number
}

export const samplePoll: Poll = {
  id: "frontend-framework-poll",
  question: "프론트엔드 개발에서 가장 선호하는 프레임워크는?",
  options: [
    { id: 1, text: "React", votes: 45 },
    { id: 2, text: "Vue.js", votes: 28 },
    { id: 3, text: "Svelte", votes: 12 },
    { id: 4, text: "Angular", votes: 15 },
  ],
  allowMultipleVotes: false,
  showResultsBeforeVote: false,
  expiresAt: "2024-12-31T23:59:59Z",
  isActive: true,
  totalVotes: 100,
}

export const additionalPolls: Poll[] = [
  {
    id: "css-framework-poll",
    question: "CSS 프레임워크 중 가장 많이 사용하는 것은?",
    options: [
      { id: 1, text: "Tailwind CSS", votes: 52 },
      { id: 2, text: "Bootstrap", votes: 23 },
      { id: 3, text: "Material-UI", votes: 18 },
      { id: 4, text: "Styled Components", votes: 7 },
    ],
    allowMultipleVotes: false,
    showResultsBeforeVote: true,
    expiresAt: null,
    isActive: true,
    totalVotes: 100,
  },
  {
    id: "development-tool-poll",
    question: "개발 시 가장 선호하는 에디터는?",
    options: [
      { id: 1, text: "VS Code", votes: 67 },
      { id: 2, text: "WebStorm", votes: 15 },
      { id: 3, text: "Sublime Text", votes: 8 },
      { id: 4, text: "Vim/Neovim", votes: 10 },
    ],
    allowMultipleVotes: false,
    showResultsBeforeVote: false,
    expiresAt: "2024-06-30T23:59:59Z",
    isActive: true,
    totalVotes: 100,
  },
]
