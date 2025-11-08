import React from 'react';

// User-provided images as Base64 strings
const heroImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAHMA4ADASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAAECAwQFBgf/xABGEAABAwMCAwYDBQcDAgUEAwEBAAIRAwQhEjFBUQUTImFxgZEGMqGxFEJSYsHR8HLhByNTgpLxFVNiFjRzorLCJTRU0uL/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EACERAQEBAQACAwEBAQEBAAAAAAABEQIhMRJBUQMicWFx/9oADAMBAAIRAxEAPwD6hSoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQ-";
const productTinImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAHgAyADASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAAECAwQFBgf/xAA6EAACAgEDAgUDAgMGAgIBAwUBAgMRBBIhBTFBURNhcSIygZGhFEKxwdFSYnLwByPh8YIzNENTY4KS/9oADAMBAAIRAxEAPwD5/SoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQoGjQ-";

const PeanutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.42,8.93c-1.32-2.3-4.03-3.4-6.43-2.39C7.22,7.2,6,9.45,6,12c0,3.31,2.69,6,6,6c1.6,0,3.05-0.63,4.12-1.66 C17.37,15.1,18,13.6,18,12c0-1.12-0.34-2.16-0.93-3.07C16.48,8,15.9,8.4,15.42,8.93z M12,16c-2.21,0-4-1.79-4-4s1.79-4,4-4 s4,1.79,4,4S14.21,16,12,16z"/>
      <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z"/>
    </svg>
);


const OilDropIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10,3.5c-1.63,0-3.1,0.85-3.95,2.18L10,12.5l3.95-6.82C13.1,4.35,11.63,3.5,10,3.5z"/>
    <path d="M10,18.5c-4.69,0-8.5-3.81-8.5-8.5S5.31,1.5,10,1.5s8.5,3.81,8.5,8.5S14.69,18.5,10,18.5z M10,3.5 c-1.63,0-3.1,0.85-3.95,2.18L10,12.5l3.95-6.82C13.1,4.35,11.63,3.5,10,3.5z"/>
  </svg>
);

const PackageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-700" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.6,8.2l-9-6.9c-0.4-0.3-0.9-0.3-1.3,0l-9,6.9C2.1,8.4,2,8.7,2,9v6c0,0.3,0.1,0.6,0.4,0.8l9,6.9c0.2,0.1,0.4,0.2,0.6,0.2s0.4-0.1,0.6-0.2l9-6.9c0.3-0.2,0.4-0.5,0.4-0.8V9C22,8.7,21.9,8.4,21.6,8.2z M12,19.9L4.4,14.7V9.3L12,4.1l7.6,5.2v5.3L12,19.9z"/>
        <path d="M12.5,13.5h-1V10h1V13.5z M12,8.5c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S12.6,8.5,12,8.5z"/>
    </svg>
);


interface ProcessStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const ProcessStep: React.FC<ProcessStepProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-amber-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

interface FeatureCardProps {
  title: string;
  description: string;
}
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => (
  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-amber-200">
    <h3 className="text-2xl font-bold text-green-800 mb-3">{title}</h3>
    <p className="text-gray-700 leading-relaxed">{description}</p>
  </div>
);


