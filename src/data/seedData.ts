import { 
  AcademicSchool, 
  Program, 
  Course, 
  User, 
  StudentCourseProgress, 
  AssignmentSubmission, 
  ExamAttempt, 
  AdmissionApplication, 
  Invoice, 
  PaymentTransaction, 
  DigitalCertificate, 
  LibraryResource, 
  MinistryResource, 
  EventItem, 
  AnnouncementItem, 
  DiscussionPost, 
  SupportTicket, 
  InstitutionSettings 
} from '../types';

export const INITIAL_INSTITUTION_SETTINGS: InstitutionSettings = {
  name: 'Brooks of Life Schools of Ministry -UK-',
  motto: 'Equipping • Empowering • Enriching — Training and Equipping People for Effective Ministry and Kingdom Impact (2 Timothy 2:2)',
  acronym: 'BLSM',
  foundedYear: '2014',
  president: 'Rev. Dr. Emmanuel O. Brooks, Th.D., D.Min.',
  registrar: 'Rev. Arthur C. Pendelton, Ph.D.',
  contactEmail: 'admissions@brooksoflife.edu',
  contactPhone: '+44 20 7946 0192 / +1 (800) 555-BLSM',
  address: 'Brooks of Life Ministries International -UK- | Global Online Theological Campus',
  accreditationNote: 'Brooks of Life Schools of Ministry -UK- is an institutional member of the International Theological Accreditation Association (ITAA) and operates as a recognized ecclesiastical institution dedicated to theological training for ordained and lay ministry.',
  announcementTicker: '📢 Fall 2026 Admissions are now open! Early scholarship applications close September 15. Welcome to Brooks of Life Schools of Ministry -UK-.',
  gradingScale: [
    { grade: 'A', min: 85, max: 100, points: 4.0 },
    { grade: 'A-', min: 80, max: 84, points: 3.7 },
    { grade: 'B+', min: 75, max: 79, points: 3.3 },
    { grade: 'B', min: 70, max: 74, points: 3.0 },
    { grade: 'B-', min: 65, max: 69, points: 2.7 },
    { grade: 'C+', min: 60, max: 64, points: 2.3 },
    { grade: 'C', min: 55, max: 59, points: 2.0 },
    { grade: 'D', min: 50, max: 54, points: 1.0 },
    { grade: 'F', min: 0, max: 49, points: 0.0 },
  ]
};

