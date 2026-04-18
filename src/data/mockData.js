// ─── Mock Users ───
export const mockUsers = [
  {
    id: 'u1',
    email: 'admin@edutrack.com',
    password: '123456',
    role: 'admin',
    name: 'Ashok Sir',
    avatar: null,
  },
  {
    id: 'u2',
    email: 'faculty@edutrack.com',
    password: '123456',
    role: 'faculty',
    name: 'Uttam Sir',
    avatar: null,
  },
  {
    id: 'u3',
    email: 'student@edutrack.com',
    password: '123456',
    role: 'student',
    name: 'Manan Patel',
    avatar: null,
    studentId: 's1',
  },
];

// ─── Streams ───
export const mockStreams = [
  { id: 'str1', name: 'Web Development', color: '#6366f1', icon: '🌐' },
  { id: 'str2', name: 'Data Science', color: '#8b5cf6', icon: '📊' },
  { id: 'str3', name: 'UI/UX Design', color: '#06b6d4', icon: '🎨' },
  { id: 'str4', name: 'Mobile Development', color: '#ec4899', icon: '📱' },
  { id: 'str5', name: 'Cloud Computing', color: '#14b8a6', icon: '☁️' },
  { id: 'str6', name: 'Cyber Security', color: '#f59e0b', icon: '🔒' },
];

// ─── Faculty ───
export const mockFaculty = [
  { id: 'f1', userId: 'u2', name: 'Uttam Sir', email: 'faculty@edutrack.com', department: 'Web Development', specialization: 'React & Node.js', phone: '+91 98765 43210', joinDate: '2024-06-15', assignedStreams: ['str1', 'str4'], status: 'active' },
  { id: 'f2', userId: null, name: 'Neha Madam', email: 'neha@edutrack.com', department: 'Data Science', specialization: 'Machine Learning & Python', phone: '+91 98765 43211', joinDate: '2024-08-01', assignedStreams: ['str2'], status: 'active' },
  { id: 'f3', userId: null, name: 'Rajesh Sir', email: 'rajesh@edutrack.com', department: 'UI/UX Design', specialization: 'Figma & Adobe XD', phone: '+91 98765 43212', joinDate: '2025-01-10', assignedStreams: ['str3'], status: 'active' },
  { id: 'f4', userId: null, name: 'Priya Madam', email: 'priya@edutrack.com', department: 'Cloud Computing', specialization: 'AWS & Azure', phone: '+91 98765 43213', joinDate: '2025-03-20', assignedStreams: ['str5', 'str6'], status: 'active' },
  { id: 'f5', userId: null, name: 'Amit Sir', email: 'amit@edutrack.com', department: 'Cyber Security', specialization: 'Ethical Hacking & Forensics', phone: '+91 98765 43214', joinDate: '2025-06-01', assignedStreams: ['str6'], status: 'on-leave' },
];

// ─── Students ───
export const mockStudents = [
  { id: 's1', userId: 'u3', name: 'Manan Patel', email: 'student@edutrack.com', streamId: 'str1', enrollmentDate: '2025-12-01', streak: 7, totalSubmissions: 45 },
  { id: 's2', userId: null, name: 'Ananya Gupta', email: 'ananya@edutrack.com', streamId: 'str2', enrollmentDate: '2025-11-15', streak: 12, totalSubmissions: 62 },
  { id: 's3', userId: null, name: 'Rohan Mehta', email: 'rohan@edutrack.com', streamId: 'str1', enrollmentDate: '2025-12-10', streak: 3, totalSubmissions: 28 },
  { id: 's4', userId: null, name: 'Kavya Krishnan', email: 'kavya@edutrack.com', streamId: 'str3', enrollmentDate: '2025-11-20', streak: 15, totalSubmissions: 71 },
  { id: 's5', userId: null, name: 'Arjun Singh', email: 'arjun@edutrack.com', streamId: 'str4', enrollmentDate: '2026-01-05', streak: 5, totalSubmissions: 33 },
  { id: 's6', userId: null, name: 'Sneha Reddy', email: 'sneha@edutrack.com', streamId: 'str2', enrollmentDate: '2025-12-20', streak: 9, totalSubmissions: 50 },
  { id: 's7', userId: null, name: 'Vikram Thapar', email: 'vikram@edutrack.com', streamId: 'str5', enrollmentDate: '2026-01-10', streak: 2, totalSubmissions: 18 },
  { id: 's8', userId: null, name: 'Meera Iyer', email: 'meera@edutrack.com', streamId: 'str6', enrollmentDate: '2025-11-25', streak: 20, totalSubmissions: 80 },
  { id: 's9', userId: null, name: 'Aditya Joshi', email: 'aditya@edutrack.com', streamId: 'str3', enrollmentDate: '2026-02-01', streak: 0, totalSubmissions: 10 },
  { id: 's10', userId: null, name: 'Nisha Banerjee', email: 'nisha@edutrack.com', streamId: 'str1', enrollmentDate: '2026-01-15', streak: 8, totalSubmissions: 39 },
];

