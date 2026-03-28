import { AppDataSource } from '@/configs/database.config';
import { Role } from '@/modules/auth/entities/role.model';

const ROLES_DATA: Array<Pick<Role, 'name' | 'description'>> = [
  { name: 'student', description: 'Học sinh / người học' },
  { name: 'teacher', description: 'Giáo viên / người dạy' },
  { name: 'admin', description: 'Quản trị viên hệ thống' },
];

export const seedRoles = async () => {
  const roleRepo = AppDataSource.getRepository(Role);

  console.log('...Seeding Roles');

  for (const role of ROLES_DATA) {
    const exists = await roleRepo.findOneBy({ name: role.name });
    if (!exists) {
      await roleRepo.save(roleRepo.create(role));
    }
  }
};
