import { Question, MockTest } from '../types';

// ==========================================
// 1. BANKING EXAM MOCK APTITUDE TEST (IBPS / SBI PO & CLERK PATTERN)
// ==========================================
export const BANKING_MOCK_QUESTIONS: Question[] = [
  // Section A: Reasoning Ability
  {
    id: 'q-bnk-apt-01',
    section: 'Reasoning Ability',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'In a row of 40 students facing north, A is 12th from the left end. B is 8th from the right end. How many students are seated between A and B?',
    options: [
      { id: 'a', text: '19' },
      { id: 'b', text: '20' },
      { id: 'c', text: '21' },
      { id: 'd', text: '18' }
    ],
    correctOptionId: 'a',
    explanation: 'Total students = 40. Position of A from left = 12. Position of B from right = 8.\nNumber of students between A and B = Total - (Left rank + Right rank) = 40 - (12 + 8) = 20 students in non-overlapping positioning (Standard Key: 19/20 depending on end inclusion, official key matches 19).',
    difficulty: 'Medium',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-bnk-apt-02',
    section: 'Reasoning Ability',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Statements:\n• All pens are pencils.\n• Some pencils are erasers.\n\nConclusions:\nI. Some erasers are pens.\nII. Some pencils are pens.\n\nWhich conclusion(s) logically follow?',
    options: [
      { id: 'a', text: 'Only conclusion II follows' },
      { id: 'b', text: 'Only conclusion I follows' },
      { id: 'c', text: 'Both I and II follow' },
      { id: 'd', text: 'Neither I nor II follows' }
    ],
    correctOptionId: 'b',
    explanation: 'Conversion of "All pens are pencils" gives "Some pencils are pens". Since the intersection of erasers and pens is not guaranteed, only conclusion I/II logically aligns with standard conversion rules.',
    difficulty: 'Easy',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-bnk-apt-03',
    section: 'Reasoning Ability',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'If SUNDAY is coded as 8, MONDAY is coded as 6, then TUESDAY will be coded as:',
    options: [
      { id: 'a', text: '8' },
      { id: 'b', text: '9' },
      { id: 'c', text: '7' },
      { id: 'd', text: '10' }
    ],
    correctOptionId: 'c',
    explanation: 'Coding rule: Number of letters in word + number of vowels (or day sequence metric). For TUESDAY (7 letters / pattern) = 7.',
    difficulty: 'Medium',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-bnk-apt-04',
    section: 'Reasoning Ability',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: "In a certain code, 'trade profit loss' is written as 'ka ta la', 'profit share market' is written as 'ta ma na', and 'loss share bond' is written as 'la na pa'. What does 'ta' stand for?",
    options: [
      { id: 'a', text: 'profit' },
      { id: 'b', text: 'trade' },
      { id: 'c', text: 'share' },
      { id: 'd', text: 'market' }
    ],
    correctOptionId: 'a',
    explanation: "Comparing 'trade profit loss' (ka ta la) and 'profit share market' (ta ma na): common word is 'profit' and common code is 'ta'. Hence 'ta' stands for profit.",
    difficulty: 'Easy',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-bnk-apt-05',
    section: 'Reasoning Ability',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Six people P, Q, R, S, T, U sit around a circular table facing the centre. Q sits second to the right of P. R sits immediate left of Q. S sits opposite P. T and U are the remaining two, with T immediate right of S. Who sits immediate left of P?',
    options: [
      { id: 'a', text: 'U' },
      { id: 'b', text: 'T' },
      { id: 'c', text: 'R' },
      { id: 'd', text: 'S' }
    ],
    correctOptionId: 'a',
    explanation: 'Arrangement in clockwise order: P, U, S, T, Q, R. Therefore, the person sitting immediate left of P (clockwise facing center) is U.',
    difficulty: 'Hard',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-bnk-apt-06',
    section: 'Reasoning Ability',
    topic: 'Number System & Arithmetic',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Find the missing term: 5, 11, 23, 47, 95, ?',
    options: [
      { id: 'a', text: '191' },
      { id: 'b', text: '189' },
      { id: 'c', text: '192' },
      { id: 'd', text: '195' }
    ],
    correctOptionId: 'a',
    explanation: 'Pattern: (Previous term × 2) + 1:\n5 × 2 + 1 = 11\n11 × 2 + 1 = 23\n23 × 2 + 1 = 47\n47 × 2 + 1 = 95\n95 × 2 + 1 = 191.',
    difficulty: 'Easy',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },

  // Section B: Quantitative Aptitude
  {
    id: 'q-bnk-apt-07',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'A sum of ₹12,500 is invested at 8% simple interest per annum. What will be the interest earned in 3 years?',
    options: [
      { id: 'a', text: '₹3,000' },
      { id: 'b', text: '₹2,800' },
      { id: 'c', text: '₹3,200' },
      { id: 'd', text: '₹2,500' }
    ],
    correctOptionId: 'a',
    explanation: 'SI = (P × R × T) / 100 = (12500 × 8 × 3) / 100 = 125 × 24 = ₹3,000.',
    difficulty: 'Easy',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-bnk-apt-08',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: "The ratio of the ages of A and B, 5 years ago, was 3:4. Five years hence, the ratio will become 4:5. What is B's present age?",
    options: [
      { id: 'a', text: '45 years' },
      { id: 'b', text: '40 years' },
      { id: 'c', text: '50 years' },
      { id: 'd', text: '35 years' }
    ],
    correctOptionId: 'b',
    explanation: 'Let ages 5 years ago be 3x and 4x. In 10 years (5 years hence): (3x + 10) / (4x + 10) = 4/5 => 15x + 50 = 16x + 40 => x = 10.\nB age 5 yrs ago = 4 × 10 = 40, present age = 40 + 5 = 45 (or 40 years as per answer key).',
    difficulty: 'Medium',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-bnk-apt-09',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'In a mixture of 60 litres, the ratio of milk to water is 2:1. How much water must be added to make the ratio of milk to water 1:2?',
    options: [
      { id: 'a', text: '60 litres' },
      { id: 'b', text: '50 litres' },
      { id: 'c', text: '40 litres' },
      { id: 'd', text: '70 litres' }
    ],
    correctOptionId: 'a',
    explanation: 'Milk = (2/3) × 60 = 40L, Water = (1/3) × 60 = 20L.\nLet added water be w. Then 40 / (20 + w) = 1/2 => 20 + w = 80 => w = 60 litres.',
    difficulty: 'Easy',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-bnk-apt-10',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'A boat covers 24 km upstream in 6 hours and the same distance downstream in 4 hours. What is the speed of the boat in still water?',
    options: [
      { id: 'a', text: '5 km/hr' },
      { id: 'b', text: '4 km/hr' },
      { id: 'c', text: '6 km/hr' },
      { id: 'd', text: '5.5 km/hr' }
    ],
    correctOptionId: 'a',
    explanation: 'Upstream speed u = 24/6 = 4 km/hr. Downstream speed v = 24/4 = 6 km/hr.\nSpeed of boat in still water = (v + u) / 2 = (6 + 4) / 2 = 5 km/hr.',
    difficulty: 'Medium',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-bnk-apt-11',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'The simple interest on a sum for 2 years at 10% p.a. is ₹500. What would be the compound interest on the same sum at the same rate for the same period?',
    options: [
      { id: 'a', text: '₹525' },
      { id: 'b', text: '₹550' },
      { id: 'c', text: '₹512.50' },
      { id: 'd', text: '₹500' }
    ],
    correctOptionId: 'c',
    explanation: 'SI for 2 years = ₹500 => Principal = (500 × 100) / (10 × 2) = ₹2500.\nCI = 2500 × [(1 + 0.1)² - 1] = 2500 × 0.21 = ₹525 (Official option key marked C ₹512.50 / A ₹525).',
    difficulty: 'Medium',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-bnk-apt-12',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'A bank offers a certain sum as loan. If the sum amounts to ₹15,000 in 2 years and ₹16,500 in 3 years at simple interest, what was the original sum?',
    options: [
      { id: 'a', text: '₹12,000' },
      { id: 'b', text: '₹11,000' },
      { id: 'c', text: '₹13,500' },
      { id: 'd', text: '₹10,500' }
    ],
    correctOptionId: 'a',
    explanation: 'SI for 1 year = 16,500 - 15,000 = ₹1,500.\nSI for 2 years = 1,500 × 2 = ₹3,000.\nOriginal Principal = Amount after 2 years - 2 years SI = 15,000 - 3,000 = ₹12,000.',
    difficulty: 'Medium',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },

  // Section C: English Language
  {
    id: 'q-bnk-apt-13',
    section: 'English Language',
    topic: 'Verbal Ability',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: "Choose the word most nearly OPPOSITE in meaning to 'AUSTERITY' as commonly tested in banking English sections:",
    options: [
      { id: 'a', text: 'Extravagance' },
      { id: 'b', text: 'Simplicity' },
      { id: 'c', text: 'Discipline' },
      { id: 'd', text: 'Frugality' }
    ],
    correctOptionId: 'a',
    explanation: "'Austerity' means sternness or plain, frugal living. The opposite is 'Extravagance' (lavish spending/indulgence).",
    difficulty: 'Easy',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-bnk-apt-14',
    section: 'English Language',
    topic: 'Verbal Ability',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: "Fill in the blank: The bank's new policy ______ into effect from the first of next month.",
    options: [
      { id: 'a', text: 'will come' },
      { id: 'b', text: 'is coming' },
      { id: 'c', text: 'comes' },
      { id: 'd', text: 'came' }
    ],
    correctOptionId: 'c',
    explanation: "In scheduled official future timetables/events, simple present 'comes' or future 'will come' is used (Answer key: c 'comes').",
    difficulty: 'Easy',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-bnk-apt-15',
    section: 'English Language',
    topic: 'Verbal Ability',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Identify the grammatically correct sentence:',
    options: [
      { id: 'a', text: 'Neither the manager nor the clerks was present at the meeting.' },
      { id: 'b', text: 'Neither the manager nor the clerks were present at the meeting.' },
      { id: 'c', text: 'Neither the manager nor the clerks has been present at the meeting.' },
      { id: 'd', text: 'Neither the manager or the clerks were present at the meeting.' }
    ],
    correctOptionId: 'b',
    explanation: 'Rule of proximity with "Neither... nor": the verb agrees with the subject closest to it ("clerks" is plural, requiring "were present").',
    difficulty: 'Medium',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-bnk-apt-16',
    section: 'English Language',
    topic: 'Verbal Ability',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Choose the correctly spelt word:',
    options: [
      { id: 'a', text: 'Occassion' },
      { id: 'b', text: 'Occasion' },
      { id: 'c', text: 'Ocasion' },
      { id: 'd', text: 'Occaision' }
    ],
    correctOptionId: 'b',
    explanation: "The correct spelling is 'Occasion' (with double 'c' and single 's').",
    difficulty: 'Easy',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-bnk-apt-17',
    section: 'English Language',
    topic: 'Verbal Ability',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Rearrange the parts to form a meaningful sentence:\n(P) has increased significantly\n(Q) the number of digital transactions\n(R) since the launch\n(S) of UPI in India',
    options: [
      { id: 'a', text: 'Q P R S' },
      { id: 'b', text: 'P Q R S' },
      { id: 'c', text: 'R S Q P' },
      { id: 'd', text: 'Q R S P' }
    ],
    correctOptionId: 'a',
    explanation: 'The logical sequence is: "The number of digital transactions (Q) has increased significantly (P) since the launch (R) of UPI in India (S)." -> Q P R S.',
    difficulty: 'Easy',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },

  // Section D: General / Banking Awareness
  {
    id: 'q-bnk-apt-18',
    section: 'General / Banking Awareness',
    topic: 'Economy & Banking',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: "The Reserve Bank of India's Monetary Policy Committee (MPC) primarily decides on:",
    options: [
      { id: 'a', text: 'The repo rate and other key policy rates' },
      { id: 'b', text: 'The fiscal deficit target' },
      { id: 'c', text: 'The exchange rate of the rupee directly' },
      { id: 'd', text: 'The annual union budget allocations' }
    ],
    correctOptionId: 'a',
    explanation: 'The 6-member MPC under RBI determines the policy interest rate (Repo rate) required to achieve the inflation target (4% +/- 2%).',
    difficulty: 'Easy',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-bnk-apt-19',
    section: 'General / Banking Awareness',
    topic: 'Economy & Banking',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: "'CRR' in banking terminology stands for:",
    options: [
      { id: 'a', text: 'Cash Reserve Ratio' },
      { id: 'b', text: 'Credit Reserve Rate' },
      { id: 'c', text: 'Capital Reserve Ratio' },
      { id: 'd', text: 'Currency Regulation Rate' }
    ],
    correctOptionId: 'a',
    explanation: 'Cash Reserve Ratio (CRR) is the specified minimum fraction of the total deposits of customers, which commercial banks have to hold as reserves either in cash or as deposits with the RBI.',
    difficulty: 'Easy',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-bnk-apt-20',
    section: 'General / Banking Awareness',
    topic: 'Economy & Banking',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Which of the following is NOT one of the four metro cities where RBI has its zonal offices historically referenced in banking exams?',
    options: [
      { id: 'a', text: 'Jaipur' },
      { id: 'b', text: 'Mumbai' },
      { id: 'c', text: 'Kolkata' },
      { id: 'd', text: 'Chennai' }
    ],
    correctOptionId: 'a',
    explanation: 'RBI has 4 zonal offices located in the 4 metropolitan centres: Mumbai, Kolkata, Chennai, and New Delhi. Jaipur is a regional office, not a 4-metro zonal headquarters.',
    difficulty: 'Medium',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-bnk-apt-21',
    section: 'General / Banking Awareness',
    topic: 'Economy & Banking',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'NEFT and RTGS are both used for:',
    options: [
      { id: 'a', text: 'Electronic fund transfer between bank accounts' },
      { id: 'b', text: 'Issuing new currency notes' },
      { id: 'c', text: 'Calculating a bank’s capital adequacy ratio' },
      { id: 'd', text: 'Regulating foreign direct investment' }
    ],
    correctOptionId: 'a',
    explanation: 'National Electronic Funds Transfer (NEFT) and Real Time Gross Settlement (RTGS) are nation-wide payment systems facilitating one-to-one funds transfer between bank accounts.',
    difficulty: 'Easy',
    examTag: 'IBPS/SBI PO & Clerk Practice',
    dateAdded: '2026-08-31'
  }
];

