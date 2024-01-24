import React, { useState } from 'react';
import '../CSS/AboutFaq.css';

const AboutFaq = () => {
    const [expandedItem, setExpandedItem] = useState(null);

    const toggleAccordion = (index) => {
        setExpandedItem((prevExpandedItem) =>
            prevExpandedItem === index ? null : index
        );
    };

    return (
        <div className="about-faq">
            <div className="container">
                <h2 className="h2-title">Frequently Asked Questions</h2>
                <div className='background-accordion'>
                    <div className="accordion">
                        {faqData.map((faq, index) => (
                            <div className="accordion-item" key={index}>
                                <button
                                    id={`accordion-button-${index + 1}`}
                                    aria-expanded={expandedItem === index ? 'true' : 'false'}
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span className="accordion-title">{faq.question}</span>
                                    <span className="icon" aria-hidden="true"></span>
                                </button>
                                <div
                                    className="accordion-content"
                                    style={{
                                        display: expandedItem === index ? 'block' : 'none',
                                    }}
                                >
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

const faqData = [
    {
        question: 'Can I customize my cheese and charcuterie board?',
        answer:
            'Absolutely! Our website offers customization options, allowing you to change any cheese and charcuterie. Please note that the price may change accordingly.',
    },
    {
        question: 'How should I store the leftovers from my board?',
        answer:
            'To maintain freshness, wrap leftover cheeses tightly in plastic wrap and store them in the refrigerator. Charcuterie items can be stored similarly.'
    },

    {
        question: 'How far in advance should I place my order?',
        answer:
            'To ensure availability, we recommend placing your order at least 3-4 days in advance. However, for specific events or during peak seasons, it is advisable to order even earlier.',
    },
    {
        question: 'What is the best way to serve cheeses?',
        answer:
            'Cheeses are best served at room temperature. Take them out of the refrigerator about 30 minutes before serving to allow flavors to develop.',
    },
    {
        question: 'Do you ship internationally?',
        answer:
            'Currently, we only ship within Lebanon. We do not offer international shipping. We apologize for any inconvenience and appreciate your understanding.',
    },
];

export default AboutFaq;