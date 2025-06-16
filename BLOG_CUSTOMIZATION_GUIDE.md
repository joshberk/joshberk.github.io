# Blog Section Customization Guide

This guide will help you replace the placeholder blog posts with your actual Medium articles.

## 🔧 Quick Setup Steps

### 1. Update Medium Profile Link
In `index.html`, find this line (around line 536):
```html
<a href="https://medium.com/@yourusername" target="_blank" rel="noopener noreferrer">
```
Replace `@yourusername` with your actual Medium username.

### 2. Replace Sample Blog Posts
Each blog post is an `<article>` element. Here's the structure to modify:

```html
<article class="blog-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300" data-category="CATEGORY">
    <div class="relative">
        <img src="IMAGE_URL" alt="ALT_TEXT" class="w-full h-48 object-cover">
        <div class="absolute top-4 left-4">
            <span class="bg-COLOR text-white px-3 py-1 rounded-full text-sm font-medium">CATEGORY_LABEL</span>
        </div>
    </div>
    <div class="p-6">
        <div class="flex items-center mb-3">
            <time class="text-sm text-gray-500 dark:text-gray-400">PUBLISH_DATE</time>
            <span class="mx-2 text-gray-400">•</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">READ_TIME</span>
        </div>
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">ARTICLE_TITLE</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            ARTICLE_EXCERPT
        </p>
        <div class="flex items-center justify-between">
            <a href="MEDIUM_ARTICLE_URL" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200">
                Read on Medium
                <i data-lucide="external-link" class="w-4 h-4 ml-1"></i>
            </a>
            <div class="flex space-x-2">
                <span class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">TAG1</span>
                <span class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">TAG2</span>
            </div>
        </div>
    </div>
</article>
```

## 📝 Fields to Replace

### Required Fields:
- **CATEGORY**: `pentesting`, `research`, `tutorials`, or add your own
- **IMAGE_URL**: Link to article's featured image or use placeholder
- **ALT_TEXT**: Descriptive alt text for the image
- **COLOR**: `indigo-600`, `green-600`, `red-600`, etc.
- **CATEGORY_LABEL**: Display name for the category
- **PUBLISH_DATE**: When the article was published
- **READ_TIME**: Estimated reading time (e.g., "5 min read")
- **ARTICLE_TITLE**: Full title of your Medium article
- **ARTICLE_EXCERPT**: Brief description/preview (2-3 sentences)
- **MEDIUM_ARTICLE_URL**: Direct link to your Medium article
- **TAG1, TAG2**: Relevant tags/technologies mentioned

## 🎨 Category Colors & Types

### Predefined Categories:
```css
pentesting: bg-indigo-600 (Purple/Blue)
research: bg-green-600 (Green)
tutorials: bg-red-600 (Red)
```

### Adding New Categories:
1. Add new filter button in the filter section
2. Use appropriate Tailwind color class
3. Add matching `data-category` to articles

## 🖼️ Image Recommendations

### Option 1: Use Medium Article Images
- Copy the image URL from your Medium article
- Right-click on article image → "Copy image address"

### Option 2: Custom Placeholder Images
Current placeholders use https://placehold.co/ service:
```
https://placehold.co/600x400/COLOR/ffffff?text=YOUR+TEXT
```

### Option 3: Your Own Images
- Upload images to your repository
- Reference them as: `./your-image.jpg`

## 📋 Example Real Article

Here's how to convert a real Medium article:

**Medium Article**: "Advanced SQL Injection Techniques in 2024"
**URL**: https://medium.com/@joshberk/advanced-sql-injection-techniques-123abc

```html
<article class="blog-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300" data-category="pentesting">
    <div class="relative">
        <img src="https://miro.medium.com/v2/resize:fit:1400/1*example123.jpeg" alt="SQL Injection demonstration in web application testing" class="w-full h-48 object-cover">
        <div class="absolute top-4 left-4">
            <span class="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">Pentesting</span>
        </div>
    </div>
    <div class="p-6">
        <div class="flex items-center mb-3">
            <time class="text-sm text-gray-500 dark:text-gray-400">December 15, 2024</time>
            <span class="mx-2 text-gray-400">•</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">8 min read</span>
        </div>
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Advanced SQL Injection Techniques in 2024</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            Explore the latest SQL injection methodologies that bypass modern web application firewalls. This comprehensive guide covers blind SQL injection, time-based attacks, and automated detection methods using industry-standard tools.
        </p>
        <div class="flex items-center justify-between">
            <a href="https://medium.com/@joshberk/advanced-sql-injection-techniques-123abc" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200">
                Read on Medium
                <i data-lucide="external-link" class="w-4 h-4 ml-1"></i>
            </a>
            <div class="flex space-x-2">
                <span class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">SQLmap</span>
                <span class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">WebSec</span>
            </div>
        </div>
    </div>
</article>
```

## 🔄 Adding More Articles

To add more articles:
1. Copy the entire `<article>` block
2. Paste it before the closing `</div>` of `#blog-container`
3. Update all the fields with your article information
4. Ensure the `data-category` matches one of your filter buttons

## 🎯 SEO Tips

### Optimize for Search:
- Use descriptive alt text for images
- Include relevant keywords in excerpts
- Use proper publish dates
- Link to actual Medium articles for backlinks

### Performance:
- Optimize images (compress before uploading)
- Keep excerpts concise but informative
- Limit to 6-9 articles for fast loading

## 🚀 Advanced Features

### Auto-Import from Medium (Future Enhancement)
You could later implement:
- Medium RSS feed integration
- Automatic article fetching via API
- Dynamic content updates

### Analytics Integration
Track which articles get the most clicks:
```javascript
// Add to existing JavaScript
document.querySelectorAll('a[href*="medium.com"]').forEach(link => {
    link.addEventListener('click', () => {
        // Track Medium link clicks
        console.log('Medium article clicked:', link.href);
    });
});
```

---

**Ready to customize?** Start by replacing the first article with one of your actual Medium posts, then work through the rest. The structure is designed to make updates quick and easy!