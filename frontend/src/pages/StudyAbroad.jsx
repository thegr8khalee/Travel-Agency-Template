import { useState } from 'react';
import {
  GraduationCap,
  Globe,
  BookOpen,
  Home as HomeIcon,
  Award,
  Users,
  Calendar,
  FileText,
  CheckCircle,
  Star,
  ArrowRight,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Heart,
  Shield,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Play,
  Building,
  TrendingUp,
  Check,
} from 'lucide-react';

const StudyAbroad = () => {
  const [activeCountry, setActiveCountry] = useState('uk');
  const [activeTab, setActiveTab] = useState('undergraduate');
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'uk',
    program: 'undergraduate',
    intake: '',
  });

  const countries = [
    {
      id: 'uk',
      name: 'United Kingdom',
      flag: 'https://flagcdn.com/w80/gb.png',
      image:
        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
      universities: 160,
      students: '500K+',
      workVisa: '2 Years',
      avgTuition: '₦15M - ₦35M/year',
      highlights: [
        'World-renowned universities',
        'Rich cultural heritage',
        '2-year post-study work visa',
        'Scholarships available',
      ],
      topUnis: [
        'Oxford University',
        'Cambridge University',
        'Imperial College London',
        'UCL',
      ],
    },
    {
      id: 'canada',
      name: 'Canada',
      flag: 'https://flagcdn.com/w80/ca.png',
      image:
        'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800',
      universities: 100,
      students: '640K+',
      workVisa: '3 Years',
      avgTuition: '₦10M - ₦25M/year',
      highlights: [
        'High quality of life',
        'Pathway to PR',
        '3-year post-study work permit',
        'Affordable education',
      ],
      topUnis: [
        'University of Toronto',
        'UBC',
        'McGill University',
        'University of Waterloo',
      ],
    },
    {
      id: 'usa',
      name: 'United States',
      flag: 'https://flagcdn.com/w80/us.png',
      image:
        'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800',
      universities: 5000,
      students: '1M+',
      workVisa: '1-3 Years (OPT)',
      avgTuition: '₦20M - ₦50M/year',
      highlights: [
        "World's top universities",
        'Cutting-edge research',
        'Diverse campus life',
        'OPT work authorization',
      ],
      topUnis: ['MIT', 'Stanford University', 'Harvard University', 'Caltech'],
    },
    {
      id: 'australia',
      name: 'Australia',
      flag: 'https://flagcdn.com/w80/au.png',
      image:
        'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
      universities: 43,
      students: '750K+',
      workVisa: '2-4 Years',
      avgTuition: '₦12M - ₦30M/year',
      highlights: [
        'High living standards',
        'Work while studying',
        'Pathway to residency',
        'Beautiful landscapes',
      ],
      topUnis: [
        'University of Melbourne',
        'ANU',
        'University of Sydney',
        'UNSW',
      ],
    },
    {
      id: 'germany',
      name: 'Germany',
      flag: 'https://flagcdn.com/w80/de.png',
      image:
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800',
      universities: 400,
      students: '400K+',
      workVisa: '18 Months',
      avgTuition: '₦0 - ₦5M/year',
      highlights: [
        'Free/low tuition at public unis',
        'Strong economy',
        'Engineering excellence',
        '18-month job seeker visa',
      ],
      topUnis: [
        'TU Munich',
        'LMU Munich',
        'Heidelberg University',
        'Humboldt University',
      ],
    },
    {
      id: 'ireland',
      name: 'Ireland',
      flag: 'https://flagcdn.com/w80/ie.png',
      image:
        'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=800',
      universities: 34,
      students: '35K+',
      workVisa: '2 Years',
      avgTuition: '₦12M - ₦28M/year',
      highlights: [
        'English-speaking',
        'Tech hub of Europe',
        '2-year stay back option',
        'Friendly culture',
      ],
      topUnis: [
        'Trinity College Dublin',
        'UCD',
        'NUI Galway',
        'University of Limerick',
      ],
    },
  ];

  const programs = [
    {
      id: 'undergraduate',
      name: 'Undergraduate',
      duration: '3-4 Years',
      icon: BookOpen,
    },
    {
      id: 'postgraduate',
      name: 'Postgraduate',
      duration: '1-2 Years',
      icon: GraduationCap,
    },
    { id: 'phd', name: 'PhD/Research', duration: '3-5 Years', icon: Award },
    {
      id: 'foundation',
      name: 'Foundation',
      duration: '1 Year',
      icon: Building,
    },
  ];

  const services = [
    {
      icon: FileText,
      title: 'University Selection',
      desc: 'Personalized guidance to choose the right university and course based on your profile, budget, and career goals.',
      features: [
        'Profile assessment',
        'Course matching',
        'University shortlisting',
        'Scholarship identification',
      ],
    },
    {
      icon: BookOpen,
      title: 'Application Support',
      desc: 'End-to-end assistance with your university applications, from document preparation to submission.',
      features: [
        'SOP/Essay writing',
        'LOR guidance',
        'Document verification',
        'Application tracking',
      ],
    },
    {
      icon: Globe,
      title: 'Visa Assistance',
      desc: 'Complete support for student visa applications with high success rates.',
      features: [
        'Document checklist',
        'Financial guidance',
        'Interview preparation',
        'Visa filing support',
      ],
    },
    {
      icon: HomeIcon,
      title: 'Pre-Departure Support',
      desc: 'Everything you need to prepare for your journey and settle into your new country.',
      features: [
        'Accommodation help',
        'Travel arrangements',
        'Orientation sessions',
        'Student community connect',
      ],
    },
  ];

  const stats = [
    { value: '15,000+', label: 'Students Placed', icon: Users },
    { value: '500+', label: 'Partner Universities', icon: Building },
    { value: '98%', label: 'Visa Success Rate', icon: CheckCircle },
    { value: '25+', label: 'Countries Covered', icon: Globe },
  ];

  const testimonials = [
    {
      name: 'Adaeze Okonkwo',
      course: 'MSc Data Science',
      university: 'University of Edinburgh',
      country: 'UK',
      image:
        'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150',
      quote:
        'The team made my dream of studying in the UK a reality. From university selection to visa approval, they were with me every step of the way.',
    },
    {
      name: 'Emmanuel Adeyemi',
      course: 'MBA',
      university: 'University of Toronto',
      country: 'Canada',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      quote:
        'I got admission into my dream university with a scholarship! The counselors really understood my goals and helped me achieve them.',
    },
    {
      name: 'Fatima Ibrahim',
      course: 'MS Computer Science',
      university: 'TU Munich',
      country: 'Germany',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      quote:
        'Studying in Germany tuition-free seemed impossible until I found this agency. Their expertise in German university applications is unmatched.',
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Free Consultation',
      desc: 'Discuss your goals, budget, and preferences with our expert counselors',
      icon: Phone,
    },
    {
      step: 2,
      title: 'Profile Evaluation',
      desc: 'We assess your academic background and recommend suitable universities',
      icon: FileText,
    },
    {
      step: 3,
      title: 'University Application',
      desc: 'We prepare and submit applications to your chosen universities',
      icon: BookOpen,
    },
    {
      step: 4,
      title: 'Offer Letter',
      desc: 'Receive admission offers and choose your preferred university',
      icon: Award,
    },
    {
      step: 5,
      title: 'Visa Processing',
      desc: 'Complete visa documentation and preparation with our guidance',
      icon: Globe,
    },
    {
      step: 6,
      title: 'Pre-Departure',
      desc: 'Get ready with accommodation, travel, and orientation support',
      icon: Briefcase,
    },
  ];

  const faqs = [
    {
      q: 'What are the basic requirements to study abroad?',
      a: 'Generally, you need academic transcripts, English proficiency test scores (IELTS/TOEFL), statement of purpose, letters of recommendation, and proof of funds. Requirements vary by country and program level.',
    },
    {
      q: 'How much does it cost to study abroad?',
      a: 'Costs vary significantly by country. Germany offers free tuition at public universities, while UK/US can cost ₦15-50M/year. We help identify scholarships and affordable options within your budget.',
    },
    {
      q: 'Can I work while studying?',
      a: 'Most countries allow international students to work part-time (usually 20 hours/week during term). Countries like Canada, Australia, and Germany have generous work policies for students.',
    },
    {
      q: 'What is the best time to start the application process?',
      a: 'We recommend starting 12-18 months before your intended start date. This allows time for test preparation, applications, and visa processing. Contact us early for the best chances.',
    },
    {
      q: 'Do you guarantee admission?',
      a: 'While we cannot guarantee admission, our expert counselors have a 95%+ success rate. We carefully match your profile with universities where you have strong chances of acceptance.',
    },
    {
      q: 'What scholarships are available?',
      a: "Many scholarships are available including Chevening (UK), Fulbright (USA), DAAD (Germany), and university-specific scholarships. We help identify and apply for scholarships you're eligible for.",
    },
  ];

  const intakes = [
    { id: 'fall2026', name: 'Fall 2026 (Sep)', deadline: 'Apply by Mar 2026' },
    {
      id: 'spring2027',
      name: 'Spring 2027 (Jan)',
      deadline: 'Apply by Sep 2026',
    },
    { id: 'fall2027', name: 'Fall 2027 (Sep)', deadline: 'Apply by Mar 2027' },
  ];

  const activeCountryData = countries.find((c) => c.id === activeCountry);

  return (
    <div className="bg-base-200 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80"
            alt="Students graduating"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral/95 via-neutral/80 to-neutral/60"></div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10 pt-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-neutral-content">
              {/* <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-content border border-primary/30 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <GraduationCap size={18} />
                                <span>Your Gateway to Global Education</span>
                            </div> */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
                Turn Your <span className="text-primary">Study Abroad</span>{' '}
                Dreams Into Reality
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl">
                Expert guidance for admission to top universities in UK, Canada,
                USA, Australia, Germany & more. 15,000+ students placed
                successfully.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href="#consultation"
                  className="btn btn-primary-custom btn-lg"
                >
                  Free Consultation
                </a>
                {/* <button className="btn btn-outline btn-lg border-neutral-content/30 text-neutral-content hover:bg-neutral-content hover:text-neutral gap-2">
                                    <Play size={20} /> Watch Success Stories
                                </button> */}
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                {stats.slice(0, 3).map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs text-neutral-content/60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="bg-base-100 rounded-2xl shadow-2xl p-8 max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <h3 className="text-2xl font-medium text-base-content mb-2">
                Get Started Today
              </h3>
              <p className="text-base-content/60 mb-6">
                Fill in your details for a free consultation
              </p>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  className="input input-bordered rounded-2xl w-full"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input input-bordered rounded-2xl w-full"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input input-bordered rounded-2xl w-full"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <select
                  className="select select-bordered rounded-2xl w-full"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                >
                  <option disabled value="">
                    Preferred Country
                  </option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <select
                  className="select select-bordered rounded-2xl w-full"
                  value={formData.program}
                  onChange={(e) =>
                    setFormData({ ...formData, program: e.target.value })
                  }
                >
                  <option disabled value="">
                    Program Level
                  </option>
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <button className="btn btn-primary rounded-full border-none shadow-none w-full">
                  Get Free Counseling
                </button>
              </div>

              <p className="text-xs text-base-content/50 mt-4 text-center">
                By submitting, you agree to our terms and privacy policy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-base-100 border-b border-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 justify-center md:justify-start"
              >
                <div className="p-3 bg-primary/10 rounded-xl">
                  <stat.icon size={24} className="text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-base-content">
                    {stat.value}
                  </div>
                  <div className="text-sm text-base-content/60">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Destinations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-base-content mb-4">
              Popular Study Destinations
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Choose from top education destinations worldwide. Each country
              offers unique opportunities for international students.
            </p>
          </div>

          {/* Country Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {countries.map((country) => (
              <button
                key={country.id}
                onClick={() => setActiveCountry(country.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                  activeCountry === country.id
                    ? 'bg-primary text-primary-content shadow-lg'
                    : 'bg-base-100 text-base-content hover:bg-base-300 border border-base-300'
                }`}
              >
                <img
                  src={country.flag}
                  alt={country.name}
                  className="w-6 h-4 object-cover rounded"
                />
                <span className="hidden sm:inline">{country.name}</span>
              </button>
            ))}
          </div>

          {/* Active Country Details */}
          {activeCountryData && (
            <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={activeCountryData.image}
                    alt={activeCountryData.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <img
                      src={activeCountryData.flag}
                      alt=""
                      className="w-12 h-8 object-cover rounded shadow"
                    />
                    <h3 className="text-2xl font-bold text-white">
                      {activeCountryData.name}
                    </h3>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-base-200 rounded-xl p-4">
                      <Building className="text-primary mb-2" size={24} />
                      <div className="text-2xl font-medium text-base-content">
                        {activeCountryData.universities}+
                      </div>
                      <div className="text-sm text-base-content/60">
                        Universities
                      </div>
                    </div>
                    <div className="bg-base-200 rounded-xl p-4">
                      <Users className="text-primary mb-2" size={24} />
                      <div className="text-2xl font-medium text-base-content">
                        {activeCountryData.students}
                      </div>
                      <div className="text-sm text-base-content/60">
                        Intl Students
                      </div>
                    </div>
                    <div className="bg-base-200 rounded-xl p-4">
                      <Briefcase className="text-primary mb-2" size={24} />
                      <div className="text-2xl font-medium text-base-content">
                        {activeCountryData.workVisa}
                      </div>
                      <div className="text-sm text-base-content/60">
                        Work Visa
                      </div>
                    </div>
                    <div className="bg-base-200 rounded-xl p-4">
                      <DollarSign className="text-primary mb-2" size={24} />
                      <div className="text-lg font-medium text-base-content">
                        {activeCountryData.avgTuition}
                      </div>
                      <div className="text-sm text-base-content/60">
                        Avg. Tuition
                      </div>
                    </div>
                  </div>

                  <h4 className="font-medium text-base-content mb-3">
                    Why Study Here?
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {activeCountryData.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-base-content/80"
                      >
                        <Check
                          className="text-primary flex-shrink-0"
                          size={18}
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-medium text-base-content mb-3">
                    Top Universities
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeCountryData.topUnis.map((uni, idx) => (
                      <span key={idx} className="badge badge-outline badge-lg">
                        {uni}
                      </span>
                    ))}
                  </div>

                  <a href="#consultation" className="btn btn-primary-custom gap-2">
                    Explore {activeCountryData.name}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-base-content mb-4">
              Programs We Support
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              From undergraduate to PhD, we guide students at every academic
              level
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program) => (
              <div
                key={program.id}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  activeTab === program.id
                    ? 'border-primary bg-primary/5'
                    : 'border-base-300 bg-base-100 hover:border-primary/50'
                }`}
                onClick={() => setActiveTab(program.id)}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    activeTab === program.id
                      ? 'bg-primary text-primary-content'
                      : 'bg-base-200 text-base-content'
                  }`}
                >
                  <program.icon size={28} />
                </div>
                <h3 className="text-xl font-medium text-base-content mb-2">
                  {program.name}
                </h3>
                <p className="text-base-content/60">
                  Duration: {program.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-base-content mb-4">
              Our Services
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Comprehensive support from university selection to settling in
              your new country
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-200 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <service.icon className="text-primary" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-base-content mb-2">
                      {service.title}
                    </h3>
                    <p className="text-base-content/70 mb-4">{service.desc}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, fidx) => (
                        <div
                          key={fidx}
                          className="flex items-center gap-2 text-sm text-base-content/80"
                        >
                          <Check
                            className="text-primary flex-shrink-0"
                            size={14}
                          />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      {/* <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
              Your Journey With Us
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              A simple 6-step process to turn your study abroad dreams into
              reality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((item, idx) => (
              <div
                key={idx}
                className="relative bg-base-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary text-primary-content rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {item.step}
                </div>
                <div className="pt-4">
                  <item.icon className="text-primary mb-4" size={32} />
                  <h3 className="text-lg font-bold text-base-content mb-2">
                    {item.title}
                  </h3>
                  <p className="text-base-content/70 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-base-content mb-4">
              Success Stories
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Hear from students who achieved their study abroad dreams with our
              help
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-200"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-primary fill-primary"
                      size={18}
                    />
                  ))}
                </div>
                <p className="text-base-content/80 italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-base-content">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-base-content/60">
                      {testimonial.course}
                    </p>
                    <p className="text-sm text-primary">
                      {testimonial.university}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Intakes */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-base-content mb-4">
              Upcoming Intakes
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Don't miss the application deadlines. Start your journey today!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {intakes.map((intake, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border-2 text-center ${
                  idx === 0 ? 'border-primary bg-primary/5' : 'border-base-300'
                }`}
              >
                {idx === 0 && (
                  <span className="badge badge-primary mb-3">Apply Now</span>
                )}
                <Calendar className="text-primary mx-auto mb-3" size={32} />
                <h3 className="text-xl font-bold text-base-content mb-2">
                  {intake.name}
                </h3>
                <p className="text-base-content/60 text-sm">
                  {intake.deadline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-base-content mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-base-100 rounded-xl border border-base-200 overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="font-medium text-base-content pr-4">
                    {faq.q}
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp
                      className="text-primary flex-shrink-0"
                      size={20}
                    />
                  ) : (
                    <ChevronDown
                      className="text-base-content/50 flex-shrink-0"
                      size={20}
                    />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-base-content/70">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section id="consultation" className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium text-base-content mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-base-content/70 mb-8">
                Book a free consultation with our expert education counselors.
                We'll help you choose the right country, university, and course
                based on your goals and budget.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-base-content/60">Call Us</div>
                    <div className="font-semibold text-base-content">
                      +234 800 123 4567
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-base-content/60">Email Us</div>
                    <div className="font-semibold text-base-content">
                      study@travelagency.com
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-base-content/60">Visit Us</div>
                    <div className="font-semibold text-base-content">
                      Lagos, Abuja, Port Harcourt
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-base-200 rounded-2xl p-8">
              <h3 className="text-xl font-medium text-base-content mb-6">
                Book Free Consultation
              </h3>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-base-content/70 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="input rounded-2xl input-bordered w-full"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-base-content/70 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      className="input rounded-2xl input-bordered w-full"
                      placeholder="+234 ..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-base-content/70 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="input rounded-2xl input-bordered w-full"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-base-content/70 mb-1.5">
                      Preferred Country
                    </label>
                    <select className="select rounded-2xl select-bordered w-full">
                      <option disabled selected>
                        Select Country
                      </option>
                      {countries.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-base-content/70 mb-1.5">
                      Program Level
                    </label>
                    <select className="select rounded-2xl select-bordered w-full">
                      <option disabled selected>
                        Select Program
                      </option>
                      {programs.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-base-content/70 mb-1.5">
                    Preferred Intake
                  </label>
                  <select className="select rounded-2xl select-bordered w-full">
                    <option disabled selected>
                      Select Intake
                    </option>
                    {intakes.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-base-content/70 mb-1.5">
                    Message (Optional)
                  </label>
                  <textarea
                    className="textarea rounded-2xl textarea-bordered w-full"
                    rows="3"
                    placeholder="Tell us about your goals..."
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary-custom w-full">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-content">
        <div className="container mx-auto px-4 text-center">
          {/* <GraduationCap className="mx-auto mb-6" size={64} /> */}
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Your Future Starts Here
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Join 15,000+ students who trusted us with their study abroad
            journey. Let's make your dreams come true.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#consultation" className="btn btn-secondary rounded-full btn-lg gap-2">
              Get Started Now <ArrowRight size={20} />
            </a>
            <button className="btn btn-outline rounded-full border-primary-content/30 text-primary-content hover:bg-primary-content hover:text-primary btn-lg">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudyAbroad;
