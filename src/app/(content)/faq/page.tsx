import Footer from "@/components/main_components/footer";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FrequentlyAskedQuestions() {
  return (
    <div className="py-9">
      <div className="w-3/4 mx-auto border-2 p-5 my-8">
        <div>
          <h1 className="text-2xl font-semibold">Frequently asked questions</h1>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h1 className="text-left">What is Fayida Academy?</h1>
            </AccordionTrigger>
            <AccordionContent>
              Fayida Academy is an online platform that offers mock exams to
              help students prepare and practice for their upcoming
              examinations. The platform provides access to a library of
              practice tests, an automated scoring system, and performance
              analytics to help students track their progress.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <h1 className="text-left">
                Do I have to pay to use Fayida Academy?
              </h1>
            </AccordionTrigger>
            <AccordionContent>
              The pricing for Fayida Academy&apos;s packages is outlined on the
              packages website. Some of the platform&apos;s offerings may be
              free, while others may require a fee.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              <h1 className="text-left">
                Where do the questions on Fayida Academy come from?
              </h1>
            </AccordionTrigger>
            <AccordionContent>
              The questions on Fayida Academy&apos;s platform are collected from
              two sources: Previous official exams from accredited examination
              bodies. Custom-made mock exam questions created by Fayida
              Academy&apos;s team of subject matter experts. This allows Fayida
              Academy to provide students with a comprehensive and relevant set
              of practice materials to prepare for their upcoming assessments.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              <h1 className="text-left">
                {" "}
                What are the benefits of using Fayida Academy?{" "}
              </h1>
            </AccordionTrigger>
            <AccordionContent>
              Using Fayida Academy is beneficial for students in the following
              ways: It provides a simulation experience for entrance exams,
              allowing students to practice under exam-like conditions. It helps
              students identify their strengths and weaknesses, enabling them to
              focus their study efforts on areas that need improvement. The
              automated scoring and performance analytics allow students to
              track their progress and monitor their preparation for the
              upcoming exams.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
