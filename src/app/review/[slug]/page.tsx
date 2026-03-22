import { Metadata } from 'next'
import Link from 'next/link'

interface Props {
  params: { slug: string }
  searchParams: { [key: string]: string }
}

export function generateMetadata({ params }: Props): Metadata {
  const name = params.slug.replace(/-/g, ' ')
  return {
    title: `Review ${name} | MoneyFactory Review Machine`,
    description: `Review completo e honesto de ${name}. Prós, contras, experiência real e onde comprar.`,
  }
}

export default function ReviewSlugPage({ params }: Props) {
  const productName = params.slug.replace(/-/g, ' ')
  
  return (
    <div className="min-h-screen bg-[#0A0A0F] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/review" className="text-sm text-[#6C63FF] hover:text-[#00F5A0] transition-colors">
            ← Review Machine
          </Link>
        </div>
        
        <div className="glass rounded-2xl p-8 border border-[#2A2A3E]">
          <div className="text-[10px] font-mono text-[#6C63FF] tracking-widest mb-2">
            REVIEW GERADO
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-4">
            {productName}
          </h1>
          <p className="text-[#9B9BB0] mb-6">
            Esta página renderiza reviews gerados pela Review Machine. 
            Para gerar conteúdo, use a ferramenta e copie o texto para seu CMS.
          </p>
          <Link 
            href="/review"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6C63FF] to-[#00F5A0] text-black px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all"
          >
            ✦ Ir para Review Machine →
          </Link>
        </div>
      </div>
    </div>
  )
}