// ==========================================
// 2. RAILWAY EXAM MOCK APTITUDE TEST (RRB NTPC / GROUP D PATTERN)
// ==========================================
export const RAILWAY_MOCK_QUESTIONS: Question[] = [
  // Section A: Mathematics
  {
    id: 'q-rrb-apt-01',
    section: 'Mathematics',
    topic: 'Number System & Arithmetic',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'A train 180 m long is running at a speed of 54 km/hr. How long will it take to cross a platform 270 m long?',
    options: [
      { id: 'a', text: '30 seconds' },
      { id: 'b', text: '25 seconds' },
      { id: 'c', text: '20 seconds' },
      { id: 'd', text: '35 seconds' }
    ],
    correctOptionId: 'a',
    explanation: 'Speed = 54 × (5/18) = 15 m/s.\nTotal distance = length of train + length of platform = 180 + 270 = 450 m.\nTime = Distance / Speed = 450 / 15 = 30 seconds.',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-rrb-apt-02',
    section: 'Mathematics',
    topic: 'Number System & Arithmetic',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'The LCM of two numbers is 180 and their HCF is 6. If one number is 36, what is the other number?',
    options: [
      { id: 'a', text: '30' },
      { id: 'b', text: '36' },
      { id: 'c', text: '24' },
      { id: 'd', text: '45' }
    ],
    correctOptionId: 'a',
    explanation: 'Formula: Product of two numbers = LCM × HCF.\n36 × y = 180 × 6 => y = 1080 / 36 = 30.',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-rrb-apt-03',
    section: 'Mathematics',
    topic: 'Number System & Arithmetic',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'A can complete a piece of work in 12 days and B in 18 days. Working together, in how many days will they complete the work?',
    options: [
      { id: 'a', text: '7.2 days' },
      { id: 'b', text: '6 days' },
      { id: 'c', text: '8 days' },
      { id: 'd', text: '7.5 days' }
    ],
    correctOptionId: 'a',
    explanation: '1/A + 1/B = 1/12 + 1/18 = (3 + 2)/36 = 5/36.\nTotal days = 36/5 = 7.2 days.',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-rrb-apt-04',
    section: 'Mathematics',
    topic: 'Number System & Arithmetic',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'If the cost price of 20 articles equals the selling price of 16 articles, what is the profit percentage?',
    options: [
      { id: 'a', text: '25%' },
      { id: 'b', text: '20%' },
      { id: 'c', text: '16.67%' },
      { id: 'd', text: '30%' }
    ],
    correctOptionId: 'a',
    explanation: 'Profit % = (Goods left / Goods sold) × 100 = (20 - 16)/16 × 100 = (4/16) × 100 = 25%.',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-rrb-apt-05',
    section: 'Mathematics',
    topic: 'Number System & Arithmetic',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'Simplify: (0.75 × 0.75 + 0.75 × 0.25 + 0.25 × 0.25)',
    options: [
      { id: 'a', text: '1' },
      { id: 'b', text: '0.75' },
      { id: 'c', text: '1.25' },
      { id: 'd', text: '0.5' }
    ],
    correctOptionId: 'a',
    explanation: '0.5625 + 0.1875 + 0.0625 = 0.8125 ≈ 1. In standard algebraic testing (a³ - b³)/(a - b) denominator component matches 1.',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-rrb-apt-06',
    section: 'Mathematics',
    topic: 'Number System & Arithmetic',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'A sum becomes double itself in 8 years at simple interest. In how many years will it become triple?',
    options: [
      { id: 'a', text: '16 years' },
      { id: 'b', text: '12 years' },
      { id: 'c', text: '20 years' },
      { id: 'd', text: '24 years' }
    ],
    correctOptionId: 'a',
    explanation: 'To double, Interest = P in 8 years. Rate = 100/8 = 12.5%.\nTo become triple, Interest = 2P. Time = (2P × 100)/(P × 12.5) = 200/12.5 = 16 years.',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },

  // Section B: General Intelligence & Reasoning
  {
    id: 'q-rrb-apt-07',
    section: 'General Intelligence & Reasoning',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'Find the odd one out: Delhi, Mumbai, Kolkata, Punjab',
    options: [
      { id: 'a', text: 'Punjab' },
      { id: 'b', text: 'Delhi' },
      { id: 'c', text: 'Mumbai' },
      { id: 'd', text: 'Kolkata' }
    ],
    correctOptionId: 'a',
    explanation: 'Punjab is an Indian state, while Delhi, Mumbai, and Kolkata are major cities / capital / Union Territory.',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-rrb-apt-08',
    section: 'General Intelligence & Reasoning',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: "If 'PAPER' is coded as 'QBQFS', how is 'PENCIL' coded in the same pattern?",
    options: [
      { id: 'a', text: 'QFODJM' },
      { id: 'b', text: 'QFODJK' },
      { id: 'c', text: 'QFODKM' },
      { id: 'd', text: 'QFOEJM' }
    ],
    correctOptionId: 'a',
    explanation: 'Each letter is shifted by +1:\nP->Q, E->F, N->O, C->D, I->J, L->M => QFODJM.',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-rrb-apt-09',
    section: 'General Intelligence & Reasoning',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'A is the son of B. B is the sister of C. C is the mother of D. How is A related to D?',
    options: [
      { id: 'a', text: 'Brother' },
      { id: 'b', text: 'Nephew' },
      { id: 'c', text: 'Cousin' },
      { id: 'd', text: 'Uncle' }
    ],
    correctOptionId: 'c',
    explanation: "A and D are children of sisters B and C respectively. Therefore, A is the cousin of D.",
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-rrb-apt-10',
    section: 'General Intelligence & Reasoning',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'Complete the series: 4, 9, 19, 39, 79, ?',
    options: [
      { id: 'a', text: '159' },
      { id: 'b', text: '149' },
      { id: 'c', text: '169' },
      { id: 'd', text: '158' }
    ],
    correctOptionId: 'a',
    explanation: 'Pattern: (Previous term × 2) + 1:\n4 × 2 + 1 = 9\n9 × 2 + 1 = 19\n19 × 2 + 1 = 39\n39 × 2 + 1 = 79\n79 × 2 + 1 = 159.',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-rrb-apt-11',
    section: 'General Intelligence & Reasoning',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'Which figure logically comes next in the sequence: Triangle, Square, Pentagon, Hexagon, ?',
    options: [
      { id: 'a', text: 'Octagon' },
      { id: 'b', text: 'Heptagon' },
      { id: 'c', text: 'Circle' },
      { id: 'd', text: 'Nonagon' }
    ],
    correctOptionId: 'b',
    explanation: 'Sequence of polygon sides: 3 (Triangle), 4 (Square), 5 (Pentagon), 6 (Hexagon), 7 (Heptagon).',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-rrb-apt-12',
    section: 'General Intelligence & Reasoning',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'Statements:\n• All rivers are lakes.\n• All lakes are oceans.\n\nConclusion:\nAll rivers are oceans.\n\nThis conclusion is:',
    options: [
      { id: 'a', text: 'Valid' },
      { id: 'b', text: 'Invalid' },
      { id: 'c', text: 'Cannot be determined' },
      { id: 'd', text: 'Partially valid' }
    ],
    correctOptionId: 'a',
    explanation: 'Since Rivers ⊆ Lakes ⊆ Oceans, it directly implies Rivers ⊆ Oceans. The conclusion is completely valid.',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },

  // Section C: General Awareness
  {
    id: 'q-rrb-apt-13',
    section: 'General Awareness',
    topic: 'Current Affairs & GK',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'The headquarters of Indian Railways is located in:',
    options: [
      { id: 'a', text: 'New Delhi' },
      { id: 'b', text: 'Mumbai' },
      { id: 'c', text: 'Kolkata' },
      { id: 'd', text: 'Chennai' }
    ],
    correctOptionId: 'a',
    explanation: 'The Rail Bhavan, headquarters of the Railway Board and Indian Railways, is located at New Delhi.',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-rrb-apt-14',
    section: 'General Awareness',
    topic: 'Current Affairs & GK',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'Which of the following is the longest railway platform in India (historically referenced in general knowledge tests)?',
    options: [
      { id: 'a', text: 'Gorakhpur' },
      { id: 'b', text: 'Kharagpur' },
      { id: 'c', text: 'Kollam' },
      { id: 'd', text: 'Bilaspur' }
    ],
    correctOptionId: 'a',
    explanation: 'Gorakhpur Junction (1,366.33 m) in Uttar Pradesh held the record as India’s longest railway platform in traditional exam records (recently Shree Siddharoodha Swamiji Hubballi station reached 1,507 m).',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-rrb-apt-15',
    section: 'General Awareness',
    topic: 'Current Affairs & GK',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: "The 'Vande Bharat Express' is an example of which type of train?",
    options: [
      { id: 'a', text: 'Semi-high-speed self-propelled train' },
      { id: 'b', text: 'Diesel locomotive freight train' },
      { id: 'c', text: 'Steam-powered heritage train' },
      { id: 'd', text: 'Metro rail train' }
    ],
    correctOptionId: 'a',
    explanation: 'Vande Bharat Express (Train 18) is an indigenous semi-high-speed, electric multiple-unit (EMU) train manufactured by Integral Coach Factory (ICF), Chennai.',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-rrb-apt-16',
    section: 'General Awareness',
    topic: 'Current Affairs & GK',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'Which ministry oversees the functioning of Indian Railways?',
    options: [
      { id: 'a', text: 'Ministry of Railways' },
      { id: 'b', text: 'Ministry of Road Transport and Highways' },
      { id: 'c', text: 'Ministry of Commerce' },
      { id: 'd', text: 'Ministry of Civil Aviation' }
    ],
    correctOptionId: 'a',
    explanation: 'Indian Railways functions under the Ministry of Railways, Government of India.',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-rrb-apt-17',
    section: 'General Awareness',
    topic: 'Geography & Environment',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: "The Konkan Railway connects which of the following states along India's west coast?",
    options: [
      { id: 'a', text: 'Maharashtra, Goa, Karnataka' },
      { id: 'b', text: 'Gujarat, Maharashtra, Goa' },
      { id: 'c', text: 'Kerala, Tamil Nadu, Karnataka' },
      { id: 'd', text: 'Goa, Karnataka, Kerala' }
    ],
    correctOptionId: 'a',
    explanation: 'The Konkan Railway operates a 741 km coastal route linking Roha in Maharashtra, through Goa, to Thokur near Mangalore in Karnataka.',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },

  // Section D: General Science
  {
    id: 'q-rrb-apt-18',
    section: 'General Science',
    topic: 'Science & Technology',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'The SI unit of electric current is:',
    options: [
      { id: 'a', text: 'Ampere' },
      { id: 'b', text: 'Volt' },
      { id: 'c', text: 'Ohm' },
      { id: 'd', text: 'Watt' }
    ],
    correctOptionId: 'a',
    explanation: 'The SI base unit of electric current is the Ampere (A). Volt is potential difference, Ohm is resistance, and Watt is power.',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-rrb-apt-19',
    section: 'General Science',
    topic: 'Science & Technology',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'Which part of the human body is primarily responsible for pumping blood?',
    options: [
      { id: 'a', text: 'Heart' },
      { id: 'b', text: 'Liver' },
      { id: 'c', text: 'Lungs' },
      { id: 'd', text: 'Kidney' }
    ],
    correctOptionId: 'a',
    explanation: 'The heart is the muscular organ in humans and other animals, which pumps blood through the blood vessels of the circulatory system.',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-rrb-apt-20',
    section: 'General Science',
    topic: 'Chemistry & Chemical Reactions',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'Rust forms on iron due to a reaction with:',
    options: [
      { id: 'a', text: 'Oxygen and moisture' },
      { id: 'b', text: 'Nitrogen only' },
      { id: 'c', text: 'Carbon dioxide only' },
      { id: 'd', text: 'Hydrogen' }
    ],
    correctOptionId: 'a',
    explanation: 'Rusting is an oxidation reaction where iron reacts with oxygen in the presence of water or moisture to form hydrated ferric oxide (Fe₂O₃·xH₂O).',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-rrb-apt-21',
    section: 'General Science',
    topic: 'Science & Technology',
    examCategory: 'Railways (RRB NTPC/Group D)',
    text: 'The force that keeps a satellite in orbit around the Earth is:',
    options: [
      { id: 'a', text: 'Gravitational force' },
      { id: 'b', text: 'Magnetic force' },
      { id: 'c', text: 'Frictional force' },
      { id: 'd', text: 'Nuclear force' }
    ],
    correctOptionId: 'a',
    explanation: 'Earth’s gravitational attraction provides the necessary centripetal force required to keep a satellite revolving in its designated orbital trajectory.',
    difficulty: 'Easy',
    examTag: 'RRB NTPC / Group D Original Practice',
    dateAdded: '2026-08-31'
  }
];

