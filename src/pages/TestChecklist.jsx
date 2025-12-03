import React, { useState } from 'react';
import Card from '../components/Common/Card';
import Alert from '../components/Common/Alert';
import ChecklistSidebar from '../components/Checklist/ChecklistSidebar';
import ChecklistMainContent from '../components/Checklist/ChecklistMainContent';
import { useChecklist } from '../hooks/useChecklist';

const TestChecklist = () => {
  const {
    checklists,
    activeChecklist,
    activeChecklistId,
    setActiveChecklistId,
    alert,
    setAlert,
    actions
  } = useChecklist();

  const [isCreating, setIsCreating] = useState(false);

  const {
    createChecklist,
    deleteChecklist,
    addItem,
    toggleItem,
    deleteItem,
    exportChecklist
  } = actions;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">
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
          <ChecklistSidebar
            checklists={checklists}
            activeChecklistId={activeChecklistId}
            onSelectChecklist={setActiveChecklistId}
            onCreateChecklist={createChecklist}
            onDeleteChecklist={deleteChecklist}
            isCreating={isCreating}
            setIsCreating={setIsCreating}
          />
        </div>

        {/* Main Content - Checklist Items */}
        <div className="lg:col-span-3">
          <ChecklistMainContent
            activeChecklist={activeChecklist}
            onAddItem={addItem}
            onToggleItem={toggleItem}
            onDeleteItem={deleteItem}
            onExport={exportChecklist}
            onCreateFirst={() => setIsCreating(true)}
          />
        </div>
      </div>

      <Card className="bg-blue-950/30 border-blue-600/50">
        <h3 className="font-semibold text-blue-400 mb-2">💡 Dicas</h3>
        <ul className="text-sm text-blue-200/80 space-y-1">
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
