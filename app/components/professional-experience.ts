// professional-experience.ts
// List of professional experiences for the Professional Experience section

export interface ProfessionalExperience {
  date: string;
  company: string;
  image: string; // Path to company icon
  description: string;
}

export const experiences: ProfessionalExperience[] = [
  {
    date: "2023–Present",
    company: "Workiva",
    image: "/company-icons/wk-home-air-en.png.webp",
    description: "Full Stack Developer working on encryption and cloud infrastructure.",
  },
  {
    date: "2022",
    company: "Amazon",
    image: "/company-icons/amazon_icon.png",
    description: "Full Stack Software Development Engineer Intern on the Contact Lens team, developing features for an ML-powered contact categorization system.",
  },
  {
    date: "2021",
    company: "Savvyy",
    image: "/company-icons/savvyy_logo.jpg",
    description: "Software Developer in Test Intern. Developed selenium-based testing tools for automated underwriting",
  },
  {
    date: "2021-2022",
    company: "University of Toronto",
    image: "/company-icons/uoft.png",
    description: "Teaching Assistant for CSC207: Software Design.",
  },
];
