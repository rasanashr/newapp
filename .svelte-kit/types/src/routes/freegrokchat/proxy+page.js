// @ts-nocheck
/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ fetch }) {
    let lasttextPosts = [];
    let backlinks = [];

    try {
        // آدرس کامل API وردپرس
        const response = await fetch('https://rooidadha.ir/wp-json/wp/v2/posts?per_page=5&_embed=true');
        if (response.ok) {
            lasttextPosts = await response.json();
        }
    } catch (error) {
        console.error('Error fetching latest posts:', error);
    }

    try {
        const backlinksResponse = await fetch('https://rooidadha.ir/wp-json/backlink/v1/links');
        if (backlinksResponse.ok) {
            backlinks = await backlinksResponse.json();
        }
    } catch (error) {
        console.error('Error fetching popular posts:', error);
    }

    // حتی اگر API ها خطا بدهند، صفحه باز هم کار خواهد کرد
    return {
        lasttextPosts,
        backlinks
    };
}