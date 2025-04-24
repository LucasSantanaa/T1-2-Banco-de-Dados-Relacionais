# T1-2-Banco-de-Dados-Relacionais
Trabalho 2 de banco de dados relacionados


## 🧠 Banco de Dados (MySQL)

1. Execute o script `sistema_produtos.sql` no seu MySQL para criar o banco:
```sql
-- Crie o banco:
CREATE DATABASE sistema_produtos;

-- Use o banco:
USE sistema_produtos;

-- Execute o conteúdo do arquivo sistema_produtos.sql
```

2. No arquivo `backend/database.py`, edite com seu usuário e senha do MySQL:
```python
SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://usuario:senha@localhost:3306/sistema_produtos"
```

---

## 🛠 Backend (FastAPI)

### Instalar dependências:
```bash
cd backend
pip install fastapi uvicorn mysql-connector-python sqlalchemy
```

### Rodar servidor:
```bash
uvicorn main:app --reload
```

📄 Documentação da API:  
👉 [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🌐 Frontend (React)

### Instalar dependências:
```bash
cd frontend
npm install
```

### Iniciar aplicação:
```bash
npm start
```

🌍 Acesse no navegador:  
👉 [http://localhost:3000](http://localhost:3000)


