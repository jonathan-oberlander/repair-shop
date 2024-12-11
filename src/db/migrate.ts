import 'dotenv/config'
import { db } from './index'
import { migrate } from 'drizzle-orm/neon-http/migrator'

async function main() {
  try {
    await migrate(db, {
      migrationsFolder: './src/db/migrations',
    })

    console.log('Migration completed')
  } catch (error) {
    console.error('Error during migration: ', error)
    process.exit(1)
  }
}

main()
