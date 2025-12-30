import axios from "axios";

const API_KEY = process.env.OPENROUTER_API_KEY;

export function prompt(chapterText) {
  return `
SYSTEM ROLE:
You are an ontology construction engine trained to extract educational chapter structures.
You must think like a curriculum designer, not a summarizer.

PRIMARY OBJECTIVE:
Convert the chapter text into a strictly valid JSON-based hierarchical topic tree that reflects how humans logically organize textbook chapters.

====================
CRITICAL OUTPUT CONSTRAINTS (ABSOLUTE)
====================
- Output MUST be a raw JSON object, not a string.
- Output MUST contain nothing except the JSON object.
- DO NOT include:
  - Explanations
  - Markdown
  - Code fences
  - Comments
  - Introductory or concluding text

====================
SCHEMA (NON-NEGOTIABLE)
====================
- Fixed depth: EXACTLY 4 levels
  1. Chapter
  2. Main-Topic
  3. Topic
  4. Sub-Topic

- Every node MUST contain:
  - "title" (string)
  - "sectionLevel" (string)

- Allowed "sectionLevel" values ONLY:
  - "Chapter"
  - "Main-Topic"
  - "Topic"
  - "Sub-Topic"

- Only "Chapter", "Main-Topic", and "Topic" may include a "children" array.
- "Sub-Topic" MUST NEVER include "children".
- NO additional fields are allowed.

====================
HIERARCHY INTELLIGENCE RULES (CRITICAL)
====================
- The Chapter MUST have 1–3 Main-Topics only.
- Main-Topics represent the **largest conceptual pillars** of the chapter.
  - If more than 3 candidates exist, MERGE them into broader themes.
  - Examples, case studies, groups, or regions must NEVER be Main-Topics.

- Each Main-Topic MUST contain 2–5 Topics.
- Each Topic MUST contain AT LEAST 2 Sub-Topics.
  - If a Topic cannot naturally produce multiple Sub-Topics, it is TOO NARROW and must be broadened or merged.

- Sub-Topics must:
  - Represent different dimensions (types, processes, roles, impacts, variations).
  - Be parallel in abstraction level.
  - Avoid repetition or rewording.

====================
CONTENT RULES (STRICT)
====================
- Derive ALL titles directly from the chapter text.
- DO NOT invent concepts not present in the text.
- DO NOT over-fragment content.
- Prefer fewer, broader Topics with richer Sub-Topics.
- Merge minor facts, dates, laws, groups, or examples into Sub-Topics.

- Explicitly IGNORE:
  - Activities
  - Exercises
  - Questions
  - Figures
  - Source citations

====================
SELF-REPAIR DIRECTIVE
====================
Before finalizing the output:
- If ANY Topic has fewer than 2 Sub-Topics, revise it.
- If Main-Topics exceed 3, merge them logically.
- If hierarchy feels unbalanced, fix it internally.

====================
REFERENCE STRUCTURE (FORMAT ONLY — DO NOT COPY)
====================
{
  "title": "Sample Chapter",
  "sectionLevel": "Chapter",
  "children": [
    {
      "title": "Sample Main Topic",
      "sectionLevel": "Main-Topic",
      "children": [
        {
          "title": "Sample Topic",
          "sectionLevel": "Topic",
          "children": [
            {
              "title": "Sub Topic One",
              "sectionLevel": "Sub-Topic"
            },
            {
              "title": "Sub Topic Two",
              "sectionLevel": "Sub-Topic"
            }
          ]
        }
      ]
    }
  ]
}

====================
FINAL VALIDATION (MANDATORY)
====================
Internally verify:
- Valid JSON syntax
- All keys quoted
- No trailing commas
- No text outside the JSON object

If ANY rule is violated, correct it internally and output ONLY the final JSON.

====================
CHAPTER TEXT
====================
${chapterText}
`;
}

export const generateTopics = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.json({
        success: false,
        message: "Materials and/or prompt is required!",
      });
    }

    const { data } = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [{ role: "user", content: `${prompt(text)}` }],
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Topic Generator",
        },
      }
    );

    const raw = data.choices[0].message.content.trim();
    const cleaned = raw
      .replace(/^```(js|json)?/i, "")
      .replace(/```$/, "")
      .trim();
    let parsedContent;
    try {
      parsedContent = JSON.parse(cleaned);
    } catch (error) {
      return res.json({
        success: false,
        message: `Failed to parse content: ${error}`,
      });
    }

    return res.json({ success: true, content: parsedContent });
  } catch (error) {
    res.json({
      success: false,
      message: `Failed to generate and/or save Topics: ${error.message}`,
    });
  }
};
