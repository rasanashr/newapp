import { p as private_env } from "../../../../../chunks/shared-server.js";
import { j as json } from "../../../../../chunks/index.js";
async function POST({ request }) {
  try {
    const { title, content } = await request.json();
    console.log("🚀 Initiating OpenAI request for analysis...");
    console.log(`API Key starts with: ${private_env.OPENAI_API_KEY.substring(0, 5)}...`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3e4);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${private_env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{
          role: "system",
          content: "You are a professional news analyst. Provide a detailed analysis of the news content in Persian language. Focus on implications, context, and potential impacts."
        }, {
          role: "user",
          content: `عنوان خبر: ${title}

متن خبر: ${content}

لطفا این خبر را تحلیل کنید.`
        }]
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!response.ok) {
      console.error(`OpenAI API responded with status: ${response.status}`);
      const errorData = await response.text();
      console.error("Error response:", errorData);
      throw new Error(`OpenAI API responded with status: ${response.status}`);
    }
    console.log("✅ Successfully received response from OpenAI");
    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Unexpected response structure:", data);
      throw new Error("Unexpected response structure from OpenAI");
    }
    console.log("✅ Successfully parsed response");
    return json({ result: data.choices[0].message.content });
  } catch (error) {
    console.error("❌ Error in analysis process:", error);
    if (error.name === "AbortError") {
      return json({
        error: "درخواست به دلیل تایم‌اوت لغو شد. لطفاً دوباره تلاش کنید."
      }, { status: 408 });
    }
    return json({
      error: "متأسفانه در تحلیل خبر خطایی رخ داد. لطفاً دوباره تلاش کنید."
    }, { status: 500 });
  }
}
export {
  POST
};
