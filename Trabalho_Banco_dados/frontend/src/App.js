import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ nome: '', descricao: '', preco: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/produtos/');
      setProdutos(res.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:8000/api/produtos/${editId}`, form);
      } else {
        await axios.post('http://localhost:8000/api/produtos/', form);
      }
      setForm({ nome: '', descricao: '', preco: '' });
      setEditId(null);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const handleEdit = (produto) => {
    setForm({
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
    });
    setEditId(produto.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/produtos/${id}`);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cadastro de Produtos</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
        />
        <input
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
        />
        <input
          name="preco"
          type="number"
          placeholder="Preço"
          value={form.preco}
          onChange={handleChange}
        />
        <button type="submit">{editId ? 'Atualizar' : 'Cadastrar'}</button>
      </form>
      <ul>
        {produtos.map((p) => (
          <li key={p.id}>
            {p.nome} - {p.descricao} - R$ {p.preco}
            <button onClick={() => handleEdit(p)}>Editar</button>
            <button onClick={() => handleDelete(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;