// ─── Submissions ───
const today = new Date();
const formatDate = (daysAgo) => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

export const mockSubmissions = [
  { id: 'sub1', studentId: 's1', streamId: 'str1', title: 'React Hooks Practice', date: formatDate(0), learnedInClass: 'React Hooks - useState, useEffect, custom hooks', learnedAtHome: 'Built a todo app with React + Tailwind', files: [{ name: 'hooks-demo.jsx', size: 4200, type: 'code' }, { name: 'screenshot.png', size: 184000, type: 'image' }], status: 'submitted', createdAt: new Date().toISOString() },
  { id: 'sub2', studentId: 's1', streamId: 'str1', title: 'React Router Setup', date: formatDate(1), learnedInClass: 'React Router v6 setup and nested routes', learnedAtHome: 'Practice routing with a multi-page portfolio', files: [{ name: 'router-config.js', size: 2800, type: 'code' }], status: 'approved', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'sub3', studentId: 's1', streamId: 'str1', title: 'Redux Toolkit Intro', date: formatDate(2), learnedInClass: 'Redux Toolkit fundamentals', learnedAtHome: 'Converted context-based state to Redux', files: [{ name: 'store-setup.js', size: 3100, type: 'code' }, { name: 'notes.pdf', size: 520000, type: 'pdf' }], status: 'reviewed', createdAt: new Date(Date.now() - 172800000).toISOString() },
  { id: 'sub4', studentId: 's2', streamId: 'str2', title: 'Pandas Deep Dive', date: formatDate(0), learnedInClass: 'Pandas DataFrames and Series operations', learnedAtHome: 'Kaggle dataset EDA practice', files: [{ name: 'eda-notebook.py', size: 8400, type: 'code' }, { name: 'dataset-analysis.pdf', size: 1200000, type: 'pdf' }], status: 'submitted', createdAt: new Date().toISOString() },
  { id: 'sub5', studentId: 's2', streamId: 'str2', title: 'Data Visualization', date: formatDate(1), learnedInClass: 'Matplotlib and Seaborn visualizations', learnedAtHome: 'Created charts for weather data', files: [{ name: 'charts.png', size: 340000, type: 'image' }], status: 'approved', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'sub6', studentId: 's3', streamId: 'str1', title: 'CSS Layout Practice', date: formatDate(0), learnedInClass: 'CSS Grid and Flexbox deep dive', learnedAtHome: 'Rebuilt a landing page layout', files: [{ name: 'layout.html', size: 5600, type: 'code' }, { name: 'styles.css', size: 3200, type: 'code' }], status: 'needs_improvement', createdAt: new Date().toISOString() },
  { id: 'sub7', studentId: 's4', streamId: 'str3', title: 'Figma Auto-Layout', date: formatDate(0), learnedInClass: 'Figma auto-layout and constraints', learnedAtHome: 'Designed a mobile app onboarding flow', files: [{ name: 'onboarding-flow.pdf', size: 2100000, type: 'pdf' }, { name: 'preview.png', size: 420000, type: 'image' }], status: 'approved', createdAt: new Date().toISOString() },
  { id: 'sub8', studentId: 's4', streamId: 'str3', title: 'Brand Style Guide', date: formatDate(1), learnedInClass: 'Color theory and typography systems', learnedAtHome: 'Created a brand style guide', files: [{ name: 'style-guide.pdf', size: 3400000, type: 'pdf' }], status: 'approved', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'sub9', studentId: 's5', streamId: 'str4', title: 'Flutter Calculator', date: formatDate(0), learnedInClass: 'Flutter widget tree and state management', learnedAtHome: 'Built a calculator app in Flutter', files: [{ name: 'main.dart', size: 6700, type: 'code' }], status: 'reviewed', createdAt: new Date().toISOString() },
  { id: 'sub10', studentId: 's6', streamId: 'str2', title: 'ML Classification', date: formatDate(0), learnedInClass: 'Scikit-learn classification algorithms', learnedAtHome: 'Trained an Iris classifier model', files: [{ name: 'classifier.py', size: 4800, type: 'code' }, { name: 'results.png', size: 280000, type: 'image' }], status: 'submitted', createdAt: new Date().toISOString() },
  { id: 'sub11', studentId: 's7', streamId: 'str5', title: 'AWS Deployment', date: formatDate(1), learnedInClass: 'AWS EC2 and S3 setup', learnedAtHome: 'Deployed a static site on S3', files: [], status: 'approved', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'sub12', studentId: 's8', streamId: 'str6', title: 'Network Scanning', date: formatDate(0), learnedInClass: 'Network scanning with Nmap', learnedAtHome: 'Practiced scanning local network', files: [{ name: 'scan-report.pdf', size: 890000, type: 'pdf' }], status: 'approved', createdAt: new Date().toISOString() },
  { id: 'sub13', studentId: 's9', streamId: 'str3', title: 'Wireframing Basics', date: formatDate(3), learnedInClass: 'Wireframing techniques', learnedAtHome: 'Sketched mobile app wireframes', files: [{ name: 'wireframes.png', size: 560000, type: 'image' }], status: 'needs_improvement', createdAt: new Date(Date.now() - 259200000).toISOString() },
  { id: 'sub14', studentId: 's10', streamId: 'str1', title: 'Express Middleware', date: formatDate(0), learnedInClass: 'Node.js Express middleware', learnedAtHome: 'Built REST API endpoints', files: [{ name: 'server.js', size: 3900, type: 'code' }], status: 'submitted', createdAt: new Date().toISOString() },
  { id: 'sub15', studentId: 's1', streamId: 'str1', title: 'Async JavaScript', date: formatDate(3), learnedInClass: 'JavaScript async/await and Promises', learnedAtHome: 'Fetch API practice with public APIs', files: [{ name: 'async-demo.js', size: 2400, type: 'code' }], status: 'approved', createdAt: new Date(Date.now() - 259200000).toISOString() },
  { id: 'sub16', studentId: 's1', streamId: 'str1', title: 'Git Workflow', date: formatDate(4), learnedInClass: 'Git branching and merging strategies', learnedAtHome: 'Set up a GitHub workflow for a project', files: [], status: 'approved', createdAt: new Date(Date.now() - 345600000).toISOString() },
  { id: 'sub17', studentId: 's1', streamId: 'str1', title: 'Responsive Design', date: formatDate(5), learnedInClass: 'Responsive design principles', learnedAtHome: 'Made portfolio mobile-friendly', files: [{ name: 'responsive.css', size: 1800, type: 'code' }, { name: 'mobile-view.png', size: 210000, type: 'image' }], status: 'approved', createdAt: new Date(Date.now() - 432000000).toISOString() },
  { id: 'sub18', studentId: 's1', streamId: 'str1', title: 'Tailwind CSS', date: formatDate(6), learnedInClass: 'Tailwind CSS fundamentals', learnedAtHome: 'Styled a card component library', files: [{ name: 'components.jsx', size: 5200, type: 'code' }], status: 'approved', createdAt: new Date(Date.now() - 518400000).toISOString() },
];