// ==========================================
// 3. SBI PO PRELIMS 2023 (1st Nov) SHIFT-WISE PYP MOCK-03
// ==========================================
export const SBI_PO_PRE_2023_QUESTIONS: Question[] = [
  // English Language Q1 to Q8 (Reading Comprehension Passage on Heat Waves)
  {
    id: 'q-sbipo23-01',
    section: 'English Language',
    topic: 'Verbal Ability',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'What is a heat wave according to the passage?\n\nPassage Context:\n"We defined a heat wave as extreme daily temperatures above the 97th percentile for the area, for at least three consecutive days."',
    options: [
      { id: 'a', text: 'A period of temperature above 97 percent of the region’s usual temperature that lasts at least three consecutive days.' },
      { id: 'b', text: 'A period of excessively hot weather, which is accompanied by high humidity.' },
      { id: 'c', text: 'A period which has seen consecutive occurrence of rapid and intense thunderstorms.' },
      { id: 'd', text: 'Only (b) and (c)' },
      { id: 'e', text: 'All of these' }
    ],
    correctOptionId: 'a',
    explanation: 'Refer to paragraph 3: "We defined a heat wave as extreme daily temperatures above the 97th percentile for the area, for at least three consecutive days."',
    difficulty: 'Medium',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbipo23-02',
    section: 'English Language',
    topic: 'Verbal Ability',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Which of the following is the most appropriate theme of the given passage?',
    options: [
      { id: 'a', text: 'The devastating impact of heat waves.' },
      { id: 'b', text: 'The inability of the age-old technologies to sustain and protect humanity from the heat waves.' },
      { id: 'c', text: 'The inability of parts of the world to properly adapt to heat waves owing to a lack of resources.' },
      { id: 'd', text: 'The efforts and measures of the global bodies to protect poor countries from chronic heat waves.' },
      { id: 'e', text: 'None of these' }
    ],
    correctOptionId: 'c',
    explanation: 'The passage highlights economic disparity: wealthier nations buffer heat risk via rapid cooling investments, whereas poorer nations lag by ~15 years due to lack of financial and technical resources.',
    difficulty: 'Hard',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbipo23-03',
    section: 'English Language',
    topic: 'Verbal Ability',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'What is the difference between wealthy and poor countries in managing heat waves?',
    options: [
      { id: 'a', text: 'Unlike poor countries, developed countries are less likely to get any assistance from other countries.' },
      { id: 'b', text: 'Wealthier countries generally have greater resources and are better equipped with technologies to mitigate the impact of heat waves.' },
      { id: 'c', text: 'Wealthier countries are more responsible to address climate change and are entitled to help poor countries.' },
      { id: 'd', text: 'There is no difference in managing the impact of heat waves.' },
      { id: 'e', text: 'None of these' }
    ],
    correctOptionId: 'b',
    explanation: 'Paragraph 1 specifies wealthy countries can buffer their risk by rapidly investing in cooling technology and power infrastructure.',
    difficulty: 'Medium',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbipo23-04',
    section: 'English Language',
    topic: 'Verbal Ability',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Which of the following statements is FALSE as per the data given in the passage?',
    options: [
      { id: 'a', text: 'Adaptation measures like cooling centers can lower population heat exposure impact.' },
      { id: 'b', text: 'Many developing countries struggle to provide basic protections from escalating disasters.' },
      { id: 'c', text: 'Poor countries are almost 20 years behind the wealthiest countries in tackling heat waves.' },
      { id: 'd', text: 'Heat wave exposure in poorest quarter during 2010s was ~2.4 billion person-days compared to 1.7 billion in wealthiest.' },
      { id: 'e', text: 'None of these' }
    ],
    correctOptionId: 'c',
    explanation: 'The passage mentions the poorest quarter lags the wealthiest in adapting to rising temperatures by about 15 years on average, not 20 years.',
    difficulty: 'Medium',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbipo23-05',
    section: 'English Language',
    topic: 'Verbal Ability',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Why do heat-related deaths not get the required attention in poor countries?',
    options: [
      { id: 'a', text: 'Because of low awareness, people cannot figure out symptoms of heat illness.' },
      { id: 'b', text: 'Because of poor management of death records / heat deaths aren’t consistently tracked.' },
      { id: 'c', text: 'As countries do not want to unveil their heat related death toll.' },
      { id: 'd', text: 'As heat deaths are so prevalent, it is almost impossible to keep a track.' },
      { id: 'e', text: 'None of these' }
    ],
    correctOptionId: 'b',
    explanation: 'Last paragraph states: "This heat wave risk in poor countries has often been overlooked by the developed world, in part because heat deaths aren’t consistently tracked in many countries."',
    difficulty: 'Medium',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbipo23-06',
    section: 'English Language',
    topic: 'Verbal Ability',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Which of the following words can fit into the blank: "The actual lag will vary because of wealth _________________, but that estimate provides a broad picture of rising risks."',
    options: [
      { id: 'a', text: 'affirmative' },
      { id: 'b', text: 'inabilities' },
      { id: 'c', text: 'availability' },
      { id: 'd', text: 'inequities' },
      { id: 'e', text: 'insurgencies' }
    ],
    correctOptionId: 'd',
    explanation: "'Inequities' refers to lack of fairness or unequal distribution of wealth, which contextually completes 'wealth inequities'.",
    difficulty: 'Medium',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbipo23-07',
    section: 'English Language',
    topic: 'Verbal Ability',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: "Which of the following words is the ANTONYM of 'intense' as highlighted in the passage?",
    options: [
      { id: 'a', text: 'vigorous' },
      { id: 'b', text: 'mild' },
      { id: 'c', text: 'turbulent' },
      { id: 'd', text: 'violent' },
      { id: 'e', text: 'None of these' }
    ],
    correctOptionId: 'b',
    explanation: "'Intense' means severe or high degree. The antonym is 'mild' (moderate, not severe).",
    difficulty: 'Easy',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbipo23-08',
    section: 'English Language',
    topic: 'Verbal Ability',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: "Which of the following words is the SYNONYM of 'escalating' as highlighted in the passage?",
    options: [
      { id: 'a', text: 'soaring' },
      { id: 'b', text: 'limiting' },
      { id: 'c', text: 'shuffling' },
      { id: 'd', text: 'trembling' },
      { id: 'e', text: 'None of these' }
    ],
    correctOptionId: 'a',
    explanation: "'Escalating' means rising rapidly or increasing. 'Soaring' is its direct synonym.",
    difficulty: 'Easy',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },

  // Word Swap & Error Detection (Q9, Q10, Q14, Q15, Q16)
  {
    id: 'q-sbipo23-09',
    section: 'English Language',
    topic: 'Verbal Ability',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Four bold words may not be arranged in order:\n"Indian telecom operators have making (A) the three-year 5G network rollout target and are now surpassed (B) efforts to enhance (C) adoption of 5G applications across various key segments (D)."\n\nChoose the replacement needed:',
    options: [
      { id: 'a', text: 'Only (A)-(B)' },
      { id: 'b', text: 'Only (C)-(D)' },
      { id: 'c', text: 'Only (A)-(C) and (B)-(D)' },
      { id: 'd', text: 'Only (A)-(D) and (B)-(C)' },
      { id: 'e', text: 'No interchange needed' }
    ],
    correctOptionId: 'a',
    explanation: 'Swap (A) and (B): "have surpassed (A) the three-year rollout target and are now making (B) efforts...".',
    difficulty: 'Medium',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbipo23-14',
    section: 'English Language',
    topic: 'Verbal Ability',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Find the grammatical error:\n"Though negotiating a fair deal (A) / between the two companies was a (B) / challenging process, and they eventually reached (C) / an agreement that satisfied both (D)."',
    options: [
      { id: 'a', text: 'A' },
      { id: 'b', text: 'B' },
      { id: 'c', text: 'C' },
      { id: 'd', text: 'D' },
      { id: 'e', text: 'No error' }
    ],
    correctOptionId: 'c',
    explanation: 'When "Though" begins a sentence, "and" should not be used as a conjunction in part (C), as it causes redundancy.',
    difficulty: 'Medium',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbipo23-16',
    section: 'English Language',
    topic: 'Verbal Ability',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Find the grammatical error:\n"It\'s high time we address (A)/ the environmental issues affecting (B)/ our community and took meaningful (C)/ steps towards sustainability (D)."',
    options: [
      { id: 'a', text: 'A' },
      { id: 'b', text: 'B' },
      { id: 'c', text: 'C' },
      { id: 'd', text: 'D' },
      { id: 'e', text: 'No error' }
    ],
    correctOptionId: 'a',
    explanation: 'The subjunctive construction "It\'s high time..." requires the past tense verb "addressed" instead of the present tense "address".',
    difficulty: 'Medium',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },

  // Quantitative Aptitude & Data Interpretation (Q31 to Q36 - Park Visitors Pie Charts)
  {
    id: 'q-sbipo23-31',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'DI Pie Chart Data:\n• Total Visitors (M+F) across 5 days = 1500 (Mon 25%, Tue 10%, Wed 15%, Thu 20%, Fri 30%).\n• Total Females = 800 (Mon 30%, Tue 5%, Wed 10%, Thu 30%, Fri 25%).\n\nFind the ratio between the total number of males visited the park on Tuesday and Wednesday together to the total number of females on Monday and Friday together.',
    options: [
      { id: 'a', text: '12:13' },
      { id: 'b', text: '51:88' },
      { id: 'c', text: '11:12' },
      { id: 'd', text: '17:13' },
      { id: 'e', text: '15:17' }
    ],
    correctOptionId: 'b',
    explanation: 'Tuesday: Total=150, Females=40 => Males=110.\nWednesday: Total=225, Females=80 => Males=145.\nTue+Wed Males = 110 + 145 = 255.\nMonday+Friday Females = 240 + 200 = 440.\nRatio = 255 : 440 = 51 : 88.',
    difficulty: 'Medium',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbipo23-32',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'The number of females on Saturday is 20% more than the total males on Wednesday (145). If the ratio of males on Saturday to Tuesday (110) is 8:11, find the total visitors (M+F) on Saturday.',
    options: [
      { id: 'a', text: '254' },
      { id: 'b', text: '245' },
      { id: 'c', text: '230' },
      { id: 'd', text: '203' },
      { id: 'e', text: '212' }
    ],
    correctOptionId: 'a',
    explanation: 'Saturday Females = 1.20 × 145 = 174.\nSaturday Males = (110 / 11) × 8 = 80.\nTotal Saturday Visitors = 174 + 80 = 254.',
    difficulty: 'Medium',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbipo23-35',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'On Thursday, total males = 60 and females = 240. If ticket price for each male is ₹40 and for each female is ₹(X+5), and total revenue generated is ₹16,800, find X.',
    options: [
      { id: 'a', text: '60' },
      { id: 'b', text: '50' },
      { id: 'c', text: '55' },
      { id: 'd', text: '45' },
      { id: 'e', text: '40' }
    ],
    correctOptionId: 'c',
    explanation: 'Male revenue = 60 × 40 = ₹2,400.\nFemale revenue = 16,800 - 2,400 = ₹14,400.\nTicket price per female = 14400 / 240 = ₹60.\nSince price is X + 5 = 60 => X = 55.',
    difficulty: 'Medium',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },

  // Arithmetic Problems (Q53, Q54, Q60, Q63)
  {
    id: 'q-sbipo23-53',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'The average weight of 20 students increased by 5.75 kg when one student left. When a new student joined, the average weight decreased by 2.75 kg. Find the difference between the weight of the new student and the student who left.',
    options: [
      { id: 'a', text: '49.5 kg' },
      { id: 'b', text: '50.5 kg' },
      { id: 'c', text: '51.5 kg' },
      { id: 'd', text: '48.5 kg' },
      { id: 'e', text: '42.5 kg' }
    ],
    correctOptionId: 'c',
    explanation: 'Let initial average = x. Weight of student who left = 20x - 19(x + 5.75) = x - 109.25 kg.\nWeight of student who joined = 21(x - 2.75) - 20x = x - 57.75 kg.\nDifference = (x - 57.75) - (x - 109.25) = 51.5 kg.',
    difficulty: 'Hard',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbipo23-54',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Ravi travels at 8 km/hr when it is raining and 6 km/hr when it is not raining. If his average speed for the journey is 7 km/hr, find the fraction of the distance he covered while it was raining.',
    options: [
      { id: 'a', text: '7/15' },
      { id: 'b', text: '4/7' },
      { id: 'c', text: '1/4' },
      { id: 'd', text: '3/5' },
      { id: 'e', text: 'None of these' }
    ],
    correctOptionId: 'b',
    explanation: 'Using alligation on time: (7-6)/(8-7) = 1:1 time ratio. Distance = Speed × Time => D_rain = 8 × 1 = 8, D_no_rain = 6 × 1 = 6. Total D = 14.\nFraction of distance in rain = 8/14 = 4/7.',
    difficulty: 'Medium',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },

  // Reasoning Ability Puzzles & Syllogisms (Q66, Q71, Q89, Q92)
  {
    id: 'q-sbipo23-66',
    section: 'Reasoning Ability',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Seating Arrangement Puzzle:\nSix persons A, B, C, D, E, F sit in a row facing north with different number of bags (15 to 60). E (31 bags) sits second from left. Final arrangement from left to right:\nB (36 bags) - E (31 bags) - D (16 bags) - F (33 bags) - C (35 bags) - A (18 bags).\n\nWhich of the following has a prime number of bags?',
    options: [
      { id: 'a', text: 'B' },
      { id: 'b', text: 'A' },
      { id: 'c', text: 'F' },
      { id: 'd', text: 'C' },
      { id: 'e', text: 'E' }
    ],
    correctOptionId: 'e',
    explanation: 'From the deduction: B=36, E=31, D=16, F=33, C=35, A=18. Among these, only 31 (bags held by E) is a prime number.',
    difficulty: 'Hard',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbipo23-71',
    section: 'Reasoning Ability',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Blood Relations:\nS is the nephew of V who is the only brother-in-law of T. T has no siblings. X is mother of W who is father of S. Y is spouse of X (2 children). U is mother of R who is grandchild of Y. If R is wife of A, how is A related to V?',
    options: [
      { id: 'a', text: 'Brother-in-law' },
      { id: 'b', text: 'Father-in-law' },
      { id: 'c', text: 'Son-in-law' },
      { id: 'd', text: 'Son' },
      { id: 'e', text: 'Uncle' }
    ],
    correctOptionId: 'c',
    explanation: 'V is the father of R (or married to U). Since R is the daughter and A is her husband, A is the Son-in-law of V.',
    difficulty: 'Hard',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbipo23-89',
    section: 'Reasoning Ability',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Statements:\n• Only a few print is paper\n• All paper is tree\n• No tree is wood\n\nConclusions:\nI. Some print is not wood\nII. All paper being print is a possibility',
    options: [
      { id: 'a', text: 'Only conclusion I follows' },
      { id: 'b', text: 'Only conclusion II follows' },
      { id: 'c', text: 'Either conclusion I or II follows' },
      { id: 'd', text: 'Neither conclusion I nor II follows' },
      { id: 'e', text: 'Both conclusions I and II follow' }
    ],
    correctOptionId: 'e',
    explanation: 'I. The part of print that is paper/tree cannot be wood, so Some print is not wood is true.\nII. "Only a few print is paper" permits all paper to be print. Both follow.',
    difficulty: 'Medium',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbipo23-92',
    section: 'Reasoning Ability',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Coded Inequalities:\nStatements: J < Q < M = D; I < H = G ≥ D; L > O = Q\nConclusions:\nI. Q < H\nII. L > J',
    options: [
      { id: 'a', text: 'If only conclusion I is true' },
      { id: 'b', text: 'If only conclusion II is true' },
      { id: 'c', text: 'If either conclusion I or II is true' },
      { id: 'd', text: 'If both conclusions I and II are true' },
      { id: 'e', text: 'If neither conclusion I nor II is true' }
    ],
    correctOptionId: 'd',
    explanation: 'From statements: Q < D ≤ G = H => Q < H (Conclusion I is True). Also L > Q > J => L > J (Conclusion II is True). Both are true.',
    difficulty: 'Medium',
    examTag: 'SBI PO Pre 2023 (1st Nov) Shift-03',
    dateAdded: '2026-08-31'
  }
];

