import type {
  ResumeData,
  Education,
  Experience,
  Skill,
  Language,
  Certificate,
  CustomSection,
} from "@/types/resume";

export const sampleData: ResumeData = {
  // Personal Information
  first_name: "Ruslan",
  last_name: "Babayev",
  professional_title: "Senior Care Assistant",
  email: "dom.webster@example.co.uk",
  phone: "07912 345 678",
  country: "United Kingdom",
  city: "Leeds",
  street_address: "46 Roman Rd",
  postcode: "LS2 3ZR",
  website: "www.domwebster.co.uk",
  linkedin: "linkedin.com/in/domwebster",
  driving_license: "B, B1, C, C1",
  nationality: "British",
  photo_url:
    "https://assets.myperfectcv.co.uk/blobimages/muk/builder/images/sampleSkinImageSquare.png",
  summary:
    "Motivated Care Assistant with 10 years of experience in the Care industry. Offering expertise in person-centred care, implementation and monitoring of individual care plans and management of resident assessments and files. Energetic self-starter and team builder able to navigate high-stress situations. Well-versed in monitoring clients with developmental disabilities and adhering to patient care plans.",

  // Work Experience
  experiences: [
    {
      id: 1,
      job_title: "Senior Care Assistant",
      company: "Private Care Home",
      employment_type: "full-time",
      location: "Edinburgh",
      start_date: "2014-07",
      end_date: "",
      currently_working: true,
      description:
        "Met with patients and families to discuss care and plan of action for future.\nImplemented new team onboarding programme, reducing training time from four weeks to two.\nAdministered all necessary medications as directed by care plan.",
      sort_order: 0,
    },
    {
      id: 2,
      job_title: "Care Assistant",
      company: "Ideal Care Homes",
      employment_type: "full-time",
      location: "Edinburgh",
      start_date: "2010-09",
      end_date: "2014-06",
      currently_working: false,
      description:
        "Charted daily information such as mood changes, mobility activity, eating percentages and daily inputs and outputs.\nDeveloped strong and trusting rapport with each client to facilitate best care possible.\nWorked to improve patient outlook and daily living through compassionate care.",
      sort_order: 1,
    },
    {
      id: 3,
      job_title: "Care Assistant",
      company: "Four Seasons Health Care",
      employment_type: "full-time",
      location: "Edinburgh",
      start_date: "2008-11",
      end_date: "2010-08",
      currently_working: false,
      description:
        "Maintained confidentiality and compliance standards at all times.\nMaintained clean and well-organised environment to promote client happiness and safety.\nAssisted disabled individuals to foster independence while still closely monitoring safety.\nSupervised frequent activities such as medication and personal hygiene to provide safe living environment for patients.",
      sort_order: 2,
    },
  ],

  // Education
  educations: [
    {
      id: 1,
      institution: "Edinburgh College",
      degree: "NVQ Level 3",
      field_of_study: "Health And Social Care",
      start_date: "2011-09",
      end_date: "2013-06",
      currently_studying: false,
      description: "",
      sort_order: 0,
    },
    {
      id: 2,
      institution: "Edinburgh College",
      degree: "NVQ Level 2",
      field_of_study: "Health And Social Care",
      start_date: "2006-09",
      end_date: "2008-06",
      currently_studying: false,
      description: "",
      sort_order: 1,
    },
  ],

  // Skills
  skills: [
    { id: 1, name: "Strong verbal communication", category: "soft", sort_order: 0 },
    { id: 2, name: "Attention to detail", category: "soft", sort_order: 1 },
    { id: 3, name: "Community activities", category: "soft", sort_order: 2 },
    { id: 4, name: "Medication administration", category: "technical", sort_order: 3 },
    { id: 5, name: "Care plan management", category: "technical", sort_order: 4 },
    { id: 6, name: "Risk management processes and analysis", category: "technical", sort_order: 5 },
    { id: 7, name: "Client safety and First Aid", category: "technical", sort_order: 6 },
    { id: 8, name: "Compassionate client care", category: "soft", sort_order: 7 },
    { id: 9, name: "Behaviour redirection", category: "technical", sort_order: 8 },
  ],

  // Languages
  languages: [
    { id: 1, name: "English", proficiency: "native", level: 5, sort_order: 0 },
    { id: 2, name: "French", proficiency: "intermediate", level: 3, sort_order: 1 },
    { id: 3, name: "Spanish", proficiency: "beginner", level: 2, sort_order: 2 },
  ],

  // Certificates
  certificates: [
    {
      id: 1,
      name: "First Aid Certificate",
      organization: "British Red Cross",
      issue_date: "2022-03",
      expiration_date: undefined,
      no_expiry: false,
      credential_link: "",
      description: "Emergency first aid at work qualification",
      sort_order: 0,
    },
    {
      id: 2,
      name: "Safeguarding Adults",
      organization: "Care Quality Commission",
      issue_date: "2021-06",
      expiration_date: "",
      no_expiry: true,
      credential_link: "",
      description: "",
      sort_order: 1,
    },
  ],

  // Custom Sections
  custom_sections: [
    {
      id: 1,
      title: "Volunteer Work",
      description: "Volunteered at local community centre providing support for elderly residents.",
      start_date: "2015-01",
      end_date: "2018-12",
      sort_order: 0,
    },
  ],
};
