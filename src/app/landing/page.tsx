'use client'
import Link from 'next/link'
import { useState } from 'react'

const features = [
  { icon: '✦', title: 'Review Machine', desc: 'Artigos pilares de 8.500 palavras com estrutura SEO profunda, copy humana investigativa e cluster de 6 satélites', color: '#00F5A0', badge: 'Core Engine' },
  { icon: '⬟', title: 'Agentes IA', desc: '6 agentes em pipeline que pesquisam, analisam e entregam relatório executivo completo de qualquer nicho automaticamente', color: '#FF4D8D', badge: 'Automação' },
  { icon: '◆', title: 'Market Dashboard', desc: 'Inteligência competitiva: análise de mercado, scoring de oportunidades, benchmarking e tendências por nicho', color: '#FFD700', badge: 'Analytics' },
  { icon: '◈', title: 'Modelos Virtuais', desc: 'Buyer personas, avatares ICP, jornadas de compra e voz editorial — a identidade completa do seu site review', color: '#FF4D8D', badge: 'Criação' },
  { icon: '▶', title: 'Gerador de Copy IA', desc: 'Headlines de alto impacto, CTAs que convertem, sequências de email e meta tags otimizadas para o mercado brasileiro', color: '#00F5A0', badge: 'Copy' },
  { icon: '⬤', title: 'Gestão Afiliados', desc: 'Organize produtos, monitore links, gerencie plataformas e maximize comissões com controle total da operação', color: '#FF6B35', badge: 'Gestão' },
]

const stats = [
  { value: '8.500', label: 'Palavras por artigo pilar' },
  { value: '7', label: 'Artigos por cluster' },
  { value: '6', label: 'Agentes em pipeline' },
  { value: '<2s', label: 'Velocidade de resposta' },
]

const steps = [
  { n: '01', title: 'Configure o Groq', desc: 'Adicione sua chave gratuita do Groq (console.groq.com) no .env.local. Leva 2 minutos.' },
  { n: '02', title: 'Gere seu primeiro review', desc: 'Informe o produto, clique em Gerar. Em ~90 segundos, artigo pilar completo.' },
  { n: '03', title: 'Ative os Agentes IA', desc: 'Informe o nicho. 6 agentes pesquisam e entregam relatório executivo automático.' },
  { n: '04', title: 'Escale o conteúdo', desc: 'Cluster de 6 satélites + plano de publicação pronto para executar.' },
]

export default function LandingPage() {
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen" style={{ background: '#080810', color: '#E8E8F2' }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4" style={{ background: 'rgba(8,8,16,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1E1E30' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-black" style={{ background: 'linear-gradient(135deg, #7C6FFF, #00F5A0)' }}>S</div>
          <div>
            <span className="font-display font-bold text-sm">MONEYFACTORY</span>
            <span className="text-[10px] text-[#4B4B60] ml-2 font-mono">v2.0</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-sm text-[#6B7280] hover:text-white transition-colors">Funcionalidades</a>
          <a href="#how" className="text-sm text-[#6B7280] hover:text-white transition-colors">Como funciona</a>
          <Link href="/" className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
            style={{ background: 'linear-gradient(135deg, #7C6FFF, #00F5A0)', color: '#000' }}>
            Abrir App →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient grid-bg pt-32 pb-20 px-8 text-center relative overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 animate-float" style={{ background: '#7C6FFF' }} />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-8 animate-float" style={{ background: '#00F5A0', animationDelay: '2s' }} />
        <div className="absolute top-40 right-1/3 w-48 h-48 rounded-full blur-3xl opacity-6 animate-float" style={{ background: '#FF4D8D', animationDelay: '4s' }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 text-sm" style={{ borderColor: '#2A2A45', background: 'rgba(124,111,255,0.08)', color: '#7C6FFF' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5A0] animate-pulse" />
            Powered by Groq + LLaMA 3.3 70B
          </div>

          <h1 className="font-display text-6xl font-bold leading-tight mb-6">
            A plataforma que
            <br />
            <span className="shimmer-text">domina a SERP</span>
            <br />
            sem esforço manual
          </h1>

          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto mb-10 leading-relaxed">
            Crie sites review de autoridade com artigos de 8.500 palavras, clusters semânticos completos e análise de nicho automatizada — tudo em minutos, não semanas.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link href="/" className="px-8 py-4 rounded-2xl font-display font-bold text-lg transition-all glow-accent"
              style={{ background: 'linear-gradient(135deg, #7C6FFF, #00F5A0)', color: '#000' }}>
              ⚡ Começar Agora — Grátis
            </Link>
            <a href="#features" className="px-8 py-4 rounded-2xl font-display font-bold text-lg transition-all border border-[#2A2A45] hover:border-[#7C6FFF] text-white">
              Ver Funcionalidades
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex items-center justify-center gap-12 mt-16">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold gradient-text">{s.value}</div>
              <div className="text-xs text-[#4B4B60] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[10px] font-mono tracking-[0.3em] text-[#7C6FFF] mb-3">FUNCIONALIDADES</div>
            <h2 className="font-display text-4xl font-bold mb-4">9 módulos. Uma plataforma.</h2>
            <p className="text-[#6B7280] max-w-xl mx-auto">Tudo que você precisa para construir e escalar sites review de autoridade no mercado brasileiro.</p>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {features.map(f => (
              <div key={f.title} className="glass glass-hover rounded-2xl p-6" style={{ border: '1px solid #1E1E30' }}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[10px] font-mono px-2 py-1 rounded-full border tracking-widest"
                    style={{ color: f.color, borderColor: `${f.color}30`, background: `${f.color}10` }}>
                    {f.badge}
                  </span>
                  <span className="text-2xl" style={{ color: f.color }}>{f.icon}</span>
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-8" style={{ background: '#0A0A14' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[10px] font-mono tracking-[0.3em] text-[#00F5A0] mb-3">COMO FUNCIONA</div>
            <h2 className="font-display text-4xl font-bold">Em 4 passos, seu site pronto para ranquear</h2>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <div key={s.n} className="rounded-2xl p-6 animate-fade-in-up" style={{ background: '#13131F', border: '1px solid #1E1E30', animationDelay: `${i * 0.1}s` }}>
                <div className="font-mono text-2xl font-bold mb-3" style={{ color: ['#7C6FFF', '#00F5A0', '#FF4D8D', '#FFD700'][i] }}>{s.n}</div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-8 hero-gradient text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-4xl font-bold mb-4">
            Pronto para dominar a SERP?
          </h2>
          <p className="text-[#6B7280] mb-8 text-lg">
            Instale localmente, conecte o Groq (grátis) e comece a gerar conteúdo de autoridade em minutos.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-display font-bold text-lg transition-all glow-accent"
            style={{ background: 'linear-gradient(135deg, #7C6FFF, #00F5A0)', color: '#000' }}>
            ⚡ Abrir MoneyFactory →
          </Link>
          <p className="text-xs text-[#3A3A55] mt-4">100% local · Seus dados ficam com você · Groq API gratuita</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-[#1E1E30] text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-black" style={{ background: 'linear-gradient(135deg, #7C6FFF, #00F5A0)' }}>S</div>
          <span className="font-display font-bold text-sm">MONEYFACTORY</span>
          <span className="text-xs text-[#3A3A55] font-mono">v2.0</span>
        </div>
        <p className="text-xs text-[#3A3A55]">Review Machine · Agentes IA · Market Intelligence</p>
      </footer>
    </div>
  )
}