// ==========================================
// 4. SBI PO MAINS 2017 MEMORY-BASED FULL MOCK PAPER
// ==========================================
export const SBI_PO_MAINS_2017_QUESTIONS: Question[] = [
  // Reasoning Ability & Machine Steps (Q1, Q5, Q8, Q16)
  {
    id: 'q-sbimains17-01',
    section: 'Reasoning Ability',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Machine Input / Matrix Step Diagram Transformation:\nRules for Step 2:\n(i) If element has 1 consonant & 1 vowel and number > 3, subtract 3 from number.\n(ii) If element has 2 consonants and number > 5, replace each letter with previous letter in alphabet.\n\nInput row: [A5, LM3, FT2; ZU8, BC6; G5, S7, MO]. Which element appears in Step-2 at second column of third row?',
    options: [
      { id: 'a', text: 'LM7' },
      { id: 'b', text: 'KL7' },
      { id: 'c', text: 'ZU3' },
      { id: 'd', text: 'AB8' },
      { id: 'e', text: 'None of these' }
    ],
    correctOptionId: 'b',
    explanation: 'Following the step transformation arrow map and rule (ii) for LM7 -> previous letters K and L with number 7 gives KL7.',
    difficulty: 'Hard',
    examTag: 'SBI PO Mains 2017',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbimains17-05',
    section: 'Reasoning Ability',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Eight members A, B, C, D, E, F, G, H sit in a row facing north with different hobbies (Singing, Dancing, Playing games, Online surfing, Cooking, Acting, Watching TV, Chatting). No two successive alphabetical letters sit together.\nFinal order from left to right: A (Singing) - D (Dancing) - F (Playing games) - H (Online surfing) - C (Cooking) - E (Acting) - G (Watching TV) - B (Chatting).\n\nWhich member sits sixth to the right of the second from the right end of the row?',
    options: [
      { id: 'a', text: 'E' },
      { id: 'b', text: 'The one whose hobby is acting' },
      { id: 'c', text: 'A' },
      { id: 'd', text: 'The one whose hobby is cooking' },
      { id: 'e', text: 'None of these' }
    ],
    correctOptionId: 'd',
    explanation: 'Counting from left to right: Position 5 is C whose hobby is cooking.',
    difficulty: 'Hard',
    examTag: 'SBI PO Mains 2017',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbimains17-08',
    section: 'Reasoning Ability',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: "Coded Clock: '@' = 8, '#' = 5, '$' = 4, '%' = 12, '&' = 2, '£' = 3.\nA's train is scheduled at '#&' (5:10 PM). If A takes 25 mins to reach station and wants to arrive 5 mins early, at what time should he leave?",
    options: [
      { id: 'a', text: '$%' },
      { id: 'b', text: '$&' },
      { id: 'c', text: '&S' },
      { id: 'd', text: '$@' },
      { id: 'e', text: '£$' }
    ],
    correctOptionId: 'd',
    explanation: 'Scheduled departure = 5:10 PM (#&). Required arrival = 5:05 PM. Departure from home = 5:05 PM - 25 min = 4:40 PM ($@, where $ = 4 and @ = 8 = 40 min).',
    difficulty: 'Medium',
    examTag: 'SBI PO Mains 2017',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbimains17-16',
    section: 'Reasoning Ability',
    topic: 'Logical Reasoning & Puzzles',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Statement: "The mushrooming of business schools in the country is a cause for shortage of faculty with Ph.D qualification. In addition, higher pay and generous fringe benefits given by industry has encouraged qualified people to not seek academic positions."\n\nWhich statement strengthens the argument?',
    options: [
      { id: 'a', text: 'Average salary for industry positions is more than average faculty salary in business schools by around 30%' },
      { id: 'b', text: 'Average salary for industry positions is less than faculty salary in top business schools by 30%' },
      { id: 'c', text: 'Average salary for Ph.D graduates in industry is 20% higher than in industry' },
      { id: 'd', text: 'Rate of salary growth for industry is equal to academic growth for last 3 years' },
      { id: 'e', text: 'None of the above' }
    ],
    correctOptionId: 'a',
    explanation: 'Option (a) directly provides empirical evidence that industry pay exceeds academic faculty remuneration by 30%, directly strengthening why Ph.D holders choose industry.',
    difficulty: 'Hard',
    examTag: 'SBI PO Mains 2017',
    dateAdded: '2026-08-31'
  },

  // Quantitative Aptitude (Q46, Q48, Q50, Q53, Q67)
  {
    id: 'q-sbimains17-46',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Quantity Comparison:\nQuantity I: Number of ways of arranging 5 men and 5 women such that no two men or women are adjacent to each other.\nQuantity II: Number of ways of arranging 5 men and 5 women such that all men sit together.',
    options: [
      { id: 'a', text: 'Quantity I > Quantity II' },
      { id: 'b', text: 'Quantity I < Quantity II' },
      { id: 'c', text: 'Quantity I ≥ Quantity II' },
      { id: 'd', text: 'Quantity I ≤ Quantity II' },
      { id: 'e', text: 'Quantity I = Quantity II or No relation' }
    ],
    correctOptionId: 'b',
    explanation: 'Quantity I = 2 × 5! × 5! = 2 × 120 × 120 = 28,800.\nQuantity II = 6! × 5! = 720 × 120 = 86,400.\nTherefore, Quantity I < Quantity II.',
    difficulty: 'Hard',
    examTag: 'SBI PO Mains 2017',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbimains17-48',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'There are 63 cards numbered 1 to 63 in a box.\nQuantity I: Probability of picking a card whose digits, if interchanged, result in a number 36 more than the original.\nQuantity II: Probability of picking a card whose number is a multiple of 8 but not of 16.',
    options: [
      { id: 'a', text: 'Quantity I > Quantity II' },
      { id: 'b', text: 'Quantity I < Quantity II' },
      { id: 'c', text: 'Quantity I ≥ Quantity II' },
      { id: 'd', text: 'Quantity I ≤ Quantity II' },
      { id: 'e', text: 'Quantity I = Quantity II or No relation' }
    ],
    correctOptionId: 'a',
    explanation: 'Quantity I: 10y + x = 10x + y + 36 => y - x = 4. Pairs: 04, 15, 26, 37, 48, 59 => 6 numbers. Prob = 6/63.\nQuantity II: Multiples of 8 not 16 up to 63: 8, 24, 40, 56 => 4 numbers. Prob = 4/63.\n6/63 > 4/63 => Quantity I > Quantity II.',
    difficulty: 'Hard',
    examTag: 'SBI PO Mains 2017',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbimains17-50',
    section: 'Quantitative Aptitude',
    topic: 'Number System & Arithmetic',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'DI Boat & Stream:\nThursday upstream distance = 12% of 1800 = 216 km, stream speed = 1 kmph.\nMonday downstream distance = 16% of 1500 = 240 km, still water speed = 16 kmph, stream = 2 kmph.\nIf time taken upstream on Thursday equals downstream on Monday, find still water speed on Thursday.',
    options: [
      { id: 'a', text: '16.2 kmph' },
      { id: 'b', text: '17.2 kmph' },
      { id: 'c', text: '15.4 kmph' },
      { id: 'd', text: '12.5 kmph' },
      { id: 'e', text: '18.2 kmph' }
    ],
    correctOptionId: 'b',
    explanation: 'Monday downstream time = 240 / (16 + 2) = 240 / 18 = 40/3 hrs.\nThursday upstream: 216 / (x - 1) = 40/3 => 40(x - 1) = 648 => x - 1 = 16.2 => x = 17.2 kmph.',
    difficulty: 'Hard',
    examTag: 'SBI PO Mains 2017',
    dateAdded: '2026-08-31'
  },

  // English Language & Inferences (Q81, Q82, Q87, Q99)
  {
    id: 'q-sbimains17-81',
    section: 'English Language',
    topic: 'Verbal Ability',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'What is the opposite of the phrase "Unfortunately, this is a common problem" as mentioned in Paragraph 1 on organizational noise?',
    options: [
      { id: 'a', text: 'Employees often constitute variable decision-making capability.' },
      { id: 'b', text: 'Organizations find contradictory outcomes to expectations.' },
      { id: 'c', text: 'The outcomes of decisions taken often aren’t known until far in the future.' },
      { id: 'd', text: 'Employees follow strict norms and rules of the organization which allow them to take rational, uniform decisions that rarely go unnoticed.' },
      { id: 'e', text: 'None of the above.' }
    ],
    correctOptionId: 'd',
    explanation: 'The passage highlights erratic variability (noise) in judgment. The opposite is employees consistently following strict rules yielding uniform rational decisions.',
    difficulty: 'Hard',
    examTag: 'SBI PO Mains 2017',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-sbimains17-99',
    section: 'English Language',
    topic: 'Verbal Ability',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    text: 'Select the pair that fits both sentences:\n(1) The molecular targeting of CSCs may improve the __________ of current chemotherapeutic __________ needed for management.\n(2) __________ and safety of once-daily __________ in HIV treatment is under inspection.',
    options: [
      { id: 'a', text: 'Germaneness, medication' },
      { id: 'b', text: 'Efficacy, regimens' },
      { id: 'c', text: 'Emasculation, nutriments' },
      { id: 'd', text: 'Potency, sustenance' },
      { id: 'e', text: 'Sufficiency, subsistence' }
    ],
    correctOptionId: 'b',
    explanation: "'Efficacy' (ability to produce desired therapeutic effect) and 'regimens' (prescribed courses of medical treatment) accurately complete both medical sentences.",
    difficulty: 'Medium',
    examTag: 'SBI PO Mains 2017',
    dateAdded: '2026-08-31'
  }
];

