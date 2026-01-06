const { classifyWithAI } = require("../services/aiService");

exports.classifyText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Text is required" });
    }

    const result = await classifyWithAI(text);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: "Failed to classify text",
      message: error.message
    });
  }
};
