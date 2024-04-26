import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from '../auth/roles.decorator';

@Entity()
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: Role.User })
  name: Role;
}

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  refreshToken: string;

  @OneToMany(() => RolesEntity, (role) => role.id)
  roles?: RolesEntity[];

  @Column('text', { array: true, default: [] })
  ownCourses?: string[];

  @Column('text', { array: true, default: [] })
  availableCourses?: string[];
}
