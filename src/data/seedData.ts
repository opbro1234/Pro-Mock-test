import { CurrentAffairsItem, Question, MockTest, UserProfile } from '../types';
import { ALL_NEW_MOCK_TESTS, ALL_NEW_QUESTIONS } from './allExamPapersData';

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'student-2026-01',
  name: 'Shivraj Gond',
  rollNo: '29',
  className: 'TYIT B',
  academicYear: '2026-27',
  email: 'shivraj.gond@nirmala.edu.in',
  institute: 'Nirmala Memorial Foundation College of Commerce and Science (Autonomous)',
  targetExam: 'UPSC Civil Services',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'student',
  streakDays: 8,
  lastActiveDate: '2026-08-30'
};

export const SECONDARY_STUDENT_PROFILE: UserProfile = {
  id: 'student-2026-02',
  name: 'Chris Anthony',
  rollNo: '09',
  className: 'TYIT B',
  academicYear: '2026-27',
  email: 'chris.anthony@nirmala.edu.in',
  institute: 'Nirmala Memorial Foundation College of Commerce and Science (Autonomous)',
  targetExam: 'SSC (CGL/CHSL/MTS)',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  role: 'student',
  streakDays: 12,
  lastActiveDate: '2026-08-30'
};

export const ADMIN_USER_PROFILE: UserProfile = {
  id: 'faculty-admin-01',
  name: 'Prof. Shraddha Parab',
  rollNo: 'FACULTY-IT',
  className: 'Dept. of IT',
  academicYear: '2026-27',
  email: 'shraddha.parab@nirmala.edu.in',
  institute: 'Nirmala Memorial Foundation College of Commerce and Science (Autonomous)',
  targetExam: 'UPSC Civil Services',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  role: 'admin',
  streakDays: 30,
  lastActiveDate: '2026-08-31'
};

