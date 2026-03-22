import { db } from '../src/config/db';

// Only the NEW courses that need to be added
const newCourses = [
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
          { title: 'SAP Architecture Overview', description: 'The 3-tier architecture of SAP systems.', youtube_url: 'https://www.youtube.com/watch?v=Xh_KogTpsaM', duration_seconds: 540 },
          { title: 'Navigating the SAP GUI', description: 'How to navigate the SAP interface.', youtube_url: 'https://www.youtube.com/watch?v=hzYhSKrM_ok', duration_seconds: 480 },
        ]
      },
      {
        title: 'ABAP Basics',
        videos: [
          { title: 'Your First ABAP Program', description: 'Writing Hello World in ABAP.', youtube_url: 'https://www.youtube.com/watch?v=sc6S92f6F1I', duration_seconds: 480 },
          { title: 'Data Types and Variables', description: 'Variables and constants in ABAP.', youtube_url: 'https://www.youtube.com/watch?v=xZ_pA78eR8o', duration_seconds: 700 },
          { title: 'Conditionals and Loops in ABAP', description: 'IF, CASE, DO, WHILE loops.', youtube_url: 'https://www.youtube.com/watch?v=L0dZ88B5OLg', duration_seconds: 600 },
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
        title: 'Dart Language Basics',
        videos: [
          { title: 'Intro to Dart', description: 'The language behind Flutter.', youtube_url: 'https://www.youtube.com/watch?v=5KlnlCq2M5Q', duration_seconds: 720 },
          { title: 'Variables and Types in Dart', description: 'var, final, const in Dart.', youtube_url: 'https://www.youtube.com/watch?v=n0mn_6YKxnI', duration_seconds: 500 },
        ]
      },
      {
        title: 'Flutter Widgets 101',
        videos: [
          { title: 'Intro to Widgets', description: 'Everything is a widget in Flutter.', youtube_url: 'https://www.youtube.com/watch?v=VPvVD8t02U8', duration_seconds: 900 },
          { title: 'Stateless vs Stateful Widgets', description: 'Managing state in Flutter apps.', youtube_url: 'https://www.youtube.com/watch?v=0_u6eX6o7O4', duration_seconds: 600 },
          { title: 'Building Your First Flutter App', description: 'From zero to a working app.', youtube_url: 'https://www.youtube.com/watch?v=1SH0te-iNus', duration_seconds: 1200 },
        ]
      }
    ]
  },
  {
    title: 'Mastering Data Structures',
    slug: 'mastering-dsa',
    description: 'Prepare for big tech interviews by mastering algorithms and data structures using a visual approach.',
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
          { title: 'Arrays — Complete Masterclass', description: 'Operations and time complexity explained.', youtube_url: 'https://www.youtube.com/watch?v=EAR7De6Gug4', duration_seconds: 1200 },
          { title: 'Two Sum Problem', description: 'Solving the classic hashed search problem.', youtube_url: 'https://www.youtube.com/watch?v=UXDSeD9mN-k', duration_seconds: 800 },
          { title: 'Kadane\'s Algorithm', description: 'Maximum subarray problem.', youtube_url: 'https://www.youtube.com/watch?v=AHZpyENo7k4', duration_seconds: 700 },
        ]
      },
      {
        title: 'Linked Lists',
        videos: [
          { title: 'Linked List Introduction', description: 'What is a linked list and why is it important.', youtube_url: 'https://www.youtube.com/watch?v=WwfhLC16bis', duration_seconds: 900 },
          { title: 'Reversing a Linked List', description: 'The classic interview problem.', youtube_url: 'https://www.youtube.com/watch?v=G0_I-ZF0S38', duration_seconds: 750 },
        ]
      }
    ]
  }
];

async function addNewCourses() {
  console.log('📚 Adding new courses (SAP, App Dev, DSA)...\n');
  try {
    for (const courseData of newCourses) {
      // Check if already exists
      const existing = await db('subjects').where('slug', courseData.slug).first();
      if (existing) {
        console.log(`⏭️  Skipping "${courseData.title}" — already exists (ID: ${existing.id})`);
        continue;
      }

      const total_lessons = courseData.sections.reduce((sum, s) => sum + s.videos.length, 0);

      const [subjectId] = await db('subjects').insert({
        title: courseData.title,
        slug: courseData.slug,
        description: courseData.description,
        is_published: courseData.is_published,
        thumbnail_url: courseData.thumbnail_url,
        instructor_name: courseData.instructor_name,
        instructor_channel: courseData.instructor_channel,
        category: courseData.category,
        level: courseData.level,
        duration_weeks: courseData.duration_weeks,
        rating: courseData.rating,
        total_lessons,
        is_free: true,
      });

      console.log(`✅ Added Subject: "${courseData.title}" (ID: ${subjectId})`);

      for (const [si, section] of courseData.sections.entries()) {
        const [sectionId] = await db('sections').insert({
          subject_id: subjectId,
          title: section.title,
          order_index: si + 1,
        });

        for (const [vi, video] of section.videos.entries()) {
          await db('videos').insert({
            section_id: sectionId,
            title: video.title,
            description: video.description,
            youtube_url: video.youtube_url,
            order_index: vi + 1,
            duration_seconds: video.duration_seconds,
          });
        }

        console.log(`   ➔ Section: "${section.title}" (${section.videos.length} videos)`);
      }
    }

    console.log('\n🎉 All new courses added successfully!');
  } catch (err: any) {
    console.error('❌ Error:', err.message);
  } finally {
    await db.destroy();
  }
}

addNewCourses();