export const INITIAL_SCHOOLS: AcademicSchool[] = [
  {
    id: 'school-biblical-studies',
    name: 'School of Biblical Studies',
    code: 'SBS',
    description: 'In-depth exploration of the Old and New Testaments, Biblical Greek and Hebrew, hermeneutical exegesis, and biblical theology.',
    deanName: 'Prof. Dr. Jonathan Edwards',
    deanTitle: 'Dean & Professor of Old Testament Literature',
    icon: 'BookOpen',
    accentColor: '#1e3a8a', // navy
    coursesCount: 16
  },
  {
    id: 'school-theology',
    name: 'School of Theology',
    code: 'SOT',
    description: 'Systematic theology, historical Christian doctrine, apologetics, Christology, Pneumatology, Soteriology, and theological philosophy.',
    deanName: 'Dr. Rebecca A. MacGregor',
    deanTitle: 'Dean & Professor of Systematic Theology',
    icon: 'Compass',
    accentColor: '#0f766e', // teal
    coursesCount: 14
  },
  {
    id: 'school-christian-ministry',
    name: 'School of Christian Ministry',
    code: 'SCM',
    description: 'Practical training for pastoral ministry, expository preaching, homiletics, church planting, discipleship, and evangelism.',
    deanName: 'Bishop Samuel K. Vance',
    deanTitle: 'Dean & Professor of Pastoral Ministry',
    icon: 'Church',
    accentColor: '#b45309', // amber
    coursesCount: 15
  },
  {
    id: 'school-leadership-admin',
    name: 'School of Leadership & Ministry Administration',
    code: 'SLMA',
    description: 'Strategic leadership, non-profit church governance, financial stewardship, ethical administration, and organizational health.',
    deanName: 'Dr. Timothy W. Sterling',
    deanTitle: 'Dean of Ministry Leadership',
    icon: 'ShieldCheck',
    accentColor: '#4338ca', // indigo
    coursesCount: 12
  },
  {
    id: 'school-counseling',
    name: 'School of Christian Counseling',
    code: 'SCC',
    description: 'Biblically grounded pastoral counseling, family restoration, grief and crisis intervention, and spiritual formation.',
    deanName: 'Dr. Miriam E. Thorne',
    deanTitle: 'Dean of Pastoral Counseling',
    icon: 'HeartHandshake',
    accentColor: '#be123c', // rose
    coursesCount: 10
  },
  {
    id: 'school-missions',
    name: 'School of Missions & Evangelism',
    code: 'SME',
    description: 'Cross-cultural missiology, urban church planting, world religions, apologetics in pluralistic societies, and field mobilization.',
    deanName: 'Rev. Dr. David Livingstone Chen',
    deanTitle: 'Dean of Global Missiology',
    icon: 'Globe',
    accentColor: '#047857', // emerald
    coursesCount: 11
  },
  {
    id: 'school-education',
    name: 'School of Christian Education',
    code: 'SCE',
    description: 'Curriculum development, adult Bible teaching methodology, youth and children discipleship pedagogy, and ministry training.',
    deanName: 'Dr. Hannah Joy Alistair',
    deanTitle: 'Dean of Christian Education',
    icon: 'GraduationCap',
    accentColor: '#7c2d12', // orange
    coursesCount: 9
  },
  {
    id: 'school-worship',
    name: 'School of Worship & Creative Ministry',
    code: 'SWCM',
    description: 'Theology of biblical worship, music ministry leadership, digital media communications, and liturgical arts.',
    deanName: 'Pastor Marcus Sterling',
    deanTitle: 'Director of Liturgical Arts & Worship',
    icon: 'Music',
    accentColor: '#6d28d9', // purple
    coursesCount: 8
  },
  {
    id: 'school-chaplaincy',
    name: 'School of Chaplaincy',
    code: 'SOC',
    description: 'Institutional, hospital, military, prison, and corporate chaplaincy ethics, trauma care, and bedside ministry.',
    deanName: 'Chaplain Col. (Ret.) James Thornton',
    deanTitle: 'Dean of Chaplaincy Studies',
    icon: 'Cross',
    accentColor: '#334155', // slate
    coursesCount: 10
  }
];

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'cert-christian-ministry',
    schoolId: 'school-christian-ministry',
    code: 'CCM-100',
    title: 'Certificate in Christian Ministry',
    level: 'Certificate',
    duration: '6 Months (18 Credits)',
    totalCredits: 18,
    tuitionPerSemester: 450,
    description: 'A foundational training program designed for lay leaders, Sunday school teachers, and ministry volunteers seeking structured biblical grounding.',
    objectives: [
      'Grasp foundational Old and New Testament narratives',
      'Understand essential Christian doctrine and spiritual disciplines',
      'Acquire basic skills in personal evangelism and small group leadership'
    ],
    careerOutcomes: ['Lay Minister', 'Home Fellowship Leader', 'Ministry Volunteer', 'Sunday School Teacher'],
    requirements: ['High school diploma or ministry recommendation letter', 'Personal testimony of faith'],
    featured: true
  },
  {
    id: 'cert-biblical-studies',
    schoolId: 'school-biblical-studies',
    code: 'CBS-110',
    title: 'Certificate in Biblical Studies',
    level: 'Certificate',
    duration: '6 Months (18 Credits)',
    totalCredits: 18,
    tuitionPerSemester: 450,
    description: 'Intensive biblical survey covering hermeneutics, major themes, covenantal theology, and foundational Bible interpretation techniques.',
    objectives: [
      'Interpret passages with historical-grammatical rigor',
      'Understand major theological covenants throughout Scripture',
      'Utilize digital study tools and basic lexical resources'
    ],
    careerOutcomes: ['Bible Teacher', 'Discipleship Leader', 'Youth Ministry Worker'],
    requirements: ['Ministry Recommendation', 'Personal Statement of Calling']
  },
  {
    id: 'dip-theology',
    schoolId: 'school-theology',
    code: 'DTH-200',
    title: 'Diploma in Theology & Ministry',
    level: 'Diploma',
    duration: '1 Year (36 Credits)',
    totalCredits: 36,
    tuitionPerSemester: 750,
    description: 'Comprehensive academic grounding in Systematic Theology, Church History, Homiletics, and Pastoral Epistles for active ministers.',
    objectives: [
      'Synthesize systematic doctrines: Theology Proper, Christology, Pneumatology',
      'Trace Church History from Early Fathers through the Reformation',
      'Prepare sound expository sermon outlines from OT and NT'
    ],
    careerOutcomes: ['Associate Pastor', 'Itinerant Evangelist', 'Church Planter', 'Ministry Coordinator'],
    requirements: ['Secondary school completion or prior certificate', 'Pastor endorsement'],
    featured: true
  },
  {
    id: 'bach-theology',
    schoolId: 'school-theology',
    code: 'BTH-300',
    title: 'Bachelor of Theology (B.Th.)',
    level: 'Bachelor',
    duration: '3 Years (96 Credits)',
    totalCredits: 96,
    tuitionPerSemester: 1100,
    description: 'Our flagship degree program combining deep biblical languages, historical theology, pastoral ethics, and a supervised ministry practicum.',
    objectives: [
      'Master advanced biblical hermeneutics and original language syntax',
      'Defend historic orthodox faith through classical Christian apologetics',
      'Execute ecclesiastical administration, counseling, and governance with biblical fidelity',
      'Complete a capstone theological research thesis and ministry practicum'
    ],
    careerOutcomes: ['Senior Pastor', 'Seminary Instructor', 'Mission Director', 'Theological Researcher'],
    requirements: ['High School Diploma/A-Levels or equivalent Diploma', 'Two pastoral recommendation letters', 'Statement of Calling'],
    featured: true
  },
  {
    id: 'bach-christian-leadership',
    schoolId: 'school-leadership-admin',
    code: 'BCL-320',
    title: 'Bachelor of Christian Leadership & Administration',
    level: 'Bachelor',
    duration: '3 Years (96 Credits)',
    totalCredits: 96,
    tuitionPerSemester: 1100,
    description: 'Equipping future ministry executives, NGO leaders, and church administrators with strategic governance, ethics, and kingdom stewardship.',
    objectives: [
      'Formulate strategic ministry master plans and budgets',
      'Lead cross-generational teams with servant-hearted emotional intelligence',
      'Establish robust non-profit compliance and financial transparency'
    ],
    careerOutcomes: ['Executive Pastor', 'Ministry Operations Director', 'Christian NGO Executive', 'Denominational Administrator'],
    requirements: ['Secondary education certificate', 'Church leadership track record']
  },
  {
    id: 'bach-counseling',
    schoolId: 'school-counseling',
    code: 'BCC-340',
    title: 'Bachelor of Christian Counseling & Care',
    level: 'Bachelor',
    duration: '3 Years (96 Credits)',
    totalCredits: 96,
    tuitionPerSemester: 1100,
    description: 'Pastoral counseling training grounded in Scriptural truth, addressing marriage, grief, family dynamics, and spiritual warfare with ethical clarity.',
    objectives: [
      'Apply biblical anthropology to emotional and relational distress',
      'Navigate crisis counseling, trauma debriefing, and marital reconciliation',
      'Maintain strict ethical boundaries and referral networks'
    ],
    careerOutcomes: ['Pastoral Counselor', 'Family Ministry Director', 'Crisis Chaplain', 'Recovery Ministry Leader'],
    requirements: ['High school diploma', 'Maturity assessment & pastoral interview']
  },
  {
    id: 'mast-christian-ministry',
    schoolId: 'school-christian-ministry',
    code: 'MCM-500',
    title: 'Master of Christian Ministry (M.C.M.)',
    level: 'Master',
    duration: '2 Years (48 Credits)',
    totalCredits: 48,
    tuitionPerSemester: 1450,
    description: 'Postgraduate professional degree for experienced pastors and ministry leaders focusing on organizational transformation, homiletics, and advanced missiology.',
    objectives: [
      'Conduct original empirical research in church renewal and revitalization',
      'Formulate advanced pastoral care models for urban and rural settings',
      'Author a comprehensive ministry project capstone'
    ],
    careerOutcomes: ['Lead Pastor', 'Denominational Superintendent', 'Missions Strategist'],
    requirements: ['Accredited Bachelor degree in any discipline', 'Minimum 3 years active ministry experience'],
    featured: true
  },
  {
    id: 'mast-theology',
    schoolId: 'school-theology',
    code: 'MTH-520',
    title: 'Master of Theology (M.Th.)',
    level: 'Master',
    duration: '2 Years (48 Credits)',
    totalCredits: 48,
    tuitionPerSemester: 1450,
    description: 'Advanced theological research degree preparing scholars for seminary teaching, doctrinal writing, and academic theological defense.',
    objectives: [
      'Examine Patristic, Medieval, Reformation, and Contemporary theological treatises',
      'Produce peer-review quality theological discourse',
      'Write and defend a master’s thesis'
    ],
    careerOutcomes: ['Seminary Professor', 'Academic Dean', 'Theological Author', 'Doctoral Candidate'],
    requirements: ['Bachelor of Theology or equivalent degree with minimum 3.0 GPA']
  },
  {
    id: 'doc-ministry',
    schoolId: 'school-christian-ministry',
    code: 'DMIN-700',
    title: 'Doctor of Ministry (D.Min.)',
    level: 'Doctoral',
    duration: '3 Years (36 Credits + Dissertation)',
    totalCredits: 36,
    tuitionPerSemester: 1800,
    description: 'The highest practical ministry qualification designed for veteran ministers to pioneer groundbreaking research in Kingdom leadership.',
    objectives: [
      'Design and implement an innovative major ministry project',
      'Mentor next-generation Christian leaders',
      'Publish a peer-reviewed doctoral dissertation'
    ],
    careerOutcomes: ['Senior Bishop / Presiding Overseer', 'Institutional President', 'Global Mission Executive'],
    requirements: ['Master degree in Theology or Ministry', '5+ years in ordained pastoral oversight'],
    featured: true
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-theo-201',
    programId: 'bach-theology',
    schoolId: 'school-theology',
    courseCode: 'THEO-201',
    title: 'Systematic Theology I: Theology Proper, Christology & Pneumatology',
    credits: 3,
    level: 'Undergraduate Core',
    instructorName: 'Dr. Rebecca A. MacGregor',
    instructorTitle: 'Dean & Professor of Systematic Theology',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    description: 'An exhaustive exploration of the doctrine of God (His nature, Trinity, decrees), the person and work of Jesus Christ (hypostatic union, atonement, resurrection), and the person and ministry of the Holy Spirit.',
    learningOutcomes: [
      'Articulate the classical orthodox formulation of the Holy Trinity with biblical precision',
      'Analyze the historical Christological councils (Nicaea 325 AD, Chalcedon 451 AD) against historic heresies',
      'Formulate a robust biblical theology of the Holy Spirit’s gifts, fruit, and empowerment for world missions'
    ],
    requiredReading: [
      'Calvin, John. Institutes of the Christian Religion (Book I & II)',
      'Berkhof, Louis. Systematic Theology (Part I & III)',
      'Grudem, Wayne. Bible Doctrine: Essential Teachings of the Christian Faith'
    ],
    syllabusOverview: 'Module 1: The Doctrine of God | Module 2: The Trinity & Divine Attributes | Module 3: Christology & Hypostatic Union | Module 4: Pneumatology & Kingdom Power',
    gradingBreakdown: {
      assignments: 20,
      quizzes: 10,
      midterm: 20,
      finalExam: 40,
      ministryPracticum: 10
    },
    assignments: [
      {
        id: 'assign-theo-1',
        courseId: 'course-theo-201',
        title: 'Exegesis & Theological Synthesis on Philippians 2:5-11 (The Kenosis)',
        instructions: 'Write a 1,500-word theological paper analyzing the "Carmen Christi" hymn of Philippians 2:5-11. Address: 1) The meaning of morphe theou (form of God), 2) The nature of Christ emptying Himself (ekenōsen), and 3) The pastoral and ethical implications for modern ministry leadership. Cite at least 5 scholarly sources.',
        rubric: [
          { criteria: 'Exegetical & Greek Syntax Analysis', maxMarks: 35 },
          { criteria: 'Doctrinal Accuracy & Orthodoxy', maxMarks: 35 },
          { criteria: 'Pastoral Application & Practical Ministry', maxMarks: 20 },
          { criteria: 'Academic Structure & Citations', maxMarks: 10 }
        ],
        totalMarks: 100,
        weightagePercent: 20,
        dueDate: '2026-09-25T23:59:00Z',
        submissionType: 'hermeneutical_paper'
      }
    ],
    examination: {
      id: 'exam-theo-final',
      courseId: 'course-theo-201',
      title: 'TEMS Comprehensive Final Examination in Systematic Theology I',
      type: 'final',
      instructions: 'This is a timed, proctored comprehensive examination. You will have 60 minutes to answer 5 multiple-choice questions, 2 scripture interpretation questions, and 1 ministry case study. Maintain strict academic integrity in the presence of God.',
      durationMinutes: 60,
      totalMarks: 100,
      passMarkPercent: 60,
      weightagePercent: 40,
      startDate: '2026-09-01T00:00:00Z',
      endDate: '2026-10-15T23:59:00Z',
      status: 'active',
      questions: [
        {
          id: 'q-theo-1',
          courseId: 'course-theo-201',
          type: 'multiple_choice',
          questionText: 'Which Council in 451 AD established the orthodox definition that Christ is one Person in two natures, unmixed, unchanged, undivided, and unseparated?',
          options: ['Council of Nicaea', 'Council of Constantinople', 'Council of Chalcedon', 'Council of Trent'],
          correctAnswer: 'Council of Chalcedon',
          marks: 10,
          scriptureAnchor: 'John 1:14; Colossians 2:9',
          modelAnswer: 'The Council of Chalcedon (451 AD) affirmed the Hypostatic Union: Christ has two distinct natures (fully divine, fully human) united in one divine person without confusion or division.'
        },
        {
          id: 'q-theo-2',
          courseId: 'course-theo-201',
          type: 'multiple_choice',
          questionText: 'What is the theological term for God being all-knowing, possessing complete knowledge of all actual and possible things?',
          options: ['Omnipresence', 'Omnipotence', 'Omniscience', 'Aseity'],
          correctAnswer: 'Omniscience',
          marks: 10,
          scriptureAnchor: 'Psalm 139:1-6; 1 John 3:20'
        },
        {
          id: 'q-theo-3',
          courseId: 'course-theo-201',
          type: 'true_false',
          questionText: 'True or False: The doctrine of the Trinity teaches that God exists as three separate and distinct gods (Tritheism).',
          options: ['True', 'False'],
          correctAnswer: 'False',
          marks: 10,
          scriptureAnchor: 'Deuteronomy 6:4; Matthew 28:19',
          modelAnswer: 'False. Orthodoxy affirms Monotheism: One God eternally existing in three co-equal, co-eternal divine Persons: Father, Son, and Holy Spirit.'
        },
        {
          id: 'q-theo-4',
          courseId: 'course-theo-201',
          type: 'scripture_interpretation',
          questionText: 'Interpret the phrase "The Spirit Himself bears witness with our spirit that we are children of God" (Romans 8:16) in light of Pneumatology and Christian assurance.',
          marks: 30,
          scriptureAnchor: 'Romans 8:14-17; Galatians 4:6',
          modelAnswer: 'The Holy Spirit provides inner relational assurance (testimonium internum) to the regenerated believer, confirming their adoption into the family of God, evidenced by intimacy (Abba Father) and holy transformation.'
        },
        {
          id: 'q-theo-5',
          courseId: 'course-theo-201',
          type: 'ministry_case_study',
          questionText: 'Ministry Scenario: A church member in your Bible study asserts that Jesus was created by God before anything else as a high angel (Arianism). How would you shepherd and correct this misunderstanding using Scripture (e.g. John 1:1-3, Colossians 1:15-17, Hebrews 1) with grace and doctrinal precision?',
          marks: 40,
          scriptureAnchor: 'John 1:1-3; Colossians 1:15-17; Hebrews 1:1-8'
        }
      ]
    },
    modules: [
      {
        id: 'mod-theo-1',
        courseId: 'course-theo-201',
        title: 'Module 1: The Knowability and Incommunicable Attributes of God',
        sequence: 1,
        description: 'Examining how finite humans can know the infinite Creator through general and special revelation.',
        units: [
          {
            id: 'unit-theo-1-1',
            moduleId: 'mod-theo-1',
            title: 'Unit 1.1: General vs. Special Revelation & Divine Aseity',
            sequence: 1,
            description: 'The foundation of all theological enquiry: God revealing Himself through creation and Sacred Scripture.',
            lessons: [
              {
                id: 'les-theo-101',
                unitId: 'unit-theo-1-1',
                title: 'Lesson 1: The Nature, Definition, and Primacy of Christian Theology',
                sequence: 1,
                durationMinutes: 45,
                learningObjectives: [
                  'Define theology as "faith seeking understanding" (fides quaerens intellectum)',
                  'Distinguish between Biblical, Systematic, Historical, and Practical Theology',
                  'Identify the supreme authority of the 66 inspired canonical books as the norma normans non normata'
                ],
                summary: 'Theology is not dry intellectualism; it is the systematic and worshipful study of God as He has revealed Himself in Holy Scripture for the transformation of life and kingdom service.',
                scriptureReferences: [
                  { passage: '2 Timothy 3:16-17', text: 'All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be complete, equipped for every good work.' },
                  { passage: 'Jeremiah 9:23-24', text: 'Let not the wise man boast in his wisdom... but let him who boasts boast in this, that he understands and knows me, that I am the Lord.' }
                ],
                theologicalContent: `
### 1. Introduction: The Noble Task of Theology
The word **Theology** derives from two Greek roots:
- **Theos** (Θεός) = God
- **Logos** (λόγος) = Word, discourse, reasoned study.

Thus, theology is reasoned discourse concerning God. As St. Anselm of Canterbury famously stated, it is *fides quaerens intellectum*—**faith seeking understanding**. We do not study theology from a neutral, detached academic posture; we study as redeemed servants standing in holy awe before the Living God.

### 2. The Four Pillars of Theological Taxonomy
1. **Biblical Theology**: Traces themes chronologically through redemptive history (e.g., The Covenant from Abraham to Christ).
2. **Historical Theology**: Studies how the Church has understood doctrine across eras (Patristic, Medieval, Reformation, Modern).
3. **Systematic Theology**: Organizes the entirety of biblical truth into coherent topical categories (Theology Proper, Christology, Pneumatology, Soteriology, Ecclesiology, Eschatology).
4. **Practical / Pastoral Theology**: Applies dogma to the daily life of the local church, preaching, counseling, and missions.

### 3. The Source of Truth: Sola Scriptura
While tradition, reason, and experience serve as secondary ministerial guides, **Sacred Scripture alone is the infallible rule of faith and practice**.
                `,
                greekHebrewInsights: [
                  { term: 'θεόπνευστος', transliteration: 'theopneustos', strongs: 'G2315', meaning: 'God-breathed, inspired by God Himself (2 Tim 3:16)' },
                  { term: 'יָדַע', transliteration: 'yada', strongs: 'H3045', meaning: 'Experiential, covenantal, intimate knowledge of God (Jer 9:24)' }
                ],
                reflectionQuestions: [
                  'How does your personal devotional prayer life directly impact the quality and humility of your theological study?',
                  'What are the dangers of doing theology detached from the local church and world missions?'
                ],
                videoUrl: 'https://www.youtube.com/embed/placeholder-theo1',
                downloadableNotesUrl: 'https://brooksoflife.edu/resources/notes/theo201-lesson1.pdf',
                quiz: [
                  {
                    id: 'q-l1-1',
                    question: 'What does the Latin phrase "fides quaerens intellectum" mean?',
                    options: ['Knowledge replaces faith', 'Faith seeking understanding', 'Understanding without scripture', 'Reason over divine revelation'],
                    correctIndex: 1,
                    explanation: 'Coined by Anselm, it expresses that faith is the starting point that seeks to deepen its understanding of God.'
                  },
                  {
                    id: 'q-l1-2',
                    question: 'Which branch of theology organizes biblical truths into coherent topical categories?',
                    options: ['Biblical Theology', 'Historical Theology', 'Systematic Theology', 'Liturgical Theology'],
                    correctIndex: 2,
                    explanation: 'Systematic Theology gathers all biblical material across OT and NT into unified topics like Christology and Soteriology.'
                  }
                ]
              },
              {
                id: 'les-theo-102',
                unitId: 'unit-theo-1-1',
                title: 'Lesson 2: The Incommunicable Attributes of God',
                sequence: 2,
                durationMinutes: 50,
                learningObjectives: [
                  'Explain God’s Aseity (self-existence and independence)',
                  'Understand Divine Immutability and impassibility in classical theism',
                  'Distinguish between Incommunicable attributes (God alone) and Communicable attributes (shared with redeemed humanity in measure)'
                ],
                summary: 'God possesses attributes that belong to Him alone as the uncreated Creator: Aseity, Infinity, Eternity, and Immutability. Grasping these preserves our worship from idolatry.',
                scriptureReferences: [
                  { passage: 'Exodus 3:14', text: 'God said to Moses, "I AM WHO I AM." And he said, "Say this to the people of Israel: I AM has sent me to you."' },
                  { passage: 'Malachi 3:6', text: 'For I the Lord do not change; therefore you, O children of Jacob, are not consumed.' }
                ],
                theologicalContent: `
### 1. Incommunicable vs. Communicable Attributes
- **Incommunicable Attributes**: Qualities of God with no direct analogy in creation (Aseity, Eternity, Omnipresence, Immutability).
- **Communicable Attributes**: Qualities of God that are reflected, in creaturely limitation, in humans created in His image (Love, Justice, Mercy, Truth, Wisdom, Holiness).

### 2. The Great Aseity of God
*Aseity* (from Latin *a se* = "from Himself"). God is completely self-sufficient. He needs no creation, no food, no worship to complete His being. He created the cosmos out of the overflow of His sovereign goodness, not out of deficiency.

### 3. Practical Ministry Implication
When a pastor or minister realizes God is unchangeable and all-sufficient, ministry ceases to be an anxious struggle and becomes an act of joyful trust in the God who cannot fail.
                `,
                reflectionQuestions: [
                  'How does the unchangeableness of God provide supreme comfort during times of severe pastoral crisis or grief?'
                ],
                quiz: [
                  {
                    id: 'q-l2-1',
                    question: 'What is the theological term for God’s complete self-existence and independence from creation?',
                    options: ['Simplicity', 'Aseity', 'Omnipresence', 'Pneumatology'],
                    correctIndex: 1,
                    explanation: 'Aseity (from Latin a se) denotes that God exists in and of Himself without dependence on any created thing.'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'mod-theo-2',
        courseId: 'course-theo-201',
        title: 'Module 2: The Holy Trinity & Classical Trinitarianism',
        sequence: 2,
        description: 'The biblical doctrine of one God eternally existing in three distinct, co-equal Persons: Father, Son, and Holy Spirit.',
        units: [
          {
            id: 'unit-theo-2-1',
            moduleId: 'mod-theo-2',
            title: 'Unit 2.1: Trinitarian Orthodoxy vs. Historic Heresies',
            sequence: 1,
            description: 'Refuting Modalism (Sabellianism), Arianism, and Tritheism through biblical and patristic formulations.',
            lessons: [
              {
                id: 'les-theo-201',
                unitId: 'unit-theo-2-1',
                title: 'Lesson 3: The Triune Mystery: One Essence (Ousia), Three Persons (Hypostaseis)',
                sequence: 1,
                durationMinutes: 60,
                learningObjectives: [
                  'Understand the Nicene formulation of homoousios (same substance)',
                  'Recognize and refute Modalism (one God wearing three masks) and Subordinationism',
                  'Trace the economic Trinity vs. ontological Trinity'
                ],
                summary: 'The doctrine of the Trinity is the heart of Christian worship: We worship one God in Trinity, and Trinity in Unity, neither confounding the Persons nor dividing the Substance.',
                scriptureReferences: [
                  { passage: 'Matthew 28:19', text: 'Go therefore and make disciples of all nations, baptizing them in the name [singular] of the Father and of the Son and of the Holy Spirit.' },
                  { passage: '2 Corinthians 13:14', text: 'The grace of the Lord Jesus Christ and the love of God and the fellowship of the Holy Spirit be with you all.' }
                ],
                theologicalContent: `
### The Historic Trinitarian Axiom
1. God is three Persons (**Father, Son, Holy Spirit**).
2. Each Person is fully God (**co-equal and co-eternal**).
3. There is only **one God** (*Deuteronomy 6:4*).

### Refuting Heresies
- **Modalism**: Claims God is one person who takes on different modes or roles. *Refutation*: At Christ's baptism (Matthew 3), the Father speaks from heaven, the Son is baptized, and the Spirit descends like a dove simultaneously.
- **Arianism**: Claims the Son was the first created being (*"there was a time when He was not"*). *Refutation*: John 1:1-3 affirms that the Word was with God and the Word WAS God.
                `,
                greekHebrewInsights: [
                  { term: 'ὁμοούσιος', transliteration: 'homoousios', strongs: 'G3658', meaning: 'Consubstantial, of the exact same essence/nature' },
                  { term: 'ὑπόστασις', transliteration: 'hypostasis', strongs: 'G5287', meaning: 'Concrete individual reality, distinct Person in the Trinity' }
                ],
                reflectionQuestions: [
                  'Why are popular analogies for the Trinity (like water-ice-steam or egg yolk-white-shell) flawed and often inadvertently modalistic?'
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-bibl-101',
    programId: 'bach-theology',
    schoolId: 'school-biblical-studies',
    courseCode: 'BIBL-101',
    title: 'Introduction to Biblical Hermeneutics & Exegesis',
    credits: 3,
    level: 'Undergraduate Core',
    instructorName: 'Prof. Dr. Jonathan Edwards',
    instructorTitle: 'Dean of Biblical Studies',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    description: 'Principles of sound biblical interpretation. Students learn historical-grammatical exegesis, genre analysis (narrative, poetry, wisdom, prophecy, epistle, apocalyptic), and how to bridge the ancient text to contemporary application.',
    learningOutcomes: [
      'Apply the historical-cultural and literary context to any biblical passage',
      'Identify and interpret biblical figures of speech and literary genres with precision',
      'Construct sound, expository sermon outlines without eisegesis'
    ],
    requiredReading: [
      'Fee, Gordon D. & Stuart, Douglas. How to Read the Bible for All Its Worth',
      'Virkler, Henry A. Hermeneutics: Principles and Processes of Biblical Interpretation'
    ],
    syllabusOverview: 'Module 1: The Hermeneutical Spiral | Module 2: Genre Analysis | Module 3: Word Studies & Fallacies | Module 4: Expository Application',
    gradingBreakdown: {
      assignments: 25,
      quizzes: 15,
      midterm: 20,
      finalExam: 30,
      ministryPracticum: 10
    },
    assignments: [
      {
        id: 'assign-bibl-1',
        courseId: 'course-bibl-101',
        title: 'Complete Exegetical Paper on Psalm 23 or Romans 12:1-2',
        instructions: 'Select one text and construct an 8-page exegetical paper detailing the historical background, literary genre, grammatical syntax, structural outline, and contemporary ministry application.',
        rubric: [
          { criteria: 'Contextual & Historical Analysis', maxMarks: 30 },
          { criteria: 'Word Studies & Literary Devices', maxMarks: 30 },
          { criteria: 'Homiletical Outline & Application', maxMarks: 30 },
          { criteria: 'Scholarly Formatting', maxMarks: 10 }
        ],
        totalMarks: 100,
        weightagePercent: 25,
        dueDate: '2026-10-05T23:59:00Z',
        submissionType: 'hermeneutical_paper'
      }
    ],
    examination: {
      id: 'exam-bibl-midterm',
      courseId: 'course-bibl-101',
      title: 'Hermeneutics & Biblical Exegesis Proctored Midterm Exam',
      type: 'midterm',
      instructions: 'Timed assessment evaluating grammatical-historical interpretation, original language word study principles, and genre analysis.',
      durationMinutes: 45,
      totalMarks: 50,
      passMarkPercent: 65,
      weightagePercent: 20,
      startDate: '2026-09-01T00:00:00Z',
      endDate: '2026-09-28T23:59:00Z',
      status: 'active',
      questions: [
        {
          id: 'q-bibl-1',
          courseId: 'course-bibl-101',
          type: 'multiple_choice',
          questionText: 'What is the primary distinction between Exegesis and Eisegesis?',
          options: ['Exegesis reads into the text; Eisegesis draws out', 'Exegesis draws out authorial intent; Eisegesis reads personal biases into the text', 'They are synonymous terms', 'Eisegesis is only used for poetic passages'],
          correctAnswer: 'Exegesis draws out authorial intent; Eisegesis reads personal biases into the text',
          marks: 10,
          scriptureAnchor: '2 Timothy 2:15; 2 Peter 1:20-21'
        },
        {
          id: 'q-bibl-2',
          courseId: 'course-bibl-101',
          type: 'multiple_choice',
          questionText: 'Which literary genre dominates the Book of Revelation (Apocalypse of John)?',
          options: ['Legal Code', 'Apocalyptic Epistolary Prophecy', 'Pure Historical Chronicle', 'Wisdom Literature'],
          correctAnswer: 'Apocalyptic Epistolary Prophecy',
          marks: 10,
          scriptureAnchor: 'Revelation 1:1-3'
        },
        {
          id: 'q-bibl-3',
          courseId: 'course-bibl-101',
          type: 'short_answer',
          questionText: 'Explain the "Root Fallacy" in lexical semantics and why it leads to faulty biblical interpretations.',
          marks: 30,
          scriptureAnchor: 'Nehemiah 8:8'
        }
      ]
    },
    modules: [
      {
        id: 'mod-bibl-1',
        courseId: 'course-bibl-101',
        title: 'Module 1: Foundations of Hermeneutics & The Exegetical Bridge',
        sequence: 1,
        description: 'Crossing the chasm between the original authorial intent and today’s hearer.',
        units: [
          {
            id: 'unit-bibl-1-1',
            moduleId: 'mod-bibl-1',
            title: 'Unit 1.1: Exegesis vs. Eisegesis',
            sequence: 1,
            description: 'Drawing the meaning out of the text rather than reading foreign ideas into the text.',
            lessons: [
              {
                id: 'les-bibl-101',
                unitId: 'unit-bibl-1-1',
                title: 'Lesson 1: The Goal of Exegesis: Discovering Authorial Intent',
                sequence: 1,
                durationMinutes: 40,
                learningObjectives: [
                  'Differentiate between Exegesis (drawing out) and Eisegesis (reading in)',
                  'Understand the dual authorship of Scripture (Divine and Human)',
                  'Avoid common interpretive fallacies (root fallacy, anachronism, proof-texting)'
                ],
                summary: 'The primary question of biblical hermeneutics is: "What did the text mean to the original biblical author and his original audience?" Only after answering this can we legitimately apply it today.',
                scriptureReferences: [
                  { passage: '2 Peter 1:20-21', text: 'Knowing this first of all, that no prophecy of Scripture comes from someone’s own interpretation. For no prophecy was ever produced by the will of man, but men spoke from God as they were carried along by the Holy Spirit.' },
                  { passage: 'Nehemiah 8:8', text: 'They read from the book, from the Law of God, clearly, and they gave the sense, so that the people understood the reading.' }
                ],
                theologicalContent: `
### 1. The Hermeneutical Bridge
When we open the Bible, we encounter three major gaps:
1. **Historical Gap**: Thousands of years separate us from ancient Israel and first-century Rome.
2. **Cultural Gap**: Ancient Near Eastern customs and Greco-Roman institutions are unfamiliar to modern readers.
3. **Linguistic Gap**: Scripture was penned in ancient Hebrew, Aramaic, and Koine Greek.

The goal of hermeneutics is to build a bridge across these gaps so that the immutable Word of God speaks with clarity into our 21st-century lives.
                `,
                reflectionQuestions: [
                  'Have you ever seen a scripture taken out of context in a sermon? What damage can proof-texting do to discipleship?'
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-min-302',
    programId: 'bach-theology',
    schoolId: 'school-christian-ministry',
    courseCode: 'MIN-302',
    title: 'Pastoral Ministry, Homiletics & Church Leadership',
    credits: 3,
    level: 'Upper Undergraduate',
    instructorName: 'Bishop Samuel K. Vance',
    instructorTitle: 'Dean & Professor of Pastoral Ministry',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    description: 'Practical pastoral theology covering expository preaching, administering the sacraments (Baptism and the Lord’s Supper), officiating weddings and funerals, pastoral visitation, and handling ecclesiastical conflict.',
    learningOutcomes: [
      'Prepare and deliver Christ-centered, expository sermons with conviction and clarity',
      'Conduct pastoral pastoral ceremonies with dignity, liturgy, and pastoral sensitivity',
      'Implement shepherd-leadership strategies for resolving conflict in congregational life'
    ],
    requiredReading: [
      'Lloyd-Jones, D. Martyn. Preaching and Preachers',
      'Baxter, Richard. The Reformed Pastor'
    ],
    syllabusOverview: 'Module 1: The Minister’s Heart | Module 2: The Art of Homiletics | Module 3: Sacramental Ordinances | Module 4: Pastoral Care in Suffering',
    gradingBreakdown: {
      assignments: 30,
      quizzes: 10,
      midterm: 20,
      finalExam: 20,
      ministryPracticum: 20
    },
    assignments: [
      {
        id: 'assign-min-1',
        courseId: 'course-min-302',
        title: 'Expository Sermon Manuscript & Audio/Video Delivery',
        instructions: 'Construct a complete 25-minute expository sermon manuscript on Ephesians 4:1-16. Include your homiletical big idea, transitional sentences, illustrations, and specific pastoral applications for diverse demographics in the church.',
        rubric: [
          { criteria: 'Biblical Faithfulness to Text', maxMarks: 35 },
          { criteria: 'Homiletical Structure & Flow', maxMarks: 25 },
          { criteria: 'Practical Christ-Centered Application', maxMarks: 25 },
          { criteria: 'Pastoral Urgency & Tone', maxMarks: 15 }
        ],
        totalMarks: 100,
        weightagePercent: 30,
        dueDate: '2026-10-20T23:59:00Z',
        submissionType: 'sermon_outline'
      }
    ],
    examination: {
      id: 'exam-min-cat',
      courseId: 'course-min-302',
      title: 'Pastoral Ministry & Homiletical Leadership Comprehensive CAT',
      type: 'cat',
      instructions: 'Proctored assessment on pastoral qualifications (1 Tim 3, Titus 1), sacramental administration, and expository sermon construction.',
      durationMinutes: 50,
      totalMarks: 50,
      passMarkPercent: 60,
      weightagePercent: 20,
      startDate: '2026-09-01T00:00:00Z',
      endDate: '2026-10-10T23:59:00Z',
      status: 'active',
      questions: [
        {
          id: 'q-min-1',
          courseId: 'course-min-302',
          type: 'multiple_choice',
          questionText: 'According to 1 Timothy 3:2 and Titus 1:9, what is the indispensable teaching qualification for an elder?',
          options: ['Advanced secular degree', 'Apt to teach (didaktikos) and holding firmly to trustworthy doctrine', 'Eloquence in public speech', 'At least 10 years in management'],
          correctAnswer: 'Apt to teach (didaktikos) and holding firmly to trustworthy doctrine',
          marks: 15,
          scriptureAnchor: '1 Timothy 3:2; Titus 1:9'
        },
        {
          id: 'q-min-2',
          courseId: 'course-min-302',
          type: 'ministry_case_study',
          questionText: 'How should a pastor navigate ecclesiastical conflict between senior church members regarding liturgical traditions versus contemporary evangelistic outreach?',
          marks: 35,
          scriptureAnchor: 'Ephesians 4:1-6; 1 Peter 5:1-4'
        }
      ]
    },
    modules: [
      {
        id: 'mod-min-1',
        courseId: 'course-min-302',
        title: 'Module 1: The Pastoral Calling & Spiritual Qualifications',
        sequence: 1,
        description: 'Exposition of 1 Timothy 3 and Titus 1 on the character and calling of the undershepherd.',
        units: [
          {
            id: 'unit-min-1-1',
            moduleId: 'mod-min-1',
            title: 'Unit 1.1: Character Before Competence in Ministry',
            sequence: 1,
            description: 'Why the pastor’s inner spiritual life is the fountainhead of all public ministry.',
            lessons: [
              {
                id: 'les-min-101',
                unitId: 'unit-min-1-1',
                title: 'Lesson 1: Shepherding God’s Flock: The Biblical Mandate of the Pastor',
                sequence: 1,
                durationMinutes: 50,
                learningObjectives: [
                  'Analyze the biblical terms Poimen (Shepherd), Presbuteros (Elder), and Episkopos (Overseer)',
                  'Guard against ministerial burnout through the rhythm of Sabbath and prayer',
                  'Examine the shepherd heart of Christ as depicted in 1 Peter 5:1-4'
                ],
                summary: 'Pastoral ministry is not corporate management; it is spiritual shepherding under the Chief Shepherd, Jesus Christ. Ministers are called to feed, lead, protect, and care for the flock of God with holy integrity.',
                scriptureReferences: [
                  { passage: '1 Peter 5:2-3', text: 'Shepherd the flock of God that is among you, exercising oversight, not under compulsion, but willingly, as God would have you; not for shameful gain, but eagerly; not domineering over those in your charge, but being examples to the flock.' },
                  { passage: 'Acts 20:28', text: 'Pay careful attention to yourselves and to all the flock, in which the Holy Spirit has made you overseers, to care for the church of God, which he obtained with his own blood.' }
                ],
                theologicalContent: `
### 1. The Shepherding Mandate
The pastor is entrusted with the blood-bought flock of God.
- **Feeding**: Providing sound biblical exposition week after week.
- **Leading**: Guiding the church toward God's kingdom vision.
- **Protecting**: Refuting false doctrines and wolves that seek to divide the saints.
- **Caring**: Visiting the sick, mourning with those who weep, and encouraging the faint-hearted.
                `,
                reflectionQuestions: [
                  'In what ways are you actively cultivating your personal spiritual life before you step into public teaching?'
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-student-1',
    email: 'samuel.adebayo@student.brooksoflife.edu',
    name: 'Samuel Adebayo',
    role: 'student',
    studentId: 'BLSM-STU-2026-0421',
    programId: 'bach-theology',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 349-8201',
    country: 'United Kingdom / Nigeria',
    churchAffiliation: 'Grace Community Bible Church',
    ministryRole: 'Youth Pastor & Church Planting Intern',
    bio: 'Passionate about biblical theology, gospel-centered youth discipleship, and expository preaching across Africa and Europe.',
    createdAt: '2025-09-01T10:00:00Z',
    academicStanding: 'Dean’s List'
  },
  {
    id: 'user-faculty-1',
    email: 'rebecca.macgregor@brooksoflife.edu',
    name: 'Dr. Rebecca A. MacGregor',
    role: 'lecturer',
    facultyId: 'BLSM-FAC-1002',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (800) 555-0199',
    country: 'United States',
    churchAffiliation: 'Trinity Reformed Fellowship',
    ministryRole: 'Dean of Theology & Senior Professor',
    bio: 'Th.D. in Systematic Theology from Edinburgh. Author of "The Glory of the Triune God" and dedicated mentor to theological scholars.',
    createdAt: '2020-01-15T08:00:00Z'
  },
  {
    id: 'user-registrar-1',
    email: 'arthur.pendelton@brooksoflife.edu',
    name: 'Rev. Arthur C. Pendelton',
    role: 'registrar',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (800) 555-0144',
    country: 'Canada',
    ministryRole: 'Academic Registrar & Director of Student Records',
    bio: 'Over 25 years in higher Christian education administration and academic transcripts governance.',
    createdAt: '2018-03-10T09:00:00Z'
  },
  {
    id: 'user-exam-officer-1',
    email: 'elizabeth.vance@brooksoflife.edu',
    name: 'Dr. Elizabeth M. Vance',
    role: 'examination_officer',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (800) 555-0177',
    country: 'United Kingdom',
    ministryRole: 'Director of TEMS (Theological Examination Management System)',
    bio: 'Oversees examination integrity, question bank validation, and academic moderation across all 9 schools.',
    createdAt: '2019-06-20T10:00:00Z'
  },
  {
    id: 'user-finance-1',
    email: 'grace.sterling@brooksoflife.edu',
    name: 'Grace K. Sterling, CPA',
    role: 'finance_officer',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (800) 555-0188',
    country: 'United States',
    ministryRole: 'Chief Financial Officer & Scholarships Bursar',
    bio: 'Oversees student accounts, bursaries, mission grants, and institutional financial stewardship.',
    createdAt: '2021-02-01T08:30:00Z'
  },
  {
    id: 'user-admin-1',
    email: 'emmanuel.brooks@brooksoflife.edu',
    name: 'Rev. Dr. Emmanuel O. Brooks',
    role: 'super_admin',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (800) 555-0100',
    country: 'United States / Global',
    churchAffiliation: 'Brooks of Life Ministries International',
    ministryRole: 'Founder, President & Chancellor',
    bio: 'Visionary leader called by God to raise theological giants, pastors, and church planters globally for the end-time harvest.',
    createdAt: '2014-01-01T00:00:00Z'
  }
];

export const INITIAL_STUDENT_PROGRESS: StudentCourseProgress[] = [
  {
    id: 'prog-samuel-theo',
    studentId: 'user-student-1',
    courseId: 'course-theo-201',
    enrolledAt: '2026-08-01T09:00:00Z',
    completedLessonIds: ['les-theo-101', 'les-theo-102'],
    quizScores: [
      { lessonId: 'les-theo-101', score: 2, maxScore: 2, passed: true },
      { lessonId: 'les-theo-102', score: 1, maxScore: 1, passed: true }
    ],
    assignmentGrade: 92,
    quizGrade: 98,
    midtermGrade: 88,
    finalExamGrade: 90,
    practicumGrade: 95,
    finalCourseScore: 91,
    letterGrade: 'A',
    gradePoints: 4.0,
    isCompleted: false
  },
  {
    id: 'prog-samuel-bibl',
    studentId: 'user-student-1',
    courseId: 'course-bibl-101',
    enrolledAt: '2026-08-01T09:00:00Z',
    completedLessonIds: ['les-bibl-101'],
    quizScores: [],
    assignmentGrade: 85,
    quizGrade: 90,
    midtermGrade: 84,
    finalExamGrade: 87,
    practicumGrade: 90,
    finalCourseScore: 86.5,
    letterGrade: 'A',
    gradePoints: 4.0,
    isCompleted: true,
    completionDate: '2026-08-20T14:30:00Z'
  }
];

export const INITIAL_ASSIGNMENT_SUBMISSIONS: AssignmentSubmission[] = [
  {
    id: 'sub-theo-1-samuel',
    assignmentId: 'assign-theo-1',
    studentId: 'user-student-1',
    studentName: 'Samuel Adebayo',
    submittedAt: '2026-08-25T16:20:00Z',
    content: `Exegetical and Theological Paper: The Carmen Christi of Philippians 2:5-11

Author: Samuel Adebayo
Student ID: BLSM-STU-2026-0421
Course: THEO-201 Systematic Theology I

1. Introduction
The Christ hymn in Philippians 2:5-11 stands as one of the most sublime Christological declarations in the New Testament corpus. In this passage, the Apostle Paul articulates both the highest pre-existent deity of the Son and His voluntary condescension in the Incarnation.

2. Exegesis of Morphe Theou and Ekenosen
Paul begins with the assertion that Christ existed 'en morphe theou' (ἐν μορφῇ θεοῦ). The term 'morphe' denotes the essential nature and outward manifestation that accurately reflects the inner reality. Christ was not merely 'similar' to God; He existed in the very form of God.

Yet, Christ did not regard equality with God as 'harpagmon' (something to be selfishly grasped or exploited for personal advantage). Instead, 'heauton ekenosen' (ἑαυτὸν ἐκένωσεν)—He emptied Himself. As classical orthodox theology rightly maintains (cf. Cyril of Alexandria, John Calvin), this was not an emptying of His divine attributes or deity (which would be metaphysical suicide), but rather the addition of a true human nature and the voluntary veiling of His manifest celestial glory.

3. Ministry Application
In Philippians 2, high Christology is married directly to pastoral ethics. Paul introduces this hymn not merely as theoretical theology, but as the supreme blueprint for Christian leadership: 'Have this mind among yourselves, which is yours in Christ Jesus.' True pastoral power is found in descending into sacrificial servant-heartedness, trusting the Father for ultimate vindication and reward.`,
    score: 94,
    gradedBy: 'Dr. Rebecca A. MacGregor',
    gradedAt: '2026-08-26T11:15:00Z',
    feedback: 'Outstanding theological depth, Samuel! Your exegesis of "morphe theou" and defense against Kenoticism is academically rigorous and pastorally compelling. Grade: 94/100 (A).',
    status: 'graded'
  }
];

export const INITIAL_EXAM_ATTEMPTS: ExamAttempt[] = [
  {
    id: 'attempt-samuel-theo',
    examId: 'exam-theo-final',
    studentId: 'user-student-1',
    studentName: 'Samuel Adebayo',
    courseId: 'course-theo-201',
    startedAt: '2026-08-27T14:00:00Z',
    submittedAt: '2026-08-27T14:48:00Z',
    answers: [
      { questionId: 'q-theo-1', answer: 'Council of Chalcedon', scoreAwarded: 10 },
      { questionId: 'q-theo-2', answer: 'Omniscience', scoreAwarded: 10 },
      { questionId: 'q-theo-3', answer: 'False', scoreAwarded: 10 },
      { 
        questionId: 'q-theo-4', 
        answer: 'The Holy Spirit directly comforts and assures the inner heart of the believer that they belong to God, crying "Abba Father" and bearing fruit of love and repentance.', 
        scoreAwarded: 28,
        comments: 'Excellent biblical synthesis.' 
      },
      { 
        questionId: 'q-theo-5', 
        answer: 'I would open John 1:1 ("The Word was God") and Colossians 1:16-17 ("by Him all things were created"). I would explain with pastoral patience that if Jesus were created, He could not bridge the infinite gap between uncreated God and sinful humanity. Only uncreated God incarnate can redeem us.', 
        scoreAwarded: 36,
        comments: 'Sound pastoral wisdom and scriptural citations.' 
      }
    ],
    totalScore: 94,
    maxScore: 100,
    percentage: 94,
    passed: true,
    status: 'graded',
    gradedBy: 'Dr. Elizabeth M. Vance',
    gradedAt: '2026-08-27T17:00:00Z'
  }
];

export const INITIAL_APPLICATIONS: AdmissionApplication[] = [
  {
    id: 'app-001',
    applicantName: 'Enoch Mwangi',
    email: 'enoch.mwangi@gmail.com',
    phone: '+254 712 345 678',
    country: 'Kenya',
    city: 'Nairobi',
    dateOfBirth: '1996-04-12',
    gender: 'Male',
    programId: 'dip-theology',
    studyMode: 'Online Distance',
    churchName: 'All Saints Harvest Tabernacle',
    pastorName: 'Rev. Joseph Kimani',
    ministryExperienceYears: 4,
    spiritualTestimony: 'I surrendered my life to Jesus Christ in 2018 during a university outreach mission. Since then, the Lord has burdened my heart for rural church planting and teaching Scripture with clarity. I seek formal theological education to rightly divide the word of truth.',
    previousEducation: 'Bachelor of Science in Information Systems (University of Nairobi)',
    status: 'Accepted',
    submittedAt: '2026-08-15T10:30:00Z',
    reviewedBy: 'Rev. Arthur C. Pendelton',
    decisionDate: '2026-08-20T12:00:00Z',
    scholarshipGrantedPercent: 30,
    admissionsNotes: 'Strong pastoral recommendation. Recommended for 30% African Mission Scholarship.'
  },
  {
    id: 'app-002',
    applicantName: 'Deborah Jean Miller',
    email: 'deborah.miller@faithmail.org',
    phone: '+1 (416) 555-7890',
    country: 'Canada',
    city: 'Toronto',
    dateOfBirth: '1992-11-03',
    gender: 'Female',
    programId: 'bach-counseling',
    studyMode: 'Online Distance',
    churchName: 'Redeemer City Church',
    pastorName: 'Pastor Mark Davies',
    ministryExperienceYears: 6,
    spiritualTestimony: 'For six years I have served in youth crisis mentoring and single mothers support in downtown Toronto. I feel a strong call to pastoral counseling to bring Christ-centered healing to broken families.',
    previousEducation: 'Diploma in Community Social Work',
    status: 'Under Review',
    submittedAt: '2026-08-26T18:45:00Z',
    admissionsNotes: 'Transcripts received. Awaiting pastoral interview.'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-2026-001',
    invoiceNumber: 'INV-BLSM-2026-089',
    studentId: 'user-student-1',
    studentName: 'Samuel Adebayo',
    programTitle: 'Bachelor of Theology (B.Th.)',
    semester: 'Fall Semester 2026',
    issueDate: '2026-08-01',
    dueDate: '2026-09-15',
    items: [
      { description: 'Tuition Fee (12 Credit Hours @ $75/credit)', amount: 900 },
      { description: 'Online LMS & Theological Library Access Fee', amount: 150 },
      { description: 'TEMS Examination & Proctored Assessment Fee', amount: 50 }
    ],
    subtotal: 1100,
    scholarshipDiscount: 350, // Kingdom Harvesters Scholarship
    totalDue: 750,
    amountPaid: 750,
    balance: 0,
    status: 'Paid'
  }
];

export const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'tx-001',
    invoiceId: 'inv-2026-001',
    studentId: 'user-student-1',
    amount: 750,
    currency: 'USD',
    method: 'Card',
    reference: 'PAY-STRIPE-8934201948',
    date: '2026-08-05T14:22:00Z',
    status: 'Completed',
    receiptNumber: 'REC-BLSM-2026-0421'
  }
];

export const INITIAL_CERTIFICATES: DigitalCertificate[] = [
  {
    id: 'cert-blsm-0421',
    certificateNumber: 'BLSM-CERT-2026-0894',
    studentId: 'user-student-1',
    studentName: 'Samuel Adebayo',
    programId: 'cert-biblical-studies',
    programTitle: 'Certificate in Biblical Studies',
    awardLevel: 'Certificate with Highest Honors (Summa Cum Laude)',
    issueDate: '2026-08-20',
    registrarName: 'Rev. Arthur C. Pendelton, Ph.D.',
    presidentName: 'Rev. Dr. Emmanuel O. Brooks, Th.D.',
    honors: 'Summa Cum Laude (GPA 4.0)',
    qrCodeValue: 'https://brooksoflife.edu/verify?cert=BLSM-CERT-2026-0894',
    status: 'Valid'
  }
];

export const INITIAL_LIBRARY_RESOURCES: LibraryResource[] = [
  {
    id: 'lib-001',
    title: 'Institutes of the Christian Religion (Annotated Student Edition)',
    author: 'John Calvin (Ed. John T. McNeill)',
    category: 'Systematic Theology',
    description: 'The monumental theological masterwork covering the Knowledge of God the Creator, the Redeemer in Christ, the Holy Spirit, and the Holy Catholic Church.',
    pagesCount: 840,
    publicationYear: '1559 / 2024 Classic Edition',
    downloadFormat: 'PDF',
    accessLevel: 'All Students',
    fileSize: '14.2 MB',
    downloadsCount: 1420,
    featured: true
  },
  {
    id: 'lib-002',
    title: 'Exposition of the Epistle to the Hebrews (Vol. 1-4 Complete)',
    author: 'Dr. John Owen, D.D.',
    category: 'Biblical Studies',
    description: 'The greatest Puritan exposition on the supremacy, eternal priesthood, and once-for-all sacrifice of Jesus Christ.',
    pagesCount: 1250,
    publicationYear: '1668 / Digital Archive',
    downloadFormat: 'PDF',
    accessLevel: 'Degree Students',
    fileSize: '22.8 MB',
    downloadsCount: 890,
    featured: true
  },
  {
    id: 'lib-003',
    title: 'The Reformed Pastor: Guidelines for Pastoral Oversight',
    author: 'Richard Baxter',
    category: 'Pastoral Ministry',
    description: 'Classic treatise on personal pastoral visitation, catechesis, and personal holiness for shepherds of God’s flock.',
    pagesCount: 280,
    publicationYear: '1656 / Modernized English',
    downloadFormat: 'PDF',
    accessLevel: 'All Students',
    fileSize: '3.4 MB',
    downloadsCount: 2130,
    featured: true
  },
  {
    id: 'lib-004',
    title: 'Concise Hebrew and Aramaic Lexicon of the Old Testament',
    author: 'William L. Holladay',
    category: 'Greek & Hebrew Tools',
    description: 'Essential scholarly lexicon for translation, root analysis, and semantic range in Old Testament exegetical studies.',
    pagesCount: 440,
    publicationYear: '2022',
    downloadFormat: 'Study Guide',
    accessLevel: 'Degree Students',
    fileSize: '8.1 MB',
    downloadsCount: 670
  },
  {
    id: 'lib-005',
    title: 'Transforming Mission: Paradigm Shifts in Theology of Mission',
    author: 'David J. Bosch',
    category: 'Missions & Evangelism',
    description: 'Comprehensive historical and theological analysis of Christian mission through the centuries and into the modern urban global world.',
    pagesCount: 560,
    publicationYear: '2020',
    downloadFormat: 'PDF',
    accessLevel: 'All Students',
    fileSize: '9.8 MB',
    downloadsCount: 1120
  }
];

export const INITIAL_MINISTRY_RESOURCES: MinistryResource[] = [
  {
    id: 'min-res-001',
    title: 'Expository Sermon Outline: "The Unshakable Kingdom" (Hebrews 12:25-29)',
    category: 'Sermon Outlines',
    author: 'Rev. Dr. Emmanuel O. Brooks',
    scriptureTheme: 'Hebrews 12:25-29',
    summary: 'A 3-point homiletical outline on God shaking all created things so that which cannot be shaken—the Kingdom of Jesus Christ—may remain.',
    contentBody: `
### Homiletical Theme: The Unshakable Kingdom (Hebrews 12:25-29)

**Main Proposition:** Because we receive an unshakable kingdom, we must offer to God acceptable worship with reverence and awe.

#### I. The Danger of Refusing the Sovereign Voice (v. 25)
- Contrast between Mount Sinai (Earthly voice) and Mount Zion (Heavenly Mediator).
- If they did not escape who refused Him on earth, much less shall we if we turn away from Him who speaks from heaven.

#### II. The Divine Shaking of the Temporal World (vv. 26-27)
- "Yet once more I will shake not only the earth but also the heavens."
- God dismantles man-made security systems to reveal eternal kingdom foundations.

#### III. The Grateful Response of Acceptable Worship (vv. 28-29)
- "Let us be grateful for receiving a kingdom that cannot be shaken."
- Worship in spirit and in truth, knowing that our God is a consuming fire.
    `,
    dateAdded: '2026-08-10'
  },
  {
    id: 'min-res-002',
    title: 'Discipleship Blueprint: 12-Week Foundations of Faith for New Believers',
    category: 'Discipleship Curriculum',
    author: 'Dean Samuel K. Vance',
    scriptureTheme: 'Colossians 2:6-7; 2 Peter 3:18',
    summary: 'A ready-to-print 12-week small group curriculum covering Assurance of Salvation, Quiet Time, Prayer, The Holy Spirit, Giving, and Witnessing.',
    contentBody: `
### 12-Week Foundations of Faith Curriculum
- **Week 1:** The Assurance of Salvation (1 John 5:11-13)
- **Week 2:** The Authority and Daily Study of God’s Word (Psalm 119:9-11)
- **Week 3:** Prayer: Communing with the Father (Matthew 6:5-13)
- **Week 4:** The Person and Power of the Holy Spirit (Acts 1:8)
- **Week 5:** Water Baptism and the Lord’s Supper (Romans 6:3-4; 1 Cor 11)
- **Week 6:** Victory Over Temptation and Spiritual Warfare (Ephesians 6:10-18)
- **Week 7:** The Local Church and Fellowship (Hebrews 10:24-25)
- **Week 8:** Biblical Stewardship and Kingdom Giving (2 Corinthians 9:6-8)
- **Week 9:** Forgiveness, Reconciliation, and Healthy Relationships (Colossians 3:12-14)
- **Week 10:** Discovering Your Spiritual Gifts (1 Corinthians 12)
- **Week 11:** Sharing Your Personal Faith & Evangelism (1 Peter 3:15)
- **Week 12:** The Blessed Hope: The Return of Christ & Kingdom Service (Titus 2:13)
    `,
    dateAdded: '2026-08-14'
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'event-001',
    title: 'Global Seminary Convocation & Fall Academic Orientation 2026',
    category: 'Academic',
    date: '2026-09-05',
    time: '14:00 GMT / 09:00 EST',
    location: 'Virtual Classroom 1 & BLSM Global Livestream',
    speaker: 'Rev. Dr. Emmanuel O. Brooks, President',
    description: 'Official academic opening service for all incoming certificate, degree, and doctoral candidates worldwide.',
    zoomLink: 'https://zoom.us/j/brooksoflife-convocation-2026',
    isPublic: true
  },
  {
    id: 'event-002',
    title: 'Live Symposium: "Expository Preaching in a Pluralistic Age"',
    category: 'Faculty Seminar',
    date: '2026-09-18',
    time: '18:00 GMT',
    location: 'Theology Virtual Amphitheater',
    speaker: 'Bishop Samuel K. Vance & Prof. Dr. Jonathan Edwards',
    description: 'An interactive 2-hour theological symposium on maintaining Christ-centered biblical exposition amidst cultural headwinds.',
    zoomLink: 'https://zoom.us/j/brooksoflife-symposium-sep18',
    isPublic: true
  },
  {
    id: 'event-003',
    title: 'Annual Commencement & Graduation Ceremony 2026',
    category: 'Graduation',
    date: '2026-11-28',
    time: '11:00 GMT',
    location: 'Brooks International Ministry Center Auditorium & Global Broadcast',
    speaker: 'Guest Chancellor & Board of Governors',
    description: 'Celebrating the conferral of Certificates, Diplomas, Bachelor, Master, and Doctoral degrees upon our graduating class.',
    isPublic: true
  }
];

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-001',
    title: 'TEMS Proctored Midterm Examination Schedule Published',
    category: 'Academic',
    date: '2026-08-27',
    author: 'Office of the Examination Officer',
    content: 'All enrolled degree and certificate students can now view their scheduled exam windows inside their student portal under MY ACADEMICS > Exams.',
    isImportant: true
  },
  {
    id: 'ann-002',
    title: 'Kingdom Harvesters Scholarship Grants Disbursed for Fall 2026',
    category: 'Admissions',
    date: '2026-08-25',
    author: 'Office of Financial Aid',
    content: 'Scholarship letters and tuition waivers have been credited directly to qualified international students. Please check your financial billing statement.',
    isImportant: false
  },
  {
    id: 'ann-003',
    title: 'Weekly Institutional Chapel & Fasting: Every Wednesday',
    category: 'Spiritual Devotion',
    date: '2026-08-20',
    author: 'Chaplaincy Directorate',
    content: 'Join faculty and students across 42 nations every Wednesday at 12:00 GMT for our live intercessory prayer and ministerial devotional.',
    isImportant: false
  }
];

export const INITIAL_DISCUSSIONS: DiscussionPost[] = [
  {
    id: 'disc-001',
    courseId: 'course-theo-201',
    lessonId: 'les-theo-101',
    authorId: 'user-student-1',
    authorName: 'Samuel Adebayo',
    authorRole: 'student',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    title: 'The relationship between Sola Scriptura and the historic ecumenical creeds',
    content: 'Brothers and sisters, as we study Lesson 1 on the primacy of Scripture, how do you explain to new believers that honoring historic creeds (like Nicaea and Chalcedon) does not violate Sola Scriptura, but rather serves as a faithful summary of biblical truth?',
    createdAt: '2026-08-26T09:30:00Z',
    likes: 6,
    replies: [
      {
        id: 'rep-001',
        authorId: 'user-faculty-1',
        authorName: 'Dr. Rebecca A. MacGregor',
        authorRole: 'lecturer',
        content: 'Well asked, Samuel. In classical Reformed and Evangelical theology, we distinguish between Scripture as the "norma normans" (the norm that rules and cannot be ruled) and faithful creeds as "norma normata" (a ruled norm). Creeds have derived ministerial authority because they faithfully harmonize the text of Scripture!',
        createdAt: '2026-08-26T10:45:00Z'
      }
    ]
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tick-001',
    ticketNumber: 'BLSM-SUP-8821',
    userId: 'user-student-1',
    userName: 'Samuel Adebayo',
    userEmail: 'samuel.adebayo@student.brooksoflife.edu',
    category: 'Academic Support',
    subject: 'Request for official digital transcript verification seal',
    description: 'Greetings Registrar office, I need an official certified digital transcript sent directly to my local church presbytery for pastoral ordination assessment.',
    status: 'Resolved',
    priority: 'Medium',
    createdAt: '2026-08-22T11:00:00Z',
    updatedAt: '2026-08-23T15:30:00Z',
    messages: [
      {
        sender: 'Samuel Adebayo',
        role: 'student',
        message: 'Greetings Registrar office, I need an official certified digital transcript sent directly to my local church presbytery for pastoral ordination assessment.',
        timestamp: '2026-08-22T11:00:00Z'
      },
      {
        sender: 'Rev. Arthur C. Pendelton',
        role: 'registrar',
        message: 'Dear Brother Samuel, your transcript has been signed with the official digital registrar seal and is available in your portal with certificate number verification BLSM-CERT-2026-0894.',
        timestamp: '2026-08-23T15:30:00Z'
      }
    ]
  }
];
