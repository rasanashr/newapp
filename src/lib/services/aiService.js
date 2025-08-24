export async function verifyNews(title, content) {
    try {
        const response = await fetch('/api/ai/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data.result;
    } catch (error) {
        console.error('Error verifying news:', error);
        return 'متأسفانه در بررسی خبر خطایی رخ داد. لطفاً دوباره تلاش کنید.';
    }
}

export async function analyzeNews(title, content) {
    try {
        const response = await fetch('/api/ai/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data.result;
    } catch (error) {
        console.error('Error analyzing news:', error);
        return 'متأسفانه در تحلیل خبر خطایی رخ داد. لطفاً دوباره تلاش کنید.';
    }
}
