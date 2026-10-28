import React, { useState } from 'react';

export const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successAnimation, setSuccessAnimation] = useState(false);

  // Expected master credentials
  const VALID_EMAIL = 'edwin@zenve.in';
  const VALID_PASSWORD = 'edwin@123';

  const handleQuickAutofill = () => {
    setEmail(VALID_EMAIL);
    setPassword(VALID_PASSWORD);
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your work email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);

    // Simulate authentication against Spring Boot auth service
    setTimeout(() => {
      if (email.trim().toLowerCase() === VALID_EMAIL.toLowerCase() && password === VALID_PASSWORD) {
        setSuccessAnimation(true);
        setTimeout(() => {
          setIsLoading(false);
          const userData = {
            name: 'Edwin',
            email: VALID_EMAIL,
            initials: 'ED',
            role: 'INVESTOR_RELATIONS',
            status: 'online',
            availableRoles: [
              'SUPER_ADMIN',
              'EXECUTIVE',
              'INVESTOR_RELATIONS',
              'CRM_DIRECTOR',
              'OPS_MANAGER'
            ]
          };

          if (rememberMe) {
            localStorage.setItem('loop_user', JSON.stringify(userData));
          } else {
            sessionStorage.setItem('loop_user', JSON.stringify(userData));
          }

          if (onLoginSuccess) {
            onLoginSuccess(userData);
          }
        }, 500);
      } else {
        setIsLoading(false);
        setErrorMessage('Invalid credentials. Expected edwin@zenve.in with edwin@123');
      }
    }, 450);
  };

  return (
    <div
      className="w-full min-h-screen relative bg-[#03060E] text-[#E2E8F0] select-none font-sans bg-cover bg-center bg-no-repeat flex flex-col justify-center overflow-x-hidden"
      style={{ backgroundImage: `url('/login-bg.png')` }}
    >
      {/* ── AMBIENT CONTRAST GRADIENT ────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/50 via-black/20 to-black/40 pointer-events-none" />

      {/* ── RESPONSIVE MAIN CONTAINER WITH CONTROLLED PADDING ────────────────── */}
      <main className="relative z-10 w-full max-w-[1640px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 lg:py-10 flex-1 flex flex-col justify-center box-border">
        
        {/* Main Dual-Column Flex Container */}
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-12 xl:gap-16 my-auto">
          
          {/* ── LEFT HERO: BRANDING & HEADLINE (STAYS IN TOP-LEFT QUADRANT) ────── */}
          <div className="w-full lg:w-[50%] xl:w-[48%] flex flex-col justify-start items-start text-left">
            
            {/* 1. Brand Logo & Title */}
            <div className="space-y-1 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              <div className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl xl:text-[42px] font-black tracking-tight text-[#FBBF24]">
                  LOOP
                </span>
                <span className="bg-[#FBBF24] text-[#0A0D14] text-xs xl:text-sm font-black px-2 py-0.5 rounded-md tracking-wider">
                  OTT
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-white tracking-wide mt-1">
                Loop Nexus 360
              </h1>
              <p className="text-[10px] sm:text-[11px] xl:text-xs font-mono tracking-[0.25em] font-semibold text-[#8B98AD] uppercase">
                OPERATING SYSTEM &nbsp;•&nbsp; ENTERPRISE ACCESS
              </p>
            </div>

            {/* 2. Headline Slogan */}
            <div className="space-y-1 mt-7 sm:mt-9 lg:mt-11 xl:mt-12 drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[50px] 2xl:text-[56px] font-extrabold tracking-tight text-white leading-[1.14]">
                Your Content.
              </h2>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[50px] 2xl:text-[56px] font-extrabold tracking-tight text-[#FBBF24] leading-[1.14]">
                Our Platform.
              </h2>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[50px] 2xl:text-[56px] font-extrabold tracking-tight text-white leading-[1.14]">
                Infinite Possibilities.
              </h2>
            </div>

            {/* 3. Feature Badges (Movies, Series, Live TV, Exclusive) */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-7 xl:gap-8 mt-6 sm:mt-7 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
              {/* Movies */}
              <div className="flex items-center gap-2 text-xs sm:text-sm xl:text-base font-medium text-[#CBD5E1]">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#FBBF24] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <rect x="2" y="4" width="20" height="13" rx="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 20h8m-4-3v3" />
                </svg>
                <span>Movies</span>
              </div>

              {/* Series */}
              <div className="flex items-center gap-2 text-xs sm:text-sm xl:text-base font-medium text-[#CBD5E1]">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#FBBF24] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
                <span>Series</span>
              </div>

              {/* Live TV */}
              <div className="flex items-center gap-2 text-xs sm:text-sm xl:text-base font-medium text-[#CBD5E1]">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#FBBF24] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.828a5 5 0 010-7.072m7.072 0a5 5 0 010 7.072M12 12h.01" />
                </svg>
                <span>Live TV</span>
              </div>

              {/* Exclusive */}
              <div className="flex items-center gap-2 text-xs sm:text-sm xl:text-base font-medium text-[#CBD5E1]">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#FBBF24] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span>Exclusive</span>
              </div>
            </div>

          </div>

          {/* ── RIGHT LOGIN CARD: BALANCED PADDING (FIXES BOTTOM CUTOFF) ───────── */}
          <div className="w-full max-w-[430px] sm:max-w-[450px] lg:max-w-[430px] xl:max-w-[460px] flex-shrink-0 self-center my-auto">
            <div className="relative rounded-2xl bg-[#091222]/92 backdrop-blur-2xl border border-[#1A263D] shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_40px_rgba(20,38,70,0.35)] px-6 sm:px-8 pt-6 sm:pt-7 pb-6 sm:pb-7 transition-all box-border">
              
              {/* Card Brand Header */}
              <div className="flex flex-col items-center text-center pb-4 border-b border-[#1A263D]/60 mb-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-[#FBBF24]">
                    LOOP
                  </span>
                  <span className="bg-[#FBBF24] text-[#0A0D14] text-[9px] font-black px-1.5 py-0.5 rounded tracking-wider">
                    OTT
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                  Loop Nexus 360
                </h3>
                <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] font-medium text-[#7D8A9F] uppercase mt-0.5">
                  OPERATING SYSTEM &nbsp;•&nbsp; ENTERPRISE ACCESS
                </p>
              </div>

              {/* Card Section Title */}
              <div className="space-y-0.5 mb-3.5 text-left">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Login to Your Account
                </h2>
                <p className="text-xs text-[#8A98AF] leading-relaxed">
                  Access your enterprise portal and enjoy seamless content management.
                </p>
              </div>

              {/* Quick Demo Autofill Pill */}
              <div className="mb-3 px-3 py-1.5 rounded-lg bg-[#0E1B31] border border-[#1C3053] flex items-center justify-between">
                <div className="text-[11px] text-[#9FB3D0]">
                  Demo ID: <span className="text-[#FBBF24] font-mono font-medium">edwin@zenve.in</span>
                </div>
                <button
                  type="button"
                  onClick={handleQuickAutofill}
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FBBF24] hover:bg-[#F59E0B] text-black transition-colors cursor-pointer"
                >
                  Autofill
                </button>
              </div>

              {/* Error Notification */}
              {errorMessage && (
                <div className="mb-3 p-2.5 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in duration-150">
                  <span className="font-bold">✕</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Success Notification */}
              {successAnimation && (
                <div className="mb-3 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-700 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-150">
                  <span className="font-bold">✓</span>
                  <span>Credentials verified. Redirecting to workspace...</span>
                </div>
              )}

              {/* Form with Clean, Proportional Spacing */}
              <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                
                {/* Work Email Address */}
                <div>
                  <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B7D98]">
                      {/* Mail Envelope Icon */}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="Enter your work email"
                      className="w-full bg-[#0D182A] border border-[#1D2E49] focus:border-[#FBBF24] focus:ring-1 focus:ring-[#FBBF24]/30 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-[#5A6D88] outline-none transition-all duration-150 box-border"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-[#CBD5E1]">
                      Password
                    </label>
                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Please contact the Loop Nexus 360 Security Administrator for password reset.");
                      }}
                      className="text-xs text-[#FBBF24] hover:underline transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B7D98]">
                      {/* Lock Icon */}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <rect x="5" y="11" width="14" height="10" rx="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0v4" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="Enter your password"
                      className="w-full bg-[#0D182A] border border-[#1D2E49] focus:border-[#FBBF24] focus:ring-1 focus:ring-[#FBBF24]/30 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-[#5A6D88] outline-none transition-all duration-150 font-mono box-border"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6B7D98] hover:text-[#CBD5E1] transition-colors focus:outline-none cursor-pointer"
                      tabIndex={-1}
                    >
                      {/* Eye toggle icon */}
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me & Version */}
                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded bg-[#0D182A] border-[#1D2E49] text-[#FBBF24] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#FBBF24]"
                    />
                    <span className="text-xs text-[#CBD5E1]">Remember this device</span>
                  </label>

                  <span className="text-[10px] font-mono text-[#62738E]">
                    v1.0.4 – PROD
                  </span>
                </div>

                {/* Sign In Button */}
                <div className="pt-1.5">
                  <button
                    type="submit"
                    disabled={isLoading || successAnimation}
                    className="w-full py-3 px-4 rounded-xl bg-[#FBBF24] hover:bg-[#F59E0B] active:scale-[0.99] text-[#0A0E18] font-bold text-sm tracking-wide transition-all duration-150 shadow-[0_0_25px_rgba(251,191,36,0.35)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer box-border"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-[#0A0E18]" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <span>Sign In &nbsp;→</span>
                    )}
                  </button>
                </div>

              </form>

              {/* ── CARD FOOTER: BALANCED SPACING WITH DEFINITE BOTTOM PADDING ─── */}
              <div className="mt-4 pt-3.5 border-t border-[#15233A] text-center flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5 text-[#8A98AF] text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>End-to-End Encrypted Session</span>
                </div>
                <span className="text-[10px] text-[#55647A]">
                  Authorized Personnel Only • Loop Nexus 360 CRM
                </span>
              </div>

            </div>
          </div>

        </div>

      </main>

    </div>
  );
};

export default LoginPage;
