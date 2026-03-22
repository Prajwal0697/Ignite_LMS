import { db } from '../src/config/db';

async function fixEmptyCourses() {
  console.log('🔍 Checking for empty courses...');
  try {
    const subjects = await db('subjects').select('id', 'title');
    console.log(`Found ${subjects.length} subjects in total.`);

    for (const subject of subjects) {
      // Check if it has any videos
      const videos = await db('videos')
        .join('sections', 'videos.section_id', 'sections.id')
        .where('sections.subject_id', subject.id)
        .count('videos.id as total');

      const count = (videos[0] as any).total;
      
      if (count === 0) {
        console.log(`⚠️ Subject "${subject.title}" (ID: ${subject.id}) has 0 videos. Adding placeholder...`);
        
        // 1. Create or get a section
        let section = await db('sections').where('subject_id', subject.id).first();
        if (!section) {
          const [sectionId] = await db('sections').insert({
            subject_id: subject.id,
            title: 'General Curriculum',
            order_index: 1
          });
          section = { id: sectionId };
        }

        // 2. Add a video
        await db('videos').insert({
          section_id: section.id,
          title: `Intro to ${subject.title}`,
          description: 'A foundational lesson to get you started.',
          youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Universal placeholder
          order_index: 1,
          duration_seconds: 300
        });

        // 3. Update subject lesson count
        await db('subjects').where('id', subject.id).update({
          total_lessons: 1
        });

        console.log(`✅ Fixed!`);
      }
    }
  } catch (err) {
    console.error('❌ Error fixing courses:', err);
  } finally {
    await db.destroy();
  }
}

fixEmptyCourses();
