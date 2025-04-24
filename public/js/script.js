// Select all h1 to h6 elements
const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, ul, li, table');

// Define Tailwind CSS classes for each heading level
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

// Loop through each heading and add the corresponding Tailwind class if no class exists
headings.forEach(heading => {
    const tagName = heading.tagName.toLowerCase();
    if (!heading.classList.length && tailwindClasses[tagName]) {
        heading.classList.add(...tailwindClasses[tagName].split(' '));
    }
});
