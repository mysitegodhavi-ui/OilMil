import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Droplets, Package, Sprout, Phone, MapPin, CheckCircle, Sparkles } from 'lucide-react';

// Use direct JPEG assets placed in public/assets
const HERO_BG = '/assets/home-bg.jpeg';
const PRODUCT_TIN = '/assets/dabbo.jpeg';
const EXTRA_IMG = '/assets/i3.jpeg';

// Language translations
const translations = {
  gu: {
    siteName: 'બાપા સીતારામ મીની ઓઈલ મીલ',
    tagline: 'બાકરોલમાં શુદ્ધ અને સાત્વિક સિંગતેલ',
    contact: 'સંપર્ક કરો',
    heroTitle1: 'તમારી આંખો સામે કાઢેલું,',
    heroTitle2: '૧૦૦% શુદ્ધ મગફળીનું તેલ',
    heroDesc: 'અમારા બાકરોલ સ્થિત ઓઈલ મીલમાં, અમે તમારી લાવેલી શુદ્ધ મગફળીમાંથી ઉચ્ચ ગુણવત્તાનું તેલ કાઢી, ૫ લિટરના ડબ્બામાં પેક કરી આપીએ છીએ.',
    learnMore: 'વધુ જાણો',
    processTitle: 'સિંગતેલ બનાવવાની અમારી પ્રક્રિયા',
    processDesc: 'શુદ્ધતા અને પારદર્શિતાના ત્રણ સરળ પગલાંમાં તાજું મગફળીનું તેલ.',
    step1Title: '૧. શ્રેષ્ઠ મગફળી લાવો',
    step1Desc: 'તમે તમારી પસંદગીની ઉચ્ચ ગુણવત્તાવાળી મગફળી લાવો.',
    step2Title: '૨. તાજું તેલ નિષ્કર્ષણ',
    step2Desc: 'અમારા આધુનિક મશીન દ્વારા વશેર નજર સામે જ તેલ કાઢવામાં આવે છે.',
    step3Title: '૩. સુરક્ષિત પેકિંગ',
    step3Desc: 'તાજા તેલને તરત જ ૫ લિટરના સ્વચ્છ અને સુરક્ષિત ડબ્બામાં પેક કરવામાં આવે છે.',
    featuresTitle: 'શા માટે અમારું સિંગતેલ પસંદ કરો?',
    featuresDesc: 'બાકરોલમાં શ્રેષ્ઠ અને શુદ્ધ મગફળી તેલનો અનુભવ કરો.',
    feature1Title: '૧૦૦% શુદ્ધ',
    feature1Desc: 'કોઈપણ પ્રકારની મિલાવટ વગર, ફક્ત શુદ્ધ મગફળીનું તેલ. અમે શુદ્ધતાની ગેરંટી આપીએ છીએ.',
    feature2Title: 'તમારી સામે પ્રક્રિયા',
    feature2Desc: 'અમારી સંપૂર્ણ પ્રક્રિયા પારદર્શક છે. તમે જાતે જ તેલ નીકળતા જોઈ શકો છો, જે તમને વિશ્વાસ આપે છે.',
    feature3Title: 'સ્વાસ્થ્યપ્રદ',
    feature3Desc: 'કોલ્ડ પ્રેસ થી કુદરતી વિટામિન્સ અને પોષક તત્વો જળવાઈ રહે છે, જે તમારા સ્વાસ્થ્ય માટે ઉત્તમ છે.',
    productTitle: 'અમારું ઉત્પાદન: શુદ્ધ સિંગતેલ',
    productSubtitle: '૧૫ કિલો શુદ્ધ મગફળી તેલનો ડબ્બો',
    productDesc: 'તમારા પરિવારના સ્વાસ્થ્ય માટે ઉત્તમ, તાજગી અને શુદ્ધતાથી ભરપૂર. રસોઈ માટે આદર્શ અને સ્વાદમાં ઉત્તમ મગફળીનું તેલ (સિંગતેલ).',
    productPrice: '₹ કિંમત માટે સંપર્ક કરો',
    orderNow: 'ઓર્ડર કરો',
    instagramTitle: 'અમને Instagram પર ફોલો કરો',
    instagramDesc: 'અમારી તાજી અપડેટ્સ, ગ્રાહક સમીક્ષાઓ અને વધુ માહિતી માટે અમને Instagram પર જોડાવો.',
    instagramCta: 'Instagram પર અમારી બધી પોસ્ટ્સ જોવા માટે ક્લિક કરો',
    instagramGridTitle: 'અમારા Instagram પર વધુ જુઓ',
    instagramGridDesc: 'શુદ્ધ સિંગતેલની પ્રક્રિયા અને ગ્રાહક અનુભવો',
    phone1: '+૯૧ ૯૩૨૭૧ ૭૭૭૯૦',
    phone2: '+૯૧ ૭૦૧૬૮ ૭૫૧૮૧',
    phone3: '+૯૧ ૯૭૨૫૯ ૨૨૩૨૩',
    contactTitle: 'અમારો સંપર્ક કરો',
    contactDesc: 'બાકરોલમાં શુદ્ધ મગફળીના તેલ (સિંગતેલ) વિશે વધુ માહિતી અથવા ઓર્ડર માટે, નીચે આપેલા સરનામે રૂબરૂ મુલાકાત લો અથવા ફોન કરો.',
    ourAddress: 'અમારું સરનામું',
    address1: 'શ્રીયમ હેરિટેજ ફ્લેટ્સ અને દુકાનો,',
    address2: 'બાકરોલ સર્કલ પાસે, સરદાર પટેલ રિંગ રોડ,',
    address3: 'વેજલપુર, બાકરોલ,',
    address4: 'અમદાવાદ, ગુજરાત ૩૮૨૨૧૦',
    viewOnMaps: 'ગૂગલ મેપ્સ પર જુઓ',
    phoneNumbers: 'ફોન નંબર',
    whatsappTitle: 'WhatsApp પર સંપર્ક કરો',
    whatsappDesc: 'ઝડપી જવાબ માટે WhatsApp પર મેસેજ કરો',
    whatsappCta: 'WhatsApp પર મેસેજ કરો',
    footerText: 'બાપા સીતારામ મીની ઓઈલ મીલ. સર્વાધિકાર સુરક્ષિત.',
    footerDesc: 'બાકરોલ, અમદાવાદમાં શુદ્ધ સિંગતેલ અને મગફળીના તેલ માટે તમારો વિશ્વાસપાત્ર સ્ત્રોત.',
  },
  en: {
    siteName: 'Bapa Sitaram Mini Oil Mill',
    tagline: 'Pure and Natural Groundnut Oil in Bakrol',
    contact: 'Contact Us',
    heroTitle1: 'Extracted Right Before Your Eyes,',
    heroTitle2: '100% Pure Groundnut Oil',
    heroDesc: 'At our Bakrol-based oil mill, we extract high-quality oil from your own pure peanuts and pack it in 5-liter tins.',
    learnMore: 'Learn More',
    processTitle: 'Our Oil Making Process',
    processDesc: 'Fresh groundnut oil in three simple steps of purity and transparency.',
    step1Title: '1. Bring Quality Peanuts',
    step1Desc: 'Bring your choice of high-quality peanuts.',
    step2Title: '2. Fresh Oil Extraction',
    step2Desc: 'Oil is extracted right before your eyes using our modern machinery.',
    step3Title: '3. Safe Packaging',
    step3Desc: 'Fresh oil is immediately packed in clean and safe 5-liter tins.',
    featuresTitle: 'Why Choose Our Groundnut Oil?',
    featuresDesc: 'Experience the best and purest groundnut oil in Bakrol.',
    feature1Title: '100% Pure',
    feature1Desc: 'No adulteration whatsoever, only pure groundnut oil. We guarantee purity.',
    feature2Title: 'Transparent Process',
    feature2Desc: 'Our entire process is transparent. You can watch the oil being extracted yourself, giving you complete confidence.',
    feature3Title: 'Healthy',
    feature3Desc: 'Cold-pressed to preserve natural vitamins and nutrients, excellent for your health.',
    productTitle: 'Our Product: Pure Groundnut Oil',
    productSubtitle: '15 kg Pure Groundnut Oil Tin',
    productDesc: 'Excellent for your family\'s health, full of freshness and purity. Ideal for cooking and excellent in taste.',
    productPrice: '₹ Contact for Price',
    orderNow: 'Order Now',
    instagramTitle: 'Follow Us on Instagram',
    instagramDesc: 'Join us on Instagram for our latest updates, customer reviews, and more information.',
    instagramCta: 'Click to view all our posts on Instagram',
    instagramGridTitle: 'View More on Our Instagram',
    instagramGridDesc: 'Pure oil process and customer experiences',
    phone1: '+91 93271 77790',
    phone2: '+91 70168 75181',
    phone3: '+91 97259 22323',
    contactTitle: 'Contact Us',
    contactDesc: 'For more information about pure groundnut oil in Bakrol or to place an order, visit us at the address below or call us.',
    ourAddress: 'Our Address',
    address1: 'Shriyam Heritage Flats and Shops,',
    address2: 'Near Bakrol Circle, Sardar Patel Ring Road,',
    address3: 'Vejalpur, Bakrol,',
    address4: 'Ahmedabad, Gujarat 382210',
    viewOnMaps: 'View on Google Maps',
    phoneNumbers: 'Phone Numbers',
    whatsappTitle: 'Contact on WhatsApp',
    whatsappDesc: 'Message us on WhatsApp for quick response',
    whatsappCta: 'Message on WhatsApp',
    footerText: 'Bapa Sitaram Mini Oil Mill. All Rights Reserved.',
    footerDesc: 'Your trusted source for pure groundnut oil in Bakrol, Ahmedabad.',
  },
  hi: {
    siteName: 'बापा सीताराम मिनी ऑयल मिल',
    tagline: 'बाकरोल में शुद्ध और सात्विक मूंगफली का तेल',
    contact: 'संपर्क करें',
    heroTitle1: 'आपकी आंखों के सामने निकाला गया,',
    heroTitle2: '100% शुद्ध मूंगफली का तेल',
    heroDesc: 'हमारी बाकरोल स्थित ऑयल मिल में, हम आपकी लाई गई शुद्ध मूंगफली से उच्च गुणवत्ता का तेल निकालते हैं और 5 लीटर के टिन में पैक करके देते हैं।',
    learnMore: 'और जानें',
    processTitle: 'तेल बनाने की हमारी प्रक्रिया',
    processDesc: 'शुद्धता और पारदर्शिता के तीन सरल चरणों में ताजा मूंगफली का तेल।',
    step1Title: '1. गुणवत्ता वाली मूंगफली लाएं',
    step1Desc: 'आप अपनी पसंद की उच्च गुणवत्ता वाली मूंगफली लाएं।',
    step2Title: '2. ताजा तेल निष्कर्षण',
    step2Desc: 'हमारी आधुनिक मशीन द्वारा आपकी नजर के सामने ही तेल निकाला जाता है।',
    step3Title: '3. सुरक्षित पैकिंग',
    step3Desc: 'ताजे तेल को तुरंत 5 लीटर के स्वच्छ और सुरक्षित टिन में पैक किया जाता है।',
    featuresTitle: 'हमारा मूंगफली का तेल क्यों चुनें?',
    featuresDesc: 'बाकरोल में सर्वश्रेष्ठ और शुद्ध मूंगफली तेल का अनुभव करें।',
    feature1Title: '100% शुद्ध',
    feature1Desc: 'किसी भी प्रकार की मिलावट के बिना, केवल शुद्ध मूंगफली का तेल। हम शुद्धता की गारंटी देते हैं।',
    feature2Title: 'आपके सामने प्रक्रिया',
    feature2Desc: 'हमारी संपूर्ण प्रक्रिया पारदर्शी है। आप खुद तेल निकलते हुए देख सकते हैं, जो आपको विश्वास देता है।',
    feature3Title: 'स्वास्थ्यवर्धक',
    feature3Desc: 'कोल्ड प्रेस से प्राकृतिक विटामिन और पोषक तत्व संरक्षित रहते हैं, जो आपके स्वास्थ्य के लिए उत्तम हैं।',
    productTitle: 'हमारा उत्पाद: शुद्ध मूंगफली का तेल',
    productSubtitle: '15 किलो शुद्ध मूंगफली तेल का टिन',
    productDesc: 'आपके परिवार के स्वास्थ्य के लिए उत्तम, ताजगी और शुद्धता से भरपूर। खाना पकाने के लिए आदर्श और स्वाद में उत्कृष्ट।',
    productPrice: '₹ कीमत के लिए संपर्क करें',
    orderNow: 'ऑर्डर करें',
    instagramTitle: 'Instagram पर हमें फॉलो करें',
    instagramDesc: 'हमारी ताजा अपडेट, ग्राहक समीक्षाओं और अधिक जानकारी के लिए Instagram पर हमसे जुड़ें।',
    instagramCta: 'Instagram पर हमारी सभी पोस्ट देखने के लिए क्लिक करें',
    instagramGridTitle: 'हमारे Instagram पर और देखें',
    instagramGridDesc: 'शुद्ध तेल की प्रक्रिया और ग्राहक अनुभव',
    phone1: '+91 93271 77790',
    phone2: '+91 70168 75181',
    phone3: '+91 97259 22323',
    contactTitle: 'हमसे संपर्क करें',
    contactDesc: 'बाकरोल में शुद्ध मूंगफली के तेल के बारे में अधिक जानकारी या ऑर्डर के लिए, नीचे दिए गए पते पर आएं या फोन करें।',
    ourAddress: 'हमारा पता',
    address1: 'श्रीयम हेरिटेज फ्लैट्स और दुकानें,',
    address2: 'बाकरोल सर्कल के पास, सरदार पटेल रिंग रोड,',
    address3: 'वेजलपुर, बाकरोल,',
    address4: 'अहमदाबाद, गुजरात 382210',
    viewOnMaps: 'Google Maps पर देखें',
    phoneNumbers: 'फोन नंबर',
    whatsappTitle: 'WhatsApp पर संपर्क करें',
    whatsappDesc: 'त्वरित उत्तर के लिए WhatsApp पर संदेश भेजें',
    whatsappCta: 'WhatsApp पर संदेश भेजें',
    footerText: 'बापा सीताराम मिनी ऑयल मिल। सर्वाधिकार सुरक्षित।',
    footerDesc: 'बाकरोल, अहमदाबाद में शुद्ध मूंगफली के तेल के लिए आपका विश्वसनीय स्रोत।',
  },
};

