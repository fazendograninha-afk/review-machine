# 🚀 Deploy no Railway — Passo a Passo

## 1. Subir código no GitHub

Abra o terminal em `G:\IA\review-machine` e rode:

```bash
git init
git add .
git commit -m "Review Machine By MaicknucleaR"
git branch -M main
```

Crie um repositório **PRIVADO** em github.com chamado `review-machine` e rode:

```bash
git remote add origin https://github.com/SEU_USUARIO/review-machine.git
git push -u origin main
```

---

## 2. Deploy no Railway

1. Acesse **railway.app** → New Project
2. Clique **Deploy from GitHub repo**
3. Selecione o repositório `review-machine`
4. Railway detecta Next.js automaticamente → clique **Deploy**

---

## 3. Variáveis de Ambiente no Railway

No painel do projeto → **Variables** → adicione:

| Nome | Valor |
|------|-------|
| `GROQ_API_KEY` | sua chave gsk_... |
| `GROQ_MODEL` | llama-3.3-70b-versatile |
| `AUTH_PASSWORD` | eusoumultimilionario |
| `AUTH_SECRET` | rm2025xk92jdla83nqpzm74rvbh01oeic65wst |
| `NODE_ENV` | production |

Após salvar → Railway faz redeploy automático.

---

## 4. Domínio

Railway gera uma URL automática tipo:
```
https://review-machine-production-xxxx.up.railway.app
```

Para domínio customizado: Settings → Networking → Custom Domain.

---

## 5. Pronto ✓

Acesse a URL, faça login com a senha e use de qualquer lugar.

**Custo:** ~$5/mês no plano Hobby do Railway.
