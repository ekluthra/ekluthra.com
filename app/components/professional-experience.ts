// professional-experience.ts
// List of professional experiences for the Professional Experience section

export interface ProfessionalExperience {
  date: string;
  company: string;
  image: string; // Path to company icon
  description: string;
  details: string[];
}

export const experiences: ProfessionalExperience[] = [
  {
    date: "2023–Present",
    company: "Workiva",
    image: "/company-icons/wk-home-air-en.png.webp",
    description: "Full Stack Developer working on encryption and cloud infrastructure.",
    details: [
      "Designed an SSE-S3 re-encryption lifecycle for BYOK metadata by rerouting metadata traffic off an S3 encryption proxy, directly onto AWS SSE-S3. Built Go object storage short-circuit path, Java rekey framework with SQS task retries, and rolled out migrations across all production regions.",
      "Led a migration from New Relic to Datadog for observability for a 3-service BYOK encryption platform stack, shipping parity dashboards and SLOs for each service, wiring custom RPC metrics through the Opentelemetry Collector.",
      "Designed an event-driven solution for re-enabling AWS encryption keys marked for deletion by adding a new API endpoint to the Java backend of a BYOK service."
    ],
  },
  {
    date: "2022",
    company: "Amazon",
    image: "/company-icons/amazon_icon.png",
    description: "Full Stack Software Development Engineer Intern on the Contact Lens team, developing features for an ML-powered contact categorization system.",
    details: [
      " Updated the NodeJS back-end and React Typescript front-end for a tool that automates and monitors quality assurance, to allow the user to create 1100% more entries in an ML-based contact categorization engine.",
      "Intelligently populated a table on the front-end to allow for dynamic rendering of entries using ReactJS",
      "Utilized pagination of from DynamoDB query results to support the increase in entries, and added encryption to all data sent through HTTP requests in an AWS Lambda function"
    ],
  },
  {
    date: "2021",
    company: "Savvyy",
    image: "/company-icons/savvyy_logo.jpg",
    description: "Software Developer in Test Intern. Developed selenium-based testing tools for automated underwriting",
    details: [
      "Built Selenium-based testing tools for automated underwriting flows",
      "Improved test coverage and reliability for core product features",
    ],
  },
  {
    date: "2021-2022",
    company: "University of Toronto",
    image: "/company-icons/uoft.png",
    description: "Teaching Assistant for CSC207: Software Design.",
    details: [
      "Supported students through labs, assignments, and office hours",
      "Reinforced object-oriented design and clean architecture concepts",
    ],
  },
];
