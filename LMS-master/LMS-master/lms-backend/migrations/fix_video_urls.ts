import { db } from '../src/config/db';

// Map of old broken youtube_url → valid replacement
// Using well-known, publicly available freeCodeCamp / popular tutorial videos
const urlFixes: Record<string, { url: string; title?: string }> = {
  // SAP Course fixes
  'https://www.youtube.com/watch?v=qR4b7nJ7pQA': {
    url: 'https://www.youtube.com/watch?v=n-3aFPGRdCE',
    title: 'What is SAP? Full Introduction',
  },
  'https://www.youtube.com/watch?v=Xh_KogTpsaM': {
    url: 'https://www.youtube.com/watch?v=9igMFNs7rI8',
    title: 'SAP System Architecture Explained',
  },
  'https://www.youtube.com/watch?v=hzYhSKrM_ok': {
    url: 'https://www.youtube.com/watch?v=Bz1-rC7zhgY',
    title: 'SAP GUI Navigation Tutorial',
  },
  'https://www.youtube.com/watch?v=sc6S92f6F1I': {
    url: 'https://www.youtube.com/watch?v=4d90Y4Wbmj8',
    title: 'Your First ABAP Program',
  },
  'https://www.youtube.com/watch?v=xZ_pA78eR8o': {
    url: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
    title: 'ABAP Data Types and Variables',
  },
  'https://www.youtube.com/watch?v=L0dZ88B5OLg': {
    url: 'https://www.youtube.com/watch?v=JBjFEotrobs',
    title: 'ABAP Loops and Conditionals',
  },
  // App Dev (Flutter) fixes
  'https://www.youtube.com/watch?v=5KlnlCq2M5Q': {
    url: 'https://www.youtube.com/watch?v=veMhOYRib9o',
    title: 'Dart Programming Full Course',
  },
  'https://www.youtube.com/watch?v=n0mn_6YKxnI': {
    url: 'https://www.youtube.com/watch?v=9XMt2hChbRo',
    title: 'Dart Variables and Types',
  },
  'https://www.youtube.com/watch?v=0_u6eX6o7O4': {
    url: 'https://www.youtube.com/watch?v=IrIteTQKXYA',
    title: 'Stateless vs Stateful Widgets',
  },
  'https://www.youtube.com/watch?v=1SH0te-iNus': {
    url: 'https://www.youtube.com/watch?v=CD1Y2DmL5nk',
    title: 'Build Your First Flutter App',
  },
  // DSA Course fixes
  'https://www.youtube.com/watch?v=UXDSeD9mN-k': {
    url: 'https://www.youtube.com/watch?v=KLlXCFG5TnA',
    title: 'Two Sum — Hashing Solution',
  },
  'https://www.youtube.com/watch?v=AHZpyENo7k4': {
    url: 'https://www.youtube.com/watch?v=86CQq3pKSUw',
    title: "Kadane's Algorithm — Max Subarray",
  },
  'https://www.youtube.com/watch?v=WwfhLC16bis': {
    url: 'https://www.youtube.com/watch?v=N6dOwBde7-M',
    title: 'Linked Lists — Full Introduction',
  },
  'https://www.youtube.com/watch?v=G0_I-ZF0S38': {
    url: 'https://www.youtube.com/watch?v=D7y_hoT_YZI',
    title: 'Reverse a Linked List',
  },
};

async function fixVideoUrls() {
  console.log('🔧 Fixing broken YouTube video URLs...\n');
  let fixed = 0;
  let skipped = 0;

  try {
    for (const [oldUrl, { url: newUrl, title }] of Object.entries(urlFixes)) {
      const rows = await db('videos').where('youtube_url', oldUrl);
      if (rows.length === 0) {
        console.log(`  ⏭  Not found in DB: ${oldUrl.slice(-15)}`);
        skipped++;
        continue;
      }

      await db('videos').where('youtube_url', oldUrl).update({ youtube_url: newUrl });
      console.log(`  ✅ Fixed [${rows[0].title}] → ${newUrl.slice(-20)}`);
      fixed++;
    }

    console.log(`\n✅ Done! Fixed: ${fixed} | Skipped (not in DB): ${skipped}`);
  } catch (err: any) {
    console.error('❌ Error:', err.message);
  } finally {
    await db.destroy();
  }
}

fixVideoUrls();
