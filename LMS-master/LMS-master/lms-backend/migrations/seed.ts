import { db } from '../src/config/db';

const subjectsData = [
  {
    title: 'JavaScript Fundamentals',
    slug: 'javascript-fundamentals',
    description: 'Master the core language of the web, from variables to asynchronous programming. Perfect for beginners and those looking to solidify their JS knowledge.',
    is_published: true,
    instructor_name: 'Hitesh Choudhary',
    instructor_channel: 'Chai aur Code',
    category: 'Web Dev',
    level: 'Beginner',
    duration_weeks: 8,
    rating: 4.7,
    thumbnail_url: 'https://img.youtube.com/vi/W6NZfCO5SIk/maxresdefault.jpg',
    sections: [
      {
        title: 'Getting Started',
        videos: [
          { title: 'What is JavaScript?', description: 'An introduction to JavaScript and its role in web development.', youtube_url: 'https://www.youtube.com/watch?v=upDLs1sn7g4', duration_seconds: 400 },
          { title: 'Setting up the Environment', description: 'Installing Node.js and VS Code.', youtube_url: 'https://www.youtube.com/watch?v=1tIHAi8h90o', duration_seconds: 350 },
          { title: 'Variables and Data Types', description: 'Understanding let, const, strings, numbers, and booleans.', youtube_url: 'https://www.youtube.com/watch?v=s5Rieo0xKjE', duration_seconds: 650 },
        ]
      },
      {
        title: 'Control Flow',
        videos: [
          { title: 'If/Else Statements', description: 'Making decisions in your code.', youtube_url: 'https://www.youtube.com/watch?v=IsG4Xd6Lls0', duration_seconds: 450 },
          { title: 'For and While Loops', description: 'Repeating actions using loops.', youtube_url: 'https://www.youtube.com/watch?v=s9wW2PpJsmQ', duration_seconds: 560 },
          { title: 'Switch Statements', description: 'Handling multiple conditions gracefully.', youtube_url: 'https://www.youtube.com/watch?v=Zk-eY207uXo', duration_seconds: 300 },
        ]
      },
      {
        title: 'Functions & Scope',
        videos: [
          { title: 'Function Basics', description: 'Creating and invoking reusable code blocks.', youtube_url: 'https://www.youtube.com/watch?v=N8ap4k_1QEQ', duration_seconds: 512 },
          { title: 'Arrow Functions', description: 'Modern, concise syntax for functions.', youtube_url: 'https://www.youtube.com/watch?v=h33Srr5J9nY', duration_seconds: 620 },
          { title: 'Scope and Closures', description: 'Understanding variable accessibility and closures.', youtube_url: 'https://www.youtube.com/watch?v=71AtaJpJHw0', duration_seconds: 800 },
        ]
      },
      {
        title: 'Async JavaScript',
        videos: [
          { title: 'Callbacks', description: 'The traditional way of handling async operations.', youtube_url: 'https://www.youtube.com/watch?v=cNjIUSDnb9k', duration_seconds: 490 },
          { title: 'Promises', description: 'A cleaner approach to async programming.', youtube_url: 'https://www.youtube.com/watch?v=RvYYCGs45L4', duration_seconds: 700 },
          { title: 'Async / Await', description: 'Modern synchronous-looking asynchronous code.', youtube_url: 'https://www.youtube.com/watch?v=V_Kr9OSfDeU', duration_seconds: 830 },
        ]
      }
    ]
  },
  {
    title: 'React for Beginners',
    slug: 'react-for-beginners',
    description: 'Learn the most popular frontend library. Build interactive user interfaces with components and hooks.',
    is_published: true,
    instructor_name: 'Akshay Saini',
    instructor_channel: 'Namaste JavaScript',
    category: 'Web Dev',
    level: 'Beginner',
    duration_weeks: 10,
    rating: 4.8,
    thumbnail_url: 'https://img.youtube.com/vi/SqcY0GlETPk/maxresdefault.jpg',
    sections: [
      {
        title: 'React Basics',
        videos: [
          { title: 'What is React?', description: 'Overview of React and why it is so popular.', youtube_url: 'https://www.youtube.com/watch?v=SqcY0GlETPk', duration_seconds: 900 },
          { title: 'JSX Explained', description: 'Writing HTML inside JavaScript.', youtube_url: 'https://www.youtube.com/watch?v=7fPXI_MnBOY', duration_seconds: 500 },
          { title: 'Creating Components', description: 'Building reusable UI building blocks.', youtube_url: 'https://www.youtube.com/watch?v=Y2hgEGPzTZY', duration_seconds: 630 },
        ]
      },
      {
        title: 'Hooks & State',
        videos: [
          { title: 'useState Hook', description: 'Managing state inside functional components.', youtube_url: 'https://www.youtube.com/watch?v=O6P86uwfdR0', duration_seconds: 820 },
          { title: 'useEffect Hook', description: 'Handling side effects and component lifecycles.', youtube_url: 'https://www.youtube.com/watch?v=0ZJgIjIuY7U', duration_seconds: 900 },
          { title: 'Custom Hooks', description: 'Extracting and reusing stateful logic.', youtube_url: 'https://www.youtube.com/watch?v=6ThIvnVOUgw', duration_seconds: 740 },
        ]
      },
      {
        title: 'Building Real UIs',
        videos: [
          { title: 'Handling Forms', description: 'Capturing user input effectively.', youtube_url: 'https://www.youtube.com/watch?v=SdzMBWTGbdA', duration_seconds: 680 },
          { title: 'Fetching Data', description: 'Making HTTP requests to external APIs.', youtube_url: 'https://www.youtube.com/watch?v=T3SRvw7ZQco', duration_seconds: 710 },
          { title: 'Routing in React', description: 'Navigating between different views.', youtube_url: 'https://www.youtube.com/watch?v=twTls-X41j4', duration_seconds: 860 },
        ]
      }
    ]
  },
  {
    title: 'Node.js & Express API',
    slug: 'nodejs-express-api',
    description: 'Build fast, scalable backend APIs using the JavaScript ecosystem.',
    is_published: true,
    instructor_name: 'Piyush Garg',
    instructor_channel: 'Piyush Garg',
    category: 'Web Dev',
    level: 'Intermediate',
    duration_weeks: 8,
    rating: 4.6,
    thumbnail_url: 'https://img.youtube.com/vi/TlB_eWDSMt4/maxresdefault.jpg',
    sections: [
      {
        title: 'Node.js Fundamentals',
        videos: [
          { title: 'What is Node.js?', description: 'JavaScript on the server environment.', youtube_url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4', duration_seconds: 700 },
          { title: 'Modules and Require', description: 'Breaking code into smaller files.', youtube_url: 'https://www.youtube.com/watch?v=xHLd36QoS4k', duration_seconds: 450 },
          { title: 'The File System', description: 'Reading and writing files dynamically.', youtube_url: 'https://www.youtube.com/watch?v=U57kU311-nE', duration_seconds: 600 },
        ]
      },
      {
        title: 'Express Framework',
        videos: [
          { title: 'Intro to Express', description: 'Setting up a web server.', youtube_url: 'https://www.youtube.com/watch?v=L72fhGm1tfE', duration_seconds: 950 },
          { title: 'Routing', description: 'Handling different HTTP requests and paths.', youtube_url: 'https://www.youtube.com/watch?v=zW_tZR0Ir3Q', duration_seconds: 540 },
          { title: 'Middleware', description: 'Executing code between request and response.', youtube_url: 'https://www.youtube.com/watch?v=lY6icfhap2o', duration_seconds: 630 },
        ]
      },
      {
        title: 'Auth & Database',
        videos: [
          { title: 'Connecting to MongoDB', description: 'Using Mongoose to interact with the DB.', youtube_url: 'https://www.youtube.com/watch?v=DZBGEVgL2eE', duration_seconds: 880 },
          { title: 'User Registration', description: 'Hashing passwords securely.', youtube_url: 'https://www.youtube.com/watch?v=mbsmsi7l3r4', duration_seconds: 900 },
          { title: 'JWT Authentication', description: 'Securing routes with JSON Web Tokens.', youtube_url: 'https://www.youtube.com/watch?v=mbsmsi7l3r4', duration_seconds: 920 },
        ]
      }
    ]
  },
  {
    title: 'Python for Data Science',
    slug: 'python-for-data-science',
    description: 'Enter the world of data science with Python. Covers basics up to data analysis with Pandas.',
    is_published: true,
    instructor_name: 'Shradha Khapra',
    instructor_channel: 'Apna College',
    category: 'Data Science',
    level: 'Beginner',
    duration_weeks: 10,
    rating: 4.7,
    thumbnail_url: 'https://img.youtube.com/vi/kqtD5dpn9C8/maxresdefault.jpg',
    sections: [
      {
        title: 'Python Basics',
        videos: [
          { title: 'Intro to Python', description: 'Variables, loops, and conditions.', youtube_url: 'https://www.youtube.com/watch?v=kqtD5dpn9C8', duration_seconds: 900 },
          { title: 'Lists and Dictionaries', description: 'Python data structures.', youtube_url: 'https://www.youtube.com/watch?v=tw7ror9x32s', duration_seconds: 600 },
          { title: 'Functions', description: 'Creating and using Python functions.', youtube_url: 'https://www.youtube.com/watch?v=9Os0o3wzS_I', duration_seconds: 550 },
        ]
      },
      {
        title: 'Data Analysis',
        videos: [
          { title: 'Numpy Crash Course', description: 'Numerical computing with Python.', youtube_url: 'https://www.youtube.com/watch?v=QUT1VHiLmmI', duration_seconds: 1200 },
          { title: 'Intro to Pandas', description: 'Data structures and operations.', youtube_url: 'https://www.youtube.com/watch?v=ZyhVh-qRZPA', duration_seconds: 800 },
          { title: 'Data Cleaning', description: 'Preparing your data for analysis.', youtube_url: 'https://www.youtube.com/watch?v=bDhvCp3_lYw', duration_seconds: 1000 },
        ]
      }
    ]
  },
  {
    title: 'CSS & Tailwind Mastery',
    slug: 'css-tailwind-mastery',
    description: 'Learn advanced CSS techniques and master the Tailwind CSS utility-first framework.',
    is_published: true,
    instructor_name: 'Kevin Powell',
    instructor_channel: 'Kevin Powell',
    category: 'Web Dev',
    level: 'Beginner',
    duration_weeks: 6,
    rating: 4.8,
    thumbnail_url: 'https://img.youtube.com/vi/fYq5PXgSsbE/maxresdefault.jpg',
    sections: [
      {
        title: 'CSS Foundations',
        videos: [
          { title: 'Flexbox Guide', description: 'Mastering flexbox layouts.', youtube_url: 'https://www.youtube.com/watch?v=fYq5PXgSsbE', duration_seconds: 850 },
          { title: 'CSS Grid', description: 'Building complex 2D layouts.', youtube_url: 'https://www.youtube.com/watch?v=t6CBKf8K_Ac', duration_seconds: 900 },
          { title: 'Animations and Transitions', description: 'Bringing UI to life.', youtube_url: 'https://www.youtube.com/watch?v=zHUpx90NerM', duration_seconds: 700 },
        ]
      },
      {
        title: 'Tailwind CSS',
        videos: [
          { title: 'Tailwind Crash Course', description: 'Getting started with utility classes.', youtube_url: 'https://www.youtube.com/watch?v=UBOj6rqRUME', duration_seconds: 800 },
          { title: 'Responsive Design', description: 'Building mobile-first layouts.', youtube_url: 'https://www.youtube.com/watch?v=_9mTJ84uL1Q', duration_seconds: 600 },
          { title: 'Customizing Tailwind', description: 'Modifying the configuration file.', youtube_url: 'https://www.youtube.com/watch?v=1b-XGgny8U0', duration_seconds: 700 },
        ]
      }
    ]
  },
  {
    title: 'TypeScript Deep Dive',
    slug: 'typescript-deep-dive',
    description: 'Add types to your JavaScript to write safer and more maintainable code.',
    is_published: true,
    instructor_name: 'Matt Pocock',
    instructor_channel: 'Total TypeScript',
    category: 'Web Dev',
    level: 'Intermediate',
    duration_weeks: 8,
    rating: 4.6,
    thumbnail_url: 'https://img.youtube.com/vi/BwuLxPH8IDs/maxresdefault.jpg',
    sections: [
      {
        title: 'TypeScript Basics',
        videos: [
          { title: 'Why TypeScript?', description: 'Benefits of static typing.', youtube_url: 'https://www.youtube.com/watch?v=BwuLxPH8IDs', duration_seconds: 500 },
          { title: 'Basic Types', description: 'Strings, numbers, booleans, and arrays.', youtube_url: 'https://www.youtube.com/watch?v=ahCwqrYpIuM', duration_seconds: 650 },
          { title: 'Interfaces and Types', description: 'Defining object shapes.', youtube_url: 'https://www.youtube.com/watch?v=30LWjhZzg50', duration_seconds: 700 },
        ]
      },
      {
        title: 'Advanced Types',
        videos: [
          { title: 'Generics', description: 'Writing reusable, type-safe functions.', youtube_url: 'https://www.youtube.com/watch?v=nViEqmE4vd8', duration_seconds: 800 },
          { title: 'Utility Types', description: 'Using Partial, Pick, Omit, and more.', youtube_url: 'https://www.youtube.com/watch?v=1jYWAsEamB4', duration_seconds: 750 },
          { title: 'Type Narrowing', description: 'Refining types for better safety.', youtube_url: 'https://www.youtube.com/watch?v=J8WkQv3E6-c', duration_seconds: 600 },
        ]
      }
    ]
  },
  {
    title: 'Understanding Hugging Face',
    slug: 'understanding-hugging-face',
    description: 'Learn what Hugging Face is, how the Model Hub works, how to use Spaces, and how to access AI models through APIs — no prior ML experience needed.',
    is_published: true,
    instructor_name: 'Patrick von Platen',
    instructor_channel: 'Hugging Face',
    category: 'AI & ML',
    level: 'Beginner',
    duration_weeks: 6,
    rating: 4.5,
    thumbnail_url: 'https://img.youtube.com/vi/tZd6R5ziNVI/maxresdefault.jpg',
    sections: [
      {
        title: 'What is Hugging Face',
        videos: [
          { title: 'Introduction to Hugging Face', description: 'What Hugging Face is, why it exists, GitHub vs Hugging Face analogy, central place for AI development.', youtube_url: 'https://www.youtube.com/watch?v=tZd6R5ziNVI', duration_seconds: 600 },
          { title: 'The Hugging Face Model Hub', description: 'Pre-trained models, model pages, descriptions, code snippets, API access, downloadable files, searching by task.', youtube_url: 'https://www.youtube.com/watch?v=QEaBAZQCtwE', duration_seconds: 540 },
          { title: 'Why Hugging Face is Useful for Students', description: 'Removing barriers of huge datasets, expensive hardware, long training time. Explore ready-made models.', youtube_url: 'https://www.youtube.com/watch?v=_j7JEDWuqLE', duration_seconds: 480 },
        ]
      },
      {
        title: 'Hugging Face Spaces',
        videos: [
          { title: 'What is a Hugging Face Space?', description: 'Space as a small web app running an AI model, usable from a browser, turns AI model into usable web application.', youtube_url: 'https://www.youtube.com/watch?v=3bSVKNKb_PY', duration_seconds: 540 },
          { title: 'Technologies Used in Spaces — Gradio & Streamlit', description: 'How Gradio and Streamlit create simple web interfaces for ML models.', youtube_url: 'https://www.youtube.com/watch?v=RiCQzBluTxU', duration_seconds: 600 },
          { title: 'Deploying a Model in Spaces — Step by Step', description: 'Create HF account, create new Space, choose SDK, add application code, push code.', youtube_url: 'https://www.youtube.com/watch?v=C67EMIbS67M', duration_seconds: 660 },
        ]
      },
      {
        title: 'Accessing Models Through API',
        videos: [
          { title: 'What is the Hugging Face Inference API?', description: 'API stands for Application Programming Interface, how one application sends request to another and receives response.', youtube_url: 'https://www.youtube.com/watch?v=fgVn0OKOxhU', duration_seconds: 540 },
          { title: 'Calling the HF API from JavaScript', description: 'Fetch request to HF API, Authorization Bearer token header, sending JSON input, receiving generated output.', youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration_seconds: 600 },
          { title: 'Example Flow — Text Generation End to End', description: 'Full example: User/Application -> Sends Input -> API or Space Interface -> Model Processes Input -> Prediction/Output Returned.', youtube_url: 'https://www.youtube.com/watch?v=aircAruvnKk', duration_seconds: 540 },
        ]
      }
    ]
  },
  {
    title: 'AI & ML Terminologies for Developers',
    slug: 'ai-ml-terminologies',
    description: 'Understand the core vocabulary of AI — from Artificial Intelligence and Machine Learning to LLMs and SLMs. Essential foundation before building AI-powered applications.',
    is_published: true,
    instructor_name: 'Andrew Ng',
    instructor_channel: 'DeepLearning.AI',
    category: 'AI & ML',
    level: 'Beginner',
    duration_weeks: 4,
    rating: 4.9,
    thumbnail_url: 'https://img.youtube.com/vi/ad79nYk2keg/maxresdefault.jpg',
    sections: [
      {
        title: 'Core AI Concepts',
        videos: [
          { title: 'What is Artificial Intelligence?', description: 'AI is broad field in CS to build machines performing tasks requiring human intelligence.', youtube_url: 'https://www.youtube.com/watch?v=ad79nYk2keg', duration_seconds: 480 },
          { title: 'Machine Learning Explained', description: 'ML is sub-field of AI, teach computer using data so it learns patterns by itself.', youtube_url: 'https://www.youtube.com/watch?v=ukzFI9rgwfU', duration_seconds: 540 },
          { title: 'What is a Model?', description: 'In AI/ML a model is a program that learned patterns from data and can make predictions/decisions.', youtube_url: 'https://www.youtube.com/watch?v=CqGHbyGMpHI', duration_seconds: 480 },
        ]
      },
      {
        title: 'Advanced AI Concepts',
        videos: [
          { title: 'Deep Learning & Neural Networks', description: 'Deep Learning is advanced type of ML, inspired by human brain, uses neural networks.', youtube_url: 'https://www.youtube.com/watch?v=aircAruvnKk', duration_seconds: 600 },
          { title: 'Natural Language Processing (NLP)', description: 'NLP field inside AI focused on understanding human language.', youtube_url: 'https://www.youtube.com/watch?v=fOvTtapxa9c', duration_seconds: 540 },
          { title: 'AI Model vs ML Model — Key Differences', description: 'AI Model = trained system performing intelligent task. ML Model = result of machine learning training.', youtube_url: 'https://www.youtube.com/watch?v=PeMlggyqz6Y', duration_seconds: 480 },
        ]
      },
      {
        title: 'Language Models',
        videos: [
          { title: 'What is a Large Language Model (LLM)?', description: 'LLM is very powerful AI model designed to understand and generate human language.', youtube_url: 'https://www.youtube.com/watch?v=iR2O2GPbB0E', duration_seconds: 600 },
          { title: 'Small Language Models (SLM) Explained', description: 'SLM similar to LLM but much smaller in size and computational requirements.', youtube_url: 'https://www.youtube.com/watch?v=0SBmQWNXGWI', duration_seconds: 540 },
          { title: 'LLM vs SLM — When to Use Which?', description: 'Summary of full AI hierarchy and when to choose LLM vs SLM.', youtube_url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', duration_seconds: 480 },
        ]
      }
    ]
  },
  {
    title: 'SAP ABAP for Beginners',
    slug: 'sap-abap-beginners',
    description: 'Start your journey into SAP development with ABAP. Learn the fundamentals of ERP systems and business logic.',
    is_published: true,
    instructor_name: 'Anubhav Oberoy',
    instructor_channel: 'Anubhav Trainings',
    category: 'SAP',
    level: 'Beginner',
    duration_weeks: 12,
    rating: 4.6,
    thumbnail_url: 'https://img.youtube.com/vi/qR4b7nJ7pQA/maxresdefault.jpg',
    sections: [
      {
        title: 'Introduction to SAP',
        videos: [
          { title: 'What is SAP?', description: 'Understanding ERP and the SAP ecosystem.', youtube_url: 'https://www.youtube.com/watch?v=qR4b7nJ7pQA', duration_seconds: 600 },
          { title: 'SAP Architecture', description: 'The 3-tier architecture of SAP systems.', youtube_url: 'https://www.youtube.com/watch?v=Xh_KogTpsaM', duration_seconds: 540 },
        ]
      },
      {
        title: 'ABAP Basics',
        videos: [
          { title: 'Your First ABAP Program', description: 'Writing Hello World in ABAP.', youtube_url: 'https://www.youtube.com/watch?v=sc6S92f6F1I', duration_seconds: 480 },
          { title: 'Data Types and Objects', description: 'Variables and constants in ABAP.', youtube_url: 'https://www.youtube.com/watch?v=xZ_pA78eR8o', duration_seconds: 700 },
        ]
      }
    ]
  },
  {
    title: 'Flutter Mobile App Dev',
    slug: 'flutter-app-dev',
    description: 'Build beautiful native applications for iOS and Android with a single codebase using Flutter and Dart.',
    is_published: true,
    instructor_name: 'Srivatsav',
    instructor_channel: 'Hybrid App Dev',
    category: 'App Dev',
    level: 'Beginner',
    duration_weeks: 10,
    rating: 4.8,
    thumbnail_url: 'https://img.youtube.com/vi/VPvVD8t02U8/maxresdefault.jpg',
    sections: [
      {
        title: 'Widgets 101',
        videos: [
          { title: 'Intro to Widgets', description: 'Everything is a widget in Flutter.', youtube_url: 'https://www.youtube.com/watch?v=VPvVD8t02U8', duration_seconds: 900 },
          { title: 'Stateless vs Stateful', description: 'Managing state in Flutter apps.', youtube_url: 'https://www.youtube.com/watch?v=0_u6eX6o7O4', duration_seconds: 600 },
        ]
      }
    ]
  },
  {
    title: 'Mastering Data Structures',
    slug: 'mastering-dsa',
    description: 'Prepare for big tech interviews by mastering the algorithms and data structures that matter.',
    is_published: true,
    instructor_name: 'Striver',
    instructor_channel: 'take U forward',
    category: 'DSA',
    level: 'Advanced',
    duration_weeks: 16,
    rating: 4.9,
    thumbnail_url: 'https://img.youtube.com/vi/EAR7De6Gug4/maxresdefault.jpg',
    sections: [
      {
        title: 'Arrays & Hashing',
        videos: [
          { title: 'Array Masterclass', description: 'Operations and time complexity.', youtube_url: 'https://www.youtube.com/watch?v=EAR7De6Gug4', duration_seconds: 1200 },
          { title: 'Two Sum Problem', description: 'Solving the classic hashed search problem.', youtube_url: 'https://www.youtube.com/watch?v=UXDSeD9mN-k', duration_seconds: 800 },
        ]
      }
    ]
  }
];

async function seed() {
  console.log('🌱 Starting database seed script...');

  let totalSubjects = 0;
  let totalSections = 0;
  let totalVideos = 0;

  try {
    // 1. Delete all existing data in reverse dependency order
    console.log('🧹 Clearing existing data...');
    await db('video_progress').del();
    await db('enrollments').del();
    await db('refresh_tokens').del();
    await db('videos').del();
    await db('sections').del();
    await db('subjects').del();
    await db('users').del();
    console.log('✅ Data cleared successfully.');

    // 2. Insert Subjects
    console.log('📚 Inserting subjects...');
    for (const [subjectIndex, subjectData] of subjectsData.entries()) {
      // Calculate total lessons
      const total_lessons = (subjectData.sections as any[]).reduce((sum, section) => sum + (section.videos?.length || 0), 0);

      const [subjectId] = await db('subjects').insert({
        title: subjectData.title,
        slug: subjectData.slug,
        description: subjectData.description,
        is_published: subjectData.is_published,
        thumbnail_url: (subjectData as any).thumbnail_url,
        instructor_name: (subjectData as any).instructor_name,
        instructor_channel: (subjectData as any).instructor_channel,
        category: (subjectData as any).category,
        level: (subjectData as any).level || 'Beginner',
        duration_weeks: (subjectData as any).duration_weeks,
        rating: (subjectData as any).rating || 4.5,
        total_lessons: total_lessons,
        is_free: (subjectData as any).is_free !== undefined ? (subjectData as any).is_free : true,
      });

      totalSubjects++;
      console.log(`  ➔ Added subject: ${subjectData.title} (ID: ${subjectId})`);

      // 3. Insert Sections for Subject
      for (const [sectionIndex, sectionData] of (subjectData.sections as any[]).entries()) {
        const [sectionId] = await db('sections').insert({
          subject_id: subjectId,
          title: sectionData.title,
          order_index: sectionIndex + 1,
        });

        totalSections++;
        console.log(`      ➔ Added section: ${sectionData.title}`);

        // 4. Insert Videos for Section
        let videoOrder = 1;
        for (const videoData of (sectionData.videos as any[])) {
          await db('videos').insert({
            section_id: sectionId,
            title: videoData.title,
            description: videoData.description,
            youtube_url: videoData.youtube_url,
            order_index: videoOrder++,
            duration_seconds: videoData.duration_seconds,
          });
          totalVideos++;
        }
      }
    }

    console.log('\n🎉 Successfully seeded all courses, sections, and videos!');
    
    console.log('\n📊 SEED SUMMARY:');
    console.table([
      { Type: 'Subjects', Total: totalSubjects },
      { Type: 'Sections', Total: totalSections },
      { Type: 'Videos', Total: totalVideos },
    ]);

  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    console.log('\n🔌 Destroying database connection...');
    await db.destroy();
  }
}

seed();