// Floating 3D Oil Drop Animation Component
const FloatingOilDrop = ({ delay = 0, duration = 3 }: { delay?: number; duration?: number }) => (
  <motion.div
    className="absolute w-16 h-20 rounded-full opacity-20"
    style={{
      background: 'radial-gradient(circle at 30% 30%, #fbbf24, #f59e0b, #d97706)',
      filter: 'blur(2px)',
    }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, -15, 0],
      scale: [1, 1.1, 0.9, 1],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
);

// 3D Peanut Icon with rotation
const PeanutIcon = () => (
  <motion.div
    whileHover={{ rotateY: 360, scale: 1.1 }}
    transition={{ duration: 0.6 }}
    className="perspective-1000"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-amber-500 drop-shadow-2xl" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.42,8.93c-1.32-2.3-4.03-3.4-6.43-2.39C7.22,7.2,6,9.45,6,12c0,3.31,2.69,6,6,6c1.6,0,3.05-0.63,4.12-1.66 C17.37,15.1,18,13.6,18,12c0-1.12-0.34-2.16-0.93-3.07C16.48,8,15.9,8.4,15.42,8.93z M12,16c-2.21,0-4-1.79-4-4s1.79-4,4-4 s4,1.79,4,4S14.21,16,12,16z"/>
      <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z"/>
    </svg>
  </motion.div>
);

