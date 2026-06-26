"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "Who can apply?",
      answer: "Any college student or recent graduate looking to gain real-world experience in software development, design, or marketing can apply."
    },
    {
      question: "Is the internship remote?",
      answer: "Yes, our internships are primarily remote to accommodate students from different locations, though we also have hybrid options."
    },
    {
      question: "Will I receive a certificate?",
      answer: "Absolutely! Upon successful completion of the internship, you will receive a verifiable digital certificate."
    },
    {
      question: "Are projects provided?",
      answer: "Yes, you will be assigned to live projects with real users and clients, under the guidance of our senior mentors."
    },
    {
      question: "Is placement support available?",
      answer: "Yes. Top-performing interns receive pre-placement offers (PPOs) and dedicated support for external placements."
    }
  ];

  return (
    <section id="faq" className="pb-24">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <div className="w-24 h-1 bg-brand-primary mx-auto rounded"></div>
      </div>

      <div className="max-w-3xl mx-auto bg-brand-paper p-8 rounded-lg shadow-xl relative">
        {/* Notebook spiral for FAQ card */}
        <div className="absolute left-0 top-8 bottom-8 w-4 -ml-2 flex flex-col justify-between">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-6 h-2 bg-zinc-300 rounded-full border border-zinc-400"></div>
          ))}
        </div>

        <div className="pl-6">
          <Accordion className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b-zinc-300">
                <AccordionTrigger className="font-heading text-lg font-bold text-brand-black hover:text-brand-primary transition-colors hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-zinc-700 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
