import { generateText } from "ai"
import { openrouter } from "@openrouter/ai-sdk-provider"

console.log('OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY);

export async function categorizeEntry(title: string, content: string, existingCategories: string[] = []) {
  try {
    const { text } = await generateText({
      model: openrouter.chat("deepseek/deepseek-r1"),
      system: `You are an AI assistant that categorizes journal entries. Based on the title and content provided, suggest a single, concise category name (2-4 words max) that best represents the theme or topic of the entry.

If the entry closely matches one of these existing categories, use that exact category name instead of creating a new one:
${existingCategories.length > 0 ? existingCategories.map((cat) => `- ${cat}`).join("\n") : "No existing categories"}

Examples of good category names:
- Work Ideas
- Personal Reflections  
- Travel Plans
- Health & Fitness
- Creative Projects
- Learning Notes
- Relationship Thoughts
- Financial Planning

Respond with ONLY the category name, nothing else.`,
      prompt: `Title: ${title}\n\nContent: ${content}`,
    })

    return text.trim()
  } catch (error) {
    console.error("Error categorizing entry:", error)
    return "Uncategorized"
  }
}
