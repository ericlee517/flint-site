/*
* the main javascript
* lastest update: 2025/04/24
* author: ericlee517
* description: basic for the tags to comfirm with tailwindcss.
*/


const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, ul, li, table');
const tailwindClasses = {
    h1: 'text-4xl font-bold mt-10 mb-4',
    h2: 'text-3xl font-semibold mt-10 mb-4',
    h3: 'text-2xl font-medium mt-10 mb-4',
    h4: 'text-xl font-medium mt-10 mb-4',
    h5: 'text-lg font-normal mt-10 mb-4',
    h6: 'text-base font-normal mt-10 mb-4',
    p: 'text-lg font-normal',
    ul: 'list-disc ml-20 mb-6 font-normal',
    table: 'table text-lg mb-6'
};

headings.forEach(heading => {
    const tagName = heading.tagName.toLowerCase();
    if (!heading.classList.length && tailwindClasses[tagName]) {
        heading.classList.add(...tailwindClasses[tagName].split(' '));
    }
});