// ─── Feedback ───
export const mockFeedback = [
  { id: 'f1', submissionId: 'sub2', facultyId: 'u2', comment: 'Excellent work on React Router! Your nested routing implementation is clean and well-structured.', rating: 5, createdAt: new Date(Date.now() - 43200000).toISOString() },
  { id: 'f2', submissionId: 'sub3', facultyId: 'u2', comment: 'Good understanding of Redux Toolkit. Try using createAsyncThunk for API calls.', rating: 4, createdAt: new Date(Date.now() - 129600000).toISOString() },
  { id: 'f3', submissionId: 'sub6', facultyId: 'u2', comment: 'Your CSS Grid usage needs improvement. Review the grid template areas concept.', rating: 2, createdAt: new Date(Date.now() - 21600000).toISOString() },
  { id: 'f4', submissionId: 'sub7', facultyId: 'u2', comment: 'Outstanding Figma work! The auto-layout constraints are perfectly set up.', rating: 5, createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: 'f5', submissionId: 'sub5', facultyId: 'u2', comment: 'Great visualizations! Try adding interactivity with Plotly next time.', rating: 4, createdAt: new Date(Date.now() - 64800000).toISOString() },
  { id: 'f6', submissionId: 'sub15', facultyId: 'u2', comment: 'Solid async/await implementation. Error handling is well done.', rating: 5, createdAt: new Date(Date.now() - 216000000).toISOString() },
  { id: 'f7', submissionId: 'sub13', facultyId: 'u2', comment: 'Wireframes are too basic. Add more detail and annotations to convey interactions.', rating: 2, createdAt: new Date(Date.now() - 172800000).toISOString() },
];

