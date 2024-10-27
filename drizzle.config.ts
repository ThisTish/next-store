import * as dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'

dotenv.config({
	path: '.env.local',
  });

export default{
	schema:'./server/schema.ts',
	out: './server/migrations',
	dialect: 'postgresql',
	dbCredentials:{
		url: process.env.POSTGRES_URL as string
	}
} satisfies Config