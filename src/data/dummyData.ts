export const userData = {
  name: "Alex Johnson",
  xp: 450,
  maxXp: 1000,
  level: "Beginner" as const,
  streak: 7,
  selectedDomain: "Java Development",
};

export const domains = [
  {
    id: "java",
    name: "Java Development",
    icon: "Coffee",
    description: "Master Java from basics to advanced enterprise development",
    color: "primary",
  },
  {
    id: "qa",
    name: "QA Testing",
    icon: "Bug",
    description: "Learn manual & automated testing strategies and tools",
    color: "accent",
  },
  {
    id: "devops",
    name: "DevOps",
    icon: "Server",
    description: "CI/CD pipelines, containers, and cloud infrastructure",
    color: "info",
  },
  {
    id: "genai",
    name: "GenAI",
    icon: "Brain",
    description: "Explore generative AI, LLMs, and prompt engineering",
    color: "success",
  },
];

export const skills = [
  { name: "Java Basics", status: "Proficient" as const, progress: 95 },
  { name: "OOP", status: "Intermediate" as const, progress: 60 },
  { name: "Collections", status: "Beginner" as const, progress: 25 },
  { name: "Exception Handling", status: "Intermediate" as const, progress: 55 },
  { name: "Multithreading", status: "Beginner" as const, progress: 15 },
];

export const weakSkills = ["Inheritance", "Multithreading", "Collections"];

export const quizQuestions = [
  {
    id: 1,
    question: "What is the primary principle behind inheritance in Java?",
    options: [
      "Code reusability through parent-child relationships",
      "Restricting access to class members",
      "Creating multiple instances of a class",
      "Handling runtime exceptions",
    ],
    correctAnswer: 0,
    difficulty: "Easy" as const,
  },
  {
    id: 2,
    question: "Which keyword is used to inherit a class in Java?",
    options: ["implements", "extends", "inherits", "super"],
    correctAnswer: 1,
    difficulty: "Easy" as const,
  },
  {
    id: 3,
    question: "What is method overriding in Java?",
    options: [
      "Defining a method with the same name but different parameters",
      "Creating a new method in a subclass",
      "Redefining a parent class method in a child class with the same signature",
      "Calling a method from another class",
    ],
    correctAnswer: 2,
    difficulty: "Medium" as const,
  },
  {
    id: 4,
    question: "Which collection interface does NOT allow duplicate elements?",
    options: ["List", "Set", "Queue", "Deque"],
    correctAnswer: 1,
    difficulty: "Medium" as const,
  },
  {
    id: 5,
    question: "What is the time complexity of HashMap.get() in the average case?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    correctAnswer: 2,
    difficulty: "Hard" as const,
  },
  {
    id: 6,
    question: "Which of the following is true about abstract classes?",
    options: [
      "They can be instantiated directly",
      "They cannot have constructors",
      "They can have both abstract and concrete methods",
      "They must have all abstract methods",
    ],
    correctAnswer: 2,
    difficulty: "Medium" as const,
  },
  {
    id: 7,
    question: "What does the 'volatile' keyword guarantee in Java?",
    options: [
      "Thread safety for all operations",
      "Visibility of changes across threads",
      "Atomic read-write operations",
      "Synchronization of code blocks",
    ],
    correctAnswer: 1,
    difficulty: "Hard" as const,
  },
  {
    id: 8,
    question: "Which design pattern ensures a class has only one instance?",
    options: ["Factory", "Observer", "Singleton", "Strategy"],
    correctAnswer: 2,
    difficulty: "Easy" as const,
  },
  {
    id: 9,
    question: "What is the purpose of the 'finally' block?",
    options: [
      "To catch exceptions",
      "To throw exceptions",
      "To execute code regardless of exception occurrence",
      "To define custom exceptions",
    ],
    correctAnswer: 2,
    difficulty: "Easy" as const,
  },
  {
    id: 10,
    question: "What happens when a thread calls wait() without owning the monitor?",
    options: [
      "The thread sleeps",
      "IllegalMonitorStateException is thrown",
      "The thread continues execution",
      "A deadlock occurs",
    ],
    correctAnswer: 1,
    difficulty: "Hard" as const,
  },
];

export const learningPath = [
  { week: 1, title: "Java Basics", description: "Variables, data types, operators, and control flow", status: "Completed" as const },
  { week: 2, title: "OOP Concepts", description: "Classes, objects, inheritance, and polymorphism", status: "Current" as const },
  { week: 3, title: "Collections Framework", description: "Lists, Sets, Maps, and iterators", status: "Locked" as const },
  { week: 4, title: "Exception Handling", description: "Try-catch, custom exceptions, and best practices", status: "Locked" as const },
  { week: 5, title: "Multithreading", description: "Threads, synchronization, and concurrent utilities", status: "Locked" as const },
  { week: 6, title: "Advanced Topics", description: "Streams, lambdas, and design patterns", status: "Locked" as const },
];

export const resultData = {
  score: 70,
  xpEarned: 120,
  masteryLevel: "Intermediate" as const,
  weakSkillsFound: ["Inheritance", "Encapsulation"],
  aiFeedback: "You have a good understanding of core Java concepts! Focus more on inheritance and encapsulation patterns. Practice implementing abstract classes and interfaces to strengthen your OOP fundamentals.",
};
