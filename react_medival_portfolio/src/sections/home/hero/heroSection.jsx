import CSection from "../../../templates/Section";

export default function HeroSection() {
    return (
        <CSection id="hero" classname="flex flex-col items-center justify-center min-h-screen">
            <h1 className="hero-title text-5xl text-center mb-10 text-shadow-2xs text-shadow-slate-100 animate-title-float" >
                Mouad the Coder
            </h1>
            <div className="crystal-ball" />
            <p className="hero-subtitle animate-fadeinout-float mb-2 text-lg text-center text-shadow-2xs text-shadow-slate-100">
                Ask the Oracle anything about Mouad
            </p>
        </CSection>
    )
}