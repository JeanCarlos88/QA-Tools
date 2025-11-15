import React from 'react';

// Recebe o estado atual do tema e a função para alterá-lo
function ThemeToggle({ theme, toggleTheme }) {
  
  // Define se o switch deve estar 'checado' (marcado)
  // No seu setup, 'dark' é o estado que queremos que o checkbox represente.
  const isChecked = theme === 'light';

  return (
    // O Label envolve todo o switch para torná-lo clicável em qualquer ponto
    <label className="relative inline-flex items-center cursor-pointer">
      
      {/* 1. INPUT (O CONTROLE DE ESTADO) */}
      <input 
        className="sr-only peer" 
        type="checkbox" 
        checked={isChecked} // 🟢 LIGAÇÃO REACT: O estado global controla o visual
        onChange={toggleTheme} // 🟢 LIGAÇÃO REACT: O clique chama a função para mudar o estado
      />
      
      <div
        className="
          w-12 h-6 rounded-full 
          bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 
          
          /* Estado Ativo (Checked) */
          peer-checked:from-yellow-400 peer-checked:to-orange-500 
          
          /* ESTILIZAÇÃO DO ÍCONE (O CÍRCULO QUE SE MOVE) */
          after:content-['🌙'] after:absolute after:top-0 after:left-0 
          after:bg-white after:rounded-full after:h-6 after:w-6 
          after:flex after:items-center after:justify-center 
          after:transition-all after:duration-500 after:shadow-lg after:text-lg after:text-gray-900 
          
          /* MUDANÇA NO ÍCONE QUANDO ATIVO */
          peer-checked:after:translate-x-6
          peer-checked:after:content-['☀️']
        "
      ></div>
          
    </label>
  );
}

export default ThemeToggle;