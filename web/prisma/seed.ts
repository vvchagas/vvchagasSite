import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client.js";
import { hashPassword } from "../server/utils/password";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// Cria o pool do PostgreSQL apontando para a URL do seu .env
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Instancia o adaptador e passa para o PrismaClient
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const username = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error("Defina ADMIN_USER e ADMIN_PASSWORD no .env antes de rodar o seed.");
  }

  const { salt, hash } = hashPassword(password);

  await prisma.adminUser.upsert({
    where: { username },
    update: { passwordHash: hash, passwordSalt: salt },
    create: { username, passwordHash: hash, passwordSalt: salt },
  });

  console.log(`Usuário admin "${username}" salvo no banco.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end(); // Encerra o pool do pg para o script finalizar limpo no terminal
  });