export const SEED_CURRENT_AFFAIRS: CurrentAffairsItem[] = [
  {
    id: 'ca-2026-01',
    title: 'RBI Monetary Policy Committee Retains Repo Rate at 6.50% & Updates Inflation Forecast',
    summary: 'The Reserve Bank of India (RBI) Monetary Policy Committee (MPC) unanimously decided to maintain the benchmark policy repo rate at 6.50%, focusing on the withdrawal of accommodation to ensure headline CPI inflation aligns with the 4% target.',
    fullArticle: 'The six-member Monetary Policy Committee (MPC) headed by RBI Governor announced its monetary policy resolution. The committee voted unanimously to keep the policy repo rate unchanged at 6.50%. Consequently, the Standing Deposit Facility (SDF) rate remains at 6.25% and the Marginal Standing Facility (MSF) rate and Bank Rate at 6.75%.\n\nThe MPC reiterated its commitment to aligning consumer price index (CPI) headline inflation with the mandated target of 4.0% within a tolerance band of +/- 2%, while supporting economic growth. Real GDP growth for the financial year is projected at 7.2% with balanced risks across quarters.',
    keyTakeaways: [
      'Repo Rate held steady at 6.50%; SDF rate at 6.25% and MSF rate at 6.75%.',
      'Headline CPI Inflation target anchored at 4.0% (+/- 2% tolerance band) under Section 45ZB of RBI Act.',
      'MPC composition: 6 members (3 from RBI including Governor, 3 external members nominated by Central Government).',
      'Real GDP growth projected at 7.2% driven by robust domestic manufacturing, capital expenditure, and rural revival.'
    ],
    category: 'Economy & Banking',
    date: '2026-08-28',
    readTimeMinutes: 4,
    source: 'Reserve Bank of India Press Release / The Hindu BusinessLine',
    tags: ['Banking GA', 'UPSC GS-3 Economy', 'RBI Grade B', 'SSC CGL'],
    practiceQuestion: {
      questionText: 'Which statutory committee is responsible for fixing the benchmark policy interest rate (Repo Rate) in India?',
      options: [
        { id: 'a', text: 'Financial Stability and Development Council (FSDC)' },
        { id: 'b', text: 'Monetary Policy Committee (MPC) of the RBI' },
        { id: 'c', text: 'Cabinet Committee on Economic Affairs (CCEA)' },
        { id: 'd', text: 'NITI Aayog Governing Council' }
      ],
      correctOptionId: 'b',
      explanation: 'Under Section 45ZB of the amended RBI Act, 1934, the Monetary Policy Committee (MPC) consists of 6 members and is statutorily mandated to determine the policy repo rate required to achieve the inflation target.'
    }
  },
  {
    id: 'ca-2026-02',
    title: 'ISRO Unveils Bharatiya Antariksh Station (BAS) Module Blueprint & Gaganyaan Human Spaceflight Milestones',
    summary: 'Indian Space Research Organisation (ISRO) has formalized the architecture for the first module (BAS-1) of the Bharatiya Antariksh Station scheduled for launch by 2028, alongside critical test flight achievements for the Gaganyaan mission.',
    fullArticle: 'ISRO Chairman revealed the detailed roadmap for India’s space station initiative, the Bharatiya Antariksh Station (BAS), intended to be fully operational by 2035. The base module, BAS-1, will weigh approximately 10 tonnes and be deployed into Low Earth Orbit (LEO) at an altitude of ~400 km.\n\nSimultaneously, key qualification tests for the Environmental Control and Life Support System (ECLSS) and the Crew Escape System (CES) for the Gaganyaan Human Spaceflight mission were successfully completed at the Satish Dhawan Space Centre (SDSC-SHAR), Sriharikota.',
    keyTakeaways: [
      'BAS-1 (First Module) planned for orbital insertion by 2028 via LVM3 heavy-lift launcher.',
      'Full Bharatiya Antariksh Station completion target set for 2035.',
      'Gaganyaan mission aims to send a 3-member Indian crew to a 400 km LEO orbit for 3 days.',
      'Vyommitra, a female-humanoid robot, will fly aboard uncrewed precursor test flights.'
    ],
    category: 'Science & Technology',
    date: '2026-08-27',
    readTimeMinutes: 5,
    source: 'ISRO Official Bulletin / PIB Delhi',
    tags: ['UPSC GS-3 Sci-Tech', 'SSC CGL', 'Railways RRB', 'Defense & Space'],
    practiceQuestion: {
      questionText: 'What is the name of the female humanoid robot developed by ISRO for uncrewed Gaganyaan test missions?',
      options: [
        { id: 'a', text: 'Pragyan' },
        { id: 'b', text: 'Vyommitra' },
        { id: 'c', text: 'Mitra-AI' },
        { id: 'd', text: 'Aryabhata-X' }
      ],
      correctOptionId: 'b',
      explanation: 'Vyommitra is a half-humanoid robot developed by ISRO to simulate human body functions, monitor capsule parameters, and operate switch panels during uncrewed spaceflight trials.'
    }
  },
  {
    id: 'ca-2026-03',
    title: 'PM Surya Ghar: Muft Bijli Yojana Crosses Milestone of 1.5 Crore Registrations Nationwide',
    summary: 'The flagship PM Surya Ghar: Muft Bijli Yojana has registered over 1.5 crore households, providing financial subsidies of up to Rs 78,000 for rooftop solar installations to supply up to 300 units of free monthly electricity.',
    fullArticle: 'Launched with an outlay of Rs 75,021 crore, PM Surya Ghar: Muft Bijli Yojana aims to install rooftop solar panels across 1 crore households in India. Under the revised guidelines, the central government provides a direct subsidy of Rs 30,000 for a 1 kW system, Rs 60,000 for 2 kW, and Rs 78,000 for 3 kW and above.\n\nThe scheme empowers Urban Local Bodies and Panchayats through Model Solar Village grants and incentives for DISCOMs, accelerating India’s target of 500 GW non-fossil fuel capacity by 2030.',
    keyTakeaways: [
      'Outlay: Rs 75,021 crore aimed at solarizing 1 crore domestic rooftops.',
      'Free electricity benefits: Up to 300 units per month per beneficiary household.',
      'Subsidy: Max Rs 78,000 for residential systems of 3 kW or higher capacity.',
      'Aligned with India’s NDC target of 50% cumulative electric power installed capacity from non-fossil sources.'
    ],
    category: 'Government Schemes',
    date: '2026-08-25',
    readTimeMinutes: 4,
    source: 'Ministry of New & Renewable Energy (MNRE) / PIB',
    tags: ['Government Schemes', 'UPSC GS-2 / GS-3', 'Banking GA', 'SSC'],
    practiceQuestion: {
      questionText: 'Under the PM Surya Ghar: Muft Bijli Yojana, what is the maximum monthly free electricity target provided to beneficiary households?',
      options: [
        { id: 'a', text: '100 units' },
        { id: 'b', text: '200 units' },
        { id: 'c', text: '300 units' },
        { id: 'd', text: '500 units' }
      ],
      correctOptionId: 'c',
      explanation: 'PM Surya Ghar Muft Bijli Yojana is designed to provide up to 300 units of free electricity per month to 1 crore households through rooftop solar installations.'
    }
  },
  {
    id: 'ca-2026-04',
    title: 'Supreme Court 7-Judge Constitution Bench Upholds Sub-Classification within SC and ST Quotas',
    summary: 'In a landmark 6:1 verdict, a 7-judge Constitution Bench of the Supreme Court ruled that States have the constitutional competence to create sub-classifications within Scheduled Castes (SC) and Scheduled Tribes (ST) categories for affirmative action.',
    fullArticle: 'Overruling the 2004 five-judge bench judgment in E.V. Chinnaiah v. State of Andhra Pradesh, the Supreme Court held that Article 15(4) and Article 16(4) permit States to provide preferential quotas to more disadvantaged sub-castes among the Presidential list of SCs/STs under Article 341 and 342.\n\nThe apex court clarified that sub-classification must be backed by quantifiable, empirical data demonstrating unequal representation, and the state cannot reserve 100% of seats or allocate quotas arbitrarily.',
    keyTakeaways: [
      'Bench: 7-judge Constitution Bench headed by Chief Justice of India (6:1 majority).',
      'Overruled: 2004 E.V. Chinnaiah ruling which had held SCs form a homogenous class.',
      'Constitutional Articles involved: Article 14, 15(4), 16(4), 341, and 342.',
      'Mandatory prerequisite: Empirical, quantifiable data showing inadequate representation of sub-groups.'
    ],
    category: 'National',
    date: '2026-08-22',
    readTimeMinutes: 6,
    source: 'Supreme Court of India Judgments / LiveLaw',
    tags: ['Polity & Constitution', 'UPSC GS-2', 'Law & Judicial Exams', 'SSC CGL'],
    practiceQuestion: {
      questionText: 'Under which Article of the Constitution of India does the President issue the list specifying Scheduled Castes in relation to a State or Union Territory?',
      options: [
        { id: 'a', text: 'Article 338' },
        { id: 'b', text: 'Article 341' },
        { id: 'c', text: 'Article 342' },
        { id: 'd', text: 'Article 356' }
      ],
      correctOptionId: 'b',
      explanation: 'Article 341 empowers the President of India to specify castes, races, or tribes deemed to be Scheduled Castes with respect to each State or Union Territory.'
    }
  },
  {
    id: 'ca-2026-05',
    title: 'India Adds Three New Wetland Sites to Ramsar Convention, Total Reaches 85',
    summary: 'India has added three more wetlands to the list of Wetlands of International Importance under the Ramsar Convention, expanding India’s Ramsar network to 85 sites covering over 1.35 million hectares.',
    fullArticle: 'The Ministry of Environment, Forest and Climate Change (MoEFCC) confirmed that Nanjarayan Bird Sanctuary and Kazhuveli Bird Sanctuary in Tamil Nadu, along with Tawa Reservoir in Madhya Pradesh, have been designated as Ramsar Sites.\n\nWith 85 Ramsar sites, India ranks third globally in the number of designated Ramsar sites and holds the largest Ramsar site network in South Asia. Tamil Nadu continues to lead Indian states with the highest number of Ramsar sites (18 sites).',
    keyTakeaways: [
      'Total Ramsar sites in India: 85 sites (largest in South Asia).',
      'State with highest Ramsar sites: Tamil Nadu (18 sites), followed by Uttar Pradesh (10 sites).',
      'Ramsar Convention was signed in Ramsar, Iran on February 2, 1971 (celebrated as World Wetlands Day).',
      'Crucial for conservation of migratory birds along the Central Asian Flyway (CAF).'
    ],
    category: 'Environment & Ecology',
    date: '2026-08-20',
    readTimeMinutes: 4,
    source: 'MoEFCC Press Release / Ramsar.org',
    tags: ['Environment & Ecology', 'UPSC GS-3', 'State PCS', 'Railways NTPC'],
    practiceQuestion: {
      questionText: 'On which date is World Wetlands Day observed every year to commemorate the signing of the Ramsar Convention?',
      options: [
        { id: 'a', text: 'February 2' },
        { id: 'b', text: 'March 22' },
        { id: 'c', text: 'April 22' },
        { id: 'd', text: 'June 5' }
      ],
      correctOptionId: 'a',
      explanation: 'World Wetlands Day is celebrated internationally each year on 2 February, marking the date of the adoption of the Convention on Wetlands on 2 February 1971 in Ramsar, Iran.'
    }
  },
  {
    id: 'ca-2026-06',
    title: 'Ministry of Railways Accelerates Indigenous Kavach 4.0 Anti-Collision System Deployment across 10,000 km',
    summary: 'Indian Railways has received RDSO certification for Kavach 4.0, an advanced Automatic Train Protection (ATP) system, initiating widespread trackside and locomotive installations across major trunk routes.',
    fullArticle: 'Kavach 4.0 is an indigenously developed Safety Integrity Level 4 (SIL-4) certified Automatic Train Protection system developed by RDSO in collaboration with Indian OEMs. The system prevents Signal Passing at Danger (SPAD), enforces continuous speed restrictions, and activates automatic braking in collision scenarios or head-on/rear-end conflicts on the same track.\n\nThe rollout covers Golden Quadrilateral and high-density corridors like Delhi-Mumbai and Delhi-Howrah routes at 160 kmph operational speed.',
    keyTakeaways: [
      'Safety Standard: Certified to Safety Integrity Level 4 (SIL-4, highest safety standard).',
      'Key functions: Automatic brake application, SPAD prevention, continuous radio-based telemetry, SOS beaconing in emergencies.',
      'Operates on RFID technology installed on tracks, locomotive computer units, and towers with GSM-R/UHF communication.',
      'Essential topic for RRB NTPC, RRB JE, and SSC competitive exams.'
    ],
    category: 'National',
    date: '2026-08-18',
    readTimeMinutes: 4,
    source: 'Ministry of Railways / RDSO Press Bulletin',
    tags: ['Railways RRB', 'SSC CGL', 'UPSC GS-3 Infrastructure', 'Science & Tech'],
    practiceQuestion: {
      questionText: 'What is the primary function of the indigenously developed "Kavach" system in Indian Railways?',
      options: [
        { id: 'a', text: 'High-speed automated ticket vending and smart baggage tracking' },
        { id: 'b', text: 'Automatic Train Protection (ATP) to prevent train collisions and SPAD' },
        { id: 'c', text: 'Solar-powered traction electrification control' },
        { id: 'd', text: 'Automated biometric passenger entry system' }
      ],
      correctOptionId: 'b',
      explanation: 'Kavach is an indigenous Automatic Train Protection (ATP) system designed to prevent collisions between trains and avoid Signal Passing at Danger (SPAD).'
    }
  },
  {
    id: 'ca-2026-07',
    title: 'India Wins 6 Medals at Paris 2024 Olympic Games; Neeraj Chopra Clinches Silver in Men’s Javelin',
    summary: 'India concluded its Paris Olympics campaign with 6 medals (1 Silver, 5 Bronze), highlighted by Manu Bhaker becoming the first Indian athlete in post-independence history to win two medals at a single Olympic Games.',
    fullArticle: 'At the XXXIII Olympic Summer Games in Paris, India achieved historic milestones in shooting, athletics, and hockey. Neeraj Chopra secured the Silver Medal in Men’s Javelin Throw with an 89.45m throw, becoming India’s most decorated individual Olympic track & field athlete (Gold in Tokyo 2020, Silver in Paris 2024).\n\nManu Bhaker won bronze in the Women’s 10m Air Pistol and paired with Sarabjot Singh for bronze in the 10m Air Pistol Mixed Team event. The Indian Men’s Hockey Team captured back-to-back Olympic bronze medals after defeating Spain.',
    keyTakeaways: [
      'Total tally: 6 medals (1 Silver, 5 Bronze).',
      'Manu Bhaker: First Indian post-independence to win 2 Olympic medals in a single edition.',
      'Neeraj Chopra: Silver in Javelin (89.45m); Pakistan’s Arshad Nadeem took Gold with an Olympic record 92.97m.',
      'Swapnil Kusale won Bronze in 50m Rifle 3 Positions Men; Aman Sehrawat won Bronze in 57kg Freestyle Wrestling (youngest Indian Olympic medalist).'
    ],
    category: 'Sports',
    date: '2026-08-14',
    readTimeMinutes: 4,
    source: 'Indian Olympic Association / Press Trust of India',
    tags: ['Sports Current Affairs', 'SSC CGL / CHSL', 'Banking GA', 'Railways NTPC'],
    practiceQuestion: {
      questionText: 'Who became the first athlete representing independent India to win two medals at a single edition of the Olympic Games?',
      options: [
        { id: 'a', text: 'Neeraj Chopra' },
        { id: 'b', text: 'Manu Bhaker' },
        { id: 'c', text: 'PV Sindhu' },
        { id: 'd', text: 'Sushil Kumar' }
      ],
      correctOptionId: 'b',
      explanation: 'Shooter Manu Bhaker created history at the 2024 Paris Olympics by winning two bronze medals (Women’s 10m Air Pistol and 10m Air Pistol Mixed Team with Sarabjot Singh).'
    }
  },
  {
    id: 'ca-2026-08',
    title: 'Bharat Ratna Conferred on Karpoori Thakur, LK Advani, PV Narasimha Rao, Charan Singh & MS Swaminathan',
    summary: 'The Government of India conferred the country’s highest civilian award, the Bharat Ratna, on five distinguished statesmen and visionaries posthumously and in person.',
    fullArticle: 'The President of India conferred the Bharat Ratna on former Prime Ministers P.V. Narasimha Rao and Chaudhary Charan Singh, former Deputy Prime Minister Lal Krishna Advani, renowned agricultural scientist Dr. M.S. Swaminathan (Father of India’s Green Revolution), and socialist leader and former Bihar Chief Minister Karpoori Thakur.\n\nThe awards honor exceptional contributions to public administration, economic liberalization, agricultural self-sufficiency, farmer empowerment, and social justice.',
    keyTakeaways: [
      'Bharat Ratna was instituted in the year 1954.',
      'Dr. M.S. Swaminathan was instrumental in introducing high-yielding varieties of wheat and rice during the Green Revolution.',
      'P.V. Narasimha Rao spearheaded landmark 1991 LPG (Liberalization, Privatization, Globalization) economic reforms.',
      'Award medallion is shaped like a peepal leaf with the sun and Devanagari script inscription "Bharat Ratna".'
    ],
    category: 'Awards & Honours',
    date: '2026-08-10',
    readTimeMinutes: 5,
    source: 'Rashtrapati Bhavan Communique / PIB',
    tags: ['Awards & Honours', 'Static GK', 'UPSC GS-1/GS-2', 'SSC CGL', 'Banking'],
    examTags: ['UPSC', 'SSC', 'Banking'],
    timelineDate: '2026-08-10',
    practiceQuestion: {
      questionText: 'In which year was the Bharat Ratna award instituted in India?',
      options: [
        { id: 'a', text: '1947' },
        { id: 'b', text: '1950' },
        { id: 'c', text: '1954' },
        { id: 'd', text: '1962' }
      ],
      correctOptionId: 'c',
      explanation: 'The Bharat Ratna was instituted on 2 January 1954 by the President of India. The first recipients in 1954 were C. Rajagopalachari, Sarvepalli Radhakrishnan, and C. V. Raman.'
    }
  },
  {
    id: 'ca-2026-09',
    title: 'India Inaugurates Unified Payments Interface (UPI) Linkage with UAE and Singapore PayNow Expansion',
    summary: 'NPCI International Payments Limited (NIPL) expanded bilateral cross-border fast payment linkages enabling real-time remittances and merchant QR payments directly via Indian bank accounts.',
    fullArticle: 'Following successful interoperability with Singapore’s PayNow, India’s Unified Payments Interface (UPI) has been linked directly with the UAE’s AANI instant payment platform and expanded to Mauritius, Sri Lanka, and France. The framework allows Indian tourists and NRIs to execute zero-delay low-cost cross-border remittances and retail transactions using standard UPI virtual payment addresses.',
    keyTakeaways: [
      'NIPL is the wholly owned international subsidiary of the National Payments Corporation of India (NPCI).',
      'UPI transactions achieved global milestone crossing 14 billion monthly transactions volume in domestic circuits.',
      'Key countries with live UPI connectivity: UAE, Singapore, France, Sri Lanka, Mauritius, and Bhutan.',
      'Direct relevance for RBI Grade B, Banking Awareness, and SSC CGL economy sections.'
    ],
    category: 'Economy & Banking',
    date: '2026-08-04',
    timelineDate: '2026-08-04',
    readTimeMinutes: 4,
    source: 'National Payments Corporation of India (NPCI) Press Release',
    tags: ['Banking GA', 'Economy & Fintech', 'UPSC GS-3', 'SSC CGL'],
    examTags: ['Banking', 'UPSC', 'SSC'],
    practiceQuestion: {
      questionText: 'Which organization is the umbrella entity for operating retail payments and settlement systems in India, including UPI and IMPS?',
      options: [
        { id: 'a', text: 'Reserve Bank of India (RBI) directly' },
        { id: 'b', text: 'National Payments Corporation of India (NPCI)' },
        { id: 'c', text: 'Securities and Exchange Board of India (SEBI)' },
        { id: 'd', text: 'State Bank of India (SBI)' }
      ],
      correctOptionId: 'b',
      explanation: 'NPCI is an initiative of RBI and Indian Banks Association (IBA) under the provisions of the Payment and Settlement Systems Act, 2007, acting as the umbrella organization for retail payments.'
    }
  },
  // --- July 2026 Events ---
  {
    id: 'ca-2026-10',
    title: 'NITI Aayog Releases Multidimensional Poverty Index (MPI) 2026: 13.5 Crore Indians Escaped Poverty',
    summary: 'NITI Aayog’s National Multidimensional Poverty Index revealed a steep decline in multidimensional poverty in India from 24.85% to 14.96%, with rural areas registering the fastest rate of deprivation reduction.',
    fullArticle: 'The National MPI report adopts the globally recognized Alkire-Foster (AF) methodology tracking 12 indicators across three equally weighted dimensions: Health (Nutrition, Child Mortality, Maternal Health), Education (Years of Schooling, School Attendance), and Standard of Living (Cooking Fuel, Sanitation, Drinking Water, Electricity, Housing, Assets, Bank Accounts).\n\nUttar Pradesh, Bihar, and Madhya Pradesh registered the highest absolute numbers of people escaping multidimensional poverty.',
    keyTakeaways: [
      'Headcount poverty ratio dropped significantly to 14.96%.',
      'Uses 12 indicators aligned with Sustainable Development Goal (SDG) Target 1.2.',
      'Fastest reduction achieved in rural districts and BIMARU states.',
      'Core topic for UPSC GS-2/GS-3 socio-economic development and State PCS.'
    ],
    category: 'National',
    date: '2026-07-28',
    timelineDate: '2026-07-28',
    readTimeMinutes: 5,
    source: 'NITI Aayog Official Publication / Press Information Bureau',
    tags: ['UPSC GS-2 Social Justice', 'Economy', 'State PCS', 'SSC CGL'],
    examTags: ['UPSC', 'SSC', 'State PCS'],
    practiceQuestion: {
      questionText: 'How many indicators across three standard dimensions are utilized in NITI Aayog’s National Multidimensional Poverty Index (MPI)?',
      options: [
        { id: 'a', text: '10 indicators' },
        { id: 'b', text: '12 indicators' },
        { id: 'c', text: '15 indicators' },
        { id: 'd', text: '8 indicators' }
      ],
      correctOptionId: 'b',
      explanation: 'NITI Aayog’s National MPI includes 12 indicators (retaining the 10 global MPI indicators and adding 2 India-specific indicators: Maternal Health and Bank Accounts).'
    }
  },
  {
    id: 'ca-2026-11',
    title: 'India Assumes Presidency of the Colombo Security Conclave (CSC) to Bolster Maritime Security',
    summary: 'India formally assumed the Chairmanship of the Colombo Security Conclave, reinforcing cooperative maritime domain awareness, counter-terrorism, and cyber security across the Indian Ocean Region.',
    fullArticle: 'The Colombo Security Conclave comprises founding member nations India, Sri Lanka, Maldives, Mauritius, and newly inducted members Seychelles and Bangladesh. The 8th National Security Adviser level meeting in New Delhi focused on coordinated maritime surveillance, anti-piracy, humanitarian assistance and disaster relief (HADR), and combating narcotics trafficking in the Sea Lines of Communication (SLOCs).',
    keyTakeaways: [
      'Member States: India, Sri Lanka, Maldives, Mauritius, and Seychelles/Bangladesh as observers/members.',
      'Key Pillars: Maritime Safety & Security, Countering Terrorism, Combating Transnational Crime, Cyber Security, Critical Infrastructure Protection.',
      'Reinforces India’s SAGAR (Security and Growth for All in the Region) vision.',
      'High-yield topic for International Relations (UPSC GS-2 and Defense exams).'
    ],
    category: 'International',
    date: '2026-07-19',
    timelineDate: '2026-07-19',
    readTimeMinutes: 4,
    source: 'Ministry of External Affairs (MEA) Press Release',
    tags: ['International Relations', 'UPSC GS-2', 'Defense Exams', 'NDA/CDS'],
    examTags: ['UPSC', 'Defence', 'SSC'],
    practiceQuestion: {
      questionText: 'What does the acronym "SAGAR" represent in the context of India’s foreign policy and maritime diplomacy in the Indian Ocean?',
      options: [
        { id: 'a', text: 'Security and Growth for All in the Region' },
        { id: 'b', text: 'Surveillance and Geo-tracking Across Resources' },
        { id: 'c', text: 'Sustainable Aquaculture and Green Agriculture Research' },
        { id: 'd', text: 'Strategic Alliances for Global Aviation Routes' }
      ],
      correctOptionId: 'a',
      explanation: 'SAGAR stands for "Security and Growth for All in the Region", articulated by India in 2015 as its overarching vision for peace, stability, and prosperity in the Indian Ocean Region.'
    }
  },
  {
    id: 'ca-2026-12',
    title: 'Dr. Soumya Swaminathan Appointed Co-Chair of Global Coalition on Climate and Health',
    summary: 'Renowned clinical scientist and former WHO Chief Scientist Dr. Soumya Swaminathan has been designated Co-Chair of the International Coalition on Climate Change and Human Health.',
    fullArticle: 'The intergovernmental initiative focuses on bridging the gap between planetary climate disruptions and clinical health outcomes, specifically addressing vector-borne diseases, heat stress vulnerability, and resilient public health infrastructure in the Global South.\n\nDr. Swaminathan previously served as the Director-General of the Indian Council of Medical Research (ICMR) and Secretary, Department of Health Research.',
    keyTakeaways: [
      'Dr. Swaminathan is the daughter of legendary Green Revolution scientist Dr. M.S. Swaminathan.',
      'Mandate: Preparing healthcare responses for extreme climate anomalies and zoonotic disease outbreaks.',
      'Key static link: ICMR established in 1911 (originally Indian Research Fund Association).',
      'Frequent question archetype in Banking GA Appointments and SSC General Awareness.'
    ],
    category: 'Appointments & Summits',
    date: '2026-07-12',
    timelineDate: '2026-07-12',
    readTimeMinutes: 3,
    source: 'World Health Organization (WHO) Newsroom',
    tags: ['Appointments & Summits', 'Banking GA', 'SSC CGL', 'Science & Health'],
    examTags: ['Banking', 'SSC', 'UPSC'],
    practiceQuestion: {
      questionText: 'Where is the headquarters of the Indian Council of Medical Research (ICMR) situated?',
      options: [
        { id: 'a', text: 'New Delhi' },
        { id: 'b', text: 'Mumbai' },
        { id: 'c', text: 'Kolkata' },
        { id: 'd', text: 'Hyderabad' }
      ],
      correctOptionId: 'a',
      explanation: 'The Indian Council of Medical Research (ICMR), the apex body in India for the formulation, coordination and promotion of biomedical research, is headquartered in New Delhi.'
    }
  },
  // --- June 2026 Events ---
  {
    id: 'ca-2026-13',
    title: 'World Environment Day 2026: Focus on Land Restoration, Desertification and Drought Resilience',
    summary: 'Observed globally under the campaign #GenerationRestoration, marking significant national initiatives under the Green India Mission and Nagar Van Yojana.',
    fullArticle: 'World Environment Day is observed every year on June 5 under the auspices of the United Nations Environment Programme (UNEP). India highlighted the expansion of its Amrit Dharohar initiative for wetland conservation, Project Tiger completion of 50 years, and the establishment of 400 new Nagar Vans (Urban Forests) to sequester 2.5 billion tonnes of additional CO2 equivalent by 2030.',
    keyTakeaways: [
      'World Environment Day is observed on June 5 annually since 1974.',
      'UNEP headquarters: Nairobi, Kenya.',
      'India’s commitment under UNCCD: Restoring 26 million hectares of degraded land by 2030.',
      'Repeated topic in UPSC GS-3, SSC CHSL, and State Forest Service exams.'
    ],
    category: 'Environment & Ecology',
    date: '2026-06-05',
    timelineDate: '2026-06-05',
    readTimeMinutes: 4,
    source: 'UNEP Official Portal / Ministry of Environment, Forest & Climate Change',
    tags: ['Environment & Ecology', 'UPSC GS-3', 'State PCS', 'SSC CGL'],
    examTags: ['UPSC', 'SSC', 'Railways'],
    practiceQuestion: {
      questionText: 'Where is the global headquarters of the United Nations Environment Programme (UNEP) located?',
      options: [
        { id: 'a', text: 'Geneva, Switzerland' },
        { id: 'b', text: 'Nairobi, Kenya' },
        { id: 'c', text: 'Paris, France' },
        { id: 'd', text: 'Vienna, Austria' }
      ],
      correctOptionId: 'b',
      explanation: 'The United Nations Environment Programme (UNEP), founded in June 1972 following the Stockholm Conference, is headquartered in Nairobi, Kenya.'
    }
  },
  {
    id: 'ca-2026-14',
    title: 'India Launches "Mission Mausam" to Modernize Weather Forecasting and Cloud Chamber Research',
    summary: 'The Union Cabinet approved Mission Mausam with an outlay of Rs 2,000 crore to deploy next-generation Doppler weather radars, AI forecasting models, and cloud physics simulation chambers.',
    fullArticle: 'Spearheaded by the Ministry of Earth Sciences (MoES), India Meteorological Department (IMD), and Indian Institute of Tropical Meteorology (IITM) Pune, Mission Mausam aims to enhance precipitation forecasting accuracy by up to 10% and establish cloud seeding and weather modification research laboratories.\n\nThe project will integrate 50 new X-band and C-band Doppler Radars and high-performance computing clusters reaching 100 PFLOPS compute capacity.',
    keyTakeaways: [
      'Nodal Ministry: Ministry of Earth Sciences (MoES).',
      'Implementing institutes: IMD, IITM Pune, and NCMRWF Noida.',
      'Core technology: High-frequency Doppler weather radars, ocean-buoy networks, and AI-driven convective cloud models.',
      'Critical for UPSC GS-3 Science & Technology and Disaster Management.'
    ],
    category: 'Science & Technology',
    date: '2026-06-18',
    timelineDate: '2026-06-18',
    readTimeMinutes: 4,
    source: 'Ministry of Earth Sciences (MoES) Press Release / PIB',
    tags: ['Science & Tech', 'UPSC GS-3', 'SSC CGL', 'Railways NTPC'],
    examTags: ['UPSC', 'SSC', 'Railways'],
    practiceQuestion: {
      questionText: 'Which research institution under the Ministry of Earth Sciences is located in Pune and leads India’s climate modeling and monsoon research?',
      options: [
        { id: 'a', text: 'National Centre for Medium Range Weather Forecasting (NCMRWF)' },
        { id: 'b', text: 'Indian Institute of Tropical Meteorology (IITM)' },
        { id: 'c', text: 'National Institute of Ocean Technology (NIOT)' },
        { id: 'd', text: 'Space Applications Centre (SAC)' }
      ],
      correctOptionId: 'b',
      explanation: 'The Indian Institute of Tropical Meteorology (IITM) is located in Pune, Maharashtra, and functions as a premier research center for monsoon dynamics, tropical meteorology, and climate physics.'
    }
  },
  // --- May 2026 Events ---
  {
    id: 'ca-2026-15',
    title: 'India Triumphs at BWF Thomas & Uber Cup Preliminaries; Shuttlers Secure Clean Sweep',
    summary: 'Indian badminton contingent led by Lakshya Sen and doubles pair Satwiksairaj Rankireddy & Chirag Shetty delivered decisive victories in Asian team championships.',
    fullArticle: 'Building upon India’s historic 2022 Thomas Cup title, the Indian national badminton team clinched top seeding for the World Finals after undefeated round-robin sweeps against top Asian rivals.\n\nSatwiksairaj Rankireddy and Chirag Shetty retain their World No. 1 BWF Men’s Doubles ranking with consecutive Super 750 and Super 1000 tour titles.',
    keyTakeaways: [
      'Thomas Cup is the premier international men’s badminton team championship (instituted 1949).',
      'Uber Cup is the equivalent women’s world team championship (instituted 1957).',
      'India first won the historic Thomas Cup in Bangkok in May 2022, defeating 14-time champion Indonesia.',
      'High-frequency sports GK question across SSC CGL, RRB NTPC, and Banking PO.'
    ],
    category: 'Sports',
    date: '2026-05-22',
    timelineDate: '2026-05-22',
    readTimeMinutes: 4,
    source: 'Badminton Association of India (BAI) / BWF Official Bulletin',
    tags: ['Sports Current Affairs', 'SSC CGL', 'Banking GA', 'Railways NTPC'],
    examTags: ['SSC', 'Banking', 'Railways'],
    practiceQuestion: {
      questionText: 'Which country did the Indian Men’s Badminton Team defeat 3-0 in the final to win its maiden historic Thomas Cup title in 2022?',
      options: [
        { id: 'a', text: 'China' },
        { id: 'b', text: 'Indonesia' },
        { id: 'c', text: 'Malaysia' },
        { id: 'd', text: 'Denmark' }
      ],
      correctOptionId: 'b',
      explanation: 'India created sports history in May 2022 by defeating 14-time champions Indonesia 3-0 in the final of the Thomas Cup in Bangkok, Thailand.'
    }
  },
  {
    id: 'ca-2026-16',
    title: 'G7 Summit Concludes with Focus on AI Governance Framework and Clean Energy Supply Chains',
    summary: 'The 50th G7 Leaders’ Summit hosted in Apulia, Italy concluded with declarations on ethical AI risk standards, critical mineral partnerships, and Mediterranean migration pacts.',
    fullArticle: 'Invited as an Outreach Nation, Prime Minister of India addressed the special session on Artificial Intelligence, Energy, Africa and the Mediterranean. India emphasized democratizing AI technologies for the Global South, promoting the Mission LiFE (Lifestyle for Environment) paradigm, and expanding the International Solar Alliance (ISA) network.',
    keyTakeaways: [
      'G7 Member Nations: USA, UK, Canada, France, Germany, Italy, Japan, plus the European Union.',
      'G7 was founded in 1975 (originally G6 before Canada joined in 1976).',
      'India is a regular Outreach partner nation invited to G7 summits.',
      'Essential topic for International Summits & Organizations in UPSC and Banking GA.'
    ],
    category: 'Appointments & Summits',
    date: '2026-05-15',
    timelineDate: '2026-05-15',
    readTimeMinutes: 5,
    source: 'Ministry of External Affairs / G7 Presidency Release',
    tags: ['Summits & Organizations', 'UPSC GS-2', 'Banking GA', 'SSC CGL'],
    examTags: ['UPSC', 'Banking', 'SSC'],
    practiceQuestion: {
      questionText: 'Which of the following nations is NOT a permanent member of the Group of Seven (G7)?',
      options: [
        { id: 'a', text: 'Japan' },
        { id: 'b', text: 'Italy' },
        { id: 'c', text: 'India' },
        { id: 'd', text: 'Canada' }
      ],
      correctOptionId: 'c',
      explanation: 'India participates in G7 Summits as an invited Outreach country, but is not a permanent member of the G7 (which comprises USA, UK, France, Germany, Japan, Italy, and Canada).'
    }
  }
];