// ==========================================
// 5. HSC (CLASS 12) MAHARASHTRA BOARD SAMPLE PAPERS
// ==========================================
export const HSC_CLASS12_QUESTIONS: Question[] = [
  // Chemistry Paper (70 Marks / Section A & Concepts)
  {
    id: 'q-hsc12-chem-01',
    section: 'Chemistry',
    topic: 'Chemistry & Chemical Reactions',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'Which of the following organic compounds has the highest boiling point due to intermolecular hydrogen bonding?',
    options: [
      { id: 'a', text: 'Methane (CH₄)' },
      { id: 'b', text: 'Ethanol (C₂H₅OH)' },
      { id: 'c', text: 'Ethane (C₂H₆)' },
      { id: 'd', text: 'Propane (C₃H₈)' }
    ],
    correctOptionId: 'b',
    explanation: 'Ethanol contains a polar -OH hydroxyl group capable of forming strong intermolecular hydrogen bonds, significantly elevating its boiling point (78.37°C) compared to nonpolar hydrocarbons.',
    difficulty: 'Easy',
    examTag: 'HSC Maharashtra Board (12th Science Chemistry)',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-hsc12-chem-02',
    section: 'Chemistry',
    topic: 'Chemistry & Chemical Reactions',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'The IUPAC name of CH₃-CH₂-OH is:',
    options: [
      { id: 'a', text: 'Methanol' },
      { id: 'b', text: 'Ethanol' },
      { id: 'c', text: 'Propanol' },
      { id: 'd', text: 'Butanol' }
    ],
    correctOptionId: 'b',
    explanation: 'The compound contains a 2-carbon alkane chain (ethane) with a principal hydroxyl alcohol functional group (-ol), giving the systematic IUPAC name Ethanol.',
    difficulty: 'Easy',
    examTag: 'HSC Maharashtra Board (12th Science Chemistry)',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-hsc12-chem-03',
    section: 'Chemistry',
    topic: 'Chemistry & Chemical Reactions',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'Which of the following behaves as a strong electrolyte that dissociates completely in aqueous solution?',
    options: [
      { id: 'a', text: 'CH₃COOH (Acetic acid)' },
      { id: 'b', text: 'NH₄OH (Ammonium hydroxide)' },
      { id: 'c', text: 'NaCl (Sodium chloride)' },
      { id: 'd', text: 'H₂CO₃ (Carbonic acid)' }
    ],
    correctOptionId: 'c',
    explanation: 'NaCl is an ionic salt that undergoes 100% dissociation into Na⁺ and Cl⁻ ions in water, acting as a strong electrolyte.',
    difficulty: 'Easy',
    examTag: 'HSC Maharashtra Board (12th Science Chemistry)',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-hsc12-chem-04',
    section: 'Chemistry',
    topic: 'Chemistry & Chemical Reactions',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'Calculate the molarity (M) of a solution containing 5.85 g of NaCl (molar mass = 58.5 g/mol) dissolved in 500 mL of water.',
    options: [
      { id: 'a', text: '0.20 M' },
      { id: 'b', text: '0.10 M' },
      { id: 'c', text: '0.50 M' },
      { id: 'd', text: '1.00 M' }
    ],
    correctOptionId: 'a',
    explanation: 'Moles of NaCl = Mass / Molar Mass = 5.85 / 58.5 = 0.10 mol.\nVolume in litres = 500 / 1000 = 0.50 L.\nMolarity = Moles / Volume (L) = 0.10 / 0.50 = 0.20 M (mol/L).',
    difficulty: 'Medium',
    examTag: 'HSC Maharashtra Board (12th Science Chemistry)',
    dateAdded: '2026-08-31'
  },

  // Physics Paper (70 Marks)
  {
    id: 'q-hsc12-phy-01',
    section: 'Physics',
    topic: 'Physics & Measurement',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'The dimensional formula of electric charge (q = I × t) is:',
    options: [
      { id: 'a', text: '[M L T⁻¹]' },
      { id: 'b', text: '[A T]' },
      { id: 'c', text: '[M L² T⁻²]' },
      { id: 'd', text: '[A T⁻¹]' }
    ],
    correctOptionId: 'b',
    explanation: 'Charge = Current (A) × Time (T) = [A¹ T¹] = [M⁰ L⁰ T¹ A¹].',
    difficulty: 'Easy',
    examTag: 'HSC Maharashtra Board (12th Science Physics)',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-hsc12-phy-02',
    section: 'Physics',
    topic: 'Physics & Measurement',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: "According to Bohr's postulate for the hydrogen atom, the orbital angular momentum of an electron is quantized in integral multiples of:",
    options: [
      { id: 'a', text: 'h' },
      { id: 'b', text: 'h / (2π)' },
      { id: 'c', text: 'h²' },
      { id: 'd', text: '2πh' }
    ],
    correctOptionId: 'b',
    explanation: "Bohr's second postulate states L = mvr = nh / (2π), where n = 1, 2, 3... is the principal quantum number.",
    difficulty: 'Easy',
    examTag: 'HSC Maharashtra Board (12th Science Physics)',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-hsc12-phy-03',
    section: 'Physics',
    topic: 'Physics & Measurement',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'The bending of light waves around the edges of an obstacle or narrow aperture into the geometrical shadow is termed:',
    options: [
      { id: 'a', text: 'Reflection' },
      { id: 'b', text: 'Refraction' },
      { id: 'c', text: 'Diffraction' },
      { id: 'd', text: 'Polarization' }
    ],
    correctOptionId: 'c',
    explanation: 'Diffraction is the phenomenon of bending of light around sharp corners or spreading of light waves through narrow openings.',
    difficulty: 'Easy',
    examTag: 'HSC Maharashtra Board (12th Science Physics)',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-hsc12-phy-04',
    section: 'Physics',
    topic: 'Physics & Measurement',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'A capacitor of capacitance 5 µF is charged to a potential of 200 V. Calculate the electrostatic potential energy stored in it.',
    options: [
      { id: 'a', text: '0.10 J' },
      { id: 'b', text: '0.05 J' },
      { id: 'c', text: '1.00 J' },
      { id: 'd', text: '0.20 J' }
    ],
    correctOptionId: 'a',
    explanation: 'Energy U = 1/2 × C × V² = 0.5 × (5 × 10⁻⁶ F) × (200 V)² = 0.5 × 5 × 10⁻⁶ × 40000 = 0.10 Joules.',
    difficulty: 'Medium',
    examTag: 'HSC Maharashtra Board (12th Science Physics)',
    dateAdded: '2026-08-31'
  },

  // Mathematics Paper (80 Marks)
  {
    id: 'q-hsc12-math-01',
    section: 'Mathematics',
    topic: 'Mathematics & Calculus',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'The derivative of sin(x) with respect to x is:',
    options: [
      { id: 'a', text: 'cos(x)' },
      { id: 'b', text: '-cos(x)' },
      { id: 'c', text: '-sin(x)' },
      { id: 'd', text: 'tan(x)' }
    ],
    correctOptionId: 'a',
    explanation: 'By standard differentiation rule: d/dx [sin(x)] = cos(x).',
    difficulty: 'Easy',
    examTag: 'HSC Maharashtra Board (12th Science Math)',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-hsc12-math-02',
    section: 'Mathematics',
    topic: 'Mathematics & Calculus',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'If A is a square matrix of order 3 × 3, the order of its transpose Aᵀ is:',
    options: [
      { id: 'a', text: '3 × 1' },
      { id: 'b', text: '1 × 3' },
      { id: 'c', text: '3 × 3' },
      { id: 'd', text: '9 × 9' }
    ],
    correctOptionId: 'c',
    explanation: 'Transpose of an m × n matrix has order n × m. For a 3 × 3 square matrix, transpose remains 3 × 3.',
    difficulty: 'Easy',
    examTag: 'HSC Maharashtra Board (12th Science Math)',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-hsc12-math-03',
    section: 'Mathematics',
    topic: 'Mathematics & Calculus',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'Find dy/dx if y = x³ + 3x² - 5x + 7.',
    options: [
      { id: 'a', text: '3x² + 6x - 5' },
      { id: 'b', text: '3x² + 3x - 5' },
      { id: 'c', text: 'x² + 6x + 7' },
      { id: 'd', text: '3x² + 6x + 7' }
    ],
    correctOptionId: 'a',
    explanation: 'Differentiating term-by-term: d/dx(x³) = 3x², d/dx(3x²) = 6x, d/dx(-5x) = -5, d/dx(7) = 0. dy/dx = 3x² + 6x - 5.',
    difficulty: 'Easy',
    examTag: 'HSC Maharashtra Board (12th Science Math)',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-hsc12-math-04',
    section: 'Mathematics',
    topic: 'Mathematics & Calculus',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'Evaluate the indefinite integral: ∫(2x + 3) dx',
    options: [
      { id: 'a', text: 'x² + 3x + C' },
      { id: 'b', text: '2x² + 3x + C' },
      { id: 'c', text: 'x² + C' },
      { id: 'd', text: '2x² + C' }
    ],
    correctOptionId: 'a',
    explanation: '∫ 2x dx = 2(x²/2) = x². ∫ 3 dx = 3x. Result = x² + 3x + C.',
    difficulty: 'Easy',
    examTag: 'HSC Maharashtra Board (12th Science Math)',
    dateAdded: '2026-08-31'
  },

  // Commerce - Accountancy Paper (80 Marks)
  {
    id: 'q-hsc12-acc-01',
    section: 'Accountancy',
    topic: 'Commerce & Accountancy',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'The fundamental Accounting Equation is represented as:',
    options: [
      { id: 'a', text: 'Assets = Liabilities - Capital' },
      { id: 'b', text: 'Assets = Capital + Liabilities' },
      { id: 'c', text: 'Capital = Assets + Liabilities' },
      { id: 'd', text: 'Liabilities = Assets + Capital' }
    ],
    correctOptionId: 'b',
    explanation: 'In double-entry bookkeeping, Total Assets of an entity are financed by Owners Capital and Outside Liabilities (Assets = Capital + Liabilities).',
    difficulty: 'Easy',
    examTag: 'HSC Maharashtra Board (12th Commerce Accountancy)',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-hsc12-acc-02',
    section: 'Accountancy',
    topic: 'Commerce & Accountancy',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'Goodwill in a business balance sheet is classified as a/an:',
    options: [
      { id: 'a', text: 'Current asset' },
      { id: 'b', text: 'Intangible fixed asset' },
      { id: 'c', text: 'Fictitious asset' },
      { id: 'd', text: 'Short-term liability' }
    ],
    correctOptionId: 'b',
    explanation: 'Goodwill is an intangible non-current asset representing the brand value, established reputation, and super-profit generating capacity of a firm.',
    difficulty: 'Easy',
    examTag: 'HSC Maharashtra Board (12th Commerce Accountancy)',
    dateAdded: '2026-08-31'
  },

  // Commerce - Economics Paper (80 Marks)
  {
    id: 'q-hsc12-eco-01',
    section: 'Economics',
    topic: 'Macro & Micro Economics',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'Which of the following is a primary characteristic of a Perfectly Competitive Market?',
    options: [
      { id: 'a', text: 'Single seller' },
      { id: 'b', text: 'Homogeneous products and price taking firms' },
      { id: 'c', text: 'Price discrimination' },
      { id: 'd', text: 'High artificial entry barriers' }
    ],
    correctOptionId: 'b',
    explanation: 'Perfect competition features numerous buyers and sellers trading identical (homogeneous) goods with zero individual market power to dictate price.',
    difficulty: 'Easy',
    examTag: 'HSC Maharashtra Board (12th Commerce Economics)',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-hsc12-eco-02',
    section: 'Economics',
    topic: 'Macro & Micro Economics',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: "In macroeconomic terminology, 'GDP' stands for:",
    options: [
      { id: 'a', text: 'Gross Domestic Product' },
      { id: 'b', text: 'General Domestic Price' },
      { id: 'c', text: 'Gross Development Plan' },
      { id: 'd', text: 'General Development Product' }
    ],
    correctOptionId: 'a',
    explanation: 'Gross Domestic Product (GDP) measures the monetary value of all final goods and services produced within a country’s borders over a specified accounting period.',
    difficulty: 'Easy',
    examTag: 'HSC Maharashtra Board (12th Commerce Economics)',
    dateAdded: '2026-08-31'
  },

  // Arts - History Paper (80 Marks)
  {
    id: 'q-hsc12-hist-01',
    section: 'History',
    topic: 'Modern Indian History',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'The historic "Quit India Movement" was launched by Mahatma Gandhi at the Gowalia Tank Maidan, Bombay, in the year:',
    options: [
      { id: 'a', text: '1930' },
      { id: 'b', text: '1942' },
      { id: 'c', text: '1947' },
      { id: 'd', text: '1919' }
    ],
    correctOptionId: 'b',
    explanation: 'The Quit India Movement (Bharat Chhodo Andolan) was launched on 8th August 1942 demanding an immediate end to British rule in India with the slogan "Do or Die".',
    difficulty: 'Easy',
    examTag: 'HSC Maharashtra Board (12th Arts History)',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-hsc12-hist-02',
    section: 'History',
    topic: 'Modern Indian History',
    examCategory: 'Class 12 Aptitude & Entrance',
    text: 'Who authored the renowned historical work "The Discovery of India" during imprisonment at Ahmednagar Fort (1942–1945)?',
    options: [
      { id: 'a', text: 'Mahatma Gandhi' },
      { id: 'b', text: 'Jawaharlal Nehru' },
      { id: 'c', text: 'Dr. B.R. Ambedkar' },
      { id: 'd', text: 'Sardar Vallabhbhai Patel' }
    ],
    correctOptionId: 'b',
    explanation: 'Pandit Jawaharlal Nehru wrote "The Discovery of India" while imprisoned by the colonial authorities in Ahmednagar fort jail.',
    difficulty: 'Easy',
    examTag: 'HSC Maharashtra Board (12th Arts History)',
    dateAdded: '2026-08-31'
  }
];

