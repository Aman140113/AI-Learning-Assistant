require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./db");

const Domain = require("./models/Domain");
const Skill = require("./models/Skill");
const QuizQuestion = require("./models/QuizQuestion");

async function seed() {
    await connectDB();

    // Clear existing data
    await Domain.deleteMany({});
    await Skill.deleteMany({});
    await QuizQuestion.deleteMany({});

    console.log("🗑️  Cleared old data");

    // ── 1. Create Domains ──
    const domains = await Domain.insertMany([
        { name: "Java Development", description: "Master Java from basics to advanced enterprise development", icon: "Coffee" },
        { name: "QA Testing", description: "Learn manual & automated testing strategies and tools", icon: "Bug" },
        { name: "DevOps", description: "CI/CD pipelines, containers, and cloud infrastructure", icon: "Server" },
        { name: "GenAI", description: "Explore generative AI, LLMs, and prompt engineering", icon: "Brain" },
    ]);
    console.log(`✅ Created ${domains.length} domains`);

    const domainMap = {};
    domains.forEach((d) => (domainMap[d.name] = d._id));

    // ── 2. Create Skills ──
    const skillsData = [
        // Java skills
        { domain: "Java Development", name: "Java Basics", description: "Variables, data types, operators, and control flow", difficulty_level: "Easy" },
        { domain: "Java Development", name: "OOP", description: "Classes, objects, inheritance, polymorphism", difficulty_level: "Medium" },
        { domain: "Java Development", name: "Collections", description: "Lists, Sets, Maps, and iterators", difficulty_level: "Medium" },
        { domain: "Java Development", name: "Exception Handling", description: "Try-catch, custom exceptions", difficulty_level: "Medium" },
        { domain: "Java Development", name: "Multithreading", description: "Threads, synchronization, concurrent utilities", difficulty_level: "Hard" },
        // QA skills
        { domain: "QA Testing", name: "Manual Testing", description: "Exploratory testing, test cases, test plans", difficulty_level: "Easy" },
        { domain: "QA Testing", name: "Automation Testing", description: "Selenium, automation frameworks", difficulty_level: "Medium" },
        { domain: "QA Testing", name: "Performance Testing", description: "Load testing, stress testing", difficulty_level: "Hard" },
        // DevOps skills
        { domain: "DevOps", name: "CI/CD", description: "Jenkins, pipelines, continuous integration", difficulty_level: "Medium" },
        { domain: "DevOps", name: "Containers", description: "Docker, Kubernetes, orchestration", difficulty_level: "Medium" },
        { domain: "DevOps", name: "Cloud", description: "AWS, Azure, cloud infrastructure", difficulty_level: "Hard" },
        // GenAI skills
        { domain: "GenAI", name: "LLM Basics", description: "Large Language Models, GPT, BERT", difficulty_level: "Easy" },
        { domain: "GenAI", name: "Prompt Engineering", description: "Prompt design, few-shot learning", difficulty_level: "Medium" },
        { domain: "GenAI", name: "RAG & Fine-tuning", description: "Retrieval Augmented Generation, model fine-tuning", difficulty_level: "Hard" },
    ];

    const skills = await Skill.insertMany(
        skillsData.map((s) => ({
            domain_id: domainMap[s.domain],
            name: s.name,
            description: s.description,
            difficulty_level: s.difficulty_level,
        }))
    );
    console.log(`✅ Created ${skills.length} skills`);

    const skillMap = {};
    skills.forEach((s) => (skillMap[s.name] = s._id));

    // ── 3. Create Quiz Questions ──
    const questionsData = [
        // Java questions
        { skill: "Java Basics", question_text: "Which keyword is used to inherit a class?", options: ["implement", "inherits", "extends", "instanceof"], correct_answer: 2 },
        { skill: "Java Basics", question_text: "Which method is entry point of Java?", options: ["start()", "run()", "main()", "init()"], correct_answer: 2 },
        { skill: "Java Basics", question_text: "Which is not a primitive type?", options: ["int", "float", "String", "char"], correct_answer: 2 },
        { skill: "Java Basics", question_text: "Which JVM component loads classes?", options: ["Compiler", "Interpreter", "ClassLoader", "JIT"], correct_answer: 2 },
        { skill: "Java Basics", question_text: "Which is used for memory cleanup?", options: ["Destructor", "Cleaner", "Garbage Collector", "Finalizer"], correct_answer: 2 },
        { skill: "OOP", question_text: "Which keyword prevents inheritance?", options: ["static", "const", "final", "private"], correct_answer: 2 },
        { skill: "OOP", question_text: "Which operator compares values?", options: ["=", "==", "!=", "equals"], correct_answer: 1 },
        { skill: "Collections", question_text: "Which collection allows duplicates?", options: ["Set", "Map", "List", "None"], correct_answer: 2 },
        { skill: "Collections", question_text: "Which is thread safe?", options: ["ArrayList", "HashMap", "Vector", "HashSet"], correct_answer: 2 },
        { skill: "Exception Handling", question_text: "Which exception is checked?", options: ["ArithmeticException", "NullPointerException", "IOException", "ArrayIndexOutOfBounds"], correct_answer: 2 },

        // QA questions
        { skill: "Manual Testing", question_text: "What does QA stand for?", options: ["Quality Audit", "Quality Assurance", "Quick Access", "Query Analysis"], correct_answer: 1 },
        { skill: "Manual Testing", question_text: "Which testing is manual?", options: ["Automation", "Exploratory", "Performance", "Load"], correct_answer: 1 },
        { skill: "Manual Testing", question_text: "Which finds bugs?", options: ["Coding", "Testing", "Design", "Deployment"], correct_answer: 1 },
        { skill: "Manual Testing", question_text: "Which document has test cases?", options: ["SRS", "Test Plan", "Design Doc", "Code Doc"], correct_answer: 1 },
        { skill: "Automation Testing", question_text: "Which testing is automated?", options: ["Manual", "Exploratory", "Selenium", "Adhoc"], correct_answer: 2 },
        { skill: "Automation Testing", question_text: "Which is regression testing?", options: ["New test", "Re-test after changes", "Delete test", "Skip test"], correct_answer: 1 },
        { skill: "Performance Testing", question_text: "Which testing checks speed?", options: ["Security", "Performance", "Unit", "Smoke"], correct_answer: 1 },
        { skill: "Performance Testing", question_text: "Which finds security flaws?", options: ["Load", "Security Testing", "Smoke", "Unit"], correct_answer: 1 },

        // DevOps questions
        { skill: "CI/CD", question_text: "What is CI?", options: ["Continuous Input", "Continuous Integration", "Code Input", "Code Integration"], correct_answer: 1 },
        { skill: "CI/CD", question_text: "Which tool is CI/CD?", options: ["Git", "Docker", "Jenkins", "Linux"], correct_answer: 2 },
        { skill: "Containers", question_text: "Which is a container tool?", options: ["Git", "Docker", "Jenkins", "Ansible"], correct_answer: 1 },
        { skill: "Containers", question_text: "Which orchestrates containers?", options: ["Docker", "Git", "Kubernetes", "Linux"], correct_answer: 2 },
        { skill: "Cloud", question_text: "Which is cloud?", options: ["Git", "Docker", "AWS", "Linux"], correct_answer: 2 },
        { skill: "Cloud", question_text: "Which monitors?", options: ["Git", "Prometheus", "Docker", "AWS"], correct_answer: 1 },

        // GenAI questions
        { skill: "LLM Basics", question_text: "What is GenAI?", options: ["General AI", "Generated AI", "Generative AI", "Generic AI"], correct_answer: 2 },
        { skill: "LLM Basics", question_text: "Which model generates text?", options: ["CNN", "RNN", "GPT", "SVM"], correct_answer: 2 },
        { skill: "LLM Basics", question_text: "Which company created ChatGPT?", options: ["Google", "Meta", "OpenAI", "Amazon"], correct_answer: 2 },
        { skill: "Prompt Engineering", question_text: "Which is a prompt?", options: ["Output", "Input to AI", "Error", "Code"], correct_answer: 1 },
        { skill: "Prompt Engineering", question_text: "Which is hallucination?", options: ["Correct output", "Wrong output", "Fast output", "Slow output"], correct_answer: 1 },
        { skill: "RAG & Fine-tuning", question_text: "Which is RAG?", options: ["Random AI", "Retrieval Augmented Generation", "Rapid AI", "None"], correct_answer: 1 },
        { skill: "RAG & Fine-tuning", question_text: "Which is fine tuning?", options: ["Testing", "Deployment", "Model training", "Deletion"], correct_answer: 2 },
    ];

    const questions = await QuizQuestion.insertMany(
        questionsData.map((q) => ({
            skill_id: skillMap[q.skill],
            question_text: q.question_text,
            options: q.options,
            correct_answer: q.correct_answer,
        }))
    );
    console.log(`✅ Created ${questions.length} quiz questions`);

    console.log("\n🎉 Seed complete! Database is ready.");
    process.exit(0);
}

seed().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});