// ─── Faculty Teaching Logs ───
export const mockTeachingLogs = [
  { id: 'tl1', facultyId: 'u2', date: formatDate(0), topic: 'React Hooks - useState, useEffect, custom hooks', streamId: 'str1', notes: 'Covered basic hooks and demonstrated custom hook patterns. Students practiced with exercises.' },
  { id: 'tl2', facultyId: 'u2', date: formatDate(1), topic: 'React Router v6 setup and nested routes', streamId: 'str1', notes: 'Introduced React Router v6 with practical examples. Showed nested route patterns.' },
  { id: 'tl3', facultyId: 'u2', date: formatDate(2), topic: 'Redux Toolkit fundamentals', streamId: 'str1', notes: 'Taught createSlice, configureStore, and basic patterns.' },
  { id: 'tl4', facultyId: 'u2', date: formatDate(0), topic: 'Pandas DataFrames and Series operations', streamId: 'str2', notes: 'Deep dive into DataFrame manipulation and aggregation functions.' },
];

// ─── AI Assistant Responses ───
export const aiResponses = [
  "Great job on today's submission! Keep up the consistency. 🚀",
  "I noticed you missed yesterday's upload. Try to maintain your streak!",
  "Pro tip: Break your learning into smaller chunks for better retention.",
  "Your submission structure looks good. Consider adding code snippets next time.",
  "Try improving your submission structure with more specific examples.",
  "You missed today's upload — submit before midnight to keep your streak!",
  "Based on your submissions, you're making great progress in React!",
  "Consider exploring advanced topics like useMemo and useCallback next.",
  "Your feedback from faculty suggests focusing more on CSS Grid layouts.",
  "Tip: Pair your home learning with practical projects for better understanding.",
  "You're on a 7-day streak! Amazing dedication! 🔥",
  "Try documenting what you learn — it helps with long-term retention.",
];

