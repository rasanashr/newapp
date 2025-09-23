const AVALAI_API_KEY = 'aa-mqBjZxLsuox6mNY2R1PoZHovIgNhfcQvCXFz02Ehem4i0sQz';
const API_BASE_URL = 'https://api.avalai.ir/v1';

async function avalaiChat(messages) {
    try {
        const response = await fetch(`${API_BASE_URL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AVALAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gemini-2.5-flash-lite',
                messages
            })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'API request failed');
        }
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error in Avalai API call:', error);
        throw error;
    }
}

export async function verifyNews(title, content) {
    try {
        const prompt = `لطفاً ابتدا این محتوا را در چند خط کوتاه خلاصه کن در در بالای آن خلاصه مطلب: را درج کن.

سپس با بررسی عنوان و متن این محتوا در وب، در یک نتیجه کوتاه بیان کن که این مطلب معتبر است یا خیر؟ اگر در جستجوها به مورد مشابهی برخوردی از آنها هم نام ببر.

و در انتها نقش یک خبرنگار تخقیقی را به خود بگیر و با تحلیل این مطلب نظر خودت را در رابطه با این مطلب بیان کن. در بالای این بخش تحلیل این مطلب: را درج کن. ( بسیار کوتاه و قبل فهم بیان کن)

عنوان: ${title}

متن: ${content}`;

        const messages = [{ role: "user", content: prompt }];
        const result = await avalaiChat(messages);
        return result;
    } catch (error) {
        console.error('Error verifying news:', error);
        return 'متأسفانه در بررسی خبر خطایی رخ داد. لطفاً دوباره تلاش کنید.';
    }
}

export async function analyzeNews(title, content) {
    try {
        const prompt = `لطفاً با مطالعه و بررسی دقیق عنوان و متن این محتوا یک تحلیل کاملاً حرفه ای و بی طرفانه ارائه بده. اگر در رابطه با موضوع رفرنسی وجود دارد، به آنها هم اشاره کن . تحلیل خود را  در نهایت به صورت کوتاه و مختصر و در  2 تا 3 پاراگراف ارائه بده .


عنوان: ${title}

متن: ${content}`;

        const messages = [{ role: "user", content: prompt }];
        const result = await avalaiChat(messages);
        return result;
    } catch (error) {
        console.error('Error analyzing news:', error);
        return 'متأسفانه در تحلیل خبر خطایی رخ داد. لطفاً دوباره تلاش کنید.';
    }
}

let questionCount = 0;
const MAX_QUESTIONS = 2;

export async function askUserQuestion(question, title, content) {
    try {
        if (questionCount >= MAX_QUESTIONS) {
            return 'شما مجاز به پرسیدن بیش از ۲ سوال نیستید.';
        }

        const prompt = `در اینجا کاربر سوالاتی را می پرسد که با توجه به عنوان، متن و سوال کاربر باید به او پاسخ بدهی.
لطفاً پس از بررسی سوال کاربر و تطبیق آن با محتوا، پاسخ او را به صورت کوتاه اما قانع کننده بده.
پاسخی که می دی لزوماً نباید از داخل متن باشه و می تونی به کاربر با استفاده از دانش خودت پاسخ بدی. ممکنه کاربر در مورد موضوع مشابهی سوالی داشته باشه، بنابراین مجاز هستی در  مورد سوالش بررسی و تحلیل کنی و بهش پاسخ بدی.
در واقع فیلد سوالات برای این قرار داده شده تا کاربر اگر ابهامی خارج از دایره عنوان و متن این محتوا داره، بتونه پاسخ مناسبی بگیره.

عنوان: ${title}

متن: ${content}

سوال کاربر: ${question}`;

        const messages = [{ role: "user", content: prompt }];
        const result = await avalaiChat(messages);
        questionCount++;
        return result;
    } catch (error) {
        console.error('Error answering question:', error);
        return 'متأسفانه در پاسخ به سوال خطایی رخ داد. لطفاً دوباره تلاش کنید.';
    }
}

export function getQuestionCount() {
    return questionCount;
}

export function resetQuestionCount() {
    questionCount = 0;
}

export function canAskMoreQuestions() {
    return questionCount < MAX_QUESTIONS;
}

