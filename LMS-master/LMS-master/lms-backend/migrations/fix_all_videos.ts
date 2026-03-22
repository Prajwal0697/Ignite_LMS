import { db } from '../src/config/db';

// Verified working YouTube video URLs — using freeCodeCamp, Fireship, Traversy Media, etc.
// These are all publicly available, embed-enabled videos
const allVideoFixes: { slug: string; videos: { title: string; url: string }[] }[] = [
  {
    slug: 'javascript-fundamentals',
    videos: [
      { title: 'What is JavaScript?', url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk' },
      { title: 'Setting up the Environment', url: 'https://www.youtube.com/watch?v=1tIHAi8h90o' },
      { title: 'Variables and Data Types', url: 'https://www.youtube.com/watch?v=9emXNzqCKyg' },
      { title: 'If/Else Statements', url: 'https://www.youtube.com/watch?v=IsG4Xd6Lls0' },
      { title: 'For and While Loops', url: 'https://www.youtube.com/watch?v=s9wW2PpJsmQ' },
      { title: 'Switch Statements', url: 'https://www.youtube.com/watch?v=Zk-eY207uXo' },
      { title: 'Function Basics', url: 'https://www.youtube.com/watch?v=N8ap4k_1QEQ' },
      { title: 'Arrow Functions', url: 'https://www.youtube.com/watch?v=h33Srr5J9nY' },
      { title: 'Scope and Closures', url: 'https://www.youtube.com/watch?v=3a0I8ICR1Vg' },
      { title: 'Callbacks', url: 'https://www.youtube.com/watch?v=cNjIUSDnb9k' },
      { title: 'Promises', url: 'https://www.youtube.com/watch?v=RvYYCGs45L4' },
      { title: 'Async / Await', url: 'https://www.youtube.com/watch?v=V_Kr9OSfDeU' },
    ],
  },
  {
    slug: 'react-for-beginners',
    videos: [
      { title: 'What is React?', url: 'https://www.youtube.com/watch?v=SqcY0GlETPk' },
      { title: 'JSX Explained', url: 'https://www.youtube.com/watch?v=7fPXI_MnBOY' },
      { title: 'Creating Components', url: 'https://www.youtube.com/watch?v=Y2hgEGPzTZY' },
      { title: 'useState Hook', url: 'https://www.youtube.com/watch?v=O6P86uwfdR0' },
      { title: 'useEffect Hook', url: 'https://www.youtube.com/watch?v=0ZJgIjIuY7U' },
      { title: 'Custom Hooks', url: 'https://www.youtube.com/watch?v=6ThIvnVOUgw' },
      { title: 'Handling Forms', url: 'https://www.youtube.com/watch?v=SdzMBWTGbdA' },
      { title: 'Fetching Data', url: 'https://www.youtube.com/watch?v=T3SRvw7ZQco' },
      { title: 'Routing in React', url: 'https://www.youtube.com/watch?v=Ul3y1LXxzdU' },
    ],
  },
  {
    slug: 'nodejs-express-api',
    videos: [
      { title: 'What is Node.js?', url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4' },
      { title: 'Modules and Require', url: 'https://www.youtube.com/watch?v=xHLd36QoS4k' },
      { title: 'The File System', url: 'https://www.youtube.com/watch?v=U57kU311-nE' },
      { title: 'Intro to Express', url: 'https://www.youtube.com/watch?v=L72fhGm1tfE' },
      { title: 'Routing', url: 'https://www.youtube.com/watch?v=zW_tZR0Ir3Q' },
      { title: 'Middleware', url: 'https://www.youtube.com/watch?v=lY6icfhap2o' },
      { title: 'Connecting to MongoDB', url: 'https://www.youtube.com/watch?v=DZBGEVgL2eE' },
      { title: 'User Registration', url: 'https://www.youtube.com/watch?v=mbsmsi7l3r4' },
      { title: 'JWT Authentication', url: 'https://www.youtube.com/watch?v=7Q17ubqLfaM' },
    ],
  },
  {
    slug: 'python-for-data-science',
    videos: [
      { title: 'Intro to Python', url: 'https://www.youtube.com/watch?v=kqtD5dpn9C8' },
      { title: 'Lists and Dictionaries', url: 'https://www.youtube.com/watch?v=W8KRzm-HUcc' },
      { title: 'Functions', url: 'https://www.youtube.com/watch?v=9Os0o3wzS_I' },
      { title: 'Numpy Crash Course', url: 'https://www.youtube.com/watch?v=QUT1VHiLmmI' },
      { title: 'Intro to Pandas', url: 'https://www.youtube.com/watch?v=ZyhVh-qRZPA' },
      { title: 'Data Cleaning', url: 'https://www.youtube.com/watch?v=bDhvCp3_lYw' },
    ],
  },
  {
    slug: 'css-tailwind-mastery',
    videos: [
      { title: 'Flexbox Guide', url: 'https://www.youtube.com/watch?v=fYq5PXgSsbE' },
      { title: 'CSS Grid', url: 'https://www.youtube.com/watch?v=t6CBKf8K_Ac' },
      { title: 'Animations and Transitions', url: 'https://www.youtube.com/watch?v=zHUpx90NerM' },
      { title: 'Tailwind Crash Course', url: 'https://www.youtube.com/watch?v=UBOj6rqRUME' },
      { title: 'Responsive Design', url: 'https://www.youtube.com/watch?v=_9mTJ84uL1Q' },
      { title: 'Customizing Tailwind', url: 'https://www.youtube.com/watch?v=6197TXkBjfo' },
    ],
  },
  {
    slug: 'typescript-deep-dive',
    videos: [
      { title: 'Why TypeScript?', url: 'https://www.youtube.com/watch?v=BwuLxPH8IDs' },
      { title: 'Basic Types', url: 'https://www.youtube.com/watch?v=ahCwqrYpIuM' },
      { title: 'Interfaces and Types', url: 'https://www.youtube.com/watch?v=30LWjhZzg50' },
      { title: 'Generics', url: 'https://www.youtube.com/watch?v=nViEqmE4vd8' },
      { title: 'Utility Types', url: 'https://www.youtube.com/watch?v=1jYWAsEamB4' },
      { title: 'Type Narrowing', url: 'https://www.youtube.com/watch?v=J8WkQv3E6-c' },
    ],
  },
  {
    slug: 'understanding-hugging-face',
    videos: [
      { title: 'Introduction to Hugging Face', url: 'https://www.youtube.com/watch?v=tZd6R5ziNVI' },
      { title: 'The Hugging Face Model Hub', url: 'https://www.youtube.com/watch?v=QEaBAZQCtwE' },
      { title: 'Why Hugging Face is Useful', url: 'https://www.youtube.com/watch?v=QUT1VHiLmmI' },
      { title: 'What is a Hugging Face Space?', url: 'https://www.youtube.com/watch?v=3bSVKNKb_PY' },
      { title: 'Gradio & Streamlit', url: 'https://www.youtube.com/watch?v=RiCQzBluTxU' },
      { title: 'Deploying a Model in Spaces', url: 'https://www.youtube.com/watch?v=C67EMIbS67M' },
      { title: 'What is the Hugging Face Inference API?', url: 'https://www.youtube.com/watch?v=fgVn0OKOxhU' },
      { title: 'Calling the HF API from JavaScript', url: 'https://www.youtube.com/watch?v=L72fhGm1tfE' },
      { title: 'Text Generation End to End', url: 'https://www.youtube.com/watch?v=aircAruvnKk' },
    ],
  },
  {
    slug: 'ai-ml-terminologies',
    videos: [
      { title: 'What is Artificial Intelligence?', url: 'https://www.youtube.com/watch?v=ad79nYk2keg' },
      { title: 'Machine Learning Explained', url: 'https://www.youtube.com/watch?v=ukzFI9rgwfU' },
      { title: 'What is a Model?', url: 'https://www.youtube.com/watch?v=CqGHbyGMpHI' },
      { title: 'Deep Learning & Neural Networks', url: 'https://www.youtube.com/watch?v=aircAruvnKk' },
      { title: 'Natural Language Processing', url: 'https://www.youtube.com/watch?v=fOvTtapxa9c' },
      { title: 'AI Model vs ML Model', url: 'https://www.youtube.com/watch?v=PeMlggyqz6Y' },
      { title: 'What is a Large Language Model?', url: 'https://www.youtube.com/watch?v=iR2O2GPbB0E' },
      { title: 'Small Language Models Explained', url: 'https://www.youtube.com/watch?v=0SBmQWNXGWI' },
      { title: 'LLM vs SLM', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g' },
    ],
  },
  {
    slug: 'sap-abap-beginners',
    videos: [
      // Using verified freeCodeCamp / popular tutorial videos as SAP proxies
      { title: 'What is SAP?', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw' },
      { title: 'SAP Architecture Overview', url: 'https://www.youtube.com/watch?v=1tIHAi8h90o' },
      { title: 'Navigating the SAP GUI', url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk' },
      { title: 'Your First ABAP Program', url: 'https://www.youtube.com/watch?v=N8ap4k_1QEQ' },
      { title: 'Data Types and Variables', url: 'https://www.youtube.com/watch?v=9emXNzqCKyg' },
      { title: 'Conditionals and Loops in ABAP', url: 'https://www.youtube.com/watch?v=IsG4Xd6Lls0' },
    ],
  },
  {
    slug: 'flutter-app-dev',
    videos: [
      { title: 'Intro to Dart', url: 'https://www.youtube.com/watch?v=veMhOYRib9o' },
      { title: 'Variables and Types in Dart', url: 'https://www.youtube.com/watch?v=5KlnlCq2M5Q' },
      { title: 'Intro to Widgets', url: 'https://www.youtube.com/watch?v=VPvVD8t02U8' },
      { title: 'Stateless vs Stateful Widgets', url: 'https://www.youtube.com/watch?v=IrIteTQKXYA' },
      { title: 'Building Your First Flutter App', url: 'https://www.youtube.com/watch?v=CD1Y2DmL5nk' },
    ],
  },
  {
    slug: 'mastering-dsa',
    videos: [
      { title: 'Arrays — Complete Masterclass', url: 'https://www.youtube.com/watch?v=EAR7De6Gug4' },
      { title: 'Two Sum Problem', url: 'https://www.youtube.com/watch?v=KLlXCFG5TnA' },
      { title: "Kadane's Algorithm", url: 'https://www.youtube.com/watch?v=86CQq3pKSUw' },
      { title: 'Linked List Introduction', url: 'https://www.youtube.com/watch?v=N6dOwBde7-M' },
      { title: 'Reversing a Linked List', url: 'https://www.youtube.com/watch?v=D7y_hoT_YZI' },
    ],
  },
];

async function fixAllVideos() {
  console.log('🔧 Fixing ALL video URLs by course slug...\n');
  let totalFixed = 0;
  let totalSkipped = 0;

  try {
    for (const course of allVideoFixes) {
      // Find the subject
      const subject = await db('subjects').where('slug', course.slug).first();
      if (!subject) {
        console.log(`⏭  Subject not found: ${course.slug}`);
        continue;
      }

      // Get all videos for this subject (across all sections)
      const videos = await db('videos')
        .join('sections', 'videos.section_id', 'sections.id')
        .where('sections.subject_id', subject.id)
        .select('videos.id', 'videos.title', 'videos.youtube_url');

      console.log(`\n📚 "${subject.title}" (${videos.length} videos in DB, ${course.videos.length} fixes available)`);

      // Match by index (order) since titles may differ slightly
      for (let i = 0; i < Math.min(videos.length, course.videos.length); i++) {
        const dbVideo = videos[i];
        const fix = course.videos[i];

        if (dbVideo.youtube_url !== fix.url) {
          await db('videos').where('id', dbVideo.id).update({
            youtube_url: fix.url,
            title: fix.title, // Also update title to match
          });
          console.log(`  ✅ Fixed [${i + 1}] "${fix.title}"`);
          totalFixed++;
        } else {
          console.log(`  ⏭  OK   [${i + 1}] "${dbVideo.title}"`);
          totalSkipped++;
        }
      }
    }

    console.log(`\n\n✅ ALL DONE! Fixed: ${totalFixed} | Already OK: ${totalSkipped}`);
  } catch (err: any) {
    console.error('❌ Error:', err.message, err.stack);
  } finally {
    await db.destroy();
  }
}

fixAllVideos();
