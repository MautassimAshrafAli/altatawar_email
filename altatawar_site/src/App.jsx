import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Shield, Users, CheckCircle, Zap, Database, Code, Server, Eye, Lock, ArrowUp } from 'lucide-react';
import './App.css';

// Import images
import heroTech from './assets/hero-tech.png';
import databaseImg from './assets/database.png';
import cybersecurityImg from './assets/cybersecurity.jpg';
import infrastructureImg from './assets/infrastructure.jpg';
import logo from './assets/logo.png';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('تم إرسال الرسالة بنجاح! سنتواصل معكم قريباً');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitMessage(result.message || 'حدث خطأ في إرسال الرسالة');
      }
    } catch (error) {
      setSubmitMessage('حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <img src={logo} alt="Logo" className="h-10 w-10" />
              <span className="text-xl font-bold text-gray-900">التطور التكنولوجي</span>
            </div>
            <div className="hidden md:flex space-x-8 space-x-reverse">
              <button onClick={() => scrollToSection('home')} className="nav-button">الرئيسية</button>
              <button onClick={() => scrollToSection('services')} className="nav-button">الخدمات</button>
              <button onClick={() => scrollToSection('about')} className="nav-button">من نحن</button>
              <button onClick={() => scrollToSection('security')} className="nav-button">الأمان</button>
              <button onClick={() => scrollToSection('contact')} className="nav-button">اتصل بنا</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                التطور التكنولوجي
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                نتشرف بتقديم خدماتنا التقنية المتميزة بأعلى معايير الجودة وأفضل الممارسات العالمية
              </p>
              <p className="text-lg text-gray-500 mb-8">
                نحن متخصصون في تطوير وإدارة الأنظمة التقنية والأمن السيبراني
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => scrollToSection('services')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  استكشف خدماتنا
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  تواصل معنا
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src={heroTech} 
                alt="Technology" 
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">خدماتنا المتخصصة</h2>
            <p className="text-xl text-gray-600">نقدم مجموعة شاملة من الخدمات التقنية المتطورة لتلبية احتياجات عملائنا</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Database Management */}
            <div className="service-card group">
              <div className="service-icon-container">
                <Database className="service-icon" />
              </div>
              <img src={databaseImg} alt="Database Management" className="service-image" />
              <div className="service-content">
                <h3 className="service-title">إدارة وتطوير قواعد البيانات</h3>
                <p className="service-subtitle">Database Management & Development</p>
                <p className="service-description">
                  إدارة قواعد بيانات PostgreSQL، ضمان سلامة البيانات، حلول النسخ الاحتياطي والاستعادة، وتحسين الأداء
                </p>
                <p className="service-description-en">
                  PostgreSQL database management, data integrity, backup and recovery solutions, and performance optimization
                </p>
                <button className="service-button">
                  اعرف المزيد
                </button>
              </div>
            </div>

            {/* Cybersecurity */}
            <div className="service-card group">
              <div className="service-icon-container">
                <Shield className="service-icon" />
              </div>
              <img src={cybersecurityImg} alt="Cybersecurity" className="service-image" />
              <div className="service-content">
                <h3 className="service-title">خدمات الأمن السيبراني</h3>
                <p className="service-subtitle">Cybersecurity Services</p>
                <p className="service-description">
                  إدارة أمن المعلومات، الامتثال للأمن السيبراني، الاستجابة للحوادث الأمنية، وتقييم وتخفيف المخاطر
                </p>
                <p className="service-description-en">
                  Information security management, cybersecurity compliance, security incident response, and risk assessment
                </p>
                <button className="service-button">
                  اعرف المزيد
                </button>
              </div>
            </div>

            {/* Software Development */}
            <div className="service-card group">
              <div className="service-icon-container">
                <Code className="service-icon" />
              </div>
              <div className="service-content">
                <h3 className="service-title">تطوير البرمجيات</h3>
                <p className="service-subtitle">Software Development</p>
                <p className="service-description">
                  تطوير وتكامل أنظمة ERP، حلول برمجية مخصصة، تحديث الأنظمة، وضمان الجودة والاختبار
                </p>
                <p className="service-description-en">
                  ERP system development and integration, custom software solutions, system modernization, and quality assurance
                </p>
                <button className="service-button">
                  اعرف المزيد
                </button>
              </div>
            </div>

            {/* IT Infrastructure */}
            <div className="service-card group">
              <div className="service-icon-container">
                <Server className="service-icon" />
              </div>
              <img src={infrastructureImg} alt="IT Infrastructure" className="service-image" />
              <div className="service-content">
                <h3 className="service-title">البنية التحتية لتقنية المعلومات والدعم</h3>
                <p className="service-subtitle">IT Infrastructure & Support</p>
                <p className="service-description">
                  صيانة ومراقبة الأنظمة، خدمات الدعم التقني، تحسين البنية التحتية، وخدمات المراقبة على مدار الساعة
                </p>
                <p className="service-description-en">
                  System maintenance and monitoring, technical support services, infrastructure optimization, and 24/7 monitoring
                </p>
                <button className="service-button">
                  اعرف المزيد
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">من نحن</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 mb-6">
                نحن مؤسسة متخصصة في تقديم الحلول التقنية المتطورة والخدمات المتميزة في مجال تقنية المعلومات والأمن السيبراني. نتمتع بخبرة واسعة وفريق متخصص يضمن تقديم أفضل الخدمات لعملائنا.
              </p>
              <p className="text-lg text-gray-600">
                نؤمن بأن مفتاح النجاح يكمن في التميز والجودة، والذي يضمن رضا عملائنا وتحقيق أهدافهم التقنية بكفاءة عالية.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">معايير جودة عالية</h3>
              <p className="text-gray-600">نلتزم بأعلى معايير الجودة وأفضل الممارسات العالمية</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">فريق خبير</h3>
              <p className="text-gray-600">فريق تقني متخصص ذو كفاءة عالية وخبرة واسعة</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">تدابير أمنية شاملة</h3>
              <p className="text-gray-600">حلول أمنية متقدمة تضمن حماية البيانات والأنظمة</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">التحسين المستمر</h3>
              <p className="text-gray-600">منهجية عمل متقدمة تضمن التطوير والتحسين المستمر</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">الأمان والامتثال</h2>
            <p className="text-xl text-gray-600">نلتزم بأعلى معايير الأمان والحماية لضمان سلامة بياناتكم وأنظمتكم</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">المراقبة المستمرة</h3>
              <p className="text-gray-600">مراقبة الأنظمة على مدار الساعة للكشف المبكر عن التهديدات</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">الامتثال للمعايير</h3>
              <p className="text-gray-600">الالتزام بالمعايير الدولية ومتطلبات الحماية السيبرانية</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">حماية البيانات</h3>
              <p className="text-gray-600">تطبيق أحدث تقنيات الحماية والتشفير لضمان أمان البيانات</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">تواصل معنا</h2>
            <p className="text-xl text-gray-600">نحن هنا لمساعدتكم في تحقيق أهدافكم التقنية</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">أرسل لنا رسالة</h3>
              <p className="text-gray-600 mb-6">سنتواصل معك في أقرب وقت ممكن</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    الموضوع
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    الرسالة
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                </button>

                {submitMessage && (
                  <div className={`p-4 rounded-lg ${submitMessage.includes('بنجاح') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">معلومات التواصل</h3>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center ml-4">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">العنوان</h4>
                    <p className="text-gray-600">صندوق بريد 229 - سكاكا - المملكة العربية السعودية</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center ml-4">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">الهاتف</h4>
                    <p className="text-gray-600">0590409111</p>
                    <p className="text-gray-600">0547247562</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center ml-4">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">البريد الإلكتروني</h4>
                    <p className="text-gray-600">altatawar@altatawar.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <img src={logo} alt="Logo" className="h-10 w-10" />
                <span className="text-xl font-bold">التطور التكنولوجي</span>
              </div>
              <p className="text-gray-400">
                نتميز بخدماتنا التقنية المتميزة بأعلى معايير الجودة وأفضل الممارسات العالمية
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">معلومات التواصل</h3>
              <div className="space-y-2 text-gray-400">
                <p>صندوق بريد 229 - سكاكا</p>
                <p>المملكة العربية السعودية</p>
                <p>0547247562 | 0590409111</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('home')} className="block text-gray-400 hover:text-white transition-colors">الرئيسية</button>
                <button onClick={() => scrollToSection('services')} className="block text-gray-400 hover:text-white transition-colors">الخدمات</button>
                <button onClick={() => scrollToSection('about')} className="block text-gray-400 hover:text-white transition-colors">من نحن</button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 التطور التكنولوجي. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default App;