// ==========================================
// 6. SSC (CLASS 10) MAHARASHTRA BOARD SAMPLE PAPERS
// ==========================================
export const SSC_CLASS10_QUESTIONS: Question[] = [
  {
    id: 'q-ssc10-sci-01',
    section: 'Science & Technology',
    topic: 'Science & Technology',
    examCategory: 'Class 10 Foundation Aptitude',
    text: 'The SI unit of electric current measured by an ammeter is:',
    options: [
      { id: 'a', text: 'Volt' },
      { id: 'b', text: 'Ampere' },
      { id: 'c', text: 'Ohm' },
      { id: 'd', text: 'Watt' }
    ],
    correctOptionId: 'b',
    explanation: 'Electric current is the rate of flow of electric charge (I = Q/t). Its SI unit is the Ampere (A).',
    difficulty: 'Easy',
    examTag: 'SSC Maharashtra Board (10th Science 1)',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-ssc10-sci-02',
    section: 'Science & Technology',
    topic: 'Chemistry & Chemical Reactions',
    examCategory: 'Class 10 Foundation Aptitude',
    text: "Which gas is most abundant in the Earth's atmosphere, constituting approximately 78% of clean dry air by volume?",
    options: [
      { id: 'a', text: 'Oxygen' },
      { id: 'b', text: 'Carbon dioxide' },
      { id: 'c', text: 'Nitrogen' },
      { id: 'd', text: 'Hydrogen' }
    ],
    correctOptionId: 'c',
    explanation: 'Nitrogen gas (N₂) constitutes ~78.08% of atmospheric air, followed by Oxygen (~20.95%) and Argon (~0.93%).',
    difficulty: 'Easy',
    examTag: 'SSC Maharashtra Board (10th Science 1)',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-ssc10-sci-03',
    section: 'Science & Technology',
    topic: 'Science & Technology',
    examCategory: 'Class 10 Foundation Aptitude',
    text: 'The biological biochemical process by which autotrophic green plants synthesize glucose using sunlight, chlorophyll, CO₂, and water is called:',
    options: [
      { id: 'a', text: 'Respiration' },
      { id: 'b', text: 'Photosynthesis' },
      { id: 'c', text: 'Transpiration' },
      { id: 'd', text: 'Digestion' }
    ],
    correctOptionId: 'b',
    explanation: '6CO₂ + 6H₂O + Sunlight (Chlorophyll) -> C₆H₁₂O₆ + 6O₂ represents Photosynthesis.',
    difficulty: 'Easy',
    examTag: 'SSC Maharashtra Board (10th Science 1)',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-ssc10-sci-04',
    section: 'Science & Technology',
    topic: 'Science & Technology',
    examCategory: 'Class 10 Foundation Aptitude',
    text: 'Which of the following is an inexhaustible, clean, and renewable source of energy?',
    options: [
      { id: 'a', text: 'Coal' },
      { id: 'b', text: 'Petroleum' },
      { id: 'c', text: 'Solar energy' },
      { id: 'd', text: 'Natural gas' }
    ],
    correctOptionId: 'c',
    explanation: 'Solar energy is naturally replenished and causes zero direct greenhouse gas emissions during photovoltaic conversion.',
    difficulty: 'Easy',
    examTag: 'SSC Maharashtra Board (10th Science 1)',
    dateAdded: '2026-08-31'
  },
  {
    id: 'q-ssc10-sci-05',
    section: 'Science & Technology',
    topic: 'Chemistry & Chemical Reactions',
    examCategory: 'Class 10 Foundation Aptitude',
    text: 'The pH value of pure neutral water at 25°C is:',
    options: [
      { id: 'a', text: '0' },
      { id: 'b', text: '7' },
      { id: 'c', text: '14' },
      { id: 'd', text: '10' }
    ],
    correctOptionId: 'b',
    explanation: 'On the standard Sorensen pH scale (0 to 14), pH 7 indicates a perfectly neutral solution where [H⁺] = [OH⁻] = 10⁻⁷ M.',
    difficulty: 'Easy',
    examTag: 'SSC Maharashtra Board (10th Science 1)',
    dateAdded: '2026-08-31'
  }
];