// Animated Process Step Card
interface ProcessStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}
const ProcessStep: React.FC<ProcessStepProps> = ({ icon, title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -10, scale: 1.05 }}
      className="relative group perspective-1000"
    >
      <div className="relative overflow-hidden flex flex-col items-center text-center p-8 bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-2xl shadow-xl border border-amber-200/50 backdrop-blur-sm">
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.1), transparent)',
          }}
        />
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="mb-6 relative z-10"
        >
          {icon}
        </motion.div>
        
        <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent mb-3 relative z-10 leading-snug py-1">
          {title}
        </h3>
        <p className="text-sm md:text-base text-gray-700 leading-relaxed relative z-10">{description}</p>
        
        {/* Decorative corner elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-orange-400/20 to-transparent rounded-tr-full" />
      </div>
    </motion.div>
  );
};

// Enhanced Feature Card with 3D effect
interface FeatureCardProps {
  title: string;
  description: string;
  index: number;
}
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="relative group perspective-1000"
    >
      <div className="relative bg-gradient-to-br from-white via-emerald-50 to-teal-50 p-8 rounded-2xl shadow-2xl border border-emerald-200/50 overflow-hidden">
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
          }}
        />
        
        {/* Sparkle effect on hover */}
        <motion.div
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-6 h-6 text-amber-400" />
        </motion.div>

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
            className="inline-block mb-3"
          >
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </motion.div>
          
          <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4 leading-snug py-1">
            {title}
          </h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">{description}</p>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400" />
      </div>
    </motion.div>
  );
};

