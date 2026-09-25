export const site = {
  name: "Bloom Early Learning Center",
  shortName: "Bloom",
  email: "hello@bloomearlyed.com",
  location: "Lenexa, KS",
  hours: "7am–5pm Mon–Fri",
  ages: "6 weeks–6 years",
  opening: "January 2027",
  domain: "www.bloomearlyed.com",
  metaDescription:
    "Bloom Early Learning Center in Lenexa, KS — a warm, play-based daycare for ages 6 weeks–6 years. Opening January 2027. Reserve enrollment today.",
};

export const programs = [
  {
    id: "seeds",
    name: "Seeds",
    age: "Infants 6 weeks – 1 year",
    accent: "red" as const,
    about:
      "In our Seeds classroom, infants learn about the world through loving relationships, observation, movement, and exploration. Our teachers intentionally talk, sing, read, and play with each child throughout the day—even during everyday moments like feedings and diaper changes—to encourage language, connection, and development. Each infant’s individual routines, needs, and milestones are respected as we provide a safe and nurturing environment where they can grow at their own pace.",
    goals: [
      "Build secure, trusting relationships with their caregivers",
      "Develop early communication and language skills",
      "Strengthen gross and fine motor skills through movement and exploration",
      "Grow in curiosity, confidence, and independence as they explore their environment",
    ],
  },
  {
    id: "sprouts",
    name: "Sprouts",
    age: "6 months – 2.5 years",
    accent: "orange" as const,
    about:
      "The Sprouts Room will focus on social and emotional development, self-help skills, language development, and the earliest routines of group learning. Students will begin learning how to cooperate with others, follow classroom rhythms, and build confidence. Through planned activities and hands-on experiences, they also begin exploring early concepts like colors, shapes, days of the week, and other pre-academic foundations.",
    goals: [
      "Social-emotional growth",
      "Self-help skills",
      "Language development",
      "Classroom confidence",
      "Introduction to pre-academic concepts",
    ],
  },
  {
    id: "sunflowers",
    name: "Sunflowers",
    age: "2.5 years – 4 years",
    accent: "green" as const,
    about:
      "As students grow, so does their independence, confidence, and sense of belonging within their classroom community. In this classroom, we focus on helping children become thoughtful friends and classmates by practicing cooperation, kindness, communication, and problem-solving. Friendships begin to deepen, and children learn how to navigate emotions, relationships, and social situations with greater confidence and awareness. Every day, students engage in circle time, learning centers, music and movement, and interactive activities designed to spark curiosity while establishing foundational pre-academic concepts.",
    goals: [
      "Independence and pride in accomplishment",
      "Cooperation and kindness",
      "Problem-solving skills",
      "Early literacy and numeracy foundations",
      "Fine and large motor development",
    ],
  },
  {
    id: "wildflowers",
    name: "Wildflowers",
    age: "4 years – 6 years",
    accent: "blue" as const,
    about:
      "In our Pre-K classroom, students build upon the skills they have developed while gaining the confidence and independence needed for kindergarten. Through purposeful play and hands-on learning, children strengthen letter recognition and sounds, early writing, number sense, math and science concepts, fine-motor skills, and classroom independence. Just as importantly, our Wildflowers continue growing socially and emotionally by building friendships, communicating their needs, solving problems, and developing a strong sense of self.",
    goals: [
      "Kindergarten readiness",
      "Letter and sound recognition",
      "Early writing mechanics",
      "Early math and science concepts",
      "Continued confidence and friendship building",
    ],
  },
] as const;

export const approach = {
  lead: "At Bloom Early Learning Center, we believe childhood is a time to play, explore, discover, and grow. Through purposeful play and meaningful experiences, we strive to grow curious minds, nurture kind hearts, and build a lifelong love of learning.\n\nBloom is more than a place for children to spend their day. We’re creating a community where every child and family feels known, loved, and supported—a place where children are encouraged to learn, play, grow, and flourish.",
  pillars: [
    {
      title: "Purposeful play",
      body: "Our classrooms will be filled with opportunities to play, create, explore, get messy, and solve problems. Children thrive when they feel safe, loved, and connected—and in that environment, they are set up to thrive naturally.",
    },
    {
      title: "Relationships first",
      body: "What makes Bloom truly special goes beyond our curriculum. It will be the relationships, the teachers who genuinely know and love the children in their classrooms, and the little moments we celebrate every day.",
    },
    {
      title: "Creative Curriculum + Handwriting Without Tears",
      body: "We use Creative Curriculum, which focuses on building relationships, play, and a supportive environment—children learn best by actively exploring in a well-designed space. We also use Handwriting Without Tears, an occupational therapy-based program designed to build fine motor skills, hand strength, and correct letter formation using multisensory methods.",
    },
    {
      title: "Transitions by age + milestones",
      body: "Classroom placement and transitions are a conversation, not just a calendar. Students move to the next room based on both age and developmental milestones. We never let the calendar override what is best for a child.",
    },
    {
      title: "Family updates via Brightwheel",
      body: "We use the Brightwheel app so families can see what their child is doing throughout the day, receive pictures, weekly updates, and upcoming events happening at the center.",
    },
  ],
};