const BASE_SEED_QUESTIONS: Question[] = [
  // --- UPSC / General Studies Polity & History ---
  {
    id: 'q-upsc-01',
    section: 'General Studies',
    topic: 'Polity & Constitution',
    examCategory: 'UPSC Civil Services',
    text: 'With reference to the "Writ Jurisdiction" of the Supreme Court and High Courts in India, consider the following statements:\n1. The Supreme Court can issue writs only for the enforcement of Fundamental Rights under Article 32.\n2. The High Court under Article 226 can issue writs not only for Fundamental Rights but also for any other legal purpose.\n3. The territorial jurisdiction of the Supreme Court for issuing writs is wider than that of a High Court.\n\nWhich of the statements given above are correct?',
    options: [
      { id: 'a', text: '1 and 2 only' },
      { id: 'b', text: '2 and 3 only' },
      { id: 'c', text: '1 and 3 only' },
      { id: 'd', text: '1, 2 and 3' }
    ],
    correctOptionId: 'd',
    explanation: 'All three statements are correct. Article 32 is limited strictly to Fundamental Rights enforcement, whereas Article 226 gives High Courts wider power to issue writs for Fundamental Rights as well as ordinary legal rights ("for any other purpose"). However, SC writ jurisdiction extends throughout India, while HC jurisdiction is confined to its state territory.',
    difficulty: 'Hard',
    examTag: 'UPSC Prelims GS-1',
    dateAdded: '2026-08-20'
  },
  {
    id: 'q-upsc-02',
    section: 'General Studies',
    topic: 'Modern Indian History',
    examCategory: 'UPSC Civil Services',
    text: 'Which of the following acts for the first time introduced the system of "Dyarchy" in the provincial executive in British India?',
    options: [
      { id: 'a', text: 'Indian Councils Act, 1909 (Morley-Minto Reforms)' },
      { id: 'b', text: 'Government of India Act, 1919 (Montagu-Chelmsford Reforms)' },
      { id: 'c', text: 'Government of India Act, 1935' },
      { id: 'd', text: 'Indian Independence Act, 1947' }
    ],
    correctOptionId: 'b',
    explanation: 'The Government of India Act, 1919 introduced Dyarchy (dual governance) at the provincial level by dividing provincial subjects into "Transferred" (administered by ministers) and "Reserved" (administered by Governor and executive council).',
    difficulty: 'Medium',
    examTag: 'UPSC Prelims GS-1',
    dateAdded: '2026-08-20'
  },
  {
    id: 'q-upsc-03',
    section: 'General Studies',
    topic: 'Geography & Environment',
    examCategory: 'UPSC Civil Services',
    text: 'Consider the following pairs of Biosphere Reserves and their primary state locations:\n1. Nokrek Biosphere Reserve — Meghalaya\n2. Similipal Biosphere Reserve — Odisha\n3. Agasthyamala Biosphere Reserve — Kerala & Tamil Nadu\n4. Cold Desert Biosphere Reserve — Ladakh\n\nHow many of the above pairs are correctly matched?',
    options: [
      { id: 'a', text: 'Only one pair' },
      { id: 'b', text: 'Only two pairs' },
      { id: 'c', text: 'Only three pairs' },
      { id: 'd', text: 'All four pairs' }
    ],
    correctOptionId: 'c',
    explanation: 'Pairs 1, 2, and 3 are correctly matched. Pair 4 is incorrect because Cold Desert Biosphere Reserve is located in Himachal Pradesh (Pin Valley National Park and surroundings), not Ladakh.',
    difficulty: 'Hard',
    examTag: 'UPSC Prelims GS-1',
    dateAdded: '2026-08-21'
  },
  {
    id: 'q-upsc-04',
    section: 'General Studies',
    topic: 'Economy & Banking Awareness',
    examCategory: 'UPSC Civil Services',
    text: 'What is the primary effect of an increase in the "Cash Reserve Ratio (CRR)" by the Reserve Bank of India on the banking system?',
    options: [
      { id: 'a', text: 'It increases the loanable funds and lending capacity of commercial banks.' },
      { id: 'b', text: 'It decreases the liquidity in the banking system and contracts credit creation.' },
      { id: 'c', text: 'It automatically lowers interest rates on consumer loans.' },
      { id: 'd', text: 'It has no effect on money supply in the domestic economy.' }
    ],
    correctOptionId: 'b',
    explanation: 'When RBI raises the CRR, commercial banks must park a higher percentage of their Net Demand and Time Liabilities (NDTL) as cash reserves with the RBI. This reduces disposable cash for lending, contracting bank credit and sucking liquidity out of the market.',
    difficulty: 'Medium',
    examTag: 'UPSC / RBI Grade B',
    dateAdded: '2026-08-21'
  },

  // --- SSC CGL Tier-1: Quantitative Aptitude, Reasoning, English, GA ---
  {
    id: 'q-ssc-01',
    section: 'Quantitative Aptitude',
    topic: 'Time, Work & Distance',
    examCategory: 'SSC (CGL/CHSL/MTS)',
    text: 'A train 360 meters long is running at a uniform speed of 72 km/h. How much time (in seconds) will it take to completely cross a railway platform of length 240 meters?',
    options: [
      { id: 'a', text: '25 seconds' },
      { id: 'b', text: '30 seconds' },
      { id: 'c', text: '35 seconds' },
      { id: 'd', text: '40 seconds' }
    ],
    correctOptionId: 'b',
    explanation: 'Total Distance = Length of Train + Length of Platform = 360m + 240m = 600m.\nSpeed = 72 km/h = 72 * (5/18) = 20 m/s.\nTime = Distance / Speed = 600 / 20 = 30 seconds.',
    difficulty: 'Easy',
    examTag: 'SSC CGL Tier-1',
    dateAdded: '2026-08-22'
  },
  {
    id: 'q-ssc-02',
    section: 'Quantitative Aptitude',
    topic: 'Percentage & Profit-Loss',
    examCategory: 'SSC (CGL/CHSL/MTS)',
    text: 'A shopkeeper marks an article 40% above its cost price and allows a discount of 25% on the marked price. What is his net profit or loss percentage?',
    options: [
      { id: 'a', text: '5% Profit' },
      { id: 'b', text: '5% Loss' },
      { id: 'c', text: '10% Profit' },
      { id: 'd', text: '15% Profit' }
    ],
    correctOptionId: 'a',
    explanation: 'Let CP = 100.\nMarked Price (MP) = 140.\nDiscount = 25% of 140 = 35.\nSelling Price (SP) = 140 - 35 = 105.\nNet Profit = SP - CP = 105 - 100 = 5% profit.',
    difficulty: 'Easy',
    examTag: 'SSC CGL / CHSL',
    dateAdded: '2026-08-22'
  },
  {
    id: 'q-ssc-03',
    section: 'Reasoning & Logical Intelligence',
    topic: 'Coding-Decoding & Series',
    examCategory: 'SSC (CGL/CHSL/MTS)',
    text: 'In a certain code language, if "RAILWAY" is coded as "TCKNACW", how will "STATION" be coded in the same code language?',
    options: [
      { id: 'a', text: 'UVCTKQP' },
      { id: 'b', text: 'URCVKMP' },
      { id: 'c', text: 'UVCRGQL' },
      { id: 'd', text: 'TUBUJPO' }
    ],
    correctOptionId: 'a',
    explanation: 'Pattern: Each letter is shifted by +2 positions in alphabetical order:\nS(+2)->U, T(+2)->V, A(+2)->C, T(+2)->V, I(+2)->K, O(+2)->Q, N(+2)->P => UVCTKQP.',
    difficulty: 'Easy',
    examTag: 'SSC CGL Reasoning',
    dateAdded: '2026-08-22'
  },
  {
    id: 'q-ssc-04',
    section: 'Reasoning & Logical Intelligence',
    topic: 'Syllogism & Puzzles',
    examCategory: 'SSC (CGL/CHSL/MTS)',
    text: 'Statements:\n1. All Books are Papers.\n2. Some Papers are Pens.\n\nConclusions:\nI. Some Books are Pens.\nII. Some Papers are Books.\n\nWhich of the following conclusions logically follows?',
    options: [
      { id: 'a', text: 'Only Conclusion I follows' },
      { id: 'b', text: 'Only Conclusion II follows' },
      { id: 'c', text: 'Both I and II follow' },
      { id: 'd', text: 'Neither I nor II follows' }
    ],
    correctOptionId: 'b',
    explanation: 'From Statement 1 (All Books are Papers), by conversion, "Some Papers are Books" (Conclusion II) is valid. Since the middle term "Papers" is not distributed in both premises, no definite relation between Books and Pens exists. Hence only Conclusion II follows.',
    difficulty: 'Medium',
    examTag: 'SSC / Banking Reasoning',
    dateAdded: '2026-08-23'
  },
  {
    id: 'q-ssc-05',
    section: 'English Comprehension',
    topic: 'English Grammar & Vocab',
    examCategory: 'SSC (CGL/CHSL/MTS)',
    text: 'Select the most appropriate ANTONYM of the underlined word in the given sentence:\n"The civil servant took a **meticulous** approach while drafting the public policy draft."',
    options: [
      { id: 'a', text: 'Careful' },
      { id: 'b', text: 'Careless' },
      { id: 'c', text: 'Diligent' },
      { id: 'd', text: 'Painstaking' },
    ],
    correctOptionId: 'b',
    explanation: '"Meticulous" means showing great attention to detail; very careful and precise. Its direct antonym is "Careless" (or sloppy/negligent).',
    difficulty: 'Easy',
    examTag: 'SSC CGL English',
    dateAdded: '2026-08-23'
  },

  // --- Banking (IBPS PO / SBI Clerk / RBI) ---
  {
    id: 'q-bank-01',
    section: 'Quantitative Aptitude',
    topic: 'Data Interpretation',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    passage: 'A bank Branch processed 1,200 loan applications in 2025: 45% were Home Loans, 30% were Personal Loans, and the remaining 25% were Vehicle Loans. Out of Home loans, 80% were approved; out of Personal loans, 60% were approved; and out of Vehicle loans, 70% were approved.',
    text: 'What is the total number of loan applications approved by the bank branch across all three loan categories?',
    options: [
      { id: 'a', text: '786' },
      { id: 'b', text: '858' },
      { id: 'c', text: '822' },
      { id: 'd', text: '910' }
    ],
    correctOptionId: 'b',
    explanation: 'Home loans = 45% of 1200 = 540; Approved = 80% of 540 = 432.\nPersonal loans = 30% of 1200 = 360; Approved = 60% of 360 = 216.\nVehicle loans = 25% of 1200 = 300; Approved = 70% of 300 = 210.\nTotal approved = 432 + 216 + 210 = 858.',
    difficulty: 'Medium',
    examTag: 'IBPS PO / SBI Clerk',
    dateAdded: '2026-08-24'
  },
  {
    id: 'q-bank-02',
    section: 'General Awareness',
    topic: 'Economy & Banking Awareness',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'In banking and financial transactions, what is the maximum limit for insurance cover provided per depositor per insured bank by DICGC (Deposit Insurance and Credit Guarantee Corporation) in India?',
    options: [
      { id: 'a', text: '₹1 Lakh' },
      { id: 'b', text: '₹2 Lakh' },
      { id: 'c', text: '₹5 Lakh' },
      { id: 'd', text: '₹10 Lakh' }
    ],
    correctOptionId: 'c',
    explanation: 'DICGC, a wholly-owned subsidiary of the RBI, insures bank deposits (savings, fixed, current, recurring) up to a maximum limit of ₹5 Lakh for both principal and interest amount per depositor per bank.',
    difficulty: 'Easy',
    examTag: 'IBPS PO / SBI Clerk GA',
    dateAdded: '2026-08-24'
  },
  {
    id: 'q-bank-03',
    section: 'English Comprehension',
    topic: 'English Grammar & Vocab',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Identify the part of the sentence which contains a grammatical error:\n"(A) Neither the Branch Manager / (B) nor the loan officers / (C) was present in the meeting / (D) when the auditors arrived."',
    options: [
      { id: 'a', text: 'Part (A)' },
      { id: 'b', text: 'Part (B)' },
      { id: 'c', text: 'Part (C)' },
      { id: 'd', text: 'Part (D)' }
    ],
    correctOptionId: 'c',
    explanation: 'When two subjects are joined by "Neither... nor", the verb agrees in number with the subject closest to it. Here, "the loan officers" is plural, so the verb must be plural "were present", not "was present". Hence error is in Part (C).',
    difficulty: 'Medium',
    examTag: 'Banking English',
    dateAdded: '2026-08-24'
  },

  // --- Railways (RRB NTPC, Group D & JE) ---
  {
    id: 'q-rrb-01',
    section: 'General Science',
    topic: 'Physics & Daily Science',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'What happens to the resistance of a pure semiconductor material (such as Silicon or Germanium) when its temperature is increased?',
    options: [
      { id: 'a', text: 'Its resistance increases continuously' },
      { id: 'b', text: 'Its resistance decreases' },
      { id: 'c', text: 'Its resistance remains constant' },
      { id: 'd', text: 'Its resistance first increases then abruptly drops to zero' }
    ],
    correctOptionId: 'b',
    explanation: 'Semiconductors possess a negative temperature coefficient of resistance. As temperature rises, covalent bonds break releasing more free charge carriers (electrons and holes), which causes electrical conductivity to rise and resistance to decrease.',
    difficulty: 'Medium',
    examTag: 'RRB NTPC / Group D Science',
    dateAdded: '2026-08-25'
  },
  {
    id: 'q-rrb-02',
    section: 'General Science',
    topic: 'Biology & Life Sciences',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'Which organelle in a eukaryotic cell is known as the "Powerhouse of the Cell" responsible for producing ATP through cellular respiration?',
    options: [
      { id: 'a', text: 'Ribosome' },
      { id: 'b', text: 'Golgi Apparatus' },
      { id: 'c', text: 'Mitochondria' },
      { id: 'd', text: 'Lysosome' }
    ],
    correctOptionId: 'c',
    explanation: 'Mitochondria generate most of the chemical energy needed by biochemical reactions in the cell in the form of adenosine triphosphate (ATP), hence termed the powerhouse of the cell.',
    difficulty: 'Easy',
    examTag: 'RRB Group D / SSC MTS',
    dateAdded: '2026-08-25'
  },
  {
    id: 'q-rrb-03',
    section: 'General Awareness',
    topic: 'Current Events & Schemes',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'Where is the headquarters of the Central Railway Zone of Indian Railways located?',
    options: [
      { id: 'a', text: 'Churchgate, Mumbai' },
      { id: 'b', text: 'Chhatrapati Shivaji Maharaj Terminus (CSMT), Mumbai' },
      { id: 'c', text: 'Gorakhpur' },
      { id: 'd', text: 'Secunderabad' }
    ],
    correctOptionId: 'b',
    explanation: 'The headquarters of the Central Railway Zone is at Chhatrapati Shivaji Maharaj Terminus (CSMT) in Mumbai. Western Railway is headquartered at Churchgate, Mumbai; North Eastern at Gorakhpur; and South Central at Secunderabad.',
    difficulty: 'Easy',
    examTag: 'RRB NTPC CBT-1',
    dateAdded: '2026-08-25'
  },
  {
    id: 'q-rrb-04',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'Find the greatest 4-digit number which is exactly divisible by 15, 20, 24, and 32.',
    options: [
      { id: 'a', text: '9600' },
      { id: 'b', text: '9840' },
      { id: 'c', text: '9920' },
      { id: 'd', text: '9960' }
    ],
    correctOptionId: 'a',
    explanation: 'LCM of (15, 20, 24, 32):\n15 = 3 * 5\n20 = 2^2 * 5\n24 = 2^3 * 3\n32 = 2^5\nLCM = 2^5 * 3 * 5 = 32 * 15 = 480.\nGreatest 4-digit number = 9999.\n9999 / 480 = 20 with remainder 399.\nRequired number = 9999 - 399 = 9600.',
    difficulty: 'Medium',
    examTag: 'RRB NTPC / SSC CGL',
    dateAdded: '2026-08-26'
  },
  // --- Class 12 Aptitude Mock Test Official Questions (20 Questions) ---
  {
    id: 'q-c12-01',
    section: 'Verbal Ability',
    topic: 'English Comprehension & Grammar',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: "Choose the word most nearly OPPOSITE in meaning to 'RETICENT':",
    options: [
      { id: 'a', text: 'Talkative' },
      { id: 'b', text: 'Shy' },
      { id: 'c', text: 'Quiet' },
      { id: 'd', text: 'Modest' }
    ],
    correctOptionId: 'a',
    explanation: "'Reticent' means disposed to be silent, reserved, or hesitant in speech. The direct antonym is 'Talkative' (garrulous/loquacious).",
    difficulty: 'Easy',
    examTag: 'Class 12 Aptitude / CUET / IPMAT',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-02',
    section: 'Verbal Ability',
    topic: 'English Comprehension & Grammar',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'Fill in the blank with the appropriate phrasal verb:\nDespite the heavy rain, the match ______ as scheduled.',
    options: [
      { id: 'a', text: 'went ahead' },
      { id: 'b', text: 'goes ahead' },
      { id: 'c', text: 'going ahead' },
      { id: 'd', text: 'gone ahead' }
    ],
    correctOptionId: 'a',
    explanation: "'Despite the heavy rain' describes a past narrative setting. The past tense phrasal verb 'went ahead' (meaning proceeded or continued) correctly completes the clause.",
    difficulty: 'Easy',
    examTag: 'Class 12 Aptitude / CUET',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-03',
    section: 'Verbal Ability',
    topic: 'English Comprehension & Grammar',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'Choose the correctly punctuated sentence from the given options:',
    options: [
      { id: 'a', text: '"Where are you going?" she asked.' },
      { id: 'b', text: '"Where are you going" she asked?' },
      { id: 'c', text: 'Where are you going, she asked.' },
      { id: 'd', text: '"where are you going?" She asked.' }
    ],
    correctOptionId: 'a',
    explanation: "In direct speech quotation, the punctuation mark (question mark) sits inside the closing quotation marks, followed by lowercase attribution 'she asked.'",
    difficulty: 'Medium',
    examTag: 'Class 12 Aptitude / CUET',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-04',
    section: 'Verbal Ability',
    topic: 'English Comprehension & Grammar',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'Identify the sentence that follows correct subject-verb agreement:',
    options: [
      { id: 'a', text: 'Each of the students has submitted the assignment.' },
      { id: 'b', text: 'Each of the students have submitted the assignment.' },
      { id: 'c', text: 'Each of the student has submitted the assignment.' },
      { id: 'd', text: 'Each of the students submit the assignment.' }
    ],
    correctOptionId: 'a',
    explanation: "The distributive pronoun 'Each' takes a singular verb ('has submitted'). The noun after 'of the' must be plural ('students'). Hence, 'Each of the students has submitted the assignment' is grammatically correct.",
    difficulty: 'Medium',
    examTag: 'Class 12 Aptitude / CUET',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-05',
    section: 'Verbal Ability',
    topic: 'English Comprehension & Grammar',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: "Choose the word closest in meaning (synonym) to 'PRAGMATIC':",
    options: [
      { id: 'a', text: 'Practical' },
      { id: 'b', text: 'Idealistic' },
      { id: 'c', text: 'Emotional' },
      { id: 'd', text: 'Theoretical' }
    ],
    correctOptionId: 'a',
    explanation: "'Pragmatic' refers to dealing with things sensibly and realistically based on practical rather than theoretical considerations. Synonym: Practical.",
    difficulty: 'Easy',
    examTag: 'Class 12 Aptitude / IPMAT',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-06',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'If log 2 = 0.301, what is the numerical value of log 8?',
    options: [
      { id: 'a', text: '0.903' },
      { id: 'b', text: '0.602' },
      { id: 'c', text: '1.204' },
      { id: 'd', text: '0.301' }
    ],
    correctOptionId: 'a',
    explanation: 'Using logarithmic properties: log 8 = log(2³) = 3 × log 2 = 3 × 0.301 = 0.903.',
    difficulty: 'Easy',
    examTag: 'Class 12 Aptitude / IPMAT',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-07',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'A sum of money doubles itself in 10 years at simple interest. What is the rate of interest per annum?',
    options: [
      { id: 'a', text: '10%' },
      { id: 'b', text: '8%' },
      { id: 'c', text: '12%' },
      { id: 'd', text: '5%' }
    ],
    correctOptionId: 'a',
    explanation: 'Let Principal = P. Amount = 2P, so Simple Interest (SI) = 2P - P = P.\nSI = (P × R × T) / 100\nP = (P × R × 10) / 100\n1 = 10R / 100 => R = 10% per annum.',
    difficulty: 'Easy',
    examTag: 'Class 12 Aptitude / CUET',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-08',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'Two unbiased six-faced dice are thrown together. What is the probability of getting a sum equal to 8?',
    options: [
      { id: 'a', text: '5/36' },
      { id: 'b', text: '4/36 (1/9)' },
      { id: 'c', text: '6/36 (1/6)' },
      { id: 'd', text: '7/36' }
    ],
    correctOptionId: 'a',
    explanation: 'Total outcomes = 6 × 6 = 36.\nFavorable outcomes giving sum 8: (2,6), (3,5), (4,4), (5,3), (6,2) = 5 pairs.\nProbability = 5/36.',
    difficulty: 'Medium',
    examTag: 'Class 12 Aptitude / IPMAT',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-09',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'If the roots of the quadratic equation x² - 7x + 12 = 0 are added, what is the sum of the roots?',
    options: [
      { id: 'a', text: '7' },
      { id: 'b', text: '12' },
      { id: 'c', text: '5' },
      { id: 'd', text: '-7' }
    ],
    correctOptionId: 'a',
    explanation: 'For a quadratic equation ax² + bx + c = 0, the sum of roots is -b/a. Here a=1, b=-7, c=12. Sum of roots = -(-7)/1 = 7. (Roots are 3 and 4; 3 + 4 = 7).',
    difficulty: 'Easy',
    examTag: 'Class 12 Aptitude / CUET',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-10',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'The compound interest on ₹10,000 for 2 years at 10% per annum compounded annually is:',
    options: [
      { id: 'a', text: '₹2,100' },
      { id: 'b', text: '₹2,000' },
      { id: 'c', text: '₹2,200' },
      { id: 'd', text: '₹1,900' }
    ],
    correctOptionId: 'a',
    explanation: 'Amount A = P(1 + r/100)ᵗ = 10,000 × (1 + 10/100)² = 10,000 × 1.21 = ₹12,100.\nCompound Interest (CI) = A - P = 12,100 - 10,000 = ₹2,100.',
    difficulty: 'Medium',
    examTag: 'Class 12 Aptitude / CUET',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-11',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'If a car covers a distance in 5 hours at an average speed of 60 km/hr, how long will it take to cover the same distance at 75 km/hr?',
    options: [
      { id: 'a', text: '4 hours' },
      { id: 'b', text: '4.5 hours' },
      { id: 'c', text: '3.5 hours' },
      { id: 'd', text: '5 hours' }
    ],
    correctOptionId: 'a',
    explanation: 'Total Distance = Speed × Time = 60 km/hr × 5 hr = 300 km.\nNew Time at 75 km/hr = Distance / New Speed = 300 km / 75 km/hr = 4 hours.',
    difficulty: 'Easy',
    examTag: 'Class 12 Aptitude / CUET',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-12',
    section: 'Logical Reasoning',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: "In a certain code language, 'BOOK' is written as 'CPPL'. How is 'PAGE' written in that code?",
    options: [
      { id: 'a', text: 'QBHF' },
      { id: 'b', text: 'QBHE' },
      { id: 'c', text: 'PBHF' },
      { id: 'd', text: 'QCHF' }
    ],
    correctOptionId: 'a',
    explanation: "Pattern: Each letter is shifted by +1 forward in the English alphabet:\nB (+1) -> C, O (+1) -> P, O (+1) -> P, K (+1) -> L\nApplying same rule to 'PAGE':\nP (+1) -> Q\nA (+1) -> B\nG (+1) -> H\nE (+1) -> F\nResult: QBHF.",
    difficulty: 'Easy',
    examTag: 'Class 12 Aptitude / CUET',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-13',
    section: 'Logical Reasoning',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'Given the statements:\nStatements:\n1. All doctors are engineers.\n2. Some engineers are teachers.\nConclusion:\nSome doctors are teachers.\nEvaluate the validity of the conclusion:',
    options: [
      { id: 'a', text: 'Cannot be determined' },
      { id: 'b', text: 'Definitely True' },
      { id: 'c', text: 'Definitely False' },
      { id: 'd', text: 'Partially true' }
    ],
    correctOptionId: 'a',
    explanation: 'In syllogism: The middle term "engineers" is not distributed in either premise. The subset of engineers who are teachers may or may not overlap with doctors. Hence, the conclusion cannot be definitively established.',
    difficulty: 'Medium',
    examTag: 'Class 12 Aptitude / CUET',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-14',
    section: 'Logical Reasoning',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'Find the next missing number in the series:\n3, 8, 15, 24, 35, ?',
    options: [
      { id: 'a', text: '48' },
      { id: 'b', text: '46' },
      { id: 'c', text: '50' },
      { id: 'd', text: '45' }
    ],
    correctOptionId: 'a',
    explanation: 'Method 1: Differences between consecutive terms: 8-3 = 5, 15-8 = 7, 24-15 = 9, 35-24 = 11. Next difference = 13 => 35 + 13 = 48.\nMethod 2: n² - 1 series: 2²-1=3, 3²-1=8, 4²-1=15, 5²-1=24, 6²-1=35, 7²-1 = 49 - 1 = 48.',
    difficulty: 'Easy',
    examTag: 'Class 12 Aptitude / CUET',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-15',
    section: 'Logical Reasoning',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'Five people sit in a row. A is to the right of B but left of C. D is to the right of C, and E is at one end. If B is second from the left, who is at the extreme right?',
    options: [
      { id: 'a', text: 'D' },
      { id: 'b', text: 'C' },
      { id: 'c', text: 'E' },
      { id: 'd', text: 'Cannot be determined' }
    ],
    correctOptionId: 'c',
    explanation: 'Relative order from constraints: B < A < C < D. B is 2nd from left. With 5 seats and E at one end, E must be at the extreme right end.',
    difficulty: 'Medium',
    examTag: 'Class 12 Aptitude / CUET',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-16',
    section: 'Logical Reasoning',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: "A is twice as old as B was 5 years ago. If the difference between their present ages is 5 years, what is A's present age, given B is currently 20 years old?",
    options: [
      { id: 'a', text: '25 years' },
      { id: 'b', text: '30 years' },
      { id: 'c', text: '20 years' },
      { id: 'd', text: '35 years' }
    ],
    correctOptionId: 'a',
    explanation: "B's current age = 20 years. 5 years ago, B was 15. The difference between their present ages is 5 years: A - B = 25 - 20 = 5 years. Therefore, A's present age is 25 years.",
    difficulty: 'Medium',
    examTag: 'Class 12 Aptitude / CUET',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-17',
    section: 'General Knowledge',
    topic: 'Polity & Constitution',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'The Indian Parliament consists of the President, Lok Sabha, and:',
    options: [
      { id: 'a', text: 'Rajya Sabha' },
      { id: 'b', text: 'Supreme Court' },
      { id: 'c', text: 'State Legislative Assembly' },
      { id: 'd', text: 'Election Commission' }
    ],
    correctOptionId: 'a',
    explanation: 'According to Article 79 of the Constitution of India, the Parliament of the Union consists of the President and two Houses: the Council of States (Rajya Sabha) and the House of the People (Lok Sabha).',
    difficulty: 'Easy',
    examTag: 'Class 12 Aptitude / CUET',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-18',
    section: 'General Knowledge',
    topic: 'History & National Movement',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'Who was the first woman Prime Minister of India?',
    options: [
      { id: 'a', text: 'Indira Gandhi' },
      { id: 'b', text: 'Sarojini Naidu' },
      { id: 'c', text: 'Pratibha Patil' },
      { id: 'd', text: 'Sushma Swaraj' }
    ],
    correctOptionId: 'a',
    explanation: 'Smt. Indira Gandhi was the first and only woman Prime Minister of India, serving from January 1966 to March 1977 and again from January 1980 until October 1984.',
    difficulty: 'Easy',
    examTag: 'Class 12 Aptitude / CUET',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-19',
    section: 'General Knowledge',
    topic: 'Polity & Constitution',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'Which article of the Indian Constitution guarantees the fundamental Right to Equality before the law?',
    options: [
      { id: 'a', text: 'Article 14' },
      { id: 'b', text: 'Article 21' },
      { id: 'c', text: 'Article 19' },
      { id: 'd', text: 'Article 32' }
    ],
    correctOptionId: 'a',
    explanation: 'Article 14 of the Indian Constitution states that the State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
    difficulty: 'Easy',
    examTag: 'Class 12 Aptitude / CUET',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c12-20',
    section: 'General Knowledge',
    topic: 'Economy & Banking',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: "The 'Green Revolution' in India is primarily associated with an unprecedented surge in the agricultural production of:",
    options: [
      { id: 'a', text: 'Food grains (Wheat & Rice)' },
      { id: 'b', text: 'Milk & Dairy products' },
      { id: 'c', text: 'Fish & Marine exports' },
      { id: 'd', text: 'Cotton & Jute fibers' }
    ],
    correctOptionId: 'a',
    explanation: 'The Green Revolution, initiated in the mid-1960s with High-Yielding Variety (HYV) seeds and modern agronomy, primarily expanded food grain production, notably wheat and rice.',
    difficulty: 'Easy',
    examTag: 'Class 12 Aptitude / CUET',
    dateAdded: '2026-08-28'
  },
  // --- Class 10 Foundation Aptitude Official Questions (20 Questions) ---
  {
    id: 'q-c10-01',
    section: 'Verbal Ability',
    topic: 'English Comprehension & Grammar',
    examCategory: 'Class 10 Foundation Aptitude',
    text: "Choose the word most SIMILAR in meaning (synonym) to 'HONEST':",
    options: [
      { id: 'a', text: 'Sincere' },
      { id: 'b', text: 'Cunning' },
      { id: 'c', text: 'Lazy' },
      { id: 'd', text: 'Shy' }
    ],
    correctOptionId: 'a',
    explanation: "'Honest' means free of deceit and untruthfulness; sincere. 'Sincere' is the closest synonym.",
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-02',
    section: 'Verbal Ability',
    topic: 'English Comprehension & Grammar',
    examCategory: 'Class 10 Foundation Aptitude',
    text: "Choose the word OPPOSITE in meaning (antonym) to 'ANCIENT':",
    options: [
      { id: 'a', text: 'Modern' },
      { id: 'b', text: 'Old' },
      { id: 'c', text: 'Historic' },
      { id: 'd', text: 'Rare' }
    ],
    correctOptionId: 'a',
    explanation: "'Ancient' means belonging to the very distant past. The direct antonym is 'Modern' (current or contemporary).",
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-03',
    section: 'Verbal Ability',
    topic: 'English Comprehension & Grammar',
    examCategory: 'Class 10 Foundation Aptitude',
    text: 'Fill in the blank with the correct verb form:\nShe ______ to school every day.',
    options: [
      { id: 'a', text: 'walks' },
      { id: 'b', text: 'walk' },
      { id: 'c', text: 'walking' },
      { id: 'd', text: 'walked' }
    ],
    correctOptionId: 'a',
    explanation: "'Every day' indicates a regular habitual action requiring the Simple Present Tense. With third-person singular subject 'She', the singular verb 'walks' is required.",
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-04',
    section: 'Verbal Ability',
    topic: 'English Comprehension & Grammar',
    examCategory: 'Class 10 Foundation Aptitude',
    text: 'Identify the correctly spelt word from the given options:',
    options: [
      { id: 'a', text: 'Necessary' },
      { id: 'b', text: 'Neccessary' },
      { id: 'c', text: 'Necesary' },
      { id: 'd', text: 'Neccesary' }
    ],
    correctOptionId: 'a',
    explanation: "The correct spelling is 'Necessary' (one 'c' and double 's').",
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-05',
    section: 'Verbal Ability',
    topic: 'English Comprehension & Grammar',
    examCategory: 'Class 10 Foundation Aptitude',
    text: "Choose the correct meaning of the common English idiom 'to break the ice':",
    options: [
      { id: 'a', text: 'To start a conversation in a social setting' },
      { id: 'b', text: 'To end a friendship permanently' },
      { id: 'c', text: 'To cause a heated argument' },
      { id: 'd', text: 'To finish a task quickly' }
    ],
    correctOptionId: 'a',
    explanation: "'To break the ice' means to do or say something that relieves tension and gets conversation started in an unfamiliar social situation.",
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-06',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Class 10 Foundation Aptitude',
    text: 'If a train travels a distance of 60 km in 1.5 hours, what is its speed in km/hr?',
    options: [
      { id: 'a', text: '40 km/hr' },
      { id: 'b', text: '45 km/hr' },
      { id: 'c', text: '35 km/hr' },
      { id: 'd', text: '50 km/hr' }
    ],
    correctOptionId: 'a',
    explanation: 'Speed = Distance / Time = 60 km / 1.5 hr = 60 / (3/2) = (60 × 2) / 3 = 40 km/hr.',
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-07',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Class 10 Foundation Aptitude',
    text: 'Simplify the arithmetic expression: 15% of 200 + 25% of 80.',
    options: [
      { id: 'a', text: '50' },
      { id: 'b', text: '45' },
      { id: 'c', text: '55' },
      { id: 'd', text: '40' }
    ],
    correctOptionId: 'a',
    explanation: '15% of 200 = (15 / 100) × 200 = 30.\n25% of 80 = (25 / 100) × 80 = (1/4) × 80 = 20.\nSum = 30 + 20 = 50.',
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-08',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Class 10 Foundation Aptitude',
    text: 'The sum of three consecutive natural numbers is 72. What is the largest number among them?',
    options: [
      { id: 'a', text: '25' },
      { id: 'b', text: '24' },
      { id: 'c', text: '26' },
      { id: 'd', text: '23' }
    ],
    correctOptionId: 'a',
    explanation: 'Let the three consecutive integers be n, n+1, and n+2.\nSum = n + (n+1) + (n+2) = 3n + 3 = 72.\n3n = 69 => n = 23.\nThe numbers are 23, 24, and 25. The largest number is 25.',
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-09',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Class 10 Foundation Aptitude',
    text: 'If the ratio of two numbers is 3:5 and their sum is 64, find the value of the larger number.',
    options: [
      { id: 'a', text: '40' },
      { id: 'b', text: '36' },
      { id: 'c', text: '24' },
      { id: 'd', text: '45' }
    ],
    correctOptionId: 'a',
    explanation: 'Let the numbers be 3x and 5x.\n3x + 5x = 8x = 64 => x = 8.\nSmaller number = 3 × 8 = 24.\nLarger number = 5 × 8 = 40.',
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-10',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Class 10 Foundation Aptitude',
    text: 'A shopkeeper buys an article for ₹400 and sells it for ₹460. What is his profit percentage?',
    options: [
      { id: 'a', text: '15%' },
      { id: 'b', text: '12%' },
      { id: 'c', text: '10%' },
      { id: 'd', text: '20%' }
    ],
    correctOptionId: 'a',
    explanation: 'Cost Price (CP) = ₹400, Selling Price (SP) = ₹460.\nProfit = SP - CP = 460 - 400 = ₹60.\nProfit % = (Profit / CP) × 100 = (60 / 400) × 100 = 15%.',
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-11',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Class 10 Foundation Aptitude',
    text: 'Solve for x in the linear equation: 3x + 7 = 22.',
    options: [
      { id: 'a', text: '5' },
      { id: 'b', text: '4' },
      { id: 'c', text: '6' },
      { id: 'd', text: '7' }
    ],
    correctOptionId: 'a',
    explanation: '3x + 7 = 22\n3x = 22 - 7\n3x = 15\nx = 15 / 3 = 5.',
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-12',
    section: 'Logical Reasoning',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Class 10 Foundation Aptitude',
    text: 'Find the odd one out from the given group of words: Apple, Mango, Potato, Banana.',
    options: [
      { id: 'a', text: 'Potato' },
      { id: 'b', text: 'Apple' },
      { id: 'c', text: 'Mango' },
      { id: 'd', text: 'Banana' }
    ],
    correctOptionId: 'a',
    explanation: 'Apple, Mango, and Banana are fruits growing above ground on trees/plants. Potato is an underground tuber / vegetable.',
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-13',
    section: 'Logical Reasoning',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Class 10 Foundation Aptitude',
    text: 'Complete the geometric progression series:\n2, 4, 8, 16, ?',
    options: [
      { id: 'a', text: '32' },
      { id: 'b', text: '28' },
      { id: 'c', text: '30' },
      { id: 'd', text: '24' }
    ],
    correctOptionId: 'a',
    explanation: 'Each consecutive term is multiplied by 2 (powers of 2): 2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵ = 32.',
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-14',
    section: 'Logical Reasoning',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Class 10 Foundation Aptitude',
    text: "In a certain code, 'CAT' is coded as 'DBU'. How is 'DOG' coded in that same system?",
    options: [
      { id: 'a', text: 'EPH' },
      { id: 'b', text: 'EPI' },
      { id: 'c', text: 'FPH' },
      { id: 'd', text: 'EOH' }
    ],
    correctOptionId: 'a',
    explanation: 'Rule: Shift each character by +1 in alphabetical order:\nC (+1) = D, A (+1) = B, T (+1) = U.\nFor "DOG":\nD (+1) = E\nO (+1) = P\nG (+1) = H\nResult: EPH.',
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-15',
    section: 'Logical Reasoning',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Class 10 Foundation Aptitude',
    text: "Pointing to a boy, a woman says, 'He is the son of my mother's only daughter.' How is the boy related to the woman?",
    options: [
      { id: 'a', text: 'Son' },
      { id: 'b', text: 'Nephew' },
      { id: 'c', text: 'Brother' },
      { id: 'd', text: 'Cousin' }
    ],
    correctOptionId: 'a',
    explanation: "'My mother's only daughter' for a woman refers to the woman herself. Therefore, the boy is the woman's Son.",
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-16',
    section: 'Logical Reasoning',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Class 10 Foundation Aptitude',
    text: 'Which number will complete the following sequence?\n5, 10, 20, 40, ?',
    options: [
      { id: 'a', text: '80' },
      { id: 'b', text: '60' },
      { id: 'c', text: '70' },
      { id: 'd', text: '45' }
    ],
    correctOptionId: 'a',
    explanation: 'Each number in the sequence doubles the previous number: 5 × 2 = 10, 10 × 2 = 20, 20 × 2 = 40, 40 × 2 = 80.',
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-17',
    section: 'General Knowledge',
    topic: 'Polity & Constitution',
    examCategory: 'Class 10 Foundation Aptitude',
    text: "Who is widely revered as the 'Father of the Indian Constitution'?",
    options: [
      { id: 'a', text: 'Dr. B. R. Ambedkar' },
      { id: 'b', text: 'Mahatma Gandhi' },
      { id: 'c', text: 'Jawaharlal Nehru' },
      { id: 'd', text: 'Sardar Vallabhbhai Patel' }
    ],
    correctOptionId: 'a',
    explanation: 'Dr. Bhimrao Ramji Ambedkar served as the Chairman of the Drafting Committee of the Constituent Assembly and is recognized as the chief architect and Father of the Constitution of India.',
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-18',
    section: 'General Knowledge',
    topic: 'Geography & Environment',
    examCategory: 'Class 10 Foundation Aptitude',
    text: 'Which is the longest river flowing entirely or primarily within India?',
    options: [
      { id: 'a', text: 'Ganga (2,525 km)' },
      { id: 'b', text: 'Yamuna' },
      { id: 'c', text: 'Godavari' },
      { id: 'd', text: 'Narmada' }
    ],
    correctOptionId: 'a',
    explanation: 'The Ganga is the longest river in India, flowing for 2,525 km from the Gangotri Glacier in the Himalayas to the Bay of Bengal.',
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-19',
    section: 'General Knowledge',
    topic: 'Science & Technology',
    examCategory: 'Class 10 Foundation Aptitude',
    text: 'The fundamental biological process by which green plants synthesize glucose using sunlight, water, and carbon dioxide is called:',
    options: [
      { id: 'a', text: 'Photosynthesis' },
      { id: 'b', text: 'Cellular Respiration' },
      { id: 'c', text: 'Transpiration' },
      { id: 'd', text: 'Digestion' }
    ],
    correctOptionId: 'a',
    explanation: 'Photosynthesis is the process in which chlorophyll-bearing green plants convert light energy, carbon dioxide (CO₂), and water (H₂O) into glucose and oxygen (O₂).',
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  },
  {
    id: 'q-c10-20',
    section: 'General Knowledge',
    topic: 'Geography & Environment',
    examCategory: 'Class 10 Foundation Aptitude',
    text: "Which chemical gas is the most abundant by volume in the Earth's atmosphere?",
    options: [
      { id: 'a', text: 'Nitrogen (~78%)' },
      { id: 'b', text: 'Oxygen (~21%)' },
      { id: 'c', text: 'Carbon Dioxide (~0.04%)' },
      { id: 'd', text: 'Hydrogen' }
    ],
    correctOptionId: 'a',
    explanation: "Nitrogen (N₂) makes up approximately 78.08% of Earth's atmosphere by volume, followed by Oxygen (20.95%), Argon (0.93%), and Carbon Dioxide (0.04%).",
    difficulty: 'Easy',
    examTag: 'Class 10 NTSE / Foundation',
    dateAdded: '2026-08-28'
  }
];