interface InstagramPost {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
}

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ['#fefce8', '#fef3c7', '#fef3c7', '#f3f4f6']
  );

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  const gmapsUrl = "https://www.google.com/maps/search/?api=1&query=SHRIYAM+HERITAGE+Baakrol+Badrabad+Ahmedabad+Gujarat";

  const [isMobile, setIsMobile] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [language, setLanguage] = useState<'gu' | 'en' | 'hi'>('gu');
  const [showLanguageModal, setShowLanguageModal] = useState(true);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);

  // Get translations for current language
  const t = translations[language];

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        // Fetch from our local proxy server which handles caching and token renewal
        const response = await fetch('/api/instagram');
        const data = await response.json();
        if (data.data) {
          setInstagramPosts(data.data);
        }
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      }
    };

    fetchInstagramPosts();
  }, []);

  useEffect(() => {
    // Check if language preference exists in localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage') as 'gu' | 'en' | 'hi';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    // Always show language modal on page load
    setShowLanguageModal(true);
  }, []);

  const selectLanguage = (lang: 'gu' | 'en' | 'hi') => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
    setShowLanguageModal(false);
  };

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const heroImage = isMobile ? EXTRA_IMG : HERO_BG;

  return (
    <motion.div 
      style={{ backgroundColor }}
      className="min-h-screen text-gray-800 overflow-hidden"
    >
      {/* Language Selection Modal */}
      <AnimatePresence>
        {showLanguageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-3xl shadow-2xl max-w-md w-full p-8 border-4 border-amber-200"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-center mb-6"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Droplets className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent mb-2 leading-relaxed py-2">
                  Select Language / ભાષા પસંદ કરો / भाषा चुनें
                </h2>
                <p className="text-gray-600 text-sm">Choose your preferred language</p>
              </motion.div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => selectLanguage('gu')}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-between group"
                >
                  <span className="text-lg">ગુજરાતી (Gujarati)</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => selectLanguage('en')}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-between group"
                >
                  <span className="text-lg">English</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => selectLanguage('hi')}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-between group"
                >
                  <span className="text-lg">हिंदी (Hindi)</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </div>

              <p className="text-center text-xs text-gray-500 mt-6">
                You can change the language anytime from settings
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Header with slide animation */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHeaderVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-amber-50 via-white to-amber-50 backdrop-blur-xl sticky top-0 z-50 shadow-lg border-b border-amber-200/50"
      >
        <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 text-center md:text-left"
          >
            <motion.img
              src="/bapa-sitaram-logo.svg"
              alt="બાપા સીતારામ મીની ઓઈલ મીલ લોગો"
              className="h-14 w-14 md:h-16 md:w-16"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 bg-clip-text text-transparent leading-relaxed py-1">
                {t.siteName}
              </h1>
              <p className="text-sm md:text-base text-amber-700 font-medium mt-2 leading-relaxed">{t.tagline}</p>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-3">
            <motion.a
              href="https://www.instagram.com/bapa_sitaram_oilmill"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow relative z-10"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </motion.a>

            <motion.a
              href="https://wa.me/919327177790"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow relative z-10"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </motion.a>
            
            <motion.a
              href="#contact"
              onClick={(e) => handleScrollClick(e, 'contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-lg group"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2 text-sm md:text-base">
                <Phone className="w-4 h-4" />
                {t.contact}
              </span>
            </motion.a>
          </div>
        </div>
      </motion.header>

      <main>
        {/* Hero Section with Parallax & 3D Elements */}
        <section
          aria-label="Hero - Home"
          className="relative w-full flex items-center justify-center text-white overflow-hidden"
          style={{ minHeight: '100vh' }}
        >
          {/* Parallax Background */}
          <motion.div
            style={{
              backgroundImage: `url('${heroImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              y: useTransform(scrollYProgress, [0, 0.5], [0, 200]),
            }}
            className="absolute inset-0"
          />
          
          {/* Animated Gradient Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-black/70 via-amber-900/50 to-black/70"
          />

          {/* Floating Oil Drops */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <FloatingOilDrop delay={0} duration={4} />
            <div className="absolute top-1/4 right-1/4">
              <FloatingOilDrop delay={1} duration={5} />
            </div>
            <div className="absolute bottom-1/3 left-1/4">
              <FloatingOilDrop delay={2} duration={4.5} />
            </div>
            <div className="absolute top-1/2 right-1/3">
              <FloatingOilDrop delay={1.5} duration={3.5} />
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-20 max-w-5xl px-4 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug mb-6 md:mb-8 py-2"
                style={{
                  textShadow: '4px 4px 20px rgba(0,0,0,0.9), 2px 2px 8px rgba(251,191,36,0.5)',
                }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="block mb-4 leading-snug"
                >
                  {t.heroTitle1}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="block bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent leading-snug py-1"
                >
                  {t.heroTitle2}
                </motion.span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 font-medium max-w-4xl mx-auto leading-relaxed px-4"
                style={{
                  textShadow: '2px 2px 12px rgba(0,0,0,0.95)',
                }}
              >
                {t.heroDesc}
              </motion.p>

              <motion.a
                href="#process"
                onClick={(e) => handleScrollClick(e, 'process')}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 font-bold py-3 px-10 rounded-full text-lg shadow-2xl border-2 border-amber-300 group relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-amber-400"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">{t.learnMore}</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white rounded-full"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Process Section with 3D Cards */}
        <section id="process" className="relative py-24 overflow-hidden">
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
            animate={{
              background: [
                'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fef3c7 100%)',
                'linear-gradient(135deg, #fed7aa 0%, #fef3c7 50%, #fed7aa 100%)',
                'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fef3c7 100%)',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-200/30 rounded-full blur-3xl" />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-block mb-4"
              >
                <Droplets className="w-16 h-16 text-amber-600 mx-auto" />
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 bg-clip-text text-transparent mb-4 leading-tight py-2">
                {t.processTitle}
              </h2>
              <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {t.processDesc}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <ProcessStep
                index={0}
                icon={<Sprout className="w-20 h-20 text-amber-500" />}
                title={t.step1Title}
                description={t.step1Desc}
              />
              <ProcessStep
                index={1}
                icon={<Droplets className="w-20 h-20 text-yellow-500" />}
                title={t.step2Title}
                description={t.step2Desc}
              />
              <ProcessStep
                index={2}
                icon={<Package className="w-20 h-20 text-green-600" />}
                title={t.step3Title}
                description={t.step3Desc}
              />
            </div>
          </div>
        </section>

        {/* Features Section with parallax */}
        <section id="features" className="relative py-24 overflow-hidden">
          {/* Parallax background image */}
          <motion.div
            style={{
              backgroundImage: "url('https://www.tastingtable.com/img/gallery/is-peanut-oil-actually-good-for-you/l-intro-1662658428.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              y: useTransform(scrollYProgress, [0.3, 0.7], [0, -100]),
            }}
            className="absolute inset-0"
          />

          {/* Glass morphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-emerald-50/60 to-teal-50/40 backdrop-blur-md" />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-4"
              >
                <Sparkles className="w-16 h-16 text-emerald-600 mx-auto" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-800 bg-clip-text text-transparent mb-4 leading-tight py-2">
                {t.featuresTitle}
              </h2>
              <p className="text-base md:text-lg text-gray-800 max-w-3xl mx-auto leading-relaxed font-medium">
                {t.featuresDesc}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              <FeatureCard
                index={0}
                title={t.feature1Title}
                description={t.feature1Desc}
              />
              <FeatureCard
                index={1}
                title={t.feature2Title}
                description={t.feature2Desc}
              />
              <FeatureCard
                index={2}
                title={t.feature3Title}
                description={t.feature3Desc}
              />
            </div>
          </div>
        </section>

        {/* Product Section with 3D tilt effect */}
        <section id="product" className="relative py-24 bg-gradient-to-br from-white via-amber-50 to-orange-50 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row items-center gap-16"
            >
              {/* Product Image with 3D effect */}
              <motion.div
                initial={{ opacity: 0, x: -100, rotateY: -30 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 perspective-1000"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />
                  <img
                    src={PRODUCT_TIN}
                    alt="બાપા સીતારામ શુદ્ધ મગફળીનું તેલ (સિંગતેલ) નો ૧૫ કિલોનો ડબ્બો"
                    className="relative rounded-3xl shadow-2xl w-full h-auto object-cover border-4 border-white"
                  />
                  
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rounded-3xl"
                    initial={{ x: '-100%', opacity: 0 }}
                    whileHover={{ x: '100%', opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 text-center lg:text-left"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="inline-block mb-6"
                >
                  <Package className="w-16 h-16 text-amber-600" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent mb-6 leading-snug py-1"
                >
                  {t.productTitle}
                </motion.h2>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-xl md:text-2xl font-semibold text-emerald-700 mb-6 leading-relaxed"
                >
                  {t.productSubtitle}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
                >
                  {t.productDesc}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="mb-10"
                >
                  <motion.p
                    whileHover={{ scale: 1.05 }}
                    className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent inline-block leading-tight py-2"
                  >
                    {t.productPrice}
                  </motion.p>
                </motion.div>

                <motion.a
                  href="#contact"
                  onClick={(e) => handleScrollClick(e, 'contact')}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 px-10 rounded-full text-lg shadow-2xl group relative overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">{t.orderNow}</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="relative z-10"
                  >
                    →
                  </motion.span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Instagram Section */}
        <section id="instagram" className="relative py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 overflow-hidden">
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
                'linear-gradient(135deg, #fd1d1d 0%, #fcb045 50%, #833ab4 100%)',
                'linear-gradient(135deg, #fcb045 0%, #833ab4 50%, #fd1d1d 100%)',
                'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          {/* Decorative elements */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <svg className="w-20 h-20 text-white mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight py-2">
                {t.instagramTitle}
              </h2>
              <p className="text-base md:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
                {t.instagramDesc}
              </p>

              <motion.a
                href="https://www.instagram.com/bapa_sitaram_oilmill"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold py-4 px-10 rounded-full text-lg shadow-2xl group relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 via-orange-500 to-purple-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                />
                <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="relative z-10">@bapa_sitaram_oilmill</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>

            {/* Instagram-style grid preview */}
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
              >
                <div className="text-center text-white mb-6">
                  <p className="text-lg font-semibold">{t.instagramGridTitle}</p>
                  <p className="text-sm text-gray-300 mt-2">{t.instagramGridDesc}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {(instagramPosts.length > 0 ? instagramPosts.slice(0, 6) : [1, 2, 3, 4, 5, 6]).map((item, index) => {
                    const isPost = typeof item === 'object';
                    const post = isPost ? (item as InstagramPost) : null;
                    
                    return (
                    <motion.a
                      key={isPost ? post.id : item}
                      href={isPost ? post.permalink : "https://www.instagram.com/bapa_sitaram_oilmill"}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="aspect-square bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden group relative"
                    >
                      {isPost ? (
                        <>
                          {post.media_type === 'VIDEO' ? (
                            <video
                              src={post.media_url}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          ) : (
                            <img
                              src={post.media_url}
                              alt={post.caption || 'Instagram Post'}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          )}
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                             <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                             </svg>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <svg className="w-12 h-12 text-white/50 group-hover:text-white/80 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </>
                      )}
                    </motion.a>
                  )})}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2 }}
                  className="text-center mt-8"
                >
                  <p className="text-white/80 text-sm">
                    {t.instagramCta}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section with enhanced design */}
        <section id="contact" className="relative py-24 overflow-hidden">
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 pointer-events-none"
            animate={{
              background: [
                'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
                'linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%)',
                'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          {/* Decorative lights */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

          <div className="container mx-auto px-6 text-white relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <Phone className="w-16 h-16 text-amber-400 mx-auto" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent mb-6 leading-tight py-2">
                {t.contactTitle}
              </h2>
              <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {t.contactDesc}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto items-start">
              {/* Address Card with Interactive Map */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-6 h-full"
              >
                {/* Address Info */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 shadow-2xl relative overflow-hidden group min-h-[280px] flex flex-col justify-between"
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(45deg, transparent, rgba(251, 191, 36, 0.1), transparent)',
                    }}
                  />

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="mb-4"
                  >
                    <MapPin className="w-12 h-12 text-amber-400" />
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-4 text-amber-300">{t.ourAddress}</h3>
                  <address className="not-italic text-sm md:text-base text-gray-300 leading-relaxed mb-6">
                    <p>{t.address1}</p>
                    <p>{t.address2}</p>
                    <p>{t.address3}</p>
                    <p>{t.address4}</p>
                  </address>
                  
                  <motion.a
                    href={gmapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-bold py-2 px-5 rounded-full text-sm md:text-base hover:shadow-lg transition-all relative z-10"
                  >
                    <MapPin className="w-5 h-5" />
                    {t.viewOnMaps}
                  </motion.a>
                </motion.div>

                {/* Interactive Google Map */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl p-4 rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden flex-grow flex items-stretch"
                >
                  <iframe
                    src="https://maps.google.com/maps?q=SHRIYAM+HERITAGE+Baakrol+Badrabad+Ahmedabad+Gujarat&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '12px', minHeight: '280px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="બાપા સીતારામ મીની ઓઈલ મીલ નું સ્થાન"
                    className="w-full"
                  />
                </motion.div>
              </motion.div>

              {/* Phone Numbers with WhatsApp */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-6 h-full"
              >
                {/* Phone Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 shadow-2xl relative overflow-hidden group min-h-[280px]"
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(45deg, transparent, rgba(16, 185, 129, 0.1), transparent)',
                    }}
                  />

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="mb-4"
                  >
                    <Phone className="w-12 h-12 text-emerald-400" />
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-6 text-emerald-300">{t.phoneNumbers}</h3>
                  
                  <div className="space-y-4">
                    {[
                      { tel: '+919327177790', display: t.phone1 },
                      { tel: '+917016875181', display: t.phone2 },
                      { tel: '+919725922323', display: t.phone3 }
                    ].map((phone, index) => (
                      <motion.a
                        key={phone.tel}
                        href={`tel:${phone.tel}`}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 text-gray-300 hover:text-amber-300 transition-colors text-base group/phone"
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="bg-emerald-600/20 p-2 rounded-full group-hover/phone:bg-emerald-600/40 transition-colors"
                        >
                          <Phone className="w-5 h-5 text-emerald-400" />
                        </motion.div>
                        <span className="font-medium">{phone.display}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* WhatsApp Quick Contact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-xl p-8 rounded-2xl border border-green-700/50 shadow-2xl flex-grow flex flex-col justify-center min-h-[280px]"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-block mb-4"
                    >
                      <svg className="w-16 h-16 text-green-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </motion.div>
                    <h4 className="text-lg font-semibold text-green-300 mb-3">{t.whatsappTitle}</h4>
                    <p className="text-gray-300 text-sm mb-4">{t.whatsappDesc}</p>
                    <motion.a
                      href="https://wa.me/919327177790"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      {t.whatsappCta}
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative bg-gradient-to-br from-gray-950 to-slate-900 text-white py-10 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base mb-2">
              &copy; {new Date().getFullYear()} {t.footerText}
            </p>
            <p className="text-gray-400 text-sm">
              {t.footerDesc}
            </p>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"
          />
        </div>
      </footer>
    </motion.div>
  );
};

export default App;
