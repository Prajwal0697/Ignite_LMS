import { db } from '../src/config/db';

async function checkAndFix() {
  console.log('🔍 Checking for subjects with no videos...\n');
  try {
    const subjects = await db('subjects').select('id', 'title', 'total_lessons');
    console.log(`Total subjects in DB: ${subjects.length}`);
    console.log('---');
    
    let fixedCount = 0;
    
    for (const subject of subjects) {
      const rows = await db('videos')
        .join('sections', 'videos.section_id', 'sections.id')
        .where('sections.subject_id', subject.id)
        .count('videos.id as total');

      const count = Number((rows[0] as any).total);
      console.log(`  [${subject.id}] "${subject.title}" → ${count} video(s)`);

      if (count === 0) {
        console.log(`    ⚠️  No videos! Adding at least 1...`);

        // Ensure a section exists
        let section = await db('sections').where('subject_id', subject.id).first();
        if (!section) {
          const [sid] = await db('sections').insert({
            subject_id: subject.id,
            title: 'Getting Started',
            order_index: 1,
          });
          section = { id: sid };
          console.log(`    ✅ Created section (ID: ${sid})`);
        }

        // Add a starter video
        await db('videos').insert({
          section_id: section.id,
          title: `Introduction to ${subject.title}`,
          description: 'A quick overview of what you will learn in this course.',
          youtube_url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', // freeCodeCamp placeholder
          order_index: 1,
          duration_seconds: 360,
        });

        // Update total_lessons
        await db('subjects').where('id', subject.id).update({ total_lessons: 1 });
        console.log(`    ✅ Added intro video and updated total_lessons → 1`);
        fixedCount++;
      }
    }

    console.log(`\n✅ Done! Fixed ${fixedCount} empty course(s).`);
  } catch (err: any) {
    console.error('❌ Error:', err.message);
  } finally {
    await db.destroy();
  }
}

checkAndFix();
