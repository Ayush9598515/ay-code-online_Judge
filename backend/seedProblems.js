require("dotenv").config(); // 🟢 Load environment variables
const mongoose = require("mongoose");
const Problem = require("./models/Problem"); // Adjust path if needed

async function seedProblems() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to MongoDB");

    // 🧹 Optional: Clear existing problems
    await Problem.deleteMany({});
    console.log("🗑️ Old problems deleted");

    const helloWorldStarter = {
      cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}`,
      c: `#include <stdio.h>

int main() {
    printf("Hello World");
    return 0;
}`,
      java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
      python: `print("Hello World")`
    };

    const problems = [
      {
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        difficulty: "Easy",
        examples: [
          {
            input: "nums = [2,7,11,15], target = 9",
            output: "[0,1]"
          }
        ],
        constraints: [
          "2 <= nums.length <= 10^4",
          "-10^9 <= nums[i] <= 10^9",
          "-10^9 <= target <= 10^9",
          "Only one valid answer exists"
        ],
        starterCode: helloWorldStarter,
        testCases: [
          {
            input: "4\n2 7 11 15\n9",
            expectedOutput: "[0,1]"
          },
          {
            input: "3\n3 2 4\n6",
            expectedOutput: "[1,2]"
          }
        ]
      },
      {
        title: "Reverse Linked List",
        description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
        difficulty: "Medium",
        examples: [
          {
            input: "head = [1,2,3,4,5]",
            output: "[5,4,3,2,1]"
          }
        ],
        constraints: [
          "The number of nodes in the list is the range [0, 5000]",
          "-5000 <= Node.val <= 5000"
        ],
        starterCode: helloWorldStarter,
        testCases: [
          {
            input: "5\n1 2 3 4 5",
            expectedOutput: "[5,4,3,2,1]"
          },
          {
            input: "3\n1 2 3",
            expectedOutput: "[3,2,1]"
          }
        ]
      },
      {
        title: "Longest Substring Without Repeating Characters",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        difficulty: "Hard",
        examples: [
          {
            input: "s = 'abcabcbb'",
            output: "3"
          }
        ],
        constraints: [
          "0 <= s.length <= 5 * 10^4",
          "s consists of English letters, digits, symbols and spaces."
        ],
        starterCode: helloWorldStarter,
        testCases: [
          {
            input: "abcabcbb",
            expectedOutput: "3"
          },
          {
            input: "bbbbb",
            expectedOutput: "1"
          },
          {
            input: "pwwkew",
            expectedOutput: "3"
          }
        ]
      }
    ];

    await Problem.insertMany(problems);
    console.log("✅ Problems seeded successfully");
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedProblems();
