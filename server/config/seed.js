import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const seed = async () => {
  // Connect without database first to create it
  const initConn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  console.log('📦 Creating database and tables...');
  
  const dbName = process.env.DB_NAME || 'edutrack_db';
  await initConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  await initConn.query(`USE \`${dbName}\``);

  // Read and execute init.sql
  const initSql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf-8');
  await initConn.query(initSql);
  await initConn.end();

  // Connect to the database
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'edutrack_db',
  });

  console.log('🌱 Seeding data...');

  // Clear existing data (in reverse order of dependencies)
  await conn.query('SET FOREIGN_KEY_CHECKS = 0');
  await conn.query('TRUNCATE TABLE notifications');
  await conn.query('TRUNCATE TABLE contact_messages');
  await conn.query('TRUNCATE TABLE attendance');
  await conn.query('TRUNCATE TABLE teaching_logs');
  await conn.query('TRUNCATE TABLE feedback');
  await conn.query('TRUNCATE TABLE submission_files');
  await conn.query('TRUNCATE TABLE submissions');
  await conn.query('TRUNCATE TABLE faculty_streams');
  await conn.query('TRUNCATE TABLE students');
  await conn.query('TRUNCATE TABLE faculty');
  await conn.query('TRUNCATE TABLE streams');
  await conn.query('TRUNCATE TABLE users');
  await conn.query('SET FOREIGN_KEY_CHECKS = 1');

  // ─── Hash password ───
  const hashedPassword = await bcrypt.hash('123456', 10);

  // ─── Users ───
  console.log('  → Users...');
  await conn.query(
    'INSERT INTO users (id, email, password, role, name) VALUES ?',
    [[
      ['u1', 'admin@edutrack.com', hashedPassword, 'admin', 'Ashok Sir'],
      ['u2', 'faculty@edutrack.com', hashedPassword, 'faculty', 'Uttam Sir'],
      ['u3', 'student@edutrack.com', hashedPassword, 'student', 'Manan Patel'],
    ]]
  );

  // ─── Streams ───
  console.log('  → Streams...');
  await conn.query(
    'INSERT INTO streams (id, name, color, icon) VALUES ?',
    [[
      ['str1', 'Web Development', '#6366f1', '🌐'],
      ['str2', 'Data Science', '#8b5cf6', '📊'],
      ['str3', 'UI/UX Design', '#06b6d4', '🎨'],
      ['str4', 'Mobile Development', '#ec4899', '📱'],
      ['str5', 'Cloud Computing', '#14b8a6', '☁️'],
      ['str6', 'Cyber Security', '#f59e0b', '🔒'],
    ]]
  );

  // ─── Faculty ───
  console.log('  → Faculty...');
  await conn.query(
    'INSERT INTO faculty (id, user_id, name, email, department, specialization, phone, join_date, status) VALUES ?',
    [[
      ['f1', 'u2', 'Uttam Sir', 'faculty@edutrack.com', 'Web Development', 'React & Node.js', '+91 98765 43210', '2024-06-15', 'active'],
      ['f2', null, 'Neha Madam', 'neha@edutrack.com', 'Data Science', 'Machine Learning & Python', '+91 98765 43211', '2024-08-01', 'active'],
      ['f3', null, 'Rajesh Sir', 'rajesh@edutrack.com', 'UI/UX Design', 'Figma & Adobe XD', '+91 98765 43212', '2025-01-10', 'active'],
      ['f4', null, 'Priya Madam', 'priya@edutrack.com', 'Cloud Computing', 'AWS & Azure', '+91 98765 43213', '2025-03-20', 'active'],
      ['f5', null, 'Amit Sir', 'amit@edutrack.com', 'Cyber Security', 'Ethical Hacking & Forensics', '+91 98765 43214', '2025-06-01', 'on-leave'],
    ]]
  );

  // ─── Faculty-Streams ───
  console.log('  → Faculty-Stream assignments...');
  await conn.query(
    'INSERT INTO faculty_streams (faculty_id, stream_id) VALUES ?',
    [[
      ['f1', 'str1'], ['f1', 'str4'],
      ['f2', 'str2'],
      ['f3', 'str3'],
      ['f4', 'str5'], ['f4', 'str6'],
      ['f5', 'str6'],
    ]]
  );

  // ─── Students ───
  console.log('  → Students...');
  await conn.query(
    'INSERT INTO students (id, user_id, name, email, stream_id, enrollment_date, streak, total_submissions) VALUES ?',
    [[
      ['s1', 'u3', 'Manan Patel', 'student@edutrack.com', 'str1', '2025-12-01', 7, 45],
      ['s2', null, 'Ananya Gupta', 'ananya@edutrack.com', 'str2', '2025-11-15', 12, 62],
      ['s3', null, 'Rohan Mehta', 'rohan@edutrack.com', 'str1', '2025-12-10', 3, 28],
      ['s4', null, 'Kavya Krishnan', 'kavya@edutrack.com', 'str3', '2025-11-20', 15, 71],
      ['s5', null, 'Arjun Singh', 'arjun@edutrack.com', 'str4', '2026-01-05', 5, 33],
      ['s6', null, 'Sneha Reddy', 'sneha@edutrack.com', 'str2', '2025-12-20', 9, 50],
      ['s7', null, 'Vikram Thapar', 'vikram@edutrack.com', 'str5', '2026-01-10', 2, 18],
      ['s8', null, 'Meera Iyer', 'meera@edutrack.com', 'str6', '2025-11-25', 20, 80],
      ['s9', null, 'Aditya Joshi', 'aditya@edutrack.com', 'str3', '2026-02-01', 0, 10],
      ['s10', null, 'Nisha Banerjee', 'nisha@edutrack.com', 'str1', '2026-01-15', 8, 39],
    ]]
  );

  // ─── Submissions ───
  console.log('  → Submissions...');
  const today = new Date();
  const formatDate = (daysAgo) => {
    const d = new Date(today);
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split('T')[0];
  };
  const formatDatetime = (daysAgo) => {
    const d = new Date(today);
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().slice(0, 19).replace('T', ' ');
  };

  const submissions = [
    ['sub1', 's1', 'str1', 'React Hooks Practice', formatDate(0), 'React Hooks - useState, useEffect, custom hooks', 'Built a todo app with React + Tailwind', 'submitted', formatDatetime(0)],
    ['sub2', 's1', 'str1', 'React Router Setup', formatDate(1), 'React Router v6 setup and nested routes', 'Practice routing with a multi-page portfolio', 'approved', formatDatetime(1)],
    ['sub3', 's1', 'str1', 'Redux Toolkit Intro', formatDate(2), 'Redux Toolkit fundamentals', 'Converted context-based state to Redux', 'reviewed', formatDatetime(2)],
    ['sub4', 's2', 'str2', 'Pandas Deep Dive', formatDate(0), 'Pandas DataFrames and Series operations', 'Kaggle dataset EDA practice', 'submitted', formatDatetime(0)],
    ['sub5', 's2', 'str2', 'Data Visualization', formatDate(1), 'Matplotlib and Seaborn visualizations', 'Created charts for weather data', 'approved', formatDatetime(1)],
    ['sub6', 's3', 'str1', 'CSS Layout Practice', formatDate(0), 'CSS Grid and Flexbox deep dive', 'Rebuilt a landing page layout', 'needs_improvement', formatDatetime(0)],
    ['sub7', 's4', 'str3', 'Figma Auto-Layout', formatDate(0), 'Figma auto-layout and constraints', 'Designed a mobile app onboarding flow', 'approved', formatDatetime(0)],
    ['sub8', 's4', 'str3', 'Brand Style Guide', formatDate(1), 'Color theory and typography systems', 'Created a brand style guide', 'approved', formatDatetime(1)],
    ['sub9', 's5', 'str4', 'Flutter Calculator', formatDate(0), 'Flutter widget tree and state management', 'Built a calculator app in Flutter', 'reviewed', formatDatetime(0)],
    ['sub10', 's6', 'str2', 'ML Classification', formatDate(0), 'Scikit-learn classification algorithms', 'Trained an Iris classifier model', 'submitted', formatDatetime(0)],
    ['sub11', 's7', 'str5', 'AWS Deployment', formatDate(1), 'AWS EC2 and S3 setup', 'Deployed a static site on S3', 'approved', formatDatetime(1)],
    ['sub12', 's8', 'str6', 'Network Scanning', formatDate(0), 'Network scanning with Nmap', 'Practiced scanning local network', 'approved', formatDatetime(0)],
    ['sub13', 's9', 'str3', 'Wireframing Basics', formatDate(3), 'Wireframing techniques', 'Sketched mobile app wireframes', 'needs_improvement', formatDatetime(3)],
    ['sub14', 's10', 'str1', 'Express Middleware', formatDate(0), 'Node.js Express middleware', 'Built REST API endpoints', 'submitted', formatDatetime(0)],
    ['sub15', 's1', 'str1', 'Async JavaScript', formatDate(3), 'JavaScript async/await and Promises', 'Fetch API practice with public APIs', 'approved', formatDatetime(3)],
    ['sub16', 's1', 'str1', 'Git Workflow', formatDate(4), 'Git branching and merging strategies', 'Set up a GitHub workflow for a project', 'approved', formatDatetime(4)],
    ['sub17', 's1', 'str1', 'Responsive Design', formatDate(5), 'Responsive design principles', 'Made portfolio mobile-friendly', 'approved', formatDatetime(5)],
    ['sub18', 's1', 'str1', 'Tailwind CSS', formatDate(6), 'Tailwind CSS fundamentals', 'Styled a card component library', 'approved', formatDatetime(6)],
  ];

  await conn.query(
    'INSERT INTO submissions (id, student_id, stream_id, title, date, learned_in_class, learned_at_home, status, created_at) VALUES ?',
    [submissions]
  );

  // ─── Submission Files ───
  console.log('  → Submission files...');
  const subFiles = [
    ['sub1', 'hooks-demo.jsx', 4200, 'code', null],
    ['sub1', 'screenshot.png', 184000, 'image', null],
    ['sub2', 'router-config.js', 2800, 'code', null],
    ['sub3', 'store-setup.js', 3100, 'code', null],
    ['sub3', 'notes.pdf', 520000, 'pdf', null],
    ['sub4', 'eda-notebook.py', 8400, 'code', null],
    ['sub4', 'dataset-analysis.pdf', 1200000, 'pdf', null],
    ['sub5', 'charts.png', 340000, 'image', null],
    ['sub6', 'layout.html', 5600, 'code', null],
    ['sub6', 'styles.css', 3200, 'code', null],
    ['sub7', 'onboarding-flow.pdf', 2100000, 'pdf', null],
    ['sub7', 'preview.png', 420000, 'image', null],
    ['sub8', 'style-guide.pdf', 3400000, 'pdf', null],
    ['sub9', 'main.dart', 6700, 'code', null],
    ['sub10', 'classifier.py', 4800, 'code', null],
    ['sub10', 'results.png', 280000, 'image', null],
    ['sub12', 'scan-report.pdf', 890000, 'pdf', null],
    ['sub13', 'wireframes.png', 560000, 'image', null],
    ['sub14', 'server.js', 3900, 'code', null],
    ['sub15', 'async-demo.js', 2400, 'code', null],
    ['sub17', 'responsive.css', 1800, 'code', null],
    ['sub17', 'mobile-view.png', 210000, 'image', null],
    ['sub18', 'components.jsx', 5200, 'code', null],
  ];

  await conn.query(
    'INSERT INTO submission_files (submission_id, name, size, type, path) VALUES ?',
    [subFiles]
  );

  // ─── Feedback ───
  console.log('  → Feedback...');
  await conn.query(
    'INSERT INTO feedback (id, submission_id, faculty_id, comment, rating, created_at) VALUES ?',
    [[
      ['fb1', 'sub2', 'u2', 'Excellent work on React Router! Your nested routing implementation is clean and well-structured.', 5, formatDatetime(0.5)],
      ['fb2', 'sub3', 'u2', 'Good understanding of Redux Toolkit. Try using createAsyncThunk for API calls.', 4, formatDatetime(1.5)],
      ['fb3', 'sub6', 'u2', 'Your CSS Grid usage needs improvement. Review the grid template areas concept.', 2, formatDatetime(0.25)],
      ['fb4', 'sub7', 'u2', 'Outstanding Figma work! The auto-layout constraints are perfectly set up.', 5, formatDatetime(0.1)],
      ['fb5', 'sub5', 'u2', 'Great visualizations! Try adding interactivity with Plotly next time.', 4, formatDatetime(0.75)],
      ['fb6', 'sub15', 'u2', 'Solid async/await implementation. Error handling is well done.', 5, formatDatetime(2.5)],
      ['fb7', 'sub13', 'u2', 'Wireframes are too basic. Add more detail and annotations to convey interactions.', 2, formatDatetime(2)],
    ]]
  );

  // ─── Teaching Logs ───
  console.log('  → Teaching logs...');
  await conn.query(
    'INSERT INTO teaching_logs (id, faculty_id, date, topic, stream_id, notes) VALUES ?',
    [[
      ['tl1', 'u2', formatDate(0), 'React Hooks - useState, useEffect, custom hooks', 'str1', 'Covered basic hooks and demonstrated custom hook patterns. Students practiced with exercises.'],
      ['tl2', 'u2', formatDate(1), 'React Router v6 setup and nested routes', 'str1', 'Introduced React Router v6 with practical examples. Showed nested route patterns.'],
      ['tl3', 'u2', formatDate(2), 'Redux Toolkit fundamentals', 'str1', 'Taught createSlice, configureStore, and basic patterns.'],
      ['tl4', 'u2', formatDate(0), 'Pandas DataFrames and Series operations', 'str2', 'Deep dive into DataFrame manipulation and aggregation functions.'],
    ]]
  );

  // ─── Attendance ───
  console.log('  → Attendance records...');
  const statuses = ['present', 'present', 'present', 'present', 'absent', 'late'];
  const studentIds = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10'];
  const attendanceRecords = [];

  for (let day = 1; day <= 25; day++) {
    const d = new Date();
    d.setDate(d.getDate() - day);
    const dateStr = d.toISOString().split('T')[0];
    if (d.getDay() === 0 || d.getDay() === 6) continue; // skip weekends

    studentIds.forEach((studentId) => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const markedAt = status !== 'absent' ? `${8 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} AM` : null;
      const approvedBy = status !== 'absent' ? 'u2' : null;

      attendanceRecords.push([
        `att-${dateStr}-${studentId}`,
        studentId,
        dateStr,
        status,
        markedAt,
        approvedBy,
      ]);
    });
  }

  if (attendanceRecords.length > 0) {
    await conn.query(
      'INSERT INTO attendance (id, student_id, date, status, marked_at, approved_by) VALUES ?',
      [attendanceRecords]
    );
  }

  // ─── Notifications ───
  console.log('  → Notifications...');
  await conn.query(
    'INSERT INTO notifications (id, user_id, type, title, message, is_read, created_at) VALUES ?',
    [[
      ['n1', 'u3', 'feedback', 'New Feedback Received', 'Dr. Priya Sharma reviewed your React Router submission.', false, formatDatetime(0)],
      ['n2', 'u3', 'approval', 'Submission Approved! ✅', 'Your Redux Toolkit submission has been approved.', false, formatDatetime(0)],
      ['n3', 'u3', 'streak', 'Streak Alert 🔥', "You're on a 7-day streak! Keep it going!", true, formatDatetime(0.1)],
      ['n4', 'u3', 'alert', 'Missing Submission ⚠️', "You haven't submitted work for yesterday.", true, formatDatetime(1)],
      ['n5', 'u3', 'system', 'Welcome to EduTrack', 'Start by submitting your first daily work report.', true, formatDatetime(3)],
    ]]
  );

  // Create uploads directory
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('  → Created uploads directory');
  }

  await conn.end();

  console.log('');
  console.log('✅ Database seeded successfully!');
  console.log('');
  console.log('📋 Login credentials:');
  console.log('   Admin:   admin@edutrack.com / 123456');
  console.log('   Faculty: faculty@edutrack.com / 123456');
  console.log('   Student: student@edutrack.com / 123456');
  console.log('');
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
