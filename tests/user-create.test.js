import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client');

const prisma = {
  user: {
    create: jest.fn().mockResolvedValue({
      username: 'Arthur Morgan',
      password: '123456'
    })
  }
};

describe('User Insert Test', () => {
  it('Should mock user create', async () => {
    const userData = {
      username: 'Arthur Morgan',
      password: '123456'
    };

    const user = await prisma.user.create({ data: userData });

    expect(user.username).toBe('Arthur Morgan');
    expect(user.password).toBe('123456');
  });
});
