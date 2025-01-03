import { Repository } from "typeorm";
import { AppDataSource } from "../../../../main/config/typeorm.config";

export const MysqlHelper = {
  async connect() {
    await AppDataSource.initialize();
  },

  async disconnect() {
    if (AppDataSource && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  },

  async getRepository<T>(entity: new () => T): Promise<Repository<T>> {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    return AppDataSource.getRepository(entity);
  },

  async deleteAccountByEmail(email: string): Promise<void> {
    const userRepository = AppDataSource.getRepository("accounts");
    const user = await userRepository.findOne({ where: { email } });

    await userRepository.remove(user);
  },
};
