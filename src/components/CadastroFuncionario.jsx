import { useState } from 'react';
import { supabase } from '../supabaseClient';

function CadastroFuncionario() {
  const [formFuncionario, setFormFuncionario] = useState({
    nome: '',
    senha: '',
    tipo: 'funcionario'
  });

  const cadastrarFuncionario = async e => {
    e.preventDefault();
    const { error } = await supabase.from('funcionarios').insert([formFuncionario]);
    if (error) {
      alert('Erro ao cadastrar funcionário: ' + error.message);
    } else {
      alert('Funcionário criado com sucesso!');
      setFormFuncionario({ nome: '', senha: '', tipo: 'funcionario' });
    }
  };

  return (
    <div className="login-box">
      <h2 className="login-title">Cadastro de Funcionário</h2>
      <form className="login-form" onSubmit={cadastrarFuncionario}>
        <input
          placeholder="Nome"
          value={formFuncionario.nome}
          onChange={e => setFormFuncionario({ ...formFuncionario, nome: e.target.value })}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Senha"
          value={formFuncionario.senha}
          onChange={e => setFormFuncionario({ ...formFuncionario, senha: e.target.value })}
          className="input-field"
        />
        <select
          value={formFuncionario.tipo}
          onChange={e => setFormFuncionario({ ...formFuncionario, tipo: e.target.value })}
          className="input-field"
        >
          <option value="funcionario">Funcionário</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="login-button">Criar Funcionário</button>
      </form>
    </div>
  );
}

export default CadastroFuncionario;