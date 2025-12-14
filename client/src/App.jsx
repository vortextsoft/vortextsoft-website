import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import MainLayout from './layout/MainLayout'
import AdminLayout from './layout/AdminLayout'

// Public Pages
import Home from './pages/Home'
import Services from './pages/Services'
import CaseStudies from './pages/CaseStudies'
import Blog from './pages/Blog'
import About from './pages/About'
import Careers from './pages/Careers'
import Contact from './pages/Contact'

import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import ScrollToTop from './components/ScrollToTop'
import FloatingLogo from './components/FloatingLogo'

// Admin Pages
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/admin/Dashboard'
import ServicesManagement from './pages/admin/ServicesManagement'
import CaseStudiesManagement from './pages/admin/CaseStudiesManagement'
import BlogManagement from './pages/admin/BlogManagement'
import TeamManagement from './pages/admin/TeamManagement'
import CareersManagement from './pages/admin/CareersManagement'
import ApplicationsList from './pages/admin/ApplicationsList'
import MessagesList from './pages/admin/MessagesList'
import PartnersManagement from './pages/admin/PartnersManagement'
import MeetingManagement from './pages/admin/MeetingManagement'

const Placeholder = ({ title }) => <div className="admin-card"><h2>{title} Management</h2><p>Coming Soon</p></div>

import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ScrollToTop />
        <FloatingLogo />
        <Routes>
          {/* ... Public Routes ... */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="services" element={<ServicesManagement />} />
            <Route path="casestudies" element={<CaseStudiesManagement />} />
            <Route path="blog" element={<BlogManagement />} />
            <Route path="team" element={<TeamManagement />} />
            <Route path="careers" element={<CareersManagement />} />
            <Route path="applications" element={<ApplicationsList />} />
            <Route path="messages" element={<MessagesList />} />
            <Route path="partners" element={<PartnersManagement />} />
            <Route path="meetings" element={<MeetingManagement />} />
          </Route>
        </Routes>
      </AuthProvider>
      )
}

      export default App
