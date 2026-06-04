-- EduTrack Database Schema
-- Run this script to create all tables

-- ─── Users ───
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'faculty', 'student') NOT NULL DEFAULT 'student',
  name VARCHAR(255) NOT NULL,
  avatar VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Streams ───
CREATE TABLE IF NOT EXISTS streams (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(255) NOT NULL,
  color VARCHAR(20) DEFAULT '#6366f1',
  icon VARCHAR(10) DEFAULT '📚',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── Faculty ───
CREATE TABLE IF NOT EXISTS faculty (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) DEFAULT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  department VARCHAR(255) DEFAULT NULL,
  specialization VARCHAR(255) DEFAULT NULL,
  phone VARCHAR(20) DEFAULT NULL,
  join_date DATE DEFAULT NULL,
  status ENUM('active', 'on-leave', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ─── Faculty-Streams Junction ───
CREATE TABLE IF NOT EXISTS faculty_streams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  faculty_id VARCHAR(36) NOT NULL,
  stream_id VARCHAR(36) NOT NULL,
  FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE CASCADE,
  FOREIGN KEY (stream_id) REFERENCES streams(id) ON DELETE CASCADE,
  UNIQUE KEY unique_faculty_stream (faculty_id, stream_id)
);

-- ─── Students ───
CREATE TABLE IF NOT EXISTS students (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) DEFAULT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  stream_id VARCHAR(36) DEFAULT NULL,
  enrollment_date DATE DEFAULT NULL,
  streak INT DEFAULT 0,
  total_submissions INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (stream_id) REFERENCES streams(id) ON DELETE SET NULL
);

-- ─── Submissions ───
CREATE TABLE IF NOT EXISTS submissions (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  student_id VARCHAR(36) NOT NULL,
  stream_id VARCHAR(36) NOT NULL,
  title VARCHAR(500) NOT NULL,
  date DATE NOT NULL,
  learned_in_class TEXT,
  learned_at_home TEXT,
  status ENUM('submitted', 'approved', 'reviewed', 'needs_improvement') DEFAULT 'submitted',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (stream_id) REFERENCES streams(id) ON DELETE CASCADE
);

-- ─── Submission Files ───
CREATE TABLE IF NOT EXISTS submission_files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  submission_id VARCHAR(36) NOT NULL,
  name VARCHAR(500) NOT NULL,
  size INT DEFAULT 0,
  type VARCHAR(50) DEFAULT 'default',
  path VARCHAR(1000) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE
);

-- ─── Feedback ───
CREATE TABLE IF NOT EXISTS feedback (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  submission_id VARCHAR(36) NOT NULL,
  faculty_id VARCHAR(36) NOT NULL,
  comment TEXT,
  rating INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE,
  FOREIGN KEY (faculty_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ─── Teaching Logs ───
CREATE TABLE IF NOT EXISTS teaching_logs (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  faculty_id VARCHAR(36) NOT NULL,
  date DATE NOT NULL,
  topic VARCHAR(500) NOT NULL,
  stream_id VARCHAR(36) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (faculty_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (stream_id) REFERENCES streams(id) ON DELETE CASCADE
);

-- ─── Attendance ───
CREATE TABLE IF NOT EXISTS attendance (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  student_id VARCHAR(36) NOT NULL,
  date DATE NOT NULL,
  status ENUM('present', 'absent', 'late', 'pending', 'rejected') DEFAULT 'pending',
  marked_at VARCHAR(20) DEFAULT NULL,
  approved_by VARCHAR(36) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
);

-- ─── Contact Messages ───
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) DEFAULT NULL,
  course VARCHAR(255) DEFAULT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── Notifications ───
CREATE TABLE IF NOT EXISTS notifications (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) NOT NULL,
  type ENUM('feedback', 'approval', 'streak', 'alert', 'system') DEFAULT 'system',
  title VARCHAR(500) NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ─── Indexes for performance ───
CREATE INDEX idx_submissions_student ON submissions(student_id);
CREATE INDEX idx_submissions_date ON submissions(date);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_attendance_student ON attendance(student_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_feedback_submission ON feedback(submission_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_students_stream ON students(stream_id);
