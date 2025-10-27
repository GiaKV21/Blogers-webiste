// faq

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const content = question.nextElementSibling;
        const faqItem = question.parentElement;
        const isOpen = faqItem.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('open');
            item.querySelector('.faq-content').style.display = 'none';
        });
        
        if (!isOpen) {
            faqItem.classList.add('open');
            content.style.display = 'block';
        }
    });
});