export const SEED_QUESTIONS: Question[] = [...BASE_SEED_QUESTIONS, ...ALL_NEW_QUESTIONS];

const BASE_MOCK_TESTS: MockTest[] = [
  {
    id: 'mock-upsc-prelims-2026',
    title: 'UPSC Civil Services Prelims Mock Exam 2026 (GS Paper-1)',
    subtitle: 'Full-length All India Prelims Simulation covering Polity, Modern History, Economy, Environment & Current Affairs',
    examCategory: 'UPSC Civil Services',
    totalQuestions: 10,
    overallTimeLimitMinutes: 20, // 20 mins for demo drill
    marksPerQuestion: 2.0,
    negativeMarksPerQuestion: 0.66,
    overallCutoffMarks: 12.0,
    categoryCutoffs: {
      UR: 12.0,
      OBC: 11.0,
      EWS: 10.5,
      SC: 9.0,
      ST: 8.0
    },
    sections: [
      {
        id: 'sec-gs-1',
        section: 'General Studies',
        questionIds: ['q-upsc-01', 'q-upsc-02', 'q-upsc-03', 'q-upsc-04'],
        timeLimitMinutes: 10,
        cutoffMarks: 4.0
      },
      {
        id: 'sec-gs-2',
        section: 'General Awareness',
        questionIds: ['q-bank-02', 'q-rrb-03'],
        timeLimitMinutes: 5,
        cutoffMarks: 2.0
      },
      {
        id: 'sec-gs-3',
        section: 'General Science',
        questionIds: ['q-rrb-01', 'q-rrb-02'],
        timeLimitMinutes: 5,
        cutoffMarks: 2.0
      }
    ],
    questions: [
      SEED_QUESTIONS[0], // q-upsc-01
      SEED_QUESTIONS[1], // q-upsc-02
      SEED_QUESTIONS[2], // q-upsc-03
      SEED_QUESTIONS[3], // q-upsc-04
      SEED_QUESTIONS[10], // q-bank-02
      SEED_QUESTIONS[12], // q-rrb-01
      SEED_QUESTIONS[13], // q-rrb-02
      SEED_QUESTIONS[14], // q-rrb-03
      SEED_QUESTIONS[4], // q-ssc-01
      SEED_QUESTIONS[6]  // q-ssc-03
    ],
    isPopular: true
  },
  {
    id: 'mock-ssc-cgl-2026',
    title: 'SSC CGL Tier-1 All India Grand Mock Test 2026',
    subtitle: 'Standard pattern test with Quantitative Aptitude, Logical Reasoning, General Awareness, and English Comprehension',
    examCategory: 'SSC (CGL/CHSL/MTS)',
    totalQuestions: 10,
    overallTimeLimitMinutes: 15,
    marksPerQuestion: 2.0,
    negativeMarksPerQuestion: 0.50,
    overallCutoffMarks: 13.0,
    categoryCutoffs: {
      UR: 13.0,
      OBC: 12.0,
      EWS: 11.5,
      SC: 9.5,
      ST: 8.5
    },
    sections: [
      {
        id: 'sec-ssc-qa',
        section: 'Quantitative Aptitude',
        questionIds: ['q-ssc-01', 'q-ssc-02', 'q-rrb-04'],
        timeLimitMinutes: 5,
        cutoffMarks: 3.0
      },
      {
        id: 'sec-ssc-reas',
        section: 'Reasoning & Logical Intelligence',
        questionIds: ['q-ssc-03', 'q-ssc-04'],
        timeLimitMinutes: 4,
        cutoffMarks: 2.5
      },
      {
        id: 'sec-ssc-eng',
        section: 'English Comprehension',
        questionIds: ['q-ssc-05', 'q-bank-03'],
        timeLimitMinutes: 3,
        cutoffMarks: 2.0
      },
      {
        id: 'sec-ssc-ga',
        section: 'General Awareness',
        questionIds: ['q-upsc-02', 'q-bank-02', 'q-rrb-03'],
        timeLimitMinutes: 3,
        cutoffMarks: 2.5
      }
    ],
    questions: [
      SEED_QUESTIONS[4], // q-ssc-01
      SEED_QUESTIONS[5], // q-ssc-02
      SEED_QUESTIONS[6], // q-ssc-03
      SEED_QUESTIONS[7], // q-ssc-04
      SEED_QUESTIONS[8], // q-ssc-05
      SEED_QUESTIONS[11], // q-bank-03
      SEED_QUESTIONS[1], // q-upsc-02
      SEED_QUESTIONS[10], // q-bank-02
      SEED_QUESTIONS[14], // q-rrb-03
      SEED_QUESTIONS[15]  // q-rrb-04
    ],
    isPopular: true
  },
  {
    id: 'mock-banking-ibps-2026',
    title: 'Banking IBPS PO & SBI Prelims Speed Booster Mock 2026',
    subtitle: 'Section-timed test designed for Banking aspirants with Quantitative Aptitude, DI, Reasoning & English',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    totalQuestions: 8,
    overallTimeLimitMinutes: 12,
    marksPerQuestion: 1.0,
    negativeMarksPerQuestion: 0.25,
    overallCutoffMarks: 5.5,
    categoryCutoffs: {
      UR: 5.5,
      OBC: 5.0,
      EWS: 4.8,
      SC: 4.0,
      ST: 3.5
    },
    sections: [
      {
        id: 'sec-bank-qa',
        section: 'Quantitative Aptitude',
        questionIds: ['q-bank-01', 'q-ssc-01', 'q-ssc-02'],
        timeLimitMinutes: 4,
        cutoffMarks: 2.0
      },
      {
        id: 'sec-bank-reas',
        section: 'Reasoning & Logical Intelligence',
        questionIds: ['q-ssc-03', 'q-ssc-04'],
        timeLimitMinutes: 4,
        cutoffMarks: 1.5
      },
      {
        id: 'sec-bank-eng',
        section: 'English Comprehension',
        questionIds: ['q-bank-03', 'q-ssc-05'],
        timeLimitMinutes: 4,
        cutoffMarks: 1.5
      }
    ],
    questions: [
      SEED_QUESTIONS[9], // q-bank-01
      SEED_QUESTIONS[4], // q-ssc-01
      SEED_QUESTIONS[5], // q-ssc-02
      SEED_QUESTIONS[6], // q-ssc-03
      SEED_QUESTIONS[7], // q-ssc-04
      SEED_QUESTIONS[11], // q-bank-03
      SEED_QUESTIONS[8], // q-ssc-05
      SEED_QUESTIONS[10] // q-bank-02
    ],
    isPopular: true
  },
  {
    id: 'mock-rrb-ntpc-2026',
    title: 'RRB NTPC CBT-1 & Group D Railway Exam All-India Mock Test',
    subtitle: 'Authentic 90-minute format simulation with -1/3rd negative marking penalty and science focus',
    examCategory: 'Railways (RRB NTPC/Group D)',
    totalQuestions: 10,
    overallTimeLimitMinutes: 15,
    marksPerQuestion: 1.0,
    negativeMarksPerQuestion: 0.33,
    overallCutoffMarks: 6.5,
    categoryCutoffs: {
      UR: 6.5,
      OBC: 5.8,
      EWS: 5.5,
      SC: 4.5,
      ST: 4.0
    },
    sections: [
      {
        id: 'sec-rrb-math',
        section: 'Quantitative Aptitude',
        questionIds: ['q-ssc-01', 'q-ssc-02', 'q-rrb-04'],
        timeLimitMinutes: 5,
        cutoffMarks: 2.0
      },
      {
        id: 'sec-rrb-sci',
        section: 'General Science',
        questionIds: ['q-rrb-01', 'q-rrb-02'],
        timeLimitMinutes: 3,
        cutoffMarks: 1.5
      },
      {
        id: 'sec-rrb-ga',
        section: 'General Awareness',
        questionIds: ['q-rrb-03', 'q-bank-02', 'q-upsc-02'],
        timeLimitMinutes: 4,
        cutoffMarks: 2.0
      },
      {
        id: 'sec-rrb-reas',
        section: 'Reasoning & Logical Intelligence',
        questionIds: ['q-ssc-03', 'q-ssc-04'],
        timeLimitMinutes: 3,
        cutoffMarks: 1.5
      }
    ],
    questions: [
      SEED_QUESTIONS[4], // q-ssc-01
      SEED_QUESTIONS[5], // q-ssc-02
      SEED_QUESTIONS[15], // q-rrb-04
      SEED_QUESTIONS[12], // q-rrb-01
      SEED_QUESTIONS[13], // q-rrb-02
      SEED_QUESTIONS[14], // q-rrb-03
      SEED_QUESTIONS[10], // q-bank-02
      SEED_QUESTIONS[1], // q-upsc-02
      SEED_QUESTIONS[6], // q-ssc-03
      SEED_QUESTIONS[7]  // q-ssc-04
    ],
    isPopular: true
  },
  {
    id: 'mock-ca-speed-drill',
    title: 'Daily Current Affairs & Static GK Express Speed Drill',
    subtitle: 'Quick 10-minute revision test covering the latest national news, economy, space missions, and appointments',
    examCategory: 'General Studies & Science',
    totalQuestions: 6,
    overallTimeLimitMinutes: 8,
    marksPerQuestion: 1.0,
    negativeMarksPerQuestion: 0.25,
    overallCutoffMarks: 4.0,
    categoryCutoffs: {
      UR: 4.0,
      OBC: 3.5,
      EWS: 3.2,
      SC: 2.8,
      ST: 2.5
    },
    sections: [
      {
        id: 'sec-ca-drill',
        section: 'General Awareness',
        questionIds: ['q-upsc-04', 'q-bank-02', 'q-rrb-03'],
        timeLimitMinutes: 4,
        cutoffMarks: 2.0
      },
      {
        id: 'sec-ca-sci',
        section: 'General Science',
        questionIds: ['q-rrb-01', 'q-rrb-02', 'q-upsc-03'],
        timeLimitMinutes: 4,
        cutoffMarks: 2.0
      }
    ],
    questions: [
      SEED_QUESTIONS[3], // q-upsc-04
      SEED_QUESTIONS[10], // q-bank-02
      SEED_QUESTIONS[14], // q-rrb-03
      SEED_QUESTIONS[12], // q-rrb-01
      SEED_QUESTIONS[13], // q-rrb-02
      SEED_QUESTIONS[2]  // q-upsc-03
    ],
    isPopular: false
  },
  {
    id: 'mock-class12-aptitude-2026',
    title: 'Class 12 Comprehensive Aptitude & College Entrance Mock Test 2026',
    subtitle: 'Full 20-question official syllabus simulation with Verbal, Quantitative, Logical Reasoning & GK with sectional timings',
    examCategory: 'Class 12 Aptitude & Entrance',
    totalQuestions: 20,
    overallTimeLimitMinutes: 50,
    marksPerQuestion: 1.0,
    negativeMarksPerQuestion: 0.25,
    overallCutoffMarks: 14.0,
    categoryCutoffs: {
      UR: 14.0,
      OBC: 12.5,
      EWS: 12.0,
      SC: 10.0,
      ST: 9.0
    },
    sections: [
      {
        id: 'sec-c12-verbal',
        section: 'Verbal Ability',
        questionIds: ['q-c12-01', 'q-c12-02', 'q-c12-03', 'q-c12-04', 'q-c12-05'],
        timeLimitMinutes: 12,
        cutoffMarks: 3.5
      },
      {
        id: 'sec-c12-quant',
        section: 'Quantitative Aptitude',
        questionIds: ['q-c12-06', 'q-c12-07', 'q-c12-08', 'q-c12-09', 'q-c12-10', 'q-c12-11'],
        timeLimitMinutes: 18,
        cutoffMarks: 4.0
      },
      {
        id: 'sec-c12-logic',
        section: 'Logical Reasoning',
        questionIds: ['q-c12-12', 'q-c12-13', 'q-c12-14', 'q-c12-15', 'q-c12-16'],
        timeLimitMinutes: 12,
        cutoffMarks: 3.5
      },
      {
        id: 'sec-c12-gk',
        section: 'General Knowledge',
        questionIds: ['q-c12-17', 'q-c12-18', 'q-c12-19', 'q-c12-20'],
        timeLimitMinutes: 8,
        cutoffMarks: 3.0
      }
    ],
    questions: SEED_QUESTIONS.filter(q => q.examCategory === 'Class 12 Aptitude & Entrance'),
    isPopular: true
  },
  {
    id: 'mock-class10-aptitude-2026',
    title: 'Class 10 Foundation Aptitude & NTSE Scholarship Mock Test 2026',
    subtitle: 'Standard 20-question foundation pattern test with Verbal, Quantitative, Logical Reasoning & General Science/GK',
    examCategory: 'Class 10 Foundation Aptitude',
    totalQuestions: 20,
    overallTimeLimitMinutes: 45,
    marksPerQuestion: 1.0,
    negativeMarksPerQuestion: 0.25,
    overallCutoffMarks: 13.5,
    categoryCutoffs: {
      UR: 13.5,
      OBC: 12.0,
      EWS: 11.5,
      SC: 9.5,
      ST: 8.5
    },
    sections: [
      {
        id: 'sec-c10-verbal',
        section: 'Verbal Ability',
        questionIds: ['q-c10-01', 'q-c10-02', 'q-c10-03', 'q-c10-04', 'q-c10-05'],
        timeLimitMinutes: 10,
        cutoffMarks: 3.5
      },
      {
        id: 'sec-c10-quant',
        section: 'Quantitative Aptitude',
        questionIds: ['q-c10-06', 'q-c10-07', 'q-c10-08', 'q-c10-09', 'q-c10-10', 'q-c10-11'],
        timeLimitMinutes: 15,
        cutoffMarks: 4.0
      },
      {
        id: 'sec-c10-logic',
        section: 'Logical Reasoning',
        questionIds: ['q-c10-12', 'q-c10-13', 'q-c10-14', 'q-c10-15', 'q-c10-16'],
        timeLimitMinutes: 12,
        cutoffMarks: 3.5
      },
      {
        id: 'sec-c10-gk',
        section: 'General Knowledge',
        questionIds: ['q-c10-17', 'q-c10-18', 'q-c10-19', 'q-c10-20'],
        timeLimitMinutes: 8,
        cutoffMarks: 2.5
      }
    ],
    questions: SEED_QUESTIONS.filter(q => q.examCategory === 'Class 10 Foundation Aptitude'),
    isPopular: true
  }
];

export const INITIAL_MOCK_TESTS: MockTest[] = [...BASE_MOCK_TESTS, ...ALL_NEW_MOCK_TESTS];

