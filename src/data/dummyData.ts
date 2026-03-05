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

export const learningPathResponse = {
  learner_id: "user1",
  topic: "Java Development",
  mastery: "Intermediate" as const,
  recommended_action: "advance",
  next_difficulty: "proficient",
  recommendations: [
    {
      course_id: "C02850",
      course_title: "Intermediate Java Course - OOPs, collctions",
      course_url: "https://www.udemy.com/course/mastering-in-object-oriented-programming-oops-by-rashmi/?utm_campaign=Search_DSA_Gamma_NonP_la.EN_cc.India&utm_source=google&utm_medium=paid-search&portfolio=India&utm_audience=mx&utm_tactic=nb&utm_term=&utm_content=g&funnel=&test=&gad_source=1&gad_campaignid=21178559977&gbraid=0AAAAADROdO2qAOFTg7h71aMH7Ip9wKdCP&gclid=CjwKCAiAzZ_NBhAEEiwAMtqKy6yAPoHhed0nGoc1gBD4mRpWolcqPXpJxunaUl0fbUL1kKp0tRTytRoCZq0QAvD_BwE",
      difficulty: "Intermediate" as const,
      xp_reward: 400,
      estimated_duration_hours: 8.7,
      skills_covered: "4-Pillars, List, Set, Map",
    },
    {
      course_id: "C02415",
      course_title: "Intermediate Java Course - Multithreading, FIle Handling",
      course_url: "https://www.udemy.com/course/java-concurrency-multithreading-beginner-to-intermediate/?utm_campaign=Search_DSA_Beta_Prof_la.EN_cc.India&utm_source=google&utm_medium=paid-search&portfolio=India&utm_audience=mx&utm_tactic=nb&utm_term=&utm_content=g&funnel=&test=&gad_source=1&gad_campaignid=21178559974&gbraid=0AAAAADROdO2VySCrT1S6fh_s1PwgY0bvG&gclid=CjwKCAiAzZ_NBhAEEiwAMtqKy9UTc0BB_CByoBIzSRxLxoHjsaAvAQDveaKjEK1w626DliQzmjFKbBoC6MAQAvD_BwE",
      difficulty: "Intermediate" as const,
      xp_reward: 400,
      estimated_duration_hours: 32.6,
      skills_covered: "Threads, IO Streams",
    },
    {
      course_id: "C02826",
      course_title: "Intermediate Java Course - Exception Handling, JDBC",
      course_url: "https://www.udemy.com/course/exceptions-handling-in-java-exercises/?utm_campaign=Search_DSA_Beta_Prof_la.EN_cc.India&utm_source=google&utm_medium=paid-search&portfolio=India&utm_audience=mx&utm_tactic=nb&utm_term=&utm_content=g&funnel=&test=&gad_source=1&gad_campaignid=21178559974&gbraid=0AAAAADROdO2VySCrT1S6fh_s1PwgY0bvG&gclid=CjwKCAiAzZ_NBhAEEiwAMtqKy4Sj6zu7sCOcfppZUlk9cklK9zPVfZ23C63xAovSeQkuBLZcdYHfJhoCL34QAvD_BwE",
      difficulty: "Intermediate" as const,
      xp_reward: 400,
      estimated_duration_hours: 20.3,
      skills_covered: "jdbc, Try-Catch, Finally, Throw",
    },
    {
      course_id: "C02631",
      course_title: "Intermediate Java Course - SpringBoot",
      course_url: "https://www.udemy.com/course/spring-5-with-spring-boot-2/?utm_campaign=Search_DSA_Beta_Prof_la.EN_cc.India_Subs&utm_source=google&utm_medium=paid-search&portfolio=India&utm_audience=mx&utm_tactic=nb&utm_term=&utm_content=g&funnel=&test=&gad_source=1&gad_campaignid=22900574867&gbraid=0AAAAADROdO1jFOHBPiUK4D_r-c1IqnRVd&gclid=CjwKCAiAzZ_NBhAEEiwAMtqKy4vMqVLmnTn1jzZWbRPRhyxFUgsIIkIJioI2kobFNajY0g_U3PuOJhoCE3sQAvD_BwE",
      difficulty: "Intermediate" as const,
      xp_reward: 400,
      estimated_duration_hours: 38.1,
      skills_covered: "Microservices, Controller, Connection",
    },
    {
      course_id: "C02629",
      course_title: "Intermediate Java Course - Servelets, Hibernate, Maven",
      course_url: "https://www.udemy.com/course/jsp-servlet-free-course/?srsltid=AfmBOop7erPpO_9PoNmHOKoj7jVTzZXI5k5jcmk1Vm-hrU61enawKym_",
      difficulty: "Intermediate" as const,
      xp_reward: 500,
      estimated_duration_hours: 47.6,
      skills_covered: "Servelet Life-Cycle, req-res handling, Session Management",
    },
  ],
  learning_path: {
    weeks: [
      {
        week: 1,
        course_id: "C02850",
        course_title: "Intermediate Java Course - OOPs, collctions",
        course_url: "https://www.udemy.com/course/mastering-in-object-oriented-programming-oops-by-rashmi/?utm_campaign=Search_DSA_Gamma_NonP_la.EN_cc.India&utm_source=google&utm_medium=paid-search&portfolio=India&utm_audience=mx&utm_tactic=nb&utm_term=&utm_content=g&funnel=&test=&gad_source=1&gad_campaignid=21178559977&gbraid=0AAAAADROdO2qAOFTg7h71aMH7Ip9wKdCP&gclid=CjwKCAiAzZ_NBhAEEiwAMtqKy6yAPoHhed0nGoc1gBD4mRpWolcqPXpJxunaUl0fbUL1kKp0tRTytRoCZq0QAvD_BwE",
        objective: "Get Hands on practice on OOPs concept and Collection framework.",
        focus_topics: ["4-Pillars", "List", "Set", "Map", "springboot"],
        practical_tasks: [
          "Implement all the OOPs concept",
          "Try hands practice for all the collection framework",
        ],
        estimated_hours: 4,
        xp_target: 400,
        status: "Completed" as const,
      },
      {
        week: 2,
        course_id: "C02415",
        course_title: "Intermediate Java Course - Multithreading, File Handling",
        course_url: "https://www.udemy.com/course/java-concurrency-multithreading-beginner-to-intermediate/?utm_campaign=Search_DSA_Beta_Prof_la.EN_cc.India&utm_source=google&utm_medium=paid-search&portfolio=India&utm_audience=mx&utm_tactic=nb&utm_term=&utm_content=g&funnel=&test=&gad_source=1&gad_campaignid=21178559974&gbraid=0AAAAADROdO2VySCrT1S6fh_s1PwgY0bvG&gclid=CjwKCAiAzZ_NBhAEEiwAMtqKy9UTc0BB_CByoBIzSRxLxoHjsaAvAQDveaKjEK1w626DliQzmjFKbBoC6MAQAvD_BwE",
        objective: "Enhance Java Multithreading and File Handling Skills",
        focus_topics: ["Threads", "IO Streams"],
        practical_tasks: [
          "Implement the Multithreading concept",
          "Try Hands on File Handling ",
        ],
        estimated_hours: 4,
        xp_target: 800,
        status: "Current" as const,
      },
      {
        week: 3,
        course_id: "C02826",
        course_title: "Intermediate Java Course - Exception Handling, JDBC",
        course_url: "https://www.udemy.com/course/exceptions-handling-in-java-exercises/?utm_campaign=Search_DSA_Beta_Prof_la.EN_cc.India&utm_source=google&utm_medium=paid-search&portfolio=India&utm_audience=mx&utm_tactic=nb&utm_term=&utm_content=g&funnel=&test=&gad_source=1&gad_campaignid=21178559974&gbraid=0AAAAADROdO2VySCrT1S6fh_s1PwgY0bvG&gclid=CjwKCAiAzZ_NBhAEEiwAMtqKy4Sj6zu7sCOcfppZUlk9cklK9zPVfZ23C63xAovSeQkuBLZcdYHfJhoCL34QAvD_BwE",
        objective: "Implement JDBC connection and try SQL queries",
        focus_topics: ["jdbc", "Try-Catch", "Finally", "Throw"],
        practical_tasks: [
          "Configure JDBC with Spring Boot",
          "Perform CRUD operations using JDBC",
        ],
        estimated_hours: 5,
        xp_target: 1200,
        status: "Locked" as const,
      },
      {
        week: 4,
        course_id: "C02631",
        course_title: "Intermediate Java Course - SpringBoot",
        course_url: "https://www.udemy.com/course/spring-5-with-spring-boot-2/?utm_campaign=Search_DSA_Beta_Prof_la.EN_cc.India_Subs&utm_source=google&utm_medium=paid-search&portfolio=India&utm_audience=mx&utm_tactic=nb&utm_term=&utm_content=g&funnel=&test=&gad_source=1&gad_campaignid=22900574867&gbraid=0AAAAADROdO1jFOHBPiUK4D_r-c1IqnRVd&gclid=CjwKCAiAzZ_NBhAEEiwAMtqKy4vMqVLmnTn1jzZWbRPRhyxFUgsIIkIJioI2kobFNajY0g_U3PuOJhoCE3sQAvD_BwE",
        objective: "Complete SpringBoot Course",
        focus_topics: ["jdbc", "springboot"],
        practical_tasks: [
          "Implement Dependency Injection ",
          "Implement Bean Scope ",
        ],
        estimated_hours: 5,
        xp_target: 1600,
        status: "Locked" as const,
      },
      {
        week: 5,
        course_id: "C02629",
        course_title: "Intermediate Java Course - Servelets, Hibernate, Maven",
        course_url: "https://www.udemy.com/course/jsp-servlet-free-course/?srsltid=AfmBOop7erPpO_9PoNmHOKoj7jVTzZXI5k5jcmk1Vm-hrU61enawKym_",
        objective: "Make ",
        focus_topics: ["java", "jdbc"],
        practical_tasks: [
          "Build a Login Logout Servelet",
          "Implement a session management",
          "Add dependencies using Maven"
        ],
        estimated_hours: 6,
        xp_target: 2100,
        status: "Locked" as const,
      },
    ],
    skill_progression_summary:
      "Progress from basic Java Development configurations to advanced Java Development",
    key_competencies_gained: [
      "Java OOPs, Collection, Multithreading, Exception Handling",
      "Spring Boot application development",
      "Maven Project management",
      "Database interaction optimization",
    ],
    final_motivation:
      "You will have developed a comprehensive Java development with advanced configurations and integrations, ready for real-world deployment.",
  },
};

