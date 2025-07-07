const express = require('express');
const router = express.Router();
const axios = require('axios');
const Problem = require('../models/Problem');
const Submission = require('../models/Submission');
const isAuth = require('../middleware/verification'); // sets req.user.id

// POST /submit
router.post('/submit', isAuth, async (req, res) => {
  const { code, language, problemId } = req.body;

  // 🔒 Validation
  if (!code || !language || !problemId) {
    return res.status(400).json({
      verdict: "Invalid Request",
      error: "Missing code, language, or problem ID.",
    });
  }

  try {
    // 📌 Fetch problem
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ verdict: "Problem Not Found" });
    }

    const testCases = problem.testCases || [];
    if (testCases.length === 0) {
      return res.status(400).json({ verdict: "No Test Cases Found" });
    }

    // 🧠 Judge each test case
    let verdict = "Accepted";
    let errorMessage = "";

    for (let i = 0; i < testCases.length; i++) {
      const { input, expectedOutput } = testCases[i];

      let result;
      try {
        result = await axios.post('http://localhost:8000/run', {
          code,
          language,
          input,
        });
      } catch (err) {
        verdict = "Internal Error";
        errorMessage = err.response?.data?.error || "Compiler server error";
        break;
      }

      const output = result.data.output?.trim();
      const error = result.data.error;

      if (error) {
        verdict = "Compilation Error";
        errorMessage = error;
        break;
      }

      if (output !== expectedOutput.trim()) {
        verdict = "Wrong Answer";
        errorMessage = `Test case ${i + 1} failed`;
        break;
      }
    }

    // 💾 Save submission
    await Submission.create({
      user: req.user.id,
      problem: problemId,
      code,
      language,
      verdict,
    });

    return res.status(200).json({ verdict, error: errorMessage });

  } catch (err) {
    console.error("❌ Submission Error:", err.message);
    return res.status(500).json({ verdict: "Internal Error", error: err.message });
  }
});

module.exports = router;
