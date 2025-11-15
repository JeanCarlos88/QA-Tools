import { useState, useEffect } from 'react';
import Card from '../components/Common/Card';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';
import Alert from '../components/Common/Alert';
import { STORAGE_KEYS } from '../constants';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { generateSafeId } from '../utils/security';

const TestChecklist = () => {
  const [checklists, setChecklists] = useState([]);
  const [activeChecklist, setActiveChecklist] = useState(null);
  const [newChecklistName, setNewChecklistName] = useState('');
  const [newItemText, setNewItemText] = useState('');
  const [showNewChecklistForm, setShowNewChecklistForm] = useState(false);
  const [alert, setAlert] = useState(null);

  // Load checklists from localStorage on mount
  useEffect(() => {
    const saved = getStorageItem(STORAGE_KEYS.CHECKLISTS, []);
    setChecklists(saved);
    if (saved.length > 0) {
      setActiveChecklist(saved[0].id);
    }
  }, []);

  // Save checklists to localStorage whenever they change
  useEffect(() => {
    if (checklists.length > 0) {
      setStorageItem(STORAGE_KEYS.CHECKLISTS, checklists);
    }
  }, [checklists]);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleCreateChecklist = () => {
    if (!newChecklistName.trim()) {
      showAlert('Por favor, insira um nome para o checklist', 'error');
      return;
    }

    const newChecklist = {
      id: generateSafeId('checklist'),
      name: newChecklistName,
      createdAt: new Date().toISOString(),
      items: []
    };

    setChecklists([...checklists, newChecklist]);
    setActiveChecklist(newChecklist.id);
    setNewChecklistName('');
    setShowNewChecklistForm(false);
    showAlert('Checklist criado com sucesso!');
  };

  const handleDeleteChecklist = (id) => {
    if (!confirm('Tem certeza que deseja excluir este checklist?')) return;

    const updated = checklists.filter(c => c.id !== id);
    setChecklists(updated);
    
    if (activeChecklist === id) {
      setActiveChecklist(updated.length > 0 ? updated[0].id : null);
    }

    showAlert('Checklist excluído com sucesso!');
  };

  const handleAddItem = () => {
    if (!newItemText.trim()) {
      showAlert('Por favor, insira o texto do item', 'error');
      return;
    }

    const updated = checklists.map(checklist => {
      if (checklist.id === activeChecklist) {
        return {
          ...checklist,
          items: [
            ...checklist.items,
            {
              id: generateSafeId('item'),
              text: newItemText,
              completed: false,
              createdAt: new Date().toISOString()
            }
          ]
        };
      }
      return checklist;
    });

    setChecklists(updated);
    setNewItemText('');
    showAlert('Item adicionado com sucesso!');
  };

  const handleToggleItem = (itemId) => {
    const updated = checklists.map(checklist => {
      if (checklist.id === activeChecklist) {
        return {
          ...checklist,
          items: checklist.items.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          )
        };
      }
      return checklist;
    });

    setChecklists(updated);
  };

  const handleDeleteItem = (itemId) => {
    const updated = checklists.map(checklist => {
      if (checklist.id === activeChecklist) {
        return {
          ...checklist,
          items: checklist.items.filter(item => item.id !== itemId)
        };
      }
      return checklist;
    });

    setChecklists(updated);
    showAlert('Item removido com sucesso!');
  };

  const handleExportChecklist = () => {
    const checklist = checklists.find(c => c.id === activeChecklist);
    if (!checklist) return;

    const exportData = JSON.stringify(checklist, null, 2);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${checklist.name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showAlert('Checklist exportado com sucesso!');
  };

  const getActiveChecklist = () => {
    return checklists.find(c => c.id === activeChecklist);
  };

  const activeChecklistData = getActiveChecklist();
  const completedCount = activeChecklistData?.items.filter(i => i.completed).length || 0;
  const totalCount = activeChecklistData?.items.length || 0;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-100 mb-2">
          ✅ Checklist de Testes
        </h1>
        <p className="text-gray-400">
          Crie e gerencie checklists de testes. Os dados são salvos automaticamente no seu navegador.
        </p>
      </div>

      {alert && (
        <Alert type={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Lista de Checklists */}
        <div className="lg:col-span-1">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Meus Checklists</h3>
              <Button
                onClick={() => setShowNewChecklistForm(!showNewChecklistForm)}
                className="text-sm py-1 px-2"
              >
                +
              </Button>
            </div>

            {showNewChecklistForm && (
              <div className="mb-4 space-y-2">
                <Input
                  value={newChecklistName}
                  onChange={(e) => setNewChecklistName(e.target.value)}
                  placeholder="Nome do checklist"
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateChecklist()}
                />
                <div className="flex space-x-2">
                  <Button onClick={handleCreateChecklist} className="text-sm py-1 px-3">
                    Criar
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowNewChecklistForm(false);
                      setNewChecklistName('');
                    }}
                    className="text-sm py-1 px-3"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {checklists.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nenhum checklist ainda
                </p>
              ) : (
                checklists.map((checklist) => (
                  <div
                    key={checklist.id}
                    className={`p-3 rounded cursor-pointer transition-colors ${
                      activeChecklist === checklist.id
                        ? 'bg-primary-950/30 border-primary-600 border-2'
                        : 'bg-dark-800 hover:bg-dark-700 border border-dark-700'
                    }`}
                  >
                    <div
                      onClick={() => setActiveChecklist(checklist.id)}
                      className="flex-1"
                    >
                      <div className="font-medium text-sm text-gray-200">{checklist.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {checklist.items.length} itens
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChecklist(checklist.id);
                      }}
                      className="text-red-400 hover:text-red-300 text-xs mt-2"
                    >
                      Excluir
                    </button>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Main Content - Checklist Items */}
        <div className="lg:col-span-3">
          {activeChecklistData ? (
            <>
              <Card>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{activeChecklistData.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Criado em {new Date(activeChecklistData.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={handleExportChecklist}
                    className="text-sm"
                  >
                    💾 Exportar
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progresso</span>
                    <span className="font-semibold">
                      {completedCount}/{totalCount} ({progress}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Add New Item */}
                <div className="flex space-x-2 mb-6">
                  <Input
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    placeholder="Adicionar novo item..."
                    onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                    className="flex-1"
                  />
                  <Button onClick={handleAddItem}>Adicionar</Button>
                </div>

                {/* Items List */}
                <div className="space-y-2">
                  {activeChecklistData.items.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-lg mb-2">📝</p>
                      <p>Nenhum item ainda. Adicione o primeiro item acima!</p>
                    </div>
                  ) : (
                    activeChecklistData.items.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center space-x-3 p-3 rounded border ${
                          item.completed
                            ? 'bg-green-950/20 border-green-600/50'
                            : 'bg-dark-800 border-dark-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => handleToggleItem(item.id)}
                          className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                        />
                        <span
                          className={`flex-1 ${
                            item.completed
                              ? 'line-through text-gray-500'
                              : 'text-gray-200'
                          }`}
                        >
                          {item.text}
                        </span>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          🗑️
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </>
          ) : (
            <Card className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-2">Nenhum checklist selecionado</h3>
              <p className="text-gray-400 mb-6">
                Crie ou selecione um checklist para começar
              </p>
              <Button onClick={() => setShowNewChecklistForm(true)}>
                Criar Primeiro Checklist
              </Button>
            </Card>
          )}
        </div>
      </div>

      <Card className="bg-blue-950/30 border-blue-600/50">
        <h3 className="font-semibold text-blue-400 mb-2">💡 Dicas</h3>
        <ul className="text-sm text-blue-200/80 text-blue-400  space-y-1">
          <li>• Os checklists são salvos automaticamente no seu navegador</li>
          <li>• Clique em um item para marcá-lo como completo</li>
          <li>• Use o botão "Exportar" para fazer backup dos seus checklists</li>
          <li>• Os dados não são sincronizados entre dispositivos</li>
        </ul>
      </Card>
    </div>
  );
};

export default TestChecklist;