// ─── Analytics Data (for charts) ───
export const weeklySubmissionData = [
  { day: 'Mon', submissions: 42, approved: 35 },
  { day: 'Tue', submissions: 55, approved: 48 },
  { day: 'Wed', submissions: 38, approved: 30 },
  { day: 'Thu', submissions: 60, approved: 52 },
  { day: 'Fri', submissions: 45, approved: 40 },
  { day: 'Sat', submissions: 20, approved: 18 },
  { day: 'Sun', submissions: 15, approved: 12 },
];

export const streamDistributionData = [
  { name: 'Web Dev', value: 35, color: '#6366f1' },
  { name: 'Data Science', value: 25, color: '#8b5cf6' },
  { name: 'UI/UX', value: 20, color: '#06b6d4' },
  { name: 'Mobile', value: 10, color: '#ec4899' },
  { name: 'Cloud', value: 5, color: '#14b8a6' },
  { name: 'Security', value: 5, color: '#f59e0b' },
];

export const monthlyTrendData = [
  { month: 'Oct', total: 180 },
  { month: 'Nov', total: 240 },
  { month: 'Dec', total: 310 },
  { month: 'Jan', total: 380 },
  { month: 'Feb', total: 420 },
  { month: 'Mar', total: 290 },
];

export const activityTimeline = [
  { id: 'a1', type: 'submission', message: 'Manan Patel submitted daily work', time: '2 min ago', icon: '📝' },
  { id: 'a2', type: 'feedback', message: 'Dr. Priya gave feedback on Rohan\'s submission', time: '15 min ago', icon: '💬' },
  { id: 'a3', type: 'approval', message: 'Kavya Krishnan\'s submission was approved', time: '30 min ago', icon: '✅' },
  { id: 'a4', type: 'streak', message: 'Meera Iyer reached 20-day streak!', time: '1 hr ago', icon: '🔥' },
  { id: 'a5', type: 'enrollment', message: 'New student Aditya Joshi enrolled', time: '2 hrs ago', icon: '🎉' },
  { id: 'a6', type: 'teaching', message: 'Dr. Priya uploaded teaching log for React Hooks', time: '3 hrs ago', icon: '📚' },
  { id: 'a7', type: 'alert', message: 'Vikram Thapar has 3 missing submissions', time: '4 hrs ago', icon: '⚠️' },
  { id: 'a8', type: 'submission', message: 'Sneha Reddy submitted daily work', time: '5 hrs ago', icon: '📝' },
];

// ─── Notifications ───
export const mockNotifications = [
  { id: 'n1', type: 'feedback', title: 'New Feedback Received', message: 'Dr. Priya Sharma reviewed your React Router submission.', read: false, time: '5 min ago' },
  { id: 'n2', type: 'approval', title: 'Submission Approved! ✅', message: 'Your Redux Toolkit submission has been approved.', read: false, time: '30 min ago' },
  { id: 'n3', type: 'streak', title: 'Streak Alert 🔥', message: "You're on a 7-day streak! Keep it going!", read: true, time: '2 hrs ago' },
  { id: 'n4', type: 'alert', title: 'Missing Submission ⚠️', message: "You haven't submitted work for yesterday.", read: true, time: '1 day ago' },
  { id: 'n5', type: 'system', title: 'Welcome to EduTrack', message: 'Start by submitting your first daily work report.', read: true, time: '3 days ago' },
];

// ─── Attendance ───
const generateAttendanceHistory = () => {
  const records = [];
  const statuses = ['present', 'present', 'present', 'present', 'absent', 'late'];
  for (let day = 1; day <= 25; day++) {
    const d = new Date();
    d.setDate(d.getDate() - day);
    const dateStr = d.toISOString().split('T')[0];
    if (d.getDay() === 0 || d.getDay() === 6) continue; // skip weekends
    mockStudents.forEach((student) => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      records.push({
        id: `att-${dateStr}-${student.id}`,
        studentId: student.id,
        date: dateStr,
        status,
        markedAt: status !== 'absent' ? `${8 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} AM` : null,
        approvedBy: status !== 'absent' ? 'u2' : null,
      });
    });
  }
  return records;
};

export const mockAttendance = generateAttendanceHistory();

