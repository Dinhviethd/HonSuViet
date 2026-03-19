import 'reflect-metadata';
import { initDatabase } from '@/configs/database.config';
import { seedRoles } from './role.seed';
import { seedChapters } from './chapter.seed';
import { seedLessons } from './lesson.seed';
import { seedQuizzes } from './quiz.seed';
async function runSeeds() {
  try {
    console.log('🔌 Connecting to database...');
    await initDatabase();
    
    console.log('🌱 Running database seeds...');
    
    // await seedRoles();
    // await seedChapters();
    await seedLessons();
    // await seedQuizzes();
    
    console.log('✅ All seeds completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

runSeeds();
