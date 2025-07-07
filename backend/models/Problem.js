const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true
  },
  expectedOutput: {
    type: String,
    required: true
  }
});

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  examples: {
    type: [
      {
        input: String,
        output: String
      }
    ],
    default: []
  },
  constraints: {
    type: [String],
    default: []
  },
  starterCode: {
    type: Map,
    of: String,
    default: {}
  },
  defaultInput: {
    type: String,
    default: ""
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true   // ✅ No default, force required
  },
  testCases: {
    type: [testCaseSchema],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model("Problem", problemSchema);
