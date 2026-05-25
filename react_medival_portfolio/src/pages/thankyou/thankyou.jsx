import { Link } from "react-router-dom";
import { useSettings } from "../../lib/useSettings";

export default function ThankYou() {
  const { t } = useSettings();

  return (
    <main className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-16">
      <div className="parchment p-8 text-center max-w-2xl border-4 border-gold rounded-xl shadow-gold-glow relative">
        <h1 className="font-cinzel text-3xl md:text-4xl text-dark-brown mb-6 font-bold">
          {t('COMMON.thankyou.title')}
        </h1>
        <p className="font-body text-lg text-dark-brown leading-relaxed mb-8" style={{ whiteSpace: 'pre-line' }}>
          {t('COMMON.thankyou.body')}
        </p>
        <div className="flex justify-center items-center w-20 h-20 bg-[url('/src/styles/wax-stamp.png')] bg-contain bg-no-repeat bg-center mx-auto mb-8" aria-hidden="true">
          <span className="text-3xl">💌</span>
        </div>
        <Link
          to="/home"
          className="font-cinzel font-bold text-gold hover:text-gold-light transition-all text-lg hover:underline block"
        >
          {t('COMMON.thankyou.returnBtn')}
        </Link>
      </div>
    </main>
  );
}
