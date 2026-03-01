const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Adjust the path to your server's .env file
dotenv.config({ path: path.join(__dirname, "../.env") });

// Models
const Domain = require("../models/Domain");
const Skill = require("../models/Skill");
const QuizQuestion = require("../models/QuizQuestion");

// Configuration
const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
    console.error("MONGODB_URI is not defined in the .env file.");
    process.exit(1);
}

// Adjust the root data directory path relative to this script
const DATA_DIR = path.join(__dirname, "../../data");

mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB for Upload"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

/**
 * Helper to process the options object and return an array of strings,
 * and calculate the 0-based index of the correct answer.
 */
function processOptions(optionsObj, answerKey) {
    const keys = Object.keys(optionsObj);
    const optionsArray = keys.map(k => optionsObj[k]);
    const correctIndex = keys.indexOf(answerKey);
    return { optionsArray, correctIndex };
}

async function processDomainFolder(domainFolderName) {
    console.log(`\n--- Processing Domain: ${domainFolderName} ---`);
    const domainPath = path.join(DATA_DIR, domainFolderName);

    if (!fs.existsSync(domainPath) || !fs.statSync(domainPath).isDirectory()) {
        console.warn(`Folder not found or is not a directory: ${domainPath}`);
        return;
    }

    // Capitalize domain name for the DB (e.g. devops -> DevOps, genai -> Generative AI)
    let domainDisplayName = domainFolderName;
    if (domainFolderName === "devops") domainDisplayName = "DevOps";
    else if (domainFolderName === "java") domainDisplayName = "Java";
    else if (domainFolderName === "genai") domainDisplayName = "Generative AI";
    else if (domainFolderName === "qa") domainDisplayName = "QA";
    else domainDisplayName = domainFolderName.charAt(0).toUpperCase() + domainFolderName.slice(1);

    // Find or create the Domain
    let domainDoc = await Domain.findOne({ name: domainDisplayName });
    if (!domainDoc) {
        console.log(`Creating Domain: ${domainDisplayName}`);
        domainDoc = await Domain.create({
            name: domainDisplayName,
            description: `${domainDisplayName} Domain created via auto-upload.`,
            icon: "💻" // Generic icon
        });
    } else {
        console.log(`Found Domain: ${domainDisplayName}`);
    }

    // Read JSON files in the domain folder
    const files = fs.readdirSync(domainPath).filter(file => file.endsWith('.json'));
    console.log(`Found ${files.length} JSON files in ${domainFolderName}`);

    for (const file of files) {
        const filePath = path.join(domainPath, file);
        try {
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const questions = JSON.parse(fileContent);

            console.log(`Processing file: ${file} (${questions.length} questions)`);

            for (const q of questions) {
                // Determine the skill name (Topic) from the JSON question
                const topicName = q.topic;
                if (!topicName) {
                    console.warn(`Question missing 'topic' field. Skipping: ${q.question.substring(0, 30)}...`);
                    continue;
                }

                // Find or create the Skill for the Domain
                let skillDoc = await Skill.findOne({ name: topicName, domain_id: domainDoc._id });
                if (!skillDoc) {
                    console.log(`  Creating Topic/Skill: ${topicName}`);
                    skillDoc = await Skill.create({
                        domain_id: domainDoc._id,
                        name: topicName,
                        description: `Questions related to ${topicName}`,
                        difficulty_level: q.level || "Medium"
                    });
                }

                // Check if the question already exists to prevent duplicates
                const existingQuestion = await QuizQuestion.findOne({
                    skill_id: skillDoc._id,
                    question_text: q.question
                });

                if (existingQuestion) {
                    console.log(`  Skipping existing question: ${q.question.substring(0, 20)}...`);
                    continue;
                }

                const { optionsArray, correctIndex } = processOptions(q.options, q.answer);

                if (correctIndex === -1) {
                    console.warn(`  Warning: Answer key '${q.answer}' not found in options for question: ${q.question.substring(0, 30)}...`);
                }

                await QuizQuestion.create({
                    skill_id: skillDoc._id,
                    question_text: q.question,
                    options: optionsArray,
                    correct_answer: correctIndex !== -1 ? correctIndex : 0, // Fallback if mismatched
                    explanation: q.explanation || ""
                });
            }
        } catch (err) {
            console.error(`Error processing file ${file}:`, err);
        }
    }
}

async function run() {
    try {
        const domains = ["devops", "java", "genai", "qa"];
        for (const domain of domains) {
            await processDomainFolder(domain);
        }
        console.log("\n✅ Completed all domains.");
    } catch (err) {
        console.error("Fatal Error:", err);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
}

run();
