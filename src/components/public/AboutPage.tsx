import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BROOKS_LOGO_SRC } from '../../assets/logo';
import { 
  ShieldCheck, 
  BookOpen, 
  Church, 
  Globe, 
  Award, 
  CheckCircle, 
  ChevronRight,
  Flame,
  Heart
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { settings, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'faith' | 'mission' | 'chancellor' | 'integrity'>('faith');

  const doctrinalArticles = [
    {
      title: '1. The Infallible Scriptures (Sola Scriptura)',
      content: 'We believe that the Holy Bible, consisting of the 66 canonical books of the Old and New Testaments, is the verbally inspired Word of God, inerrant in the original autographs, and the supreme, final authority in all matters of Christian faith, doctrine, and conduct (2 Timothy 3:16-17; 2 Peter 1:20-21).'
    },
    {
      title: '2. The Eternal Triune God (The Holy Trinity)',
      content: 'We believe in one Living, True, and Eternal God, Creator of heaven and earth, who eternally exists in three co-equal and co-substantial Persons: the Father, the Son, and the Holy Spirit, possessing identical divine nature, power, and glory (Deuteronomy 6:4; Matthew 28:19; 2 Corinthians 13:14).'
    },
    {
      title: '3. The Lord Jesus Christ (Hypostatic Union & Atonement)',
      content: 'We believe in the absolute deity of the Lord Jesus Christ, His virgin birth, His sinless humanity, His miracles, His vicarious and substitutionary death on the cross, His bodily resurrection, His ascension to the right hand of the Father, and His personal, visible, premillennial return in glory (John 1:1, 14; 1 Corinthians 15:3-4; Titus 2:13).'
    },
    {
      title: '4. The Holy Spirit & Divine Empowerment',
      content: 'We believe in the personality and deity of the Holy Spirit, who regenerates the sinner, indwells the believer at conversion, sanctifies the saints, and empowers the church with spiritual gifts for supernatural ministry, holy living, and global evangelization (Acts 1:8; Romans 8:9; 1 Corinthians 12:4-11).'
    },
    {
      title: '5. The Total Depravity & Need for Regeneration',
      content: 'We believe that humanity was created in the image of God but fell into sin through Adam’s disobedience, incurring spiritual and physical death. In our natural condition, all humans are spiritually dead in trespasses and unable to save themselves apart from the sovereign grace of God (Genesis 1:26-27; Romans 3:10-23; Ephesians 2:1-3).'
    },
    {
      title: '6. Salvation by Grace Alone Through Faith Alone (Sola Gratia, Sola Fide)',
      content: 'We believe that justification before God is an act of free grace received solely through faith in the finished work of Jesus Christ on the cross, apart from any human merits or works. Those justified are regenerated, adopted into God’s family, and sealed by the Holy Spirit (Romans 5:1; Ephesians 2:8-9; Titus 3:5).'
    },
    {
      title: '7. The Church: Body of Christ & Kingdom Mission',
      content: 'We believe that the universal Church is the spiritual body and bride of Christ, composed of all regenerated believers. The local church is God’s primary vehicle on earth for biblical exposition, worship, discipleship, administering the ordinances of Water Baptism and the Lord’s Supper, and fulfilling the Great Commission (Matthew 28:18-20; Ephesians 1:22-23; 1 Corinthians 11:23-26).'
    },
    {
      title: '8. Christian Holiness & Ethical Conduct',
      content: 'We believe that believers are called to live holy, consecrated lives separated from worldly ungodliness, bearing the fruit of the Spirit, maintaining marital purity, and practicing sacrificial love, justice, and compassion (Galatians 5:22-23; 1 Thessalonians 4:3-7; Hebrews 12:14).'
    },
    {
      title: '9. The Resurrection & Eternal Destiny',
      content: 'We believe in the bodily resurrection of both the saved and the lost—the redeemed unto eternal life and joy in the presence of God, and the unregenerate unto eternal conscious punishment and separation from God in hell (Matthew 25:46; John 5:28-29; Revelation 20:11-15).'
    },
    {
      title: '10. The Great Commission & Global Harvest',
      content: 'We believe that the supreme duty of every Christian and theological institution is to proclaim the unsearchable riches of Christ to every nation, tribe, tongue, and people, planting biblically faithful churches until the Lord returns (Matthew 24:14; Mark 16:15; Revelation 7:9).'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-black/80 border-2 border-amber-400/60 p-1 shadow-2xl shrink-0">
          <img
            src={BROOKS_LOGO_SRC}
            alt="Brooks of Life Schools of Ministry -UK- Crest"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="space-y-3 relative z-10 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Institutional Identity & Doctrine • UK
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white">
            Brooks of Life Schools of Ministry -UK-
          </h1>
          <p className="font-scripture text-xl text-amber-200/90 italic">
            “Equipping • Empowering • Enriching” — 2 Timothy 2:2
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 max-w-2xl">
            Brooks of Life Schools of Ministry -UK- (BLSM) was birthed to raise an army of biblically literate, doctrinally sound, and Spirit-anointed leaders to shepherd congregations, plant vibrant churches, and evangelize nations.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto space-x-4 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('faith')}
          className={`pb-3 px-2 border-b-2 transition whitespace-nowrap cursor-pointer ${activeTab === 'faith' ? 'border-amber-600 text-amber-700 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Statement of Faith (10 Articles)
        </button>
        <button
          onClick={() => setActiveTab('mission')}
          className={`pb-3 px-2 border-b-2 transition whitespace-nowrap cursor-pointer ${activeTab === 'mission' ? 'border-amber-600 text-amber-700 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Mission, Vision & Heritage
        </button>
        <button
          onClick={() => setActiveTab('chancellor')}
          className={`pb-3 px-2 border-b-2 transition whitespace-nowrap cursor-pointer ${activeTab === 'chancellor' ? 'border-amber-600 text-amber-700 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Chancellor's Welcome
        </button>
        <button
          onClick={() => setActiveTab('integrity')}
          className={`pb-3 px-2 border-b-2 transition whitespace-nowrap cursor-pointer ${activeTab === 'integrity' ? 'border-amber-600 text-amber-700 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Academic Integrity & Accreditation
        </button>
      </div>

      {/* TAB CONTENT: Statement of Faith */}
      {activeTab === 'faith' && (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="font-cinzel text-lg font-bold text-amber-900 mb-1">
              Historic Theological Foundations
            </h3>
            <p className="text-xs text-amber-800 leading-relaxed">
              Every faculty member, administrator, and graduating student affirms our Ten Doctrinal Articles. We stand firmly in the stream of historic Christian orthodoxy, classical Reformation truth, and the ongoing power of the Holy Spirit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctrinalArticles.map((article, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
                <h4 className="font-cinzel text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                  {article.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {article.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Mission & Vision */}
      {activeTab === 'mission' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-slate-900">Our Sacred Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To provide rigorous, accessible, and biblically faithful theological education and ministry formation to pastors, church planters, missionaries, chaplains, and Christian workers worldwide, empowering them to preach Christ with power, shepherd congregations with integrity, and transform societies.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-slate-900">Our Institutional Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To be a global benchmark digital seminary known for producing theological scholars with pastoral hearts, burning revival fire, ethical excellence, and unyielding fidelity to Sacred Scripture until the Lord Jesus Christ returns.
            </p>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Chancellor Message */}
      {activeTab === 'chancellor' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
              alt="Rev. Dr. Emmanuel O. Brooks"
              className="w-32 h-32 rounded-2xl object-cover border-4 border-amber-400 shadow-md shrink-0"
            />
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-cinzel text-2xl font-bold text-slate-900">
                {settings.president}
              </h3>
              <p className="text-xs text-amber-700 font-semibold uppercase tracking-wider">
                Founder, President & Chancellor
              </p>
              <p className="text-xs text-slate-500">
                Brooks of Life Ministries International
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
            <p>
              “Grace and peace be multiplied to you in the precious Name of our Lord Jesus Christ. When God gave us the mandate for Brooks of Life School of Ministry, it was born out of a deep burden: too many ministers enter the pulpit with zeal but without deep theological foundation, while others attend academic institutions that quench the fire of the Holy Spirit.”
            </p>
            <p>
              “At BLSM, we refuse this false dichotomy. We believe that true theological education inflames the heart to love God more deeply while sharpening the mind to rightly divide the Word of Truth. Whether you are an ordained pastor seeking a Master’s degree or a faithful Sunday school teacher earning your first Certificate in Biblical Studies, our global digital campus is prepared to walk with you.”
            </p>
            <p className="font-scripture text-base italic font-semibold text-slate-900 pt-2">
              Yours in Kingdom Service,<br />
              Rev. Dr. Emmanuel O. Brooks
            </p>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Integrity & Accreditation */}
      {activeTab === 'integrity' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-8 h-8 text-amber-600 shrink-0" />
            <div>
              <h3 className="font-cinzel text-xl font-bold text-slate-900">
                Academic Integrity & Accreditation Standards
              </h3>
              <p className="text-xs text-slate-500">
                Commitment to truth, honor, and transparent academic recognition
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Academic Integrity Policy:</strong> All students at Brooks of Life School of Ministry are expected to uphold the highest standards of Christian honesty. Plagiarism, unauthorized collaboration during TEMS proctored examinations, and false credential representation are grounds for immediate disciplinary review.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Ecclesiastical & Institutional Status</h4>
              <p className="text-xs text-slate-600">
                {settings.accreditationNote}
              </p>
              <p className="text-xs text-slate-600">
                Our programs are specifically designed to meet the rigorous theological and practical requirements for ecclesiastical ordination, missionary appointment, and church ministry deployment across global denominational bodies.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
