// src/pages/Support.jsx

import React from "react";
import { Mail, HelpCircle, BookOpen } from "lucide-react";
import Button from "../components/Button";

const Support = () => {
  const cards = [
    {
      icon: Mail,
      title: "Contact Support",
      description: "Email us with any issue or question.",
      link: "mailto:support@yedawi.com",
      buttonText: "Email Us",
      color: "text-blue-600",
    },
    {
      icon: HelpCircle,
      title: "FAQs",
      description: "Find answers to common questions.",
      link: "/faq",
      buttonText: "View FAQ",
      color: "text-green-600",
    },
    {
      icon: BookOpen,
      title: "User Guide",
      description: "Learn how to use the platform step by step.",
      link: "/help",
      buttonText: "Open Guide",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="flex  justify-end min-h-full">
      <div className="max-w-5xl w-full p-6">
        <h2 className="text-3xl font-semibold mb-6 text-center text-emerald-800">
          Need Help?
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map(({ icon: Icon, title, description, link, buttonText, color }, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border shadow-md p-6 flex flex-col items-center text-center"
            >
              <Icon className={`w-10 h-10 mb-4 ${color}`} />
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-sm text-gray-500 mb-4">{description}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(link, "_blank")}
                className="rounded-md"
              >
                {buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
