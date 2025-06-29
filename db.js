import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

console.log('Initializing database connection...');

export const sql = postgres(process.env.DATABASE_URL, {
  ssl: process.env.NODE_ENV === 'production',
  max: 10,
  idle_timeout: 30,
  connect_timeout: 15,
  connection: {
    application_name: 'student-portal'
  },
  onnotice: () => {},
  debug: (connection, query, params, types) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('DB Query:', query);
    }
  }
});

sql.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

console.log('Database pool created');

export const pool = {
  query: async (text, params = []) => {
    try {
      const result = await sql.unsafe(text, params);
      return { rows: result };
    } catch (error) {
      console.error('Database query error:', error);
      console.error('Query:', text);
      console.error('Parameters:', params);
      console.error('Error details:', error.message);
      throw error;
    }
  }
};