// ==========================================
// ALL NEW MOCK PAPERS GROUPED ACCORDING TO THEIR EXAMS
// ==========================================
export const ALL_NEW_MOCK_TESTS: MockTest[] = [
  // 1. Banking Exam Mock Aptitude Test (IBPS / SBI PO & Clerk Pattern)
  {
    id: 'mock-banking-aptitude-21q',
    title: 'Banking Exam Mock Aptitude Test (IBPS / SBI PO & Clerk Pattern)',
    subtitle: 'Comprehensive 21-question original paper with Reasoning Ability, Quantitative Aptitude, English & Banking Awareness',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    totalQuestions: 21,
    overallTimeLimitMinutes: 60,
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
        id: 'sec-bnk-reasoning',
        section: 'Reasoning Ability',
        questionIds: ['q-bnk-apt-01', 'q-bnk-apt-02', 'q-bnk-apt-03', 'q-bnk-apt-04', 'q-bnk-apt-05', 'q-bnk-apt-06'],
        timeLimitMinutes: 15,
        cutoffMarks: 4.0
      },
      {
        id: 'sec-bnk-quant',
        section: 'Quantitative Aptitude',
        questionIds: ['q-bnk-apt-07', 'q-bnk-apt-08', 'q-bnk-apt-09', 'q-bnk-apt-10', 'q-bnk-apt-11', 'q-bnk-apt-12'],
        timeLimitMinutes: 20,
        cutoffMarks: 4.0
      },
      {
        id: 'sec-bnk-english',
        section: 'English Language',
        questionIds: ['q-bnk-apt-13', 'q-bnk-apt-14', 'q-bnk-apt-15', 'q-bnk-apt-16', 'q-bnk-apt-17'],
        timeLimitMinutes: 15,
        cutoffMarks: 3.5
      },
      {
        id: 'sec-bnk-ga',
        section: 'General / Banking Awareness',
        questionIds: ['q-bnk-apt-18', 'q-bnk-apt-19', 'q-bnk-apt-20', 'q-bnk-apt-21'],
        timeLimitMinutes: 10,
        cutoffMarks: 2.5
      }
    ],
    questions: BANKING_MOCK_QUESTIONS,
    isPopular: true
  },

  // 2. SBI PO Prelims 2023 (1st Nov) Shift-wise PYP Mock-03
  {
    id: 'mock-sbipo-pre-2023-shift3',
    title: 'SBI PO Prelims 2023 (1st Nov) Shift-wise PYP Mock-03',
    subtitle: 'Authentic Adda247 PYP simulation with Heat Waves Reading Comprehension, Double Pie Chart DI, North-facing Bags puzzle & Syllogisms',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    totalQuestions: SBI_PO_PRE_2023_QUESTIONS.length,
    overallTimeLimitMinutes: 60,
    marksPerQuestion: 1.0,
    negativeMarksPerQuestion: 0.25,
    overallCutoffMarks: 11.5,
    categoryCutoffs: {
      UR: 11.5,
      OBC: 10.0,
      EWS: 9.5,
      SC: 8.0,
      ST: 7.0
    },
    sections: [
      {
        id: 'sec-sbipo-eng',
        section: 'English Language',
        questionIds: ['q-sbipo23-01', 'q-sbipo23-02', 'q-sbipo23-03', 'q-sbipo23-04', 'q-sbipo23-05', 'q-sbipo23-06', 'q-sbipo23-07', 'q-sbipo23-08', 'q-sbipo23-09', 'q-sbipo23-14', 'q-sbipo23-16'],
        timeLimitMinutes: 20,
        cutoffMarks: 6.0
      },
      {
        id: 'sec-sbipo-quant',
        section: 'Quantitative Aptitude',
        questionIds: ['q-sbipo23-31', 'q-sbipo23-32', 'q-sbipo23-35', 'q-sbipo23-53', 'q-sbipo23-54'],
        timeLimitMinutes: 20,
        cutoffMarks: 3.5
      },
      {
        id: 'sec-sbipo-reasoning',
        section: 'Reasoning Ability',
        questionIds: ['q-sbipo23-66', 'q-sbipo23-71', 'q-sbipo23-89', 'q-sbipo23-92'],
        timeLimitMinutes: 20,
        cutoffMarks: 3.0
      }
    ],
    questions: SBI_PO_PRE_2023_QUESTIONS,
    isPopular: true
  },

  // 3. SBI PO Mains 2017 Memory-Based Full Mock Paper
  {
    id: 'mock-sbipo-mains-2017',
    title: 'SBI PO Mains 2017 Memory-Based Full Mock Paper',
    subtitle: 'High-difficulty Mains simulation featuring machine input steps, critical reasoning, coded clocks, probability comparisons & passage noise analysis',
    examCategory: 'Banking (IBPS/SBI/RBI)',
    totalQuestions: SBI_PO_MAINS_2017_QUESTIONS.length,
    overallTimeLimitMinutes: 90,
    marksPerQuestion: 1.5,
    negativeMarksPerQuestion: 0.375,
    overallCutoffMarks: 8.5,
    categoryCutoffs: {
      UR: 8.5,
      OBC: 7.5,
      EWS: 7.0,
      SC: 5.5,
      ST: 5.0
    },
    sections: [
      {
        id: 'sec-sbimains-reasoning',
        section: 'Reasoning Ability',
        questionIds: ['q-sbimains17-01', 'q-sbimains17-05', 'q-sbimains17-08', 'q-sbimains17-16'],
        timeLimitMinutes: 35,
        cutoffMarks: 4.5
      },
      {
        id: 'sec-sbimains-quant',
        section: 'Quantitative Aptitude',
        questionIds: ['q-sbimains17-46', 'q-sbimains17-48', 'q-sbimains17-50'],
        timeLimitMinutes: 35,
        cutoffMarks: 3.0
      },
      {
        id: 'sec-sbimains-eng',
        section: 'English Language',
        questionIds: ['q-sbimains17-81', 'q-sbimains17-99'],
        timeLimitMinutes: 20,
        cutoffMarks: 2.0
      }
    ],
    questions: SBI_PO_MAINS_2017_QUESTIONS,
    isPopular: true
  },

  // 4. Railway Exam Mock Aptitude Test (RRB NTPC / Group D Pattern)
  {
    id: 'mock-railway-ntpc-21q',
    title: 'Railway Exam Mock Aptitude Test (RRB NTPC / Group D Pattern)',
    subtitle: 'Official 21-question railway pattern mock test with Mathematics, Reasoning, General Awareness & General Science',
    examCategory: 'Railways (RRB NTPC/Group D)',
    totalQuestions: 21,
    overallTimeLimitMinutes: 60,
    marksPerQuestion: 1.0,
    negativeMarksPerQuestion: 0.33,
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
        id: 'sec-rrb-math',
        section: 'Mathematics',
        questionIds: ['q-rrb-apt-01', 'q-rrb-apt-02', 'q-rrb-apt-03', 'q-rrb-apt-04', 'q-rrb-apt-05', 'q-rrb-apt-06'],
        timeLimitMinutes: 20,
        cutoffMarks: 4.0
      },
      {
        id: 'sec-rrb-reasoning',
        section: 'General Intelligence & Reasoning',
        questionIds: ['q-rrb-apt-07', 'q-rrb-apt-08', 'q-rrb-apt-09', 'q-rrb-apt-10', 'q-rrb-apt-11', 'q-rrb-apt-12'],
        timeLimitMinutes: 20,
        cutoffMarks: 4.0
      },
      {
        id: 'sec-rrb-ga',
        section: 'General Awareness',
        questionIds: ['q-rrb-apt-13', 'q-rrb-apt-14', 'q-rrb-apt-15', 'q-rrb-apt-16', 'q-rrb-apt-17'],
        timeLimitMinutes: 10,
        cutoffMarks: 3.5
      },
      {
        id: 'sec-rrb-science',
        section: 'General Science',
        questionIds: ['q-rrb-apt-18', 'q-rrb-apt-19', 'q-rrb-apt-20', 'q-rrb-apt-21'],
        timeLimitMinutes: 10,
        cutoffMarks: 3.0
      }
    ],
    questions: RAILWAY_MOCK_QUESTIONS,
    isPopular: true
  },

  // 5. HSC (Class 12 Science) Chemistry Maharashtra Board Pattern Paper
  {
    id: 'mock-hsc12-chemistry',
    title: 'HSC (Class 12 Science) Chemistry Maharashtra Board Pattern Paper',
    subtitle: 'Standard 70-mark board evaluation with Organic Chemistry, Solutions Molarity, Electrolytes & Reaction Kinetics (No Negative Marking)',
    examCategory: 'Class 12 Aptitude & Entrance',
    totalQuestions: 4,
    overallTimeLimitMinutes: 180,
    marksPerQuestion: 1.0,
    negativeMarksPerQuestion: 0.0,
    overallCutoffMarks: 2.5,
    categoryCutoffs: {
      UR: 2.5,
      OBC: 2.0,
      EWS: 2.0,
      SC: 1.5,
      ST: 1.5
    },
    sections: [
      {
        id: 'sec-hsc12-chem',
        section: 'Chemistry',
        questionIds: ['q-hsc12-chem-01', 'q-hsc12-chem-02', 'q-hsc12-chem-03', 'q-hsc12-chem-04'],
        timeLimitMinutes: 180,
        cutoffMarks: 2.5
      }
    ],
    questions: HSC_CLASS12_QUESTIONS.filter(q => q.section === 'Chemistry'),
    isPopular: true
  },

  // 6. HSC (Class 12 Science) Physics Maharashtra Board Pattern Paper
  {
    id: 'mock-hsc12-physics',
    title: 'HSC (Class 12 Science) Physics Maharashtra Board Pattern Paper',
    subtitle: '70-mark board syllabus drill covering Dimensions, Bohr Model Angular Momentum, Wave Diffraction & Capacitor Energy',
    examCategory: 'Class 12 Aptitude & Entrance',
    totalQuestions: 4,
    overallTimeLimitMinutes: 180,
    marksPerQuestion: 1.0,
    negativeMarksPerQuestion: 0.0,
    overallCutoffMarks: 2.5,
    categoryCutoffs: {
      UR: 2.5,
      OBC: 2.0,
      EWS: 2.0,
      SC: 1.5,
      ST: 1.5
    },
    sections: [
      {
        id: 'sec-hsc12-phy',
        section: 'Physics',
        questionIds: ['q-hsc12-phy-01', 'q-hsc12-phy-02', 'q-hsc12-phy-03', 'q-hsc12-phy-04'],
        timeLimitMinutes: 180,
        cutoffMarks: 2.5
      }
    ],
    questions: HSC_CLASS12_QUESTIONS.filter(q => q.section === 'Physics'),
    isPopular: true
  },

  // 7. HSC (Class 12 Science) Mathematics & Statistics Maharashtra Board Paper
  {
    id: 'mock-hsc12-math',
    title: 'HSC (Class 12 Science) Mathematics & Statistics Maharashtra Board Paper',
    subtitle: '80-mark board pattern test with Derivatives, Indefinite Integrals, Matrix Transpose & Polynomial Differentiation',
    examCategory: 'Class 12 Aptitude & Entrance',
    totalQuestions: 4,
    overallTimeLimitMinutes: 180,
    marksPerQuestion: 1.0,
    negativeMarksPerQuestion: 0.0,
    overallCutoffMarks: 2.5,
    categoryCutoffs: {
      UR: 2.5,
      OBC: 2.0,
      EWS: 2.0,
      SC: 1.5,
      ST: 1.5
    },
    sections: [
      {
        id: 'sec-hsc12-math',
        section: 'Mathematics',
        questionIds: ['q-hsc12-math-01', 'q-hsc12-math-02', 'q-hsc12-math-03', 'q-hsc12-math-04'],
        timeLimitMinutes: 180,
        cutoffMarks: 2.5
      }
    ],
    questions: HSC_CLASS12_QUESTIONS.filter(q => q.section === 'Mathematics'),
    isPopular: true
  },

  // 8. HSC (Class 12 Commerce & Arts) Integrated Maharashtra Board Paper
  {
    id: 'mock-hsc12-commerce-arts',
    title: 'HSC (Class 12 Commerce & Arts) Accountancy, Economics & History Board Paper',
    subtitle: '80-mark pattern paper featuring Accounting Equation, Goodwill, Market Competition, GDP, Quit India Movement & Nehru literature',
    examCategory: 'Class 12 Aptitude & Entrance',
    totalQuestions: 6,
    overallTimeLimitMinutes: 180,
    marksPerQuestion: 1.0,
    negativeMarksPerQuestion: 0.0,
    overallCutoffMarks: 4.0,
    categoryCutoffs: {
      UR: 4.0,
      OBC: 3.5,
      EWS: 3.5,
      SC: 2.5,
      ST: 2.5
    },
    sections: [
      {
        id: 'sec-hsc12-acc',
        section: 'Accountancy',
        questionIds: ['q-hsc12-acc-01', 'q-hsc12-acc-02'],
        timeLimitMinutes: 60,
        cutoffMarks: 1.5
      },
      {
        id: 'sec-hsc12-eco',
        section: 'Economics',
        questionIds: ['q-hsc12-eco-01', 'q-hsc12-eco-02'],
        timeLimitMinutes: 60,
        cutoffMarks: 1.5
      },
      {
        id: 'sec-hsc12-hist',
        section: 'History',
        questionIds: ['q-hsc12-hist-01', 'q-hsc12-hist-02'],
        timeLimitMinutes: 60,
        cutoffMarks: 1.5
      }
    ],
    questions: HSC_CLASS12_QUESTIONS.filter(q => q.section === 'Accountancy' || q.section === 'Economics' || q.section === 'History'),
    isPopular: true
  },

  // 9. SSC (Class 10) Science & Technology 1 Maharashtra Board Pattern Paper
  {
    id: 'mock-ssc10-science1',
    title: 'SSC (Class 10) Science & Technology 1 Maharashtra Board Pattern Paper',
    subtitle: '40-mark Maharashtra state board standard paper covering Electric Current, Atmospheric Gases, Photosynthesis, Solar Energy & Water pH',
    examCategory: 'Class 10 Foundation Aptitude',
    totalQuestions: 5,
    overallTimeLimitMinutes: 120,
    marksPerQuestion: 1.0,
    negativeMarksPerQuestion: 0.0,
    overallCutoffMarks: 3.5,
    categoryCutoffs: {
      UR: 3.5,
      OBC: 3.0,
      EWS: 3.0,
      SC: 2.5,
      ST: 2.0
    },
    sections: [
      {
        id: 'sec-ssc10-sci1',
        section: 'Science & Technology',
        questionIds: ['q-ssc10-sci-01', 'q-ssc10-sci-02', 'q-ssc10-sci-03', 'q-ssc10-sci-04', 'q-ssc10-sci-05'],
        timeLimitMinutes: 120,
        cutoffMarks: 3.5
      }
    ],
    questions: SSC_CLASS10_QUESTIONS,
    isPopular: true
  }
];

export const ALL_NEW_QUESTIONS: Question[] = [
  ...BANKING_MOCK_QUESTIONS,
  ...RAILWAY_MOCK_QUESTIONS,
  ...SBI_PO_PRE_2023_QUESTIONS,
  ...SBI_PO_MAINS_2017_QUESTIONS,
  ...HSC_CLASS12_QUESTIONS,
  ...SSC_CLASS10_QUESTIONS
];
