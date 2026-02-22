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


// Add this new export
export const allQuizQuestions = [
  // Java - Easy
  { id: 1, domain: "java", question: "Which keyword is used to inherit a class?", options: ["implement", "inherits", "extends", "instanceof"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 2, domain: "java", question: "Which method is entry point of Java?", options: ["start()", "run()", "main()", "init()"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 3, domain: "java", question: "Which is not primitive type?", options: ["int", "float", "String", "char"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 4, domain: "java", question: "Which JVM component loads classes?", options: ["Compiler", "Interpreter", "ClassLoader", "JIT"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 5, domain: "java", question: "Which is used for memory cleanup?", options: ["Destructor", "Cleaner", "Garbage Collector", "Finalizer"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 6, domain: "java", question: "Which keyword prevents inheritance?", options: ["static", "const", "final", "private"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 7, domain: "java", question: "Which collection allows duplicates?", options: ["Set", "Map", "List", "None"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 8, domain: "java", question: "Which exception is checked?", options: ["ArithmeticException", "NullPointerException", "IOException", "ArrayIndexOutOfBoundsException"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 9, domain: "java", question: "Which operator compares values?", options: ["=", "==", "!=", "equals"], correctAnswer: 1, difficulty: "Easy" as const },
  { id: 10, domain: "java", question: "Which is thread safe?", options: ["ArrayList", "HashMap", "Vector", "HashSet"], correctAnswer: 2, difficulty: "Easy" as const },

  // Java - Medium
  { id: 11, domain: "java", question: "Which keyword is used to inherit a class?", options: ["implement", "inherits", "extends", "instanceof"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 12, domain: "java", question: "Which method is entry point of Java?", options: ["start()", "run()", "main()", "init()"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 13, domain: "java", question: "Which is not primitive type?", options: ["int", "float", "String", "char"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 14, domain: "java", question: "Which JVM component loads classes?", options: ["Compiler", "Interpreter", "ClassLoader", "JIT"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 15, domain: "java", question: "Which is used for memory cleanup?", options: ["Destructor", "Cleaner", "Garbage Collector", "Finalizer"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 16, domain: "java", question: "Which keyword prevents inheritance?", options: ["static", "const", "final", "private"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 17, domain: "java", question: "Which collection allows duplicates?", options: ["Set", "Map", "List", "None"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 18, domain: "java", question: "Which exception is checked?", options: ["ArithmeticException", "NullPointerException", "IOException", "ArrayIndexOutOfBoundsException"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 19, domain: "java", question: "Which operator compares values?", options: ["=", "==", "!=", "equals"], correctAnswer: 1, difficulty: "Medium" as const },
  { id: 20, domain: "java", question: "Which is thread safe?", options: ["ArrayList", "HashMap", "Vector", "HashSet"], correctAnswer: 2, difficulty: "Medium" as const },

  // Java - Hard
  { id: 21, domain: "java", question: "Which keyword is used to inherit a class?", options: ["implement", "inherits", "extends", "instanceof"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 22, domain: "java", question: "Which method is entry point of Java?", options: ["start()", "run()", "main()", "init()"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 23, domain: "java", question: "Which is not primitive type?", options: ["int", "float", "String", "char"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 24, domain: "java", question: "Which JVM component loads classes?", options: ["Compiler", "Interpreter", "ClassLoader", "JIT"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 25, domain: "java", question: "Which is used for memory cleanup?", options: ["Destructor", "Cleaner", "Garbage Collector", "Finalizer"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 26, domain: "java", question: "Which keyword prevents inheritance?", options: ["static", "const", "final", "private"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 27, domain: "java", question: "Which collection allows duplicates?", options: ["Set", "Map", "List", "None"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 28, domain: "java", question: "Which exception is checked?", options: ["ArithmeticException", "NullPointerException", "IOException", "ArrayIndexOutOfBoundsException"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 29, domain: "java", question: "Which operator compares values?", options: ["=", "==", "!=", "equals"], correctAnswer: 1, difficulty: "Hard" as const },
  { id: 30, domain: "java", question: "Which is thread safe?", options: ["ArrayList", "HashMap", "Vector", "HashSet"], correctAnswer: 2, difficulty: "Hard" as const },

  // QA - Easy
  { id: 31, domain: "qa", question: "What does QA stand for?", options: ["Quality Audit", "Quality Assurance", "Quick Access", "Query Analysis"], correctAnswer: 1, difficulty: "Easy" as const },
  { id: 32, domain: "qa", question: "Which testing is manual?", options: ["Automation", "Exploratory", "Performance", "Load"], correctAnswer: 1, difficulty: "Easy" as const },
  { id: 33, domain: "qa", question: "Which finds bugs?", options: ["Coding", "Testing", "Design", "Deployment"], correctAnswer: 1, difficulty: "Easy" as const },
  { id: 34, domain: "qa", question: "Which document has test cases?", options: ["SRS", "Test Plan", "Design Doc", "Code Doc"], correctAnswer: 1, difficulty: "Easy" as const },
  { id: 35, domain: "qa", question: "Which is functional testing?", options: ["Unit", "Load", "Stress", "Volume"], correctAnswer: 0, difficulty: "Easy" as const },
  { id: 36, domain: "qa", question: "Which testing is automated?", options: ["Manual", "Exploratory", "Selenium", "Adhoc"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 37, domain: "qa", question: "Which testing checks speed?", options: ["Security", "Performance", "Unit", "Smoke"], correctAnswer: 1, difficulty: "Easy" as const },
  { id: 38, domain: "qa", question: "Which is regression testing?", options: ["New test", "Re-test after changes", "Delete test", "Skip test"], correctAnswer: 1, difficulty: "Easy" as const },
  { id: 39, domain: "qa", question: "Which is black box?", options: ["Code knowledge", "No code knowledge", "Partial code", "Full code"], correctAnswer: 1, difficulty: "Easy" as const },
  { id: 40, domain: "qa", question: "Which finds security flaws?", options: ["Load", "Security Testing", "Smoke", "Unit"], correctAnswer: 1, difficulty: "Easy" as const },

  // QA - Medium
  { id: 41, domain: "qa", question: "What does QA stand for?", options: ["Quality Audit", "Quality Assurance", "Quick Access", "Query Analysis"], correctAnswer: 1, difficulty: "Medium" as const },
  { id: 42, domain: "qa", question: "Which testing is manual?", options: ["Automation", "Exploratory", "Performance", "Load"], correctAnswer: 1, difficulty: "Medium" as const },
  { id: 43, domain: "qa", question: "Which finds bugs?", options: ["Coding", "Testing", "Design", "Deployment"], correctAnswer: 1, difficulty: "Medium" as const },
  { id: 44, domain: "qa", question: "Which document has test cases?", options: ["SRS", "Test Plan", "Design Doc", "Code Doc"], correctAnswer: 1, difficulty: "Medium" as const },
  { id: 45, domain: "qa", question: "Which is functional testing?", options: ["Unit", "Load", "Stress", "Volume"], correctAnswer: 0, difficulty: "Medium" as const },
  { id: 46, domain: "qa", question: "Which testing is automated?", options: ["Manual", "Exploratory", "Selenium", "Adhoc"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 47, domain: "qa", question: "Which testing checks speed?", options: ["Security", "Performance", "Unit", "Smoke"], correctAnswer: 1, difficulty: "Medium" as const },
  { id: 48, domain: "qa", question: "Which is regression testing?", options: ["New test", "Re-test after changes", "Delete test", "Skip test"], correctAnswer: 1, difficulty: "Medium" as const },
  { id: 49, domain: "qa", question: "Which is black box?", options: ["Code knowledge", "No code knowledge", "Partial code", "Full code"], correctAnswer: 1, difficulty: "Medium" as const },
  { id: 50, domain: "qa", question: "Which finds security flaws?", options: ["Load", "Security Testing", "Smoke", "Unit"], correctAnswer: 1, difficulty: "Medium" as const },

  // QA - Hard
  { id: 51, domain: "qa", question: "What does QA stand for?", options: ["Quality Audit", "Quality Assurance", "Quick Access", "Query Analysis"], correctAnswer: 1, difficulty: "Hard" as const },
  { id: 52, domain: "qa", question: "Which testing is manual?", options: ["Automation", "Exploratory", "Performance", "Load"], correctAnswer: 1, difficulty: "Hard" as const },
  { id: 53, domain: "qa", question: "Which finds bugs?", options: ["Coding", "Testing", "Design", "Deployment"], correctAnswer: 1, difficulty: "Hard" as const },
  { id: 54, domain: "qa", question: "Which document has test cases?", options: ["SRS", "Test Plan", "Design Doc", "Code Doc"], correctAnswer: 1, difficulty: "Hard" as const },
  { id: 55, domain: "qa", question: "Which is functional testing?", options: ["Unit", "Load", "Stress", "Volume"], correctAnswer: 0, difficulty: "Hard" as const },
  { id: 56, domain: "qa", question: "Which testing is automated?", options: ["Manual", "Exploratory", "Selenium", "Adhoc"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 57, domain: "qa", question: "Which testing checks speed?", options: ["Security", "Performance", "Unit", "Smoke"], correctAnswer: 1, difficulty: "Hard" as const },
  { id: 58, domain: "qa", question: "Which is regression testing?", options: ["New test", "Re-test after changes", "Delete test", "Skip test"], correctAnswer: 1, difficulty: "Hard" as const },
  { id: 59, domain: "qa", question: "Which is black box?", options: ["Code knowledge", "No code knowledge", "Partial code", "Full code"], correctAnswer: 1, difficulty: "Hard" as const },
  { id: 60, domain: "qa", question: "Which finds security flaws?", options: ["Load", "Security Testing", "Smoke", "Unit"], correctAnswer: 1, difficulty: "Hard" as const },

  // DevOps - Easy
  { id: 61, domain: "devops", question: "What is CI?", options: ["Continuous Input", "Continuous Integration", "Code Input", "Code Integration"], correctAnswer: 1, difficulty: "Easy" as const },
  { id: 62, domain: "devops", question: "Which tool is CI/CD?", options: ["Git", "Docker", "Jenkins", "Linux"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 63, domain: "devops", question: "Which is container tool?", options: ["Git", "Docker", "Jenkins", "Ansible"], correctAnswer: 1, difficulty: "Easy" as const },
  { id: 64, domain: "devops", question: "Which is version control?", options: ["Docker", "Git", "Kubernetes", "Linux"], correctAnswer: 1, difficulty: "Easy" as const },
  { id: 65, domain: "devops", question: "Which is cloud?", options: ["Git", "Docker", "AWS", "Linux"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 66, domain: "devops", question: "Which automates config?", options: ["Git", "Docker", "Ansible", "Jenkins"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 67, domain: "devops", question: "Which monitors?", options: ["Git", "Prometheus", "Docker", "AWS"], correctAnswer: 1, difficulty: "Easy" as const },
  { id: 68, domain: "devops", question: "Which orchestrates containers?", options: ["Docker", "Git", "Kubernetes", "Linux"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 69, domain: "devops", question: "Which builds code?", options: ["Docker", "Maven", "Git", "AWS"], correctAnswer: 1, difficulty: "Easy" as const },
  { id: 70, domain: "devops", question: "Which stores code?", options: ["Docker", "GitHub", "Linux", "AWS"], correctAnswer: 1, difficulty: "Easy" as const },

  // DevOps - Medium
  { id: 71, domain: "devops", question: "What is CI?", options: ["Continuous Input", "Continuous Integration", "Code Input", "Code Integration"], correctAnswer: 1, difficulty: "Medium" as const },
  { id: 72, domain: "devops", question: "Which tool is CI/CD?", options: ["Git", "Docker", "Jenkins", "Linux"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 73, domain: "devops", question: "Which is container tool?", options: ["Git", "Docker", "Jenkins", "Ansible"], correctAnswer: 1, difficulty: "Medium" as const },
  { id: 74, domain: "devops", question: "Which is version control?", options: ["Docker", "Git", "Kubernetes", "Linux"], correctAnswer: 1, difficulty: "Medium" as const },
  { id: 75, domain: "devops", question: "Which is cloud?", options: ["Git", "Docker", "AWS", "Linux"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 76, domain: "devops", question: "Which automates config?", options: ["Git", "Docker", "Ansible", "Jenkins"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 77, domain: "devops", question: "Which monitors?", options: ["Git", "Prometheus", "Docker", "AWS"], correctAnswer: 1, difficulty: "Medium" as const },
  { id: 78, domain: "devops", question: "Which orchestrates containers?", options: ["Docker", "Git", "Kubernetes", "Linux"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 79, domain: "devops", question: "Which builds code?", options: ["Docker", "Maven", "Git", "AWS"], correctAnswer: 1, difficulty: "Medium" as const },
  { id: 80, domain: "devops", question: "Which stores code?", options: ["Docker", "GitHub", "Linux", "AWS"], correctAnswer: 1, difficulty: "Medium" as const },

  // DevOps - Hard
  { id: 81, domain: "devops", question: "What is CI?", options: ["Continuous Input", "Continuous Integration", "Code Input", "Code Integration"], correctAnswer: 1, difficulty: "Hard" as const },
  { id: 82, domain: "devops", question: "Which tool is CI/CD?", options: ["Git", "Docker", "Jenkins", "Linux"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 83, domain: "devops", question: "Which is container tool?", options: ["Git", "Docker", "Jenkins", "Ansible"], correctAnswer: 1, difficulty: "Hard" as const },
  { id: 84, domain: "devops", question: "Which is version control?", options: ["Docker", "Git", "Kubernetes", "Linux"], correctAnswer: 1, difficulty: "Hard" as const },
  { id: 85, domain: "devops", question: "Which is cloud?", options: ["Git", "Docker", "AWS", "Linux"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 86, domain: "devops", question: "Which automates config?", options: ["Git", "Docker", "Ansible", "Jenkins"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 87, domain: "devops", question: "Which monitors?", options: ["Git", "Prometheus", "Docker", "AWS"], correctAnswer: 1, difficulty: "Hard" as const },
  { id: 88, domain: "devops", question: "Which orchestrates containers?", options: ["Docker", "Git", "Kubernetes", "Linux"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 89, domain: "devops", question: "Which builds code?", options: ["Docker", "Maven", "Git", "AWS"], correctAnswer: 1, difficulty: "Hard" as const },
  { id: 90, domain: "devops", question: "Which stores code?", options: ["Docker", "GitHub", "Linux", "AWS"], correctAnswer: 1, difficulty: "Hard" as const },

  // GenAI - Easy
  { id: 91, domain: "genai", question: "What is GenAI?", options: ["General AI", "Generated AI", "Generative AI", "Generic AI"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 92, domain: "genai", question: "Which model generates text?", options: ["CNN", "RNN", "GPT", "SVM"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 93, domain: "genai", question: "Which company created ChatGPT?", options: ["Google", "Meta", "OpenAI", "Amazon"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 94, domain: "genai", question: "Which generates images?", options: ["GPT", "BERT", "DALL-E", "LSTM"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 95, domain: "genai", question: "Which is LLM?", options: ["Long Language Model", "Large Language Model", "Low Language Model", "List Language Model"], correctAnswer: 1, difficulty: "Easy" as const },
  { id: 96, domain: "genai", question: "Which is prompt?", options: ["Output", "Input to AI", "Error", "Code"], correctAnswer: 1, difficulty: "Easy" as const },
  { id: 97, domain: "genai", question: "Which is hallucination?", options: ["Correct output", "Wrong output", "Fast output", "Slow output"], correctAnswer: 1, difficulty: "Easy" as const },
  { id: 98, domain: "genai", question: "Which is embedding?", options: ["Text", "Image", "Vector representation", "Code"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 99, domain: "genai", question: "Which is fine tuning?", options: ["Testing", "Deployment", "Model training", "Deletion"], correctAnswer: 2, difficulty: "Easy" as const },
  { id: 100, domain: "genai", question: "Which is RAG?", options: ["Random AI", "Retrieval Augmented Generation", "Rapid AI", "None"], correctAnswer: 1, difficulty: "Easy" as const },

  // GenAI - Medium
  { id: 101, domain: "genai", question: "What is GenAI?", options: ["General AI", "Generated AI", "Generative AI", "Generic AI"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 102, domain: "genai", question: "Which model generates text?", options: ["CNN", "RNN", "GPT", "SVM"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 103, domain: "genai", question: "Which company created ChatGPT?", options: ["Google", "Meta", "OpenAI", "Amazon"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 104, domain: "genai", question: "Which generates images?", options: ["GPT", "BERT", "DALL-E", "LSTM"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 105, domain: "genai", question: "Which is LLM?", options: ["Long Language Model", "Large Language Model", "Low Language Model", "List Language Model"], correctAnswer: 1, difficulty: "Medium" as const },
  { id: 106, domain: "genai", question: "Which is prompt?", options: ["Output", "Input to AI", "Error", "Code"], correctAnswer: 1, difficulty: "Medium" as const },
  { id: 107, domain: "genai", question: "Which is hallucination?", options: ["Correct output", "Wrong output", "Fast output", "Slow output"], correctAnswer: 1, difficulty: "Medium" as const },
  { id: 108, domain: "genai", question: "Which is embedding?", options: ["Text", "Image", "Vector representation", "Code"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 109, domain: "genai", question: "Which is fine tuning?", options: ["Testing", "Deployment", "Model training", "Deletion"], correctAnswer: 2, difficulty: "Medium" as const },
  { id: 110, domain: "genai", question: "Which is RAG?", options: ["Random AI", "Retrieval Augmented Generation", "Rapid AI", "None"], correctAnswer: 1, difficulty: "Medium" as const },

  // GenAI - Hard
  { id: 111, domain: "genai", question: "What is GenAI?", options: ["General AI", "Generated AI", "Generative AI", "Generic AI"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 112, domain: "genai", question: "Which model generates text?", options: ["CNN", "RNN", "GPT", "SVM"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 113, domain: "genai", question: "Which company created ChatGPT?", options: ["Google", "Meta", "OpenAI", "Amazon"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 114, domain: "genai", question: "Which generates images?", options: ["GPT", "BERT", "DALL-E", "LSTM"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 115, domain: "genai", question: "Which is LLM?", options: ["Long Language Model", "Large Language Model", "Low Language Model", "List Language Model"], correctAnswer: 1, difficulty: "Hard" as const },
  { id: 116, domain: "genai", question: "Which is prompt?", options: ["Output", "Input to AI", "Error", "Code"], correctAnswer: 1, difficulty: "Hard" as const },
  { id: 117, domain: "genai", question: "Which is hallucination?", options: ["Correct output", "Wrong output", "Fast output", "Slow output"], correctAnswer: 1, difficulty: "Hard" as const },
  { id: 118, domain: "genai", question: "Which is embedding?", options: ["Text", "Image", "Vector representation", "Code"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 119, domain: "genai", question: "Which is fine tuning?", options: ["Testing", "Deployment", "Model training", "Deletion"], correctAnswer: 2, difficulty: "Hard" as const },
  { id: 120, domain: "genai", question: "Which is RAG?", options: ["Random AI", "Retrieval Augmented Generation", "Rapid AI", "None"], correctAnswer: 1, difficulty: "Hard" as const },
];


// export const quizQuestions = [
//   {
//     id: 1,
//     question: "What is the primary principle behind inheritance in Java?",
//     options: [
//       "Code reusability through parent-child relationships",
//       "Restricting access to class members",
//       "Creating multiple instances of a class",
//       "Handling runtime exceptions",
//     ],
//     correctAnswer: 0,
//     difficulty: "Easy" as const,
//   },
//   {
//     id: 2,
//     question: "Which keyword is used to inherit a class in Java?",
//     options: ["implements", "extends", "inherits", "super"],
//     correctAnswer: 1,
//     difficulty: "Easy" as const,
//   },
//   {
//     id: 3,
//     question: "What is method overriding in Java?",
//     options: [
//       "Defining a method with the same name but different parameters",
//       "Creating a new method in a subclass",
//       "Redefining a parent class method in a child class with the same signature",
//       "Calling a method from another class",
//     ],
//     correctAnswer: 2,
//     difficulty: "Medium" as const,
//   },
//   {
//     id: 4,
//     question: "Which collection interface does NOT allow duplicate elements?",
//     options: ["List", "Set", "Queue", "Deque"],
//     correctAnswer: 1,
//     difficulty: "Medium" as const,
//   },
//   {
//     id: 5,
//     question: "What is the time complexity of HashMap.get() in the average case?",
//     options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
//     correctAnswer: 2,
//     difficulty: "Hard" as const,
//   },
//   {
//     id: 6,
//     question: "Which of the following is true about abstract classes?",
//     options: [
//       "They can be instantiated directly",
//       "They cannot have constructors",
//       "They can have both abstract and concrete methods",
//       "They must have all abstract methods",
//     ],
//     correctAnswer: 2,
//     difficulty: "Medium" as const,
//   },
//   {
//     id: 7,
//     question: "What does the 'volatile' keyword guarantee in Java?",
//     options: [
//       "Thread safety for all operations",
//       "Visibility of changes across threads",
//       "Atomic read-write operations",
//       "Synchronization of code blocks",
//     ],
//     correctAnswer: 1,
//     difficulty: "Hard" as const,
//   },
//   {
//     id: 8,
//     question: "Which design pattern ensures a class has only one instance?",
//     options: ["Factory", "Observer", "Singleton", "Strategy"],
//     correctAnswer: 2,
//     difficulty: "Easy" as const,
//   },
//   {
//     id: 9,
//     question: "What is the purpose of the 'finally' block?",
//     options: [
//       "To catch exceptions",
//       "To throw exceptions",
//       "To execute code regardless of exception occurrence",
//       "To define custom exceptions",
//     ],
//     correctAnswer: 2,
//     difficulty: "Easy" as const,
//   },
//   {
//     id: 10,
//     question: "What happens when a thread calls wait() without owning the monitor?",
//     options: [
//       "The thread sleeps",
//       "IllegalMonitorStateException is thrown",
//       "The thread continues execution",
//       "A deadlock occurs",
//     ],
//     correctAnswer: 1,
//     difficulty: "Hard" as const,
//   },
// ];

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
