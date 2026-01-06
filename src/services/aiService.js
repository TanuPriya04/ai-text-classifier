require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const confidenceMap = {
  Complaint: 0.9,
  Query: 0.85,
  Feedback: 0.8,
  Other: 0.6
};

// 🔹 Deterministic fallback 
const fallbackClassify = (text) => {
  const t = text.toLowerCase();

  if (
    t.includes("how") ||
    t.includes("can i") ||
    t.includes("?") ||
    t.includes("what") ||
    t.includes("help")
  ) return "Query";

  if (
    t.includes("not working") ||
    t.includes("bad") ||
    t.includes("damaged") ||
    t.includes("refund") ||
    t.includes("complain")
  ) return "Complaint";

  if (
    t.includes("good") ||
    t.includes("great") ||
    t.includes("love") ||
    t.includes("nice")
  ) return "Feedback";

  return "Other";
};

exports.classifyWithAI = async (text) => {
  if (!text || text.trim().length === 0) {
    return { category: "Other", confidence: confidenceMap.Other };
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Classify the text into one category:
Complaint, Query, Feedback, or Other.

Respond ONLY in JSON:
{ "category": "Complaint | Query | Feedback | Other" }

Text:
"${text}"
`;

  try {
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    const match = rawText.match(/\{[\s\S]*\}/);

    if (match) {
      const parsed = JSON.parse(match[0]);
      const category = parsed.category;

      if (confidenceMap[category]) {
        return {
          category,
          confidence: confidenceMap[category]
        };
      }
    }

    // 🔥 Gemini failed → fallback
    const fallbackCategory = fallbackClassify(text);

    return {
      category: fallbackCategory,
      confidence: confidenceMap[fallbackCategory]
    };

  } catch (error) {
    // 🔥 API failure → fallback
    const fallbackCategory = fallbackClassify(text);

    return {
      category: fallbackCategory,
      confidence: confidenceMap[fallbackCategory]
    };
  }
};
