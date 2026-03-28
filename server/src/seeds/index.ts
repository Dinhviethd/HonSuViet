import { seedRoles } from './role.seed';
import { seedChapters } from './chapter.seed';
import { seedLessons } from './lesson.seed';

export async function runSeeds() {
  console.log('Running database seeds...');

  await seedRoles();
  await seedChapters();
  await seedLessons();

  console.log('All seeds completed!');
}