// Keep the old export name for backward compatibility (maps to the weeks array)
export const learningPath = learningPathResponse.learning_path.weeks;

export const resultData = {
  score: 70,
  xpEarned: 120,
  masteryLevel: "Intermediate" as const,
  weakSkillsFound: ["Inheritance", "Encapsulation"],
  aiFeedback: "You have a good understanding of core Java concepts! Focus more on inheritance and encapsulation patterns. Practice implementing abstract classes and interfaces to strengthen your OOP fundamentals.",
};

export const performanceData = {
  weeklyProgress: [
    { week: 1, xpEarned: 400, xpTarget: 400, hoursSpent: 4.5, hoursEstimated: 4, completedOnTime: true, status: "Completed" as const },
    { week: 2, xpEarned: 280, xpTarget: 400, hoursSpent: 3, hoursEstimated: 4, completedOnTime: false, status: "In Progress" as const },
    { week: 3, xpEarned: 0, xpTarget: 400, hoursSpent: 0, hoursEstimated: 5, completedOnTime: false, status: "Locked" as const },
    { week: 4, xpEarned: 0, xpTarget: 400, hoursSpent: 0, hoursEstimated: 5, completedOnTime: false, status: "Locked" as const },
    { week: 5, xpEarned: 0, xpTarget: 500, hoursSpent: 0, hoursEstimated: 6, completedOnTime: false, status: "Locked" as const },
  ],
  quizHistory: [
    { id: 1, date: "2026-02-10", domain: "Java", score: 55, totalQuestions: 10, difficulty: "Easy" as const },
    { id: 2, date: "2026-02-14", domain: "Java", score: 60, totalQuestions: 10, difficulty: "Easy" as const },
    { id: 3, date: "2026-02-18", domain: "Java", score: 70, totalQuestions: 10, difficulty: "Medium" as const },
    { id: 4, date: "2026-02-22", domain: "Spring Boot", score: 65, totalQuestions: 10, difficulty: "Medium" as const },
    { id: 5, date: "2026-02-26", domain: "Spring Boot", score: 80, totalQuestions: 10, difficulty: "Medium" as const },
  ],
  studyCalendar: [
    // Last 28 days of activity (0 = no activity, 1-3 = intensity)
    0, 1, 2, 0, 1, 3, 2,
    1, 0, 2, 3, 1, 2, 0,
    3, 2, 1, 0, 0, 2, 3,
    1, 2, 3, 2, 1, 3, 2,
  ],
  totalXp: 680,
  targetXp: 2100,
  overallAccuracy: 70,
  currentStreak: 7,
  longestStreak: 12,
  totalHoursStudied: 7.5,
  aiInsight: "You're progressing well through Week 2! Your quiz scores are trending upward (+25% since your first attempt). Focus on Collections and Multithreading to strengthen your weak areas before moving to Week 3.",
};

