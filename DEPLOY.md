# MoneyFactory v2.0 — Guia de Deploy na Vercel

## Pré-requisitos
- Conta no [GitHub](https://github.com) (gratuita)
- Conta na [Vercel](https://vercel.com) (gratuita)
- Chave do [Groq](https://console.groq.com) (gratuita)

---

## Passo 1 — Subir o código no GitHub

1. Crie um repositório **privado** no GitHub chamado `moneyfactory`
2. Na pasta do projeto, rode:

```bash
git init
git add .
git commit -m "MoneyFactory v2.0"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/moneyfactory.git
git push -u origin main
```

---

## Passo 2 — Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) → **Add New Project**
2. Conecte o GitHub e selecione o repositório `moneyfactory`
3. Vercel detecta Next.js automaticamente — clique **Deploy**

---

## Passo 3 — Configurar variáveis de ambiente na Vercel

No painel do projeto: **Settings → Environment Variables**

Adicione as 4 variáveis:

| Nome | Valor |
|------|-------|
| `GROQ_API_KEY` | sua chave `gsk_...` do Groq |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` |
| `AUTH_PASSWORD` | a senha que você vai digitar no login |
| `AUTH_SECRET` | string aleatória longa (gere em generate-secret.vercel.app/32) |

4. Clique **Save** e depois **Redeploy**

---

## Passo 4 — Acessar

Sua URL será algo como:
```
https://moneyfactory-abc123.vercel.app
```

Acesse, digite sua senha e pronto — online de qualquer lugar, 24/7.

---

## Segurança

- O repositório é **privado** → ninguém vê seu código
- As variáveis de ambiente ficam **só na Vercel** → nunca no GitHub
- O cookie de auth dura **30 dias** → não precisa logar toda vez
- Acesso bloqueado para qualquer URL sem o cookie válido

---

## Atualizar o projeto

Para fazer alterações futuras:
```bash
git add .
git commit -m "descrição da mudança"
git push
```
A Vercel faz o deploy automaticamente em ~1 minuto.

---

## Solução de problemas

**Erro 500 no login:** Verifique se `AUTH_PASSWORD` e `AUTH_SECRET` estão configurados na Vercel.

**Erro 403 no Groq:** A Vercel usa servidores nos EUA/Europa — o Groq funciona normalmente a partir deles (sem o bloqueio de rede local que você teve).

**Timeout nas APIs:** O plano gratuito da Vercel tem limite de 10s por função. Para o artigo pilar (3 partes), pode ser necessário o plano Pro ($20/mês) ou usar a Edge Runtime. Me avise se acontecer.