const App: React.FC = () => {
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


  return (
    <div className="bg-yellow-50 min-h-screen text-gray-800">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">બાપા સીતારામ મીની ઓઈલ મીલ</h1>
            <p className="text-lg text-amber-800">બાકરોલમાં શુદ્ધ અને સાત્વિક સિંગતેલ</p>
          </div>
          <a 
            href="#contact"
            onClick={(e) => handleScrollClick(e, 'contact')}
            className="bg-green-700 text-white font-bold py-2 px-6 rounded-full hover:bg-green-800 transition-colors duration-300 self-center whitespace-nowrap"
          >
            સંપર્ક કરો
          </a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-white text-center px-4">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img src={heroImage} alt="બાપા સીતારામ ઓઈલ મીલ, બાકરોલ, અમદાવાદ - શુદ્ધ સિંગતેલ (મગફળીનું તેલ)" className="absolute inset-0 w-full h-full object-cover"/>
          <div className="relative z-20 max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
              તમારી આંખો સામે કાઢેલું, ૧૦૦% શુદ્ધ મગફળીનું તેલ
            </h2>
            <p className="text-lg md:text-xl mb-8" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
              અમારા બાકરોલ સ્થિત ઓઈલ મીલમાં, અમે તમારી લાવેલી શુદ્ધ મગફળીમાંથી ઉચ્ચ ગુણવત્તાનું તેલ કાઢી, ૫ લિટરના ડબ્બામાં પેક કરી આપીએ છીએ.
            </p>
            <a 
              href="#process"
              onClick={(e) => handleScrollClick(e, 'process')}
              className="bg-yellow-500 text-amber-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-400 transition-transform transform hover:scale-105 duration-300 inline-block"
            >
              વધુ જાણો
            </a>
          </div>
        </section>

        {/* Our Process Section */}
        <section id="process" className="py-20 bg-amber-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-amber-900">સિંગતેલ બનાવવાની અમારી પ્રક્રિયા</h2>
              <p className="text-lg text-gray-600 mt-2">શુદ્ધતા અને પારદર્શિતાના ત્રણ સરળ પગલાંમાં તાજું મગફળીનું તેલ.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              <ProcessStep 
                icon={<PeanutIcon />} 
                title="૧. શ્રેષ્ઠ મગફળી લાવો" 
                description="તમે તમારી પસંદગીની ઉચ્ચ ગુણવત્તાવાળી મગફળી લાવો." 
              />
              <ProcessStep 
                icon={<OilDropIcon />} 
                title="૨. તાજું તેલ નિષ્કર્ષણ" 
                description="અમારા આધુનિક મશીન દ્વારા તમારી નજર સામે જ તેલ કાઢવામાં આવે છે." 
              />
              <ProcessStep 
                icon={<PackageIcon />} 
                title="૩. સુરક્ષિત પેકિંગ" 
                description="તાજા તેલને તરત જ ૫ લિટરના સ્વચ્છ અને સુરક્ષિત ડબ્બામાં પેક કરવામાં આવે છે." 
              />
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="features" className="py-20" style={{backgroundImage: "url('https://www.tastingtable.com/img/gallery/is-peanut-oil-actually-good-for-you/l-intro-1662658428.jpg')", backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
          <div className="container mx-auto px-6 bg-white/30 backdrop-blur-lg py-16 rounded-xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900">શા માટે અમારું સિંગતેલ પસંદ કરો?</h2>
               <p className="text-lg text-gray-700 mt-2">બાકરોલમાં શ્રેષ્ઠ અને શુદ્ધ મગફળી તેલનો અનુભવ કરો.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                title="૧૦૦% શુદ્ધ" 
                description="કોઈપણ પ્રકારની મિલાવટ વગર, ફક્ત શુદ્ધ મગફળીનું તેલ. અમે શુદ્ધતાની ગેરંટી આપીએ છીએ." 
              />
              <FeatureCard 
                title="તમારી સામે પ્રક્રિયા" 
                description="અમારી સંપૂર્ણ પ્રક્રિયા પારદર્શક છે. તમે જાતે જ તેલ નીકળતા જોઈ શકો છો, જે તમને વિશ્વાસ આપે છે." 
              />
              <FeatureCard 
                title="સ્વાસ્થ્યપ્રદ" 
                description="કોલ્ડ પ્રેસ પદ્ધતિથી કુદરતી વિટામિન્સ અને પોષક તત્વો જળવાઈ રહે છે, જે તમારા સ્વાસ્થ્ય માટે ઉત્તમ છે." 
              />
            </div>
          </div>
        </section>

        {/* Product Section */}
        <section id="product" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <img src={productTinImage} alt="બાપા સીતારામ શુદ્ધ મગફળીનું તેલ (સિંગતેલ) નો ૧૫ કિલોનો ડબ્બો" className="rounded-xl shadow-2xl w-full h-auto object-cover"/>
              </div>
              <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-4xl font-bold text-amber-900 mb-4">અમારું ઉત્પાદન: શુદ્ધ સિંગતેલ</h2>
                <h3 className="text-3xl font-semibold text-green-800 mb-4">૧૫ કિલો શુદ્ધ મગફળી તેલનો ડબ્બો</h3>
                <p className="text-gray-600 text-lg mb-6">
                  તમારા પરિવારના સ્વાસ્થ્ય માટે ઉત્તમ, તાજગી અને શુદ્ધતાથી ભરપૂર. રસોઈ માટે આદર્શ અને સ્વાદમાં ઉત્તમ મગફળીનું તેલ (સિંગતેલ).
                </p>
                <p className="text-4xl font-bold text-amber-900 mb-8">
                  ₹ કિંમત માટે સંપર્ક કરો
                </p>
                <a 
                  href="#contact"
                  onClick={(e) => handleScrollClick(e, 'contact')}
                  className="bg-amber-800 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-amber-900 transition-colors duration-300 inline-block"
                >
                  ઓર્ડર કરો
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-800 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">અમારો સંપર્ક કરો</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
             બાકરોલમાં શુદ્ધ મગફળીના તેલ (સિંગતેલ) વિશે વધુ માહિતી અથવા ઓર્ડર માટે, નીચે આપેલા સરનામે રૂબરૂ મુલાકાત લો અથવા ફોન કરો.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">અમારું સરનામું</h3>
                <address className="not-italic">
                  <p className="text-gray-300 max-w-xs">શ્રીયમ હેરિટેજ ફ્લેટ્સ અને દુકાનો,<br/>બાકરોલ સર્કલ પાસે, સરદાર પટેલ રિંગ રોડ,<br/>વેજલપુર, બાકરોલ, અમદાવાદ, ગુજરાત ૩૮૨૨૧૦</p>
                  <a href={gmapsUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 mt-2 inline-block">ગૂગલ મેપ્સ પર જુઓ</a>
                </address>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">ફોન નંબર</h3>
                <a href="tel:+919327177990" className="text-gray-300 block hover:text-yellow-400">+૯૧ ૯૩૨૭૧ ૭૭૯૯૦</a>
                <a href="tel:+917016875181" className="text-gray-300 mt-1 block hover:text-yellow-400">+૯૧ ૭૦૧૬૮ ૭૫૧૮૧</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} બાપા સીતારામ મીની ઓઈલ મીલ. સર્વાધિકાર સુરક્ષિત.</p>
          <p className="text-sm text-gray-400 mt-2">બાકરોલ, અમદાવાદમાં શુદ્ધ સિંગતેલ અને મગફળીના તેલ માટે તમારો વિશ્વાસપાત્ર સ્ત્રોત.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;