export const tuition = {
  rows: [
    {
      program: "Infant",
      ages: "6 weeks – 1 year",
      rates: { five: 450, four: 400, three: 360, two: 280 },
    },
    {
      program: "Toddler",
      ages: "1 – 3 years",
      rates: { five: 375, four: 320, three: 255, two: 200 },
    },
    {
      program: "Preschool",
      ages: "3 years+",
      rates: { five: 350, four: 300, three: 240, two: 180 },
    },
  ],
  fees: [
    "$150 per family yearly enrollment fee",
    "$100 per child yearly supply fee",
  ],
};

export const team = [
  {
    name: "Jillian",
    role: "Owner / Director",
    photo: "/team/jillian.webp",
    bio: "Jillian studied Early Education at KU. Her passion for early childhood education is knowing that she gets to make a difference in some of the most important years of a child’s life. She loves the hugs, laughter, silly conversations, endless questions, and even the challenging days—because every day brings an opportunity to teach, nurture, encourage, and make a child feel loved and valued!",
  },
  {
    name: "Megan",
    role: "Assistant Director",
    photo: "/team/megan.webp",
    bio: "Megan studied Early Education at Johnson County Community College. Her passion for early childhood education comes from working with children and getting to experience the world through their eyes—watching them learn, explore, ask questions, and discover something for the very first time.",
  },
] as const;

export const story = {
  paragraphs: [
    "Bloom Early Learning Center was created by two passionate educators who saw an opportunity to build something different—a place where children, families, and teachers could truly feel connected. We believe the best early learning happens within a strong community, where families are partners, teachers feel valued and supported, and every child is known, loved, and encouraged to flourish.",
    "At Bloom, play is purposeful, relationships come first, and social-emotional development is just as important as ABCs and 123s. We want children to leave Bloom ready for kindergarten, but our definition of “ready” goes far beyond academics. We want them to leave us curious and confident, able to communicate their feelings, build friendships, solve problems, show kindness, ask questions, and believe in themselves.",
    "Because when teachers thrive, families feel connected, and children are given the freedom to learn through play, everyone has the opportunity to Bloom.",
  ],
};

export const calendar2027 = {
  events: [
    { date: "January", name: "Grand Opening" },
    { date: "April 10–16", name: "Week of the Young Child" },
    { date: "May 3–7", name: "Teacher Appreciation" },
    { date: "May 7", name: "Muffins with Mom" },
    { date: "May 18", name: "Donuts with Dad" },
    { date: "May 21", name: "Pre-K Graduation" },
  ],
  closures: [
    { date: "May 28–31", name: "Memorial Day" },
    { date: "July 2–5", name: "July 4th" },
    { date: "August 6", name: "Inservice" },
    { date: "September 6", name: "Labor Day" },
    { date: "November 24–26", name: "Thanksgiving" },
    { date: "December 24–31", name: "Christmas" },
  ],
};

export const faq = [
  {
    q: "What ages do you serve?",
    a: "6 weeks – 6 years",
  },
  {
    q: "What are your hours?",
    a: "Our hours of operation are 7 am – 5 pm, Monday – Friday.",
  },
  {
    q: "Do you offer part-time care?",
    a: "Yes, we offer 5-, 4-, 3-, and 2-day care options.",
  },
  {
    q: "How does your curriculum work?",
    a: "We believe some of the best learning happens through play, exploration, and meaningful experiences. Our classrooms use The Creative Curriculum alongside Handwriting Without Tears to create a well-rounded, developmentally appropriate approach to early learning. Throughout the day, children participate in circle time, learning centers, music and movement, outdoor play, and hands-on activities designed to spark curiosity and build confidence. Each experience supports the whole child, helping children strengthen social-emotional skills, language and communication, early academic foundations, creativity, and independence.",
  },
  {
    q: "How do classroom transitions work?",
    a: "Classroom placement and transitions are a conversation, not just a calendar. Students will move to the next room based on both age and developmental milestones. We never let the calendar override what is best for a child. Our lead teachers, administration, and families make these decisions together.",
  },
  {
    q: "How do you communicate with families?",
    a: "At Bloom Early Learning Center, we use the Brightwheel app. Families will be able to see what their child is doing throughout the day as well as receive pictures, weekly updates, and upcoming events happening at the center.",
  },
] as const;

export const nav = [
  { href: "/#programs", label: "Programs", cta: false },
  { href: "/#approach", label: "Our Approach", cta: false },
  { href: "/#team", label: "Our Team", cta: false },
  { href: "/#tuition", label: "Tuition", cta: false },
  { href: "/join-the-team", label: "Join The Team", cta: false },
  { href: "/#reserve", label: "Reserve Enrollment", cta: true },
] as const;

export const jobForm = {
  positions: ["Full-time", "Part-Time", "Float", "Substitute"],
  ageGroups: ["Infants", "Toddlers", "Early Preschool", "Pre-K"],
  education: ["High School / GED", "College / Program"],
  cpr: ["Yes", "No", "Other"],
} as const;
