import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        const { title, content } = await request.json();
        console.log('🚀 Initiating OpenAI request for verification...');
        console.log(`API Key starts with: ${env.OPENAI_API_KEY.substring(0, 5)}...`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{
                    role: "system",
                    content: "You are a professional news validator. Analyze the news content and provide a verification response in Persian language. Focus on factual accuracy and potential biases."
                }, {
                    role: "user",
                    content: `عنوان خبر: ${title}\n\nمتن خبر: ${content}\n\nلطفا اصالت و صحت این خبر را بررسی کنید.`
                }]
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.error(`OpenAI API responded with status: ${response.status}`);
            const errorData = await response.text();
            console.error('Error response:', errorData);
            throw new Error(`OpenAI API responded with status: ${response.status}`);
        }

        console.log('✅ Successfully received response from OpenAI');
        const data = await response.json();
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error('Unexpected response structure:', data);
            throw new Error('Unexpected response structure from OpenAI');
        }

        console.log('✅ Successfully parsed response');
        return json({ result: data.choices[0].message.content });
    } catch (error) {
        console.error('❌ Error in verification process:', error);
        if (error.name === 'AbortError') {
            return json({ 
                error: 'درخواست به دلیل تایم‌اوت لغو شد. لطفاً دوباره تلاش کنید.' 
            }, { status: 408 });
        }
        return json({ 
            error: 'متأسفانه در بررسی خبر خطایی رخ داد. لطفاً دوباره تلاش کنید.' 
        }, { status: 500 });
    }
}
